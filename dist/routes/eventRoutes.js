"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const eventController_1 = require("../controllers/eventController");
const router = express.Router();
// GET /api/events - Get all events
router.get('/', eventController_1.getAllEvents);
// GET /api/events/:id - Get a single event by ID
router.get('/:id', eventController_1.getEventById);
// POST /api/events - Create a new event
router.post('/', eventController_1.createEvent);
// PUT /api/events/:id - Update an event
router.put('/:id', eventController_1.updateEvent);
// DELETE /api/events/:id - Delete an event
router.delete('/:id', eventController_1.deleteEvent);
exports.default = router;
