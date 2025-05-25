const express = require('express');
const {
  oAuth2Client,
  getAuthUrl,
  setTokenFromCode,
  loadSavedTokens 
} = require('./oauth/googleAuth');

const { listRecentMessages, fetchEmail } = require('./services/gmailService');
const { parseEmail } = require('./utils/emailParser');
const { google } = require('googleapis');
const app = express();


app.get('/auth', (req, res) => {
  res.redirect(getAuthUrl());
});

app.get('/oauth2callback', async (req, res) => {
  await setTokenFromCode(req.query.code);
  res.send('OAuth setup complete.');
});

app.get('/poll', async (req, res) => {
  try {

    loadSavedTokens();
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const profile = await gmail.users.getProfile({ userId: 'me' });
    const historyId = profile.data.historyId;

    const messages = await listRecentMessages(oAuth2Client, historyId);

    for (const id of messages) {
      const raw = await fetchEmail(oAuth2Client, id);
      const parsed = parseEmail(raw);
      console.log(parsed.subject, parsed.from, parsed.date);
    }

    res.send('Polled and processed new emails');
  } catch (err) {
    console.error('Polling failed:', err.message);
    res.status(500).send('Polling failed: ' + err.message);
  }
});
app.listen(3000, () => console.log('Listening at http://localhost:3000'));
