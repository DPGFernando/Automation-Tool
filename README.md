AI-Powered Specifications Finder 🚀

This project is a web-based application that uses Google Gemini AI to fetch hardware specifications (like processors, etc.) from trusted sources, then exports the results into an Excel file for easy download.

✨ Features

🔍 AI-Powered Search → Uses Google Gemini API to fetch the latest specifications.
🗂️ Dynamic Categories → Categories stored in MongoDB are fetched dynamically.
📄 CSV to Excel Conversion → Gemini returns results as CSV → automatically converted into Excel.
📥 Downloadable Excel File → One-click download of the generated specifications.
🔐 Secure Gemini Integration → API calls handled from the backend to keep API keys safe.
⚡ Fast and Modern UI → Built with React and Material UI.

🛠️ Tech Stack
Frontend

⚛️ React.js — UI library
🎨 Material UI — modern, responsive components
🌐 Axios — API calls to backend

Backend

🟢 Node.js + Express — REST API
🤖 Google Gemini API — AI-powered specification fetching
📊 ExcelJS — Excel file creation and styling
🗄️ MongoDB — Stores categories, trusted websites, and specifications
