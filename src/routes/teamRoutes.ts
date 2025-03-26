import express from 'express';
import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from '../controllers/teamController';

const router = express.Router();

// GET /api/team - Get all team members
router.get('/', getAllTeamMembers);

// GET /api/team/:id - Get a single team member by ID
router.get('/:id', getTeamMemberById);

// POST /api/team - Create a new team member
router.post('/', createTeamMember);

// PUT /api/team/:id - Update a team member
router.put('/:id', updateTeamMember);

// DELETE /api/team/:id - Delete a team member
router.delete('/:id', deleteTeamMember);

export default router;
