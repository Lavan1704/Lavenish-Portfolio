/**
 * =========================================================================
 * PORTFOLIO CONFIGURATION - LAVANISH P
 * =========================================================================
 * Update your links, social media profiles, and project URLs here.
 * Any update here will automatically reflect across the entire portfolio!
 */

const PORTFOLIO_CONFIG = {
  // Personal Information
  personal: {
    fullName: "Lavanish P",
    role: "Full Stack Developer & B.Tech IT Student",
    email: "lavanish17042007@gmail.com",
    phone: "+91 9342798168",
    location: "Chennai / Villupuram, Tamil Nadu, India",
    college: "R.M.D Engineering College, Chennai",
    degree: "B.Tech in Information Technology (2024 - 2028)",
    status: "Open to Internships & Projects",
  },

  // Social & Professional Profiles
  // UPDATE THESE LINKS WHENEVER READY!
  links: {
    github: "https://github.com/",          // e.g., https://github.com/lavanish17
    linkedin: "https://linkedin.com/in/",   // e.g., https://linkedin.com/in/lavanish-p
    twitter: "https://x.com/",              // Optional: Twitter / X profile
    portfolio: "#",                         // Your personal domain if you have one
    resumeDownload: "#resume-modal",        // Can be a PDF path like "assets/Lavanish_P_Resume.pdf" or modal anchor
  },

  // Project Links & Metadata
  projects: [
    {
      id: "student-attendance-system",
      title: "Student Attendance Management System",
      subtitle: "Subject-Wise and Hour-Wise Tracking Mini Project",
      githubRepo: "https://github.com/",    // Replace with GitHub repo link
      liveDemo: "https://",                 // Replace with Live demo link if deployed
      documentation: "#",
    }
  ]
};

// Export for module or global use
if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_CONFIG;
}
