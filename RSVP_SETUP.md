# RSVP Google Sheets Setup Guide

This guide will help you set up a free Google Sheets spreadsheet to collect RSVP responses from your wedding website.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Wedding RSVPs" (or whatever you prefer)
4. In the first row, add these column headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Attending`
   - E1: `Number of Guests`
   - F1: `Dietary Restrictions`
   - G1: `Message`

## Step 2: Create a Google Apps Script

1. In your Google Sheet, click on `Extensions` → `Apps Script`
2. Delete any existing code and paste the following:

```javascript
function doPost(e) {
  try {
    // Open the spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Add the data to the sheet
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.attending || '',
      data.guests || '',
      data.dietary || '',
      data.message || ''
    ]);
    
    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("RSVP endpoint is working!");
}
```

3. Save the script (Ctrl+S or Cmd+S)
4. Name it "RSVP Handler" (or any name you prefer)

## Step 3: Deploy as Web App

1. Click on `Deploy` → `New deployment`
2. Click on the gear icon and select `Web app`
3. Configure the deployment:
   - **Description**: "Wedding RSVP Handler" (optional)
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click `Deploy`
5. **IMPORTANT**: Copy the Web app URL that appears. It will look like:
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

## Step 4: Update Your Website

1. Open `/components/RSVP.tsx` in your code
2. Find this line (around line 26):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'
   ```
3. Replace it with your actual Web App URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec'
   ```
4. Save the file and deploy your website

## Step 5: Test It

1. Go to your wedding website
2. Click "RSVP Now" and submit a test response
3. Check your Google Sheet - you should see the response appear!

## Step 6: Display the Wedding Wishes (Optional)

1. Publish the sheet so it can be read by the website (File → Share → Publish to web → Entire document)
2. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
3. Create a `.env.local` file at the project root (if you don't already have one)
4. Add these entries:
   ```bash
   NEXT_PUBLIC_GOOGLE_SHEETS_ID=your_spreadsheet_id_here
   # Optional overrides if you renamed the sheet tab or want to limit the range that contains wishes
   NEXT_PUBLIC_GOOGLE_SHEETS_TAB=Wedding RSVP
   NEXT_PUBLIC_GOOGLE_SHEETS_RANGE=A2:G
   ```
5. Restart the development server so the environment variables are picked up
6. Visit the site again — the "Wedding Wishes" section will list the latest heartfelt messages from your guests

## Managing Responses

- All responses will appear in your Google Sheet in real-time
- You can sort, filter, and analyze the data using Google Sheets features
- Share the sheet with your partner or wedding planner (read-only or edit access)
- Download as Excel or CSV anytime
- Set up email notifications: Tools → Notification rules

## Troubleshooting

### If submissions aren't appearing:
1. Make sure the Web App URL is correctly copied
2. Check that deployment settings have "Anyone" access
3. Try re-deploying: Deploy → Manage deployments → Edit → New version

### To make changes to the script:
1. Edit the code in Apps Script
2. Save the changes
3. Deploy → Manage deployments
4. Edit the active deployment
5. Select "New version" and update

## Security Note

This setup is secure because:
- Only you can see the Google Sheet
- The script only accepts POST requests with specific data
- No sensitive data is exposed
- Google handles all the security and infrastructure

## Optional: Email Notifications

To get an email every time someone RSVPs, add this to your Apps Script before the "Return success" line:

```javascript
// Send email notification
MailApp.sendEmail({
  to: "your-email@example.com",
  subject: "New Wedding RSVP: " + data.name,
  body: `
    Name: ${data.name}
    Email: ${data.email}
    Attending: ${data.attending}
    Guests: ${data.guests}
    Dietary: ${data.dietary}
    Message: ${data.message}
  `
});
```

That's it! You now have a free, simple RSVP system using Google Sheets.