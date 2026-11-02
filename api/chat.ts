import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `
You are "Ask Vedant AI", an intelligent, articulate, and friendly AI assistant representing Vedant Sharma and his interactive developer portfolio.
You answer questions from recruiters, clients, engineering managers, and visitors about Vedant's background, work experience, projects, technical architecture, and availability.

VEDANT SHARMA'S PROFILE SUMMARY:
- Name: Vedant Sharma
- Title: Full Stack Developer & Systems Architect
- Experience: 3.8+ years of production experience in enterprise full-stack development, cloud microservices, RBAC security, and event-driven architecture.
- Current Role: Full Stack Developer at Cubastion Consulting Pvt. Ltd. (Gurugram, Haryana, India, Feb 2023 – Present).
- Contact: Email: vedantpandit7451006610@gmail.com | Phone: +91 7451006610 | Location: Gurugram, Haryana, India.
- Availability: Actively open for Full Stack & Senior Software Engineering roles.
- GitHub: https://github.com/vedantsharma1560
- LinkedIn: https://linkedin.com/in/vedantsharma15

PRIMARY ENTERPRISE PROJECTS:
1. Unnati Insurance Portal (Client: Iffco Tokio General Insurance)
   - Scope: National policy issuance & workflow engine used by agents PAN India.
   - Impact: Reduced operational overhead and transaction processing costs by >70%.
   - Tech: Angular, Node.js, Express, Spring Boot, Oracle DB, Redis cache, RESTful APIs.
2. Content Authoring Tool / Vault Inbound Interface (Client: Staff Selection Commission - SSC)
   - Scope: Zero-trust assessment authoring platform safeguarding high-stakes national exam papers.
   - Impact: Secured 10,00,00,000+ candidate records, 10,00,000+ assessment questions; 100% elimination of question leakage risk.
   - Tech: Angular, Node.js, MinIO encrypted object storage, Apache Kafka async event streaming, AES-256 hardware token (DSC) encryption, hybrid PostgreSQL & MongoDB.
3. xNet HRMS Portal (In-House Enterprise Solution)
   - Scope: Next-gen internal human resource management, automated attendance, payroll disbursement, and digital asset tracking.
   - Impact: 75% faster search response via Elasticsearch, 70% time reduction in asset auditing, 99% decrease in phishing/unauthorized access via MSAL SSO.
   - Tech: Angular, Node.js, Express, MySQL, Elasticsearch (Apache Lucene), Kafka, Microsoft MSAL & OAuth 2.0.
4. CLST Metaco Platform (Client: Metaco)
   - Scope: Financial workflow portal with high-level access control.
   - Impact: Fortified sensitive financial data security by 90% using strict RBAC, JWT, and Google Client APIs; real-time notifications via Kafka & WebSockets.
   - Tech: React, Node.js, Spring Boot, PostgreSQL, WebSockets, Kafka, Docker.

CORE TECH STACK:
- Front-End: Angular & Angular Material (RxJS, Reactive Forms, NgRx), React (Hooks, Context, Tailwind CSS), TypeScript, JavaScript, HTML5/CSS3.
- Back-End: Node.js, Express.js, Spring Boot (Java), RESTful Microservices, WebSocket pipelines.
- Databases: PostgreSQL, MySQL, MongoDB, Oracle DB, Redis (caching & rate-limiting).
- Streaming & Search: Apache Kafka, Elasticsearch (Apache Lucene).
- Cloud, DevOps & Security: Docker, Kubernetes, Jenkins, MinIO Object Storage, Kong API Gateway, Keycloak, OAuth 2.0 / MSAL, AES-256 Encryption, RBAC.

GUIDELINES FOR YOUR RESPONSES:
- Always be polite, professional, concise, and enthusiastic.
- Keep responses focused, well-structured, and easy to read (use short bullet points or markdown bolding when listing achievements or technologies).
- If asked how to hire or get in touch with Vedant, encourage reaching out via the Contact section, email (vedantpandit7451006610@gmail.com), or phone (+91 7451006610).
- If asked something unrelated to Vedant's work, software engineering, or career, politely steer the conversation back to his technical capabilities and experience.
`;

