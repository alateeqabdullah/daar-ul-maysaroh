// "use client";

// import { useEffect, useState } from "react";
// import {
//   Scale,
//   Lock,
//   FileText,
//   CheckCircle2,
//   Landmark,
//   Clock,
//   Globe,
//   Users,
//   Heart,
//   Award,
//   Mail,
//   Download,
//   Printer,
//   AlertTriangle,
//   Gavel,
//   Shield,
//   Calendar,
//   Baby,
//   Scroll,
//   MessageSquare,
//   ChevronRight,
//   Menu,
//   X,
//   Search,
//   BookOpen,
//   Stamp,
//   UserCheck,
//   CreditCard,
//   Eye,
//   Trash2,
//   Copy,
//   Settings,
//   Sparkles,
//   BookMarked,
//   FileCheck,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// const LEGAL_SECTIONS = [
//   {
//     id: "preamble",
//     title: "Preamble & Mission",
//     icon: Scroll,
//     color: "purple",
//     content: `"Indeed, We have sent down the Quran and indeed, We will be its guardian." (Surah Al-Hijr: 9)

// 1.0 PREAMBLE & MISSION
// Al-Maysaroh International Institute is established upon the principles of sacred knowledge preservation, scholarly integrity, and spiritual excellence. This governing document outlines the rights, responsibilities, and ethical framework binding all students, scholars, and staff.

// 1.1 The Institute operates under the supervision of the Scholarly Council, comprising senior scholars with Ijazah in the Ten Qira'at and classical Islamic sciences.

// 1.2 All programs are designed to preserve the authentic chain of transmission (Sanad) reaching back to Prophet Muhammad (ﷺ).

// 1.3 The Arabic term "Al-Maysaroh" signifies ease and facilitation, reflecting our commitment to making Quranic education accessible while maintaining scholarly rigor.`,
//   },
//   {
//     id: "academic",
//     title: "Academic Integrity",
//     icon: Scale,
//     color: "amber",
//     content: `2.0 ACADEMIC INTEGRITY & SANAD CERTIFICATION

// 2.1 The Ijazah (Certificate of Sanad) represents an unbroken chain of transmission to Prophet Muhammad (ﷺ). Its issuance is exclusively at the scholarly discretion of the assigned teacher based on demonstrated mastery, not financial consideration.

// 2.2 Academic dishonesty constitutes a grave violation and includes:
//     2.2.1 Use of artificial intelligence or recorded audio to simulate live recitation
//     2.2.2 Misrepresentation of memorization progress (Hifz)
//     2.2.3 Impersonation during assessments or examinations
//     2.2.4 Plagiarism in written assignments or Tafsir submissions

// 2.3 Students found guilty of academic dishonesty face:
//     2.3.1 First offense: Formal warning and probationary period
//     2.3.2 Second offense: Immediate expulsion without refund
//     2.3.3 Permanent record of academic misconduct maintained

// 2.4 Students must maintain proper Adab (Islamic Etiquette) toward scholars, including:
//     2.4.1 Punctuality and preparedness for all sessions
//     2.4.2 Respectful communication at all times
//     2.4.3 Proper dress code during video sessions
//     2.4.4 Attention and focus during instruction

// 2.5 Grading and assessment criteria are determined by the Scholarly Council and communicated at program commencement.`,
//   },
//   {
//     id: "financial",
//     title: "Tuition & Financial",
//     icon: CreditCard,
//     color: "purple",
//     content: `3.0 TUITION & FINANCIAL OBLIGATIONS

// 3.1 Tuition Structure:
//     3.1.1 Tuition is calculated based on program duration, frequency, and selected payment plan
//     3.1.2 All fees are denominated in USD; currency conversion fees may apply for international payments
//     3.1.3 Tuition must be settled in advance of each academic period (monthly/quarterly/annually)

// 3.2 Payment Methods:
//     3.2.1 Automated: Credit/debit card processing via Stripe (instant activation)
//     3.2.2 Manual: Bank transfer, mobile money, or Western Union (activation upon receipt verification)
//     3.2.3 Cryptocurrency: Bitcoin and Ethereum accepted through third-party processors

// 3.3 Manual Payment Verification:
//     3.3.1 Students must upload proof of payment via the Bursar Portal
//     3.3.2 Verification typically completed within 12 business hours
//     3.3.3 Delayed verification may result in temporary portal access suspension

// 3.4 Refund Policy:
//     3.4.1 New Student Guarantee: Full refund within 14 days of first session
//     3.4.2 After 14 days: Tuition is non-refundable but may be credited toward future sessions
//     3.4.3 Program cancellation by Institute: Pro-rated refund for unused sessions
//     3.4.4 Refunds processed within 15-30 business days

// 3.5 Scholarship & Financial Aid:
//     3.5.1 Need-based scholarships available for qualifying students
//     3.5.2 Zakat-funded grants for students in extreme hardship
//     3.5.3 Family discount: 15% for three or more enrollments from same household
//     3.5.4 All financial aid subject to Scholarly Council approval

