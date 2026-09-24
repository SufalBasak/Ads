/**
 * Orbit & Technology Studio 3D Interactive Canvas Hero
 * Pure Canvas 3D Perspective Visualizer with Pointer Rotation, Orbital Nodes & Particles
 */

(function () {
  class TechOrbitCanvas {
    constructor(canvasId = "hero-3d-canvas") {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext("2d");

      this.rotX = 0.25;
      this.rotY = -0.4;
      this.targetRotX = 0.25;
      this.targetRotY = -0.4;
      this.isDragging = false;
      this.lastMouseX = 0;
      this.lastMouseY = 0;
      this.isAutoSpin = true;

      this.nodes = [];
      this.rings = [];
      this.particles = [];

      this.initScene();
      this.resize();
      this.bindEvents();
      this.animate();
    }

    initScene() {
      // 3D Globe Nodes (Web, Apps, SaaS, DB, Cloud, SEO, AI, Ads)
      const labels = [
        "Web Platforms", "Mobile Apps", "SaaS Cloud",
        "AI Features", "SEO & Growth", "Secure Auth",
        "Payment APIs", "Analytics UI", "Global CDN"
      ];

      const nodeCount = 18;
      const radius = 110;

      for (let i = 0; i < nodeCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / nodeCount);
        const theta = Math.sqrt(nodeCount * Math.PI) * phi;

        this.nodes.push({
          x: radius * Math.cos(theta) * Math.sin(phi),
          y: radius * Math.sin(theta) * Math.sin(phi),
          z: radius * Math.cos(phi),
          baseRadius: radius,
          size: (i % 3 === 0) ? 6 : 4,
          color: (i % 3 === 0) ? "#60a5fa" : (i % 2 === 0 ? "#38bdf8" : "#93c5fd"),
          label: labels[i % labels.length],
          hasLabel: (i % 2 === 0)
        });
      }

      // Orbital Rings
      this.rings = [
        { radius: 135, tiltX: 0.6, tiltZ: 0.3, speed: 0.008, angle: 0, color: "rgba(59, 130, 246, 0.4)" },
        { radius: 155, tiltX: -0.4, tiltZ: 0.8, speed: -0.006, angle: Math.PI / 2, color: "rgba(14, 165, 233, 0.3)" },
        { radius: 175, tiltX: 0.2, tiltZ: -0.5, speed: 0.005, angle: Math.PI / 4, color: "rgba(99, 102, 241, 0.3)" }
      ];

      // Ambient Floating Cyber Particles
      for (let i = 0; i < 45; i++) {
        this.particles.push({
          x: (Math.random() - 0.5) * 380,
          y: (Math.random() - 0.5) * 380,
          z: (Math.random() - 0.5) * 380,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.6 + 0.2
        });
      }
    }

    resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      this.width = rect.width;
      this.height = rect.height;

      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;

      this.ctx.scale(dpr, dpr);
    }

    bindEvents() {
      window.addEventListener("resize", () => this.resize());

      this.canvas.addEventListener("pointerdown", (e) => {
        this.isDragging = true;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
        this.canvas.setPointerCapture(e.pointerId);
      });

      this.canvas.addEventListener("pointermove", (e) => {
        if (!this.isDragging) return;
        const dx = e.clientX - this.lastMouseX;
        const dy = e.clientY - this.lastMouseY;
        this.targetRotY += dx * 0.008;
        this.targetRotX += dy * 0.008;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
      });

      const onEnd = () => {
        this.isDragging = false;
      };

      this.canvas.addEventListener("pointerup", onEnd);
      this.canvas.addEventListener("pointercancel", onEnd);
    }

    project(x, y, z) {
      // 3D rotation matrix
      const cosY = Math.cos(this.rotY), sinY = Math.sin(this.rotY);
      const cosX = Math.cos(this.rotX), sinX = Math.sin(this.rotX);

      // Y-axis rotation
      let x1 = x * cosY + z * sinY;
      let y1 = y;
      let z1 = -x * sinY + z * cosY;

      // X-axis rotation
      let x2 = x1;
      let y2 = y1 * cosX - z1 * sinX;
      let z2 = y1 * sinX + z1 * cosX;

      // Perspective projection
      const fov = 350;
      const scale = fov / (fov + z2);

      return {
        px: this.width / 2 + x2 * scale,
        py: this.height / 2 + y2 * scale,
        scale: scale,
        z: z2
      };
    }

    animate() {
      requestAnimationFrame(() => this.animate());

      // Smooth easing toward target rotation
      if (this.isAutoSpin && !this.isDragging) {
        this.targetRotY += 0.0035;
      }
      this.rotX += (this.targetRotX - this.rotX) * 0.08;
      this.rotY += (this.targetRotY - this.rotY) * 0.08;

      this.ctx.clearRect(0, 0, this.width, this.height);

      // Render Central Tech Glowing Core
      const centerProj = this.project(0, 0, 0);
      const gradient = this.ctx.createRadialGradient(
        centerProj.px, centerProj.py, 10,
        centerProj.px, centerProj.py, 130
      );
      gradient.addColorStop(0, "rgba(37, 99, 235, 0.45)");
      gradient.addColorStop(0.5, "rgba(2, 132, 199, 0.15)");
      gradient.addColorStop(1, "rgba(15, 23, 42, 0)");

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(centerProj.px, centerProj.py, 130, 0, Math.PI * 2);
      this.ctx.fill();

      // Render Orbital Rings
      this.rings.forEach(ring => {
        ring.angle += ring.speed;
        this.ctx.strokeStyle = ring.color;
        this.ctx.lineWidth = 1.2;
        this.ctx.beginPath();

        const segments = 48;
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          const rx = ring.radius * Math.cos(theta);
          const ry = ring.radius * Math.sin(theta) * ring.tiltX;
          const rz = ring.radius * Math.sin(theta) * ring.tiltZ;

          const pt = this.project(rx, ry, rz);
          if (i === 0) this.ctx.moveTo(pt.px, pt.py);
          else this.ctx.lineTo(pt.px, pt.py);
        }
        this.ctx.stroke();

        // Moving satellite packet on ring
        const satX = ring.radius * Math.cos(ring.angle);
        const satY = ring.radius * Math.sin(ring.angle) * ring.tiltX;
        const satZ = ring.radius * Math.sin(ring.angle) * ring.tiltZ;
        const satPt = this.project(satX, satY, satZ);

        this.ctx.fillStyle = "#38bdf8";
        this.ctx.beginPath();
        this.ctx.arc(satPt.px, satPt.py, 3.5 * satPt.scale, 0, Math.PI * 2);
        this.ctx.fill();
      });

      // Render Interconnecting Grid Lines between Nodes
      this.ctx.lineWidth = 0.8;
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const n1 = this.nodes[i];
          const n2 = this.nodes[j];
          const dx = n1.x - n2.x, dy = n1.y - n2.y, dz = n1.z - n2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 95) {
            const p1 = this.project(n1.x, n1.y, n1.z);
            const p2 = this.project(n2.x, n2.y, n2.z);

            const alpha = (1 - dist / 95) * 0.35 * Math.min(p1.scale, p2.scale);
            this.ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
            this.ctx.beginPath();
            this.ctx.moveTo(p1.px, p1.py);
            this.ctx.lineTo(p2.px, p2.py);
            this.ctx.stroke();
          }
        }
      }

      // Render Nodes & Tech Labels
      const sortedNodes = [...this.nodes].map(n => {
        const proj = this.project(n.x, n.y, n.z);
        return { ...n, proj };
      }).sort((a, b) => b.proj.z - a.proj.z);

      sortedNodes.forEach(node => {
        const { px, py, scale, z } = node.proj;
        if (scale <= 0) return;

        // Node Glow
        this.ctx.fillStyle = node.color;
        this.ctx.beginPath();
        this.ctx.arc(px, py, node.size * scale, 0, Math.PI * 2);
        this.ctx.fill();

        // Node Core
        this.ctx.fillStyle = "#ffffff";
        this.ctx.beginPath();
        this.ctx.arc(px, py, (node.size * 0.45) * scale, 0, Math.PI * 2);
        this.ctx.fill();

        // Render Front-facing Labels
        if (node.hasLabel && z < 20) {
          this.ctx.font = `600 ${Math.max(9, Math.round(11 * scale))}px 'JetBrains Mono', monospace`;
          this.ctx.fillStyle = "rgba(224, 242, 254, 0.9)";
          this.ctx.fillText(node.label, px + 8 * scale, py + 4 * scale);
        }
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    new TechOrbitCanvas("hero-3d-canvas");
  });
})();
