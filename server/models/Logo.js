import mongoose from 'mongoose';

const logoSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  session_id: { type: String, index: true },
  brand_name: { type: String, required: true, index: true },
  description: { type: String, default: '' },
  industry: { type: String, default: '' },
  tagline: { type: String, default: '' },
  style: { type: String, required: true, index: true },
  svg_data: { type: String, required: true },
  config: { type: mongoose.Schema.Types.Mixed, default: {} },
  is_favorite: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

const LogoModel = mongoose.model('Logo', logoSchema);

function formatLogo(doc) {
  return {
    id: doc._id.toString(),
    user_id: doc.user_id?.toString() || null,
    session_id: doc.session_id,
    brand_name: doc.brand_name,
    description: doc.description,
    industry: doc.industry,
    tagline: doc.tagline,
    style: doc.style,
    svg_data: doc.svg_data,
    config: doc.config,
    is_favorite: doc.is_favorite,
    created_at: doc.created_at
  };
}

export const Logo = {
  async create({ userId, sessionId, brandName, description, industry, tagline, style, svgData, config }) {
    const doc = await LogoModel.create({
      user_id: userId || null,
      session_id: sessionId,
      brand_name: brandName,
      description: description || '',
      industry: industry || '',
      tagline: tagline || '',
      style,
      svg_data: svgData,
      config: config || {}
    });
    return formatLogo(doc);
  },

  async createBatch(logos) {
    const docs = await LogoModel.insertMany(logos.map(l => ({
      user_id: l.userId || null,
      session_id: l.sessionId,
      brand_name: l.brandName,
      description: l.description || '',
      industry: l.industry || '',
      tagline: l.tagline || '',
      style: l.style,
      svg_data: l.svgData,
      config: l.config || {}
    })));
    return docs.map(formatLogo);
  },

  async findById(id) {
    try {
      const doc = await LogoModel.findById(id);
      return doc ? formatLogo(doc) : null;
    } catch {
      return null;
    }
  },

  async findByUser(userId, { limit = 50, offset = 0, style } = {}) {
    const query = { user_id: userId };
    if (style) query.style = style;
    const docs = await LogoModel.find(query).sort({ created_at: -1 }).skip(offset).limit(limit);
    return docs.map(formatLogo);
  },

  async findBySession(sessionId, { limit = 50, offset = 0, style } = {}) {
    const query = { session_id: sessionId };
    if (style) query.style = style;
    const docs = await LogoModel.find(query).sort({ created_at: -1 }).skip(offset).limit(limit);
    return docs.map(formatLogo);
  },

  async updateConfig(id, config) {
    const doc = await LogoModel.findByIdAndUpdate(id, { config }, { new: true });
    return doc ? formatLogo(doc) : null;
  },

  async toggleFavorite(id) {
    const doc = await LogoModel.findById(id);
    if (!doc) return null;
    doc.is_favorite = doc.is_favorite === 1 ? 0 : 1;
    await doc.save();
    return formatLogo(doc);
  },

  async delete(id) {
    await LogoModel.findByIdAndDelete(id);
  },

  async countByUser(userId) {
    return await LogoModel.countDocuments({ user_id: userId });
  },

  async countBySession(sessionId) {
    return await LogoModel.countDocuments({ session_id: sessionId });
  }
};
