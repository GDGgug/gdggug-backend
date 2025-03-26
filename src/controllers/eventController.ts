import express from 'express';
type Request = express.Request;
type Response = express.Response;
import { Event } from '../models';

// Get all events
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find({}).sort({ date: -1 });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get a single event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Event ID is required' });
    }
    
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Create a new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    // Ensure status is set, default to 'upcoming' if not provided
    const eventData = {
      ...req.body,
      status: req.body.status || 'upcoming'
    };
    
    console.log('Creating event with data:', eventData);
    const event = await Event.create(eventData);
    console.log('Event created successfully:', event);
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Update an event
export const updateEvent = async (req: Request, res: Response) => {
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
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      eventData,
      { new: true, runValidators: true }
    );
    
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    console.log('Event updated successfully:', updatedEvent);
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// Delete an event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Event ID is required' });
    }
    
    const deletedEvent = await Event.findByIdAndDelete(id);
    
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};
