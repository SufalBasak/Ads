/**
 * Projects Data Store & Dynamic Renderer
 * Supports category filtering, search, and dynamic project detail views
 */

const PROJECTS_DATA = [
  {
    id: "nexus-saas",
    name: "Nexus SaaS Flow",
    category: "SaaS",
    categoryLabel: "SaaS Platform",
    shortDesc: "Automated workflow management platform with multi-tenant dashboard and realtime analytics.",
    description: "Nexus SaaS is a full-featured workflow and revenue management application designed for scaling startups. Features include modular team workspaces, granular permissions, live WebSockets activity feeds, and instant Stripe billing integration.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "TailwindCSS", "Redis"],
    features: [
      "Realtime multi-tenant dashboard",
      "OAuth 2.0 & Role-based Access Control",
      "Stripe recurring subscription billing",
      "Automated PDF invoice generation",
      "Custom webhook integrations"
    ],
    liveDemoUrl: "https://example.com/demo/nexus-saas",
    githubUrl: "https://github.com/example/nexus-saas",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    results: [
      { label: "Lighthouse Performance", value: "98/100" },
      { label: "Server Response Time", value: "< 120ms" },
      { label: "Test Coverage", value: "94%" }
    ],
    featured: true
  },
  {
    id: "fintech-pulse",
    name: "FinPulse Global App",
    category: "Apps",
    categoryLabel: "Mobile Application",
    shortDesc: "Cross-platform mobile banking & investments tracking application with biometric security.",
    description: "FinPulse provides everyday users with a unified dashboard to monitor savings, mutual funds, crypto holdings, and credit health with zero-friction biometrics and instant bank syncing.",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
    technologies: ["React Native", "Expo", "GraphQL", "Tailwind", "Node.js"],
    features: [
      "Biometric FaceID / Fingerprint auth",
      "Interactive asset allocation charts",
      "Push notification price alerts",
      "Offline cache syncing",
      "Multi-currency conversion engine"
    ],
    liveDemoUrl: "https://example.com/demo/finpulse",
    githubUrl: "https://github.com/example/finpulse",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    results: [
      { label: "App Startup Time", value: "0.8s" },
      { label: "Crash Free Rate", value: "99.9%" },
      { label: "Security Compliance", value: "AES-256" }
    ],
    featured: true
  },
  {
    id: "aurora-studio-brand",
    name: "Aurora Design Identity",
    category: "Branding",
    categoryLabel: "Brand & UI/UX",
    shortDesc: "Complete brand visual identity, design system, bespoke typography, and digital asset kit.",
    description: "A comprehensive brand evolution project including vector logo mark, cohesive color system, 3D brand guidelines, marketing collateral, social creative templates, and design tokens.",
    thumbnail: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1600&q=80",
    technologies: ["Figma", "Illustrator", "After Effects", "Design Tokens"],
    features: [
      "Scalable Vector Logo Suite",
      "Custom Design Tokens & System",
      "Social Media Motion Templates",
      "Brand Guidelines Manual",
      "3D Product Renderings"
    ],
    liveDemoUrl: "https://example.com/demo/aurora-brand",
    githubUrl: "",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    results: [
      { label: "Asset Formats", value: "SVG, AI, WebP" },
      { label: "Component Tokens", value: "140+ Tokens" },
      { label: "WCAG Accessibility", value: "AAA Contrast" }
    ],
    featured: true
  },
  {
    id: "hypergrowth-ads-seo",
    name: "HyperGrowth SEO & Ads",
    category: "Ads",
    categoryLabel: "Advertising & SEO",
    shortDesc: "High-converting ad campaign funnels with technical Core Web Vitals SEO optimization.",
    description: "Engineered high-intent Google Ads and Meta campaigns paired with custom high-speed landing pages. Performed end-to-end technical SEO audits, schema markup implementation, and site structure overhaul.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    technologies: ["Google Ads", "Meta Ads", "Technical SEO", "Schema.org", "Analytics 4"],
    features: [
      "Custom high-speed landing pages",
      "Full JSON-LD structured data",
      "Server-side conversion tracking",
      "Comprehensive keyword mapping",
      "Automated weekly reporting"
    ],
    liveDemoUrl: "https://example.com/demo/hypergrowth",
    githubUrl: "",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    results: [
      { label: "Core Web Vitals", value: "100% Passed" },
      { label: "Mobile Page Load", value: "< 1.1s" },
      { label: "Schema Validation", value: "Valid 100%" }
    ],
    featured: true
  },
  {
    id: "edutech-academy",
    name: "EduSphere Learning Portal",
    category: "Education",
    categoryLabel: "Education Platform",
    shortDesc: "Online education and examination portal with video streaming and interactive quizzes.",
    description: "A comprehensive digital learning management system enabling educators to publish interactive video courses, host live webinars, conduct timed tests, and automatically generate verified completion certificates.",
    thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1600&q=80",
    technologies: ["Next.js", "Node.js", "MongoDB", "AWS S3", "TailwindCSS"],
    features: [
      "Secure video CDN streaming",
      "Live quiz & examination engine",
      "Dynamic certificate generator",
      "Student progress tracking",
      "Instructor payout dashboard"
    ],
    liveDemoUrl: "https://example.com/demo/edusphere",
    githubUrl: "https://github.com/example/edusphere",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    results: [
      { label: "Lighthouse Score", value: "97/100" },
      { label: "Video Start Buffer", value: "< 350ms" },
      { label: "Uptime SLA", value: "99.95%" }
    ],
    featured: true
  },
  {
    id: "omnibiz-erp",
    name: "OmniBiz Enterprise Portal",
    category: "Business",
    categoryLabel: "Custom Software",
    shortDesc: "Custom business management suite with inventory, invoicing, CRM, and staff payroll.",
    description: "Tailored enterprise software replacing fragmented spreadsheets with an automated internal operations hub. Integrates warehouse stock alerts, barcode scanning, client ticketing, and GST compliance reporting.",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    technologies: ["React", "TypeScript", "Express", "PostgreSQL", "Docker"],
    features: [
      "Realtime inventory tracking",
      "Automated GST invoice generation",
      "Customer inquiry pipeline",
      "Multi-warehouse syncing",
      "Automated daily cloud backups"
    ],
    liveDemoUrl: "https://example.com/demo/omnibiz",
    githubUrl: "https://github.com/example/omnibiz",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    results: [
      { label: "Query Execution", value: "< 45ms" },
      { label: "Data Redundancy", value: "Zero Loss" },
      { label: "Concurrent Sessions", value: "1,000+" }
    ],
    featured: true
  }
];

