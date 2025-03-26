"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEventById = exports.getAllEvents = void 0;
const models_1 = require("../models");
// Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await models_1.Event.find({}).sort({ date: -1 });
        res.status(200).json(events);
    }
    catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};
exports.getAllEvents = getAllEvents;
// Get a single event by ID
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Event ID is required' });
        }
        const event = await models_1.Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    }
    catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ error: 'Failed to fetch event' });
    }
};
exports.getEventById = getEventById;
// Create a new event
const createEvent = async (req, res) => {
    try {
        // Ensure status is set, default to 'upcoming' if not provided
        const eventData = {
            ...req.body,
            status: req.body.status || 'upcoming'
        };
        console.log('Creating event with data:', eventData);
        const event = await models_1.Event.create(eventData);
        console.log('Event created successfully:', event);
        res.status(201).json(event);
    }
    catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
};
exports.createEvent = createEvent;
// Update an event
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Event ID is required' });
        }
        // Ensure status is properly set
        const eventData = {
            ...req.body,
            status: req.body.status || 'upcoming'
        };
        console.log(`Updating event ${id} with data:`, eventData);
        const updatedEvent = await models_1.Event.findByIdAndUpdate(id, eventData, { new: true, runValidators: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        console.log('Event updated successfully:', updatedEvent);
        res.status(200).json(updatedEvent);
    }
    catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Failed to update event' });
    }
};
exports.updateEvent = updateEvent;
// Delete an event
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Event ID is required' });
        }
        const deletedEvent = await models_1.Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
};
exports.deleteEvent = deleteEvent;
