import mongoose, { Document, Schema } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  role: string;
  bio: string;
  image?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  createdAt: Date;
  updatedAt: Date;
}

const teamMemberSchema = new Schema<ITeamMember>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a team member name'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Please provide a team member role'],
    },
    bio: {
      type: String,
      required: [true, 'Please provide a team member bio'],
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    linkedin: {
      type: String,
    },
    twitter: {
      type: String,
    },
    github: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITeamMember>('TeamMember', teamMemberSchema);
