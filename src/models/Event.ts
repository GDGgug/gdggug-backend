import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  image?: string;
  status: 'upcoming' | 'past' | 'canceled';
  registrationLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Please provide an event title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide an event description'],
    },
    date: {
      type: Date,
      required: [true, 'Please provide an event date'],
    },
    time: {
      type: String,
      required: [true, 'Please provide an event time'],
    },
    location: {
      type: String,
      required: [true, 'Please provide an event location'],
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: ['upcoming', 'past', 'canceled'],
      default: 'upcoming',
    },
    registrationLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEvent>('Event', eventSchema);
