import { Plane, Car, Bus, MapPin, Phone, Mail } from 'lucide-react';

export default function Access() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-cyan-50">
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-center text-gray-800 mb-6 tracking-wide">
            アクセス
          </h2>
          <div className="w-24 h-1 bg-cyan-600 mx-auto mb-16" />

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="h-96 rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.6540749641586!2d127.76049787499728!3d26.20792897707426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34e56d2ee36235b5%3A0x988735d047867b07!2z55CJ55CD44K_44Ov44O8IOS4jumCo-WOn-ODnuODquODvOODig!5e0!3m2!1sja!2sjp!4v1774420909130!5m2!1sja!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <MapPin className="text-cyan-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-light text-gray-800 mb-2">住所</h3>
                    <p className="text-gray-600 leading-relaxed">
                      〒901-1303<br />
                      沖縄県与那原町東浜4-3<br />
                      Ocean View Ryukyu Tower
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <Phone className="text-cyan-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-light text-gray-800 mb-2">お電話でのお問い合わせ</h3>
                    <p className="text-gray-600 leading-relaxed">
                      TEL: 06-6130-4050<br />
                      受付時間: 9:00-21:00（年中無休）
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <Mail className="text-cyan-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-light text-gray-800 mb-2">メールでのお問い合わせ</h3>
                    <p className="text-gray-600 leading-relaxed">
                      info@oceanview-ryukyu.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-4">
                <Plane className="text-cyan-600 flex-shrink-0 mt-1" size={32} />
                <div className="flex-1">
                  <h3 className="text-2xl font-light text-gray-800 mb-4">那覇空港から</h3>
                  <div className="space-y-4 text-gray-600">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">お車の場合</h4>
                      <p className="leading-relaxed">
                        那覇空港より国道331号線を南下、約40分<br />
                        無料駐車場完備（100台）
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">送迎サービス</h4>
                      <p className="leading-relaxed">
                        那覇空港からの無料送迎サービスをご用意しております。<br />
                        ご予約時にお申し付けください。（要事前予約）
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-4">
                <Bus className="text-cyan-600 flex-shrink-0 mt-1" size={32} />
                <div className="flex-1">
                  <h3 className="text-2xl font-light text-gray-800 mb-4">路線バスをご利用の場合</h3>
                  <div className="text-gray-600 leading-relaxed">
                    <p className="mb-2">
                      那覇バスターミナルより89番系統「糸満線」乗車<br />
                      「海岸通り」バス停下車、徒歩3分
                    </p>
                    <p className="text-sm text-gray-500">
                      所要時間：約60分
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-4">
                <Car className="text-cyan-600 flex-shrink-0 mt-1" size={32} />
                <div className="flex-1">
                  <h3 className="text-2xl font-light text-gray-800 mb-4">レンタカーサービス</h3>
                  <div className="text-gray-600 leading-relaxed">
                    <p>
                      ホテルでレンタカーの手配も承っております。<br />
                      観光や移動に便利なレンタカーをご用意いたします。<br />
                      詳しくはフロントまでお問い合わせください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-cyan-600 text-white p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-light mb-4">チェックイン・チェックアウト</h3>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div>
                <p className="text-sm opacity-90 mb-1">チェックイン</p>
                <p className="text-3xl font-light">16:00</p>
              </div>
              <div>
                <p className="text-sm opacity-90 mb-1">チェックアウト</p>
                <p className="text-3xl font-light">11:00</p>
              </div>
            </div>
            <p className="mt-6 text-sm opacity-90">
              アーリーチェックイン・レイトチェックアウトをご希望の方は、<br />
              事前にご相談ください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
