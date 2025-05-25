const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
require('dotenv').config();
console.log('CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);


const TOKEN_PATH = path.join(__dirname, 'token.json');

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Load saved tokens if available
if (fs.existsSync(TOKEN_PATH)) {
  const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH));
  oAuth2Client.setCredentials(tokens);
}

// Get the auth URL
function getAuthUrl() {
  const SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/drive.file'
  ];

  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent', // always return refresh_token
  });
}

// Set token from OAuth callback and save it
async function setTokenFromCode(code) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  // Save to file for reuse
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  return tokens;
}
function loadSavedTokens() {
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
    return token;
  } else {
    throw new Error('No saved token found.');
  }
}


module.exports = {
  oAuth2Client,
  getAuthUrl,
  setTokenFromCode,
  loadSavedTokens, 
};

