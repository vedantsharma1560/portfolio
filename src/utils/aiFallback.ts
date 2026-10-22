import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

/**
 * High-speed grounded portfolio responder used as an instant offline/network fallback
 * to guarantee 100% uptime and immediate answers even during network glitches or API rate limits.
 */
export function getClientPortfolioAnswer(query: string): string {
  const q = query.toLowerCase().trim();

  // Greetings & casual warm-ups
  if (
    q.includes('how are you') ||
    q.includes('how are things') ||
    q.includes('how do you do') ||
    q.includes('what’s up') ||
    q.includes("what's up") ||
    /^(hi|hello|hey|greetings|good morning|good afternoon|good evening|namaste|sup|yo|hiya|howdy)\b/i.test(q)
  ) {
    return `Hello! 👋 I'm doing great, thank you for asking! I'm **Ask Vedant AI**, your virtual guide to Vedant Sharma's interactive portfolio.

Vedant is an enterprise Full Stack Developer & Systems Architect with **${PERSONAL_INFO.stats[0].value} years** (${PERSONAL_INFO.stats[0].count} yrs) of production experience across Angular, React, Node.js, Spring Boot, Apache Kafka, and cloud microservices.

How can I help you today? You can ask about:
• **Enterprise Projects:** Unnati Insurance Portal, SSC Exam Security Vault, xNet HRMS, CLST Metaco
• **Tech Stack:** Angular, React, Node.js, Spring Boot, PostgreSQL, MongoDB, Kafka, Docker
• **Contact & Hiring:** Availability for Full Stack & Senior Engineering opportunities!`;
  }

  // SSC / Questions / Exam Vault / Security / MinIO / DSC
  if (
    q.includes('ssc') ||
    q.includes('vault') ||
    q.includes('authoring') ||
    q.includes('10m') ||
    q.includes('question') ||
    q.includes('leak') ||
    q.includes('dsc') ||
    q.includes('token') ||
    q.includes('minio')
  ) {
    return `For the **Staff Selection Commission (SSC)**, Vedant architected the **Content Authoring Tool & Vault Inbound Interface** to eliminate question leakage risk by 100%:

• **Zero-Trust & Hardware Token Security:** Implemented Digital Signature Certificate (DSC) hardware-token authentication with AES-256 encryption, ensuring only cryptographically verified authorities can inspect or release assessment items.
• **Encrypted Object Storage:** Deployed **MinIO Object Storage** to isolate and encrypt question media, diagrams, and assets at rest and in transit.
• **Decoupled Architecture:** Separated sensitive question payloads from relational metadata across hybrid **PostgreSQL** and **MongoDB** databases.
• **Asynchronous Event Streaming:** Utilized **Apache Kafka** event topics for tamper-evident auditing and reliable dispatch across microservices.
• **Impact:** Successfully secured over **100,000,000+ candidate records** and **1,000,000+ assessment questions** PAN India.`;
  }

  // Unnati Insurance / IFFCO Tokio
  if (
    q.includes('unnati') ||
    q.includes('insurance') ||
    q.includes('iffco') ||
    q.includes('tokio') ||
    q.includes('policy')
  ) {
    return `The **Unnati Insurance Portal** is an enterprise policy issuance and workflow engine engineered for **Iffco Tokio General Insurance**:

• **Mission:** Replaced fragmented legacy peripheral systems with a modern, high-speed unified web portal for agents across India.
• **Tech Stack:** Angular, Spring Boot (Java), Node.js, Oracle DB, Kong API Gateway, and Redis.
• **Key Contributions:** Built end-to-end multi-step policy creation wizards, two-factor OTP authentication, and a Generic Validation Framework across 5+ microservices.
• **Measurable Impact:** Reduced operational overhead and transaction processing costs by **over 70%**, while tightening RBAC security by 90%.`;
  }

  // xNet / HRMS / Attendance / Payroll / Lucene / Elasticsearch / MSAL
  if (
    q.includes('xnet') ||
    q.includes('hrms') ||
    q.includes('attendance') ||
    q.includes('payroll') ||
    q.includes('elasticsearch') ||
    q.includes('lucene') ||
    q.includes('asset') ||
    q.includes('msal')
  ) {
    return `**xNet** is Cubastion Consulting's in-house next-generation HRMS & Enterprise Asset Management platform:

• **Elasticsearch (Apache Lucene):** Integrated full-text indexing, dropping employee and inventory search latency by **75%**.
• **Automated HR Operations:** Engineered automated attendance and leave tracking, task ticketing, and payroll disbursement.
• **Digital Asset Lending:** Replaced spreadsheet-based manual audits with an automated equipment check-in/check-out pipeline, saving **70% of auditing time**.
• **Single Sign-On (SSO):** Embedded Microsoft MSAL / OAuth 2.0, leading to a **99% decrease** in unauthorized access and phishing attempts.
• **Stack:** Angular, Node.js, Express.js, MySQL, Elasticsearch, and Kafka.`;
  }

  // CLST / Metaco / Financial / Lending / WebSockets
  if (
    q.includes('clst') ||
    q.includes('metaco') ||
    q.includes('lending') ||
    q.includes('crypto') ||
    q.includes('fintech')
  ) {
    return `The **CLST Platform (Client: Metaco)** is an institutional digital asset lending portal built for high-security financial transactions:

• **Sub-Second Streaming:** Built a real-time notification engine using **Apache Kafka** and **WebSockets**, delivering trade alerts in **< 50ms**.
• **Security & Identity:** Integrated Keycloak SSO and JWT role-based access control, coupled with Google Client APIs, fortifying data security by **90%**.
• **Database Reliability:** Designed strict ACID transactional models in **PostgreSQL** for multi-currency lending positions.
• **Stack:** Angular, Node.js, Spring Boot, PostgreSQL, WebSockets, Kafka, and Docker.`;
  }

  // General Projects overview
  if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('work') || q.includes('case study')) {
    return `Vedant has architected four flagship enterprise platforms:

1. **Unnati Insurance Portal (Iffco Tokio):** Enterprise policy issuance suite cutting operational processing costs by **>70%** via Angular, Spring Boot, and Oracle DB.
2. **Content Authoring & Vault Interface (SSC):** Zero-trust national exam vault securing **100M+ candidate records** and **1M+ questions** with AES-256 DSC encryption and MinIO storage (100% leak reduction).
3. **xNet Next-Gen HRMS (Cubastion):** Internal enterprise portal featuring **Elasticsearch** (75% faster search) and **MSAL SSO** (99% phishing drop).
4. **CLST Digital Asset Platform (Metaco):** Institutional asset lending platform with real-time **Kafka/WebSocket** alerts (<50ms latency) and Keycloak RBAC.

Which specific project would you like to explore deeper?`;
  }

  // Front-End Skills
  if (
    q.includes('front') ||
    q.includes('angular') ||
    q.includes('react') ||
    q.includes('typescript') ||
    q.includes('javascript') ||
    q.includes('ui') ||
    q.includes('css') ||
    q.includes('tailwind')
  ) {
    return `Vedant's **Front-End expertise** spans:

• **Angular & Angular Material (Expert):** 3+ years architecting enterprise reactive forms, RxJS streams, custom pipes, route guards, and RBAC UI decorators.
• **React & Modern Web:** Proficient with React functional hooks, Context API, Tailwind CSS, responsive layouts, and state management.
• **TypeScript & Clean Architecture:** Strict type contracts, modular patterns, and maintainable component design systems.
• **UI Libraries:** Tailwind CSS, Bootstrap, Material-UI, and mobile-first responsive interfaces.`;
  }

  // Back-End & Microservices
  if (
    q.includes('back') ||
    q.includes('node') ||
    q.includes('express') ||
    q.includes('spring') ||
    q.includes('java') ||
    q.includes('api') ||
    q.includes('microservice')
  ) {
    return `Vedant's **Back-End & Microservices capabilities** include:

• **Node.js & Express.js:** High-throughput asynchronous REST APIs, WebSocket streaming gateways, and enterprise middleware.
• **Spring Boot (Java):** Enterprise microservices, JPA/Hibernate ORM, Spring Security, and custom validation frameworks.
• **API Gateways & Security:** Centralized route proxying via Kong API Gateway, rate limiting, and JWT/OAuth 2.0 token validation.`;
  }

  // Databases & Caching
  if (
    q.includes('database') ||
    q.includes('sql') ||
    q.includes('postgres') ||
    q.includes('mongo') ||
    q.includes('mysql') ||
    q.includes('oracle') ||
    q.includes('redis')
  ) {
    return `Vedant has hands-on production experience across relational, document, and in-memory databases:

• **Relational (PostgreSQL, MySQL, Oracle DB):** Complex relational modeling, indexed queries, ACID transaction safety, and stored procedures.
• **Document Store (MongoDB):** Dynamic schema design, aggregation pipelines, and high-volume document ingestion.
• **In-Memory Cache (Redis):** Distributed caching, session token storage, and high-frequency request rate-limiting.`;
  }

  // Apache Kafka / Messaging / Elasticsearch
  if (
    q.includes('kafka') ||
    q.includes('stream') ||
    q.includes('queue') ||
    q.includes('socket') ||
    q.includes('search')
  ) {
    return `Vedant utilizes modern event-driven and search technologies:

• **Apache Kafka:** Event-driven pub/sub architecture, consumer groups, message retry topics, and decoupled asynchronous service pipelines.
• **WebSockets:** Bi-directional real-time communication for live notifications (< 50ms latency).
• **Elasticsearch & Apache Lucene:** Full-text indexing, multi-match filters, and fuzzy search optimizations delivering a 75% latency reduction.`;
  }

  // All Skills / Tech Stack
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('tool')) {
    return `Vedant Sharma's primary technical competencies:

• **Languages & Frameworks:** TypeScript, JavaScript, Java, HTML5, CSS3, Angular, React, Node.js, Express, Spring Boot.
• **Databases:** PostgreSQL, MongoDB, MySQL, Oracle DB, Redis.
• **Cloud & DevOps:** Docker, Kubernetes, Jenkins, Kong API Gateway, MinIO Object Storage, Git.
• **Pipelines & Security:** Apache Kafka, Elasticsearch, WebSockets, AES-256 Encryption, Keycloak, MSAL, and RBAC.`;
  }

  // Contact / Hire / Availability
  if (
    q.includes('contact') ||
    q.includes('hire') ||
    q.includes('email') ||
    q.includes('phone') ||
    q.includes('reach') ||
    q.includes('resume') ||
    q.includes('interview') ||
    q.includes('available') ||
    q.includes('salary') ||
    q.includes('notice') ||
    q.includes('location')
  ) {
    return `Vedant Sharma is **actively open** for Full Stack & Senior Engineering opportunities!

• **Email:** [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email})
• **Phone:** [${PERSONAL_INFO.phone}](tel:${PERSONAL_INFO.phone})
• **Location:** ${PERSONAL_INFO.location}
• **LinkedIn:** [linkedin.com/in/vedantsharma15](${PERSONAL_INFO.socials.linkedin})
• **GitHub:** [github.com/vedantsharma1560](${PERSONAL_INFO.socials.github})

Feel free to send a message via the Contact section below or email him directly for interview inquiries.`;
  }

  // Experience / Cubastion / Years
  if (
    q.includes('experience') ||
    q.includes('company') ||
    q.includes('cubastion') ||
    q.includes('years') ||
    q.includes('current')
  ) {
    return `Vedant brings **${PERSONAL_INFO.stats[0].value} years** of professional experience in enterprise software development:

• **Current Role:** Full Stack Developer at **Cubastion Consulting Pvt. Ltd.** (Gurugram, India, Feb 2023 – Present).
• **Enterprise Clients:** Iffco Tokio General Insurance, Staff Selection Commission (SSC), and Metaco.
• **Core Focus:** Designing high-throughput web architectures, secure access control engines (RBAC), and event-driven microservices.`;
  }

  // Hobbies / Personal / Who is Vedant
  if (q.includes('hobby') || q.includes('hobbies') || q.includes('about') || q.includes('who are you') || q.includes('who is')) {
    return `Vedant Sharma is a passionate Full Stack Developer and Systems Architect based in ${PERSONAL_INFO.location}. Beyond engineering mission-critical systems and scaling microservices, he enjoys:

• Deep diving into open-source software and novel distributed system designs
• Exploring modern cloud architecture, container orchestration, and cybersecurity
• Reading engineering blogs and experimenting with full-stack frameworks

Is there a specific engineering project or skillset of his you'd like to explore?`;
  }

  // General grounded portfolio fallback
  return `Vedant Sharma is a Full Stack Developer & Systems Architect with **${PERSONAL_INFO.stats[0].value} years** of experience across Angular, React, Node.js, Spring Boot, Kafka, and enterprise databases.

I can provide technical specifics on:
• His **enterprise projects** (SSC Exam Vault, Unnati Insurance, xNet HRMS, Metaco)
• His **core tech stack** (Angular, React, Node.js, Spring Boot, Kafka, PostgreSQL, Oracle DB)
• His **contact information & availability** for engineering roles

What would you like to know more about?`;
}
