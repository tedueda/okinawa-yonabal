-- ============================================
-- Supabase 完全セットアップSQL
-- ============================================
-- このSQLをSupabaseのSQL Editorで実行してください

-- 1. 既存のテーブルを削除（もし存在する場合）
DROP TABLE IF EXISTS blog_posts CASCADE;

-- 2. blog_postsテーブルを作成
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Ocean View Ryukyu Tower',
  image_url TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. インデックスを作成（検索を高速化）
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);

-- 4. 更新日時を自動更新するトリガー
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

-- 5. Row Level Security (RLS) を有効化
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 6. RLSポリシーを作成

-- 公開記事は誰でも閲覧可能
CREATE POLICY "公開記事は誰でも閲覧可能"
ON blog_posts
FOR SELECT
TO public
USING (published = true);

-- 誰でも記事を作成可能（開発用）
CREATE POLICY "誰でも記事を作成可能"
ON blog_posts
FOR INSERT
TO public
WITH CHECK (true);

-- 誰でも記事を更新可能（開発用）
CREATE POLICY "誰でも記事を更新可能"
ON blog_posts
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- 誰でも記事を削除可能（開発用）
CREATE POLICY "誰でも記事を削除可能"
ON blog_posts
FOR DELETE
TO public
USING (true);

-- 7. サンプルデータを挿入
INSERT INTO blog_posts (title, content, author, image_url, published) VALUES
  (
    '沖縄東海岸オーシャンビュー民泊で激安一人旅！釣りも楽しめる絶景スポット',
    '沖縄東海岸の絶景オーシャンビュー民泊をご紹介。一人旅でも激安価格で宿泊可能。釣りスポットも近く、斎場御嶽へのアクセスも抜群。与那原町の隠れ家的民泊で、プライベートな時間をお過ごしください。海を眺めながらの朝食は格別です。',
    'Ocean View Ryukyu Tower',
    'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
    true
  ),
  (
    '斎場御嶽観光の拠点に最適！沖縄南部の激安オーシャンビュー民泊',
    '世界遺産・斎場御嶽へ車で15分。沖縄南部観光の拠点として最適な民泊施設です。東海岸の美しいオーシャンビューを独り占め。一人旅から家族旅行まで、激安価格でご提供。釣り好きにもおすすめの立地です。',
    'Ocean View Ryukyu Tower',
    'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    true
  ),
  (
    '沖縄で釣り三昧！オーシャンビュー民泊から徒歩で釣りスポットへ',
    '釣り愛好家必見！沖縄東海岸の民泊から徒歩圏内に絶好の釣りスポット。朝日を浴びながらの釣りは最高の体験。一人旅でも気軽に泊まれる激安価格。オーシャンビューの部屋で釣果を眺めながらのんびり過ごせます。',
    'Ocean View Ryukyu Tower',
    'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
    true
  );

-- 8. 確認用クエリ
SELECT * FROM blog_posts ORDER BY created_at DESC;

-- ============================================
-- セットアップ完了
-- ============================================
-- 上記のSQLを実行後、以下を確認してください：
-- 1. Table Editorで blog_posts テーブルが表示される
-- 2. 3件のサンプルデータが入っている
-- 3. Authentication → Policies でポリシーが設定されている
-- ============================================
