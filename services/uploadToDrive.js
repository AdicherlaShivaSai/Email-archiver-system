const { google } = require('googleapis');

async function uploadAttachment(oAuth2Client, attachment, emailId) {
  const drive = google.drive({ version: 'v3', auth: oAuth2Client });

  const fileMetadata = {
    name: attachment.filename,
    parents: ['YOUR_FOLDER_ID'], // Optional: ID of a folder in Drive
  };

  const media = {
    mimeType: attachment.mimeType,
    body: Buffer.from(attachment.data, 'base64'), // Gmail returns base64-encoded
  };

  const file = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id, webViewLink',
  });

  return {
    drive_file_id: file.data.id,
    drive_file_link: file.data.webViewLink,
  };
}

module.exports = { uploadAttachment };
