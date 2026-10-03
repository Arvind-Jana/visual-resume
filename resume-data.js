// Single Source of Truth for Jana Arvind Surya's Visual Resume & Virtual Ambassador
const RESUME_DATA = {
  candidate: {
    fullName: "Jana Arvind Surya",
    preferredName: "Arvind",
    targetRole: "AI Application Engineer / Full-Stack AI Developer",
    statusBadge: "Available for AI Engineering & Full-Stack Roles",
    headline: "Building production-grade real-time systems powered by Generative AI, resilient backends, and high-impact interactive visualization.",
    shortBio: "Detail-oriented software engineer and data analyst specializing in full-stack AI applications, real-time WebSockets, and multivariate interactive dashboards. Proven ability to architect contest-winning systems (Handshake x OpenAI, Google Gemini) that transform complex models and datasets into engaging user experiences.",
    location: "India (Open to Global Remote & Relocation)",
    contact: {
      email: "arvindjana05@gmail.com",
      github: "https://github.com/Arvind-Jana",
      githubUsername: "Arvind-Jana",
      linkedin: "https://linkedin.com/in/arvind-jana",
      portfolio: "https://arvind-jana.github.io"
    },
    privacyNotice: "Protected against sensitive data leaks: Personal phone number and residential address are intentionally withheld for privacy. Direct contact is welcomed via verified email and professional networks."
  },

  theBigThree: [
    {
      id: "big-three-1",
      number: "01",
      badge: "Full-Stack AI Systems",
      title: "End-to-End Real-Time AI Application Builder",
      claim: "Architects and deploys low-latency, resilient full-stack applications with synchronized client-server state and generative AI integrations.",
      proof: {
        projectTitle: "Turing Trap — Multiplayer AI Impostor Party Game",
        contest: "Handshake AI Skills Studio x OpenAI Challenge",
        score: "5/5 across all 4 evaluation criteria (Execution, Creativity, Value, Polish)",
        details: "Engineered an authoritative room state machine using Node.js, Express, and Socket.io. Implemented secret AI text generation, synchronized 30-second voting countdowns, automated headless bot simulation for single-player testing, and zero-dependency procedural Web Audio sound synthesis.",
        latencyMetric: "< 50ms synchronized room latency",
        repoUrl: "https://github.com/Arvind-Jana/turing-trap-multiplayer"
      }
    },
    {
      id: "big-three-2",
      number: "02",
      badge: "Data & Interactive UX",
      title: "Translating Complex Data into High-Value Interactive Products",
      claim: "Bridges quantitative financial models and modern LLM analytics into intuitive, zero-dependency interactive visualizers.",
      proof: {
        projectTitle: "AI Career & Compensation Decision Navigator",
        contest: "Handshake AI Skills Studio x Google Gemini Mission",
        score: "5/5 on Official Handshake Rubric",
        details: "Synthesized 2,450+ benchmarked compensation points across 6 tech domains. Designed dynamic 5-axis Radar charts, cost-of-living tax arbitrage algorithms, and real-time interactive sliders (Experience, AI Upskilling, Remote Days, Rent) using pure HTML5, Tailwind CSS, and Chart.js.",
        discoveryMetric: "Identified +28.4% compensation multiplier for verified AI competencies",
        repoUrl: "https://github.com/Arvind-Jana/ai-career-pulse-dashboard"
      }
    },
    {
      id: "big-three-3",
      number: "03",
      badge: "Core Fundamentals",
      title: "Rigorous CS Foundations with Rapid Learning Velocity",
      claim: "Combines strong formal computer science training with hands-on predictive machine learning, SQL data pipelines, and fast tool adoption.",
      proof: {
        degree: "B.Tech in Computer Science & Design (CSD)",
        institution: "Sasi Institute of Technology and Engineering",
        internships: "AI & ML Virtual Intern (supervised/unsupervised modeling, feature engineering) + Android & SQL Developer Intern (ETL pipelines, data quality remediation).",
        certifications: "IBM (Data Science, Getting Started with Data) and Infosys Springboard (Express.js, MongoDB, Java, Data Science).",
        details: "Proven capability to independently master and integrate new technologies—from WebSockets and Web Audio API to Chart.js and LLM prompt engineering—shipping production-grade submissions in rapid sprints."
      }
    }
  ],

  projects: [
    {
      id: "turing-trap",
      rank: 1,
      title: "Turing Trap: Multiplayer AI Impostor Party Game",
      tagline: "Social deception multiplayer web app teaching AI literacy through real-time gameplay",
      affiliation: "Handshake AI Skills Studio X OpenAI Challenge",
      scoreBadge: "Contest Rubric: 20/20 (100%)",
      coverImage: "assets/turing_trap.jpg",
      tags: ["Node.js", "Socket.io", "Express", "OpenAI / LLMs", "Web Audio API", "HTML5/CSS3"],
      whatIDid: [
        "Architected an authoritative WebSocket room manager and state machine handling lobby creation, prompt dispatch, anonymous submission shuffling, and synchronized countdown timers.",
        "Integrated an undercover AI response generation engine that mimics human student writing under quirky career and academic dilemmas.",
        "Engineered an autonomous 'Simulated Friend' bot engine enabling solo evaluators to test complete multiplayer game loops with one click.",
        "Created a zero-dependency procedural audio synthesizer using the native Web Audio API (buzzer, fanfare, tension ticks) and a custom canvas confetti engine."
      ],
      howItTurnedOut: [
        "Earned a maximum 5/5 score across Execution, Creativity, Usefulness, and Polish in the Handshake x OpenAI challenge.",
        "Achieved seamless sub-50ms synchronized room transitions across mobile and desktop clients.",
        "Zero external audio dependencies, resulting in lightning-fast asset loading and full cross-browser compatibility."
      ],
      links: {
        demo: "http://localhost:3000",
        github: "https://github.com/Arvind-Jana/turing-trap-multiplayer"
      }
    },
    {
      id: "career-navigator",
      rank: 2,
      title: "AI Career & Compensation Decision Navigator",
      tagline: "Multivariate trade-off visualizer modeling compensation, AI upskilling, and geographic rent arbitrage",
      affiliation: "Handshake AI Skills Studio X Google Gemini Mission",
      scoreBadge: "Contest Rubric: 20/20 (100%)",
      coverImage: "assets/career_dashboard.jpg",
      tags: ["Google Gemini Workflows", "Chart.js", "Tailwind CSS", "Data Modeling", "JavaScript ES6"],
      whatIDid: [
        "Synthesized 2,450+ compensation benchmarks across 6 tech domains (Stack Overflow 2024-2025, Levels.fyi, BLS).",
        "Formulated mathematical models quantifying the trade-offs between gross salary, state income taxes, local rent, remote work flexibility, and automation risk.",
        "Engineered a zero-dependency single-page application featuring interactive sliders (Experience, AI Upskilling, Remote Days, Rent) and dynamic 5-axis Radar charts that recalculate without page reloads.",
        "Implemented real-time client-side CSV dataset export for data portability."
      ],
      howItTurnedOut: [
        "Awarded 5/5 on all criteria (Execution, Creativity, Usefulness, Polish) in the Google Gemini data mission.",
        "Uncovered empirical insight: 8-10 weekly hours of verified AI upskilling awards junior engineers a +28.4% compensation premium.",
        "Demonstrated geographic arbitrage where remote and lower-cost tech hubs yielded 21.8% higher net discretionary savings over Tier-1 hubs."
      ],
      links: {
        demo: "dashboard.html",
        github: "https://github.com/Arvind-Jana/ai-career-pulse-dashboard"
      }
    },
    {
      id: "clay-b2b-pipeline",
      rank: 3,
      title: "Intelligent B2B Account Scoring & Prospecting Engine",
      tagline: "Automated account enrichment and lead qualification workflow for high-fit enterprise targets",
      affiliation: "Clay Data Enrichment & Sales Intelligence Project",
      scoreBadge: "25 High-Value Enterprise Accounts Scored",
      coverImage: "assets/clay_preview.jpg",
      tags: ["Clay", "Data Enrichment", "Lead Qualification", "Account Scoring", "B2B Sales Ops"],
      whatIDid: [
        "Designed account tiering formulas combining firmographic criteria, technology stack adoption, and hiring signals.",
        "Built automated multi-step enrichment workflows to verify key decision-maker personas across 25 target accounts.",
        "Structured automated data validation rules to detect missing attributes and eliminate bad data points prior to outreach."
      ],
      howItTurnedOut: [
        "Delivered a verified 25-account ICP lead list with prioritized tiers and account-level qualification rationales.",
        "Produced comprehensive executive briefing documentation and CSV export ready for CRM integration."
      ],
      links: {
        demo: "#",
        github: "https://github.com/Arvind-Jana"
      }
    },
    {
      id: "predictive-ml-internships",
      rank: 4,
      title: "Predictive Machine Learning & SQL Transformation Pipelines",
      tagline: "Production data cleaning, regression modeling, and automated executive review reporting",
      affiliation: "AI/ML & Android Developer Internships (Jan '24 — Jun '24)",
      scoreBadge: "Enterprise Review Ready",
      coverImage: "assets/career_dashboard.jpg",
      tags: ["Python", "SQL", "Pandas", "Scikit-Learn", "Data Modeling", "ETL"],
      whatIDid: [
        "Developed supervised and unsupervised ML models exploring linear regression, decision trees, and baseline neural networks.",
        "Conducted end-to-end data preprocessing, feature engineering, and statistical trend analysis on business datasets.",
        "Extracted and transformed complex datasets using SQL to power monthly executive performance reviews.",
        "Identified data quality discrepancies and implemented verification queries to maintain reporting integrity."
      ],
      howItTurnedOut: [
        "Streamlined monthly reporting turnarounds by delivering clean, validated SQL transformations.",
        "Standardized visualization dashboards for cross-functional stakeholders, enhancing strategic clarity."
      ],
      links: {
        demo: "#",
        github: "https://github.com/Arvind-Jana"
      }
    }
  ],

  technicalSkills: {
    "AI & Generative Systems": [
      { name: "OpenAI API & Prompt Engineering", level: 92 },
      { name: "Google Gemini Workflows", level: 90 },
      { name: "RAG & Context Injection", level: 85 },
      { name: "LLMOps & Synthetic Data Generation", level: 88 },
      { name: "Scikit-Learn & Predictive Modeling", level: 82 }
    ],
    "Full-Stack & Systems Engineering": [
      { name: "Node.js & Express.js", level: 95 },
      { name: "WebSockets & Socket.io", level: 92 },
      { name: "JavaScript (ES6+) & Modern DOM", level: 94 },
      { name: "HTML5, CSS3 & Tailwind CSS", level: 92 },
      { name: "Python", level: 88 },
      { name: "Web Audio API & Canvas", level: 85 }
    ],
    "Data Engineering & Analytics": [
      { name: "SQL (Queries, Joins, Aggregations)", level: 90 },
      { name: "Pandas & NumPy", level: 86 },
      { name: "Data Cleaning & Feature Engineering", level: 88 },
      { name: "Chart.js & Data Visualization", level: 92 },
      { name: "MongoDB", level: 80 }
    ],
    "Tools & Deployment": [
      { name: "Git & GitHub Version Control", level: 92 },
      { name: "Replit Cloud Hosting & Debugging", level: 95 },
      { name: "Render / Railway / Cloud Deployment", level: 88 },
      { name: "VS Code & Antigravity IDE", level: 95 }
    ]
  },

  education: [
    {
      degree: "B.Tech in Computer Science and Design (CSD)",
      institution: "Sasi Institute of Technology and Engineering",
      location: "Tadepalligudem, India",
      period: "Sep 2022 — Present",
      gpa: "6.69 / 10.0",
      highlights: "Core studies in Algorithms, Database Systems, Web Technologies, Software Architecture, and User Experience Design."
    },
    {
      degree: "Intermediate in MPC (Mathematics, Physics, Chemistry)",
      institution: "Tirumala Junior College",
      location: "Rajahmundry, India",
      period: "Jan 2020 — May 2022",
      gpa: "7.7 / 10.0",
      highlights: "Strong mathematical foundation in calculus, probability, and linear algebra."
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Bhashyam English Medium School",
      location: "Tanuku, India",
      period: "Jun 2019 — Apr 2020",
      gpa: "9.6 / 10.0",
      highlights: "Academic distinction with 96% cumulative score."
    }
  ],

  certifications: [
    { title: "Getting Started with Data", issuer: "IBM", badge: "Verified Credential" },
    { title: "Intro to Data Science", issuer: "Infosys Springboard", badge: "Verified Credential" },
    { title: "Express.js", issuer: "Infosys Springboard", badge: "Verified Credential" },
    { title: "MongoDB Database Management", issuer: "Infosys Springboard", badge: "Verified Credential" },
    { title: "Java Development", issuer: "Infosys Springboard", badge: "Verified Credential" },
    { title: "Intro to Data", issuer: "IBM", badge: "Verified Credential" }
  ],

  // Ambassador Strict Boundary Policy & FAQ Knowledge Base
  ambassadorPolicy: {
    name: "Arvind's Virtual Ambassador",
    tone: "Professional, confident, articulate, evidence-based, and completely honest.",
    groundingRule: "Only answer based on verified facts from Arvind's resume, contest projects, code repositories, and public documentation. Never speculate, never invent private details, and never share sensitive contact info.",
    honestRefusalMessage: "I only have access to Arvind's verified professional portfolio, resume, and public technical work. I don't have information on that particular topic, and I am strictly programmed to answer only verified facts. For any personal or specific inquiries, please feel free to reach out directly to Arvind via email (arvindjana05@gmail.com) or LinkedIn!",
    restrictedTopics: [
      "phone number",
      "home address",
      "street address",
      "salary history / current compensation",
      "personal relationships",
      "unrelated trivia",
      "political views"
    ]
  }
};

// Export for Node.js server and browser window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RESUME_DATA;
}
