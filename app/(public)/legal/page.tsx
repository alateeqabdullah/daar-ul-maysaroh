"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/shared/section-animation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  Lock,
  FileText,
  CheckCircle2,
  Landmark,
  Clock,
  Globe,
  Users,
  Heart,
  Award,
  Mail,
  Phone,
  Download,
  Printer,
  AlertTriangle,
  Gavel,
  Shield,
  Calendar,
  Baby,
  Scroll,
  MessageSquare,
  Sparkles,
  ArrowRight,
  BookMarked,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const LEGAL_SECTIONS = [
  {
    id: "preamble",
    title: "Preamble & Mission",
    icon: Scroll,
    gradient: "from-amber-500/20 to-amber-600/10",
    content: `Al-Maysaroh International Institute is established upon the principles of sacred knowledge preservation, scholarly integrity, and spiritual excellence. This governing document outlines the rights, responsibilities, and ethical framework binding all students, scholars, and staff.

    "Indeed, We have sent down the Quran and indeed, We will be its guardian." (Surah Al-Hijr: 9)

    1.1 The Institute operates under the supervision of the Scholarly Council, comprising senior scholars with Ijazah in the Ten Qira'at and classical Islamic sciences.
    
    1.2 All programs are designed to preserve the authentic chain of transmission (Sanad) reaching back to Prophet Muhammad (ﷺ).
    
    1.3 The Arabic term "Al-Maysaroh" signifies ease and facilitation, reflecting our commitment to making Quranic education accessible while maintaining scholarly rigor.`,
  },
  {
    id: "academic",
    title: "Academic Integrity & Sanad",
    icon: Scale,
    gradient: "from-blue-500/20 to-blue-600/10",
    content: `2.0 ACADEMIC INTEGRITY & SANAD CERTIFICATION

    2.1 The Ijazah (Certificate of Sanad) represents an unbroken chain of transmission to Prophet Muhammad (ﷺ). Its issuance is exclusively at the scholarly discretion of the assigned teacher based on demonstrated mastery, not financial consideration.

    2.2 Academic dishonesty constitutes a grave violation and includes:
      2.2.1 Use of artificial intelligence or recorded audio to simulate live recitation
      2.2.2 Misrepresentation of memorization progress (Hifz)
      2.2.3 Impersonation during assessments or examinations
      2.2.4 Plagiarism in written assignments or Tafsir submissions

    2.3 Students found guilty of academic dishonesty face:
      2.3.1 First offense: Formal warning and probationary period
      2.3.2 Second offense: Immediate expulsion without refund
      2.3.3 Permanent record of academic misconduct maintained

    2.4 Students must maintain proper Adab (Islamic Etiquette) toward scholars, including:
      2.4.1 Punctuality and preparedness for all sessions
      2.4.2 Respectful communication at all times
      2.4.3 Proper dress code during video sessions
      2.4.4 Attention and focus during instruction

    2.5 Grading and assessment criteria are determined by the Scholarly Council and communicated at program commencement.`,
  },
  {
    id: "financial",
    title: "Tuition & Financial Policy",
    icon: Landmark,
    gradient: "from-emerald-500/20 to-emerald-600/10",
    content: `3.0 TUITION & FINANCIAL OBLIGATIONS

    3.1 Tuition Structure:
      3.1.1 Tuition is calculated based on program duration, frequency, and selected payment plan
      3.1.2 All fees are denominated in USD; currency conversion fees may apply for international payments
      3.1.3 Tuition must be settled in advance of each academic period (monthly/quarterly/annually)

    3.2 Payment Methods:
      3.2.1 Automated: Credit/debit card processing via Stripe (instant activation)
      3.2.2 Manual: Bank transfer, mobile money, or Western Union (activation upon receipt verification)
      3.2.3 Cryptocurrency: Bitcoin and Ethereum accepted through third-party processors

    3.3 Manual Payment Verification:
      3.3.1 Students must upload proof of payment via the Bursar Portal
      3.3.2 Verification typically completed within 12 business hours
      3.3.3 Delayed verification may result in temporary portal access suspension

    3.4 Refund Policy:
      3.4.1 New Student Guarantee: Full refund within 14 days of first session
      3.4.2 After 14 days: Tuition is non-refundable but may be credited toward future sessions
      3.4.3 Program cancellation by Institute: Pro-rated refund for unused sessions
      3.4.4 Refunds processed within 15-30 business days

    3.5 Scholarship & Financial Aid:
      3.5.1 Need-based scholarships available for qualifying students
      3.5.2 Zakat-funded grants for students in extreme hardship
      3.5.3 Family discount: 15% for three or more enrollments from same household
      3.5.4 All financial aid subject to Scholarly Council approval

    3.6 Late Payment Policy:
      3.6.1 7-day grace period following due date
      3.6.2 After grace period: $25 late fee applied
      3.6.3 After 30 days: Suspension of portal access and session scheduling`,
  },
  {
    id: "attendance",
    title: "Attendance & Scheduling",
    icon: Clock,
    gradient: "from-purple-500/20 to-purple-600/10",
    content: `4.0 ATTENDANCE & SCHEDULING POLICIES

    4.1 Session Scheduling:
      4.1.1 Sessions are scheduled at mutually convenient times based on teacher availability
      4.1.2 All sessions are recorded for quality assurance and progress tracking
      4.1.3 Students receive calendar invitations with Zoom/meeting links

    4.2 Rescheduling Policy:
      4.2.1 Minimum 24-hour notice required for rescheduling
      4.2.2 Rescheduling requests submitted via student portal
      4.2.3 Same-week rescheduling subject to teacher availability
      4.2.4 Maximum 2 rescheduled sessions per month

    4.3 Missed Sessions (No-Show):
      4.3.1 No-show without 24-hour notice: Session forfeited
      4.3.2 Emergency exceptions considered on case-by-case basis
      4.3.3 Documentation required for medical emergencies

    4.4 Teacher Absence:
      4.4.1 If scholar misses session, makeup session scheduled within 7 days
      4.4.2 Students notified minimum 24 hours in advance when possible
      4.4.3 Substitute teacher provided for urgent coverage if needed

    4.5 Time Zone Considerations:
      4.5.1 All session times referenced in Eastern Time (ET)
      4.5.2 Students responsible for accurate time conversion
      4.5.3 Daylight saving time adjustments communicated via email`,
  },
  {
    id: "privacy",
    title: "Data & Audio Privacy",
    icon: Lock,
    gradient: "from-rose-500/20 to-rose-600/10",
    content: `5.0 DATA PRIVACY & RECORDING POLICY

    5.1 Data Collection:
      5.1.1 Personal information collected includes name, contact details, age, educational background
      5.1.2 Payment information processed through PCI-compliant third-party processors
      5.1.3 The Institute does not store full credit card details

    5.2 Session Recordings:
      5.2.1 Audio/video recordings captured for scholarly review and progress tracking
      5.2.2 Recordings accessible to student and teacher via secure portal
      5.2.3 Recordings retained for 12 months for quality assurance
      5.2.4 Automatic deletion after retention period

    5.3 Data Protection:
      5.3.1 Al-Maysaroh adheres to GDPR and applicable data protection laws
      5.3.2 All data encrypted in transit and at rest
      5.3.3 Regular security audits conducted by independent firms
      5.3.4 Data never sold or shared with third parties for marketing

    5.4 Special Provisions for Minors:
      5.4.1 Parental/guardian consent required for enrollment
      5.4.2 Parents may request access to all recordings involving their child
      5.4.3 Special privacy protections for students under 13

    5.5 Data Subject Rights:
      5.5.1 Right to access personal data
      5.5.2 Right to rectification of inaccurate data
      5.5.3 Right to erasure (subject to legal obligations)
      5.5.4 Requests submitted to privacy@almaysaroh.org

    5.6 Cookies & Tracking:
      5.6.1 Essential cookies required for portal functionality
      5.6.2 Analytics cookies used for website improvement
      5.6.3 Cookie preferences adjustable in browser settings`,
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    icon: FileText,
    gradient: "from-orange-500/20 to-orange-600/10",
    content: `6.0 INTELLECTUAL PROPERTY RIGHTS

    6.1 Institute-Owned Materials:
      6.1.1 All curriculum materials, including PDFs, audio files, and video lessons, are proprietary
      6.1.2 The proprietary tracking software, progress analytics, and portal design are trade secrets
      6.1.3 "Al-Maysaroh" name, logo, and branding are registered trademarks

    6.2 License to Students:
      6.2.1 Students receive non-exclusive, non-transferable license for personal use
      6.2.2 Materials may not be reproduced, distributed, or shared with third parties
      6.2.3 No commercial use permitted without written authorization

    6.3 Student-Created Content:
      6.3.1 Students retain ownership of their recitations and written work
      6.3.2 By submission, students grant Institute license to use for educational purposes
      6.3.3 Exceptional student work may be featured with permission

    6.4 Prohibited Activities:
      6.4.1 Screen recording or unauthorized capture of sessions
      6.4.2 Sharing portal access credentials
      6.4.3 Reverse engineering of tracking software
      6.4.4 Commercial resale of any Institute materials

    6.5 Copyright Infringement:
      6.5.1 Reports of infringement submitted to legal@almaysaroh.org
      6.5.2 DMCA compliance for US-based copyright claims
      6.5.3 Repeat infringers subject to account termination`,
  },
  {
    id: "child-protection",
    title: "Child Protection Policy",
    icon: Baby,
    gradient: "from-pink-500/20 to-pink-600/10",
    content: `7.0 CHILD PROTECTION & SAFEGUARDING

    7.1 Our Commitment:
      7.1.1 Al-Maysaroh maintains zero tolerance for abuse or exploitation
      7.1.2 All staff undergo enhanced background checks (DBS/ equivalent)
      7.1.3 Regular safeguarding training mandatory for all scholars

    7.2 Scholar Requirements:
      7.2.1 Valid government ID and proof of qualifications
      7.2.2 Character references from recognized Islamic scholars
      7.2.3 Annual safeguarding certification renewal
      7.2.4 Confidential background check disclosure

    7.3 Online Safety Measures:
      7.3.1 All sessions conducted through secure, monitored platforms
      7.3.2 Two-adult rule: parents encouraged to remain nearby during sessions
      7.3.3 No one-on-one chat outside official Institute channels
      7.3.4 All communications logged and audited

    7.4 Reporting Procedures:
      7.4.1 Immediate reporting required for any concerns
      7.4.2 Designated Safeguarding Lead: safeguarding@almaysaroh.org
      7.4.3 24-hour confidential hotline: +1 (555) 123-4567
      7.4.4 External reporting: Local authorities as required by law

    7.5 Prohibited Conduct:
      7.5.1 Inappropriate communication or relationships
      7.5.2 Sharing personal contact information
      7.5.3 Any form of physical, emotional, or sexual abuse
      7.5.4 Failure to report concerns about another staff member

    7.6 Parent/Guardian Responsibilities:
      7.6.1 Provide accurate emergency contact information
      7.6.2 Maintain awareness of child's online activities
      7.6.3 Report any concerns immediately
      7.6.4 Ensure child's environment is safe and appropriate`,
  },
  {
    id: "dispute-resolution",
    title: "Dispute Resolution",
    icon: Gavel,
    gradient: "from-indigo-500/20 to-indigo-600/10",
    content: `8.0 DISPUTE RESOLUTION & GOVERNING LAW

    8.1 Internal Resolution Process:
      8.1.1 Step 1: Direct communication with teacher (5 business days)
      8.1.2 Step 2: Formal complaint to Academic Coordinator (10 business days)
      8.1.3 Step 3: Escalation to Scholarly Council (15 business days)
      8.1.4 Step 4: Final arbitration by Institute Board

    8.2 Mediation:
      8.2.1 If internal resolution fails, parties agree to mediation
      8.2.2 Mediation conducted by recognized Islamic arbitration service
      8.2.3 Mediation costs shared equally between parties
      8.2.4 Mediation completed within 60 days

    8.3 Governing Law:
      8.3.1 This agreement governed by laws of [State/Country]
      8.3.2 Venue for legal proceedings in [Jurisdiction]
      8.3.3 Parties submit to exclusive jurisdiction of specified courts

    8.4 Arbitration:
      8.4.1 Any unresolved disputes submitted to binding arbitration
      8.4.2 Arbitration under rules of [Arbitration Association]
      8.4.3 Decision final and enforceable in any court

    8.5 Class Action Waiver:
      8.5.1 All disputes resolved on individual basis only
      8.5.2 No class, consolidated, or representative actions permitted

    8.6 Limitations:
      8.6.1 Claims must be filed within one year of incident
      8.6.2 Institute liability limited to tuition paid
      8.6.3 No liability for consequential or indirect damages`,
  },
  {
    id: "code-of-conduct",
    title: "Student Code of Conduct",
    icon: Users,
    gradient: "from-cyan-500/20 to-cyan-600/10",
    content: `9.0 STUDENT CODE OF CONDUCT

    9.1 General Expectations:
      9.1.1 Students represent Al-Maysaroh in all interactions
      9.1.2 Professional, respectful behavior required at all times
      9.1.3 Compliance with Islamic etiquette and dress code during sessions

    9.2 Prohibited Conduct:
      9.2.1 Harassment, discrimination, or bullying of any kind
      9.2.2 Sharing inappropriate content during sessions
      9.2.3 Unauthorized recording or distribution of sessions
      9.2.4 Impersonation or credential sharing
      9.2.5 Disruptive behavior affecting other students

    9.3 Communication Guidelines:
      9.3.1 All communication through official Institute channels
      9.3.2 Professional language and tone required
      9.3.3 Response expected within 48 business hours
      9.3.4 Emergency contact procedures communicated separately

    9.4 Social Media Policy:
      9.4.1 Students may not represent themselves as Institute spokespersons
      9.4.2 Confidential information may not be shared online
      9.4.3 Respectful discourse required when mentioning Institute
      9.4.4 Report problematic online content to Institute

    9.5 Consequences of Violations:
      9.5.1 Written warning for minor first offenses
      9.5.2 Temporary suspension pending investigation
      9.5.3 Permanent expulsion for serious violations
      9.5.4 Legal action for illegal activities`,
  },
  {
    id: "technology",
    title: "Technology & Platform Use",
    icon: Globe,
    gradient: "from-teal-500/20 to-teal-600/10",
    content: `10.0 TECHNOLOGY & PLATFORM USE

    10.1 System Requirements:
      10.1.1 Stable internet connection (minimum 5 Mbps recommended)
      10.1.2 Device with camera and microphone capabilities
      10.1.3 Updated browser (Chrome, Firefox, Safari, Edge)
      10.1.4 Zoom desktop client or web version

    10.2 Account Security:
      10.2.1 Students responsible for maintaining password confidentiality
      10.2.2 Two-factor authentication recommended
      10.2.3 Immediate reporting of unauthorized access required
      10.2.4 Account sharing strictly prohibited

    10.3 Technical Support:
      10.3.1 Support available via portal ticketing system
      10.3.2 Response within 24 business hours
      10.3.3 Emergency technical support during sessions
      10.3.4 Knowledge base available in student portal

    10.4 Service Availability:
      10.4.1 99.9% uptime target for core services
      10.4.2 Scheduled maintenance communicated 48 hours in advance
      10.4.3 Emergency maintenance as required for security
      10.4.4 Credits not provided for temporary outages

    10.5 Data Backup:
      10.5.1 Student progress data backed up daily
      10.5.2 Recording retention as specified in privacy policy
      10.5.3 Students encouraged to maintain personal backups`,
  },
  {
    id: "termination",
    title: "Termination & Suspension",
    icon: AlertTriangle,
    gradient: "from-red-500/20 to-red-600/10",
    content: `11.0 TERMINATION & SUSPENSION POLICIES

    11.1 Voluntary Withdrawal:
      11.1.1 Students may withdraw at any time via portal
      11.1.2 Refund eligibility determined by financial policy
      11.1.3 Access maintained until end of paid period
      11.1.4 Re-enrollment subject to availability

    11.2 Involuntary Suspension:
      11.2.1 Pending investigation of alleged violations
      11.2.2 Non-payment beyond grace period
      11.2.3 Threat to safety or security of community
      11.2.4 Suspended students may appeal within 14 days

    11.3 Involuntary Termination:
      11.3.1 Academic dishonesty (as defined in Section 2)
      11.3.2 Code of conduct violations (as defined in Section 9)
      11.3.3 Fraud or misrepresentation in application
      11.3.4 Repeated policy violations after warnings

    11.4 Effect of Termination:
      11.4.1 Immediate revocation of portal access
      11.4.2 Forfeiture of all tuition paid (unless otherwise specified)
      11.4.3 Certificate eligibility voided
      11.4.4 Permanent record maintained for regulatory purposes

    11.5 Reinstatement:
      11.5.1 Former students may apply for reinstatement after 12 months
      11.5.2 Subject to Scholarly Council approval
      11.5.3 Outstanding obligations must be satisfied
      11.5.4 Probationary period may apply`,
  },
  {
    id: "certification",
    title: "Certification & Credentials",
    icon: Award,
    gradient: "from-gold/20 to-gold/10",
    content: `12.0 CERTIFICATION & ACADEMIC CREDENTIALS

    12.1 Types of Certification:
      12.1.1 Ijazah: Traditional certification with complete sanad
      12.1.2 Certificate of Completion: Program completion without Ijazah
      12.1.3 Certificate of Excellence: Superior achievement recognition

    12.2 Requirements for Ijazah:
      12.2.1 Complete memorization or mastery of prescribed material
      12.2.2 Demonstration of proper Tajweed in all contexts
      12.2.3 Successful oral examination by multiple scholars
      12.2.4 Character verification and scholarly recommendation
      12.2.5 Minimum residency period as determined by program

    12.3 Certificate Validity:
      12.3.1 Certificates verifiable through Institute portal
      12.3.2 QR code authentication for third-party verification
      12.3.3 Digital and physical copies provided
      12.3.4 Replacement certificates available for fee

    12.4 Transcripts & Records:
      12.4.1 Official transcripts available upon request
      12.4.2 Academic records maintained indefinitely
      12.4.3 Transfer of credit to other institutions at their discretion
      12.4.4 Grade appeals processed through dispute resolution

    12.5 Revocation of Certification:
      12.5.1 Certificates may be revoked for fraud or misrepresentation
      12.5.2 Posthumous revocation in cases of discovered fraud
      12.5.3 Public notice of revocation as appropriate
      12.5.4 Legal remedies pursued for fraudulent credentials`,
  },
];

