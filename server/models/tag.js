import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  posts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post' }],
  followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.models.Tag || mongoose.model('Tag', tagSchema);
