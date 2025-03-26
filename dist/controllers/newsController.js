"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNews = exports.updateNews = exports.createNews = exports.getNewsById = exports.getAllNews = void 0;
const models_1 = require("../models");
// Get all news items
const getAllNews = async (req, res) => {
    try {
        const news = await models_1.News.find({}).sort({ createdAt: -1 });
        res.status(200).json(news);
    }
    catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
};
exports.getAllNews = getAllNews;
// Get a single news item by ID
const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'News ID is required' });
        }
        const newsItem = await models_1.News.findById(id);
        if (!newsItem) {
            return res.status(404).json({ error: 'News item not found' });
        }
        res.status(200).json(newsItem);
    }
    catch (error) {
        console.error('Error fetching news item:', error);
        res.status(500).json({ error: 'Failed to fetch news item' });
    }
};
exports.getNewsById = getNewsById;
// Create a new news item
const createNews = async (req, res) => {
    try {
        console.log('Creating news item with data:', req.body);
        const newsItem = await models_1.News.create(req.body);
        console.log('News item created successfully:', newsItem);
        res.status(201).json(newsItem);
    }
    catch (error) {
        console.error('Error creating news item:', error);
        res.status(500).json({ error: 'Failed to create news item' });
    }
};
exports.createNews = createNews;
// Update a news item
const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'News ID is required' });
        }
        console.log(`Updating news item ${id} with data:`, req.body);
        const updatedNews = await models_1.News.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedNews) {
            return res.status(404).json({ error: 'News item not found' });
        }
        console.log('News item updated successfully:', updatedNews);
        res.status(200).json(updatedNews);
    }
    catch (error) {
        console.error('Error updating news item:', error);
        res.status(500).json({ error: 'Failed to update news item' });
    }
};
exports.updateNews = updateNews;
// Delete a news item
const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'News ID is required' });
        }
        const deletedNews = await models_1.News.findByIdAndDelete(id);
        if (!deletedNews) {
            return res.status(404).json({ error: 'News item not found' });
        }
        res.status(200).json({ message: 'News item deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting news item:', error);
        res.status(500).json({ error: 'Failed to delete news item' });
    }
};
exports.deleteNews = deleteNews;
