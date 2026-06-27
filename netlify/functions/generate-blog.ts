import { Handler } from '@netlify/functions';
import OpenAI from 'openai';

const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'OpenAI APIキーがサーバーに設定されていません' }),
    };
  }

  try {
    const { title, type } = JSON.parse(event.body || '{}');

    if (!title) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'タイトルが必要です' }),
      };
    }

    const openai = new OpenAI({ apiKey });

    if (type === 'titles') {
      // タイトル生成モード
      const prompt = `
沖縄のオーシャンビュー民泊「Ocean View Ryukyu Tower」のブログタイトルを3つ提案してください。

テーマ: ${title}

要件:
- SEOを意識したキーワード（沖縄、オーシャンビュー、東海岸、斎場御嶽、釣り、一人旅、民泊など）を含める
- 魅力的で具体的
- 30-60文字程度

3つのタイトルを箇条書きで出力してください。
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 500,
      });

      const content = response.choices[0]?.message?.content || '';
      const titles = content
        .split('\n')
        .filter((line: string) => line.trim().length > 0)
        .map((line: string) => line.replace(/^[-*•\d.]\s*/, '').trim())
        .filter((line: string) => line.length > 10);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ titles: titles.slice(0, 3) }),
      };
    }

    // ブログ記事生成モード
    const prompt = `
あなたは沖縄のオーシャンビュー民泊「Ocean View Ryukyu Tower」のブログライターです。
以下のタイトルで、魅力的で具体的なブログ記事を1000文字程度で作成してください。

タイトル: ${title}

記事の要件:
- 沖縄、オーシャンビュー、東海岸、与那原町、斎場御嶽、釣り、一人旅、民泊などのキーワードを自然に含める
- SEOを意識した内容
- 読者が訪れたくなるような具体的な情報を含める
- 親しみやすく、わかりやすい文章
- 1000文字程度

記事本文のみを出力してください（タイトルは含めない）。
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'あなたは沖縄の民泊施設のプロフェッショナルなブログライターです。魅力的で具体的な記事を書くことが得意です。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content || '';

    if (!content.trim()) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'AIからの応答が空でした。再度お試しください。' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        content: content.trim(),
        usage: response.usage,
      }),
    };
  } catch (error) {
    console.error('Blog generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: `ブログ生成に失敗しました: ${errorMessage}`,
      }),
    };
  }
};

export { handler };
