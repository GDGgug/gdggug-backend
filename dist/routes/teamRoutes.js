"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teamController_1 = require("../controllers/teamController");
const router = express_1.default.Router();
// GET /api/team - Get all team members
router.get('/', teamController_1.getAllTeamMembers);
// GET /api/team/:id - Get a single team member by ID
router.get('/:id', teamController_1.getTeamMemberById);
// POST /api/team - Create a new team member
router.post('/', teamController_1.createTeamMember);
// PUT /api/team/:id - Update a team member
router.put('/:id', teamController_1.updateTeamMember);
// DELETE /api/team/:id - Delete a team member
router.delete('/:id', teamController_1.deleteTeamMember);
exports.default = router;
