import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const pageHeight = doc.internal.pageSize.getHeight(); // 297 mm
const pageWidth = doc.internal.pageSize.getWidth();   // 210 mm
const margin = 12;
const contentWidth = pageWidth - (margin * 2);

let y = 14;

// Header
doc.setFont('Helvetica', 'bold');
doc.setFontSize(22);
doc.setTextColor(17, 24, 39);
doc.text('Vedant Sharma', pageWidth / 2, y, { align: 'center' });
y += 6;

doc.setFont('Helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(55, 65, 81);
doc.text('Phone: 7451006610  |  Email: vedantpandit7451006610@gmail.com  |  LinkedIn: linkedin.com/in/vedantsharma15  |  Gurugram', pageWidth / 2, y, { align: 'center' });
y += 5;

// Divider
doc.setDrawColor(31, 41, 55);
doc.setLineWidth(0.4);
doc.line(margin, y, pageWidth - margin, y);
y += 5;

// Section Helper
function drawSectionHeader(title) {
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 24, 39);
  doc.text(title, margin, y);
  y += 1.5;
  doc.setDrawColor(156, 163, 175);
  doc.setLineWidth(0.2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 4.5;
}

// SKILLS
drawSectionHeader('SKILLS');

const skills = [
  ['Front-End', 'Angular, TypeScript, JavaScript, HTML5, CSS3, Bootstrap, Angular Material'],
  ['Back-End', 'Node.js, Express.js, Spring Boot'],
  ['Databases', 'MongoDB, MySQL, PostgreSQL, Oracle DB'],
  ['Deployment Tools', 'Git, Docker, Jenkins, Kubernetes, Argo CD'],
  ['Other Tools', 'Apache Kafka, Elasticsearch, MinIO, Redis, Kong (API Gateway), RESTful APIs']
];

skills.forEach(([label, value]) => {
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(17, 24, 39);
  doc.text(`${label} : `, margin, y);
  
  const labelWidth = doc.getTextWidth(`${label} : `);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  doc.text(value, margin + labelWidth, y);
  y += 4;
});

y += 2;

// EXPERIENCE
drawSectionHeader('EXPERIENCE');

doc.setFont('Helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(17, 24, 39);
doc.text('Cubastion Consulting Pvt. Ltd.', margin, y);

doc.setFont('Helvetica', 'normal');
doc.setFontSize(9);
doc.text('Feb 2023 – Present', pageWidth - margin, y, { align: 'right' });
y += 4;

doc.setFont('Helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(31, 41, 55);
doc.text('Full Stack Developer', margin, y);

doc.setFont('Helvetica', 'normal');
doc.setFontSize(9);
doc.text('Gurugram, Haryana', pageWidth - margin, y, { align: 'right' });
y += 5;

const projects = [
  {
    title: 'Unnati Insurance Portal (Iffco Tokio General Insurance) – Angular, Spring Boot, Node.js, Oracle DB, Kong',
    bullets: [
      'Designed and developed the end-to-end policy issuance workflow module used by Iffco Tokio agents across PAN India, replacing legacy peripheral systems and reducing operational costs by over 70%',
      'Designed and achieved RBAC (role-based access control), enhancing the security and management of user control actions even on front-end, leading to a major drop in unauthorized attempts and a 90% fortification of data security',
      'Invoked a generic Validation Framework on back-end, eliminating the use of third-party libraries for validation and parsing API requests across 5+ microservices'
    ]
  },
  {
    title: 'Content Authoring Tool (Staff Selection Commission) – Angular, Node.js, MinIO, Kafka, MongoDB, PostgreSQL, Kong',
    bullets: [
      'Designed and built a Vault Inbound Interface that secured authorization, encryption, decryption, and data storage for over 100,000 records, reducing the risk of data leakage and phishing by 100%',
      'Integrated Kafka for seamless transfer of data between different consumer microservices',
      'Implemented an Object Storage (MinIO) system to store encrypted images for 500+ assessment questions and options, improving data security and retrieval speed'
    ]
  },
  {
    title: 'xNet (HRMS Portal) – Angular, Node.js, Express.js, MySQL, Elasticsearch, Kafka, OAuth 2.0',
    bullets: [
      'Integrated an SEO (Search Engine Optimizer) with Elasticsearch based on Apache Lucene, reducing the generic search and data filtration problem of the portal by 75%',
      'Developed an innovative Asset Management Module, replacing traditional spreadsheet-based tracking with digital lending and auditing of employee assets, yielding a 70% reduction in time and resource utilization',
      'Embedded MSAL (Microsoft Authentication Library) and role-based access control for user login and secure authentication, leading to a 99% drop in phishing activity and unauthorized attempts'
    ]
  },
  {
    title: 'CLST - Digital Asset Lending Platform (Metaco) – Angular, Node.js, PostgreSQL, Payment Gateway, Kafka, Keycloak',
    bullets: [
      'Simplified role-based user-access authorization using JWT and Google Client APIs, enhancing system security and achieving a 90% fortification of data security',
      'Accomplished a real-time notification system on the platform using Apache Kafka and WebSocket for seamless and efficient communication'
    ]
  }
];

projects.forEach(proj => {
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(17, 24, 39);
  const titleLines = doc.splitTextToSize(proj.title, contentWidth);
  doc.text(titleLines, margin, y);
  y += (titleLines.length * 3.8);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(55, 65, 81);

  proj.bullets.forEach(bullet => {
    const bulletText = `•  ${bullet}`;
    const bulletLines = doc.splitTextToSize(bulletText, contentWidth - 4);
    doc.text(bulletLines, margin + 2, y);
    y += (bulletLines.length * 3.5);
  });
  y += 1.5;
});

y += 1;

// EDUCATION
drawSectionHeader('EDUCATION');

doc.setFont('Helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(17, 24, 39);
doc.text('Chandigarh Engineering College, CGC', margin, y);
doc.setFont('Helvetica', 'normal');
doc.setFontSize(9);
doc.text('2023', pageWidth - margin, y, { align: 'right' });
y += 4;

doc.setFont('Helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(55, 65, 81);
doc.text('Bachelor of Technology', margin, y);
doc.text('Percentage: 78.3', pageWidth - margin, y, { align: 'right' });
y += 5;

doc.setFont('Helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(17, 24, 39);
doc.text('Lord Mahavira Academy', margin, y);
doc.setFont('Helvetica', 'normal');
doc.setFontSize(9);
doc.text('2019', pageWidth - margin, y, { align: 'right' });
y += 4;

doc.setFont('Helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(55, 65, 81);
doc.text('Class XII', margin, y);
doc.text('Percentage: 73.2', pageWidth - margin, y, { align: 'right' });
y += 6;

// LEADERSHIP / EXTRACURRICULAR
drawSectionHeader('LEADERSHIP / EXTRACURRICULAR');

const extra = [
  'Received the prestigious "Lightning Award" from stakeholders for delivering phenomenal results within a remarkably short timeframe',
  'Served as President of the Pixel Club (Photography and Cultural Events), leading a team of 30+ members and organizing numerous successful events and initiatives',
  'Advocated for social causes, actively participating in charity runs and community welfare programs',
  'Avid cricket and volleyball player, with strong teamwork and strategic skills both on the field and the court'
];

doc.setFont('Helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(55, 65, 81);

extra.forEach(item => {
  const lineText = `•  ${item}`;
  const lines = doc.splitTextToSize(lineText, contentWidth - 4);
  doc.text(lines, margin + 2, y);
  y += (lines.length * 3.5);
});

// Ensure output directory exists
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.join(publicDir, 'Vedant_Sharma_Resume.pdf');
const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(outputPath, pdfBuffer);

console.log(`PDF generated successfully at ${outputPath}`);
