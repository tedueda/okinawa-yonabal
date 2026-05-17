# Supabase Storage セットアップガイド（画像アップロード用）

## 概要

ブログ記事の画像をSupabase Storageにアップロードするための設定ガイドです。

## 1. Supabase Storageバケットの作成

### ステップ1: Storageを開く

1. Supabaseダッシュボードにログイン
2. あなたのプロジェクト（`ocean-view-blog`など）を開く
3. 左サイドバーで **Storage**（フォルダアイコン）をクリック

### ステップ2: 新しいバケットを作成

1. 「**Create a new bucket**」ボタンをクリック
2. 以下を入力：

#### バケット名
```
blog-images
```

#### Public bucket
✅ **チェックを入れる**（重要！）

これにより、アップロードした画像が公開URLでアクセス可能になります。

3. 「**Create bucket**」ボタンをクリック

✅ **完了**: `blog-images`バケットが作成されました

---

## 2. バケットのポリシー設定

### ステップ1: Policiesを開く

1. 作成した`blog-images`バケットをクリック
2. 右上の「**Policies**」タブをクリック

### ステップ2: アップロードポリシーを追加

#### 方法A: New Policyから作成

1. 「**New Policy**」ボタンをクリック
2. 「**For full customization**」を選択
3. 以下を入力：

**Policy name**:
```
誰でも画像をアップロード可能
```

**Allowed operation**:
- ✅ INSERT
- ✅ SELECT

**Target roles**:
```
public
```

**Policy definition (USING)**:
```sql
true
```

**WITH CHECK expression**:
```sql
true
```

4. 「**Review**」→「**Save policy**」をクリック

#### 方法B: SQLで作成（推奨・簡単）

1. Supabaseダッシュボードで「**SQL Editor**」を開く
2. 以下のSQLをコピー&ペースト：

```sql
-- blog-imagesバケットへのアップロードを許可
CREATE POLICY "誰でも画像をアップロード可能"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'blog-images');

-- blog-imagesバケットからの読み取りを許可
CREATE POLICY "誰でも画像を閲覧可能"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');

-- blog-imagesバケットの画像を更新可能
CREATE POLICY "誰でも画像を更新可能"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'blog-images')
WITH CHECK (bucket_id = 'blog-images');

-- blog-imagesバケットの画像を削除可能
CREATE POLICY "誰でも画像を削除可能"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'blog-images');
```

3. 「**Run**」ボタンをクリック
4. 「Success」と表示されたら完了

✅ **完了**: ポリシーが設定されました

---

## 3. 動作確認

### ローカルでテスト

1. 開発サーバーを起動：
```bash
npm run dev
```

2. http://localhost:5174/blog/admin にアクセス

3. 新規記事作成

4. 「画像を選択」ボタンをクリック

5. 画像ファイルを選択（JPEG、PNG、WebPなど）

6. プレビューが表示される

7. 「保存」ボタンをクリック

8. Supabaseダッシュボードで確認：
   - Storage → blog-images
   - アップロードした画像が表示される

### 本番環境でテスト

1. Netlifyにデプロイ

2. https://okinawa-yonabal.com/blog/admin にアクセス

3. 同様に画像をアップロード

4. ブログページで画像が表示されるか確認

---

## 4. ストレージ容量

### 無料プランの制限

- **容量**: 1GB
- **転送量**: 2GB/月
- **ファイル数**: 無制限

### 容量の確認方法

1. Supabaseダッシュボード
2. Settings → Usage
3. Storage使用量を確認

---

## 5. トラブルシューティング

### エラー: "new row violates row-level security policy"

**原因**: ポリシーが正しく設定されていない

**解決方法**:
1. Storage → blog-images → Policies
2. 上記のSQLを実行してポリシーを追加

---

### エラー: "Bucket not found"

**原因**: バケット名が間違っている

**解決方法**:
1. Storage → バケット一覧を確認
2. バケット名が`blog-images`であることを確認
3. コード内のバケット名を確認

---

### 画像がアップロードされない

**確認事項**:
1. バケットが「Public」になっているか
2. ポリシーが設定されているか
3. ファイルサイズが大きすぎないか（5MB以下推奨）
4. ブラウザのコンソールでエラーを確認

---

### 画像が表示されない

**確認事項**:
1. Supabase Storage → blog-images で画像が保存されているか
2. 画像のURLが正しいか
3. バケットが「Public」になっているか

---

## 6. セキュリティ上の注意

### 本番環境での推奨設定

現在の設定は開発用です。本番環境では以下を推奨：

#### 認証付きアップロード

```sql
-- 認証済みユーザーのみアップロード可能
CREATE POLICY "認証済みユーザーのみアップロード可能"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');
```

#### ファイルサイズ制限

```sql
-- 5MB以下のファイルのみアップロード可能
CREATE POLICY "5MB以下のファイルのみ"
ON storage.objects FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'blog-images' AND
  (storage.foldername(name))[1] = 'blog-images' AND
  octet_length(decode(encode(content, 'base64'), 'base64')) < 5242880
);
```

---

## 7. 画像の最適化（オプション）

### 推奨設定

アップロード前に画像を最適化：

1. **リサイズ**: 横幅800-1200px
2. **圧縮**: JPEG品質80-90%
3. **形式**: WebP（最も軽量）またはJPEG

### オンラインツール

- [TinyPNG](https://tinypng.com/) - 画像圧縮
- [Squoosh](https://squoosh.app/) - 画像最適化
- [Convertio](https://convertio.co/ja/webp-converter/) - WebP変換

---

## まとめ

### 完了したこと

- ✅ Supabase Storageバケット作成
- ✅ 公開設定
- ✅ ポリシー設定
- ✅ 画像アップロード機能

### 使い方

1. 管理画面で「画像を選択」
2. 画像ファイルを選択
3. プレビュー確認
4. 「保存」ボタンをクリック
5. 画像がSupabase Storageに保存される
6. ブログページで画像が表示される

これで画像アップロード機能が使えます！
