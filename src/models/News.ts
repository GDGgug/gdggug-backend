import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
  title: string;
  content: string;
  image?: string;
  author: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new Schema<INews>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a news title'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide news content'],
    },
    image: {
      type: String,
    },
    author: {
      type: String,
      required: [true, 'Please provide an author name'],
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<INews>('News', newsSchema);
