const { pool } = require('../db');

async function saveEmail(email) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const emailResult = await client.query(
      `INSERT INTO emails (message_id, thread_id, subject, text_body, html_body, date, sender, in_reply_to)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (message_id) DO NOTHING RETURNING id`,
      [email.messageId, email.threadId, email.subject, email.textBody, email.htmlBody, email.date, email.from, email.inReplyTo]
    );

    const emailId = emailResult.rows[0]?.id;
    if (!emailId) {
      console.log(`Duplicate email: ${email.messageId}`);
      await client.query('ROLLBACK');
      return;
    }

    for (const recipient of email.recipients) {
      await client.query(
        `INSERT INTO email_recipients (email_id, address, type)
         VALUES ($1, $2, $3)`,
        [emailId, recipient.address, recipient.type]
      );
    }

    for (const attachment of email.attachments) {
      await client.query(
        `INSERT INTO email_attachments (email_id, filename, mime_type, size, drive_file_id, drive_file_link)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [emailId, attachment.filename, attachment.mimeType, attachment.size, attachment.driveFileId, attachment.driveFileLink]
      );
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { saveEmail };
