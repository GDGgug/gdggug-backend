"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const news_1 = require("../controllers/news");
const router = express.Router();
// Get all news items
router.get('/', news_1.getAllNews);
// Create a new news item
router.post('/', news_1.createNews);
// Update a news item
router.put('/:id', news_1.updateNews);
// Delete a news item
router.delete('/:id', news_1.deleteNews);
exports.default = router;
