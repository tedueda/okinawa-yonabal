import { MapPin, Clock } from 'lucide-react';

 type NearbyPlace = {
   name: string;
   description: string;
   distance: string;
   icon: typeof MapPin;
   image: string;
   url?: string;
   overlayUrl?: string;
   distanceUrl?: string;
 };

export default function NearbyInfo() {
  const nearbyPlaces: NearbyPlace[] = [
    {
      name: '斎場御嶽',
      description: '琉球王国最高の聖地として知られる世界遺産。琉球の創世神アマミキヨが造ったとされる御嶽で、王国時代には国王や聞得大君が参拝した神聖な場所です',
      distance: '車で約25分',
      icon: MapPin,
      url: 'https://sefa.okinawa/',
      distanceUrl: 'https://www.google.co.jp/maps/place/%E6%96%8E%E5%A0%B4%E5%BE%A1%E5%B6%BD/@26.1720664,127.8264735,17z/data=!3m1!4b1!4m6!3m5!1s0x34e571f2701161df:0x3954cd280c2c5319!8m2!3d26.1720664!4d127.8264735!16zL20vMGZwYnN3?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D',
      image: '/seiba.jpg'
    },
    {
      name: '西原町きらきらビーチでマリンスポーツ',
      description: '透明度抜群のエメラルドグリーンの海が広がる穴場ビーチ。白い砂浜と青い空のコントラストが美しく、シュノーケリングやマリンスポーツを楽しめます。地元の人々にも愛される静かな癒しのスポットです',
      distance: '車で３分　徒歩１０分',
      icon: MapPin,
      url: 'http://xn--pck7csb8b4b1c.com/',
      distanceUrl: 'https://www.google.co.jp/maps/place/%E8%A5%BF%E5%8E%9F%E3%81%8D%E3%82%89%E3%81%8D%E3%82%89%E3%83%93%E3%83%BC%E3%83%81/@26.211476,127.7678332,17z/data=!3m1!4b1!4m6!3m5!1s0x34e56dcdbbbfffff:0x19877a079ba98e5!8m2!3d26.211476!4d127.7704081!16s%2Fg%2F11clvvnqgv?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D',
      image: '/kirakirabiti.webp'
    },
    {
      name: 'ニライ橋　カナイ橋',
      description: '太平洋を一望できる絶景ドライブスポット。急カーブが続く海上橋から見る青い海と空のパノラマは圧巻です。琉球神話に登場する理想郷「ニライカナイ」にちなんで名付けられました',
      distance: '車で23分',
      icon: MapPin,
      url: 'https://www.odnsym.com/spot/nirai.html',
      distanceUrl: 'https://www.google.com/maps/place/%E3%83%8B%E3%83%A9%E3%82%A4%E3%83%BB%E3%82%AB%E3%83%8A%E3%82%A4%E6%A9%8B/@26.164542,127.8140488,17z/data=!3m1!4b1!4m6!3m5!1s0x34e57122728292ad:0xcb79fc3716bee8c3!8m2!3d26.164542!4d127.8166237!16s%2Fg%2F11jbnpxc4s?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D',
      image: '/nirai.jpg'
    },
    {
      name: 'ジャングリア',
      description: '沖縄の自然を感じながらアトラクションや非日常体験を楽しめる話題のテーマパークです。',
      distance: '車で1時間１２分',
      icon: MapPin,
      url: 'https://junglia.jp/',
      distanceUrl: 'https://www.google.co.jp/maps/place/%E3%82%B8%E3%83%A3%E3%83%B3%E3%82%B0%E3%83%AA%E3%82%A2%E6%B2%96%E7%B8%84/@26.6422201,127.9735982,17z/data=!3m1!4b1!4m6!3m5!1s0x34e4f918d1678393:0x5f0be3652cb094b2!8m2!3d26.6422201!4d127.9735982!16s%2Fg%2F11yc8nl32p?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D',
      image: '/jixyanguria.webp'
    },
    {
      name: '美ら海水族館',
      description: '沖縄を代表する人気観光スポット。世界最大級の水槽ではジンベエザメやマンタが悠々と泳ぎ、沖縄の豊かな海の世界を間近で体感できます。家族連れにもおすすめの定番スポットです',
      distance: '１時間２５分',
      icon: MapPin,
      url: 'https://churaumi.okinawa/',
      distanceUrl: 'https://www.google.com/maps/place/%E6%B2%96%E7%B8%84%E7%BE%8E%E3%82%89%E6%B5%B7%E6%B0%B4%E6%97%8F%E9%A4%A8/@26.694338,127.8754382,17z/data=!3m2!4b1!5s0x34e4fa331411ea83:0xa075f02c5f1d5747!4m6!3m5!1s0x34e4fa3152619e3d:0xea08a6700fdd9ffe!8m2!3d26.694338!4d127.8780131!16zL20vMDUxdjVi?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D',
      image: '/tyuraumi.jpg'
    },
    {
      name: 'T ギャラリア 沖縄 by DFS',
      description: '沖縄で人気の免税ショッピングスポット。海外ブランドからコスメ、ファッション雑貨まで幅広く揃い、観光の合間にゆったり買い物を楽しめます。',
      distance: '車で２４分',
      icon: MapPin,
      url: 'https://www.dfs.com/jp/okinawa',
      distanceUrl: 'https://www.google.com/maps/place/DFS+NAHA+OKINAWA/@26.2230667,127.6972666,17z/data=!3m2!4b1!5s0x34e56bdf4923251b:0xacd41b531da2ccb4!4m6!3m5!1s0x34e56bd8b2497f33:0xa4810c63b35cc0bf!8m2!3d26.2230667!4d127.6972666!16s%2Fg%2F122092pn?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D',
      image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80'
    }
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-light text-center text-gray-800 mb-6 tracking-wide">
          周辺情報
        </h2>
        <div className="w-24 h-1 bg-cyan-600 mx-auto mb-12" />
        <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-16">
          Ocean View Ryukyu Tower周辺の観光スポットやアクセス情報をご紹介します
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {nearbyPlaces.map((place, index) => {
            const Icon = place.icon;
            const overlayUrl = place.overlayUrl;
            const distanceUrl = place.distanceUrl;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${place.image})` }}
                  />
                  {place.url ? (
                    <a
                      href={overlayUrl ?? place.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={place.name}
                      className="absolute inset-0 z-10 block"
                    />
                  ) : null}
                  <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    {place.url ? (
                      <a
                        href={place.url}
                        target="_blank"
                        rel="noreferrer"
                        className="relative z-20 text-xl font-medium mb-1 hover:text-cyan-200 transition-colors"
                      >
                        {place.name}
                      </a>
                    ) : (
                      <h3 className="text-xl font-medium mb-1">{place.name}</h3>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{place.description}</p>
                  {distanceUrl ? (
                    <div className="flex items-center gap-2 text-cyan-600">
                      <Icon size={20} />
                      <a
                        href={distanceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium hover:text-cyan-700"
                      >
                        {place.distance}
                      </a>
                    </div>
                  ) : place.url ? (
                    <a
                      href={place.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700"
                    >
                      <Icon size={20} />
                      <span className="text-sm font-medium">{place.distance}</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-cyan-600">
                      <Icon size={20} />
                      <span className="text-sm font-medium">{place.distance}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 sm:p-12">
          <div className="flex items-start gap-4 mb-6">
            <Clock size={32} className="text-cyan-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-light text-gray-800 mb-4">営業時間・アクセス情報</h3>
              <div className="space-y-3 text-gray-600">
                <p><span className="font-medium text-gray-800">チェックイン:</span> 16:00〜</p>
                <p><span className="font-medium text-gray-800">チェックアウト:</span> 〜11:00</p>
                <p><span className="font-medium text-gray-800">駐車場:</span> 無料駐車場1台あり</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
