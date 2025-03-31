import express from 'express';
import { Request, Response } from '../types';
import { TeamMember } from '../models';

// Get all team members
export const getAllTeamMembers = async (req: Request, res: Response) => {
  try {
    const teamMembers = await TeamMember.find({});
    res.status(200).json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
};

// Get a single team member by ID
export const getTeamMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Team member ID is required' });
    }
    
    const teamMember = await TeamMember.findById(id);
    
    if (!teamMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.status(200).json(teamMember);
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({ error: 'Failed to fetch team member' });
  }
};

// Create a new team member
export const createTeamMember = async (req: Request, res: Response) => {
  try {
    console.log('Creating team member with data:', req.body);
    const teamMember = await TeamMember.create(req.body);
    console.log('Team member created successfully:', teamMember);
    res.status(201).json(teamMember);
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ error: 'Failed to create team member' });
  }
};

// Update a team member
export const updateTeamMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Team member ID is required' });
    }
    
    console.log(`Updating team member ${id} with data:`, req.body);
    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedTeamMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    console.log('Team member updated successfully:', updatedTeamMember);
    res.status(200).json(updatedTeamMember);
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ error: 'Failed to update team member' });
  }
};

// Delete a team member
export const deleteTeamMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Team member ID is required' });
    }
    
    const deletedTeamMember = await TeamMember.findByIdAndDelete(id);
    
    if (!deletedTeamMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
};
