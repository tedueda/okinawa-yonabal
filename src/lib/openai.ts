import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

let openai: OpenAI | null = null;

if (apiKey) {
  openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // 注意: 本番環境ではバックエンドで実行すべき
  });
}

export async function generateBlogPost(title: string): Promise<string> {
  if (!openai) {
    throw new Error('OpenAI APIキーが設定されていません。.envファイルにVITE_OPENAI_API_KEYを設定してください。');
  }

  try {
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
          content: 'あなたは沖縄の民泊施設のプロフェッショナルなブログライターです。魅力的で具体的な記事を書くことが得意です。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = response.choices[0]?.message?.content || '';
    return content.trim();
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw new Error('ブログ記事の生成に失敗しました。APIキーを確認してください。');
  }
}

export async function generateBlogTitle(topic: string): Promise<string[]> {
  if (!openai) {
    throw new Error('OpenAI APIキーが設定されていません。.envファイルにVITE_OPENAI_API_KEYを設定してください。');
  }

  try {
    const prompt = `
沖縄のオーシャンビュー民泊「Ocean View Ryukyu Tower」のブログタイトルを3つ提案してください。

テーマ: ${topic}

要件:
- SEOを意識したキーワード（沖縄、オーシャンビュー、東海岸、斎場御嶽、釣り、一人旅、民泊など）を含める
- 魅力的で具体的
- 30-60文字程度

3つのタイトルを箇条書きで出力してください。
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 500
    });

    const content = response.choices[0]?.message?.content || '';
    const titles = content
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.replace(/^[-*•]\s*/, '').trim())
      .filter(line => line.length > 10);
    
    return titles.slice(0, 3);
  } catch (error) {
    console.error('Error generating titles:', error);
    throw new Error('タイトルの生成に失敗しました。');
  }
}
