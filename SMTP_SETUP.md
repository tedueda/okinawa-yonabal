# Yahoo! + Xサーバー 複合メール設定

このプロジェクトでは、お問い合わせフォームのメール送信に **Yahoo!メール** と **Xサーバーメール** の両方を使用しています。

## 現在の構成

- **サイト本体**: Vite + React + TypeScript
- **デプロイ先**: Netlify
- **メール送信**: Netlify Functions + nodemailer + 複数SMTP
- **送信方法**:
  - Yahoo!メール → `rikasogabe@yahoo.co.jp` へ送信
  - Xサーバーメール → `info@okinawa-yonabal.com` へ送信
  - 自動返信はYahoo!メールから送信
- **Reply-To**: お客様が入力したメールアドレス

## SMTP 設定情報

### Yahoo!メール（メイン）
```
ホスト: smtp.mail.yahoo.co.jp
ポート: 465 (SSL/TLS)
ユーザー名: rikasogabe@yahoo.co.jp
パスワード: Yahoo!アプリパスワード（要取得）
```

### Xサーバーメール（サブ）
```
ホスト: sv14645.xserver.jp
ポート: 465 (SSL/TLS)
ユーザー名: info@okinawa-yonabal.com
パスワード: 3831@Ueda
```

## 1. 環境変数の設定

### ローカル開発環境

`.env` ファイルを作成:

```bash
cp .env.example .env
```

以下の値を設定:

```env
# Yahoo!メール
YAHOO_SMTP_HOST=smtp.mail.yahoo.co.jp
YAHOO_SMTP_PORT=465
YAHOO_SMTP_USER=rikasogabe@yahoo.co.jp
YAHOO_SMTP_PASS=your_yahoo_app_password

# Xサーバーメール
XSERVER_SMTP_HOST=sv14645.xserver.jp
XSERVER_SMTP_PORT=465
XSERVER_SMTP_USER=info@okinawa-yonabal.com
XSERVER_SMTP_PASS=3831@Ueda
```

**重要**: `.env` ファイルは `.gitignore` に含まれているため、Git にコミットされません。パスワードが公開されないよう注意してください。

### Netlify 環境変数

1. Netlify ダッシュボード → 対象サイト → **Site configuration** → **Environment variables**
2. 以下の8つを追加:

```
# Yahoo!メール
YAHOO_SMTP_HOST=smtp.mail.yahoo.co.jp
YAHOO_SMTP_PORT=465
YAHOO_SMTP_USER=rikasogabe@yahoo.co.jp
YAHOO_SMTP_PASS=your_yahoo_app_password

# Xサーバーメール
XSERVER_SMTP_HOST=sv14645.xserver.jp
XSERVER_SMTP_PORT=465
XSERVER_SMTP_USER=info@okinawa-yonabal.com
XSERVER_SMTP_PASS=3831@Ueda
```

## 2. Yahoo!アプリパスワードの取得

Yahoo!メールで SMTP を使用するには、**アプリパスワード**が必要です。

### 手順

1. Yahoo! JAPAN にログイン: https://login.yahoo.co.jp/
2. **アカウント情報** → **セキュリティ** → **アプリパスワードの生成**
3. アプリ名を入力（例: `Ocean View Contact Form`）
4. **生成** をクリック
5. 表示された16桁のパスワードをコピー
6. `.env` の `YAHOO_SMTP_PASS` に設定

**注意**: 
- アプリパスワードは一度しか表示されないので、必ずコピーしてください
- Yahoo!のログインパスワードとは異なります
- 2段階認証が有効になっている必要があります

### 2段階認証の有効化（未設定の場合）

1. Yahoo! JAPAN → **アカウント情報** → **セキュリティ**
2. **2段階認証** → **設定する**
3. 携帯電話番号を登録
4. SMS で受信した確認コードを入力

## 3. 実装箇所

### フロントエンド
- **お問い合わせフォーム**: `src/components/ContactForm.tsx`
  - フォーム入力とバリデーション
  - Netlify Functions API を呼び出し

### バックエンド
- **Netlify Functions**: `netlify/functions/contact.ts`
  - nodemailer で SMTP 経由メール送信
  - 管理者向けメールと自動返信メールの2通を送信

## 4. メール送信の流れ

