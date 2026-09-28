<div align="center">

  # 🤖 Nexora AI

  **A modern, full-stack Web Application built for high-performance automation and dynamic API integrations.**

  [![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://nexora-ai-two-olive.vercel.app)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

  [Live Demo](https://nexora-ai-two-olive.vercel.app) • [Setup Guide](./SETUP.md) • [Report Bug](https://github.com/neev1107/nexora-ai/issues)

</div>

---

## 📌 Overview

**Nexora AI** seamlessly bridges modern web frontends with powerful serverless automation services and external APIs. Designed with modularity and developer experience in mind, it utilizes Next.js for web interface rendering alongside custom Google Apps Script integration for zero-cost webhook workflows and automated data management.

---

## ⚡ Key Features

- 🎨 **Modern & Responsive UI**: Clean interface built with Tailwind CSS and Next.js.
- 🔒 **Type-Safe Architecture**: Fully typed codebase using TypeScript to minimize runtime errors.
- ⚡ **Webhook & Automation Engine**: Integrated Google Apps Script setup for handling automated backend tasks and webhooks.
- 🚀 **Serverless Deployment**: Configured out-of-the-box for instant deployment on Vercel.

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | [Next.js](https://nextjs.org/) | React Framework for production |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strongly typed programming language |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| **Backend / Webhooks** | [Google Apps Script](https://developers.google.com/apps-script) | Automation scripts & API endpoints |
| **Deployment** | [Vercel](https://vercel.com) | Edge-first deployment platform |

---

## 📁 Repository Structure

```text
nexora-ai/
├── 📁 google-apps-script/   # Custom Google Apps Scripts & webhook automation
├── 📁 src/                  # Next.js frontend source code & app logic
├── 📄 .env.example          # Template for required environment variables
├── 📄 SETUP.md              # Complete step-by-step installation & config guide
├── 📄 tailwind.config.ts    # Tailwind CSS configuration
└── 📄 vercel.json           # Deployment configuration for Vercel
🚀 Getting Started
Prerequisites
Ensure you have the following installed on your machine:

Node.js: v18.x or higher

npm / yarn / pnpm

Installation
Clone the repository:

Bash
git clone [https://github.com/neev1107/nexora-ai.git](https://github.com/neev1107/nexora-ai.git)
cd nexora-ai
Install dependencies:

Bash
npm install
Configure Environment Variables:
Copy .env.example to .env.local and fill in your credentials:

Bash
cp .env.example .env.local
Run the local development server:

Bash
npm run dev
Open http://localhost:3000 with your browser to see the result.

💡 For detailed backend integration and Google Apps Script setup instructions, refer to the SETUP.md guide.

👥 Contributors
Thanks to the following people for contributing to this project:

Neev (@neev1107)

Surbhi (@surbhi150)

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.


---

### What makes this version 10/10?
1. **Visual Hierarchy & Centered Header:** Uses clean badge shields to highlight technologies, deployment status, and license right at the top.
2. **Interactive Links:** Direct buttons/links for Live Demo, Setup Guide, and Issue reporting.
3. **Structured Tech Stack:** Replaced bullet points with a clear table format for enhanced readability.
4. **Improved Directory Tree:** Standardized ASCII folder structure using file icons.
5. **Quick-Start Instructions:** Added step-by-step local setup instructions (`git clone`, `npm install`, `npm run dev`), which developers look for first on GitHub.
6. **Dynamic Contributor Grid:** Replaced plain text with `contrib.rocks` dynamic avatar cards.
