const API_BASE = '/.netlify/functions';

export async function generateBlogPost(title: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE}/generate-blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'ブログ生成に失敗しました');
    }

    if (!data.content) {
      throw new Error('生成されたコンテンツが空です');
    }

    return data.content;
  } catch (error) {
    console.error('Error generating blog content:', error);
    throw new Error(
      `ブログ記事の生成に失敗しました: ${error instanceof Error ? error.message : 'ネットワークエラー'}`
    );
  }
}

export async function generateBlogTitle(topic: string): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE}/generate-blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: topic, type: 'titles' }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'タイトル生成に失敗しました');
    }

    return data.titles || [];
  } catch (error) {
    console.error('Error generating titles:', error);
    throw new Error('タイトルの生成に失敗しました。');
  }
}
