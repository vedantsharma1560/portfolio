export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  screenshots: string[];
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  architecture: string[];
  challenges: { problem: string; solution: string }[];
  features: string[];
  metrics: { label: string; value: string }[];
  timeline: string;
  client?: string;
}

export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    iconName: string;
    description: string;
    yearsOfExperience: number;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'Lead';
  description: string;
  highlights: string[];
  technologies: string[];
  logoText: string;
  logoColor: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  estimatedDays: string;
  startingPrice: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  review: string;
  projectRef?: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  type: 'Award' | 'Certification' | 'Milestone';
  badgeIcon: string;
  link?: string;
}

export interface ServiceEstimateOption {
  serviceId: string;
  title: string;
  basePrice: number;
  baseDays: number;
}