1. お客様がフォームに入力して送信
2. `ContactForm` が `/.netlify/functions/contact` に POST リクエスト
3. Netlify Functions が2つの SMTP サーバーに接続:
   - **Yahoo! SMTP** → `rikasogabe@yahoo.co.jp` へ送信
   - **Xサーバー SMTP** → `info@okinawa-yonabal.com` へ送信
4. 両方のメールが並行して送信される（`Promise.all`）
5. **お客様向け自動返信メール**を Yahoo! SMTP から送信

## 4. テスト方法

### ローカルでテスト

Netlify CLI を使ってローカルで Functions をテスト:

```bash
# Netlify CLI をインストール（未インストールの場合）
npm install -g netlify-cli

# ローカルで開発サーバー + Functions を起動
netlify dev
```

ブラウザで `http://localhost:8888/contact` にアクセスしてフォーム送信テスト

### 本番環境でテスト

1. Netlify にデプロイ
2. `https://okinawa-yonabal.com/contact` でフォーム送信テスト
3. メールが届くか確認

## 5. よくある問題

### メールが届かない

1. **Netlify 環境変数を確認**
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` が正しく設定されているか確認

2. **Netlify Functions のログを確認**
   - Netlify ダッシュボード → **Functions** → **contact** → **Logs**
   - エラーメッセージを確認

3. **迷惑メールフォルダを確認**
   - Gmail/Yahoo の迷惑メールフォルダをチェック

4. **SMTP 認証エラー**
   - Xサーバーのメールアカウントが有効か確認
   - パスワードが正しいか確認

### 自動返信メールだけ届かない

- お客様が入力したメールアドレスが正しいか確認
- 迷惑メールフォルダを確認

### Netlify Functions がデプロイされない

- `netlify.toml` に `[functions]` セクションがあるか確認
- `netlify/functions/contact.ts` が存在するか確認
- Netlify のビルドログでエラーを確認

## 6. セキュリティ

### パスワード管理

- ✅ `.env` ファイルは `.gitignore` に含まれている
- ✅ Netlify 環境変数は暗号化されて保存される
- ❌ **絶対に** `.env` や SMTP パスワードを Git にコミットしない
- ❌ **絶対に** パスワードをソースコードにハードコードしない

### SMTP 認証情報の保護

- SMTP 認証情報はサーバーサイド（Netlify Functions）でのみ使用
- フロントエンドには公開されない
- ブラウザから直接 SMTP サーバーに接続しない

## 7. 受信先メールアドレスの変更

`netlify/functions/contact.ts` の以下を変更:

```typescript
to: ['rikasogabe@yahoo.co.jp', 'info@okinawa-yonabal.com'],
```

複数の宛先を追加する場合は配列に追加:

```typescript
to: ['rikasogabe@yahoo.co.jp', 'info@okinawa-yonabal.com', 'another@example.com'],
```

## 8. メール本文のカスタマイズ

`netlify/functions/contact.ts` の `adminMailOptions` と `customerMailOptions` の `html` フィールドを編集してください。

## 9. トラブルシューティング

### Netlify Functions のログ確認

```bash
# Netlify CLI でログをリアルタイム表示
netlify functions:log contact
```

### ローカルでデバッグ

```bash
# Netlify Dev でローカル実行
netlify dev

# ブラウザで http://localhost:8888/contact にアクセス
# コンソールにエラーが表示される
```

## 10. 料金

- **Xサーバー SMTP**: 無料（Xサーバー契約に含まれる）
- **Netlify Functions**: 月125,000リクエストまで無料
- **nodemailer**: 無料（オープンソース）

通常のお問い合わせフォームなら完全無料で運用できます。

## 11. デプロイ手順

1. `.env` ファイルにローカル用の SMTP 設定を追加
2. Netlify 環境変数に本番用の SMTP 設定を追加
3. `npm run build` でビルド
4. Netlify にデプロイ（自動または手動）
5. `/contact` ページでフォーム送信テスト

## 参考情報

- [nodemailer 公式ドキュメント](https://nodemailer.com/)
- [Netlify Functions ドキュメント](https://docs.netlify.com/functions/overview/)
- [Xサーバー メール設定](https://www.xserver.ne.jp/manual/man_mail_setting.php)
