CREATE TABLE emails (
    id SERIAL PRIMARY KEY,
    gmail_message_id VARCHAR(128) UNIQUE NOT NULL,
    thread_id VARCHAR(128),
    subject TEXT,
    body_text TEXT,
    body_html TEXT,
    received_at TIMESTAMP,
    sender_email TEXT,
    in_reply_to TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE email_recipients (
    id SERIAL PRIMARY KEY,
    email_id INTEGER REFERENCES emails(id) ON DELETE CASCADE,
    email_address TEXT NOT NULL,
    recipient_type TEXT CHECK (recipient_type IN ('to', 'cc', 'bcc'))
);

CREATE TABLE attachments (
    id SERIAL PRIMARY KEY,
    email_id INTEGER REFERENCES emails(id) ON DELETE CASCADE,
    filename TEXT,
    mime_type TEXT,
    size INTEGER,
    drive_file_id TEXT,
    drive_file_link TEXT
);

CREATE UNIQUE INDEX idx_email_unique ON emails(gmail_message_id);
