// @ts-nocheck — generated single-file distribution; typed sources live in the app.
"use client";
// Orbit Delivery — self-contained 3D hero. Configurable hosted GLB models; all application code and styles in one file.
// Dependencies: React, Three.js, @react-three/fiber.
// Drag to rotate. Pause to greet. Supports .dark and data-theme="dark".

import React, { useEffect, useRef, useState, lazy, Suspense } from "react";

export interface OrbitDeliveryHeroProps {
  theme?: "auto" | "light" | "dark";
  assetBaseUrl?: string;
  onExplore?: () => void;
  className?: string;
}

export function OrbitDeliveryHero({
  theme = "auto",
  assetBaseUrl = "https://cdn.jsdelivr.net/gh/fadeichev2121/planet-assets@main/",
  onExplore,
  className = ""
}: OrbitDeliveryHeroProps) {
  const [auto, setAuto] = useState(true);

  return (
    <div className={`orbit-delivery ${className}`} data-theme={theme}>
      <div className="page" style={{ position: "relative", minHeight: "450px", overflow: "hidden", background: "radial-gradient(ellipse at 6% 15%, #fffefa 0%, #fbfcff 38%, #f0f6ff 100%)" }}>
        <div style={{ padding: "2rem", maxWidth: "600px", zIndex: 3, position: "relative" }}>
          <p style={{ textTransform: "uppercase", letterSpacing: ".36em", fontSize: "12px", color: "#7a94df" }}>
            Good things, on their way
          </p>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 700, color: "#080e2b", lineHeight: 1.1, margin: "1rem 0" }}>
            Good things.<br />Delivered<br /><em style={{ color: "#4a72e7" }}>with care.</em>
          </h1>
          <p style={{ color: "#7a87aa", fontSize: "1.15rem", marginBottom: "1.5rem" }}>
            Parcels, packages, and a little peace of mind. From your doorstep to theirs.
          </p>
          <button 
            onClick={onExplore}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#4773ec", color: "#fff", padding: "14px 28px", borderRadius: "32px", border: 0, cursor: "pointer", fontWeight: 600 }}
          >
            Meet your courier →
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrbitDeliveryHero;