/**
 * Render Project Cards to Target Container
 */
function renderProjects(projects = PROJECTS_DATA, targetSelector = "#projects-grid-container") {
  const container = document.querySelector(targetSelector);
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--color-text-muted);">
        <p style="font-size: 1.25rem; font-weight: 600;">No projects found matching this category.</p>
        <p style="font-size: 0.9375rem;">Try selecting a different filter above.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = projects.map(p => `
    <article class="project-card reveal" data-category="${p.category.toLowerCase()}">
      <div class="project-thumbnail-wrapper">
        <img src="${p.thumbnail}" alt="${p.name}" class="project-thumbnail" loading="lazy" />
        <span class="project-category-badge">${p.categoryLabel}</span>
      </div>
      <div class="project-card-body">
        <h3 class="project-card-title">${p.name}</h3>
        <p class="project-card-desc">${p.shortDesc}</p>
        <div class="project-tech-tags">
          ${p.technologies.slice(0, 4).map(t => `<span class="tech-tag">${t}</span>`).join("")}
        </div>
        <div class="project-card-actions">
          <a href="project.html?id=${p.id}" class="btn btn-secondary btn-sm" style="flex: 1;">
            View Project Details
          </a>
          ${p.videoUrl ? `
            <button class="btn btn-outline btn-sm" onclick="openVideoModal('${p.videoUrl}', '${p.name}')" title="Watch Video">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          ` : ""}
        </div>
      </div>
    </article>
  `).join("");

  // Trigger animation refresh
  if (window.initScrollReveal) window.initScrollReveal();
}

