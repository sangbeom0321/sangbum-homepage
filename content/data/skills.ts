export interface Skill {
  name: string;
  category: "language" | "framework" | "tool" | "domain";
  pipelineStage?: "perception" | "planning" | "control" | "infrastructure";
  proficiency: "expert" | "advanced" | "intermediate";
}

export const skills: Skill[] = [
  // Languages
  {
    name: "Python",
    category: "language",
    pipelineStage: "infrastructure",
    proficiency: "expert",
  },
  {
    name: "C++",
    category: "language",
    pipelineStage: "infrastructure",
    proficiency: "advanced",
  },
  {
    name: "C",
    category: "language",
    pipelineStage: "infrastructure",
    proficiency: "advanced",
  },
  {
    name: "MATLAB",
    category: "language",
    pipelineStage: "control",
    proficiency: "intermediate",
  },
  {
    name: "TypeScript",
    category: "language",
    pipelineStage: "infrastructure",
    proficiency: "intermediate",
  },
  {
    name: "Bash/Shell",
    category: "language",
    pipelineStage: "infrastructure",
    proficiency: "advanced",
  },

  // Frameworks & Libraries
  {
    name: "ROS/ROS2",
    category: "framework",
    pipelineStage: "infrastructure",
    proficiency: "expert",
  },
  {
    name: "PyTorch",
    category: "framework",
    pipelineStage: "perception",
    proficiency: "expert",
  },
  {
    name: "OpenCV",
    category: "framework",
    pipelineStage: "perception",
    proficiency: "expert",
  },
  {
    name: "PCL (Point Cloud Library)",
    category: "framework",
    pipelineStage: "perception",
    proficiency: "advanced",
  },
  {
    name: "Open3D",
    category: "framework",
    pipelineStage: "perception",
    proficiency: "advanced",
  },
  {
    name: "TensorRT",
    category: "framework",
    pipelineStage: "perception",
    proficiency: "intermediate",
  },
  {
    name: "NumPy/SciPy",
    category: "framework",
    pipelineStage: "infrastructure",
    proficiency: "expert",
  },
  {
    name: "Matplotlib/Plotly",
    category: "framework",
    pipelineStage: "infrastructure",
    proficiency: "advanced",
  },
  {
    name: "ONNX",
    category: "framework",
    pipelineStage: "perception",
    proficiency: "intermediate",
  },

  // Tools & Infrastructure
  {
    name: "Linux (Ubuntu)",
    category: "tool",
    pipelineStage: "infrastructure",
    proficiency: "expert",
  },
  {
    name: "Git",
    category: "tool",
    pipelineStage: "infrastructure",
    proficiency: "expert",
  },
  {
    name: "Docker",
    category: "tool",
    pipelineStage: "infrastructure",
    proficiency: "advanced",
  },
  {
    name: "CUDA",
    category: "tool",
    pipelineStage: "perception",
    proficiency: "intermediate",
  },
  {
    name: "Gazebo",
    category: "tool",
    pipelineStage: "infrastructure",
    proficiency: "advanced",
  },
  {
    name: "CARLA Simulator",
    category: "tool",
    pipelineStage: "infrastructure",
    proficiency: "advanced",
  },
  {
    name: "RViz",
    category: "tool",
    pipelineStage: "infrastructure",
    proficiency: "expert",
  },
  {
    name: "VS Code",
    category: "tool",
    pipelineStage: "infrastructure",
    proficiency: "expert",
  },
  {
    name: "CMake",
    category: "tool",
    pipelineStage: "infrastructure",
    proficiency: "advanced",
  },
  {
    name: "Weights & Biases",
    category: "tool",
    pipelineStage: "infrastructure",
    proficiency: "intermediate",
  },

  // Domain Knowledge
  {
    name: "3D Object Detection",
    category: "domain",
    pipelineStage: "perception",
    proficiency: "expert",
  },
  {
    name: "Sensor Fusion (LiDAR + Camera)",
    category: "domain",
    pipelineStage: "perception",
    proficiency: "expert",
  },
  {
    name: "Point Cloud Processing",
    category: "domain",
    pipelineStage: "perception",
    proficiency: "expert",
  },
  {
    name: "SLAM & Localization",
    category: "domain",
    pipelineStage: "perception",
    proficiency: "advanced",
  },
  {
    name: "Path Planning",
    category: "domain",
    pipelineStage: "planning",
    proficiency: "advanced",
  },
  {
    name: "Behavior Planning",
    category: "domain",
    pipelineStage: "planning",
    proficiency: "intermediate",
  },
  {
    name: "Motion Planning",
    category: "domain",
    pipelineStage: "planning",
    proficiency: "advanced",
  },
  {
    name: "Vehicle Dynamics",
    category: "domain",
    pipelineStage: "control",
    proficiency: "advanced",
  },
  {
    name: "PID / MPC Control",
    category: "domain",
    pipelineStage: "control",
    proficiency: "advanced",
  },
  {
    name: "Trajectory Tracking",
    category: "domain",
    pipelineStage: "control",
    proficiency: "advanced",
  },
  {
    name: "Kalman Filtering",
    category: "domain",
    pipelineStage: "perception",
    proficiency: "advanced",
  },
  {
    name: "Computer Vision",
    category: "domain",
    pipelineStage: "perception",
    proficiency: "expert",
  },
  {
    name: "Deep Learning",
    category: "domain",
    pipelineStage: "perception",
    proficiency: "expert",
  },
];

/**
 * Helper: get skills grouped by category
 */
export function getSkillsByCategory(): Record<string, Skill[]> {
  return skills.reduce(
    (acc, skill) => {
      const key = skill.category;
      if (!acc[key]) acc[key] = [];
      acc[key].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );
}

/**
 * Helper: get skills grouped by pipeline stage
 */
export function getSkillsByPipelineStage(): Record<string, Skill[]> {
  return skills.reduce(
    (acc, skill) => {
      const key = skill.pipelineStage || "general";
      if (!acc[key]) acc[key] = [];
      acc[key].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );
}
