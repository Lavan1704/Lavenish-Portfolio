# Lavanish P - Developer Portfolio Website

A modern, responsive, high-performance portfolio website built specifically for **Lavanish P** based on his resume.

---

## 🌟 Highlights & Features
- **Design System & Theme**: Dark mode default with smooth Light/Dark mode switcher, glassmorphic UI, glowing ambient orbs, and clean typography.
- **Hero & Dynamic Typing**: Interactive role rotation (*Full Stack Developer*, *B.Tech IT Undergraduate*, *React & Python Builder*).
- **Resume-Grounded Content**:
  - **About & Objectives**: Grounded in his career objective and core strengths (Quick Learner, Punctual, Down-to-Earth, Positive Attitude, Hard Working).
  - **Education Journey**: Interactive timeline for B.Tech at R.M.D Engineering College (73%), HSC at ST. Johns Matric (79%), and SSC at ST. Johns Matric (64%).
  - **Technical Skills**: Categorized skills with interactive filters (C, Python, Java, React.js, HTML, JavaScript, REST API).
  - **Internships**: Full Stack Development internship highlights (Frontend, Backend, APIs).
  - **Featured Project**: *Student Attendance Management System* (Subject-Wise & Hour-Wise Tracking with photo verification & real-time analytics) with architecture modal.
  - **Contact & Connect**: Direct email (`lavanish17042007@gmail.com`), phone (`+91 9342798168`), one-click copy buttons, and an interactive message form.
  - **Interactive Resume Modal**: Built-in resume viewer and print-to-PDF button.

---

## 🔗 How to Update Your Links

Whenever you are ready to add your links, simply open **`js/config.js`** and paste your URLs. Everything across the website updates automatically!

### In `js/config.js`:
```javascript
const PORTFOLIO_CONFIG = {
  // Update your social and professional links here:
  links: {
    github: "https://github.com/your-username",        // <-- Replace with your GitHub URL
    linkedin: "https://linkedin.com/in/your-username",  // <-- Replace with your LinkedIn URL
    twitter: "https://x.com/your-username",            // <-- Optional Twitter / X URL
    portfolio: "https://your-domain.com",              // <-- Optional custom domain
    resumeDownload: "assets/Lavanish_P_Resume.pdf",     // <-- Place your PDF in the assets folder!
  },

  // Update your project repository and live demo links here:
  projects: [
    {
      id: "student-attendance-system",
      githubRepo: "https://github.com/your-username/attendance-system", // <-- GitHub repo
      liveDemo: "https://your-demo-url.com",                            // <-- Live demo link
    }
  ]
};
```

---

## 🚀 How to Run Locally

You don't need any complex setup! You can view it in two simple ways:

### Option 1: Direct File Open
Double-click `index.html` in file explorer to open it immediately in Google Chrome, Microsoft Edge, or any modern browser.

### Option 2: Local HTTP Server (Recommended)
From the `portfolio` folder, you can run:

```bash
# Using Python:
python -m http.server 3000

# Or using Node:
npx serve .
```
Then visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Free Deployment Options
1. **GitHub Pages**:
   - Create a repository named `lavanish-portfolio` on GitHub.
   - Push this folder to your repository.
   - Go to **Settings > Pages** and select `main` branch root. Your portfolio will be live at `https://<username>.github.io/lavanish-portfolio/`.
2. **Vercel / Netlify**:
   - Drag and drop this folder directly into [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on Vercel for free instant hosting with HTTPS.
