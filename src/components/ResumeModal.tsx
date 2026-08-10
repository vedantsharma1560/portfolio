import React from 'react';
import { X, Download, FileText, CheckCircle2, Briefcase, GraduationCap, Mail, MapPin, Globe, Phone, Award } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { downloadResumeDirectly } from '../utils/downloadResume';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 dark:bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#050e0d] border border-slate-200 dark:border-[#20938a]/40 rounded-3xl overflow-hidden shadow-2xl my-8 text-left">
        
        {/* Modal Sticky Bar */}
        <div className="sticky top-0 z-20 px-6 py-4 border-b border-slate-200 dark:border-[#20938a]/30 flex items-center justify-between bg-white/95 dark:bg-[#050e0d]/95 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-[#0c2120] border border-teal-200 dark:border-[#20938a]/30 text-[#0d9488] dark:text-[#2cc1b5] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
              Resume — Vedant Sharma
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={downloadResumeDirectly}
              className="px-5 py-2.5 rounded-xl bg-[#0d9488] dark:bg-[#20938a] hover:bg-[#0f766e] dark:hover:bg-[#2cc1b5] text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-teal-500/20 dark:shadow-[#20938a]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-slate-200 dark:border-[#20938a]/30 bg-slate-100 dark:bg-[#0c2120] text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Preview Container */}
        <div className="p-6 sm:p-10 space-y-8 max-h-[80vh] overflow-y-auto text-slate-700 dark:text-gray-200">
          
          {/* Header Info */}
          <div className="border-b border-slate-200 dark:border-[#20938a]/30 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
                Vedant Sharma
              </h1>
              <p className="text-[#0d9488] dark:text-[#2cc1b5] font-mono text-sm font-semibold mt-1">
                Full Stack Developer
              </p>
            </div>

            <div className="text-xs font-mono space-y-1 text-slate-600 dark:text-gray-300">
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5]" />
                7451006610
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5]" />
                vedantpandit7451006610@gmail.com
              </p>
              <p className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5]" />
                linkedin.com/in/vedantsharma15
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5]" />
                Gurugram, Haryana
              </p>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono text-[#0d9488] dark:text-[#2cc1b5] uppercase tracking-widest mb-3 font-semibold">
              Technical Skills
            </h2>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-[#20938a]/30 bg-slate-50 dark:bg-[#0c2120]">
                <span className="text-slate-900 dark:text-white font-bold">Front-End: </span>
                <span className="text-slate-700 dark:text-gray-300">Angular, TypeScript, JavaScript, HTML5, CSS3, Bootstrap, Angular Material</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-[#20938a]/30 bg-slate-50 dark:bg-[#0c2120]">
                <span className="text-slate-900 dark:text-white font-bold">Back-End: </span>
                <span className="text-slate-700 dark:text-gray-300">Node.js, Express.js, Spring Boot</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-[#20938a]/30 bg-slate-50 dark:bg-[#0c2120]">
                <span className="text-slate-900 dark:text-white font-bold">Databases: </span>
                <span className="text-slate-700 dark:text-gray-300">MongoDB, MySQL, PostgreSQL, Oracle DB</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-[#20938a]/30 bg-slate-50 dark:bg-[#0c2120]">
                <span className="text-slate-900 dark:text-white font-bold">Deployment Tools: </span>
                <span className="text-slate-700 dark:text-gray-300">Git, Docker, Jenkins, Kubernetes, Argo CD</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-[#20938a]/30 bg-slate-50 dark:bg-[#0c2120]">
                <span className="text-slate-900 dark:text-white font-bold">Other Tools: </span>
                <span className="text-slate-700 dark:text-gray-300">Apache Kafka, Elasticsearch, MinIO, Redis, Kong (API Gateway), RESTful APIs</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-mono text-[#0d9488] dark:text-[#2cc1b5] uppercase tracking-widest mb-4 flex items-center gap-2 font-semibold">
              <Briefcase className="w-4 h-4 text-[#0d9488] dark:text-[#2cc1b5]" />
              Experience
            </h2>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-[#20938a]/30 bg-slate-50 dark:bg-[#0c2120] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between font-heading border-b border-slate-200 dark:border-[#20938a]/20 pb-3">
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold text-base">
                    Cubastion Consulting Pvt. Ltd.
                  </h3>
                  <p className="text-xs font-mono text-[#0d9488] dark:text-[#2cc1b5] font-semibold">Full Stack Developer — Gurugram, Haryana</p>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-gray-400 mt-1 sm:mt-0">Feb 2023 – Present</span>
              </div>

              {/* Project 1 */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Unnati Insurance Portal (Iffco Tokio General Insurance) — <span className="text-xs font-mono font-normal text-slate-500 dark:text-gray-400">Angular, Spring Boot, Node.js, Oracle DB, Kong</span>
                </h4>
                <ul className="space-y-1.5 pl-2 text-xs text-slate-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                    <span>Designed and developed the end-to-end policy issuance workflow module used by Iffco Tokio agents across PAN India, replacing legacy peripheral systems and reducing operational costs by over 70%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                    <span>Designed and achieved RBAC (role-based access control), enhancing the security and management of user control actions even on front-end, leading to a major drop in unauthorized attempts and a 90% fortification of data security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                    <span>Invoked a generic Validation Framework on back-end, eliminating the use of third-party libraries for validation and parsing API requests across 5+ microservices</span>
                  </li>
                </ul>
              </div>

              {/* Project 2 */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-[#20938a]/15">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Content Authoring Tool (Staff Selection Commission) — <span className="text-xs font-mono font-normal text-slate-500 dark:text-gray-400">Angular, Node.js, MinIO, Kafka, MongoDB, PostgreSQL, Kong</span>
                </h4>
                <ul className="space-y-1.5 pl-2 text-xs text-slate-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                    <span>Designed and built a Vault Inbound Interface that secured authorization, encryption, decryption, and data storage for over 100,000 records, reducing the risk of data leakage and phishing by 100%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                    <span>Integrated Kafka for seamless transfer of data between different consumer microservices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                    <span>Implemented an Object Storage (MinIO) system to store encrypted images for 500+ assessment questions and options, improving data security and retrieval speed</span>
                  </li>
                </ul>
              </div>

              {/* Project 3 */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-[#20938a]/15">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  xNet (HRMS Portal) — <span className="text-xs font-mono font-normal text-slate-500 dark:text-gray-400">Angular, Node.js, Express.js, MySQL, Elasticsearch, Kafka, OAuth 2.0</span>
                </h4>
                <ul className="space-y-1.5 pl-2 text-xs text-slate-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                    <span>Integrated an SEO (Search Engine Optimizer) with Elasticsearch based on Apache Lucene, reducing the generic search and data filtration problem of the portal by 75%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                    <span>Developed an innovative Asset Management Module, replacing traditional spreadsheet-based tracking with digital lending and auditing of employee assets, yielding a 70% reduction in time and resource utilization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                    <span>Embedded MSAL (Microsoft Authentication Library) and role-based access control for user login and secure authentication, leading to a 99% drop in phishing activity and unauthorized attempts</span>
                  </li>
                </ul>
              </div>

              {/* Project 4 */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-[#20938a]/15">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  CLST - Digital Asset Lending Platform (Metaco) — <span className="text-xs font-mono font-normal text-slate-500 dark:text-gray-400">Angular, Node.js, PostgreSQL, Payment Gateway, Kafka, Keycloak</span>
                </h4>
                <ul className="space-y-1.5 pl-2 text-xs text-slate-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                    <span>Simplified role-based user-access authorization using JWT and Google Client APIs, enhancing system security and achieving a 90% fortification of data security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                    <span>Accomplished a real-time notification system on the platform using Apache Kafka and WebSocket for seamless and efficient communication</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono text-[#0d9488] dark:text-[#2cc1b5] uppercase tracking-widest mb-3 flex items-center gap-2 font-semibold">
              <GraduationCap className="w-4 h-4 text-[#0d9488] dark:text-[#2cc1b5]" />
              Education
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-[#20938a]/30 bg-slate-50 dark:bg-[#0c2120] flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                <div>
                  <p className="text-slate-900 dark:text-white font-bold text-sm">Chandigarh Engineering College, CGC</p>
                  <p className="text-slate-500 dark:text-gray-400 font-mono mt-0.5">Bachelor of Technology • Percentage: 78.3%</p>
                </div>
                <span className="font-mono text-[#0d9488] dark:text-[#2cc1b5] font-semibold mt-2 sm:mt-0">2023</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-[#20938a]/30 bg-slate-50 dark:bg-[#0c2120] flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                <div>
                  <p className="text-slate-900 dark:text-white font-bold text-sm">Lord Mahavira Academy</p>
                  <p className="text-slate-500 dark:text-gray-400 font-mono mt-0.5">Class XII • Percentage: 73.2%</p>
                </div>
                <span className="font-mono text-[#0d9488] dark:text-[#2cc1b5] font-semibold mt-2 sm:mt-0">2019</span>
              </div>
            </div>
          </div>

          {/* Leadership & Extracurricular */}
          <div>
            <h2 className="text-xs font-mono text-[#0d9488] dark:text-[#2cc1b5] uppercase tracking-widest mb-3 flex items-center gap-2 font-semibold">
              <Award className="w-4 h-4 text-[#0d9488] dark:text-[#2cc1b5]" />
              Leadership / Extracurricular
            </h2>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-[#20938a]/30 bg-slate-50 dark:bg-[#0c2120] space-y-2 text-xs text-slate-700 dark:text-gray-300">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                <span>Received the prestigious <strong>“Lightning Award”</strong> from stakeholders for delivering phenomenal results within a remarkably short timeframe.</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                <span>Served as <strong>President of the Pixel Club</strong> (Photography and Cultural Events), leading a team of 30+ members and organizing numerous successful events and initiatives.</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                <span>Advocated for social causes, actively participating in charity runs and community welfare programs.</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                <span>Avid cricket and volleyball player, with strong teamwork and strategic skills both on the field and the court.</span>
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