// 3.6 Late Payment Policy:
//     3.6.1 7-day grace period following due date
//     3.6.2 After grace period: $25 late fee applied
//     3.6.3 After 30 days: Suspension of portal access and session scheduling`,
//   },
//   {
//     id: "attendance",
//     title: "Attendance",
//     icon: Clock,
//     color: "amber",
//     content: `4.0 ATTENDANCE & SCHEDULING POLICIES

// 4.1 Session Scheduling:
//     4.1.1 Sessions are scheduled at mutually convenient times based on teacher availability
//     4.1.2 All sessions are recorded for quality assurance and progress tracking
//     4.1.3 Students receive calendar invitations with Zoom/meeting links

// 4.2 Rescheduling Policy:
//     4.2.1 Minimum 24-hour notice required for rescheduling
//     4.2.2 Rescheduling requests submitted via student portal
//     4.2.3 Same-week rescheduling subject to teacher availability
//     4.2.4 Maximum 2 rescheduled sessions per month

// 4.3 Missed Sessions (No-Show):
//     4.3.1 No-show without 24-hour notice: Session forfeited
//     4.3.2 Emergency exceptions considered on case-by-case basis
//     4.3.3 Documentation required for medical emergencies

// 4.4 Teacher Absence:
//     4.4.1 If scholar misses session, makeup session scheduled within 7 days
//     4.4.2 Students notified minimum 24 hours in advance when possible
//     4.4.3 Substitute teacher provided for urgent coverage if needed

// 4.5 Time Zone Considerations:
//     4.5.1 All session times referenced in Eastern Time (ET)
//     4.5.2 Students responsible for accurate time conversion
//     4.5.3 Daylight saving time adjustments communicated via email`,
//   },
//   {
//     id: "privacy",
//     title: "Privacy",
//     icon: Eye,
//     color: "purple",
//     content: `5.0 DATA PRIVACY & RECORDING POLICY

// 5.1 Data Collection:
//     5.1.1 Personal information collected includes name, contact details, age, educational background
//     5.1.2 Payment information processed through PCI-compliant third-party processors
//     5.1.3 The Institute does not store full credit card details

// 5.2 Session Recordings:
//     5.2.1 Audio/video recordings captured for scholarly review and progress tracking
//     5.2.2 Recordings accessible to student and teacher via secure portal
//     5.2.3 Recordings retained for 12 months for quality assurance
//     5.2.4 Automatic deletion after retention period

// 5.3 Data Protection:
//     5.3.1 Al-Maysaroh adheres to GDPR and applicable data protection laws
//     5.3.2 All data encrypted in transit and at rest
//     5.3.3 Regular security audits conducted by independent firms
//     5.3.4 Data never sold or shared with third parties for marketing

// 5.4 Special Provisions for Minors:
//     5.4.1 Parental/guardian consent required for enrollment
//     5.4.2 Parents may request access to all recordings involving their child
//     5.4.3 Special privacy protections for students under 13

// 5.5 Data Subject Rights:
//     5.5.1 Right to access personal data
//     5.5.2 Right to rectification of inaccurate data
//     5.5.3 Right to erasure (subject to legal obligations)
//     5.5.4 Requests submitted to privacy@almaysaroh.org

// 5.6 Cookies & Tracking:
//     5.6.1 Essential cookies required for portal functionality
//     5.6.2 Analytics cookies used for website improvement
//     5.6.3 Cookie preferences adjustable in browser settings`,
//   },
//   {
//     id: "intellectual-property",
//     title: "Intellectual Property",
//     icon: Copy,
//     color: "amber",
//     content: `6.0 INTELLECTUAL PROPERTY RIGHTS

// 6.1 Institute-Owned Materials:
//     6.1.1 All curriculum materials, including PDFs, audio files, and video lessons, are proprietary
//     6.1.2 The proprietary tracking software, progress analytics, and portal design are trade secrets
//     6.1.3 "Al-Maysaroh" name, logo, and branding are registered trademarks

// 6.2 License to Students:
//     6.2.1 Students receive non-exclusive, non-transferable license for personal use
//     6.2.2 Materials may not be reproduced, distributed, or shared with third parties
//     6.2.3 No commercial use permitted without written authorization

// 6.3 Student-Created Content:
//     6.3.1 Students retain ownership of their recitations and written work
//     6.3.2 By submission, students grant Institute license to use for educational purposes
//     6.3.3 Exceptional student work may be featured with permission

// 6.4 Prohibited Activities:
//     6.4.1 Screen recording or unauthorized capture of sessions
//     6.4.2 Sharing portal access credentials
//     6.4.3 Reverse engineering of tracking software
//     6.4.4 Commercial resale of any Institute materials

