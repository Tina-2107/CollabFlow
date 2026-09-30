import { getProject } from "../controllers/projectController.js";

import express from "express";

const router = express.Router();

router.get("/", getProject);

export default router;
