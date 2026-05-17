import { Calendar, Phone, Mail } from 'lucide-react';

interface BookingProps {
  onNavigate?: (page: string) => void;
}

export default function Booking({ onNavigate }: BookingProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* ヘッダーセクション */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4">
              How to Reserve
            </h2>
            <p className="text-gray-600 text-sm">
              オンライン予約フォームからご予約ください
            </p>
          </div>

          {/* 予約フォームカード */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl p-8 sm:p-12 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-full mb-6">
                <Calendar className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-light text-gray-800 mb-3">
                予約フォーム
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                オンラインで簡単予約・決済
              </p>
              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('booking-form');
                  } else {
                    window.location.href = '/booking/form';
                  }
                }}
                className="inline-block px-8 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-light"
              >
                予約フォームへ
              </button>
              <p className="text-xs text-gray-500 mt-4">
                ※以下予約必須
              </p>
            </div>
          </div>

          {/* 予約時に必要な情報 */}
          <div className="mb-16 bg-gray-50 rounded-2xl p-8">
            <div className="flex items-start gap-3 mb-4">
              <Calendar className="text-teal-600 mt-1" size={20} />
              <h3 className="text-lg font-medium text-gray-800">
                予約時に必要な情報
              </h3>
            </div>
            <ul className="space-y-2 ml-8">
              <li className="flex items-center gap-2 text-gray-700 text-sm">
                <span className="text-teal-600">✓</span>
                ご希望のチェックイン・チェックアウト日
              </li>
              <li className="flex items-center gap-2 text-gray-700 text-sm">
                <span className="text-teal-600">✓</span>
                宿泊人数（大人・お子様の内訳）
              </li>
              <li className="flex items-center gap-2 text-gray-700 text-sm">
                <span className="text-teal-600">✓</span>
                代表者様のお名前
              </li>
              <li className="flex items-center gap-2 text-gray-700 text-sm">
                <span className="text-teal-600">✓</span>
                ご連絡先（携帯番号・メールアドレス）
              </li>
              <li className="flex items-center gap-2 text-gray-700 text-sm">
                <span className="text-teal-600">✓</span>
                特別なご要望（あれば）
              </li>
            </ul>
          </div>

          {/* キャンセルポリシー */}
          <div className="mb-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              キャンセルポリシー
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>・14日前まで：無料</li>
              <li>・13日前〜7日前：宿泊料金の30%</li>
              <li>・6日前〜3日前：宿泊料金の50%</li>
              <li>・2日前〜当日：宿泊料金の100%</li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">
              ※天候や災害、事件・事故等の場合は柔軟に対応させていただきます
            </p>
          </div>

          {/* 電話予約・お問い合わせ */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-gray-100">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-teal-100 rounded-full mb-4">
                <Phone className="text-teal-600" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                電話予約
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                お申込みのご予約も承っております
              </p>
              <a 
                href="tel:06-6130-4050"
                className="text-2xl text-teal-600 font-light hover:text-teal-700 transition-colors"
              >
                06-6130-4050
              </a>
              <p className="text-xs text-gray-500 mt-2">
                受付時間：9:00～21:00
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-gray-100">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-full mb-4">
                <Mail className="text-amber-600" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                お問い合わせ
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                お問い合わせフォームからご連絡ください
              </p>
              <button
                onClick={() => window.location.href = 'mailto:info@oceanview-ryukyu.com'}
                className="inline-block px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors text-sm"
              >
                お問い合わせフォームへ
              </button>
              <p className="text-xs text-gray-500 mt-2">
                24時間以内にご返信いたします
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
