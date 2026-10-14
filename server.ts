import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const isProd = process.env.NODE_ENV === 'production';
// AI Studio requires the dev server to always run on port 3000.
// Only standalone production containers use process.env.PORT.
const PORT = isProd && process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

// System prompt defining Vedant Sharma's AI Assistant Persona and grounding facts
const SYSTEM_INSTRUCTION = `
You are "Ask Vedant AI", an intelligent, articulate, and friendly AI assistant representing Vedant Sharma and his interactive developer portfolio.
You answer questions from recruiters, clients, engineering managers, and visitors about Vedant's background, work experience, projects, technical architecture, and availability.

VEDANT SHARMA'S PROFILE SUMMARY:
- Name: Vedant Sharma
- Title: Full Stack Developer & Systems Architect
- Experience: 3.5+ years of production experience in enterprise full-stack development, cloud microservices, RBAC security, and event-driven architecture.
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

// Helper fallback responder if external API is unreachable or experiencing spikes
function getFallbackResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language')) {
    return "Vedant's primary stack spans Angular, React, TypeScript, Node.js, Express, and Spring Boot (Java), backed by PostgreSQL, MongoDB, MySQL, Oracle DB, and Redis. He also specializes in Apache Kafka for event-driven pipelines, Elasticsearch for search, and Docker/Kubernetes.";
  }
  if (q.includes('project') || q.includes('work') || q.includes('unnati') || q.includes('ssc') || q.includes('xnet')) {
    return "Vedant has engineered flagship enterprise systems including the Unnati Insurance Portal (cutting operational costs by >70%), the SSC Content Authoring Tool (securing 10M+ questions with AES encryption and MinIO), and xNet HRMS with Elasticsearch & MSAL authentication.";
  }
  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('reach')) {
    return "You can reach Vedant directly via email at vedantpandit7451006610@gmail.com, call +91 7451006610, or send a message right here through the portfolio's Contact section. He is actively open for Full Stack and Senior Engineering opportunities!";
  }
  if (q.includes('experience') || q.includes('company') || q.includes('cubastion') || q.includes('years')) {
    return "Vedant brings 3.5+ years of experience, currently working as a Full Stack Developer at Cubastion Consulting Pvt. Ltd. (Gurugram) since Feb 2023, building enterprise workflow platforms and high-throughput microservices.";
  }
  return "Vedant Sharma is a Full Stack Developer & Systems Architect with 3.5+ years of experience across Angular, React, Node.js, Spring Boot, Kafka, and enterprise databases. How can I help you learn more about his background, projects, or availability?";
}

// AI Chat Route
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({ reply: getFallbackResponse(message) });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      // Build conversation contents
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

      // Try gemini-3.8-flash first, then fallback to gemini-3.5-flash
      let replyText = '';
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            maxOutputTokens: 600,
          }
        });
        replyText = response.text || '';
      } catch (err: any) {
        console.warn('gemini-3.8-flash call failed, trying gemini-3.5-flash fallback:', err?.message);
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            maxOutputTokens: 600,
          }
        });
        replyText = fallbackResponse.text || '';
      }

      if (!replyText) {
        replyText = getFallbackResponse(message);
      }

      return res.json({ reply: replyText });
    } catch (apiError: any) {
      console.error('Gemini API call error:', apiError?.message || apiError);
      return res.json({ reply: getFallbackResponse(message) });
    }
  } catch (error: any) {
    console.error('Error handling /api/chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Setup Dev or Production serving
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT} (${isProd ? 'production' : 'development'})`);
  });

  server.on('error', (err: any) => {
    console.error('Express server listen error:', err);
  });
}

startServer();
