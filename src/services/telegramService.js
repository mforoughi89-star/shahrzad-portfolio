const BOT_TOKEN = '8475597540:AAHHlJzGLbthduvR1dIm0ZxJb-4qzU7NV8o';
const CHAT_ID = '268166340';

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export const sendBookingInquiryToTelegram = async (formData) => {
  const {
    name,
    brandAgency,
    email,
    projectType,
    location,
    proposedDates,
    budgetRange,
    message,
  } = formData;

  const dateStr = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Tehran',
    dateStyle: 'medium',
    timeStyle: 'short',
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
⏰ <b>Submitted:</b> ${escapeHtml(dateStr)} (Tehran)
`.trim();

  // 1. Try serverless backend endpoint (/api/contact)
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const resData = await response.json();
      if (resData.success) {
        return { success: true, method: 'serverless' };
      }
    }
  } catch (err) {
    console.warn('Serverless endpoint not reachable, trying direct fallback...', err);
  }

  // 2. Direct client-side fallback
  try {
    const fallbackRes = await fetch(
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

    const data = await fallbackRes.json();
    if (data.ok) {
      return { success: true, method: 'client-direct' };
    } else {
      throw new Error(data.description || 'Telegram send failed');
    }
  } catch (fallbackErr) {
    console.error('Direct Telegram API call failed:', fallbackErr);
    throw fallbackErr;
  }
};
