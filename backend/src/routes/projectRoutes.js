import express from "express";

import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getProjects);
router.post("/", authorizeRoles("ADMIN", "MANAGER"), createProject);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
