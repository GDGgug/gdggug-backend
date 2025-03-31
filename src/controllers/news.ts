import express from 'express';
import { News } from '../models';

type Request = any;
type Response = any;

// Get all news items
export const getAllNews = async (req: Request, res: Response) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news items' });
  }
};

// Create a new news item
export const createNews = async (req: Request, res: Response) => {
  try {
    const newsItem = new News(req.body);
    await newsItem.validate(); // Validate before saving
    const savedNews = await newsItem.save();
    res.status(201).json(savedNews);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(400).json({ error: 'Failed to create news item' });
  }
};

// Update a news item
export const updateNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedNews = await News.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedNews) {
      return res.status(404).json({ error: 'News item not found' });
    }
    res.json(updatedNews);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(400).json({ error: 'Failed to update news item' });
  }
};

// Delete a news item
export const deleteNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedNews = await News.findByIdAndDelete(id);
    if (!deletedNews) {
      return res.status(404).json({ error: 'News item not found' });
    }
    res.json({ message: 'News item deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(400).json({ error: 'Failed to delete news item' });
  }
}; 