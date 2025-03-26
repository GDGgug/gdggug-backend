import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['news', 'internship'],
    required: true,
  },
  company: {
    type: String,
    required: function() {
      return this.type === 'internship';
    },
  },
  location: {
    type: String,
    required: function() {
      return this.type === 'internship';
    },
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export const News = mongoose.model('News', newsSchema); 