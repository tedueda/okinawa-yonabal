import { Calendar, Phone, Mail } from 'lucide-react';

interface BookingFormProps {
  onNavigate?: (page: string) => void;
}

export default function BookingForm({ onNavigate }: BookingFormProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* メインコンテンツ */}
            <div className="flex-1">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4">
                  予約フォーム
                </h2>
                <p className="text-gray-600 text-sm">
                  下記フォームより空室状況をご確認の上、ご予約ください
                </p>
              </div>

              {/* Beds24フォーム */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <iframe 
                  src="https://beds24.com/booking2.php?propid=88263&referer=iframe" 
                  width="800" 
                  height="2000" 
                  style={{
                    maxWidth: '100%',
                    border: 'none',
                    overflow: 'auto',
                    width: '100%',
                    minHeight: '2000px'
                  }}
                  title="予約フォーム"
                >
                  <p>
                    <a 
                      href="https://beds24.com/booking2.php?propid=88263&referer=iframe" 
                      title="Book Now"
                      className="text-teal-600 hover:text-teal-700 underline"
                    >
                      こちらから予約
                    </a>
                  </p>
                </iframe>
              </div>
            </div>

            {/* サイドバー */}
            <div className="lg:w-80 space-y-6">
              {/* 空室カレンダー */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <Calendar className="text-teal-600" size={20} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    空室カレンダー
                  </h3>
                </div>
                <div className="mb-3">
                  <iframe 
                    src="https://beds24.com/booking2.php?propid=88263&referer=iframe" 
                    width="100%" 
                    height="500"
                    style={{
                      border: 'none',
                      borderRadius: '8px'
                    }}
                    title="空室カレンダー"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  カレンダーから日付を選んで予約できます
                </p>
              </div>

              {/* 電話予約 */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <Phone className="text-teal-600" size={20} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    電話予約
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  お申込みのご予約も承っております
                </p>
                <a 
                  href="tel:06-6130-4050"
                  className="block text-center text-xl text-teal-600 font-light hover:text-teal-700 transition-colors mb-2"
                >
                  06-6130-4050
                </a>
                <p className="text-xs text-gray-500 text-center">
                  受付時間：9:00～21:00
                </p>
              </div>

              {/* お問い合わせ */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Mail className="text-amber-600" size={20} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    お問い合わせ
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  お問い合わせフォームからご連絡ください
                </p>
                <button
                  onClick={() => onNavigate ? onNavigate('contact') : window.location.href = '/contact'}
                  className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm"
                >
                  お問い合わせフォームへ
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  24時間以内にご返信いたします
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
