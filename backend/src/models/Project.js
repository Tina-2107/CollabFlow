// Project schema
// Project
//  ├── name
//  ├── description
//  ├── owner → User
//  └── members → [User]

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    //user
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // users
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  {
    timestamps: true,
  },
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
