/**
 * ============================================================================
 * CODE_IT STUDIO - GOOGLE APPS SCRIPT BACKEND (CRM & SPREADSHEET SYNC)
 * ============================================================================
 * 
 * This script connects your website forms directly to Google Sheets & Excel.
 * When a user submits any form on your website:
 * 1. It adds a new formatted row in your Google Sheet in real-time.
 * 2. It optionally sends an instant email alert to your Gmail.
 * 3. It returns a confirmed Inquiry ID (e.g. INQ-2026-X8K2P) to the user.
 * 
 * ----------------------------------------------------------------------------
 * EASY 5-STEP SETUP INSTRUCTIONS:
 * ----------------------------------------------------------------------------
 * 1. Open Google Sheets (https://sheets.new) -> Create a new Sheet.
 * 2. Name your Sheet (e.g. "Code_IT Studio Leads CRM").
 * 3. In the top menu, click: Extensions > Apps Script.
 * 4. Erase everything inside Code.gs and paste ALL the code below.
 * 5. (Optional) Set NOTIFICATION_EMAIL below to your email to get instant alerts.
 * 6. In the top right, click: Deploy > New deployment.
 *    - Click the Gear icon ⚙️ next to "Select type" and choose "Web app".
 *    - Description: "Website CRM API"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (allows website visitors to submit forms)
 *    - Click "Deploy", authorize permissions when prompted.
 * 7. Copy the "Web app URL" (looks like https://script.google.com/macros/s/.../exec).
 * 8. Open `js/sheets-api.js` in this project and paste your URL on Line 8.
 * ============================================================================
 */

// CONFIGURATION: Set your notification email to receive new lead alerts
const NOTIFICATION_EMAIL = ""; // e.g. "yourname@gmail.com" (leave blank to disable email alerts)

const SHEET_INQUIRIES = "Project Inquiries";
const SHEET_CONTACT = "Direct Contact Leads";
const SHEET_SUPPORT = "Support Tickets";
const SHEET_PROJECTS = "Projects CMS";

/**
 * Handle HTTP POST requests from website forms
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ status: "error", message: "No data received" });
    }

    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.action === "submitInquiry" || !data.action) {
      return handleInquirySubmission(ss, data);
    } else if (data.action === "submitContact") {
      return handleContactSubmission(ss, data);
    } else if (data.action === "submitSupport") {
      return handleSupportSubmission(ss, data);
    } else {
      return jsonResponse({ status: "error", message: "Unrecognized action: " + data.action });
    }
  } catch (err) {
    return jsonResponse({ status: "error", message: err.toString() });
  }
}

/**
 * Handle HTTP GET requests (Health check and Project CMS)
 */
function doGet(e) {
  try {
    const action = e && e.parameter ? e.parameter.action : "";
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === "getProjects") {
      return getProjectsFromSheet(ss);
    }

    return jsonResponse({
      status: "success",
      message: "Code_IT Studio Google Sheets CRM API is active and operational.",
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return jsonResponse({ status: "error", message: err.toString() });
  }
}

/**
 * Record a Project Inquiry (Full 7-Step Inquiry Form)
 */
function handleInquirySubmission(ss, data) {
  let sheet = ss.getSheetByName(SHEET_INQUIRIES);
  
  // Auto-create and format sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_INQUIRIES);
    sheet.appendRow([
      "Inquiry ID", "Date", "Time", "Client Name", "Email", "Phone", "Company",
      "Project Type", "Selected Services", "Project Scope / Description", 
      "Budget Range", "Target Timeline", "Reference URL / Files", "Key Requirements", 
      "Package Tier", "Base Price", "Promotional Discount", "Estimated Quote", 
      "Lead Status", "Internal Notes"
    ]);
    
    // Style header row with professional navy blue styling
    const headerRange = sheet.getRange(1, 1, 1, 20);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#1e40af");
    headerRange.setFontColor("#ffffff");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }

  const now = new Date();
  const inquiryId = data.inquiryId || ("INQ-" + now.getFullYear() + "-" + Utilities.getUuid().substring(0, 5).toUpperCase());
  const formattedDate = data.date || Utilities.formatDate(now, "GMT+5:30", "dd/MM/yyyy");
  const formattedTime = data.time || Utilities.formatDate(now, "GMT+5:30", "hh:mm:ss a");

  const row = [
    inquiryId,
    formattedDate,
    formattedTime,
    data.fullName || data.name || "",
    data.email || "",
    data.phone || "",
    data.company || "",
    data.projectType || "",
    Array.isArray(data.services) ? data.services.join(", ") : (data.services || ""),
    data.description || data.message || "",
    data.budget || "",
    data.timeline || "",
    data.referenceUrl || (data.fileUrl || ""),
    Array.isArray(data.requirements) ? data.requirements.join(", ") : (data.requirements || ""),
    data.selectedPackage || "Custom MVP",
    data.originalPrice || "",
    data.discount || "30% OFF",
    data.finalPrice || (data.estimatedTotal ? ("₹" + data.estimatedTotal) : ""),
    "New Lead",
    data.notes || ""
  ];

  sheet.appendRow(row);

  // Optional: Send instant email notification to studio owner
  sendEmailNotification("New Project Inquiry Received: " + inquiryId, [
    "You have received a new project inquiry on your website!",
    "",
    "Inquiry ID: " + inquiryId,
    "Client Name: " + (data.fullName || data.name || "N/A"),
    "Email: " + (data.email || "N/A"),
    "Phone: " + (data.phone || "N/A"),
    "Company: " + (data.company || "N/A"),
    "Project Type: " + (data.projectType || "N/A"),
    "Services: " + (Array.isArray(data.services) ? data.services.join(", ") : (data.services || "N/A")),
    "Budget: " + (data.budget || "N/A"),
    "Timeline: " + (data.timeline || "N/A"),
    "Estimated Quote: " + (data.finalPrice || data.estimatedTotal || "Custom"),
    "",
    "Project Description:",
    (data.description || data.message || "N/A")
  ].join("\n"));

  return jsonResponse({
    status: "success",
    inquiryId: inquiryId,
    message: "Inquiry successfully recorded in Google Sheets."
  });
}