// 6.5 Copyright Infringement:
//     6.5.1 Reports of infringement submitted to legal@almaysaroh.org
//     6.5.2 DMCA compliance for US-based copyright claims
//     6.5.3 Repeat infringers subject to account termination`,
//   },
//   {
//     id: "child-protection",
//     title: "Child Protection",
//     icon: UserCheck,
//     color: "purple",
//     content: `7.0 CHILD PROTECTION & SAFEGUARDING

// 7.1 Our Commitment:
//     7.1.1 Al-Maysaroh maintains zero tolerance for abuse or exploitation
//     7.1.2 All staff undergo enhanced background checks (DBS/ equivalent)
//     7.1.3 Regular safeguarding training mandatory for all scholars

// 7.2 Scholar Requirements:
//     7.2.1 Valid government ID and proof of qualifications
//     7.2.2 Character references from recognized Islamic scholars
//     7.2.3 Annual safeguarding certification renewal
//     7.2.4 Confidential background check disclosure

// 7.3 Online Safety Measures:
//     7.3.1 All sessions conducted through secure, monitored platforms
//     7.3.2 Two-adult rule: parents encouraged to remain nearby during sessions
//     7.3.3 No one-on-one chat outside official Institute channels
//     7.3.4 All communications logged and audited

// 7.4 Reporting Procedures:
//     7.4.1 Immediate reporting required for any concerns
//     7.4.2 Designated Safeguarding Lead: safeguarding@almaysaroh.org
//     7.4.3 24-hour confidential hotline: +1 (555) 123-4567
//     7.4.4 External reporting: Local authorities as required by law

// 7.5 Prohibited Conduct:
//     7.5.1 Inappropriate communication or relationships
//     7.5.2 Sharing personal contact information
//     7.5.3 Any form of physical, emotional, or sexual abuse
//     7.5.4 Failure to report concerns about another staff member

// 7.6 Parent/Guardian Responsibilities:
//     7.6.1 Provide accurate emergency contact information
//     7.6.2 Maintain awareness of child's online activities
//     7.6.3 Report any concerns immediately
//     7.6.4 Ensure child's environment is safe and appropriate`,
//   },
//   {
//     id: "dispute-resolution",
//     title: "Dispute Resolution",
//     icon: Gavel,
//     color: "amber",
//     content: `8.0 DISPUTE RESOLUTION & GOVERNING LAW

// 8.1 Internal Resolution Process:
//     8.1.1 Step 1: Direct communication with teacher (5 business days)
//     8.1.2 Step 2: Formal complaint to Academic Coordinator (10 business days)
//     8.1.3 Step 3: Escalation to Scholarly Council (15 business days)
//     8.1.4 Step 4: Final arbitration by Institute Board

// 8.2 Mediation:
//     8.2.1 If internal resolution fails, parties agree to mediation
//     8.2.2 Mediation conducted by recognized Islamic arbitration service
//     8.2.3 Mediation costs shared equally between parties
//     8.2.4 Mediation completed within 60 days

// 8.3 Governing Law:
//     8.3.1 This agreement governed by laws of [State/Country]
//     8.3.2 Venue for legal proceedings in [Jurisdiction]
//     8.3.3 Parties submit to exclusive jurisdiction of specified courts

// 8.4 Arbitration:
//     8.4.1 Any unresolved disputes submitted to binding arbitration
//     8.4.2 Arbitration under rules of [Arbitration Association]
//     8.4.3 Decision final and enforceable in any court

// 8.5 Class Action Waiver:
//     8.5.1 All disputes resolved on individual basis only
//     8.5.2 No class, consolidated, or representative actions permitted

// 8.6 Limitations:
//     8.6.1 Claims must be filed within one year of incident
//     8.6.2 Institute liability limited to tuition paid
//     8.6.3 No liability for consequential or indirect damages`,
//   },
//   {
//     id: "code-of-conduct",
//     title: "Code of Conduct",
//     icon: Users,
//     color: "purple",
//     content: `9.0 STUDENT CODE OF CONDUCT

// 9.1 General Expectations:
//     9.1.1 Students represent Al-Maysaroh in all interactions
//     9.1.2 Professional, respectful behavior required at all times
//     9.1.3 Compliance with Islamic etiquette and dress code during sessions

// 9.2 Prohibited Conduct:
//     9.2.1 Harassment, discrimination, or bullying of any kind
//     9.2.2 Sharing inappropriate content during sessions
//     9.2.3 Unauthorized recording or distribution of sessions
//     9.2.4 Impersonation or credential sharing
//     9.2.5 Disruptive behavior affecting other students

// 9.3 Communication Guidelines:
//     9.3.1 All communication through official Institute channels
//     9.3.2 Professional language and tone required
//     9.3.3 Response expected within 48 business hours
//     9.3.4 Emergency contact procedures communicated separately

// 9.4 Social Media Policy:
//     9.4.1 Students may not represent themselves as Institute spokespersons
//     9.4.2 Confidential information may not be shared online
//     9.4.3 Respectful discourse required when mentioning Institute
//     9.4.4 Report problematic online content to Institute