export default function LegalHub() {
  const [activeTab, setActiveTab] = useState("preamble");
  const [lastUpdated] = useState("March 10, 2026");
  const [version] = useState("2.1.0");



  // Handle hash navigation
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && LEGAL_SECTIONS.some((s) => s.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  const activeSection = LEGAL_SECTIONS.find((s) => s.id === activeTab);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [LEGAL_SECTIONS.map((s) => `${s.title}\n\n${s.content}`).join("\n\n")],
      { type: "text/plain" },
    );
    element.href = URL.createObjectURL(file);
    element.download = `Al-Maysaroh-Legal-${version}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div
        className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
        style={{ backgroundSize: "300px" }}
      />
      <div className="absolute top-40 left-0 w-96 h-96 bg-primary-700/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-primary-700/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <Reveal>
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-xs font-black uppercase tracking-[0.3em]">
                <Shield className="w-4 h-4" />
                INSTITUTIONAL GOVERNANCE
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[0.9]">
                Sacred{" "}
                <span className="text-primary-700 italic">Framework</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                The ethical and legal foundation preserving the integrity of
                sacred knowledge transmission at Al-Maysaroh International
                Institute.
              </p>

              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary-700" />
                  Last Updated: {lastUpdated}
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary-700" />
                  Version {version}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-6">
            <Reveal delay={0.1}>
              <div className="glass-surface p-6 rounded-2xl border border-primary-700/20 sticky top-32">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-black text-sm uppercase tracking-widest text-primary-700">
                    Legal Chapters
                  </h2>
                  <BookMarked className="w-5 h-5 text-primary-700/50" />
                </div>

                <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {LEGAL_SECTIONS.map((section, index) => (
                    <motion.button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={cn(
                        "w-full p-4 rounded-xl transition-all duration-300 text-left flex items-center gap-4 group relative overflow-hidden",
                        activeTab === section.id
                          ? "bg-linear-to-r from-primary-700/10 to-transparent border border-primary-700/30"
                          : "hover:bg-muted/30",
                      )}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Active Indicator */}
                      {activeTab === section.id && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-primary-700 rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}

                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all",
                          activeTab === section.id
                            ? "bg-primary-700 text-white"
                            : "bg-primary-50 dark:bg-primary-950/40 text-primary-700 group-hover:scale-110",
                        )}
                      >
                        <section.icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-black text-xs uppercase tracking-widest truncate">
                          {section.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Section {String(index + 1).padStart(2, "0")}
                        </p>
                      </div>

                      <ChevronRight
                        className={cn(
                          "w-4 h-4 transition-all",
                          activeTab === section.id
                            ? "text-primary-700 translate-x-0"
                            : "text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1",
                        )}
                      />
                    </motion.button>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="w-full justify-between group"
                    size="sm"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </Button>
                  <Button
                    onClick={handlePrint}
                    variant="outline"
                    className="w-full justify-between group"
                    size="sm"
                  >
                    <span className="flex items-center gap-2">
                      <Printer className="w-4 h-4" />
                      Print Document
                    </span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div
                  className={cn(
                    "institutional-card p-8 sm:p-10 md:p-12 relative overflow-hidden",
                    "border-l-4 border-primary-700",
                  )}
                >
                  {/* Gradient Background */}
                  <div
                    className={cn(
                      "absolute inset-0 opacity-10 pointer-events-none",
                      "bg-linear-to-br",
                      activeSection?.gradient,
                    )}
                  />

                  {/* Decorative Icon */}
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    {activeSection?.icon && (
                      <activeSection.icon className="w-32 h-32 text-primary-700" />
                    )}
                  </div>

                  {/* Header */}
                  <div className="relative z-10 mb-8 pb-8 border-b border-border/50">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary-700/10 flex items-center justify-center">
                        {activeSection?.icon && (
                          <activeSection.icon className="w-7 h-7 text-primary-700" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">
                          {activeSection?.title}
                        </h2>
                        <p className="text-xs text-muted-foreground mt-2">
                          Section{" "}
                          {activeSection?.id.replace(/-/g, ".").toUpperCase()}{" "}
                          of the Institutional Governance Framework
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-6 prose prose-sm sm:prose-base max-w-none">
                    {activeSection?.content.split("\n").map((line, i) => {
                      if (line.trim() === "")
                        return <div key={i} className="h-4" />;

                      if (line.match(/^\d+\.\d+\s+[A-Z]/)) {
                        return (
                          <h3
                            key={i}
                            className="text-xl font-black uppercase tracking-tight mt-8 first:mt-0"
                          >
                            {line.trim()}
                          </h3>
                        );
                      }

                      if (line.match(/^\s*\d+\.\d+\.\d+/)) {
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.02 }}
                            className="flex gap-3 ml-4 group"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary-700 mt-2.5 shrink-0 group-hover:scale-125 transition-transform" />
                            <p className="text-base text-muted-foreground leading-relaxed">
                              {line.trim()}
                            </p>
                          </motion.div>
                        );
                      }

                      return (
                        <p
                          key={i}
                          className="text-base text-muted-foreground leading-relaxed"
                        >
                          {line.trim()}
                        </p>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="relative z-10 mt-12 pt-8 border-t border-border/50">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">
                              Last Updated
                            </p>
                            <p className="font-black">{lastUpdated}</p>
                          </div>
                          <div>
                            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">
                              Version
                            </p>
                            <p className="font-black">{version}</p>
                          </div>
                          <div>
                            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">
                              Document ID
                            </p>
                            <p className="font-black font-mono">
                              ALM-LEGAL-{version.replace(/\./g, "")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Sparkles className="w-4 h-4 text-primary-700" />
                          <p className="text-xs text-muted-foreground">
                            Authenticated by the Scholarly Council of
                            Al-Maysaroh International Institute
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {[Mail, Phone, Heart].map((Icon, idx) => (
                          <motion.a
                            key={idx}
                            href="#"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 rounded-full bg-primary-700/10 flex items-center justify-center text-primary-700 hover:bg-primary-700 hover:text-white transition-colors"
                          >
                            <Icon className="w-4 h-4" />
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    {/* Acknowledgment Banner */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-8 p-5 rounded-2xl bg-linear-to-r from-primary-700/5 to-transparent border border-primary-700/20"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary-700/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-primary-700" />
                        </div>
                        <div>
                          <p className="font-black text-sm uppercase tracking-wider mb-1">
                            Acknowledgment of Terms
                          </p>
                          <p className="text-sm text-muted-foreground">
                            By enrolling in any Al-Maysaroh program, you
                            acknowledge that you have read, understood, and
                            agree to be bound by these institutional policies.
                            This document constitutes the entire agreement
                            between the Institute and its students.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Contact Cards */}
            <Reveal delay={0.2}>
              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                {[
                  {
                    icon: Mail,
                    title: "Legal Inquiries",
                    value: "info.almaysaroh@gmail.com",
                    gradient: "from-blue-500/10 to-blue-600/5",
                  },
                  {
                    icon: Heart,
                    title: "Safeguarding",
                    value: "info.almaysaroh@gmail.com",
                    gradient: "from-pink-500/10 to-pink-600/5",
                  },
                  {
                    icon: MessageSquare,
                    title: "General Support",
                    value: "info.almaysaroh@gmail.com",
                    gradient: "from-green-500/10 to-green-600/5",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    className={cn(
                      "p-5 rounded-xl border border-primary-700/10 bg-linear-to-br",
                      item.gradient,
                    )}
                  >
                    <item.icon className="w-5 h-5 text-primary-700 mb-3" />
                    <p className="font-black text-xs uppercase tracking-widest mb-1">
                      {item.title}
                    </p>
                    <p className="text-sm font-mono truncate">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}








// "use client";

// import { useState } from "react";
// import { Reveal } from "@/components/shared/section-animation";
// import {
//   ShieldAlert,
//   Scale,
//   Lock,
//   RefreshCw,
//   FileText,
//   CheckCircle2,
//   Landmark,
//   Clock,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// const LEGAL_SECTIONS = [
//   {
//     id: "academic",
//     title: "Academic Integrity & Sanad",
//     icon: Scale,
//     content: `Participation in Al-Maysaroh programs is a commitment to sacred knowledge.
//     1.1 The issuance of an Ijazah (Certificate of Sanad) is not guaranteed by payment but by the exclusive scholarly discretion of the assigned teacher.
//     1.2 Academic dishonesty, including the use of AI for recitation or faking hifz progress, will result in immediate expulsion without refund.
//     1.3 Students must maintain Adab (Islamic Etiquette) toward their scholars at all times.`,
//   },
//   {
//     id: "financial",
//     title: "Tuition & Financial Policy",
//     icon: Landmark,
//     content: `2.1 Tuition is settled in advance of the academic month.
//     2.2 For manual transfers (Bank/Mobile Money), students must provide proof of payment via the bursar portal. Portal activation occurs only after the Bursar verifies receipt of funds.
//     2.3 Refund Policy: We offer a 14-day Satisfaction Guarantee for new enrollments. After 14 days, tuition is non-refundable but can be credited toward future sessions.`,
//   },
//   {
//     id: "attendance",
//     title: "Attendance & Rescheduling",
//     icon: Clock,
//     content: `3.1 Rescheduling requires a minimum of 24 hours' notice.
//     3.2 Sessions missed without 24-hour notice are forfeited and non-refundable.
//     3.3 If a scholar misses a session, a makeup class will be scheduled at the student's earliest convenience.`,
//   },
//   {
//     id: "privacy",
//     title: "Data & Audio Privacy",
//     icon: Lock,
//     content: `4.1 Audio and video of recitations are recorded solely for scholarly review and progress tracking.
//     4.2 Al-Maysaroh adheres to GDPR standards. Student data is encrypted and never sold or shared with third parties.
//     4.3 By enrolling, parents of minor students consent to the educational recording of sessions.`,
//   },
// ];

// export default function LegalHub() {
//   const [activeTab, setActiveTab] = useState("academic");

//   return (
//     <main className="pt-40 pb-20 bg-background">
//       <div className="container mx-auto px-6">
//         <div className="grid lg:grid-cols-12 gap-16">
//           {/* Sidebar Nav */}
//           <div className="lg:col-span-4 space-y-10">
//             <Reveal>
//               <h1 className="text-6xl font-black tracking-tighter font-heading leading-tight mb-8">
//                 Institutional <br />
//                 <span className="text-primary-700 italic">Governance.</span>
//               </h1>
//               <p className="text-muted-foreground font-medium border-l-4 border-primary-700 pl-6">
//                 The legal and ethical framework governing the Al-Maysaroh
//                 International Institute.
//               </p>
//             </Reveal>

//             <div className="flex flex-col gap-3">
//               {LEGAL_SECTIONS.map((section) => (
//                 <button
//                   key={section.id}
//                   onClick={() => setActiveTab(section.id)}
//                   className={cn(
//                     "p-6 rounded-2xl border-2 transition-all duration-500 text-left flex items-center gap-4 group",
//                     activeTab === section.id
//                       ? "glass-academic border-primary-700 text-primary-700 shadow-xl"
//                       : "hover:border-primary-700/20 opacity-60",
//                   )}
//                 >
//                   <section.icon className="w-6 h-6" />
//                   <span className="font-black uppercase text-xs tracking-widest">
//                     {section.title}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Main Legal Content */}
//           <div className="lg:col-span-8">
//             <Reveal key={activeTab}>
//               <div className="glass-academic p-10 lg:p-20 rounded-[4rem] border shadow-2xl min-h-[600px] relative overflow-hidden">
//                 <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
//                   <ShieldAlert className="w-64 h-64" />
//                 </div>

//                 <div className="space-y-12 relative z-10">
//                   <h2 className="text-4xl font-black uppercase tracking-tighter border-b pb-8">
//                     {LEGAL_SECTIONS.find((s) => s.id === activeTab)?.title}
//                   </h2>

//                   <div className="space-y-8">
//                     {LEGAL_SECTIONS.find((s) => s.id === activeTab)
//                       ?.content.split("\n")
//                       .map((line, i) => (
//                         <div key={i} className="flex gap-6 items-start">
//                           <CheckCircle2 className="w-6 h-6 text-primary-700 shrink-0 mt-1" />
//                           <p className="text-xl text-muted-foreground font-medium leading-relaxed">
//                             {line.trim()}
//                           </p>
//                         </div>
//                       ))}
//                   </div>

//                   <div className="pt-12 border-t mt-20">
//                     <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
//                       Last Revision: January 2026
//                     </p>
//                     <p className="text-xs font-bold mt-2">
//                       Authenticated by the Scholarly Council Office.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
