const express = require('express');
import { Request, Response } from '../types';
import { getAllNews, createNews, updateNews, deleteNews } from '../controllers/news';

const router = express.Router();

// Get all news items
router.get('/', getAllNews);

// Create a new news item
router.post('/', createNews);

// Update a news item
router.put('/:id', updateNews);

// Delete a news item
router.delete('/:id', deleteNews);

export default router; 