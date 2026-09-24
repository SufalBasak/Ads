# Code_X tech & Sufal_Ad Digital Product Studio

A **professional, modern, conversion-focused digital agency web application** built with HTML5, CSS3, Vanilla JavaScript, Google Sheets CRM, and Google Apps Script API integration. Developed by Sufal basak.

---

## 🌟 Key Features & Architectural Highlights

1. **Brand Aesthetic & Visuals**:
   - Clean, light background with deep royal blue primary accents (`#1e40af` / `#2563eb`) and dark slate navy typography.
   - Whitespace, modern typography (*Outfit* and *Plus Jakarta Sans*), subtle gradients, and glassmorphism.
   - **Zero fake metrics / fake reviews**: Strictly authentic engineering methodology and transparent deliverables.

2. **Core Pages**:
   - `index.html`: Hero with interactive 3D Canvas Studio world visualizer, services overview, **WorksWheel 3D portfolio carousel**, starting from ₹599 pricing preview with 30% discount, process breakdown, and FAQ.
   - `pricing.html`: SaaS-style pricing page starting from **₹599** with interactive 30% discount calculator, 4 tiers (Starter, Business, Web App, Custom), feature matrix table, and transparent disclaimers.
   - `inquiry.html`: High-conversion multi-section Project Inquiry Form with live preview summary card, URL parameter pre-population, and Google Sheets CRM integration.
   - `projects.html`: Full portfolio showcase with category filtering (All, Web, Apps, SaaS, Branding, Ads, SEO, Education, Business) and instant search.
   - `project.html`: Dedicated dynamic project detail case study view (`project.html?id=...`).
   - `services.html`: Full breakdown of Web Development, App Development, SaaS Platforms, Branding, Ads, and SEO.
   - `branding.html`: Visual identity, logo suites, Figma design tokens, and social creative motion kits.
   - `web-apps.html`: SaaS architecture, multi-role auth, dashboards, and database integrations.
   - `apps.html`: iOS, Android, and Progressive Web Apps (PWAs).
   - `ads-seo.html`: Google Ads, Meta Ads, Core Web Vitals, and Technical SEO audits.
   - `support.html`: Post-launch support, maintenance packages, and Google Sheets support ticket form.
   - `contact.html`: Direct inquiry and consultation booking.

3. **WorksWheel 3D & 3D Orbit Integration**:
   - **Vanilla JS**: Built-in 3D mathematical cylinder transform engine (`js/works-wheel-vanilla.js`) and 3D interactive canvas hero (`js/orbit-hero-vanilla.js`) running out of the box with zero dependencies.
   - **React / TypeScript / shadcn**: Production-ready React components located in `components/ui/works-wheel.tsx` and `components/ui/orbit-delivery-hero.tsx`.

4. **Google Sheets & Google Apps Script Backend**:
   - Automated CRM recording inquiries into Google Sheets under **"Project Inquiries"** with unique ID generation (`INQ-2026-XXXXX`).
   - Post-launch support requests stored under **"Support Requests"**.
   - Dynamic project CMS loader (`js/sheets-api.js` + `google-apps-script/Code.gs`).

---

## 🚀 Google Sheets & Google Apps Script Setup Guide

Follow these quick steps to connect your live Google Sheet CRM:

1. **Create a Google Sheet**:
   - Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet named **"Agency CRM"**.

2. **Open Apps Script**:
   - Click **Extensions > Apps Script**.
   - Delete any default code in `Code.gs`.
   - Copy and paste the contents of `google-apps-script/Code.gs` into `Code.gs`.

3. **Deploy Web App**:
   - Click **Deploy > New deployment**.
   - Select type: **Web app**.
   - Description: `Agency CRM API`.
   - Execute as: `Me (your email)`.
   - Who has access: `Anyone`.
   - Click **Deploy** and copy the **Web App URL** (e.g. `https://script.google.com/macros/s/AKfycb.../exec`).

4. **Update Frontend Configuration**:
   - Open `js/sheets-api.js`.
   - Update the top constant:
     ```javascript
     const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYED_URL_HERE/exec";
     ```
   - *Note: If no URL is provided, the application automatically uses a persistent offline `localStorage` CRM fallback for testing!*

---

## 💰 Pricing & 30% Offer Structure

- **Starting Price**: Clear baseline of **₹599** for simple starter landing pages.
- **30% Discount Engine**: Implemented in `js/pricing.js`:
  ```javascript
  function calculateDiscount(price, discount = 30) {
      return price - (price * discount / 100);
  }
  ```
- **Tiers**:
  1. **Starter (₹599)**: Single-page responsive site, basic contact form, basic SEO.
  2. **Business (₹2,999)**: Multi-page (up to 7 pages), Google Sheets CRM, GA4, On-page SEO.
  3. **Web Application (₹7,999)**: Custom UI, Auth, Dashboard, Database, API integration.
  4. **Custom Product**: Tailored quote for SaaS, education portals, and complex business software.

---

## ⚛️ React & shadcn Project Setup Instructions

If you wish to use the `WorksWheel` and `OrbitDeliveryHero` components in a React / Next.js app:

1. **Dependencies**:
   ```bash
   npm install clsx tailwind-merge lucide-react three @react-three/fiber
   ```

2. **File Paths**:
   - Component: `components/ui/works-wheel.tsx`
   - Utility: `lib/utils.ts`
   - Orbit Hero: `components/ui/orbit-delivery-hero.tsx`

3. **Why `/components/ui`?**:
   Following shadcn standard conventions ensures automated CLI tooling, clean imports (`@/components/ui/...`), and consistent design token resolution with Tailwind CSS.

---

## 💻 Local Preview & Verification

To run and preview the website locally:

```powershell
# Using Python built-in server:
python -m http.server 8000

# Or using Node npx serve:
npx -y serve .
```

Open your browser at `http://localhost:8000` to experience the website.
