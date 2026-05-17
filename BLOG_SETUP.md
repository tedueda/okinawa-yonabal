# ブログ自動アップシステム セットアップガイド

## 概要
このシステムは、Supabaseを使用したブログ自動投稿システムです。管理者がSupabaseのダッシュボードから記事を投稿すると、自動的にウェブサイトに反映されます。

## 機能
- ブログ記事の自動表示
- 画像付き記事対応
- 投稿日時の自動管理
- レスポンシブデザイン
- 公開/非公開の切り替え

## セットアップ手順

### 1. Supabaseプロジェクトの作成
1. [Supabase](https://supabase.com)にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトのURLとAnon Keyをメモ

### 2. データベースのセットアップ
1. Supabaseダッシュボードで「SQL Editor」を開く
2. `supabase-schema.sql`の内容をコピー&ペースト
3. 実行してテーブルを作成

### 3. 環境変数の設定
1. `.env.example`を`.env`にコピー
2. 以下の値を設定:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 依存関係のインストール
```bash
npm install
```

### 5. 開発サーバーの起動
```bash
npm run dev
```

## ブログ記事の投稿方法

### Supabaseダッシュボードから投稿
1. Supabaseダッシュボードで「Table Editor」を開く
2. `blog_posts`テーブルを選択
3. 「Insert」→「Insert row」をクリック
4. 以下の項目を入力:
   - `title`: 記事タイトル
   - `content`: 記事本文
   - `author`: 著者名（デフォルト: Ocean View Ryukyu Tower）
   - `image_url`: 画像URL（オプション）
   - `published`: 公開状態（true/false）
5. 「Save」をクリック

### 推奨画像サイズ
- 横幅: 800px以上
- アスペクト比: 16:9 または 4:3
- フォーマット: JPEG, PNG

## 自動更新の仕組み
- 記事を投稿すると、自動的に`created_at`が設定されます
- 記事は新しい順に表示されます
- `published`がtrueの記事のみ表示されます

## カスタマイズ

### デザインの変更
`src/components/Blog.tsx`を編集してデザインをカスタマイズできます。

### 表示件数の変更
`src/lib/supabase.ts`の`getBlogPosts()`関数で`.limit()`を追加:
```typescript
.limit(10) // 最新10件のみ表示
```

### カテゴリー機能の追加
データベースに`category`カラムを追加し、フィルタリング機能を実装できます。

## トラブルシューティング

### 記事が表示されない
- `.env`ファイルが正しく設定されているか確認
- Supabaseのプロジェクトが起動しているか確認
- ブラウザのコンソールでエラーを確認

### 画像が表示されない
- 画像URLが正しいか確認
- 画像URLがHTTPSであることを確認
- CORS設定を確認

## セキュリティ
- Row Level Security (RLS)が有効化されています
- 公開記事は誰でも閲覧可能
- 記事の作成・編集・削除は認証済みユーザーのみ可能

## サポート
問題が発生した場合は、Ocean View Ryukyu Towerまでお問い合わせください。
