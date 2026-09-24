/**
 * Interactive Google Maps City UI Component
 * Exact UI replica with [Map | Satellite] control, realistic street grid, bridges, landmarks,
 * transit roundels, route labels, and authentic red Google Maps pins.
 */

(function () {
  const MAP_PINS = [
    { id: 1, x: 31, y: 26, name: "Russell Square Node", area: "Central Tech Hub", type: "Web & SaaS Studio", projects: "120+ Web & App Deliveries", isHq: true },
    { id: 2, x: 22.5, y: 36.5, name: "The British Museum Sector", area: "Creative & Branding Lab", type: "Design Systems", projects: "45+ Brand Kits" },
    { id: 3, x: 15, y: 32.5, name: "Gower Street Node", area: "West End Tech", type: "Mobile Apps & PWAs", projects: "30+ Native Apps" },
    { id: 4, x: 8.5, y: 59, name: "Soho Creative District", area: "Media & AdTech Zone", type: "Google & Meta Ads", projects: "80+ Scaled Funnels" },
    { id: 5, x: 15, y: 53.5, name: "Liberty Quarter", area: "Enterprise Commerce", type: "High-Volume Stores", projects: "55+ Shopify & Custom Stores" },
    { id: 6, x: 24.5, y: 62.5, name: "Leicester Square Studio", area: "Entertainment Tech", type: "Web Applications", projects: "40+ SaaS MVPs" },
    { id: 7, x: 14.5, y: 68.5, name: "Trafalgar Square Center", area: "Digital Solutions", type: "Corporate Platforms", projects: "60+ Enterprise Portals" },
    { id: 8, x: 14.5, y: 80.5, name: "Pall Mall Corporate", area: "FinTech & Analytics", type: "Custom Business DB", projects: "35+ Financial Tools" },
    { id: 9, x: 1.5, y: 83.5, name: "The Green Park Node", area: "Innovation Lab", type: "Cloud Architecture", projects: "25+ Cloud Deployments" },
    { id: 10, x: 33.5, y: 60, name: "Covent Garden Hub", area: "Central Digital Center", type: "Full-Stack Development", projects: "90+ Web Platforms" },
    { id: 11, x: 41, y: 63.5, name: "The Savoy Riverfront", area: "Premium Branding", type: "Luxury Identity & UI", projects: "50+ Bespoke Designs" },
    { id: 12, x: 42.5, y: 38.5, name: "Sir John Soane's Zone", area: "Tech Corridor", type: "API & Backend Systems", projects: "65+ Microservices" },
    { id: 13, x: 53.5, y: 40.5, name: "Kingsway Tech Park", area: "SaaS Innovation Hub", type: "AI Integration & Workflows", projects: "40+ AI Tools" },
    { id: 14, x: 61, y: 15.5, name: "Clerkenwell Design Hub", area: "UX & Research", type: "Design Systems", projects: "70+ UI/UX Audits" },
    { id: 15, x: 65, y: 29, name: "Hatton Garden Outpost", area: "FinTech Hub", type: "Security & Payments", projects: "35+ Gateway Integrations" },
    { id: 16, x: 81.5, y: 32.5, name: "Barbican Centre Tech", area: "Arts & Tech Lab", type: "Interactive Web Experiences", projects: "45+ 3D/Canvas Apps" },
    { id: 17, x: 91.5, y: 36.5, name: "Golden Lane Estate", area: "Community Platforms", type: "Social & Community PWAs", projects: "28+ Web Portals" },
    { id: 18, x: 93, y: 9.5, name: "City Road Arterial Hub", area: "North Tech City", type: "High-Speed Websites", projects: "100+ 100% PageSpeed Sites" },
    { id: 19, x: 75.5, y: 52.5, name: "St. Paul's Cathedral District", area: "Metro Engineering Core", type: "Enterprise Systems", projects: "110+ Scaled Deployments" },
    { id: 20, x: 68.5, y: 61, name: "Blackfriars Bridge Station", area: "Transit Commerce", type: "Logistics Software", projects: "32+ Tracking Systems" },
    { id: 21, x: 54, y: 63, name: "Somerset House Node", area: "Creative Tech Hub", type: "Creative Frontends", projects: "60+ Tailwind & Next.js Apps" },
    { id: 22, x: 37.5, y: 77, name: "Waterloo Bridge Node", area: "Southbank Innovation", type: "Web & Mobile PWA", projects: "55+ Cross-Platform Apps" },
    { id: 23, x: 46, y: 88, name: "London Eye Tech Lab", area: "Tourism & Hospitality", type: "Booking & Booking Engines", projects: "45+ Custom Systems" },
    { id: 24, x: 52, y: 93, name: "Waterloo Main Terminus", area: "Digital Delivery Core", type: "Full Lifecycle Engineering", projects: "85+ Production Apps" },
    { id: 25, x: 73.5, y: 78.5, name: "Tate Modern Gallery Lab", area: "Southwark Digital Hub", type: "Interactive Portfolios", projects: "40+ Agency Showcases" },
    { id: 26, x: 93.5, y: 83.5, name: "Borough Market District", area: "FoodTech & Commerce", type: "E-Commerce Funnels", projects: "75+ Online Stores" },
    { id: 27, x: 87.5, y: 94, name: "Southwark Metro Outpost", area: "Digital Growth Hub", type: "SEO & Growth Engine", projects: "120+ #1 Rank Keywords" },
    { id: 28, x: 96.5, y: 64.5, name: "Monument & Tower Corridor", area: "Financial District", type: "Enterprise Security", projects: "50+ SOC-2 Compliant Tools" }
  ];

  class InteractiveCityMap {
    constructor(mountId = "world-map-mount") {
      this.container = document.getElementById(mountId);
      if (!this.container) return;

      this.mode = "map"; // "map" or "satellite"
      this.zoom = 1;
      this.panX = 0;
      this.panY = 0;
      this.isDragging = false;
      this.startX = 0;
      this.startY = 0;

      this.render();
      this.bindEvents();
    }

    render() {
      this.container.innerHTML = `
        <div class="interactive-map-container ${this.mode === 'satellite' ? 'satellite-mode' : 'map-mode'}">
          
          <!-- Authentic Floating Top-Left [ Map | Satellite ] Control -->
          <div class="gmap-floating-topbar">
            <div class="gmap-type-toggle">
              <button type="button" class="gmap-type-btn ${this.mode === 'map' ? 'active' : ''}" data-mode="map">
                Map
              </button>
              <button type="button" class="gmap-type-btn ${this.mode === 'satellite' ? 'active' : ''}" data-mode="satellite">
                Satellite
              </button>
            </div>

            <div class="gmap-status-pill">
              <span class="gmap-live-indicator"></span>
              <span><strong>Kolkata Studio HQ</strong> &bull; Nationwide Client Deliveries</span>
            </div>
          </div>

          <!-- Floating Map Zoom & Recenter Controls -->
          <div class="gmap-zoom-dock">
            <button type="button" class="gmap-dock-btn" id="map-zoom-in" title="Zoom In" aria-label="Zoom In">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M12 5v14M5 12h14"/></svg>
            </button>
            <div class="gmap-dock-divider"></div>
            <button type="button" class="gmap-dock-btn" id="map-zoom-out" title="Zoom Out" aria-label="Zoom Out">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M5 12h14"/></svg>
            </button>
            <div class="gmap-dock-divider"></div>
            <button type="button" class="gmap-dock-btn" id="map-recenter" title="Recenter View" aria-label="Recenter Map">
              <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            </button>
          </div>

          <!-- Map Stage Viewport -->
          <div class="map-stage-viewport" id="map-stage">
            <div class="map-canvas-layer" id="map-canvas-layer" style="transform: scale(${this.zoom}) translate(${this.panX}px, ${this.panY}px);">
              
              <!-- High-Fidelity Street Basemap Vector SVG (Matching Screenshot) -->
              <svg class="map-vector-base" viewBox="0 0 1200 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <!-- Minor Street Grid Pattern -->
                  <pattern id="street-grid-subtle" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#e1e4e8" stroke-width="0.8" class="grid-minor-line" />
                  </pattern>

                  <!-- Urban Block Diagonal Texture -->
                  <pattern id="city-blocks-fill" width="56" height="56" patternUnits="userSpaceOnUse">
                    <rect width="56" height="56" fill="#f8fafc" class="block-bg" />
                    <path d="M 0 14 L 56 14 M 0 42 L 56 42 M 14 0 L 14 56 M 42 0 L 42 56" fill="none" stroke="#e2e8f0" stroke-width="1.2" class="block-stroke" />
                  </pattern>

                  <!-- River Water Gradient -->
                  <linearGradient id="river-surface-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#cbd5e1" />
                    <stop offset="50%" stop-color="#bfdbfe" />
                    <stop offset="100%" stop-color="#cbd5e1" />
                  </linearGradient>

                  <!-- Park / Green Fill -->
                  <linearGradient id="park-soft-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#d1fae5" stop-opacity="0.85" />
                    <stop offset="100%" stop-color="#e2e8f0" stop-opacity="0.6" />
                  </linearGradient>
                </defs>

                <!-- Base Landmass Background -->
                <rect width="1200" height="800" fill="url(#city-blocks-fill)" />
                <rect width="1200" height="800" fill="url(#street-grid-subtle)" />

                <!-- Green Parks & Open Spaces (e.g. Green Park / Gardens) -->
                <g class="map-parks-group">
                  <path d="M 0 620 L 120 600 L 140 750 L 0 800 Z" fill="url(#park-soft-fill)" class="park-polygon" />
                  <path d="M 340 180 L 400 170 L 410 240 L 350 250 Z" fill="url(#park-soft-fill)" class="park-polygon" />
                  <path d="M 940 140 L 1020 130 L 1030 200 L 950 210 Z" fill="url(#park-soft-fill)" class="park-polygon" />
                </g>

                <!-- Minor & Intermediary City Streets -->
                <g class="map-minor-streets" stroke="#e2e8f0" stroke-width="2" fill="none">
                  <!-- North-South Grids -->
                  <line x1="80" y1="0" x2="160" y2="800" />
                  <line x1="220" y1="0" x2="300" y2="800" />
                  <line x1="360" y1="0" x2="440" y2="800" />
                  <line x1="500" y1="0" x2="580" y2="800" />
                  <line x1="640" y1="0" x2="720" y2="800" />
                  <line x1="780" y1="0" x2="860" y2="800" />
                  <line x1="920" y1="0" x2="1000" y2="800" />
                  <line x1="1060" y1="0" x2="1140" y2="800" />
                  
                  <!-- Diagonals & Cross Roads -->
                  <line x1="0" y1="200" x2="1200" y2="340" />
                  <line x1="0" y1="440" x2="1200" y2="580" />
                  <line x1="0" y1="100" x2="1200" y2="60" />
                  <line x1="200" y1="0" x2="600" y2="800" stroke-width="2.5" />
                  <line x1="800" y1="0" x2="400" y2="800" stroke-width="2.5" />
                  <line x1="100" y1="800" x2="900" y2="0" stroke-width="2.2" />
                </g>

                <!-- Major Arterial Thoroughfares (White with Gray Casings like Google Maps) -->
                <g class="map-arterials-casing" stroke="#cbd5e1" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M 0 110 Q 300 160 620 130 T 1200 80" />
                  <path d="M 0 260 C 250 220 500 320 850 240 L 1200 280" />
                  <path d="M 120 0 Q 200 350 160 800" />
                  <path d="M 420 0 Q 380 400 450 800" />
                  <path d="M 720 0 Q 750 360 820 800" />
                  <path d="M 1040 0 Q 1060 420 1020 800" />
                  <path d="M 60 700 L 1150 120" />
                  <path d="M 0 490 Q 350 420 700 480 T 1200 440" />
                </g>

                <g class="map-arterials-core" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M 0 110 Q 300 160 620 130 T 1200 80" />
                  <path d="M 0 260 C 250 220 500 320 850 240 L 1200 280" />
                  <path d="M 120 0 Q 200 350 160 800" />
                  <path d="M 420 0 Q 380 400 450 800" />
                  <path d="M 720 0 Q 750 360 820 800" />
                  <path d="M 1040 0 Q 1060 420 1020 800" />
                  <path d="M 60 700 L 1150 120" />
                  <path d="M 0 490 Q 350 420 700 480 T 1200 440" />
                </g>

                <!-- Curved River Waterway (Thames / River Estuary Curve) -->
                <path d="M 0 540 C 220 500, 380 720, 600 660 C 820 600, 1000 780, 1200 700 L 1200 800 L 0 800 Z" fill="url(#river-surface-grad)" class="river-body" />
                <path d="M 0 540 C 220 500, 380 720, 600 660 C 820 600, 1000 780, 1200 700" stroke="#94a3b8" stroke-width="3" fill="none" opacity="0.6" />

                <!-- River Bridges Crossing the Waterway -->
                <g class="map-bridges" stroke="#475569" stroke-width="6" fill="none" stroke-linecap="butt">
                  <!-- Waterloo Bridge -->
                  <line x1="440" y1="590" x2="470" y2="650" />
                  <!-- Blackfriars Bridge -->
                  <line x1="810" y1="620" x2="835" y2="690" />
                  <!-- Millennium Bridge -->
                  <line x1="880" y1="635" x2="900" y2="705" stroke-dasharray="2 3" stroke-width="3" />
                  <!-- London Bridge Corridor -->
                  <line x1="1110" y1="680" x2="1130" y2="750" />
                </g>

                <!-- Authentic Street / Road Shield Numbers (A40, A400, A201, etc.) -->
                <g class="map-route-shields" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="9" font-weight="700" fill="#475569">
                  <text x="75" y="105" transform="rotate(-15 75 105)">A40</text>
                  <text x="280" y="70">A400</text>
                  <text x="690" y="125">A201</text>
                  <text x="1115" y="95">A10</text>
                  <text x="560" y="320">A40</text>
                  <text x="110" y="420" transform="rotate(35 110 420)">A4</text>
                  <text x="430" y="690" transform="rotate(50 430 690)">A3211</text>
                  <text x="1040" y="770">A3</text>
                  <text x="1005" y="960">A2</text>
                </g>

                <!-- Historic District & Landmark Labels (Matching Screenshot) -->
                <g class="map-place-labels" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-size="10" font-weight="600" fill="#475569" text-anchor="middle">
                  
                  <!-- Russell Square & British Museum -->
                  <text x="370" y="195" font-weight="700">Russell Square</text>
                  <g transform="translate(330, 235)">
                    <rect x="0" y="0" width="14" height="10" fill="#334155" rx="1"/>
                    <line x1="2" y1="3" x2="2" y2="8" stroke="#ffffff" stroke-width="1.5"/>
                    <line x1="7" y1="3" x2="7" y2="8" stroke="#ffffff" stroke-width="1.5"/>
                    <line x1="12" y1="3" x2="12" y2="8" stroke="#ffffff" stroke-width="1.5"/>
                  </g>
                  <text x="337" y="260" font-weight="700">The British Museum</text>

                  <!-- Soho & Covent Garden -->
                  <text x="145" y="445" font-weight="800" font-size="12" letter-spacing="1">SOHO</text>
                  <text x="390" y="495" font-weight="800" font-size="11" letter-spacing="0.5">COVENT GARDEN</text>
                  <text x="195" y="555">Leicester Square</text>
                  <text x="175" y="650">Trafalgar Square</text>
                  <text x="470" y="550" font-size="9">The Savoy</text>

                  <!-- City of London & St. Paul's -->
                  <g transform="translate(895, 400)">
                    <path d="M7 0 L14 10 L0 10 Z" fill="#334155"/>
                    <rect x="2" y="10" width="10" height="6" fill="#334155"/>
                  </g>
                  <text x="902" y="435" font-weight="700">St. Paul's Cathedral</text>
                  <text x="965" y="180">Barbican Centre</text>
                  <text x="940" y="150" font-size="8">GOLDEN LANE ESTATE</text>
                  <text x="895" y="375" font-size="9">Central Criminal Court</text>
                  <text x="815" y="490" font-weight="700" letter-spacing="0.5">BLACKFRIARS</text>

                  <!-- South of River (Waterloo / Tate Modern / Borough) -->
                  <text x="590" y="710" font-weight="800" font-size="11" letter-spacing="0.5">WATERLOO</text>
                  <text x="880" y="615" font-size="9">Millennium Bridge</text>
                  <text x="870" y="650">Tate Modern</text>
                  <text x="1000" y="670">Borough Market</text>
                  <text x="490" y="780" font-size="9">London Eye</text>
                  <text x="35" y="695" font-size="9">The Green Park</text>

                  <!-- Red Subway Roundel Icons (⊝) -->
                  <g class="subway-roundels" transform="translate(0, 0)">
                    <circle cx="210" cy="530" r="4" fill="#dc2626" />
                    <rect x="207" y="528.5" width="6" height="3" fill="#1e40af" rx="0.5" />

                    <circle cx="430" cy="600" r="4" fill="#dc2626" />
                    <rect x="427" y="598.5" width="6" height="3" fill="#1e40af" rx="0.5" />

                    <circle cx="585" cy="765" r="4" fill="#dc2626" />
                    <rect x="582" y="763.5" width="6" height="3" fill="#1e40af" rx="0.5" />

                    <circle cx="995" cy="685" r="4" fill="#dc2626" />
                    <rect x="992" y="683.5" width="6" height="3" fill="#1e40af" rx="0.5" />
                  </g>
                </g>
              </svg>

              <!-- Dense Red Location Markers (Pixel-Matched to Screenshot) -->
              <div class="map-pins-overlay">
                ${MAP_PINS.map(pin => `
                  <div class="map-pin-marker ${pin.isHq ? 'is-hq-pin' : ''}" 
                       data-pin-id="${pin.id}" 
                       style="left: ${pin.x}%; top: ${pin.y}%;"
                       tabindex="0"
                       role="button"
                       aria-label="${pin.name}">
                    <div class="pin-icon-wrap">
                      <svg viewBox="0 0 24 34" class="pin-svg">
                        <defs>
                          <filter id="pin-shadow-${pin.id}" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-opacity="0.35"/>
                          </filter>
                        </defs>
                        <!-- Teardrop Marker Body -->
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 8.85 10.6 20.8 11.25 21.55a1 1 0 001.5 0C13.4 32.8 24 20.85 24 12 24 5.37 18.63 0 12 0z" 
                              class="pin-body" filter="url(#pin-shadow-${pin.id})" />
                        <!-- White Center Core Dot -->
                        <circle cx="12" cy="11.5" r="4.2" class="pin-center-dot" />
                      </svg>
                      <div class="pin-pulse-ring"></div>
                    </div>
                    ${pin.isHq ? '<span class="hq-pin-tag">HQ STUDIO</span>' : ''}
                  </div>
                `).join('')}
              </div>

              <!-- Interactive Popup Modal Card -->
              <div class="map-info-popup" id="map-popup" style="display: none;">
                <button type="button" class="popup-close-btn" id="popup-close" aria-label="Close Popup">&times;</button>
                <div class="popup-badge" id="popup-type">Engineering Studio</div>
                <h4 class="popup-title" id="popup-name">Russell Square Node</h4>
                <p class="popup-area" id="popup-area">Central Tech Hub &bull; Web &amp; SaaS Studio</p>
                <div class="popup-projects-stat">
                  <span class="stat-num" id="popup-projects">120+ Web &amp; App Deliveries</span>
                  <span class="stat-txt">Delivered with 100% Quality &amp; SLA Compliance</span>
                </div>
                <div class="popup-footer">
                  <a href="inquiry.html" class="btn btn-primary btn-sm btn-block">Start Project In This City →</a>
                </div>
              </div>

            </div>
          </div>

          <!-- Bottom Location Stats Summary Strip -->
          <div class="map-stats-strip">
            <div class="map-stat-item">
              <span class="map-stat-badge">KOLKATA HQ</span>
              <strong>Sector V / Salt Lake &bull; Primary Studio</strong>
            </div>
            <div class="map-stat-item">
              <span class="map-stat-badge">PAN-INDIA DELIVERY</span>
              <strong>Delhi, Mumbai, Bengaluru, Hyderabad, Pune, Chennai</strong>
            </div>
            <div class="map-stat-item">
              <span class="map-stat-badge">PROMO OFFER</span>
              <strong>Starting ₹599 (30% Discount Live)</strong>
            </div>
            <div class="map-stat-item">
              <a href="inquiry.html" class="btn btn-primary btn-sm">Build Your Product With Us →</a>
            </div>
          </div>
        </div>
      `;
    }

    bindEvents() {
      // 1. Mode Switcher (Map vs Satellite)
      const switcherBtns = this.container.querySelectorAll(".gmap-type-btn");
      const mapContainer = this.container.querySelector(".interactive-map-container");

      switcherBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          this.mode = btn.getAttribute("data-mode");
          if (this.mode === "satellite") {
            mapContainer.classList.add("satellite-mode");
            mapContainer.classList.remove("map-mode");
          } else {
            mapContainer.classList.add("map-mode");
            mapContainer.classList.remove("satellite-mode");
          }
          switcherBtns.forEach(b => b.classList.toggle("active", b === btn));
        });
      });

      // 2. Zoom Controls
      const zoomInBtn = document.getElementById("map-zoom-in");
      const zoomOutBtn = document.getElementById("map-zoom-out");
      const recenterBtn = document.getElementById("map-recenter");
      const canvasLayer = document.getElementById("map-canvas-layer");

      const updateTransform = () => {
        if (canvasLayer) {
          canvasLayer.style.transform = `scale(${this.zoom}) translate(${this.panX}px, ${this.panY}px)`;
        }
      };

      if (zoomInBtn) {
        zoomInBtn.addEventListener("click", () => {
          this.zoom = Math.min(2.0, this.zoom + 0.25);
          updateTransform();
        });
      }

      if (zoomOutBtn) {
        zoomOutBtn.addEventListener("click", () => {
          this.zoom = Math.max(0.75, this.zoom - 0.25);
          updateTransform();
        });
      }

      if (recenterBtn) {
        recenterBtn.addEventListener("click", () => {
          this.zoom = 1;
          this.panX = 0;
          this.panY = 0;
          updateTransform();
          this.hidePopup();
        });
      }

      // 3. Pan / Drag Events
      const stage = document.getElementById("map-stage");
      if (stage) {
        stage.addEventListener("mousedown", (e) => {
          if (e.target.closest(".map-pin-marker") || e.target.closest(".map-info-popup")) return;
          this.isDragging = true;
          this.startX = e.clientX - this.panX;
          this.startY = e.clientY - this.panY;
          stage.style.cursor = "grabbing";
        });

        window.addEventListener("mousemove", (e) => {
          if (!this.isDragging) return;
          this.panX = e.clientX - this.startX;
          this.panY = e.clientY - this.startY;
          updateTransform();
        });

        window.addEventListener("mouseup", () => {
          if (this.isDragging) {
            this.isDragging = false;
            if (stage) stage.style.cursor = "grab";
          }
        });
      }

      // 4. Pin Clicks & Popups
      const pins = this.container.querySelectorAll(".map-pin-marker");
      const popupClose = document.getElementById("popup-close");

      pins.forEach(pinEl => {
        pinEl.addEventListener("click", (e) => {
          e.stopPropagation();
          const pinId = parseInt(pinEl.getAttribute("data-pin-id"), 10);
          const pinData = MAP_PINS.find(p => p.id === pinId);
          if (pinData) this.showPopup(pinData, pinEl);
        });

        // Hover support
        pinEl.addEventListener("mouseenter", () => {
          const pinId = parseInt(pinEl.getAttribute("data-pin-id"), 10);
          const pinData = MAP_PINS.find(p => p.id === pinId);
          if (pinData && (!this.activePin || this.activePin.id !== pinId)) {
            this.showPopup(pinData, pinEl);
          }
        });
      });

      if (popupClose) {
        popupClose.addEventListener("click", (e) => {
          e.stopPropagation();
          this.hidePopup();
        });
      }

      if (stage) {
        stage.addEventListener("click", () => this.hidePopup());
      }
    }

    showPopup(pin, pinEl) {
      this.activePin = pin;
      const popup = document.getElementById("map-popup");
      if (!popup) return;

      document.getElementById("popup-name").textContent = pin.name;
      document.getElementById("popup-area").textContent = `${pin.area} • ${pin.type}`;
      document.getElementById("popup-type").textContent = pin.isHq ? "Main Studio HQ" : pin.type;
      document.getElementById("popup-projects").textContent = pin.projects;

      popup.style.display = "block";
      
      let leftPercent = pin.x;
      let topPercent = pin.y - 14;

      popup.style.left = `clamp(16px, ${leftPercent}%, calc(100% - 300px))`;
      popup.style.top = `clamp(16px, ${topPercent}%, calc(100% - 240px))`;
    }

    hidePopup() {
      this.activePin = null;
      const popup = document.getElementById("map-popup");
      if (popup) popup.style.display = "none";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    new InteractiveCityMap("world-map-mount");
  });

  window.initInteractiveCityMap = function () {
    new InteractiveCityMap("world-map-mount");
  };
})();
