# デプロイ手順

## 事前準備: Netlify 環境変数の設定

デプロイ前に、Netlify ダッシュボードで以下の環境変数を設定してください。

### 1. Netlify にログイン

https://app.netlify.com/

### 2. サイトを選択

対象サイト（okinawa-yonabal）を選択

### 3. 環境変数を追加

**Site configuration** → **Environment variables** → **Add a variable**

以下の8つを追加:

```
# Yahoo!メール（メイン送信元）
YAHOO_SMTP_HOST=smtp.mail.yahoo.co.jp
YAHOO_SMTP_PORT=465
YAHOO_SMTP_USER=rikasogabe@yahoo.co.jp
YAHOO_SMTP_PASS=【Yahoo!アプリパスワード】

# Xサーバーメール（サブ送信元）
XSERVER_SMTP_HOST=sv14645.xserver.jp
XSERVER_SMTP_PORT=465
XSERVER_SMTP_USER=info@okinawa-yonabal.com
XSERVER_SMTP_PASS=3831@Ueda
```

**重要**: `YAHOO_SMTP_PASS` には Yahoo!アプリパスワードを設定してください。
取得方法は `SMTP_SETUP.md` の「2. Yahoo!アプリパスワードの取得」を参照。

## デプロイ方法

### 方法1: 手動デプロイ（推奨）

1. ビルド済みの `dist/` フォルダを Netlify にドラッグ&ドロップ

2. Netlify ダッシュボード → **Deploys** → **Deploy manually**

3. `dist/` フォルダをドラッグ&ドロップ

### 方法2: Git デプロイ

1. Git にコミット&プッシュ:
```bash
git add .
git commit -m "feat: Yahoo! + Xサーバー複合メール対応"
git push origin main
```

2. Netlify が自動的にデプロイ

## デプロイ後の確認

1. デプロイが完了したら、サイトにアクセス:
   https://okinawa-yonabal.com/contact

2. フォームに入力して送信テスト

3. 以下を確認:
   - ✅ `rikasogabe@yahoo.co.jp` にメールが届く
   - ✅ `info@okinawa-yonabal.com` にメールが届く
   - ✅ 入力したメールアドレスに自動返信が届く

## トラブルシューティング

### メールが届かない場合

1. **Netlify Functions のログを確認**
   - Netlify ダッシュボード → **Functions** → **contact** → **Logs**

2. **環境変数を確認**
   - 8つすべて設定されているか確認
   - `YAHOO_SMTP_PASS` がアプリパスワードになっているか確認

3. **Yahoo!アプリパスワードを再生成**
   - Yahoo! JAPAN → アカウント情報 → セキュリティ → アプリパスワードの生成

### Functions がデプロイされない場合

- `netlify.toml` に `[functions]` セクションがあるか確認
- `netlify/functions/contact.ts` が存在するか確認
- Netlify のビルドログでエラーを確認

## 現在のビルド状態

✅ ビルド成功
✅ `dist/` フォルダ生成済み
✅ Netlify Functions 準備完了

次のステップ: Netlify 環境変数を設定してデプロイ
