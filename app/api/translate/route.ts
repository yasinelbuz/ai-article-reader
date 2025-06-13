import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text, targetLang, sourceLang } = await req.json();
  const apiKey = process.env.DEEPL_API_KEY;

  const res = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    },
    body: new URLSearchParams({
      auth_key: apiKey ?? '',
      text,
      target_lang: targetLang ?? 'TR',
      source_lang: sourceLang ?? 'EN',
    }),
  });

  const data = await res.json();
  return NextResponse.json({ translation: data.translations[0].text });
}
