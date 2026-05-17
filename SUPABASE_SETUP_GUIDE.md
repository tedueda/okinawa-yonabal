# Supabase セットアップガイド

## 概要

ブログ記事をSupabaseデータベースに保存するための設定ガイドです。

## 1. Supabaseプロジェクトの作成

### 手順

1. [Supabase](https://supabase.com/)にアクセス
2. 「Start your project」をクリック
3. GitHubアカウントでサインイン
4. 「New project」をクリック
5. 以下を入力：
   - **Name**: ocean-view-blog（任意）
   - **Database Password**: 強力なパスワードを生成（保存しておく）
   - **Region**: Northeast Asia (Tokyo)
   - **Pricing Plan**: Free（無料プラン）
6. 「Create new project」をクリック
7. プロジェクトの作成を待つ（1-2分）

## 2. データベーステーブルの作成

### 手順

1. Supabaseダッシュボードで「Table Editor」を開く
2. 「Create a new table」をクリック
3. 以下を入力：
   - **Name**: `blog_posts`
   - **Description**: ブログ記事
4. 「Add column」で以下のカラムを追加：

| Column Name | Type | Default Value | Primary | Nullable |
|------------|------|---------------|---------|----------|
| id | uuid | gen_random_uuid() | ✓ | ✗ |
| created_at | timestamptz | now() | ✗ | ✗ |
| title | text | - | ✗ | ✗ |
| content | text | - | ✗ | ✗ |
| author | text | Ocean View Ryukyu Tower | ✗ | ✗ |
| image_url | text | - | ✗ | ✓ |
| published | bool | true | ✗ | ✗ |

5. 「Save」をクリック

### SQLで作成する場合

「SQL Editor」を開いて以下を実行：

```sql
-- ブログ投稿テーブルの作成
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Ocean View Ryukyu Tower',
  image_url TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- インデックスの作成
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);

-- 更新日時を自動更新するトリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## 3. Row Level Security (RLS) の設定

### 手順

1. 「Authentication」→「Policies」を開く
2. `blog_posts`テーブルを選択
3. 「Enable RLS」をクリック
4. 以下のポリシーを追加：

#### 読み取りポリシー（全員）

```sql
CREATE POLICY "公開記事は誰でも閲覧可能"
ON blog_posts
FOR SELECT
USING (published = true);
```

#### 書き込みポリシー（認証不要版 - 開発用）

**注意**: 本番環境では認証を実装すべきです

```sql
CREATE POLICY "誰でも記事を作成・更新・削除可能"
ON blog_posts
FOR ALL
USING (true)
WITH CHECK (true);
```

## 4. API認証情報の取得

### 手順

1. Supabaseダッシュボードで「Settings」→「API」を開く
2. 以下をコピー：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 5. 環境変数の設定

### ローカル開発環境

`.env`ファイルを開いて以下を追加：

```env
# Supabase設定
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# OpenAI API設定（既に設定済み）
VITE_OPENAI_API_KEY=sk-proj-xxxxx
```

### Netlify本番環境

1. Netlify → Site settings → Environment variables
2. 以下を追加：
   - `VITE_SUPABASE_URL` = `https://xxxxx.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. 再デプロイ

## 6. 動作確認

### ローカルでテスト

```bash
npm run dev
```

1. http://localhost:5173/blog/admin にアクセス
2. 記事を作成
3. http://localhost:5173/blog で確認

### Supabaseダッシュボードで確認

1. 「Table Editor」→「blog_posts」を開く
2. 作成した記事が表示されているか確認

## 7. サンプルデータの挿入（オプション）

Supabaseの「SQL Editor」で以下を実行：

```sql
INSERT INTO blog_posts (title, content, author, image_url, published) VALUES
  ('沖縄東海岸オーシャンビュー民泊で激安一人旅！釣りも楽しめる絶景スポット', '沖縄東海岸の絶景オーシャンビュー民泊をご紹介。一人旅でも激安価格で宿泊可能。釣りスポットも近く、斎場御嶽へのアクセスも抜群。与那原町の隠れ家的民泊で、プライベートな時間をお過ごしください。海を眺めながらの朝食は格別です。', 'Ocean View Ryukyu Tower', 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800', true),
  ('斎場御嶽観光の拠点に最適！沖縄南部の激安オーシャンビュー民泊', '世界遺産・斎場御嶽へ車で15分。沖縄南部観光の拠点として最適な民泊施設です。東海岸の美しいオーシャンビューを独り占め。一人旅から家族旅行まで、激安価格でご提供。釣り好きにもおすすめの立地です。', 'Ocean View Ryukyu Tower', 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800', true),
  ('沖縄で釣り三昧！オーシャンビュー民泊から徒歩で釣りスポットへ', '釣り愛好家必見！沖縄東海岸の民泊から徒歩圏内に絶好の釣りスポット。朝日を浴びながらの釣りは最高の体験。一人旅でも気軽に泊まれる激安価格。オーシャンビューの部屋で釣果を眺めながらのんびり過ごせます。', 'Ocean View Ryukyu Tower', 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800', true);
```

## トラブルシューティング

### エラー: "Failed to fetch"

**原因**: Supabase URLまたはAPIキーが間違っている

**解決方法**:
1. `.env`ファイルの設定を確認
2. Supabaseダッシュボードで正しい値をコピー
3. 開発サーバーを再起動

### エラー: "new row violates row-level security policy"

**原因**: RLSポリシーが正しく設定されていない

**解決方法**:
1. Supabaseダッシュボードで「Authentication」→「Policies」を開く
2. `blog_posts`テーブルのポリシーを確認
3. 上記のポリシーを追加

### 記事が表示されない

**確認事項**:
1. Supabaseダッシュボードで記事が保存されているか確認
2. `published`カラムが`true`になっているか確認
3. ブラウザのコンソールでエラーを確認

## セキュリティ上の注意

### 本番環境での推奨設定

1. **認証の実装**
   - Supabase Authenticationを使用
   - 管理画面にログイン機能を追加

2. **RLSポリシーの厳格化**
   ```sql
   -- 認証済みユーザーのみ作成・更新・削除可能
   CREATE POLICY "認証済みユーザーのみ編集可能"
   ON blog_posts
   FOR ALL
   USING (auth.role() = 'authenticated')
   WITH CHECK (auth.role() = 'authenticated');
   ```

3. **APIキーの保護**
   - anon keyは公開されても問題ない
   - service_role keyは絶対に公開しない

## まとめ

Supabaseを使うことで：
- ✅ データの永続化
- ✅ 複数デバイスからアクセス可能
- ✅ バックアップ自動化
- ✅ スケーラブル
- ✅ 無料プランで十分な容量

LocalStorageと違い、ブラウザのキャッシュクリアでデータが消えることはありません！