// 9.5 Consequences of Violations:
//     9.5.1 Written warning for minor first offenses
//     9.5.2 Temporary suspension pending investigation
//     9.5.3 Permanent expulsion for serious violations
//     9.5.4 Legal action for illegal activities`,
//   },
//   {
//     id: "technology",
//     title: "Technology",
//     icon: Settings,
//     color: "amber",
//     content: `10.0 TECHNOLOGY & PLATFORM USE

// 10.1 System Requirements:
//      10.1.1 Stable internet connection (minimum 5 Mbps recommended)
//      10.1.2 Device with camera and microphone capabilities
//      10.1.3 Updated browser (Chrome, Firefox, Safari, Edge)
//      10.1.4 Zoom desktop client or web version

// 10.2 Account Security:
//      10.2.1 Students responsible for maintaining password confidentiality
//      10.2.2 Two-factor authentication recommended
//      10.2.3 Immediate reporting of unauthorized access required
//      10.2.4 Account sharing strictly prohibited

// 10.3 Technical Support:
//      10.3.1 Support available via portal ticketing system
//      10.3.2 Response within 24 business hours
//      10.3.3 Emergency technical support during sessions
//      10.3.4 Knowledge base available in student portal

// 10.4 Service Availability:
//      10.4.1 99.9% uptime target for core services
//      10.4.2 Scheduled maintenance communicated 48 hours in advance
//      10.4.3 Emergency maintenance as required for security
//      10.4.4 Credits not provided for temporary outages

// 10.5 Data Backup:
//      10.5.1 Student progress data backed up daily
//      10.5.2 Recording retention as specified in privacy policy
//      10.5.3 Students encouraged to maintain personal backups`,
//   },
//   {
//     id: "termination",
//     title: "Termination",
//     icon: Trash2,
//     color: "purple",
//     content: `11.0 TERMINATION & SUSPENSION POLICIES

// 11.1 Voluntary Withdrawal:
//      11.1.1 Students may withdraw at any time via portal
//      11.1.2 Refund eligibility determined by financial policy
//      11.1.3 Access maintained until end of paid period
//      11.1.4 Re-enrollment subject to availability

// 11.2 Involuntary Suspension:
//      11.2.1 Pending investigation of alleged violations
//      11.2.2 Non-payment beyond grace period
//      11.2.3 Threat to safety or security of community
//      11.2.4 Suspended students may appeal within 14 days

// 11.3 Involuntary Termination:
//      11.3.1 Academic dishonesty (as defined in Section 2)
//      11.3.2 Code of conduct violations (as defined in Section 9)
//      11.3.3 Fraud or misrepresentation in application
//      11.3.4 Repeated policy violations after warnings

// 11.4 Effect of Termination:
//      11.4.1 Immediate revocation of portal access
//      11.4.2 Forfeiture of all tuition paid (unless otherwise specified)
//      11.4.3 Certificate eligibility voided
//      11.4.4 Permanent record maintained for regulatory purposes

// 11.5 Reinstatement:
//      11.5.1 Former students may apply for reinstatement after 12 months
//      11.5.2 Subject to Scholarly Council approval
//      11.5.3 Outstanding obligations must be satisfied
//      11.5.4 Probationary period may apply`,
//   },
//   {
//     id: "certification",
//     title: "Certification",
//     icon: Stamp,
//     color: "amber",
//     content: `12.0 CERTIFICATION & ACADEMIC CREDENTIALS

// 12.1 Types of Certification:
//      12.1.1 Ijazah: Traditional certification with complete sanad
//      12.1.2 Certificate of Completion: Program completion without Ijazah
//      12.1.3 Certificate of Excellence: Superior achievement recognition

// 12.2 Requirements for Ijazah:
//      12.2.1 Complete memorization or mastery of prescribed material
//      12.2.2 Demonstration of proper Tajweed in all contexts
//      12.2.3 Successful oral examination by multiple scholars
//      12.2.4 Character verification and scholarly recommendation
//      12.2.5 Minimum residency period as determined by program

// 12.3 Certificate Validity:
//      12.3.1 Certificates verifiable through Institute portal
//      12.3.2 QR code authentication for third-party verification
//      12.3.3 Digital and physical copies provided
//      12.3.4 Replacement certificates available for fee

// 12.4 Transcripts & Records:
//      12.4.1 Official transcripts available upon request
//      12.4.2 Academic records maintained indefinitely
//      12.4.3 Transfer of credit to other institutions at their discretion
//      12.4.4 Grade appeals processed through dispute resolution

// 12.5 Revocation of Certification:
//      12.5.1 Certificates may be revoked for fraud or misrepresentation
//      12.5.2 Posthumous revocation in cases of discovered fraud
//      12.5.3 Public notice of revocation as appropriate
//      12.5.4 Legal remedies pursued for fraudulent credentials`,
//   },
// ];

