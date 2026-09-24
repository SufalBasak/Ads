/**
 * Accessible Real-time Form Validation
 */

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  if (!phone) return true; // optional in some forms
  const cleaned = phone.replace(/[\s\-\+\(\)]/g, "");
  return cleaned.length >= 7 && cleaned.length <= 15;
}

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input[required], textarea[required], select[required]");
  
  inputs.forEach(input => {
    input.addEventListener("blur", () => {
      if (!input.value.trim()) {
        input.style.borderColor = "var(--color-error)";
      } else {
        if (input.type === "email" && !validateEmail(input.value)) {
          input.style.borderColor = "var(--color-error)";
        } else {
          input.style.borderColor = "var(--color-border)";
        }
      }
    });

    input.addEventListener("input", () => {
      if (input.value.trim()) {
        input.style.borderColor = "var(--color-border)";
      }
    });
  });
});
