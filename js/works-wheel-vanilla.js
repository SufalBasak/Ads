/**
 * WorksWheel - 3D Mathematical Cylinder & Ring Portfolio Carousel Engine
 * Pure Vanilla JavaScript implementation of the CrafterUI WorksWheel
 */

(function () {
  const CARD_H = 0.38;
  const CARD_MAX_W = 0.34;
  const CARD_RATIO = 1.45;
  const STEP = 40;
  const DRUM = 2.22;
  const LENS = 2.7;
  const RING_R = 1.14;
  const BOW = 1.82;
  const CULL = 1.6;

  const WHEEL_UNITS = 900;
  const DRAG_UNITS = 420;
  const SETTLE = 140;
  const EASE = 0.12;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rad = (deg) => (deg * Math.PI) / 180;
  const bowAt = (drumDeg, bow) => -bow * (1 - Math.cos(rad(drumDeg)));

  function place(ringDeg, drumDeg, ringR, drumR, bow, m) {
    return (
      `translateX(${m * bowAt(drumDeg, bow)}px)` +
      ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
      ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
    );
  }

  class WorksWheelEngine {
    constructor(containerEl, items = []) {
      this.container = containerEl;
      this.items = items;
      if (!this.container || this.items.length === 0) return;

      this.turn = 0;
      this.target = 0;
      this.active = 0;
      this.stage = { w: 0, h: 0 };
      this.dragY = null;
      this.settlingTimer = null;
      this.animFrame = null;
      this.cardNodes = [];

      this.initDOM();
      this.updateStage();
      this.bindEvents();
      this.startLoop();
    }

    initDOM() {
      this.container.innerHTML = `
        <div class="wheel-stage" tabindex="0" role="listbox" aria-label="Works Wheel">
          <div class="wheel-drum-container"></div>
        </div>
        <div class="wheel-label-center">Works '26</div>
        <div class="wheel-title-overlay"></div>
        <ol class="wheel-index-nav"></ol>
      `;

      this.stageEl = this.container.querySelector(".wheel-stage");
      this.drumEl = this.container.querySelector(".wheel-drum-container");
      this.labelEl = this.container.querySelector(".wheel-label-center");
      this.titleEl = this.container.querySelector(".wheel-title-overlay");
      this.indexNavEl = this.container.querySelector(".wheel-index-nav");

      // Generate card DOM
      this.items.forEach((item, index) => {
        const cardNode = document.createElement("a");
        cardNode.className = "wheel-card-node";
        cardNode.href = item.href || `project.html?id=${item.id || ""}`;
        cardNode.setAttribute("role", "option");
        cardNode.setAttribute("aria-label", item.title);
        cardNode.innerHTML = `
          <span class="wheel-card-inner">
            <img src="${item.image}" alt="${item.title}" class="wheel-card-img" draggable="false" />
            <span class="wheel-card-tag">View Project ↗</span>
          </span>
        `;
        this.drumEl.appendChild(cardNode);
        this.cardNodes.push(cardNode);

        // Navigation button
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "wheel-index-btn" + (index === 0 ? " active" : "");
        btn.textContent = item.title;
        btn.addEventListener("click", () => this.goTo(index + 1));
        li.appendChild(btn);
        this.indexNavEl.appendChild(li);
      });
    }

    updateStage() {
      this.stage = {
        w: this.stageEl.clientWidth || 800,
        h: this.stageEl.clientHeight || 500
      };

      const { w, h } = this.stage;
      const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
      const cardH = cardW / CARD_RATIO;
      const drumR = cardH * DRUM;
      const ringR = cardH * RING_R;
      const count = this.items.length;
      const ringScale = count
        ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
        : 1;

      this.metrics = {
        cardW,
        cardH,
        ringR,
        ringScale,
        drumR,
        bow: cardH * BOW,
        depth: cardH * LENS
      };

      this.stageEl.style.perspective = `${this.metrics.depth}px`;

      // Apply initial card sizes
      this.cardNodes.forEach(card => {
        card.style.width = `${cardW}px`;
        card.style.height = `${cardH}px`;
        card.style.marginLeft = `${-cardW / 2}px`;
        card.style.marginTop = `${-cardH / 2}px`;
      });
    }

    bindEvents() {
      const onResize = () => this.updateStage();
      window.addEventListener("resize", onResize);

      // Wheel gesture
      this.stageEl.addEventListener("wheel", (e) => {
        const next = this.target + e.deltaY / WHEEL_UNITS;
        const last = Math.max(this.items.length - 1, 0);
        if (next > 0 && next < last + 1) {
          e.preventDefault();
        }
        this.goTo(next);

        clearTimeout(this.settlingTimer);
        this.settlingTimer = setTimeout(() => {
          this.goTo(Math.round(this.target));
        }, SETTLE);
      }, { passive: false });

      // Pointer drag
      this.stageEl.addEventListener("pointerdown", (e) => {
        this.dragY = e.clientY;
        this.stageEl.setPointerCapture(e.pointerId);
      });

      this.stageEl.addEventListener("pointermove", (e) => {
        if (this.dragY === null) return;
        this.goTo(this.target + (this.dragY - e.clientY) / DRAG_UNITS);
        this.dragY = e.clientY;
      });

      const onPointerEnd = () => {
        this.dragY = null;
        if (this.target > 1) {
          this.goTo(Math.round(this.target));
        }
      };

      this.stageEl.addEventListener("pointerup", onPointerEnd);
      this.stageEl.addEventListener("pointercancel", onPointerEnd);

      // Keyboard navigation
      this.stageEl.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          this.goTo(Math.round(this.target) + 1);
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          this.goTo(Math.round(this.target) - 1);
        }
      });
    }

    goTo(next) {
      const last = Math.max(this.items.length - 1, 0);
      this.target = clamp(next, 0, last + 1);
    }

    startLoop() {
      const draw = () => {
        this.animFrame = requestAnimationFrame(draw);
        if (!this.stage.h) return;

        const gap = this.target - this.turn;
        if (Math.abs(gap) < 0.0005) {
          this.turn = this.target;
        } else {
          this.turn += gap * EASE;
        }

        const t = this.turn;
        const m = clamp(t, 0, 1);
        const pos = Math.max(0, t - 1);
        const { ringR, ringScale, drumR, bow } = this.metrics;
        const count = this.items.length;
        const last = Math.max(count - 1, 0);

        if (this.drumEl) {
          this.drumEl.style.transform = `translateZ(${-m * drumR}px)`;
        }

        for (let i = 0; i < count; i++) {
          const d = i - pos;
          const drumDeg = d * STEP;
          const card = this.cardNodes[i];
          if (card) {
            card.style.transform = place(
              d * (360 / count),
              drumDeg,
              ringR,
              drumR,
              bow,
              m
            );
            card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
            card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
            const face = card.querySelector(".wheel-card-inner");
            if (face) {
              face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
            }
          }
        }

        if (this.labelEl) this.labelEl.style.opacity = String(1 - m);
        if (this.titleEl) this.titleEl.style.opacity = String(m);

        const near = clamp(Math.round(pos), 0, last);
        if (this.active !== near) {
          this.active = near;
          if (this.titleEl && this.items[near]) {
            this.titleEl.textContent = this.items[near].title;
          }
          // Update nav items
          const navBtns = this.indexNavEl.querySelectorAll(".wheel-index-btn");
          navBtns.forEach((btn, idx) => {
            btn.classList.toggle("active", idx === near);
          });
        }
      };

      this.animFrame = requestAnimationFrame(draw);
    }
  }

  // Default works dataset
  const DEFAULT_WORKS = [
    { title: "Nexus SaaS Flow", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", href: "project.html?id=nexus-saas" },
    { title: "FinPulse Mobile", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80", href: "project.html?id=fintech-pulse" },
    { title: "Aurora Design Kit", image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80", href: "project.html?id=aurora-studio-brand" },
    { title: "HyperGrowth Ads", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", href: "project.html?id=hypergrowth-ads-seo" },
    { title: "EduSphere Portal", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80", href: "project.html?id=edutech-academy" },
    { title: "OmniBiz Enterprise", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80", href: "project.html?id=omnibiz-erp" }
  ];

  window.initWorksWheel = function (selector = "#works-wheel-container", customItems = DEFAULT_WORKS) {
    const el = document.querySelector(selector);
    if (el) {
      new WorksWheelEngine(el, customItems);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    window.initWorksWheel();
  });
})();
