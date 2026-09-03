function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const {
    name,
    brandAgency,
    email,
    projectType,
    location,
    proposedDates,
    budgetRange,
    message,
  } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Required fields missing.' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8475597540:AAHHlJzGLbthduvR1dIm0ZxJb-4qzU7NV8o';
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '268166340';

  const dateStr = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Tehran',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const telegramHtml = `
🌟 <b>NEW BOOKING INQUIRY — SHAHRZAD</b> 🌟
━━━━━━━━━━━━━━━━━━━━
👤 <b>Name:</b> ${escapeHtml(name)}
🏢 <b>Brand / Agency:</b> ${escapeHtml(brandAgency || 'N/A')}
📧 <b>Email:</b> ${escapeHtml(email)}
🎬 <b>Project Type:</b> ${escapeHtml(projectType || 'General Inquiry')}
📍 <b>Location:</b> ${escapeHtml(location || 'Not specified')}
📅 <b>Proposed Dates:</b> ${escapeHtml(proposedDates || 'Flexible')}
💰 <b>Budget Range:</b> ${escapeHtml(budgetRange || 'Not specified')}

💬 <b>Message:</b>
${escapeHtml(message)}
━━━━━━━━━━━━━━━━━━━━
⏰ <b>Submitted At:</b> ${escapeHtml(dateStr)} (Tehran Time)
`.trim();

  try {
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: telegramHtml,
          parse_mode: 'HTML',
        }),
      }
    );

    const data = await telegramRes.json();

    if (!data.ok) {
      console.error('Telegram API error:', data);
      return res.status(500).json({ success: false, error: data.description });
    }

    return res.status(200).json({ success: true, message: 'Inquiry sent successfully to Telegram.' });
  } catch (error) {
    console.error('Telegram send error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
