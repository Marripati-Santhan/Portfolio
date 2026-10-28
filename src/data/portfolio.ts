/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — Marripati Santhan
 *  Update LinkedIn / GitHub URLs below with your real profile links.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Marripati Santhan",
  firstName: "Santhan",
  initials: "MS",
  headline: "Java Full Stack Developer",
  location: "Madanapalle, Andhra Pradesh",
  email: "marripatisanthan@gmail.com",
  phone: "+91 7337294028",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/",
  availability: "Open to full-time Java Developer roles",
  summary:
    "Aspiring Java Developer with strong Core Java fundamentals, seeking a challenging role in software development where I can utilize Core Java, Data Structures, and problem-solving skills to build efficient and scalable applications.",
  roles: [
    "Java Full Stack apps",
    "Spring Boot REST APIs",
    "React.js interfaces",
    "scalable web systems",
  ],
};

export const socials = [
  { label: "GitHub", icon: "github", href: profile.github },
  { label: "LinkedIn", icon: "linkedin", href: profile.linkedin },
  { label: "Email", icon: "mail", href: `mailto:${profile.email}` },
];

export const stats = [
  { value: 4, decimals: 0, suffix: "", label: "Projects built" },
  { value: 2, decimals: 0, suffix: "", label: "Internships" },
  { value: 8.2, decimals: 1, suffix: "", label: "B.Tech CGPA" },
  { value: 15, decimals: 0, suffix: "+", label: "Technologies" },
];

export const marqueeItems = [
  "Core Java",
  "Spring Boot",
  "Hibernate",
  "JPA",
  "JDBC",
  "React.js",
  "Node.js",
  "Express.js",
  "MySQL",
  "MongoDB",
  "REST APIs",
  "JWT Auth",
  "HTML5",
  "CSS3",
  "JavaScript",
  "Bootstrap",
  "Git & GitHub",
];

export type SkillGroup = {
  title: string;
  icon: string;
  accent: "cyan" | "violet" | "fuchsia" | "amber" | "emerald";
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  { title: "Programming Languages", icon: "code", accent: "amber", items: ["Java", "Python", "C", "SQL"] },
  { title: "Libraries / Frameworks", icon: "layers", accent: "violet", items: ["Spring", "Spring Boot", "Hibernate", "JDBC", "JPA", "React.js"] },
  { title: "Web Technologies", icon: "globe", accent: "cyan", items: ["HTML", "CSS", "JavaScript", "Bootstrap", "Node.js", "Express.js"] },
  { title: "Databases", icon: "database", accent: "emerald", items: ["MySQL", "MongoDB"] },
  { title: "Developer Tools", icon: "tool", accent: "fuchsia", items: ["VS Code", "Eclipse", "Spring Tool Suite", "Git", "GitHub"] },
];

export const coreStrengths = [
  { label: "Core Java & OOP", value: 90 },
  { label: "Spring Boot & Hibernate", value: 82 },
  { label: "React.js & JavaScript", value: 80 },
  { label: "SQL / MySQL", value: 84 },
  { label: "Data Structures", value: 78 },
];

export type Project = {
  id: string;
  title: string;
  client: string;
  period: string;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  image: string;
  accent: string; // tailwind gradient classes
  glow: string;
  icon: string;
  links: { live?: string; code?: string };
};

