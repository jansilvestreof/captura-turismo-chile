import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const { message, type } = await request.json();

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID; // You need to set this

  if (!telegramToken || !chatId) {
    return NextResponse.json({ error: 'Telegram credentials not configured' }, { status: 500 });
  }

  try {
    await axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      chat_id: chatId,
      text: `🚨 Alerta ${type}: ${message}`,
      parse_mode: 'Markdown'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending Telegram alert:', error);
    return NextResponse.json({ error: 'Failed to send alert' }, { status: 500 });
  }
}