// const getColorStyles = (color: string) => {
//   return {
//     text: color === "purple" ? "text-purple-600" : "text-amber-600",
//     bg:
//       color === "purple"
//         ? "bg-purple-100 dark:bg-purple-950/40"
//         : "bg-amber-100 dark:bg-amber-950/40",
//     border:
//       color === "purple"
//         ? "border-purple-200 dark:border-purple-800"
//         : "border-amber-200 dark:border-amber-800",
//     light:
//       color === "purple"
//         ? "bg-purple-50/30 dark:bg-purple-950/20"
//         : "bg-amber-50/30 dark:bg-amber-950/20",
//     hover:
//       color === "purple" ? "hover:border-purple-300" : "hover:border-amber-300",
//   };
// };

// function formatLegalContent(content: string) {
//   const lines = content.split("\n");
//   const formatted: Array<{ type: string; content?: string; number?: string }> =
//     [];

//   lines.forEach((line) => {
//     const trimmed = line.trim();
//     if (!trimmed) {
//       formatted.push({ type: "empty" });
//       return;
//     }

//     if (trimmed.match(/^\d+\.0\s+[A-Z]/)) {
//       formatted.push({ type: "section", content: trimmed });
//     } else if (trimmed.match(/^\d+\.\d+\s+[A-Za-z]/)) {
//       formatted.push({ type: "subsection", content: trimmed });
//     } else if (trimmed.match(/^\d+\.\d+\.\d+/)) {
//       const parts = trimmed.split(" ");
//       const number = parts[0];
//       const text = parts.slice(1).join(" ");
//       formatted.push({ type: "point", number, content: text });
//     } else {
//       formatted.push({ type: "text", content: trimmed });
//     }
//   });

//   return formatted;
// }

// export default function LegalHub() {
//   const [activeTab, setActiveTab] = useState("preamble");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [lastUpdated] = useState("March 10, 2026");
//   const [version] = useState("2.1.0");
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const hash = window.location.hash.replace("#", "");
//     if (hash && LEGAL_SECTIONS.some((s) => s.id === hash)) {
//       setActiveTab(hash);
//     }
//   }, []);

//   const activeSection = LEGAL_SECTIONS.find((s) => s.id === activeTab);
//   const activeColors = getColorStyles(activeSection?.color || "purple");
//   const formattedContent = activeSection
//     ? formatLegalContent(activeSection.content)
//     : [];

//   const handlePrint = () => window.print();
//   const handleDownload = () => {
//     const element = document.createElement("a");
//     const file = new Blob(
//       [LEGAL_SECTIONS.map((s) => `${s.title}\n\n${s.content}`).join("\n\n")],
//       { type: "text/plain" },
//     );
//     element.href = URL.createObjectURL(file);
//     element.download = `Al-Maysaroh-Legal-${version}.txt`;
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//   };

//   const filteredSections = LEGAL_SECTIONS.filter(
//     (section) =>
//       section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       section.content.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5">
//       {/* Header */}
//       <div className="border-b border-purple-200 dark:border-purple-800 pt-20 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6 py-4 xs:py-5">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div className="flex items-center gap-3">
//               <div className={`p-2 rounded-lg ${activeColors.bg}`}>
//                 <Shield className={`h-5 w-5 ${activeColors.text}`} />
//               </div>
//               <div>
//                 <h1 className="text-base xs:text-lg font-black uppercase tracking-tighter">
//                   Legal Framework
//                 </h1>
//                 <p className="text-[10px] xs:text-xs text-muted-foreground">
//                   Version {version} · Last updated {lastUpdated}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={handleDownload}
//                 className="p-2 hover:bg-purple-50 dark:hover:bg-purple-950/20 rounded-lg transition-colors"
//                 title="Download"
//               >
//                 <Download className="h-4 w-4 text-purple-600" />
//               </button>
//               <button
//                 onClick={handlePrint}
//                 className="p-2 hover:bg-purple-50 dark:hover:bg-purple-950/20 rounded-lg transition-colors"
//                 title="Print"
//               >
//                 <Printer className="h-4 w-4 text-purple-600" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 xs:px-5 sm:px-6 py-6 xs:py-8">
//         <div className="flex flex-col lg:flex-row gap-6 xs:gap-8">
//           {/* Sidebar */}
//           <aside className="lg:w-80 shrink-0">
//             <div className="sticky top-28 space-y-4">
//               {/* Search */}
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <input
//                   type="text"
//                   placeholder="Search sections..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-9 pr-4 py-2 text-sm bg-muted/30 border border-purple-200 dark:border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20"
//                 />
//               </div>

//               {/* Mobile menu button */}
//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="lg:hidden flex items-center justify-between w-full px-4 py-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800"
//               >
//                 <span className="text-xs font-black uppercase tracking-wider text-purple-600">
//                   Browse Sections
//                 </span>
//                 <ChevronRight
//                   className={cn(
//                     "h-4 w-4 transition-transform",
//                     mobileMenuOpen && "rotate-90",
//                   )}
//                 />
//               </button>

