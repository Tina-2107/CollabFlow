import Project from "../models/Project.js";
import mongoose from "mongoose";
//read all project
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user._id,
    })
      .populate("owner", "name email role")
      .populate("members", "name email role");

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// create new project
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }
    const project = await Project.create({
      name,
      description,
      owner: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get project by id or get one project

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    //  Check whether logged-in user is a member
    const isMember = project.members.some(
      (memberId) => memberId.toString() === req.user.id.toString(),
    );

    //  User isn't a member
    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this project",
      });
    }

    //  User is a member
    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update project

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete Project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("DELETE ID:", id);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project = await Project.findById(id);

    console.log("PROJECT FOUND:", project);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
