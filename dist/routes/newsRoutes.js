"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const newsController_1 = require("../controllers/newsController");
const router = express.Router();
// GET /api/news - Get all news items
router.get('/', newsController_1.getAllNews);
// GET /api/news/:id - Get a single news item by ID
router.get('/:id', newsController_1.getNewsById);
// POST /api/news - Create a new news item
router.post('/', newsController_1.createNews);
// PUT /api/news/:id - Update a news item
router.put('/:id', newsController_1.updateNews);
// DELETE /api/news/:id - Delete a news item
router.delete('/:id', newsController_1.deleteNews);
exports.default = router;
