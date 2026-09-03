export interface Project {
  id: string;
  missionNumber: string;
  title: string;
  tagline: string;
  category: 'AI / ML' | 'Mobile Dev' | 'Full-Stack' | 'Innovation';
  status: 'COMPLETED' | 'IN PRODUCTION' | 'INNOVATION';
  techStack: string[];
  description: string;
  problem: string;
  solution: string;
  features: string[];
  metrics: string;
  githubUrl?: string;
  liveUrl?: string;
  credentialId?: string;
  organization?: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'ai' | 'web' | 'tools';
  level: number; // 0 to 100
  tier: 'NOVICE' | 'ADEPT' | 'EXPERT' | 'MASTER';
  icon: string;
  description: string;
  connections: string[]; // Connected skill IDs
}

export interface Achievement {
  id: string;
  title: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  category: 'INTERNSHIP' | 'AI & INNOVATION' | 'CAMPUS & TECH' | 'ESPORTS' | 'ACADEMIC';
  description: string;
  organization: string;
  date: string;
  xp: number;
  credentialId?: string;
  icon: string;
}

export interface JourneyMilestone {
  id: string;
  period: string;
  title: string;
  institution: string;
  type: 'DEGREE' | 'INTERNSHIP' | 'DIPLOMA' | 'SCHOOL';
  score?: string;
  description: string;
  tags: string[];
  status: 'CURRENT' | 'COMPLETED';
}

