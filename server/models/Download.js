import mongoose from 'mongoose';

const downloadSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  logo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Logo', required: true, index: true },
  format: { type: String, required: true },
  file_path: { type: String, default: '' },
  file_size: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

const DownloadModel = mongoose.model('Download', downloadSchema);

export const Download = {
  async create({ userId, logoId, format, filePath, fileSize }) {
    const doc = await DownloadModel.create({
      user_id: userId || null,
      logo_id: logoId,
      format,
      file_path: filePath || '',
      file_size: fileSize || 0
    });
    return {
      id: doc._id.toString(),
      user_id: doc.user_id?.toString() || null,
      logo_id: doc.logo_id.toString(),
      format: doc.format,
      file_path: doc.file_path,
      file_size: doc.file_size,
      created_at: doc.created_at
    };
  },

  async findById(id) {
    const doc = await DownloadModel.findById(id);
    return doc || null;
  },

  async findByUser(userId, { limit = 50, offset = 0 } = {}) {
    const docs = await DownloadModel.find({ user_id: userId })
      .sort({ created_at: -1 })
      .skip(offset)
      .limit(limit)
      .populate('logo_id', 'brand_name style svg_data');

    return docs.map(d => ({
      id: d._id.toString(),
      user_id: d.user_id?.toString() || null,
      logo_id: d.logo_id?._id?.toString() || d.logo_id?.toString(),
      format: d.format,
      created_at: d.created_at,
      brand_name: d.logo_id?.brand_name,
      style: d.logo_id?.style,
      svg_data: d.logo_id?.svg_data
    }));
  },

  async countByUser(userId) {
    return await DownloadModel.countDocuments({ user_id: userId });
  },

  async countToday(userId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return await DownloadModel.countDocuments({
      user_id: userId,
      created_at: { $gte: today }
    });
  }
};
