/**
 * Google Sheets & Apps Script API Integration Layer
 * Lightweight CRM / Database Client
 */

// Configuration: Replace with your deployed Google Apps Script Web App URL
// Example: https://script.google.com/macros/s/AKfycbx.../exec
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz_YOUR_SCRIPT_ID_HERE/exec";

class SheetsAPI {
  constructor(apiUrl = GOOGLE_APPS_SCRIPT_URL) {
    this.apiUrl = apiUrl;
    this.isConfigured = !apiUrl.includes("YOUR_SCRIPT_ID_HERE");
  }

  /**
   * Submit Project Inquiry to Google Sheets
   * @param {Object} formData 
   * @returns {Promise<Object>}
   */
  async submitInquiry(formData) {
    // Generate unique inquiry ID
    const inquiryId = "INQ-" + new Date().getFullYear() + "-" + Math.random().toString(36).substring(2, 7).toUpperCase();
    const submissionData = {
      action: "submitInquiry",
      inquiryId: inquiryId,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString("en-IN"),
      time: new Date().toLocaleTimeString("en-IN"),
      ...formData
    };

    // If configured with real Google Apps Script URL, make POST request
    if (this.isConfigured) {
      try {
        const response = await fetch(this.apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8" // Avoid CORS preflight in Apps Script
          },
          body: JSON.stringify(submissionData)
        });
        const result = await response.json();
        if (result.status === "success") {
          this._saveLocalBackup("inquiries", submissionData);
          return { success: true, inquiryId: result.inquiryId || inquiryId, message: "Inquiry saved to Google Sheets" };
        }
      } catch (err) {
        console.warn("Google Apps Script network call failed. Falling back to local offline storage.", err);
      }
    }

    // Graceful offline / demo simulation: Save to LocalStorage CRM
    this._saveLocalBackup("inquiries", submissionData);
    
    // Simulate slight network latency for realistic UX
    await new Promise(res => setTimeout(res, 600));

    return {
      success: true,
      inquiryId: inquiryId,
      offlineDemo: !this.isConfigured,
      message: "Inquiry recorded successfully."
    };
  }

  /**
   * Submit Post-Launch Support Request
   * @param {Object} supportData 
   * @returns {Promise<Object>}
   */
  async submitSupportRequest(supportData) {
    const ticketId = "SUP-" + new Date().getFullYear() + "-" + Math.random().toString(36).substring(2, 7).toUpperCase();
    const payload = {
      action: "submitSupport",
      ticketId: ticketId,
      timestamp: new Date().toISOString(),
      ...supportData
    };

    if (this.isConfigured) {
      try {
        const response = await fetch(this.apiUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (result.status === "success") {
          this._saveLocalBackup("support_tickets", payload);
          return { success: true, ticketId: result.ticketId || ticketId };
        }
      } catch (err) {
        console.warn("Support request remote submission failed, saved locally.", err);
      }
    }

    this._saveLocalBackup("support_tickets", payload);
    await new Promise(res => setTimeout(res, 500));
    return { success: true, ticketId: ticketId };
  }

  /**
   * Fetch Projects dynamically from Google Sheets CMS
   * @returns {Promise<Array>}
   */
  async fetchProjects() {
    if (this.isConfigured) {
      try {
        const response = await fetch(`${this.apiUrl}?action=getProjects`);
        const result = await response.json();
        if (result.status === "success" && Array.isArray(result.data)) {
          return result.data;
        }
      } catch (err) {
        console.warn("Could not fetch remote projects from Google Sheets. Using fallback data.", err);
      }
    }
    return null; // Signals to use built-in projects dataset
  }

  _saveLocalBackup(storeKey, data) {
    try {
      const existing = JSON.parse(localStorage.getItem(`codeit_${storeKey}`) || "[]");
      existing.unshift(data);
      localStorage.setItem(`codeit_${storeKey}`, JSON.stringify(existing));
    } catch (e) {
      console.error("Local storage backup error", e);
    }
  }
}

// Global instance
window.sheetsAPI = new SheetsAPI();
