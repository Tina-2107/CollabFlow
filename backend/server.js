import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//routes
import healthRoutes from "./src/routes/healthRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//routes

app.use("/api/health", healthRoutes);

app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Collaborative Project Management API is running",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
