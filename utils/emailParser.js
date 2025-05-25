function decodeBase64(encoded) {
  return Buffer.from(encoded, 'base64').toString('utf-8');
}

function extractHeader(headers, name) {
  return headers.find(h => h.name.toLowerCase() === name.toLowerCase())?.value || null;
}

function parseEmail(email) {
  const headers = email.payload.headers;

  const to = extractHeader(headers, 'To');
  const cc = extractHeader(headers, 'Cc');
  const bcc = extractHeader(headers, 'Bcc');
  const subject = extractHeader(headers, 'Subject');
  const from = extractHeader(headers, 'From');
  const date = extractHeader(headers, 'Date');
  const inReplyTo = extractHeader(headers, 'In-Reply-To');

  function findPart(parts, mimeType) {
    for (const part of parts || []) {
      if (part.mimeType === mimeType) return part.body.data;
      if (part.parts) {
        const nested = findPart(part.parts, mimeType);
        if (nested) return nested;
      }
    }
    return null;
  }

  const plain = decodeBase64(findPart(email.payload.parts, 'text/plain') || '');
  const html = decodeBase64(findPart(email.payload.parts, 'text/html') || '');

  return { to, cc, bcc, subject, from, date, inReplyTo, plain, html };
}

module.exports = { parseEmail };
