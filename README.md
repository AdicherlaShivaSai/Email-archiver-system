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
#### psql
```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback
PG_CONNECTION_STRING=postgres://postgres:postgres@localhost:5432/ea_db
```

### 4. Set Up PostgreSQL (via Docker)
```bash
docker run --name ea-postgres `
  -e POSTGRES_USER=postgres `
  -e POSTGRES_PASSWORD=postgres `
  -e POSTGRES_DB=ea_db `
  -p 5432:5432 `
  -v "%cd%/init.sql:/docker-entrypoint-initdb.d/init.sql" `
  -d postgres
```

### 5. Run the Server
```bash
npm start
```

## 🔐 Authentication Flow
- Open browser at: http://localhost:3000/auth
- Authorize Gmail account
- You’ll be redirected and the system will start archiving

## 📦 Folder Structure

email-archiver/
├── index.js
├── .env.example
├── init.sql
├── oauth/
│   └── googleAuth.js
├── services/
│   └── gmailService.js
├── utils/
│   └── emailParser.js
├── db/
│   └── pool.js
└── README.md

