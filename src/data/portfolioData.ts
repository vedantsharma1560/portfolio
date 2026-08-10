import { Project, SkillCategory, ExperienceItem, ServiceItem } from '../types';

// Unnati Insurance Screenshots
import unnati1 from '../assets/images/unnati-insurance/Screenshot 2026-08-09 125319.png';
import unnati2 from '../assets/images/unnati-insurance/Screenshot 2026-08-09 125336.png';
import unnati3 from '../assets/images/unnati-insurance/Screenshot 2026-08-09 114259.png';
import unnati4 from '../assets/images/unnati-insurance/Screenshot 2026-08-09 114353.png';
import unnati5 from '../assets/images/unnati-insurance/Screenshot 2026-08-09 114949.png';
import unnati6 from '../assets/images/unnati-insurance/Screenshot 2026-08-09 115148.png';

// SSC-CAT Screenshots
import cat1 from '../assets/images/ssc-content-authoring/cat1.jpg';
import cat2 from '../assets/images/ssc-content-authoring/cat1.jpg';
import cat3 from '../assets/images/ssc-content-authoring/cat1.jpg';
import cat4 from '../assets/images/ssc-content-authoring/cat1.jpg';
import cat5 from '../assets/images/ssc-content-authoring/cat1.jpg';
import cat6 from '../assets/images/ssc-content-authoring/cat1.jpg';
import cat7 from '../assets/images/ssc-content-authoring/cat1.jpg';

// CLST Metaco Screenshots
import clst1 from '../assets/images/clst-metaco/clst-1.jpg';
import clst2 from '../assets/images/clst-metaco/clst-2.jpg';
import clst3 from '../assets/images/clst-metaco/clst-3.jpg';
import clst4 from '../assets/images/clst-metaco/clst-4.jpg';
import clst5 from '../assets/images/clst-metaco/clst-5.jpg';
import clst6 from '../assets/images/clst-metaco/clst-6.jpg';
import clst7 from '../assets/images/clst-metaco/clst-7.jpg';

// xNet HRMS Screenshots
import xnet1 from '../assets/images/xnet-hrms/Screenshot 2026-08-09 122839.png';
import xnet2 from '../assets/images/xnet-hrms/Screenshot 2026-08-09 122923.png';
import xnet3 from '../assets/images/xnet-hrms/Screenshot 2026-08-09 123055.png';
import xnet4 from '../assets/images/xnet-hrms/Screenshot 2026-08-09 123208.png';
import xnet5 from '../assets/images/xnet-hrms/Screenshot 2026-08-09 123252.png';

