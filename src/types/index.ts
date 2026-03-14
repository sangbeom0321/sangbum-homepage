export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "journal" | "conference" | "preprint" | "thesis";
  status: "published" | "accepted" | "under-review" | "in-preparation";
  abstract?: string;
  doi?: string;
  arxiv?: string;
  pdf?: string;
  code?: string;
  projectPage?: string;
  bibtex?: string;
  tags: string[];
  thumbnail?: string;
  highlight?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  images?: string[];
  video?: string;
  tags: string[];
  category: "research" | "engineering" | "side-project";
  status: "completed" | "in-progress" | "archived";
  github?: string;
  demo?: string;
  paper?: string;
  startDate: string;
  endDate?: string;
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  description: string;
  tags: string[];
  category: "tech" | "research" | "essay" | "tutorial";
  published: boolean;
  featured?: boolean;
  thumbnail?: string;
  readingTime?: number;
  content: string;
}

export interface Education {
  institution: string;
  institutionEn?: string;
  degree: string;
  field: string;
  period: string;
  status: "completed" | "in-progress" | "expected";
  gpa?: string;
  advisor?: string;
  thesis?: string;
  description?: string;
  logo?: string;
}

export interface Award {
  title: string;
  organization: string;
  date: string;
  description?: string;
  category: "competition" | "scholarship" | "academic" | "service";
  link?: string;
}

export interface JourneyStep {
  date: string;
  title: string;
  description: string;
  type: "education" | "research" | "award" | "career" | "milestone";
  icon?: string;
  link?: string;
}

export interface MediaItem {
  title: string;
  outlet: string;
  date: string;
  url?: string;
  description?: string;
  type: "news" | "interview" | "podcast" | "video";
  thumbnail?: string;
}

export interface Patent {
  title: string;
  inventors: string[];
  filingDate: string;
  patentNumber?: string;
  status: "filed" | "granted" | "pending";
  country: string;
  description?: string;
}

export interface Experience {
  organization: string;
  role: string;
  period: string;
  description: string;
  type: "research" | "work" | "club";
  logo?: string;
  url?: string;
  highlights?: string[];
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export interface SkillItem {
  name: string;
  category: "language" | "framework" | "tool" | "domain";
  pipelineStage?: "perception" | "planning" | "control" | "infrastructure";
  proficiency: "expert" | "advanced" | "intermediate";
  icon?: string;
}