//               {/* Navigation */}
//               <nav
//                 className={cn(
//                   "space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto",
//                   mobileMenuOpen ? "block" : "hidden lg:block",
//                 )}
//               >
//                 {(searchTerm ? filteredSections : LEGAL_SECTIONS).map(
//                   (section) => {
//                     const colors = getColorStyles(section.color);
//                     const isActive = activeTab === section.id;
//                     return (
//                       <button
//                         key={section.id}
//                         onClick={() => {
//                           setActiveTab(section.id);
//                           setMobileMenuOpen(false);
//                           setSearchTerm("");
//                         }}
//                         className={cn(
//                           "w-full text-left px-3 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-3 transition-all",
//                           isActive
//                             ? `${colors.bg} ${colors.text}`
//                             : "hover:bg-purple-50 dark:hover:bg-purple-950/20 text-muted-foreground",
//                         )}
//                       >
//                         <section.icon className="h-4 w-4 shrink-0" />
//                         <span className="truncate flex-1">{section.title}</span>
//                         {isActive && <ChevronRight className="h-4 w-4" />}
//                       </button>
//                     );
//                   },
//                 )}
//               </nav>

//               {/* Quick Stats */}
//               <div className="pt-4 mt-4 border-t border-purple-200 dark:border-purple-800">
//                 <div className="grid grid-cols-2 gap-2">
//                   <div className="p-3 rounded-lg bg-purple-50/30 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
//                     <p className="text-[9px] text-muted-foreground font-black uppercase tracking-wider">
//                       Sections
//                     </p>
//                     <p className="text-lg font-black text-purple-600">12</p>
//                   </div>
//                   <div className="p-3 rounded-lg bg-amber-50/30 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
//                     <p className="text-[9px] text-muted-foreground font-black uppercase tracking-wider">
//                       Pages
//                     </p>
//                     <p className="text-lg font-black text-amber-600">42</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* Main Content */}
//           <main className="flex-1 min-w-0">
//             <div className="max-w-3xl mx-auto">
//               {/* Section Header */}
//               <div className="mb-6 xs:mb-8">
//                 <div className="flex items-center gap-3 xs:gap-4">
//                   <div className={`p-3 rounded-xl ${activeColors.bg}`}>
//                     {activeSection?.icon && (
//                       <activeSection.icon
//                         className={`h-5 w-5 xs:h-6 xs:w-6 ${activeColors.text}`}
//                       />
//                     )}
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <span
//                         className={`text-[9px] xs:text-[10px] font-mono font-black ${activeColors.text} ${activeColors.bg} px-2 py-0.5 rounded`}
//                       >
//                         Section{" "}
//                         {activeSection?.id.replace(/-/g, ".").toUpperCase()}
//                       </span>
//                       <span className="text-[9px] xs:text-[10px] text-muted-foreground">
//                         ·
//                       </span>
//                       <span className="text-[9px] xs:text-[10px] text-muted-foreground">
//                         Updated {lastUpdated}
//                       </span>
//                     </div>
//                     <h1 className="text-2xl xs:text-3xl font-black tracking-tighter">
//                       {activeSection?.title}
//                     </h1>
//                   </div>
//                 </div>
//               </div>

//               {/* Document Content */}
//               <div
//                 className={`bg-card border ${activeColors.border} rounded-xl p-5 xs:p-6 sm:p-8`}
//               >
//                 <div className="prose prose-sm dark:prose-invert max-w-none">
//                   {formattedContent.map((block, idx) => {
//                     if (block.type === "empty") {
//                       return <div key={idx} className="h-3 xs:h-4" />;
//                     }

//                     if (block.type === "section") {
//                       return (
//                         <h2
//                           key={idx}
//                           className={`text-lg xs:text-xl font-black mt-6 xs:mt-8 first:mt-0 ${activeColors.text}`}
//                         >
//                           {block.content}
//                         </h2>
//                       );
//                     }

//                     if (block.type === "subsection") {
//                       return (
//                         <h3
//                           key={idx}
//                           className="text-base xs:text-lg font-bold mt-4 xs:mt-6"
//                         >
//                           {block.content}
//                         </h3>
//                       );
//                     }

//                     if (block.type === "point") {
//                       return (
//                         <div
//                           key={idx}
//                           className="flex gap-2 xs:gap-3 ml-3 xs:ml-4 my-1.5 xs:my-2"
//                         >
//                           <span
//                             className={`text-[10px] xs:text-xs font-mono font-black ${activeColors.text} shrink-0`}
//                           >
//                             {block.number}
//                           </span>
//                           <p className="text-xs xs:text-sm text-muted-foreground">
//                             {block.content}
//                           </p>
//                         </div>
//                       );
//                     }

