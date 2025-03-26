"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeamMember = exports.updateTeamMember = exports.createTeamMember = exports.getTeamMemberById = exports.getAllTeamMembers = void 0;
const models_1 = require("../models");
// Get all team members
const getAllTeamMembers = async (req, res) => {
    try {
        const teamMembers = await models_1.TeamMember.find({});
        res.status(200).json(teamMembers);
    }
    catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({ error: 'Failed to fetch team members' });
    }
};
exports.getAllTeamMembers = getAllTeamMembers;
// Get a single team member by ID
const getTeamMemberById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Team member ID is required' });
        }
        const teamMember = await models_1.TeamMember.findById(id);
        if (!teamMember) {
            return res.status(404).json({ error: 'Team member not found' });
        }
        res.status(200).json(teamMember);
    }
    catch (error) {
        console.error('Error fetching team member:', error);
        res.status(500).json({ error: 'Failed to fetch team member' });
    }
};
exports.getTeamMemberById = getTeamMemberById;
// Create a new team member
const createTeamMember = async (req, res) => {
    try {
        console.log('Creating team member with data:', req.body);
        const teamMember = await models_1.TeamMember.create(req.body);
        console.log('Team member created successfully:', teamMember);
        res.status(201).json(teamMember);
    }
    catch (error) {
        console.error('Error creating team member:', error);
        res.status(500).json({ error: 'Failed to create team member' });
    }
};
exports.createTeamMember = createTeamMember;
// Update a team member
const updateTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Team member ID is required' });
        }
        console.log(`Updating team member ${id} with data:`, req.body);
        const updatedTeamMember = await models_1.TeamMember.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedTeamMember) {
            return res.status(404).json({ error: 'Team member not found' });
        }
        console.log('Team member updated successfully:', updatedTeamMember);
        res.status(200).json(updatedTeamMember);
    }
    catch (error) {
        console.error('Error updating team member:', error);
        res.status(500).json({ error: 'Failed to update team member' });
    }
};
exports.updateTeamMember = updateTeamMember;
// Delete a team member
const deleteTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Team member ID is required' });
        }
        const deletedTeamMember = await models_1.TeamMember.findByIdAndDelete(id);
        if (!deletedTeamMember) {
            return res.status(404).json({ error: 'Team member not found' });
        }
        res.status(200).json({ message: 'Team member deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting team member:', error);
        res.status(500).json({ error: 'Failed to delete team member' });
    }
};
exports.deleteTeamMember = deleteTeamMember;
