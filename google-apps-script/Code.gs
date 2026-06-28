/**
 * ============================================================
 * NEXORA AI — Google Apps Script Backend
 * ============================================================
 * This script receives form submissions from the website,
 * saves them to a Google Sheet, and sends email notifications.
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://sheets.google.com → Create a new spreadsheet
 *    Name it: "Nexora AI — Website Leads"
 * 2. Open Extensions → Apps Script
 * 3. Delete existing code, paste this entire file
 * 4. Click Save (Ctrl+S)
 * 5. Click "Deploy" → "New Deployment"
 * 6. Type: Web App
 * 7. Description: "Nexora AI Lead Capture v1"
 * 8. Execute as: Me
 * 9. Who has access: Anyone
 * 10. Click Deploy → Authorize → Copy the Web App URL
 * 11. Paste the URL into your .env.local as NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 * ============================================================
 */

// ─── CONFIGURATION ────────────────────────────────────────────
const CONFIG = {
  SPREADSHEET_ID: "",          // Leave blank to use the active spreadsheet
  SHEET_NAME: "Leads",
  NOTIFICATION_EMAIL: "contact.nexora011@gmail.com",
  SENDER_NAME: "Nexora AI Website",
  BUSINESS_NAME: "Nexora AI",
};

// Column headers for the sheet
const HEADERS = [
  "Timestamp",
  "Full Name",
  "Company Name",
  "Email",
  "Phone",
  "Business Type",
  "Selected Package",
  "Project Requirements",
  "Budget",
  "Source",
  "Status",
];

// ─── MAIN ENTRY POINT ─────────────────────────────────────────

/**
 * Handles POST requests from the website contact form.
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const result = processSubmission(data);
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Lead captured successfully", id: result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("doPost error: " + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (for testing / health check).
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "Nexora AI Lead Capture API is running",
      timestamp: new Date().toISOString(),
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── CORE LOGIC ───────────────────────────────────────────────

/**
 * Processes a form submission: saves to sheet + sends email.
 */
function processSubmission(data) {
  const sheet = getOrCreateSheet();
  const rowId = saveToSheet(sheet, data);
  sendEmailNotification(data);
  return rowId;
}

/**
 * Gets the leads sheet (creates it with headers if it doesn't exist).
 */
function getOrCreateSheet() {
  let ss;
  if (CONFIG.SPREADSHEET_ID) {
    ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    // Add headers with styling
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setValues([HEADERS]);
    headerRange.setBackground("#4F46E5");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setFontSize(11);
    sheet.setFrozenRows(1);

    // Set column widths
    sheet.setColumnWidth(1, 160);   // Timestamp
    sheet.setColumnWidth(2, 160);   // Full Name
    sheet.setColumnWidth(3, 180);   // Company
    sheet.setColumnWidth(4, 220);   // Email
    sheet.setColumnWidth(5, 130);   // Phone
    sheet.setColumnWidth(6, 180);   // Business Type
    sheet.setColumnWidth(7, 200);   // Package
    sheet.setColumnWidth(8, 300);   // Requirements
    sheet.setColumnWidth(9, 150);   // Budget
    sheet.setColumnWidth(10, 120);  // Source
    sheet.setColumnWidth(11, 120);  // Status
  }

  return sheet;
}

/**
 * Appends the lead data as a new row.
 */
function saveToSheet(sheet, data) {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const row = [
    timestamp,
    data.fullName || "",
    data.companyName || "",
    data.email || "",
    data.phone || "",
    data.businessType || "",
    data.selectedPackage || "",
    data.requirements || "",
    data.budget || "",
    "Website Contact Form",
    "New Lead",
  ];

  sheet.appendRow(row);

  // Style the new row
  const lastRow = sheet.getLastRow();
  const rowRange = sheet.getRange(lastRow, 1, 1, HEADERS.length);

  // Alternating row colors
  if (lastRow % 2 === 0) {
    rowRange.setBackground("#F8F9FF");
  }

  // Color the Status cell based on value
  const statusCell = sheet.getRange(lastRow, 11);
  statusCell.setBackground("#D1FAE5");
  statusCell.setFontColor("#065F46");
  statusCell.setFontWeight("bold");

  return lastRow;
}

/**
 * Sends an email notification to the business.
 */
