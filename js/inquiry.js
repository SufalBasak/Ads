/**
 * Multi-Section Project Inquiry Controller
 * Connects Frontend Form, Dynamic Live Summary & Google Sheets Integration
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("project-inquiry-form");
  if (!form) return;

  const projectTypeSelect = document.getElementById("inquiry-project-type");
  const budgetSelect = document.getElementById("inquiry-budget");
  const timelineSelect = document.getElementById("inquiry-timeline");
  const descriptionTextarea = document.getElementById("inquiry-description");
  const servicePills = document.querySelectorAll("input[name='services']");
  const checklistBoxes = document.querySelectorAll("input[name='requirements']");

  // Live Summary Elements
  const summaryTypeEl = document.getElementById("summary-project-type");
  const summaryServicesEl = document.getElementById("summary-services");
  const summaryBudgetEl = document.getElementById("summary-budget");
  const summaryTimelineEl = document.getElementById("summary-timeline");

  // Success Modal Elements
  const modalBackdrop = document.getElementById("success-modal");
  const modalInquiryIdEl = document.getElementById("modal-inquiry-id");
  const submitBtn = document.getElementById("inquiry-submit-btn");

  /**
   * Pre-populate form based on URL parameters (from Pricing or Services pages)
   */
  function parseUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const selectedPackage = params.get("package");
    const projectType = params.get("projectType");
    const services = params.get("services");

    if (projectType && projectTypeSelect) {
      for (let option of projectTypeSelect.options) {
        if (option.value.toLowerCase() === projectType.toLowerCase() || option.text.toLowerCase().includes(projectType.toLowerCase())) {
          projectTypeSelect.value = option.value;
          break;
        }
      }
    }

    if (services) {
      const servicesList = services.split(",").map(s => s.trim().toLowerCase());
      servicePills.forEach(pill => {
        if (servicesList.includes(pill.value.toLowerCase())) {
          pill.checked = true;
          pill.closest(".pill-checkbox-label")?.classList.add("selected");
        }
      });
    }

    if (selectedPackage) {
      const packageBadge = document.getElementById("selected-package-badge");
      if (packageBadge) {
        packageBadge.textContent = `Selected Package: ${selectedPackage} (30% OFF applied)`;
        packageBadge.style.display = "inline-block";
      }
    }

    updateLiveSummary();
  }

  /**
   * Update Live Inquiry Summary Card
   */
  function updateLiveSummary() {
    if (summaryTypeEl && projectTypeSelect) {
      summaryTypeEl.textContent = projectTypeSelect.value || "Custom Project";
    }

    if (summaryServicesEl) {
      const checkedServices = Array.from(servicePills)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      summaryServicesEl.textContent = checkedServices.length > 0 ? checkedServices.join(" + ") : "Development";
    }

    if (summaryBudgetEl && budgetSelect) {
      summaryBudgetEl.textContent = budgetSelect.value || "₹5,000 – ₹10,000";
    }

    if (summaryTimelineEl && timelineSelect) {
      summaryTimelineEl.textContent = timelineSelect.value || "2–4 Weeks";
    }
  }

  // Bind change events for live summary
  if (projectTypeSelect) projectTypeSelect.addEventListener("change", updateLiveSummary);
  if (budgetSelect) budgetSelect.addEventListener("change", updateLiveSummary);
  if (timelineSelect) timelineSelect.addEventListener("change", updateLiveSummary);

  servicePills.forEach(pill => {
    pill.addEventListener("change", (e) => {
      const label = e.target.closest(".pill-checkbox-label");
      if (label) {
        label.classList.toggle("selected", e.target.checked);
      }
      updateLiveSummary();
    });
  });

  // Handle Form Submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullNameInput = document.getElementById("inquiry-name");
    const emailInput = document.getElementById("inquiry-email");
    const phoneInput = document.getElementById("inquiry-phone");
    const companyInput = document.getElementById("inquiry-company");
    const referenceUrlInput = document.getElementById("inquiry-reference");

    // Basic Validation
    if (!fullNameInput.value.trim() || !emailInput.value.trim()) {
      alert("Please fill in your Full Name and Email Address.");
      return;
    }

    const selectedServices = Array.from(servicePills)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    const selectedRequirements = Array.from(checklistBoxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    const params = new URLSearchParams(window.location.search);
    const selectedPackage = params.get("package") || "Custom";

    const payload = {
      fullName: fullNameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput ? phoneInput.value.trim() : "",
      company: companyInput ? companyInput.value.trim() : "",
      projectType: projectTypeSelect ? projectTypeSelect.value : "Website",
      services: selectedServices,
      description: descriptionTextarea ? descriptionTextarea.value.trim() : "",
      budget: budgetSelect ? budgetSelect.value : "₹5,000 – ₹10,000",
      timeline: timelineSelect ? timelineSelect.value : "2–4 Weeks",
      referenceUrl: referenceUrlInput ? referenceUrlInput.value.trim() : "",
      requirements: selectedRequirements,
      selectedPackage: selectedPackage,
      originalPrice: params.get("price") || "",
      discount: "30% OFF",
      finalPrice: params.get("price") || ""
    };

    // UI Loading State
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner"></span> Saving to Google Sheets...`;
    }

    try {
      const response = await window.sheetsAPI.submitInquiry(payload);

      if (response.success) {
        if (modalInquiryIdEl) modalInquiryIdEl.textContent = `Inquiry ID: ${response.inquiryId}`;
        if (modalBackdrop) modalBackdrop.classList.add("active");
        form.reset();
        updateLiveSummary();
      } else {
        alert("Failed to record inquiry. Please try again or contact us directly.");
      }
    } catch (err) {
      console.error("Submission error", err);
      alert("An error occurred during submission. Please try again.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Submit Project Inquiry <span>→</span>`;
      }
    }
  });

  parseUrlParameters();
});

function closeSuccessModal() {
  const modal = document.getElementById("success-modal");
  if (modal) modal.classList.remove("active");
}
