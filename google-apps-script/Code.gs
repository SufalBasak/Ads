/**
 * Google Apps Script Backend for Digital Product Agency
 * Handles "Project Inquiries", "Support Requests", and "Project CMS"
 * 
 * Instructions:
 * 1. Open Google Sheets -> Create a new Sheet (e.g. "Agency CRM")
 * 2. Click Extensions > Apps Script
 * 3. Replace all code in Code.gs with this file
 * 4. Click Deploy > New deployment > Select type: "Web app"
 * 5. Execute as: "Me", Who has access: "Anyone"
 * 6. Copy the Web App URL and paste it into js/sheets-api.js
 */

const SHEET_INQUIRIES = "Project Inquiries";
const SHEET_SUPPORT = "Support Requests";
const SHEET_PROJECTS = "Projects CMS";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.action === "submitInquiry") {
      return handleInquirySubmission(ss, data);
    } else if (data.action === "submitSupport") {
      return handleSupportSubmission(ss, data);
    } else {
      return jsonResponse({ status: "error", message: "Invalid action" });
    }
  } catch (err) {
    return jsonResponse({ status: "error", message: err.toString() });
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === "getProjects") {
      return getProjectsFromSheet(ss);
    }

    return jsonResponse({ status: "success", message: "API is active and ready" });
  } catch (err) {
    return jsonResponse({ status: "error", message: err.toString() });
  }
}

function handleInquirySubmission(ss, data) {
  let sheet = ss.getSheetByName(SHEET_INQUIRIES);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_INQUIRIES);
    sheet.appendRow([
      "Inquiry ID", "Date", "Time", "Name", "Email", "Phone", "Company",
      "Project Type", "Services", "Description", "Budget", "Timeline",
      "Reference URL", "Requirements", "Selected Package", "Original Price",
      "Discount", "Final Price", "Status", "Notes"
    ]);
    sheet.getRange(1, 1, 1, 20).setFontWeight("bold").setBackground("#eff6ff");
  }

  const row = [
    data.inquiryId || ("INQ-" + Utilities.getUuid().substring(0, 8).toUpperCase()),
    data.date || Utilities.formatDate(new Date(), "GMT+5:30", "dd/MM/yyyy"),
    data.time || Utilities.formatDate(new Date(), "GMT+5:30", "HH:mm:ss"),
    data.fullName || "",
    data.email || "",
    data.phone || "",
    data.company || "",
    data.projectType || "",
    Array.isArray(data.services) ? data.services.join(", ") : (data.services || ""),
    data.description || "",
    data.budget || "",
    data.timeline || "",
    data.referenceUrl || "",
    Array.isArray(data.requirements) ? data.requirements.join(", ") : (data.requirements || ""),
    data.selectedPackage || "Custom",
    data.originalPrice || "",
    data.discount || "30%",
    data.finalPrice || "",
    "New",
    data.notes || ""
  ];

  sheet.appendRow(row);

  return jsonResponse({
    status: "success",
    inquiryId: data.inquiryId,
    message: "Inquiry saved successfully"
  });
}

function handleSupportSubmission(ss, data) {
  let sheet = ss.getSheetByName(SHEET_SUPPORT);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_SUPPORT);
    sheet.appendRow([
      "Ticket ID", "Timestamp", "Name", "Email", "Project",
      "Issue Type", "Priority", "Description", "Reference URL", "Status"
    ]);
    sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#fef2f2");
  }

  sheet.appendRow([
    data.ticketId || ("SUP-" + Utilities.getUuid().substring(0, 8).toUpperCase()),
    new Date().toISOString(),
    data.name || "",
    data.email || "",
    data.projectName || "",
    data.issueType || "",
    data.priority || "Medium",
    data.description || "",
    data.referenceUrl || "",
    "Open"
  ]);

  return jsonResponse({ status: "success", ticketId: data.ticketId });
}

function getProjectsFromSheet(ss) {
  const sheet = ss.getSheetByName(SHEET_PROJECTS);
  if (!sheet) {
    return jsonResponse({ status: "success", data: [] });
  }

  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) {
    return jsonResponse({ status: "success", data: [] });
  }

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

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
