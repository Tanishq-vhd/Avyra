import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password_hash: { type: String, required: true },
  name: { type: String, default: '' },
  plan: { type: String, default: 'free', enum: ['free', 'starter', 'pro'] },
  has_paid: { type: Number, default: 0 },
  downloads_used: { type: Number, default: 0 },
  download_limit: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const UserModel = mongoose.model('User', userSchema);

export const User = {
  async create({ email, passwordHash, name }) {
    const doc = await UserModel.create({ email, password_hash: passwordHash, name });
    return this.formatUser(doc);
  },

  async findOrCreateGoogle({ email, name, googleId }) {
    let doc = await UserModel.findOne({ email });
    if (doc) return this.formatUser(doc);
    doc = await UserModel.create({
      email,
      password_hash: '__google__' + googleId,
      name: name || ''
    });
    return this.formatUser(doc);
  },

  async findById(id) {
    const doc = await UserModel.findById(id);
    return doc ? this.formatUser(doc) : null;
  },

  async findByEmail(email) {
    const doc = await UserModel.findOne({ email });
    return doc ? this.formatUserFull(doc) : null;
  },

  async updatePlan(id, plan) {
    const limits = { free: 0, starter: 3, pro: 999999 };
    const doc = await UserModel.findByIdAndUpdate(id, {
      plan,
      download_limit: limits[plan] || 0
    }, { new: true });
    return doc ? this.formatUser(doc) : null;
  },

  async incrementDownloads(id) {
    await UserModel.findByIdAndUpdate(id, { $inc: { downloads_used: 1 } });
  },

  async canDownload(id) {
    const doc = await UserModel.findById(id);
    if (!doc) return false;
    if (doc.plan === 'pro') return true;
    return doc.downloads_used < doc.download_limit;
  },

  async markPaid(id) {
    const doc = await UserModel.findByIdAndUpdate(id, {
      has_paid: 1,
      plan: 'starter',
      download_limit: 3
    }, { new: true });
    return doc ? this.formatUser(doc) : null;
  },

  async count() {
    return await UserModel.countDocuments();
  },

  formatUser(doc) {
    return {
      id: doc._id.toString(),
      email: doc.email,
      name: doc.name,
      plan: doc.plan,
      has_paid: doc.has_paid,
      downloads_used: doc.downloads_used,
      download_limit: doc.download_limit,
      created_at: doc.created_at,
      updated_at: doc.updated_at
    };
  },

  formatUserFull(doc) {
    return {
      ...this.formatUser(doc),
      password_hash: doc.password_hash
    };
  }
};
