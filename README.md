# Email-archiver-system

This project is a Node.js-based email archiving system that connects to a Gmail account using OAuth2, fetches recent emails, saves metadata to PostgreSQL, and stores attachments in Google Drive.

## 🔧 Features
- OAuth2-based Gmail integration
- Fetch recent emails (last 24 hours)
- Save email metadata to PostgreSQL
- Upload attachments to Google Drive
- Auto-skip duplicate emails

## 🛠 Technologies Used
- Node.js
- Express
- PostgreSQL
- Google APIs (Gmail, Drive)
- Docker (for database)

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/email-archiver.git
cd email-archiver
```

### 2.Install Dependecies
```bash
npm install
```

### 3.Create .env file
```bash
cp .env.example .env
```
```psql
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback
PG_CONNECTION_STRING=postgres://postgres:postgres@localhost:5432/ea_db
```