//                     return (
//                       <p
//                         key={idx}
//                         className="text-xs xs:text-sm text-muted-foreground leading-relaxed"
//                       >
//                         {block.content}
//                       </p>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="mt-6 xs:mt-8">
//                 <div
//                   className={`rounded-xl border p-5 xs:p-6 ${activeColors.light} ${activeColors.border}`}
//                 >
//                   <div className="flex items-start gap-3 mb-4 xs:mb-5">
//                     <div
//                       className={`p-2 rounded-lg ${activeColors.bg} shrink-0`}
//                     >
//                       <CheckCircle2
//                         className={`h-4 w-4 xs:h-5 xs:w-5 ${activeColors.text}`}
//                       />
//                     </div>
//                     <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground">
//                       By enrolling in any Al-Maysaroh program, you acknowledge
//                       that you have read, understood, and agree to be bound by
//                       these institutional policies.
//                     </p>
//                   </div>

//                   {/* Email Contact */}
//                   <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 p-3 xs:p-4 bg-background rounded-lg border border-purple-200 dark:border-purple-800">
//                     <div className="flex items-center gap-2 xs:gap-3">
//                       <Mail className="h-3.5 w-3.5 xs:h-4 xs:w-4 text-purple-600" />
//                       <span className="text-[10px] xs:text-xs font-mono">
//                         info.almaysaroh@gmail.com
//                       </span>
//                     </div>
//                     <span className="text-[8px] xs:text-[9px] px-2 py-0.5 bg-purple-100 dark:bg-purple-950/40 text-purple-600 rounded-full font-black uppercase tracking-wider">
//                       All inquiries
//                     </span>
//                   </div>

//                   {/* Document Metadata */}
//                   <div className="mt-3 xs:mt-4 flex flex-wrap items-center justify-between gap-2 text-[9px] xs:text-[10px] text-muted-foreground">
//                     <div className="flex flex-wrap items-center gap-2 xs:gap-3">
//                       <FileText className="h-3 w-3 xs:h-3.5 xs:w-3.5" />
//                       <span>ALM-LEGAL-{version.replace(/\./g, "")}</span>
//                       <span>·</span>
//                       <span>Authenticated by Scholarly Council</span>
//                     </div>
//                     <BookOpen className="h-3 w-3 xs:h-3.5 xs:w-3.5" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }




// app/legal/page.tsx
"use client";

