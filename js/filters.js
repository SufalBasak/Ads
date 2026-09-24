/**
 * Search & Filter Handlers for Projects and Services
 */

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("project-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll(".project-card");

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isActive = item.classList.contains("active");

      // Close other items
      document.querySelectorAll(".faq-item").forEach(el => el.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});
