import express from 'express';
import { Request, Response } from '../types';
import { News } from '../models';

// Get all news items
export const getAllNews = async (req: Request, res: Response) => {
  try {
    const news = await News.find({}).sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

// Get a single news item by ID
export const getNewsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'News ID is required' });
    }
    
    const newsItem = await News.findById(id);
    
    if (!newsItem) {
      return res.status(404).json({ error: 'News item not found' });
    }
    
    res.status(200).json(newsItem);
  } catch (error) {
    console.error('Error fetching news item:', error);
    res.status(500).json({ error: 'Failed to fetch news item' });
  }
};

// Create a new news item
export const createNews = async (req: Request, res: Response) => {
  try {
    console.log('Creating news item with data:', req.body);
    const newsItem = await News.create(req.body);
    console.log('News item created successfully:', newsItem);
    res.status(201).json(newsItem);
  } catch (error) {
    console.error('Error creating news item:', error);
    res.status(500).json({ error: 'Failed to create news item' });
  }
};

// Update a news item
export const updateNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'News ID is required' });
    }
    
    console.log(`Updating news item ${id} with data:`, req.body);
    const updatedNews = await News.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedNews) {
      return res.status(404).json({ error: 'News item not found' });
    }
    
    console.log('News item updated successfully:', updatedNews);
    res.status(200).json(updatedNews);
  } catch (error) {
    console.error('Error updating news item:', error);
    res.status(500).json({ error: 'Failed to update news item' });
  }
};

// Delete a news item
export const deleteNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'News ID is required' });
    }
    
    const deletedNews = await News.findByIdAndDelete(id);
    
    if (!deletedNews) {
      return res.status(404).json({ error: 'News item not found' });
    }
    
    res.status(200).json({ message: 'News item deleted successfully' });
  } catch (error) {
    console.error('Error deleting news item:', error);
    res.status(500).json({ error: 'Failed to delete news item' });
  }
};