function sendEmailNotification(data) {
  try {
    const subject = `🚀 New Nexora AI Website Lead — ${data.fullName || "Unknown"}`;

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f1f5f9; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #4F46E5, #8B5CF6); padding: 32px 28px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 22px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px; }
    .badge { display: inline-block; background: rgba(255,255,255,0.2); color: white; padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 600; margin-bottom: 12px; }
    .content { padding: 28px; }
    .field-group { margin-bottom: 20px; }
    .field-label { font-size: 11px; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #0F172A; font-weight: 500; }
    .highlight-card { background: linear-gradient(135deg, #EEF2FF, #F5F3FF); border: 1px solid #C7D2FE; border-radius: 12px; padding: 16px 20px; margin: 20px 0; }
    .highlight-card .label { font-size: 11px; color: #6366F1; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
    .highlight-card .value { font-size: 18px; color: #4F46E5; font-weight: 800; margin-top: 4px; }
    .requirements-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px 20px; margin: 16px 0; }
    .requirements-box .label { font-size: 11px; color: #64748B; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
    .requirements-box .text { font-size: 14px; color: #334155; line-height: 1.6; }
    .divider { height: 1px; background: #F1F5F9; margin: 20px 0; }
    .cta-section { text-align: center; padding: 24px 28px 28px; background: #FAFBFF; border-top: 1px solid #F1F5F9; }
    .cta-btn { display: inline-block; background: linear-gradient(135deg, #4F46E5, #8B5CF6); color: white; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 15px; margin: 0 6px 10px; }
    .wa-btn { display: inline-block; background: #25D366; color: white; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 15px; margin: 0 6px 10px; }
    .footer { text-align: center; padding: 16px 28px; font-size: 12px; color: #94A3B8; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    @media (max-width: 480px) { .grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">🔥 New Lead Alert</div>
      <h1>New Website Enquiry Received</h1>
      <p>${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" })}</p>
    </div>

    <div class="content">
      <div class="highlight-card">
        <div class="label">Selected Package</div>
        <div class="value">📦 ${data.selectedPackage || "Not specified"}</div>
      </div>

      <div class="grid">
        <div class="field-group">
          <div class="field-label">Full Name</div>
          <div class="field-value">👤 ${data.fullName || "N/A"}</div>
        </div>
        <div class="field-group">
          <div class="field-label">Company</div>
          <div class="field-value">🏢 ${data.companyName || "N/A"}</div>
        </div>
        <div class="field-group">
          <div class="field-label">Phone / WhatsApp</div>
          <div class="field-value">📱 ${data.phone || "N/A"}</div>
        </div>
        <div class="field-group">
          <div class="field-label">Email</div>
          <div class="field-value">✉️ ${data.email || "N/A"}</div>
        </div>
        <div class="field-group">
          <div class="field-label">Business Type</div>
          <div class="field-value">🏭 ${data.businessType || "N/A"}</div>
        </div>
        <div class="field-group">
          <div class="field-label">Budget Range</div>
          <div class="field-value">💰 ${data.budget || "Not specified"}</div>
        </div>
      </div>

      <div class="requirements-box">
        <div class="label">📋 Project Requirements</div>
        <div class="text">${(data.requirements || "Not provided").replace(/\n/g, "<br>")}</div>
      </div>
    </div>

    <div class="cta-section">
      <p style="color:#64748B; font-size:14px; margin:0 0 16px; font-weight:600;">
        ⚡ Respond within 1 hour to maximize conversion rate
      </p>
      <a href="https://wa.me/${data.phone ? data.phone.replace(/\D/g, "") : "918699045750"}" class="wa-btn">
        💬 Reply on WhatsApp
      </a>
      <a href="mailto:${data.email}" class="cta-btn">
        ✉️ Send Email Reply
      </a>
    </div>

    <div class="footer">
      This lead was captured from the Nexora AI website contact form.<br>
      <strong>Nexora AI</strong> · contact.nexora011@gmail.com · +91 8699045750
    </div>
  </div>
</body>
</html>`;

    GmailApp.sendEmail(
      CONFIG.NOTIFICATION_EMAIL,
      subject,
      `New lead from ${data.fullName} (${data.email}) — Package: ${data.selectedPackage}`,
      {
        htmlBody: htmlBody,
        name: CONFIG.SENDER_NAME,
        replyTo: data.email || CONFIG.NOTIFICATION_EMAIL,
      }
    );

    Logger.log("Email notification sent successfully to " + CONFIG.NOTIFICATION_EMAIL);
  } catch (err) {
    Logger.log("Email send failed: " + err.toString());
    // Don't throw — email failure shouldn't break the form submission
  }
}

// ─── UTILITY ──────────────────────────────────────────────────

/**
 * Test function — run this manually in the Apps Script editor to verify setup.
 */
function testSubmission() {
  const testData = {
    fullName: "Test User",
    companyName: "Test Company Pvt Ltd",
    email: "test@example.com",
    phone: "9876543210",
    businessType: "E-Commerce / Retail",
    selectedPackage: "Standard Package — ₹20,000",
    requirements: "I need a WhatsApp chatbot and CRM integration for my online store.",
    budget: "₹10,000 – ₹25,000",
  };

  const result = processSubmission(testData);
  Logger.log("Test submission result: Row " + result);
  Logger.log("✅ Setup is working correctly!");
}
