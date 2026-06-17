# Invoice Generator

A fullstack web app for creating, saving, and downloading professional invoices with GST calculations.

## Features

- Create invoices with business & client details
- Auto-calculate GST, subtotal, and total
- Live invoice preview
- Download as PDF
- Save invoices to MongoDB
- View dashboard with all invoices
- Delete invoices
- Responsive design

## Tech Stack

Frontend: React, Next.js 15, TypeScript, Tailwind CSS, jsPDF
Backend: Node.js, Next.js API Routes, MongoDB, Mongoose
Deployment: Vercel, GitHub

## Quick Start

### 1. Clone & Install
git clone https://github.com/YOUR_USERNAME/invoice-generator.git
cd invoice-generator
npm install

### 2. Setup MongoDB
- Create account at MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
- Create cluster and database user
- Copy connection string

### 3. Create .env.local
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/invoices?appName=Cluster0
NEXT_PUBLIC_APP_URL=http://localhost:3000

### 4. Run Locally
npm run dev
Visit http://localhost:3000

## How to Use

1. Create Invoice: Fill business details, client info, add items
2. Preview: See invoice in real-time on right side
3. Save: Click "Save Invoice" to store in database
4. Download: Click "Download PDF" to get invoice
5. Dashboard: Click "Dashboard" to view all invoices
6. Delete: Remove invoices from dashboard

## Deploy to Vercel

git push origin main

- Go to Vercel (https://vercel.com)
- Connect GitHub repo
- Add MONGODB_URI environment variable
- Deploy

## API Endpoints

GET /api/invoices - Get all invoices
POST /api/invoices - Create invoice
DELETE /api/invoices/[id] - Delete invoice
GET /api/invoices/[id] - Get single invoice
PUT /api/invoices/[id] - Update invoice

## Project Structure

invoice-generator/
├── app/
│   ├── api/invoices/
│   ├── components/ (Navbar, InvoiceForm, InvoicePreview, PDFExport, InvoiceHistory)
│   ├── dashboard/page.tsx
│   ├── page.tsx
│   └── layout.tsx
├── lib/ (db.ts, models, utils.ts)
└── .env.local

## Dependencies

npm install mongoose jspdf html2canvas

## Author

Bhavesh
Email: bhavesh3sharma4@gmail.com
GitHub: @bhavesh-210

## Links

Live Demo: https://invoice-generator.vercel.app
GitHub: https://github.com/bhavesh-210/invoice-generator
Built for Digital Heroes: https://digitalheroesco.com


Built with ❤️ for Digital Heroes