export const PERSONAL_INFO = {
  name: 'Vedant Sharma',
  title: 'Full Stack Developer & Systems Architect',
  shortBio: 'Architecting high-performance enterprise web platforms, scalable microservices, secure authorization engines, and real-time event pipelines.',
  fullBio: 'Full Stack Developer with expertise across Angular, React, Node.js, Express, Spring Boot, and cloud databases (PostgreSQL, MongoDB, Oracle DB). Proven track record designing enterprise workflow modules, RBAC security frameworks, and real-time notification pipelines for organizations including Iffco Tokio, Staff Selection Commission (SSC), and Metaco.',
  location: 'Gurugram, Haryana, India',
  email: 'vedantpandit7451006610@gmail.com',
  phone: '+91 7451006610',
  availability: 'Open for Full Stack & Senior Engineering Roles',
  stats: [
    { value: '3.5+', label: 'Years Experience', count: 3.5, suffix: '+' },
    { value: '25+', label: 'Enterprise Modules Shipped', count: 15, suffix: '+' },
    { value: '4+', label: 'Access & Security Layer Implemented', count: 4, suffix: '+' },
    { value: '70%', label: 'Operational Cost Reduction', count: 70, suffix: '%' }
  ],
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com/in/vedantsharma15'
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'unnati-insurance',
    title: 'Unnati Insurance Portal — Enterprise Policy Engine',
    subtitle: 'End-to-end policy issuance workflow for Iffco Tokio General Insurance across PAN India.',
    category: 'Enterprise / Full Stack',
    description: 'Designed and developed end-to-end policy issuance workflow modules replacing legacy peripheral systems, reducing operational costs by over 70%.',
    longDescription: 'Engineered a mission-critical policy issuance suite deployed to insurance agents across India. Features granular front-end & back-end RBAC, generic validation frameworks across 5+ microservices, and high-throughput Oracle DB transactions.',
    image: unnati1,
    screenshots: [
      unnati1,
      unnati2,
      unnati3,
      unnati4,
      unnati5,
      unnati6
    ],
    tags: ['Angular', 'Spring Boot', 'Node.js', 'Oracle DB', 'Kong API Gateway', 'RBAC'],
    demoUrl: 'https://linkedin.com/in/vedantsharma15',
    githubUrl: 'https://linkedin.com/in/vedantsharma15',
    featured: true,
    architecture: [
      'Spring Boot & Node.js microservices architecture routed through Kong API Gateway',
      'Generic Validation Framework eliminating 3rd-party parsing overhead across 5+ services',
      'Front-end and back-end Role-Based Access Control (RBAC) yielding 90% data security fortification',
      'Optimized Oracle DB query indexing for instant multi-region policy lookups'
    ],
    challenges: [
      {
        problem: 'Legacy peripheral systems were fragmented, causing high operational latency and frequent unauthorized field edits.',
        solution: 'Built a unified Angular workflow with strict RBAC rules and back-end validation, cutting operational costs by 70%.'
      }
    ],
    features: [
      'Multi-step guided insurance policy issuing wizard',
      'Role-based permissions with fine-grained field level locks',
      'Generic microservice request payload validation framework',
      'PAN-India agent analytics and policy history dashboard'
    ],
    metrics: [
      { label: 'Cost Savings', value: '70%+' },
      { label: 'Security Fortification', value: '90%' },
      { label: 'Microservices', value: '5+' }
    ],
    timeline: 'Cubastion Consulting',
    client: 'Iffco Tokio General Insurance'
  },
  {
    id: 'ssc-content-authoring',
    title: 'Content Authoring Tool — SSC Vault & Assessment Platform',
    subtitle: 'Secure inbound vault interface for encryption, authorization, and MinIO storage of 100k+ records.',
    category: 'Security / Cloud Services',
    description: 'Vault Inbound Interface securing authorization, encryption, decryption, and object storage for over 100,000 national assessment records.',
    longDescription: 'Built for Staff Selection Commission (SSC), this platform manages confidential question banks and assessment assets with zero risk of data leakage. Uses Kafka for asynchronous microservice streaming and MinIO for encrypted object storage.',
    image: cat1,
    screenshots: [
      cat1,
      cat2,
      cat3,
      cat4,
      cat5,
      cat6,
      cat7
    ],
    tags: ['Angular', 'Node.js', 'MinIO', 'Apache Kafka', 'MongoDB', 'PostgreSQL', 'Kong'],
    demoUrl: 'https://linkedin.com/in/vedantsharma15',
    githubUrl: 'https://linkedin.com/in/vedantsharma15',
    featured: true,
    architecture: [
      'Vault Inbound Interface with hardware-grade AES encryption & decryption pipelines',
      'Apache Kafka consumer microservices for async event-driven record dispatching',
      'MinIO Object Storage cluster storing encrypted images for 500+ assessment questions',
      'Hybrid PostgreSQL and MongoDB database persistence layers'
    ],
    challenges: [
      {
        problem: 'High vulnerability to data leaks and phishing during national exam question authoring.',
        solution: 'Engineered end-to-end Vault encryption with MinIO object storage, reducing data leakage risk by 100%.'
      }
    ],
    features: [
      'Zero-trust content authoring canvas with real-time preview',
      'MinIO encrypted image upload and rapid retrieval pipeline',
      'Asynchronous Kafka event queues across microservices',
      'Strict audit trails and version control'
    ],
    metrics: [
      { label: 'Records Secured', value: '100,000+' },
      { label: 'Risk Reduction', value: '100%' },
      { label: 'Questions Uploaded', value: '500+' }
    ],
    timeline: 'Cubastion Consulting',
    client: 'Staff Selection Commission (SSC)'
  },
  {
    id: 'xnet-hrms',
    title: 'xNet — Next-Gen HRMS & Asset Management Portal',
    subtitle: 'Enterprise HR portal featuring Elasticsearch SEO, digital asset auditing, and MSAL authentication.',
    category: 'Full Stack',
    description: 'Integrated Elasticsearch based on Apache Lucene for 75% faster search, along with digital asset lending and MSAL single sign-on.',
    longDescription: 'xNet modernizes enterprise asset management and HR workflows. Replaced manual spreadsheets with an automated digital lending/auditing module (70% time saved) and MSAL login (99% drop in phishing activity).',
    image: xnet1,
    screenshots: [
      xnet1,
      xnet2,
      xnet3,
      xnet4,
      xnet5
    ],
    tags: ['Angular', 'Node.js', 'Express.js', 'MySQL', 'Elasticsearch', 'Kafka', 'OAuth 2.0 / MSAL'],
    demoUrl: 'https://linkedin.com/in/vedantsharma15',
    githubUrl: 'https://linkedin.com/in/vedantsharma15',
    featured: true,
    architecture: [
      'Elasticsearch integration based on Apache Lucene for full-text search',
      'Microsoft Authentication Library (MSAL) and OAuth 2.0 SSO integration',
      'Digital Asset Management & auditing pipeline replacing spreadsheet logs',
      'MySQL relational database schema with normalized asset tracking tables'
    ],
    challenges: [
      {
        problem: 'Slow search filters and unauthorized access attempts through legacy portal logins.',
        solution: 'Embedded Elasticsearch for instant indexing and MSAL authentication, resulting in a 99% drop in unauthorized access attempts.'
      }
    ],
    features: [
      'Elasticsearch full-text search with instant facets and filters',
      'Digital employee asset lending, tracking, and audit workflows',
      'MSAL single sign-on with role-based dashboard views',
      'Kafka event notifications for asset transfers'
    ],
    metrics: [
      { label: 'Search Latency Drop', value: '75%' },
      { label: 'Phishing Reduction', value: '99%' },
      { label: 'Resource Utilization', value: '-70%' }
    ],
    timeline: 'Cubastion Consulting',
    client: 'Cubastion Enterprise'
  },
  {
    id: 'clst-metaco',
    title: 'CLST — Digital Asset Lending Platform',
    subtitle: 'Institutional digital asset platform with JWT authorization, Kafka, and WebSocket notifications.',
    category: 'Fintech / Real-time',
    description: 'Role-based access authorization using JWT & Google Client APIs, plus real-time Kafka & WebSocket messaging.',
    longDescription: 'CLST provides secure institutional lending for digital assets. Simplifies access control via JWT & OAuth, achieves 90% data security fortification, and broadcasts instant real-time loan notifications via Kafka and WebSockets.',
    image: clst1,
    screenshots: [
      clst1,
      clst2,
      clst3,
      clst4,
      clst5,
      clst6,
      clst7
    ],
    tags: ['Angular', 'Node.js', 'PostgreSQL', 'Kafka', 'WebSocket', 'Keycloak', 'JWT'],
    demoUrl: 'https://linkedin.com/in/vedantsharma15',
    githubUrl: 'https://linkedin.com/in/vedantsharma15',
    featured: false,
    architecture: [
      'Kafka & WebSocket real-time messaging pipeline for sub-second trade notifications',
      'Keycloak & JWT authorization coupled with Google Client APIs',
      'PostgreSQL transactional database with strict foreign key constraints',
      'Payment Gateway integration for automated multi-currency settlement'
    ],
    challenges: [
      {
        problem: 'Need for ultra-fast, secure real-time alerts on lending state changes.',
        solution: 'Built a WebSocket broadcasting layer powered by Kafka pub/sub topics for seamless communication.'
      }
    ],
    features: [
      'Real-time lending transaction feeds with WebSockets',
      'Keycloak SSO and JWT role authorization',
      'Secure payment gateway checkout workflow',
      'Automated loan lifecycle and collateral monitoring'
    ],
    metrics: [
      { label: 'Security Fortification', value: '90%' },
      { label: 'Notification Speed', value: '< 50ms' },
      { label: 'Uptime', value: '99.9%' }
    ],
    timeline: 'Cubastion Consulting',
    client: 'Metaco'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Front-End',
    skills: [
      { name: 'Angular & Angular Material', level: 96, iconName: 'Code', description: 'Enterprise modules, reactive forms, RxJS, state management & RBAC guards.', yearsOfExperience: 3 },
      { name: 'TypeScript & JavaScript (ES6+)', level: 95, iconName: 'FileCode', description: 'Strict type safety, OOP patterns, async/await & modular clean code.', yearsOfExperience: 3 },
      { name: 'React & Modern Frontend', level: 90, iconName: 'Layout', description: 'Hooks, context API, state management & responsive UI components.', yearsOfExperience: 3 },
      { name: 'HTML5, CSS3, Tailwind & Bootstrap', level: 98, iconName: 'Palette', description: 'Responsive mobile-first layouts, dark mode, flexbox & grid design.', yearsOfExperience: 3 }
    ]
  },
  {
    name: 'Back-End',
    skills: [
      { name: 'Node.js & Express.js', level: 94, iconName: 'Server', description: 'High-throughput REST APIs, middleware, WebSockets & JWT auth.', yearsOfExperience: 3 },
      { name: 'Spring Boot (Java)', level: 88, iconName: 'Cpu', description: 'Microservices, Spring Security, JPA/Hibernate & validation frameworks.', yearsOfExperience: 3 },
      { name: 'RESTful APIs & Microservices', level: 96, iconName: 'Network', description: 'Kong API Gateway integration, payload validation & API specs.', yearsOfExperience: 3 }
    ]
  },
  {
    name: 'Databases',
    skills: [
      { name: 'MongoDB', level: 92, iconName: 'Database', description: 'Document schemas, aggregation pipelines & indexing for fast lookups.', yearsOfExperience: 3 },
      { name: 'PostgreSQL & MySQL', level: 94, iconName: 'HardDrive', description: 'Relational data modeling, ACID transactions & performance queries.', yearsOfExperience: 3 },
      { name: 'Oracle DB', level: 86, iconName: 'Database', description: 'Enterprise relational procedures, views & transaction safety.', yearsOfExperience: 3 },
      { name: 'Redis (Caching)', level: 88, iconName: 'Zap', description: 'In-memory key-value caching, session stores & rate limiting.', yearsOfExperience: 3 }
    ]
  },
  {
    name: 'Deployment & Tools',
    skills: [
      { name: 'Git & Version Control', level: 98, iconName: 'GitBranch', description: 'Branching strategies, pull requests, code reviews & merge conflict resolution.', yearsOfExperience: 3 },
      { name: 'Docker & Kubernetes', level: 86, iconName: 'Box', description: 'Containerization, Dockerfiles, pod orchestration & manifests.', yearsOfExperience: 3 },
      { name: 'Jenkins & Argo CD', level: 84, iconName: 'Layers', description: 'Automated CI/CD build pipelines and GitOps continuous delivery.', yearsOfExperience: 3 }
    ]
  },
  {
    name: 'Messaging & Other Tools',
    skills: [
      { name: 'Apache Kafka', level: 92, iconName: 'Network', description: 'Event-driven streaming topics, consumer groups & async messaging.', yearsOfExperience: 3 },
      { name: 'Elasticsearch (Apache Lucene)', level: 88, iconName: 'Terminal', description: 'Full-text indexing, rapid search filtering & SEO optimization.', yearsOfExperience: 3 },
      { name: 'MinIO Object Storage', level: 90, iconName: 'Cloud', description: 'S3-compatible encrypted object storage for documents & images.', yearsOfExperience: 3 },
      { name: 'Kong API Gateway', level: 90, iconName: 'Shield', description: 'Centralized route proxies, security rate limits & OAuth authentication.', yearsOfExperience: 3 }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Full Stack Developer',
    company: 'Cubastion Consulting Pvt. Ltd.',
    location: 'Gurugram, Haryana, India',
    period: 'Feb 2023 — Present',
    type: 'Full-time',
    description: 'Designing and engineering high-impact enterprise modules across Insurance, National Examination Vaults, HRMS, and Digital Asset Lending platforms.',
    highlights: [
      'Unnati Insurance Portal: Built end-to-end policy issuance workflow for Iffco Tokio agents PAN India, reducing operational costs by over 70%.',
      'Content Authoring Tool (SSC): Built Vault Inbound Interface with MinIO, Kafka & encryption for 100,000+ records, reducing risk of data leakage by 100%.',
      'xNet (HRMS Portal): Integrated Elasticsearch for 75% faster search, developed digital Asset Management module (70% time reduction), and embedded MSAL auth (99% drop in phishing attempts).',
      'CLST (Metaco): Simplified RBAC authorization with JWT & Google Client APIs (90% data security fortification), and built real-time WebSocket/Kafka notification systems.'
    ],
    technologies: ['Angular', 'Node.js', 'Express.js', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Oracle DB', 'Kafka', 'Elasticsearch', 'MinIO', 'Docker', 'Kong'],
    logoText: 'CC',
    logoColor: 'from-emerald-500 to-green-600'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'serv-1',
    title: 'Full Stack Web Engineering',
    shortDesc: 'Resilient end-to-end web applications built with Angular/React, Node.js, and Spring Boot.',
    fullDesc: 'Custom web application engineering with modern front-end frameworks, RESTful microservices, and high-performance databases designed for mission-critical reliability.',
    iconName: 'Code',
    features: ['Angular & React Front-End Architecture', 'Node.js & Spring Boot Microservices', 'PostgreSQL, MongoDB & Oracle DB Support', 'Strict TypeScript Type Safety'],
    deliverables: ['Production Ready Codebase', 'REST API Specs & Swagger Docs', 'Database Migration Scripts', 'Deployment Setup'],
    estimatedDays: '10 — 25 Days',
    startingPrice: '$3,500'
  },
  {
    id: 'serv-2',
    title: 'Enterprise RBAC & Security Engineering',
    shortDesc: 'Role-based access controls, Keycloak SSO, MSAL, and encrypted vault storage.',
    fullDesc: 'Fortify your systems with industry-grade authentication and authorization frameworks. Protect sensitive records with AES encryption, OAuth 2.0, and zero-trust access policies.',
    iconName: 'Shield',
    features: ['Front & Back-end RBAC Authorization', 'MSAL & Keycloak SSO Integration', 'Encrypted Vault & MinIO Storage', 'Phishing & Vulnerability Reduction'],
    deliverables: ['Security Architecture Audit', 'RBAC Middleware Integration', 'Encryption Strategy', 'Access Control Dashboard'],
    estimatedDays: '7 — 18 Days',
    startingPrice: '$2,800'
  },
  {
    id: 'serv-3',
    title: 'Event-Driven Pipelines & Microservices',
    shortDesc: 'Apache Kafka event streaming, WebSocket notifications, and Kong API Gateway proxies.',
    fullDesc: 'Connect microservices with ultra-fast event streaming. Build sub-second real-time messaging, WebSocket notifications, and centralized Kong Gateway proxies.',
    iconName: 'Network',
    features: ['Apache Kafka Event Topics & Consumers', 'Sub-second WebSocket Broadcasting', 'Kong API Gateway Rate Limiting', 'Async Messaging Queues'],
    deliverables: ['Kafka Pipeline Architecture', 'Real-time WebSocket Layer', 'API Gateway Configuration', 'Performance Load Test Report'],
    estimatedDays: '10 — 20 Days',
    startingPrice: '$3,200'
  },
  {
    id: 'serv-4',
    title: 'Elasticsearch & Search Optimization',
    shortDesc: 'Apache Lucene indexing, full-text search, and digital asset management modules.',
    fullDesc: 'Upgrade slow data filters into lightning-fast search engines with Elasticsearch. Reduce search response latency by up to 75% across large datasets.',
    iconName: 'Terminal',
    features: ['Elasticsearch Cluster Integration', 'Apache Lucene SEO Optimization', 'Automated Asset Management Pipeline', 'Full-Text Indexing & Facets'],
    deliverables: ['Elasticsearch Mapping Specs', 'Search Integration Code', 'Asset Audit Module', 'Search Benchmarking Results'],
    estimatedDays: '7 — 14 Days',
    startingPrice: '$2,500'
  }
];

