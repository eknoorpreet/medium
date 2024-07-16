import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
  body: {
    type: String,
  },
  notificationType: {
    type: String,
    enum: ['like', 'comment', 'follow'],
  },
  read: {
    type: Boolean,
    default: false,
  },
});

module.exports =
  mongoose.models.Notification ||
  mongoose.model('Notification', notificationSchema);