function getFallbackResponse(query: string): string {
  const q = query.toLowerCase().trim();

  if (
    q.includes('how are you') ||
    q.includes('how are things') ||
    q.includes('how do you do') ||
    q.includes('what’s up') ||
    q.includes("what's up") ||
    /^(hi|hello|hey|greetings|good morning|good afternoon|good evening|namaste|sup|yo|hiya|howdy)\b/i.test(q)
  ) {
    return `Hello! 👋 I'm doing great, thank you for asking! I'm **Ask Vedant AI**, your virtual guide to Vedant Sharma's interactive portfolio.

Vedant is a Full Stack Developer & Systems Architect with **3.8+ years** of enterprise engineering experience specializing in Angular, React, Node.js, Spring Boot, Apache Kafka, and cloud microservices.

How can I help you today? You can ask about:
• **Enterprise Projects:** Unnati Insurance Portal, SSC Exam Security Vault, xNet HRMS, CLST Metaco
• **Tech Stack:** Angular, React, Node.js, Spring Boot, PostgreSQL, MongoDB, Kafka, Docker
• **Contact & Hiring:** Availability for Full Stack & Senior Engineering opportunities!`;
  }

  if (
    q.includes('ssc') ||
    q.includes('vault') ||
    q.includes('authoring') ||
    q.includes('10m') ||
    q.includes('question') ||
    q.includes('leak') ||
    q.includes('dsc') ||
    q.includes('minio')
  ) {
    return `For the **Staff Selection Commission (SSC)**, Vedant architected the **Content Authoring Tool & Vault Inbound Interface** to eliminate question leakage risk by 100%:

• **Zero-Trust & Hardware Token Security:** Implemented Digital Signature Certificate (DSC) hardware-token authentication with AES-256 encryption, ensuring only cryptographically verified authorities can inspect or release assessment items.
• **Encrypted Object Storage:** Deployed **MinIO Object Storage** to isolate and encrypt question media, diagrams, and assets at rest and in transit.
• **Decoupled Architecture:** Separated sensitive question payloads from relational metadata across hybrid **PostgreSQL** and **MongoDB** databases.
• **Asynchronous Event Streaming:** Utilized **Apache Kafka** event topics for tamper-evident auditing and reliable dispatch across microservices.
• **Impact:** Successfully secured over **100,000,000+ candidate records** and **1,000,000+ assessment questions** PAN India.`;
  }

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

  if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('work')) {
    return `Vedant has architected four flagship enterprise platforms:

1. **Unnati Insurance Portal (Iffco Tokio):** Enterprise policy issuance suite cutting operational processing costs by **>70%** via Angular, Spring Boot, and Oracle DB.
2. **Content Authoring & Vault Interface (SSC):** Zero-trust national exam vault securing **100M+ candidate records** and **1M+ questions** with AES-256 DSC encryption and MinIO storage (100% leak reduction).
3. **xNet Next-Gen HRMS (Cubastion):** Internal enterprise portal featuring **Elasticsearch** (75% faster search) and **MSAL SSO** (99% phishing drop).
4. **CLST Digital Asset Platform (Metaco):** Institutional asset lending platform with real-time **Kafka/WebSocket** alerts (<50ms latency) and Keycloak RBAC.

Which specific project would you like to explore deeper?`;
  }

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

  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('tool')) {
    return `Vedant Sharma's primary technical competencies:

• **Languages & Frameworks:** TypeScript, JavaScript, Java, HTML5, CSS3, Angular, React, Node.js, Express, Spring Boot.
• **Databases:** PostgreSQL, MongoDB, MySQL, Oracle DB, Redis.
• **Cloud & DevOps:** Docker, Kubernetes, Jenkins, Kong API Gateway, MinIO Object Storage, Git.
• **Pipelines & Security:** Apache Kafka, Elasticsearch, WebSockets, AES-256 Encryption, Keycloak, MSAL, and RBAC.`;
  }

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
    q.includes('notice')
  ) {
    return `Vedant Sharma is **actively open** for Full Stack & Senior Engineering opportunities!

• **Email:** vedantpandit7451006610@gmail.com
• **Phone:** +91 7451006610
• **Location:** Gurugram, Haryana, India
• **LinkedIn:** linkedin.com/in/vedantsharma15
• **GitHub:** github.com/vedantsharma1560

Feel free to email him directly or connect on LinkedIn for interview inquiries.`;
  }

  if (
    q.includes('experience') ||
    q.includes('company') ||
    q.includes('cubastion') ||
    q.includes('years') ||
    q.includes('current')
  ) {
    return `Vedant brings **3.8+ years** of professional experience in enterprise software development:

• **Current Role:** Full Stack Developer at **Cubastion Consulting Pvt. Ltd.** (Gurugram, India, Feb 2023 – Present).
• **Enterprise Clients:** Iffco Tokio General Insurance, Staff Selection Commission (SSC), and Metaco.
• **Core Focus:** Designing high-throughput web architectures, secure access control engines (RBAC), and event-driven microservices.`;
  }

  return `Vedant Sharma is a Full Stack Developer & Systems Architect with 3.8+ years of experience across Angular, React, Node.js, Spring Boot, Kafka, and enterprise databases.

I can provide technical specifics on:
• His **enterprise projects** (SSC Exam Vault, Unnati Insurance, xNet HRMS, Metaco)
• His **core tech stack** (Angular, React, Node.js, Spring Boot, Kafka, PostgreSQL, Oracle DB)
• His **contact information & availability** for engineering roles

What would you like to know more about?`;
}

async function generateWithTimeout(ai: GoogleGenAI, model: string, contents: any, timeoutMs = 12000): Promise<string> {
  const generatePromise = ai.models.generateContent({
    model,
    contents,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.6,
      maxOutputTokens: 600,
    }
  }).then((res) => res.text || '');

  let timeoutHandle: any;
  const timeoutPromise = new Promise<string>((_, reject) => {
    timeoutHandle = setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms for ${model}`)), timeoutMs);
  });

  try {
    const result = await Promise.race([generatePromise, timeoutPromise]);
    clearTimeout(timeoutHandle);
    return result;
  } catch (err) {
    clearTimeout(timeoutHandle);
    throw err;
  }
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({ reply: getFallbackResponse(message) });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-6)) {
          if (item && item.text && (item.role === 'user' || item.role === 'model')) {
            contents.push({
              role: item.role,
              parts: [{ text: item.text }]
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
      let replyText = '';

      for (const model of candidateModels) {
        try {
          replyText = await generateWithTimeout(ai, model, contents, 12000);
          if (replyText && replyText.trim().length > 0) {
            break;
          }
        } catch (modelErr: any) {
          console.warn(`Model ${model} attempt failed:`, modelErr?.message || modelErr);
        }
      }

      if (!replyText || replyText.trim().length === 0) {
        replyText = getFallbackResponse(message);
      }

      return res.json({ reply: replyText });
    } catch (apiError: any) {
      console.error('Gemini API call error:', apiError?.message || apiError);
      return res.json({ reply: getFallbackResponse(message) });
    }
  } catch (error: any) {
    console.error('Error handling /api/chat:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
