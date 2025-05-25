const { google } = require('googleapis');
const gmail = google.gmail('v1');

async function listRecentMessages(auth) {
  const res = await gmail.users.messages.list({
    auth,
    userId: 'me',
    maxResults: 5,
    q: 'newer_than:1d' // fetch recent messages
  });

  const messages = res.data.messages || [];
  return messages.map((msg) => msg.id);
}


async function fetchEmail(auth, messageId) {
  try {
    const res = await gmail.users.messages.get({
      auth,
      userId: 'me',
      id: messageId,
      format: 'full',
    });

    return res.data;
  } catch (err) {
    console.error(`Failed to fetch message ${messageId}:`, err.message);
    return null; // Prevent crashing
  }
}

module.exports = { listRecentMessages, fetchEmail };
