"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNews = exports.updateNews = exports.createNews = exports.getAllNews = void 0;
const models_1 = require("../models");
// Get all news items
const getAllNews = async (req, res) => {
    try {
        const news = await models_1.News.find().sort({ date: -1 });
        res.json(news);
    }
    catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news items' });
    }
};
exports.getAllNews = getAllNews;
// Create a new news item
const createNews = async (req, res) => {
    try {
        const newsItem = new models_1.News(req.body);
        await newsItem.validate(); // Validate before saving
        const savedNews = await newsItem.save();
        res.status(201).json(savedNews);
    }
    catch (error) {
        console.error('Error creating news:', error);
        res.status(400).json({ error: 'Failed to create news item' });
    }
};
exports.createNews = createNews;
// Update a news item
const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNews = await models_1.News.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedNews) {
            return res.status(404).json({ error: 'News item not found' });
        }
        res.json(updatedNews);
    }
    catch (error) {
        console.error('Error updating news:', error);
        res.status(400).json({ error: 'Failed to update news item' });
    }
};
exports.updateNews = updateNews;
// Delete a news item
const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNews = await models_1.News.findByIdAndDelete(id);
        if (!deletedNews) {
            return res.status(404).json({ error: 'News item not found' });
        }
        res.json({ message: 'News item deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting news:', error);
        res.status(400).json({ error: 'Failed to delete news item' });
    }
};
exports.deleteNews = deleteNews;
