/**
 * Pricing Engine & 30% Discount Calculator
 */

/**
 * Reusable Discount Calculation Function
 * @param {number} price 
 * @param {number} discountPercent 
 * @returns {number} discounted price
 */
function calculateDiscount(price, discountPercent = 30) {
  if (!price || isNaN(price)) return 0;
  return Math.round(price - (price * discountPercent / 100));
}

/**
 * Calculate original price given the discounted price
 * @param {number} discountedPrice 
 * @param {number} discountPercent 
 * @returns {number}
 */
function calculateOriginalPrice(discountedPrice, discountPercent = 30) {
  if (!discountedPrice || isNaN(discountedPrice)) return 0;
  return Math.round(discountedPrice / (1 - (discountPercent / 100)));
}

// Package Definitions
const PRICING_PACKAGES = {
  starter: {
    id: "starter",
    name: "Starter",
    startingPrice: 599,
    originalPrice: 855,
    discount: 30,
    serviceType: "Website",
    servicesRequired: ["Web Development", "UI/UX Design"],
    badge: "30% OFF",
    suitableFor: "Personal websites, Landing pages, Simple business pages",
    features: [
      "Responsive design (Mobile, Tablet, Desktop)",
      "Modern clean UI & Typography",
      "Basic contact & inquiry form",
      "Basic SEO setup & meta tags",
      "Fast page load optimization",
      "1-Week Delivery timeline"
    ]
  },
  business: {
    id: "business",
    name: "Business",
    startingPrice: 2999,
    originalPrice: 4285,
    discount: 30,
    serviceType: "Business Websites",
    servicesRequired: ["Web Development", "UI/UX Design", "SEO"],
    badge: "MOST POPULAR",
    suitableFor: "Small businesses, Professional service firms, Portfolios",
    features: [
      "Multi-page website (Up to 5–7 pages)",
      "High-converting Responsive UI",
      "Interactive inquiry & WhatsApp integration",
      "Comprehensive On-Page SEO setup",
      "Google Analytics & Search Console",
      "Performance optimization (90+ score)"
    ]
  },
  webapp: {
    id: "webapp",
    name: "Web Application",
    startingPrice: 7999,
    originalPrice: 11427,
    discount: 30,
    serviceType: "Web Application",
    servicesRequired: ["Web Development", "App Development", "UI/UX Design"],
    badge: "30% OFF",
    suitableFor: "Startups, SaaS MVPs, Portals, Internal business tools",
    features: [
      "Custom application UI/UX architecture",
      "User Authentication & Roles",
      "Responsive interactive dashboard",
      "Database integration & API layer",
      "Payment gateway integration ready",
      "Cloud deployment & setup support"
    ]
  },
  custom: {
    id: "custom",
    name: "Custom Product",
    startingPrice: 0,
    originalPrice: 0,
    discount: 30,
    serviceType: "SaaS Product",
    servicesRequired: ["Web Development", "App Development", "Branding", "SEO"],
    badge: "ENTERPRISE",
    suitableFor: "SaaS products, Complex platforms, Education platforms, Custom software",
    features: [
      "Custom scalable system architecture",
      "Full stack development & admin panel",
      "Custom DB, REST/GraphQL APIs & AI integrations",
      "Automated email & notification triggers",
      "Full security auditing & CI/CD deployment",
      "Dedicated maintenance & SLA options"
    ]
  }
};

/**
 * Handle Pricing Card CTA click
 * Pre-populates inquiry.html URL parameters
 */
function selectPackage(packageId) {
  const pkg = PRICING_PACKAGES[packageId];
  if (!pkg) {
    window.location.href = "inquiry.html";
    return;
  }

  const params = new URLSearchParams({
    package: pkg.name,
    projectType: pkg.serviceType,
    services: pkg.servicesRequired.join(","),
    price: pkg.startingPrice ? `₹${pkg.startingPrice.toLocaleString("en-IN")}` : "Custom"
  });

  window.location.href = `inquiry.html?${params.toString()}`;
}

/**
 * Interactive Discount Calculator on pricing page
 */
function initPricingCalculator() {
  const calcSelect = document.getElementById("calc-package-select");
  const calcCustomInput = document.getElementById("calc-custom-amount");
  const calcOriginalEl = document.getElementById("calc-original-val");
  const calcOfferEl = document.getElementById("calc-offer-val");
  const calcSavedEl = document.getElementById("calc-saved-val");

  if (!calcSelect || !calcOfferEl) return;

  function updateCalculation() {
    let basePrice = 0;
    const selected = calcSelect.value;

    if (selected === "custom") {
      if (calcCustomInput) {
        calcCustomInput.style.display = "block";
        basePrice = parseFloat(calcCustomInput.value) || 10000;
      }
    } else {
      if (calcCustomInput) calcCustomInput.style.display = "none";
      const pkg = PRICING_PACKAGES[selected];
      basePrice = pkg ? pkg.originalPrice : 10000;
    }

    const discountRate = 30;
    const offerPrice = calculateDiscount(basePrice, discountRate);
    const savedAmount = basePrice - offerPrice;

    if (calcOriginalEl) calcOriginalEl.textContent = `Original: ₹${Math.round(basePrice).toLocaleString("en-IN")}`;
    calcOfferEl.textContent = `₹${offerPrice.toLocaleString("en-IN")}`;
    if (calcSavedEl) calcSavedEl.textContent = `Save ₹${savedAmount.toLocaleString("en-IN")} (30% OFF)`;
  }

  calcSelect.addEventListener("change", updateCalculation);
  if (calcCustomInput) calcCustomInput.addEventListener("input", updateCalculation);

  // Initialize with starter
  updateCalculation();
}

document.addEventListener("DOMContentLoaded", () => {
  initPricingCalculator();
});
