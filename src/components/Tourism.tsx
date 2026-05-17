import { MapPin, Car } from 'lucide-react';

export default function Tourism() {
  const attractions = [
    {
      name: '斎場御嶽',
      image: '/seiba.jpg',
      distance: '車で約25分',
      time: '1-2時間',
      url: 'https://sefa.okinawa/',
      mapUrl: 'https://www.google.co.jp/maps/place/%E6%96%8E%E5%A0%B4%E5%BE%A1%E5%B6%BD/@26.1720664,127.8238986,17z/data=!3m1!4b1!4m6!3m5!1s0x34e571f2701161df:0x3954cd280c2c5319!8m2!3d26.1720664!4d127.8264735!16zL20vMGZwYnN3?hl=ja&entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D',
      description: '琉球王国最高の聖地として知られる世界遺産。琉球の創世神アマミキヨが造ったとされる御嶽で、王国時代には国王や聞得大君が参拝した神聖な場所です',
    },
    {
      name: '西原のキラキラビーチ',
      image: '/kirakira.jpg',
      distance: '車で3分　徒歩１０分',
      time: '2-3時間',
      url: 'http://xn--pck7csb8b4b1c.com/%E8%A5%BF%E5%8E%9F%E3%82%AD%E3%83%A9%E3%82%AD%E3%83%A9%E3%83%93%E3%83%BC%E3%83%81/',
      mapUrl: 'https://www.google.com/maps/place/%E8%A5%BF%E5%8E%9F%E3%81%8D%E3%82%89%E3%81%8D%E3%82%89%E3%83%93%E3%83%BC%E3%83%81/@26.211476,127.7678332,17z/data=!3m1!4b1!4m6!3m5!1s0x34e56dcdbbbfffff:0x19877a079ba98e5!8m2!3d26.211476!4d127.7704081!16s%2Fg%2F11clvvnqgv?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D',
      description: '透明度抜群のエメラルドグリーンの海が広がる穴場ビーチ。白い砂浜と青い空のコントラストが美しく、シュノーケリングやマリンスポーツを楽しめます。地元の人々にも愛される静かな癒しのスポットです',
    },
    {
      name: 'ニライ橋　カナイ橋',
      image: '/nirai.jpg',
      distance: '車で約10分',
      time: '30分-1時間',
      url: 'https://www.odnsym.com/spot/nirai.html',
      description: '太平洋を一望できる絶景ドライブスポット。急カーブが続く海上橋から見る青い海と空のパノラマは圧巻です。琉球神話に登場する理想郷「ニライカナイ」にちなんで名付けられました',
    },
    {
      name: 'ひめゆりの塔',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      distance: '車で約15分',
      time: '30分-1時間',
      description: '平和祈念の地',
    },
    {
      name: '美らSUNビーチ',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      distance: '車で約10分',
      time: '2-3時間',
      description: '人工ビーチリゾート',
    },
    {
      name: 'アウトレットモールあしびなー',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      distance: '車で約5分',
      time: '1-2時間',
      description: 'ショッピング施設',
    },
    {
      name: '美ら海水族館',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      distance: '車で約15分',
      time: '30分-1時間',
      url: 'https://churaumi.okinawa/',
      description: '海の生物を展示する水族館',
    },
    {
      name: 'T ギャラリア 沖縄 by DFS',
      image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80',
      distance: '車で約25分',
      time: '1-2時間',
      url: 'https://www.dfs.com/jp/okinawa',
      description: '沖縄で人気の免税ショッピングスポット。海外ブランドからコスメ、ファッション雑貨まで幅広く揃い、観光の合間にゆったり買い物を楽しめます。',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-center text-gray-800 mb-6 tracking-wide">
            観光情報
          </h2>
          <div className="w-24 h-1 bg-cyan-600 mx-auto mb-12" />
          <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-20">
            Ocean View Ryukyu Tower周辺には、沖縄東海岸エリアの魅力的な観光スポットが数多くあります。
            世界遺産、絶景ビーチ、太平洋の美しい景色を満喫できる観光をお楽しみください。
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {attractions.map((attraction, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                {attraction.url ? (
                  <a
                    href={attraction.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <div
                      className="h-64 bg-cover bg-center"
                      style={{ backgroundImage: `url(${attraction.image})` }}
                    />
                  </a>
                ) : (
                  <div
                    className="h-64 bg-cover bg-center"
                    style={{ backgroundImage: `url(${attraction.image})` }}
                  />
                )}
                <div className="p-6 space-y-4">
                  {attraction.url ? (
                    <a
                      href={attraction.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-2xl font-light text-gray-800 hover:text-cyan-600 transition-colors"
                    >
                      {attraction.name}
                    </a>
                  ) : (
                    <h3 className="text-2xl font-light text-gray-800">{attraction.name}</h3>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {attraction.mapUrl || attraction.url ? (
                      <a
                        href={attraction.mapUrl || attraction.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 hover:text-cyan-600 transition-colors"
                      >
                        <Car size={16} className="text-cyan-600" />
                        <span>{attraction.distance}</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Car size={16} className="text-cyan-600" />
                        <span>{attraction.distance}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 leading-relaxed">{attraction.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-cyan-50 p-8 rounded-2xl">
            <div className="flex items-start gap-4">
              <MapPin className="text-cyan-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-light text-gray-800 mb-3">アクセスのご案内</h3>
                <p className="text-gray-600 leading-relaxed">
                  ホテルではレンタカーの手配も承っております。観光スポットへの詳しい行き方やおすすめルート、
                  所要時間など、フロントスタッフがご案内いたします。お気軽にお問い合わせください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
