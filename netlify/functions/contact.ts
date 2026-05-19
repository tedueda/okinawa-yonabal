import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data: ContactFormData = JSON.parse(event.body || '{}');
    const { name, email, phone, category, message } = data;

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: '必須項目を入力してください' }),
      };
    }

    // SMTP設定 - Yahoo!メール（メイン）
    const yahooTransporter = nodemailer.createTransport({
      host: process.env.YAHOO_SMTP_HOST || 'smtp.mail.yahoo.co.jp',
      port: parseInt(process.env.YAHOO_SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.YAHOO_SMTP_USER || 'rikasogabe@yahoo.co.jp',
        pass: process.env.YAHOO_SMTP_PASS || '',
      },
    });

    // SMTP設定 - Xサーバー（サブ）
    const xserverTransporter = nodemailer.createTransport({
      host: process.env.XSERVER_SMTP_HOST || 'sv14645.xserver.jp',
      port: parseInt(process.env.XSERVER_SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.XSERVER_SMTP_USER || 'info@okinawa-yonabal.com',
        pass: process.env.XSERVER_SMTP_PASS || '',
      },
    });

    const emailContent = `
      <h2>Ocean View Ryukyu Tower - お問い合わせ</h2>
      <p><strong>お名前:</strong> ${name}</p>
      <p><strong>メールアドレス:</strong> ${email}</p>
      <p><strong>電話番号:</strong> ${phone || '未入力'}</p>
      <p><strong>お問い合わせ種別:</strong> ${category}</p>
      <hr>
      <p><strong>お問い合わせ内容:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    // Yahoo!メールから rikasogabe@yahoo.co.jp へ送信
    const yahooMailOptions = {
      from: `"Ocean View Ryukyu Tower" <${process.env.YAHOO_SMTP_USER || 'rikasogabe@yahoo.co.jp'}>`,
      to: 'rikasogabe@yahoo.co.jp',
      replyTo: email,
      subject: `【お問い合わせ】${category} - ${name}様`,
      html: emailContent,
    };

    // Xサーバーから info@okinawa-yonabal.com へ送信
    const xserverMailOptions = {
      from: `"Ocean View Ryukyu Tower" <${process.env.XSERVER_SMTP_USER || 'info@okinawa-yonabal.com'}>`,
      to: 'info@okinawa-yonabal.com',
      replyTo: email,
      subject: `【お問い合わせ】${category} - ${name}様`,
      html: emailContent,
    };

    // お客様向け自動返信メール（Yahoo!から送信）
    const customerMailOptions = {
      from: `"Ocean View Ryukyu Tower" <${process.env.YAHOO_SMTP_USER || 'rikasogabe@yahoo.co.jp'}>`,
      to: email,
      subject: 'お問い合わせありがとうございます - Ocean View Ryukyu Tower',
      html: `
        <h2>お問い合わせありがとうございます</h2>
        <p>${name} 様</p>
        <p>この度は Ocean View Ryukyu Tower へお問い合わせいただき、誠にありがとうございます。</p>
        <p>以下の内容でお問い合わせを承りました。</p>
        <hr>
        <p><strong>お問い合わせ種別:</strong> ${category}</p>
        <p><strong>お問い合わせ内容:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>24時間以内に担当者よりご返信させていただきます。</p>
        <p>今しばらくお待ちくださいませ。</p>
        <br>
        <p><strong>Ocean View Ryukyu Tower</strong></p>
        <p>〒901-1303 沖縄県与那原町東浜4-3</p>
        <p>TEL: 06-6130-4050</p>
        <p>Email: info@okinawa-yonabal.com</p>
      `,
    };

    // 両方のメールアドレスに送信
    try {
      await Promise.all([
        yahooTransporter.sendMail(yahooMailOptions),
        xserverTransporter.sendMail(xserverMailOptions),
      ]);
    } catch (error) {
      console.error('Admin email error:', error);
      throw error;
    }

    // お客様向け自動返信メール送信
    try {
      await yahooTransporter.sendMail(customerMailOptions);
    } catch (error) {
      console.error('Customer email error:', error);
      // 自動返信失敗でも管理者メールは送信済みなので続行
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'メールを送信しました' }),
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'メール送信に失敗しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

export { handler };
