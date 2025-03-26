import express from 'express';
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} from '../controllers/newsController';

const router = express.Router();

// GET /api/news - Get all news items
router.get('/', getAllNews);

// GET /api/news/:id - Get a single news item by ID
router.get('/:id', getNewsById);

// POST /api/news - Create a new news item
router.post('/', createNews);

// PUT /api/news/:id - Update a news item
router.put('/:id', updateNews);

// DELETE /api/news/:id - Delete a news item
router.delete('/:id', deleteNews);

export default router;
