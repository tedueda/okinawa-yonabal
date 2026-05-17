# Supabase 詳細セットアップガイド（初心者向け）

## 📋 目次

1. [Supabaseとは？](#supabaseとは)
2. [アカウント作成](#1-アカウント作成)
3. [プロジェクト作成](#2-プロジェクト作成)
4. [データベーステーブル作成](#3-データベーステーブル作成)
5. [セキュリティ設定](#4-セキュリティ設定)
6. [API認証情報の取得](#5-api認証情報の取得)
7. [環境変数の設定](#6-環境変数の設定)
8. [動作確認](#7-動作確認)

---

## Supabaseとは？

Supabaseは、無料で使えるデータベースサービスです。

**メリット**:
- ✅ 無料プランで十分な容量（500MB）
- ✅ データが消えない（サーバーに保存）
- ✅ 複数のデバイスからアクセス可能
- ✅ 自動バックアップ
- ✅ 設定が簡単

---

## 1. アカウント作成

### ステップ1: Supabaseにアクセス

1. ブラウザで https://supabase.com/ を開く
2. 右上の「Start your project」ボタンをクリック

### ステップ2: GitHubでサインイン

1. 「Sign in with GitHub」をクリック
2. GitHubアカウントでログイン
   - GitHubアカウントがない場合は、先に https://github.com/ で作成
3. Supabaseへのアクセスを許可

✅ **完了**: Supabaseダッシュボードが表示されます

---

## 2. プロジェクト作成

### ステップ1: 新規プロジェクト作成

1. ダッシュボードで「New project」ボタンをクリック
2. Organizationを選択（初回は自動作成されます）

### ステップ2: プロジェクト情報を入力

以下の情報を入力してください：

#### **Name（プロジェクト名）**
```
ocean-view-blog
```
または任意の名前（英数字とハイフンのみ）

#### **Database Password（データベースパスワード）**
1. 「Generate a password」ボタンをクリック
2. 自動生成されたパスワードをコピー
3. **重要**: パスワードをメモ帳などに保存（後で使います）

例: `Abc123XyzDef456Ghi789`

#### **Region（地域）**
```
Northeast Asia (Tokyo)
```
を選択（日本に最も近いサーバー）

#### **Pricing Plan（料金プラン）**
```
Free（無料）
```
を選択

### ステップ3: プロジェクト作成

1. 「Create new project」ボタンをクリック
2. プロジェクトの作成を待つ（1-2分かかります）
3. 「Project is ready」と表示されたら完了

✅ **完了**: プロジェクトが作成されました

---

## 3. データベーステーブル作成

### 方法A: SQL Editorを使う（推奨・簡単）

#### ステップ1: SQL Editorを開く

1. 左サイドバーで「SQL Editor」をクリック
2. 「New query」をクリック

#### ステップ2: SQLコードをコピー&ペースト

以下のコードをコピーして、SQL Editorに貼り付けてください：

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

-- インデックスの作成（検索を高速化）
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

-- サンプルデータの挿入
INSERT INTO blog_posts (title, content, author, image_url, published) VALUES
  ('沖縄東海岸オーシャンビュー民泊で激安一人旅！釣りも楽しめる絶景スポット', '沖縄東海岸の絶景オーシャンビュー民泊をご紹介。一人旅でも激安価格で宿泊可能。釣りスポットも近く、斎場御嶽へのアクセスも抜群。与那原町の隠れ家的民泊で、プライベートな時間をお過ごしください。海を眺めながらの朝食は格別です。', 'Ocean View Ryukyu Tower', 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800', true),
  ('斎場御嶽観光の拠点に最適！沖縄南部の激安オーシャンビュー民泊', '世界遺産・斎場御嶽へ車で15分。沖縄南部観光の拠点として最適な民泊施設です。東海岸の美しいオーシャンビューを独り占め。一人旅から家族旅行まで、激安価格でご提供。釣り好きにもおすすめの立地です。', 'Ocean View Ryukyu Tower', 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800', true),
  ('沖縄で釣り三昧！オーシャンビュー民泊から徒歩で釣りスポットへ', '釣り愛好家必見！沖縄東海岸の民泊から徒歩圏内に絶好の釣りスポット。朝日を浴びながらの釣りは最高の体験。一人旅でも気軽に泊まれる激安価格。オーシャンビューの部屋で釣果を眺めながらのんびり過ごせます。', 'Ocean View Ryukyu Tower', 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800', true);
```

#### ステップ3: 実行

1. 右下の「Run」ボタンをクリック
2. 「Success. No rows returned」と表示されたら成功

#### ステップ4: 確認

1. 左サイドバーで「Table Editor」をクリック
2. `blog_posts`テーブルが表示されているか確認
3. 3件のサンプルデータが入っているか確認

✅ **完了**: テーブルが作成されました

---

### 方法B: Table Editorを使う（手動）

SQL Editorが難しい場合は、この方法を使ってください。

#### ステップ1: Table Editorを開く

1. 左サイドバーで「Table Editor」をクリック
2. 「Create a new table」ボタンをクリック

#### ステップ2: テーブル名を入力

- **Name**: `blog_posts`
- **Description**: ブログ記事

#### ステップ3: カラムを追加

「Add column」ボタンを何度もクリックして、以下のカラムを追加：

##### カラム1: id
- **Name**: `id`
- **Type**: `uuid`
- **Default Value**: `gen_random_uuid()`
- **Primary**: ✓ チェック
- **Nullable**: チェックなし

##### カラム2: created_at
- **Name**: `created_at`
- **Type**: `timestamptz`
- **Default Value**: `now()`
- **Primary**: チェックなし
- **Nullable**: チェックなし

##### カラム3: title
- **Name**: `title`
- **Type**: `text`
- **Default Value**: 空欄
- **Primary**: チェックなし
- **Nullable**: チェックなし

##### カラム4: content
- **Name**: `content`
- **Type**: `text`
- **Default Value**: 空欄
- **Primary**: チェックなし
- **Nullable**: チェックなし

##### カラム5: author
- **Name**: `author`
- **Type**: `text`
- **Default Value**: `Ocean View Ryukyu Tower`
- **Primary**: チェックなし
- **Nullable**: チェックなし

##### カラム6: image_url
- **Name**: `image_url`
- **Type**: `text`
- **Default Value**: 空欄
- **Primary**: チェックなし
- **Nullable**: ✓ チェック

##### カラム7: published
- **Name**: `published`
- **Type**: `bool`
- **Default Value**: `true`
- **Primary**: チェックなし
- **Nullable**: チェックなし

#### ステップ4: 保存

1. 「Save」ボタンをクリック
2. テーブルが作成されます

✅ **完了**: テーブルが作成されました

---

## 4. セキュリティ設定（Row Level Security）

### ステップ1: RLSを有効化

1. 「Table Editor」で`blog_posts`テーブルを選択
2. 右上の「...」（3点メニュー）をクリック
3. 「Edit table」を選択
4. 「Enable Row Level Security (RLS)」をONにする
5. 「Save」をクリック

### ステップ2: ポリシーを追加

1. 左サイドバーで「Authentication」→「Policies」をクリック
2. `blog_posts`テーブルを探す
3. 「New Policy」ボタンをクリック

#### ポリシー1: 読み取り（全員）

1. 「Create a policy from scratch」を選択
2. 以下を入力：
   - **Policy name**: `公開記事は誰でも閲覧可能`
   - **Allowed operation**: `SELECT`
   - **Target roles**: `public`
   - **USING expression**: `published = true`
3. 「Review」→「Save policy」をクリック

#### ポリシー2: 書き込み（全員 - 開発用）

**注意**: これは開発用の設定です。本番環境では認証を実装してください。

1. 「New Policy」ボタンをクリック
2. 「Create a policy from scratch」を選択
3. 以下を入力：
   - **Policy name**: `誰でも記事を作成・更新・削除可能`
   - **Allowed operation**: `ALL`
   - **Target roles**: `public`
   - **USING expression**: `true`
   - **WITH CHECK expression**: `true`
4. 「Review」→「Save policy」をクリック

✅ **完了**: セキュリティ設定が完了しました

---

## 5. API認証情報の取得

### ステップ1: Settings → APIを開く

1. 左サイドバーで「Settings」（歯車アイコン）をクリック
2. 「API」をクリック

### ステップ2: 情報をコピー

以下の2つをコピーしてメモ帳に保存してください：

#### **Project URL**
```
https://xxxxxxxxxxxxx.supabase.co
```
例: `https://abcdefghijklmnop.supabase.co`

#### **anon public key**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
```
（非常に長い文字列です）

**重要**: 
- `Project URL`と`anon public`の2つをコピー
- `service_role`は**絶対にコピーしない**（危険）

✅ **完了**: API認証情報を取得しました

---

## 6. 環境変数の設定

### ローカル開発環境（あなたのPC）

#### ステップ1: .envファイルを開く

1. プロジェクトフォルダーを開く
   ```
   c:\Users\sogab\OneDrive\デスクトップ\色々\与那原\project
   ```
2. `.env`ファイルをメモ帳で開く

#### ステップ2: Supabase設定を追加

`.env`ファイルに以下を追加（既存の内容は残す）：

```env
# Supabase設定
VITE_SUPABASE_URL=ここにProject URLを貼り付け
VITE_SUPABASE_ANON_KEY=ここにanon public keyを貼り付け

# OpenAI API設定（既に設定済み）
VITE_OPENAI_API_KEY=sk-proj-xxxxx
```

**例**:
```env
# Supabase設定
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDk5NTIwMCwiZXhwIjoxOTU2NTcxMjAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# OpenAI API設定
VITE_OPENAI_API_KEY=sk-proj-xxxxx
```

#### ステップ3: 保存

1. `.env`ファイルを保存
2. ファイルを閉じる

✅ **完了**: ローカル環境の設定が完了しました

---

### Netlify本番環境

#### ステップ1: Netlifyにログイン

1. https://app.netlify.com/ にアクセス
2. あなたのサイトを選択

#### ステップ2: 環境変数を追加

1. 「Site settings」をクリック
2. 左サイドバーで「Environment variables」をクリック
3. 「Add a variable」→「Add a single variable」をクリック

#### ステップ3: VITE_SUPABASE_URLを追加

1. **Key**: `VITE_SUPABASE_URL`
2. **Value**: Supabaseの`Project URL`を貼り付け
3. **Scopes**: すべてにチェック
4. 「Create variable」をクリック

#### ステップ4: VITE_SUPABASE_ANON_KEYを追加

1. 「Add a variable」→「Add a single variable」をクリック
2. **Key**: `VITE_SUPABASE_ANON_KEY`
3. **Value**: Supabaseの`anon public key`を貼り付け
4. **Scopes**: すべてにチェック
5. 「Create variable」をクリック

#### ステップ5: 確認

環境変数が3つあることを確認：
- ✅ `VITE_OPENAI_API_KEY`（既に設定済み）
- ✅ `VITE_SUPABASE_URL`（今追加）
- ✅ `VITE_SUPABASE_ANON_KEY`（今追加）

#### ステップ6: 再デプロイ

1. 「Deploys」タブに移動
2. 「Trigger deploy」→「Deploy site」をクリック
3. デプロイが完了するまで待つ（1-2分）

✅ **完了**: Netlifyの設定が完了しました

---

## 7. 動作確認

### ローカルでテスト

#### ステップ1: 開発サーバーを起動

PowerShellまたはコマンドプロンプトで：

```bash
cd c:\Users\sogab\OneDrive\デスクトップ\色々\与那原\project
npm run dev
```

#### ステップ2: ブログページを確認

1. ブラウザで http://localhost:5173/blog を開く
2. サンプル記事が3件表示されているか確認

#### ステップ3: 管理画面を確認

1. ブラウザで http://localhost:5173/blog/admin を開く
2. サンプル記事が3件表示されているか確認

#### ステップ4: 新規記事を作成

1. 「新規記事作成」ボタンをクリック
2. タイトルを入力: `テスト記事`
3. 「AI生成」ボタンをクリック（OpenAI APIキーが設定されている場合）
4. 「保存」ボタンをクリック
5. 記事が一覧に追加されたか確認

#### ステップ5: Supabaseで確認

1. Supabaseダッシュボードを開く
2. 「Table Editor」→「blog_posts」を開く
3. 作成した記事がデータベースに保存されているか確認

✅ **成功**: ローカル環境で動作しています

---

### 本番環境（Netlify）でテスト

#### ステップ1: サイトにアクセス

1. https://okinawa-yonabal.com/blog を開く
2. サンプル記事が表示されているか確認

#### ステップ2: 管理画面にアクセス

1. https://okinawa-yonabal.com/blog/admin を開く
2. 記事が表示されているか確認

#### ステップ3: 新規記事を作成

1. 「新規記事作成」ボタンをクリック
2. タイトルを入力
3. 「AI生成」ボタンをクリック
4. 「保存」ボタンをクリック
5. ブログページで確認

✅ **成功**: 本番環境で動作しています

---

## トラブルシューティング

### エラー: "Failed to fetch"

**原因**: Supabase URLまたはAPIキーが間違っている

**解決方法**:
1. `.env`ファイルを開く
2. `VITE_SUPABASE_URL`と`VITE_SUPABASE_ANON_KEY`を確認
3. Supabaseダッシュボードで正しい値をコピー
4. 開発サーバーを再起動（Ctrl+Cで停止 → `npm run dev`）

---

### エラー: "new row violates row-level security policy"

**原因**: RLSポリシーが正しく設定されていない

**解決方法**:
1. Supabaseダッシュボードで「Authentication」→「Policies」を開く
2. `blog_posts`テーブルのポリシーを確認
3. 上記の「セキュリティ設定」を再度実行

---

### 記事が表示されない

**確認事項**:
1. Supabaseダッシュボードで「Table Editor」→「blog_posts」を開く
2. データが保存されているか確認
3. `published`カラムが`true`になっているか確認
4. ブラウザのコンソール（F12キー）でエラーを確認

---

### 開発サーバーが起動しない

**解決方法**:
1. PowerShellを管理者として実行
2. プロジェクトフォルダーに移動
3. `npm install`を実行
4. `npm run dev`を実行

---

## まとめ

### 完了したこと

- ✅ Supabaseアカウント作成
- ✅ プロジェクト作成
- ✅ データベーステーブル作成
- ✅ セキュリティ設定
- ✅ API認証情報取得
- ✅ 環境変数設定（ローカル＆Netlify）
- ✅ 動作確認

### 次のステップ

1. ブログ記事を作成
2. AI生成機能を活用
3. 定期的に記事を更新してSEO効果を高める

---

## サポート

問題が発生した場合は、以下を確認してください：

1. `.env`ファイルの設定
2. Supabaseのポリシー設定
3. ブラウザのコンソールエラー
4. Netlifyの環境変数

それでも解決しない場合は、エラーメッセージをコピーして質問してください。
