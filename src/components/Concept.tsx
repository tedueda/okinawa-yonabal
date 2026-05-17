import { Waves, Sun, Heart } from 'lucide-react';

export default function Concept() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-cyan-50">
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-center text-gray-800 mb-6 tracking-wide">
            コンセプト
          </h2>
          <div className="w-24 h-1 bg-cyan-600 mx-auto mb-16" />

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div
              className="h-96 rounded-2xl bg-cover bg-center shadow-2xl"
              style={{
                backgroundImage: 'url(/kirakira.jpg)',
              }}
            />
            <div className="space-y-6">
              <h3 className="text-3xl font-light text-gray-800 mb-4">琉球の海と共に</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                沖縄南部の美しい海を一望できる、Ocean View Ryukyu Towerは、
                伝統的な琉球文化と現代的なラグジュアリーが融合した特別な空間です。
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                エメラルドグリーンの海、白い砂浜、そして心地よい潮風。
                すべてがお客様の心を癒し、忘れられない思い出を創り出します。
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Waves className="text-cyan-600" size={32} />
              </div>
              <h4 className="text-xl font-light text-gray-800 mb-4">オーシャンビュー</h4>
              <p className="text-gray-600 leading-relaxed">
                全室から望む壮大な海の景色。朝日が海を染める瞬間から、夕日が沈むまで、
                刻々と変わる海の表情をお楽しみください。
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sun className="text-cyan-600" size={32} />
              </div>
              <h4 className="text-xl font-light text-gray-800 mb-4">癒しの時間</h4>
              <p className="text-gray-600 leading-relaxed">
                日常から離れた特別な時間。波の音、潮の香り、温かな日差し。
                五感で感じる沖縄の自然が、心と体を深くリラックスさせます。
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-cyan-600" size={32} />
              </div>
              <h4 className="text-xl font-light text-gray-800 mb-4">おもてなしの心</h4>
              <p className="text-gray-600 leading-relaxed">
                琉球の伝統的なおもてなしの心を大切に、お一人お一人に合わせた
                きめ細やかなサービスをご提供いたします。
              </p>
            </div>
          </div>

          <div className="bg-cyan-600 text-white p-12 rounded-2xl text-center">
            <p className="text-2xl sm:text-3xl font-light leading-relaxed">
              「ここでしか味わえない、特別な時間を」
            </p>
            <p className="mt-6 text-lg opacity-90">
              それがOcean View Ryukyu Towerの約束です
            </p>
          </div>

          <div className="mt-20 bg-white p-8 sm:p-12 rounded-2xl shadow-lg">
            <h3 className="text-3xl font-light text-gray-800 mb-6">与那原を堪能</h3>
            <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
              <p>
                与那原町は、沖縄本島南部の中でも海と暮らしの距離が近く、落ち着いた空気の中で沖縄らしさをゆったり味わえる魅力的なエリアです。
                那覇方面へのアクセスも良く、観光の拠点として便利でありながら、街全体にはどこか穏やかでローカルな時間が流れています。
              </p>
              <p>
                近くにはきらきらビーチをはじめ、美しい海辺の景色を楽しめるスポットがあり、朝の散歩や夕暮れのドライブにもぴったりです。
                派手な観光地とはひと味違う、静かで心地よい沖縄の海時間を満喫できるのが与那原の大きな魅力です。
              </p>
              <p>
                また、与那原は南部観光にも便利な立地で、斎場御嶽やニライカナイ橋など沖縄を代表する名所へもアクセスしやすく、自然・文化・歴史をバランスよく楽しめます。
                観光を楽しんだあとに、落ち着いた滞在先でゆっくり過ごせることも、このエリアならではの魅力です。
              </p>
              <p>
                観光だけでなく、地元の空気感や日常に近い沖縄の魅力を感じたい方にとって、与那原はとても心地よい場所です。
                Ocean View Ryukyu Towerを拠点に、にぎやかさだけではない、やさしく奥行きのある沖縄時間をぜひ堪能してください。
              </p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-10 items-center bg-white p-8 sm:p-12 rounded-2xl shadow-lg">
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g1121612-d4021903-Reviews-Agarihama_Market-Yonabaru_cho_Shimajiri_gun_Okinawa_Prefecture_Kyushu.html"
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <div
                className="h-80 rounded-2xl bg-cover bg-center shadow-xl"
                style={{
                  backgroundImage: 'url(/agariitiba.jpg)',
                }}
              />
            </a>
            <div className="space-y-5">
              <h3 className="text-3xl font-light text-gray-800">与那原の市場を楽しむ</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                与那原で地元らしい活気を感じたいなら、「あがりはま市場」も立ち寄りたいスポットのひとつです。
                地元で親しまれている食材や特産品が並び、沖縄の暮らしに近い雰囲気を気軽に楽しめます。
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                新鮮な野菜や地域ならではのお土産を探しながら、観光地とは少し違ったローカルな魅力に触れられるのが市場の良さです。
                滞在中の買い出しはもちろん、与那原らしい空気を感じる散策先としてもおすすめです。
              </p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-10 items-center bg-white p-8 sm:p-12 rounded-2xl shadow-lg">
            <a
              href="https://islandtripper.jp/"
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <div
                className="h-80 rounded-2xl bg-cover bg-center shadow-xl"
                style={{
                  backgroundImage: 'url(/islandtripper1.jpg.webp)',
                }}
              />
            </a>
            <div className="space-y-5">
              <h3 className="text-3xl font-light text-gray-800">旅＋釣り</h3>
              <h4 className="text-2xl font-light text-cyan-700">ISLAND TRIPPER</h4>
              <p className="text-gray-600 leading-relaxed text-lg">
                沖縄南部の与那原マリーナ発の釣り船。設備の整った快適なマリーナから、
                本格派ルアー専門でキャスティング、ジギングを中心にご提案します。
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                手ぶらでOKの釣具レンタルもあり、観光客や初心者の方でも気軽に海のアクティビティを楽しめます。
                与那原での滞在に、旅と釣りを組み合わせた特別な体験を加えてみてください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
