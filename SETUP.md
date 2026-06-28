# Nexora AI Website — Complete Setup & Deployment Guide

## Prerequisites

- Node.js 18+ installed
- A Google account
- A Vercel account (free at vercel.com)
- Git installed

---

## 1. Local Development Setup

### Clone / open the project

```bash
cd nexora-ai
npm install
```

### Create environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values (see steps below for each value).

### Run the dev server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the site.

---

## 2. Google Apps Script Setup (Lead Capture Backend)

This connects the contact form to a Google Sheet and sends email notifications.

### Step 1: Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **+ New spreadsheet**
3. Name it: `Nexora AI — Website Leads`
4. Keep it open

### Step 2: Open Apps Script

1. In the spreadsheet: **Extensions → Apps Script**
2. A new Apps Script editor will open
3. Delete all existing code in the editor

### Step 3: Paste the script

1. Open `google-apps-script/Code.gs` from this project
2. Copy the entire contents
3. Paste into the Apps Script editor
4. Press **Ctrl+S** (or Cmd+S) to save
5. Name the project: `Nexora AI Lead Capture`

### Step 4: Deploy as Web App

1. Click **Deploy → New Deployment**
2. Click the gear icon ⚙ next to "Select type" → choose **Web app**
3. Fill in:
   - Description: `Nexora AI Lead Capture v1`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Click **Authorize access** → Choose your Google account → Allow
6. **Copy the Web App URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

### Step 5: Add URL to .env.local

```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

### Step 6: Test the script

1. In the Apps Script editor, select function `testSubmission` from the dropdown
2. Click **Run ▶**
3. Check your Google Sheet — you should see a new row
4. Check your email — you should receive a notification

> **Important**: Every time you edit the script, you must re-deploy:
> Deploy → Manage Deployments → Edit → New Version → Deploy

---

## 3. EmailJS Setup (Alternative Email Notification)

EmailJS lets you send emails directly from the browser without a backend. Use this as a backup or additional notification method.

### Step 1: Create account

1. Go to [emailjs.com](https://www.emailjs.com) → Sign up (free)

### Step 2: Add email service

1. **Email Services → Add New Service**
2. Select **Gmail**
3. Connect your `contact.nexora011@gmail.com` account
4. Note the **Service ID** (e.g., `service_abc123`)

### Step 3: Create email template

1. **Email Templates → Create New Template**
2. Use these template variables:
   ```
   To: contact.nexora011@gmail.com
   Subject: 🚀 New Nexora AI Lead — {{from_name}}
   
   Name: {{from_name}}
   Company: {{company}}
   Phone: {{phone}}
   Email: {{from_email}}
   Package: {{package}}
   Requirements: {{message}}
   Budget: {{budget}}
   Date: {{date}}
   ```
3. Note the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key

1. **Account → General → Public Key**
2. Copy it

### Step 5: Add to .env.local

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 4. Vercel Deployment

### Method A: Deploy via Vercel CLI (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (follow the prompts)
vercel

# When asked about settings:
# - Framework: Next.js (auto-detected)
# - Root: ./
# - Build command: npm run build
# - Output: .next
```

### Method B: Deploy via GitHub

1. Push code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial Nexora AI website"
   git remote add origin https://github.com/YOUR_USERNAME/nexora-ai.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repository
4. Vercel auto-detects Next.js — click **Deploy**

### Add Environment Variables on Vercel

1. Go to your project on Vercel → **Settings → Environment Variables**
2. Add each variable from your `.env.local`:
   - `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
3. Click **Save** and redeploy

---

## 5. Custom Domain Setup

### On Vercel:

1. Project → **Settings → Domains**
2. Add your domain: `nexoraai.in`
3. Vercel gives you DNS records to add

### On your domain registrar (GoDaddy / Namecheap / BigRock):

Add these DNS records:
```
Type: A      Name: @      Value: 76.76.21.21
Type: CNAME  Name: www    Value: cname.vercel-dns.com
```

Wait 24-48 hours for propagation.

---

## 6. WhatsApp Business API (Optional Upgrade)

For automated WhatsApp messaging at scale, upgrade to the official API:

1. **Meta Business Suite**: business.facebook.com
2. Create a Business Account
3. Add WhatsApp → Get API access
4. Use services like **Twilio**, **360dialog**, or **Wati** for easy integration

For basic needs, the current `wa.me` link redirect is sufficient.

---

## 7. SEO Configuration

### Update metadata in `src/app/layout.tsx`:

```typescript
metadataBase: new URL("https://nexoraai.in"),  // Your actual domain
```

### Add Google Search Console:

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your domain
3. Verify via DNS TXT record
4. Submit your sitemap: `https://nexoraai.in/sitemap.xml`

### Add Google Analytics:

1. Create GA4 property at analytics.google.com
2. Add to `src/app/layout.tsx`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

---

## 8. Security Checklist

- [x] Form validation on client side
- [x] `no-cors` mode prevents CORS attacks on Apps Script
- [x] No API keys exposed in frontend (only `NEXT_PUBLIC_*` vars)
- [x] WhatsApp URLs use `https://wa.me` (official)
- [x] External links use `rel="noopener noreferrer"`
- [ ] Add rate limiting (recommend Vercel Edge Functions or Upstash)
- [ ] Add reCAPTCHA v3 on form for spam protection
- [ ] Enable Vercel DDoS protection (automatic on Pro plan)

---

## 9. Testing Checklist

### Local:
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Contact form validates required fields
- [ ] Form submission shows success popup
- [ ] WhatsApp redirect opens with pre-filled message
- [ ] Floating buttons appear and link correctly
- [ ] Sticky CTA appears after 40% scroll
- [ ] Exit popup appears on mouse leave / 45 second timer
- [ ] Mobile responsive on all screen sizes

### Production:
- [ ] Domain loads with HTTPS
- [ ] Test form submission → check Google Sheet for new row
- [ ] Test form submission → check email notification
- [ ] Test WhatsApp redirect → verify pre-filled message
- [ ] Google PageSpeed score > 90
- [ ] Check Open Graph tags at opengraph.xyz

---

## 10. Updating the Google Apps Script

If you change `Code.gs`:

1. Open the Apps Script editor
2. Make your changes
3. Click **Deploy → Manage Deployments**
4. Click the pencil ✏ icon
5. Change version to **New version**
6. Click **Deploy**
7. The same URL continues to work — no frontend change needed

---

## Support

For any setup issues, reach out:
- WhatsApp: +91 8699045750
- Email: contact.nexora011@gmail.com
- Instagram: @getnexoraai