/**
 * Record a Direct Contact Message ("Contact Now" Form)
 */
function handleContactSubmission(ss, data) {
  let sheet = ss.getSheetByName(SHEET_CONTACT);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_CONTACT);
    sheet.appendRow([
      "Lead ID", "Date", "Time", "Name", "Email", "Phone", "Company",
      "Project Type", "Budget", "Message / Requirements", "Status"
    ]);
    const headerRange = sheet.getRange(1, 1, 1, 11);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#0d9488");
    headerRange.setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }

  const now = new Date();
  const leadId = data.inquiryId || ("CNT-" + now.getFullYear() + "-" + Utilities.getUuid().substring(0, 5).toUpperCase());

  sheet.appendRow([
    leadId,
    Utilities.formatDate(now, "GMT+5:30", "dd/MM/yyyy"),
    Utilities.formatDate(now, "GMT+5:30", "hh:mm:ss a"),
    data.fullName || data.name || "",
    data.email || "",
    data.phone || "",
    data.company || "",
    data.projectType || "Direct Consultation",
    data.budget || "",
    data.description || data.message || "",
    "New"
  ]);

  sendEmailNotification("New Direct Contact Message: " + leadId, [
    "New message from Contact Now form:",
    "Name: " + (data.fullName || data.name),
    "Email: " + data.email,
    "Phone: " + (data.phone || "N/A"),
    "Message: " + (data.description || data.message)
  ].join("\n"));

  return jsonResponse({
    status: "success",
    inquiryId: leadId,
    message: "Contact message saved successfully."
  });
}

/**
 * Record a Support Ticket
 */
function handleSupportSubmission(ss, data) {
  let sheet = ss.getSheetByName(SHEET_SUPPORT);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_SUPPORT);
    sheet.appendRow([
      "Ticket ID", "Timestamp", "Name", "Email", "Project",
      "Issue Type", "Priority", "Description", "Status"
    ]);
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#dc2626").setFontColor("#fff");
    sheet.setFrozenRows(1);
  }

  const ticketId = data.ticketId || ("SUP-" + Utilities.getUuid().substring(0, 6).toUpperCase());

  sheet.appendRow([
    ticketId,
    new Date().toISOString(),
    data.name || "",
    data.email || "",
    data.projectName || "",
    data.issueType || "",
    data.priority || "Medium",
    data.description || "",
    "Open"
  ]);

  return jsonResponse({ status: "success", ticketId: ticketId });
}

/**
 * Fetch Projects from CMS sheet
 */
function getProjectsFromSheet(ss) {
  const sheet = ss.getSheetByName(SHEET_PROJECTS);
  if (!sheet) return jsonResponse({ status: "success", data: [] });

  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return jsonResponse({ status: "success", data: [] });

  const headers = values[0];
  const projects = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const item = {};
    headers.forEach((header, index) => {
      item[header.toString().trim()] = row[index];
    });
    projects.push(item);
  }

  return jsonResponse({ status: "success", data: projects });
}

/**
 * Send optional email notification to site administrator
 */
function sendEmailNotification(subject, body) {
  if (!NOTIFICATION_EMAIL || NOTIFICATION_EMAIL.trim() === "") return;
  try {
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: "[Code_IT Studio CRM] " + subject,
      body: body
    });
  } catch (e) {
    Logger.log("Email notification failed: " + e.toString());
  }
}

/**
 * Standard JSON Response Helper
 */
function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
