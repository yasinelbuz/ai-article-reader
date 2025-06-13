// utils/translate.ts
export async function translateText(text: string, targetLang = 'TR') {
  const apiKey = '6341a57d-cc20-442e-a4dc-ce367303c548:fx';

  const response = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    },
    body: new URLSearchParams({
      auth_key: apiKey ?? '',
      text,
      target_lang: targetLang,
      source_lang: 'EN',
    }),
  });

  const data = await response.json();
  return data.translations[0].text as string;
}