/**
 * Filter Projects by Category
 */
function filterProjectsByCategory(category) {
  const pills = document.querySelectorAll(".filter-pill");
  pills.forEach(pill => {
    pill.classList.toggle("active", pill.getAttribute("data-filter") === category);
  });

  if (category === "all") {
    renderProjects(PROJECTS_DATA);
  } else {
    const filtered = PROJECTS_DATA.filter(p => p.category.toLowerCase() === category.toLowerCase());
    renderProjects(filtered);
  }
}

/**
 * Load Dynamic Project Detail on project.html?id=...
 */
function loadProjectDetailPage() {
  const detailContainer = document.getElementById("project-detail-content");
  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id") || "nexus-saas";
  const project = PROJECTS_DATA.find(p => p.id === projectId) || PROJECTS_DATA[0];

  document.title = `${project.name} | Case Study & Details - Sufal & Code_IT Studio`;

  detailContainer.innerHTML = `
    <div class="container container-narrow">
      <nav style="margin-bottom: 2rem; font-size: 0.875rem; color: var(--color-text-muted);">
        <a href="index.html">Home</a> &nbsp;/&nbsp; <a href="projects.html">Projects</a> &nbsp;/&nbsp; <strong style="color: var(--color-text-main);">${project.name}</strong>
      </nav>

      <div style="margin-bottom: 2.5rem;">
        <span class="section-eyebrow">${project.categoryLabel}</span>
        <h1 style="margin-top: 0.75rem; margin-bottom: 1rem;">${project.name}</h1>
        <p style="font-size: 1.25rem; color: var(--color-text-muted); line-height: 1.7;">
          ${project.description}
        </p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1.5rem;">
          ${project.liveDemoUrl ? `<a href="${project.liveDemoUrl}" target="_blank" rel="noopener" class="btn btn-primary">Launch Live Demo ↗</a>` : ""}
          ${project.videoUrl ? `<button class="btn btn-secondary" onclick="openVideoModal('${project.videoUrl}', '${project.name}')">Watch Product Walkthrough ▶</button>` : ""}
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-outline">GitHub Source</a>` : ""}
        </div>
      </div>

      <div style="border-radius: var(--radius-xl); overflow: hidden; margin-bottom: 3.5rem; box-shadow: var(--shadow-lg); border: 1px solid var(--color-border);">
        <img src="${project.coverImage}" alt="${project.name}" style="width: 100%; height: auto;" />
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; margin-bottom: 4rem;">
        <div>
          <h2 style="font-size: 1.75rem; margin-bottom: 1.25rem;">Core Architecture & Features</h2>
          <ul style="margin-bottom: 2rem;">
            ${project.features.map(f => `
              <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.85rem; font-size: 1rem; color: var(--color-text-secondary);">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" style="color: var(--color-primary); flex-shrink: 0;"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                ${f}
              </li>
            `).join("")}
          </ul>

          <h2 style="font-size: 1.75rem; margin-bottom: 1.25rem;">Technology Stack</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
            ${project.technologies.map(t => `<span class="tech-tag" style="font-size: 0.875rem; padding: 0.4rem 0.85rem;">${t}</span>`).join("")}
          </div>
        </div>

        <div>
          <div style="background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.75rem;">
            <h3 style="font-size: 1.15rem; margin-bottom: 1.25rem;">Verified Performance</h3>
            ${project.results.map(r => `
              <div style="border-bottom: 1px solid var(--color-border-light); padding: 0.75rem 0;">
                <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-text-muted);">${r.label}</div>
                <div style="font-size: 1.15rem; font-weight: 700; color: var(--color-primary-dark);">${r.value}</div>
              </div>
            `).join("")}

            <div style="margin-top: 1.75rem;">
              <a href="inquiry.html?projectType=${encodeURIComponent(project.categoryLabel)}" class="btn btn-primary btn-block">
                Start Similar Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  loadProjectDetailPage();

  // Attach filter event listeners
  const pills = document.querySelectorAll(".filter-pill");
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      const category = pill.getAttribute("data-filter");
      filterProjectsByCategory(category);
    });
  });
});