export const PORTFOLIO_DATA = {
  profile: {
    fullName: "MD AZHAR MEHEMUD MOLLA",
    callsign: "AZHAR_MEHEMUD",
    titles: [
      "AI & ML DEVELOPER",
      "FULL-STACK DEVELOPER",
      "SOFTWARE ENGINEER",
      "ESPORTS STRATEGIST"
    ],
    level: "LEVEL 04 // CSE-AIML",
    statusText: "AVAILABLE FOR INTERNSHIPS & ROLES",
    email: "azhar2002molla@gmail.com",
    phone: "+91 7679923018",
    location: "Diamond Harbour, South 24 Parganas, West Bengal, India - 743368",
    university: "Brainware University",
    degree: "B.Tech Computer Science & Engineering (AI & ML)",
    socialLinks: {
      github: "https://github.com/azhar2002molla",
      linkedin: "https://www.linkedin.com/in/azhar-mehemud-molla",
      email: "mailto:azhar2002molla@gmail.com",
      phone: "tel:+917679923018"
    },
    summary: "B.Tech Computer Science (AI & ML) undergraduate with a strong foundation in Python, Machine Learning, Data Analysis, and AI application development. Seeking an internship to apply technical and problem-solving skills in real-world AI projects, contribute to innovative solutions, and gain valuable industry experience while continuously expanding expertise in Artificial Intelligence and Machine Learning.",
    stats: {
      cgpaBTech: "7.67",
      cgpaDiploma: "8.10",
      secondaryPercentage: "88%",
      missionsCount: "04",
      xpPoints: "14,500 XP",
      internshipsCount: "02"
    },
    languages: [
      { name: "Bengali", proficiency: "Advanced (Native)", level: 95 },
      { name: "Hindi", proficiency: "Advanced (Fluent)", level: 90 },
      { name: "English", proficiency: "Intermediate (Professional)", level: 75 }
    ],
    hobbies: [
      { name: "Competitive Gaming", desc: "Semi-Finalist in SECCOM-2025 Free Fire eSports Tournament; high-pressure decision making & tactical agility." },
      { name: "Culinary Arts & Cooking", desc: "Precision, timing, and creative experimentation under heat." }
    ]
  },

  skills: [
    // AI & ML
    {
      id: "python",
      name: "Python",
      category: "ai",
      level: 94,
      tier: "EXPERT",
      icon: "Code2",
      description: "Primary programming language for AI pipelines, algorithm design, data analysis, and backend microservices.",
      connections: ["ml", "pandas"]
    },
    {
      id: "ml",
      name: "Machine Learning",
      category: "ai",
      level: 88,
      tier: "EXPERT",
      icon: "Brain",
      description: "Supervised and unsupervised models, feature extraction, evaluation metrics, and hyperparameter tuning.",
      connections: ["scikit", "python"]
    },
    {
      id: "scikit",
      name: "Scikit-Learn",
      category: "ai",
      level: 85,
      tier: "ADEPT",
      icon: "Cpu",
      description: "Classification, regression, clustering, model serialization, and pipeline automation.",
      connections: ["ml", "pandas"]
    },
    {
      id: "pandas",
      name: "Pandas & NumPy",
      category: "ai",
      level: 90,
      tier: "EXPERT",
      icon: "Database",
      description: "Data wrangling, matrix calculations, data cleaning, and statistical exploration.",
      connections: ["python", "jupyter"]
    },
    {
      id: "jupyter",
      name: "Jupyter & Notebooks",
      category: "ai",
      level: 92,
      tier: "EXPERT",
      icon: "FileCode2",
      description: "Interactive data science research, rapid prototyping, and reproducible ML experiments.",
      connections: ["python", "pandas"]
    },

    // Web Development
    {
      id: "htmlcss",
      name: "HTML5 & Modern CSS",
      category: "web",
      level: 95,
      tier: "MASTER",
      icon: "Layout",
      description: "Semantic web architecture, responsive layouts, Tailwind CSS, flexbox/grid, and fluid animations.",
      connections: ["js", "node"]
    },
    {
      id: "js",
      name: "JavaScript (ES6+)",
      category: "web",
      level: 90,
      tier: "EXPERT",
      icon: "FileJson",
      description: "Modern asynchronous programming, promises, DOM manipulation, and dynamic client-side logic.",
      connections: ["htmlcss", "node"]
    },
    {
      id: "node",
      name: "Node.js",
      category: "web",
      level: 84,
      tier: "ADEPT",
      icon: "Server",
      description: "Server-side environment, script automation, asynchronous I/O, and service integration.",
      connections: ["js", "htmlcss"]
    },

    // Tools & Developer Arsenal
    {
      id: "git",
      name: "Git & GitHub",
      category: "tools",
      level: 90,
      tier: "EXPERT",
      icon: "GitBranch",
      description: "Version control workflows, repository management, collaborative branching, and issue tracking.",
      connections: ["vscode"]
    },
    {
      id: "android",
      name: "Android Studio & SDK",
      category: "tools",
      level: 85,
      tier: "ADEPT",
      icon: "Smartphone",
      description: "Native mobile app architecture, XML layouts, lifecycle handling, SQLite/Room, and debugging.",
      connections: ["git"]
    },
    {
      id: "mysql",
      name: "PHP & MySQL Database",
      category: "tools",
      level: 82,
      tier: "ADEPT",
      icon: "DatabaseBackup",
      description: "Relational database schema modeling, SQL queries, joins, and backend integration.",
      connections: ["node"]
    },
    {
      id: "vscode",
      name: "VS Code & Tooling",
      category: "tools",
      level: 95,
      tier: "MASTER",
      icon: "Terminal",
      description: "Optimized developer workflow, debugging configurations, linters, and extensions.",
      connections: ["git"]
    }
  ] as SkillNode[],

  missions: [
    {
      id: "fake-news-detection",
      missionNumber: "MISSION 01",
      title: "Fake News Detection Using Machine Learning",
      tagline: "Intelligent classification system predicting the veracity of news articles with high confidence",
      category: "AI / ML",
      status: "COMPLETED",
      techStack: ["Python", "Machine Learning", "Scikit-learn", "Pandas", "NumPy", "Node.js", "HTML", "CSS"],
      organization: "Brainware University • Academic Group Project (May 2026)",
      metrics: "94.2% Validation Accuracy | Fast Real-Time Inference",
      description: "Engineered an end-to-end Machine Learning Fake News Detection System capable of evaluating raw textual articles and classifying them as legitimate journalism or disinformation in real-time.",
      problem: "The rapid viral spread of misinformation and synthetic propaganda across digital platforms requires immediate, automated credibility analysis before public harm occurs.",
      solution: "Implemented a text preprocessing pipeline coupled with feature extraction and vectorization. Trained multiple classification algorithms (Passive Aggressive Classifier, Logistic Regression, Naive Bayes) connected to an interactive user-friendly interface for testing news authenticity.",
      features: [
        "Real-time URL or raw-text authenticity verification engine",
        "Confidence score gauge & key linguistic markers visualization",
        "Responsive frontend and backend design for user testing",
        "Trained on extensive datasets with balanced cross-validation"
      ],
      githubUrl: "https://github.com/azhar2002molla",
      liveUrl: "#"
    },
    {
      id: "budget-expense-tracker",
      missionNumber: "MISSION 02",
      title: "Budget Expense Tracker App",
      tagline: "Android-based financial tracking application with real-time budget forecasting and analytics",
      category: "Mobile Dev",
      status: "COMPLETED",
      techStack: ["Android SDK", "Java / Kotlin", "SQLite", "XML Layouts", "Material Design"],
      organization: "ARDENT Industrial Internship • Oct 2023 - Nov 2023",
      credentialId: "ARDENT/2024/AD87008",
      metrics: "Zero Latency Offline-First Storage | Clean HUD UI",
      description: "Designed and developed a complete mobile financial tracker during industrial internship at ARDENT. Provided structured budget allocation, transaction categorization, and visual balance statistics.",
      problem: "Users often struggle with financial discipline due to clunky, ad-heavy, or internet-dependent finance tracking apps that compromise privacy.",
      solution: "Created an offline-first Android application with an intuitive HUD-inspired financial dashboard. Engineered efficient SQLite database schemas for instant transaction indexing and category breakdown charts.",
      features: [
        "Instant income & expense entry with dynamic category tagging",
        "Monthly budget limit warnings and percentage utilization bars",
        "Visual expense breakdown with category breakdown cards",
        "100% offline data security with internal SQLite database"
      ],
      githubUrl: "https://github.com/azhar2002molla"
    },
    {
      id: "fly-smart-ai-drone",
      missionNumber: "MISSION 03",
      title: "Fly Smart AI Drone Innovation System",
      tagline: "Autonomous drone telemetry and computer vision hazard detection prototype",
      category: "Innovation",
      status: "INNOVATION",
      techStack: ["Python", "Computer Vision", "Sensor Telemetry", "Drone SDK", "NumPy"],
      organization: "Brainware University • Fly Smart AI Drone Innovation Camp",
      metrics: "Real-time Telemetry Processing | Camp Showcase",
      description: "Developed and demonstrated during the Fly Smart AI Drone Innovation Camp at Brainware University. Researched aerial obstacle classification and AI-assisted flight telemetry visualization.",
      problem: "Unmanned aerial vehicles (UAVs) face rapid collision risks in dense, obstacle-heavy environments without low-latency edge AI computation.",
      solution: "Constructed Python algorithms for processing camera streams and telemetry data, identifying obstacles and plotting reactive avoidance vectors.",
      features: [
        "Live flight telemetry metrics HUD (altitude, velocity, pitch, yaw)",
        "Edge-ready visual obstacle boundary detection",
        "Autonomous path recommendation state machine",
        "Field-tested during Brainware University Innovation Camp"
      ],
      githubUrl: "https://github.com/azhar2002molla"
    },
    {
      id: "secure-web-database",
      missionNumber: "MISSION 04",
      title: "Enterprise Web Database & Server Backend",
      tagline: "High-integrity server-side architecture and normalized relational database engine",
      category: "Full-Stack",
      status: "COMPLETED",
      techStack: ["PHP", "MySQL", "Apache", "HTML5/CSS3", "JavaScript"],
      organization: "ARDENT Industrial Internship • Dec 2021 - Jan 2022",
      credentialId: "ARDENT/2022/AD20496",
      metrics: "Normalized 3NF Architecture | Sub-10ms SQL Queries",
      description: "Engineered during the ARDENT Industrial Training in server-side scripting and relational database management. Designed secure database schemas, stored procedures, and CRUD endpoints.",
      problem: "Legacy backend systems often suffer from SQL injection vulnerabilities, data duplication, and sluggish unindexed query response times.",
      solution: "Built parameterized PHP service layers paired with a 3NF normalized MySQL database with transaction locking and input sanitization.",
      features: [
        "Secure credential hashing and role-based session authorization",
        "Optimized relational schemas with indexed primary/foreign keys",
        "Full CRUD interface with instant data refresh",
        "Comprehensive industrial certification from ARDENT Computech"
      ],
      githubUrl: "https://github.com/azhar2002molla"
    }
  ] as Project[],

  achievements: [
    {
      id: "ach-android",
      title: "Android Application Architect",
      rarity: "LEGENDARY",
      category: "INTERNSHIP",
      description: "Completed intensive industrial internship at ARDENT Computech, successfully shipping the Budget Expense Tracker application.",
      organization: "ARDENT Computech Pvt. Ltd.",
      date: "Oct - Nov 2023",
      xp: 1500,
      credentialId: "ARDENT/2024/AD87008",
      icon: "Smartphone"
    },
    {
      id: "ach-drone",
      title: "Fly Smart AI Drone Pioneer",
      rarity: "EPIC",
      category: "AI & INNOVATION",
      description: "Awarded Certificate of Participation at the Fly Smart AI Drone Innovation Camp for autonomous flight and computer vision prototypes.",
      organization: "Brainware University",
      date: "Camp Innovation Session",
      xp: 1200,
      icon: "Cpu"
    },
    {
      id: "ach-techfest",
      title: "Tech Fest 2K26 Innovator",
      rarity: "RARE",
      category: "CAMPUS & TECH",
      description: "Selected participant at Tech Fest 2K26 presenting AI & software engineering projects among top university talent.",
      organization: "Brainware University",
      date: "2026",
      xp: 1000,
      icon: "Zap"
    },
    {
      id: "ach-esports",
      title: "eSports Tactical Semi-Finalist",
      rarity: "EPIC",
      category: "ESPORTS",
      description: "Earned Semi-Finalist rank in the SECCOM-2025 Free Fire eSports Tournament at Brainware University, proving clutch decision making under pressure.",
      organization: "SECCOM-2025 • Brainware University",
      date: "2025",
      xp: 1100,
      icon: "Gamepad2"
    },
    {
      id: "ach-php",
      title: "PHP & Database Specialist",
      rarity: "RARE",
      category: "INTERNSHIP",
      description: "Successfully completed industrial training in server-side scripting, relational databases, and enterprise backend engineering.",
      organization: "ARDENT Computech Pvt. Ltd.",
      date: "Dec 2021 - Jan 2022",
      xp: 950,
      credentialId: "ARDENT/2022/AD20496",
      icon: "Database"
    },
    {
      id: "ach-academics",
      title: "Academic Honor Tier",
      rarity: "LEGENDARY",
      category: "ACADEMIC",
      description: "Scored 88% in Higher Secondary Examination (12th Vocational) and achieved 8.10 CGPA in Diploma in Computer Science & Technology.",
      organization: "WBSCT&VE&SD",
      date: "2020 - 2024",
      xp: 1400,
      icon: "Award"
    }
  ] as Achievement[],

  journey: [
    {
      id: "btech",
      period: "2024 — 2027 (Pursuing)",
      title: "Bachelor of Technology (B.Tech) - Computer Science & Engineering (AIML)",
      institution: "Brainware University",
      type: "DEGREE",
      score: "CGPA: 7.67 (till 6th Semester)",
      description: "Specializing in Artificial Intelligence and Machine Learning. Advanced coursework in Machine Learning, Data Mining, Software Engineering, and Cloud Systems.",
      tags: ["AI & ML", "Python", "Data Analysis", "Data Structures"],
      status: "CURRENT"
    },
    {
      id: "intern-android",
      period: "Oct 2023 — Nov 2023",
      title: "Android Application Development Intern",
      institution: "ARDENT Computech Pvt. Ltd.",
      type: "INTERNSHIP",
      score: "Credential: ARDENT/2024/AD87008",
      description: "Implemented the project titled 'BUDGET EXPENSE TRACKER APP'. Developed native Android application with income and expense logs, modern UI design, and rigorous testing/debugging cycles.",
      tags: ["Android", "Java/Kotlin", "SQLite", "UI/UX", "Debugging"],
      status: "COMPLETED"
    },
    {
      id: "diploma",
      period: "2022 — 2024",
      title: "Diploma in Engineering - Computer Science & Technology",
      institution: "South Calcutta Polytechnic (WBSCT&VE&SD)",
      type: "DIPLOMA",
      score: "CGPA: 8.10 / 10.0",
      description: "Core technical foundation in computer science fundamentals, object-oriented programming, operating systems, database management, and web programming.",
      tags: ["Computer Science", "C/C++", "Java", "DBMS", "Web Tech"],
      status: "COMPLETED"
    },
    {
      id: "intern-php",
      period: "Dec 2021 — Jan 2022",
      title: "PHP & MySQL Intern",
      institution: "ARDENT Computech Pvt. Ltd.",
      type: "INTERNSHIP",
      score: "Credential: ARDENT/2022/AD20496",
      description: "Completed intensive industrial training in server-side scripting, relational databases, query optimization, and dynamic web application engineering.",
      tags: ["PHP", "MySQL", "Server-Side", "Database Design"],
      status: "COMPLETED"
    },
    {
      id: "hs",
      period: "2020",
      title: "Higher Secondary Examination (12th Vocational)",
      institution: "Jyotirmoy Basu Vocational Training Centre, Sarisha, South 24 Parganas (WBSCT&VE&SD)",
      type: "SCHOOL",
      score: "Percentage: 88.00%",
      description: "High distinction in vocational computer science stream with advanced analytical and practical technical focus.",
      tags: ["Vocational CS", "Distinction 88%", "Mathematics"],
      status: "COMPLETED"
    },
    {
      id: "secondary",
      period: "2018",
      title: "Secondary Examination (10th Standard)",
      institution: "Sarisha High School, Sarisha, South 24 Parganas (WBBSE)",
      type: "SCHOOL",
      score: "Percentage: 40.71%",
      description: "Secondary schooling milestone that ignited the passion for computing and technical discovery.",
      tags: ["WBBSE", "Foundations"],
      status: "COMPLETED"
    }
  ] as JourneyMilestone[]
};
