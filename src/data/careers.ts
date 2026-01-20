export type Position = {
  id: number;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
};

export const positions: Position[] = [
  {
    id: 1,
    slug: "senior-full-stack-developer",
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Remote / New York",
    type: "Full-time",
    experience: "5+ years",
    description:
      "We are looking for an experienced Full-Stack Developer to join our team and help build scalable web applications.",
    responsibilities: [
      "Design, develop, and maintain web applications using React and Node.js",
      "Collaborate with cross-functional teams to define and implement features",
      "Write clean, maintainable, and well-documented code",
      "Mentor junior developers and conduct code reviews",
      "Participate in architectural decisions and technical planning",
    ],
    requirements: [
      "5+ years of experience in full-stack development",
      "Strong proficiency in React, TypeScript, and Node.js",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Familiarity with CI/CD pipelines and DevOps practices",
      "Excellent communication and teamwork skills",
    ],
    niceToHave: [
      "Experience with design systems",
      "Strong testing culture (unit + integration)",
      "Open source contributions",
    ],
  },
  {
    id: 2,
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote / San Francisco",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Join our design team to create beautiful, user-centered interfaces for enterprise applications.",
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Collaborate with developers to ensure design implementation",
      "Maintain and evolve our design system",
      "Present designs to stakeholders and incorporate feedback",
    ],
    requirements: [
      "3+ years of experience in UI/UX design",
      "Proficiency in Figma and other design tools",
      "Strong portfolio showcasing web and mobile designs",
      "Understanding of accessibility standards",
      "Experience with design systems and component libraries",
    ],
    niceToHave: ["Motion design experience", "Basic HTML/CSS proficiency"],
  },
  {
    id: 3,
    slug: "devops-engineer",
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote",
    type: "Full-time",
    experience: "4+ years",
    description:
      "Help us build and maintain robust, scalable infrastructure for our growing client base.",
    responsibilities: [
      "Design and implement CI/CD pipelines",
      "Manage cloud infrastructure on AWS and Azure",
      "Monitor system performance and implement improvements",
      "Automate deployment and operational processes",
      "Ensure security best practices are followed",
    ],
    requirements: [
      "4+ years of experience in DevOps or SRE roles",
      "Strong knowledge of Docker and Kubernetes",
      "Experience with Terraform or CloudFormation",
      "Proficiency in scripting (Python, Bash)",
      "Understanding of security and compliance requirements",
    ],
    niceToHave: ["Experience with service meshes", "Cost optimization mindset"],
  },
];

export const benefits = [
  "Competitive salary & equity",
  "Remote-first culture",
  "Unlimited PTO",
  "Health, dental & vision",
  "Learning & development budget",
  "Home office stipend",
  "Team retreats",
  "Flexible hours",
];

export const getPositionBySlug = (slug: string) => positions.find((p) => p.slug === slug);
