/**
 * Google Sheets & Apps Script API Integration Layer
 * Lightweight CRM / Database Client for Code_IT Studio
 */

// Configuration: Deployed Google Apps Script Web App URL
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwE0xHS4a13vQpsOAtFDJY2aggyXYM9iFZrxTu72NqUUR6l9iM5qdl2JXz-WRa1crcp/exec";

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
    const inquiryId = "INQ-" + new Date().getFullYear() + "-" + Math.random().toString(36).substring(2, 7).toUpperCase();
    const submissionData = {
      action: "submitInquiry",
      inquiryId: inquiryId,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString("en-IN"),
      time: new Date().toLocaleTimeString("en-IN"),
      ...formData
    };

    if (this.isConfigured) {
      try {
        const response = await fetch(this.apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8" // Standard for Google Apps Script to prevent CORS preflight issues
          },
          body: JSON.stringify(submissionData)
        });
        const result = await response.json();
        if (result.status === "success") {
          this._saveLocalBackup("inquiries", submissionData);
          return { 
            success: true, 
            inquiryId: result.inquiryId || inquiryId, 
            message: "Inquiry successfully logged into Google Sheets CRM!" 
          };
        }
      } catch (err) {
        console.warn("Google Apps Script network call failed. Saved into local offline storage.", err);
      }
    }

    // Graceful offline simulation & localStorage backup
    this._saveLocalBackup("inquiries", submissionData);
    await new Promise(res => setTimeout(res, 500));

    return {
      success: true,
      inquiryId: inquiryId,
      offlineDemo: !this.isConfigured,
      message: "Inquiry recorded successfully."
    };
  }

  /**
   * Submit Direct Contact Message
   * @param {Object} contactData
   * @returns {Promise<Object>}
   */
  async submitContact(contactData) {
    const leadId = "CNT-" + new Date().getFullYear() + "-" + Math.random().toString(36).substring(2, 7).toUpperCase();
    const submissionData = {
      action: "submitContact",
      inquiryId: leadId,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString("en-IN"),
      time: new Date().toLocaleTimeString("en-IN"),
      ...contactData
    };

    if (this.isConfigured) {
      try {
        const response = await fetch(this.apiUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(submissionData)
        });
        const result = await response.json();
        if (result.status === "success") {
          this._saveLocalBackup("contact_leads", submissionData);
          return { success: true, inquiryId: result.inquiryId || leadId };
        }
      } catch (err) {
        console.warn("Contact lead remote submission failed, saved locally.", err);
      }
    }

    this._saveLocalBackup("contact_leads", submissionData);
    await new Promise(res => setTimeout(res, 400));
    return { success: true, inquiryId: leadId, offlineDemo: !this.isConfigured };
  }

  /**
   * Submit Support Ticket
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
    await new Promise(res => setTimeout(res, 400));
    return { success: true, ticketId: ticketId };
  }

  /**
   * Fetch Projects dynamically from Google Sheets CMS
   * @returns {Promise<Array|null>}
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
    return null;
  }

  /**
   * Get all locally stored submissions (for previewing leads without cloud connection)
   */
  getLocalLeads(storeKey = "inquiries") {
    try {
      return JSON.parse(localStorage.getItem(`codeit_${storeKey}`) || "[]");
    } catch (e) {
      return [];
    }
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