import { useState } from "react";
import { Reveal } from "@/components/shared/section-animation";
import {
  ShieldAlert,
  Scale,
  Lock,
  Landmark,
  Clock,
  Scroll,
  Shield,
  Crown,
  Heart,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const LEGAL_SECTIONS = [
  {
    id: "academic",
    title: "Academic Integrity & Sanad",
    icon: Scale,
    color: "purple",
    content: `Participation in Al-Maysaroh programs is a commitment to sacred knowledge.
    1.1 The issuance of an Ijazah (Certificate of Sanad) is not guaranteed by payment but by the exclusive scholarly discretion of the assigned teacher.
    1.2 Academic dishonesty, including the use of AI for recitation or faking hifz progress, will result in immediate expulsion without refund.
    1.3 Students must maintain Adab (Islamic Etiquette) toward their scholars at all times.`,
  },
  {
    id: "financial",
    title: "Tuition & Financial Policy",
    icon: Landmark,
    color: "amber",
    content: `2.1 Tuition is settled in advance of the academic month.
    2.2 For manual transfers (Bank/Mobile Money), students must provide proof of payment via the bursar portal. Portal activation occurs only after the Bursar verifies receipt of funds.
    2.3 Refund Policy: We offer a 14-day Satisfaction Guarantee for new enrollments. After 14 days, tuition is non-refundable but can be credited toward future sessions.`,
  },
  {
    id: "attendance",
    title: "Attendance & Rescheduling",
    icon: Clock,
    color: "purple",
    content: `3.1 Rescheduling requires a minimum of 24 hours' notice.
    3.2 Sessions missed without 24-hour notice are forfeited and non-refundable.
    3.3 If a scholar misses a session, a makeup class will be scheduled at the student's earliest convenience.`,
  },
  {
    id: "privacy",
    title: "Data & Audio Privacy",
    icon: Lock,
    color: "amber",
    content: `4.1 Audio and video of recitations are recorded solely for scholarly review and progress tracking.
    4.2 Al-Maysaroh adheres to GDPR standards. Student data is encrypted and never sold or shared with third parties.
    4.3 By enrolling, parents of minor students consent to the educational recording of sessions.`,
  },
];

const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      gradient: "from-purple-600 to-purple-700",
      light: "bg-purple-50/30 dark:bg-purple-950/20",
      ring: "ring-purple-500/20",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600",
      light: "bg-amber-50/30 dark:bg-amber-950/20",
      ring: "ring-amber-500/20",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

export default function LegalHub() {
  const [activeTab, setActiveTab] = useState("academic");
  const activeSection = LEGAL_SECTIONS.find((s) => s.id === activeTab);
  const activeColors = getColorStyles(activeSection?.color || "purple");

  return (
    <main className="pt-20 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 xs:pb-16 sm:pb-20 md:pb-24 lg:pb-28 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-6 xs:mb-8 flex-wrap">
          <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <span className="text-purple-600">Institutional Governance</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-8 xs:gap-12 lg:gap-16">
          {/* Sidebar Nav */}
          <div className="lg:col-span-4 space-y-6 xs:space-y-8 sm:space-y-10">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 xs:gap-2 text-amber-500 font-black text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 xs:mb-4">
                <Shield className="w-3 h-3 xs:w-3.5 xs:h-3.5" /> Legal Framework
              </div>
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter font-heading leading-[1.1] mb-3 xs:mb-4">
                Institutional <br />
                <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                  Governance.
                </span>
              </h1>
              <p className="text-sm xs:text-base text-muted-foreground font-medium border-l-4 border-amber-500 pl-4 xs:pl-6">
                The legal and ethical framework governing the Al-Maysaroh
                International Institute.
              </p>
            </Reveal>

            <div className="flex flex-col gap-2 xs:gap-3">
              {LEGAL_SECTIONS.map((section) => {
                const Icon = section.icon;
                const isActive = activeTab === section.id;
                const colors = getColorStyles(section.color);
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={cn(
                      "p-4 xs:p-5 sm:p-6 rounded-xl xs:rounded-2xl border-2 transition-all duration-500 text-left flex items-center gap-3 xs:gap-4 group",
                      isActive
                        ? `${colors.border} ${colors.light} shadow-md`
                        : "border-border hover:border-purple-300 hover:bg-purple-50/30 dark:hover:bg-purple-950/20 opacity-70 hover:opacity-100",
                    )}
                  >
                    <Icon className={cn("w-5 h-5 xs:w-6 xs:h-6", isActive ? colors.text : "text-muted-foreground")} />
                    <span className={cn("font-black uppercase text-[9px] xs:text-[10px] tracking-wider", isActive ? colors.text : "")}>
                      {section.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Trust Badge */}
            <div className="mt-6 xs:mt-8 p-4 rounded-xl bg-purple-50/30 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-4 h-4 text-amber-500" />
                <span className="text-[9px] font-black uppercase tracking-wider text-purple-600">Scholarly Endorsement</span>
              </div>
              <p className="text-[10px] xs:text-xs text-muted-foreground">
                These policies have been reviewed and endorsed by the Al-Maysaroh Scholarly Council.
              </p>
            </div>
          </div>

          {/* Main Legal Content */}
          <div className="lg:col-span-8">
            <Reveal key={activeTab}>
              <div className={`bg-card rounded-xl xs:rounded-2xl border-2 ${activeColors.border} p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 shadow-lg relative overflow-hidden min-h-[500px]`}>
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 p-6 xs:p-8 lg:p-12 opacity-5 pointer-events-none">
                  <ShieldAlert className="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64" />
                </div>

                <div className="space-y-8 xs:space-y-10 sm:space-y-12 relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-2 xs:gap-3 pb-4 xs:pb-6 border-b-2 border-purple-200 dark:border-purple-800">
                    {activeSection && <activeSection.icon className={`w-6 h-6 xs:w-7 xs:h-7 ${activeColors.text}`} />}
                    <h2 className={`text-2xl xs:text-3xl sm:text-4xl font-black uppercase tracking-tighter ${activeColors.text}`}>
                      {activeSection?.title}
                    </h2>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 xs:space-y-5 sm:space-y-6">
                    {activeSection?.content.split("\n").map((line, i) => {
                      if (!line.trim()) return null;
                      const isListItem = line.match(/^\d+\.\d/);
                      
                      return (
                        <div key={i} className="flex gap-3 xs:gap-4 sm:gap-6 items-start">
                          {isListItem ? (
                            <div className={`w-5 h-5 xs:w-6 xs:h-6 rounded-full ${activeColors.light} flex items-center justify-center shrink-0 mt-0.5`}>
                              <span className={`text-[9px] xs:text-[10px] font-black ${activeColors.text}`}>
                                {line.match(/^\d+\.\d/)?.[0]}
                              </span>
                            </div>
                          ) : (
                            <CheckCircle2 className={`w-4 h-4 xs:w-5 xs:h-5 ${activeColors.text} shrink-0 mt-0.5`} />
                          )}
                          <p className="text-xs xs:text-sm sm:text-base text-muted-foreground font-medium leading-relaxed">
                            {line.replace(/^\d+\.\d\s*/, "")}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="pt-6 xs:pt-8 sm:pt-10 border-t border-purple-200 dark:border-purple-800 mt-8 xs:mt-10 sm:mt-12">
                    <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 xs:gap-4">
                      <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                        Last Revision: January 2026
                      </p>
                      <div className="flex items-center gap-2">
                        <Scroll className="w-3 h-3 text-amber-500" />
                        <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-bold text-purple-600">
                          Authenticated by the Scholarly Council Office
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 xs:mt-16 sm:mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
            <Heart className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[8px] xs:text-[9px] font-black uppercase tracking-wider text-muted-foreground">
              These policies are designed to preserve the integrity of the Sanad
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}