# ブログAI自動生成機能 セットアップガイド

## 概要

ChatGPT APIを使用して、タイトルを入力するだけで1000文字のブログ記事を自動生成する機能です。

## 機能

1. **AI記事生成**
   - タイトルを入力
   - 「AI生成」ボタンをクリック
   - ChatGPTが1000文字のSEO最適化された記事を自動生成

2. **画像アップロード**
   - 記事のトップ画像をアップロード
   - プレビュー表示
   - 推奨サイズ: 横幅800px以上

3. **記事編集**
   - AI生成後に内容を編集可能
   - 文字数カウント表示

4. **公開管理**
   - 公開/非公開の切り替え
   - 下書き保存

## セットアップ手順

### 1. OpenAI APIキーの取得

1. [OpenAI Platform](https://platform.openai.com/)にアクセス
2. アカウントを作成（または既存アカウントでログイン）
3. 「API keys」セクションに移動
4. 「Create new secret key」をクリック
5. APIキーをコピー（**一度しか表示されません**）

### 2. 環境変数の設定

1. プロジェクトルートに `.env` ファイルを作成
2. 以下を追加：

```env
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**重要**: `.env` ファイルは `.gitignore` に含まれているため、Gitにコミットされません。

### 3. 料金について

OpenAI APIは従量課金制です：

- **GPT-4o-mini**: $0.15 / 1M input tokens, $0.60 / 1M output tokens
- 1000文字のブログ記事生成: 約$0.001-0.002（約0.1-0.2円）

**推奨**: 
- 使用量制限を設定（OpenAIダッシュボード）
- 月額上限を設定

### 4. 画像アップロード設定（オプション）

現在はBase64として保存されますが、本番環境では以下を推奨：

#### Cloudinaryの使用（推奨）

1. [Cloudinary](https://cloudinary.com/)でアカウント作成
2. Upload Presetを作成
3. `BlogAdminNew.tsx` の以下を更新：

```typescript
formData.append('upload_preset', 'your_upload_preset');
// ...
'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload'
```

#### Supabase Storageの使用

```typescript
const { data, error } = await supabase.storage
  .from('blog-images')
  .upload(`${Date.now()}-${file.name}`, file);
```

## 使い方

### 1. 管理画面にアクセス

```
https://okinawa-yonabal.com/blog/admin
```

### 2. 新規記事作成

1. 「新規記事作成」ボタンをクリック
2. タイトルを入力
   - 例: 「沖縄東海岸の絶景スポット紹介」
3. 「AI生成」ボタンをクリック
4. 数秒待つと、1000文字の記事が自動生成されます

### 3. 画像アップロード

1. 「画像を選択」ボタンをクリック
2. 画像ファイルを選択
3. プレビューが表示されます

### 4. 記事の編集

- 生成された記事を確認
- 必要に応じて編集
- 文字数が表示されます

### 5. 保存

1. 「公開する」にチェック（即座に公開）
2. 「保存」ボタンをクリック

## AI生成のカスタマイズ

`src/lib/openai.ts` でプロンプトをカスタマイズできます：

```typescript
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
`;
```

### パラメータ調整

```typescript
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini', // モデルを変更可能（gpt-4, gpt-4-turbo等）
  temperature: 0.7,     // 0-1: 低いほど一貫性、高いほど創造性
  max_tokens: 2000      // 最大トークン数
});
```

## トラブルシューティング

### APIキーエラー

```
Error: Incorrect API key provided
```

**解決方法**:
1. `.env` ファイルが正しい場所にあるか確認
2. APIキーが正しいか確認
3. 開発サーバーを再起動

### 記事が生成されない

**確認事項**:
1. インターネット接続
2. OpenAI APIの利用可能残高
3. ブラウザのコンソールでエラーを確認

### 画像がアップロードできない

**解決方法**:
1. ファイルサイズを確認（5MB以下推奨）
2. 画像形式を確認（JPEG, PNG, WebP）
3. Cloudinary設定を確認

## セキュリティ上の注意

### ⚠️ 重要

1. **APIキーを公開しない**
   - `.env` ファイルをGitにコミットしない
   - フロントエンドでAPIキーを使用するのは開発環境のみ

2. **本番環境での推奨構成**
   - バックエンドサーバーを構築
   - APIキーはサーバー側で管理
   - フロントエンドからはバックエンド経由でOpenAI APIを呼び出す

### 推奨アーキテクチャ（本番環境）

```
フロントエンド → バックエンドAPI → OpenAI API
              ↑
           APIキーを安全に管理
```

## コスト管理

### 使用量の監視

1. [OpenAI Usage Dashboard](https://platform.openai.com/usage)で確認
2. 月額上限を設定

### コスト削減のヒント

1. **モデルの選択**
   - gpt-4o-mini: 最もコスト効率が良い
   - gpt-4: 高品質だが高価

2. **プロンプトの最適化**
   - 簡潔なプロンプト
   - 不要な指示を削除

3. **キャッシュの活用**
   - 同じタイトルの記事は再生成しない

## まとめ

このAI自動生成機能により：
- ✅ ブログ記事作成時間を大幅短縮
- ✅ SEO最適化された高品質な記事
- ✅ 一貫性のあるトーン＆スタイル
- ✅ 定期的な更新が容易

定期的にブログを更新して、SEO効果を最大化しましょう！