export const projects: Project[] = [
  {
    id: "vmm",
    title: "VMM Feedback System",
    client: "Vishal Mega Mart",
    period: "Jun 2026 – Jul 2026",
    tagline: "Customers rate store staff and review management & services — in seconds.",
    description:
      "A full-stack Customer Feedback Management System for Vishal Mega Mart. Shoppers can rate individual workers, leave feedback on store management and services, and admins get a secure dashboard with real-time analytics to act on what customers say.",
    features: [
      "Staff rating module — customers rate workers on a 5-star scale",
      "Feedback on management, billing, cleanliness & services",
      "Secure Admin authentication with JWT & bcrypt, role-based access",
      "Real-time analytics dashboard with REST APIs",
      "Cloud deployment on Vercel (frontend) & Render (backend)",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MySQL", "JWT", "bcrypt", "Vercel", "Render"],
    image:
      "https://images.pexels.com/photos/7451964/pexels-photo-7451964.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "from-cyan-400 to-blue-500",
    glow: "rgba(34,211,238,0.35)",
    icon: "star",
    links: { code: profile.github },
  },
  {
    id: "yoga",
    title: "Sans Yoga Sanctuary",
    client: "Personal Project",
    period: "Feb 2026 – Apr 2026",
    tagline: "Home workouts, guided meditation & pain-based pose recommendations.",
    description:
      "A smart yoga web app built for practising at home. It offers home-exercise tutorials and guided meditation sessions — and its standout feature recommends relevant yoga poses with step-by-step instructions based on the user's pain location and how long they've had it.",
    features: [
      "Home exercise tutorials & guided meditation sessions",
      "Pose recommender: enter pain location + duration → get poses & instructions",
      "Secure user authentication using JWT & bcrypt password hashing",
      "Registration & login with proper validation and error handling",
      "Personalised, calming UI for daily practice",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "JWT", "bcrypt", "JavaScript"],
    image:
      "https://images.pexels.com/photos/6443484/pexels-photo-6443484.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "from-emerald-400 to-teal-500",
    glow: "rgba(52,211,153,0.35)",
    icon: "lotus",
    links: { code: profile.github },
  },
  {
    id: "jobs",
    title: "Job Listing Portal",
    client: "Amdox Technologies",
    period: "Jan 2026 – Mar 2026",
    tagline: "A LinkedIn-style platform to post, search and apply for jobs.",
    description:
      "A full-stack job portal inspired by LinkedIn, built during my internship at Amdox Technologies. Recruiters post openings, candidates search and filter roles, and applications are managed end-to-end through RESTful APIs backed by Spring Boot and MySQL.",
    features: [
      "Job posting, search & filtering for candidates and recruiters",
      "Application management with full CRUD operations",
      "User authentication and role-based profiles",
      "RESTful APIs with Spring Boot, Hibernate & JPA",
      "Responsive, interactive UI with frontend–backend integration",
    ],
    stack: ["Java", "Spring Boot", "Hibernate", "JPA", "MySQL", "HTML", "CSS", "JavaScript"],
    image:
      "https://images.pexels.com/photos/4344878/pexels-photo-4344878.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "from-violet-400 to-indigo-500",
    glow: "rgba(139,92,246,0.4)",
    icon: "briefcase",
    links: { code: profile.github },
  },
  {
    id: "forms",
    title: "Google Animated Forms",
    client: "Global Quest Technologies",
    period: "Client Project",
    tagline: "A Google-Forms-style builder brought to life with smooth animations.",
    description:
      "An animated, Google-Forms-inspired form experience built for Global Quest Technologies. Users create and fill forms with multiple question types, while fluid micro-interactions and transitions make every step feel responsive and delightful.",
    features: [
      "Multiple question types — short answer, MCQ, checkboxes, dropdowns",
      "Smooth animated transitions between questions & sections",
      "Live validation with friendly error states",
      "Fully responsive across mobile, tablet & desktop",
      "Clean, Google-Material-inspired interface",
    ],
    stack: ["HTML", "CSS", "JavaScript", "React.js", "CSS Animations"],
    image:
      "https://images.pexels.com/photos/7821577/pexels-photo-7821577.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "from-fuchsia-400 to-pink-500",
    glow: "rgba(232,121,249,0.35)",
    icon: "form",
    links: { code: profile.github },
  },
];

export const experience = [
  {
    company: "Jspiders",
    role: "Java Full Stack Developer Intern",
    period: "Feb 2026 – Present",
    current: true,
    highlights: [
      "Developed web applications using Core Java, JDBC, SQL/MySQL, HTML, CSS, JavaScript and Bootstrap, implementing CRUD operations and responsive user interfaces.",
      "Built responsive Single Page Applications (SPA) using React.js with reusable functional components, React Router DOM, Props, Props Drilling, and hooks including useState, useRef and useContext.",
      "Integrated REST APIs using Fetch API, managed state with Context API, and used JSON Server for mock backend.",
    ],
    stack: ["Core Java", "JDBC", "MySQL", "React.js", "Context API"],
  },
  {
    company: "Amdox Technologies",
    role: "Web Development Intern",
    period: "Dec 2025 – Feb 2026",
    current: false,
    highlights: [
      "Developing a Job Listing Portal with responsive UI and interactive features.",
      "Implementing job posting, search, and filtering functionalities.",
      "Collaborating with the team on real-time web application development.",
    ],
    stack: ["Java", "Spring Boot", "HTML", "CSS", "JavaScript"],
  },
];

export const education = [
  {
    school: "Sri Krishnadevaraya University College of Engineering and Technology",
    short: "SKU College of Engineering & Technology",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    period: "Dec 2022 – Aug 2026",
    score: "8.2",
    scoreLabel: "CGPA",
    place: "Anantapur, Andhra Pradesh",
  },
  {
    school: "Sri Chaitanya Junior College",
    short: "Sri Chaitanya Junior College",
    degree: "Intermediate (MPC)",
    period: "Jun 2020 – Aug 2022",
    score: "9.36",
    scoreLabel: "CGPA",
    place: "Tirupati, Andhra Pradesh",
  },
];

export const achievements = [
  {
    title: "Class Representative (CR)",
    body: "Served as Class Representative during B.Tech — the bridge between students and faculty.",
    icon: "users",
  },
  {
    title: "Best Cricketer of the University (2024)",
    body: "Represented SKU in the AIU Inter-University Cricket tournament.",
    icon: "trophy",
  },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/* ───────────── Résumé content (used for PDF + preview) ───────────── */
export const resume = {
  name: "MARRIPATI SANTHAN",
  location: profile.location,
  email: profile.email,
  phone: profile.phone,
  linkedin: profile.linkedin,
  github: profile.github,
  summary: profile.summary,
  education: education.map((e) => ({
    left: e.school,
    right: e.period,
    sub: e.degree,
    subRight: `CGPA: ${e.score}`,
    place: e.place,
  })),
  internships: [
    {
      title: "Jspiders",
      role: "Java Full Stack Developer Intern",
      period: "Feb 2026 – Present",
      bullets: experience[0].highlights,
    },
    {
      title: "Amdox Technologies",
      role: "Web Development Intern",
      period: "Dec 2025 – Feb 2026",
      bullets: experience[1].highlights,
    },
  ],
  projects: [
    {
      title: "Vishal Mega Mart Customer Feedback Management System",
      period: "Jun 2026 – Jul 2026",
      bullets: [
        "Developed a full-stack Customer Feedback Management System using React.js, Node.js, Express.js, and MySQL.",
        "Implemented secure Admin authentication using JWT and bcrypt with role-based access to the dashboard.",
        "Designed responsive feedback and staff review modules with REST APIs, real-time analytics, and cloud deployment using Vercel and Render.",
      ],
    },
    {
      title: "Sans Yoga Sanctuary",
      period: "Feb 2026 – April 2026",
      bullets: [
        "Developed a Smart Yoga web application using Node.js, Express, and MongoDB.",
        "Implemented secure user authentication using JWT and bcrypt for encrypted password storage.",
        "Designed user registration and login system with proper validation and error handling.",
      ],
    },
    {
      title: "Job Listing Portal",
      period: "Jan 2026 – Mar 2026",
      bullets: [
        "Developed a full-stack Job Listing Portal using Java, Spring Boot, Hibernate, JPA, HTML, CSS, JavaScript, and MySQL, implementing CRUD operations, user authentication, and responsive web pages.",
        "Built RESTful APIs for job posting, search, and application management with frontend-backend integration.",
      ],
    },
  ],
  skills: [
    { label: "Programming Languages", value: "Java, Python, C, SQL" },
    { label: "Web Technologies", value: "HTML, CSS, JavaScript, Bootstrap" },
    { label: "Libraries/Frameworks", value: "React.js, Spring, Spring Boot, Hibernate, JDBC, JPA" },
    { label: "Databases", value: "MySQL, MongoDB" },
    { label: "Developer Tools", value: "Visual Studio Code, Eclipse, Spring Tool Suite (STS), Git, GitHub" },
  ],
  achievements: [
    "Served as Class Representative (CR) during B.Tech.",
    "Best Cricketer of the University (2024) represented SKU in AIU Inter-University Cricket.",
  ],
};
