export default function Rooms() {
  const rooms = [
    {
      name: '部屋からの眺望',
      image: '/ocean.jpg',
      size: '45㎡',
      capacity: '大人３名',
      beds: 'ダブルベット1台　セミダブル１台',
      description: '窓から見える美しい海の景色を存分に楽しめる広々とした客室。コンパクトながら機能的なダイニングセットを備え、快適な滞在をお約束します。',
      features: ['オーシャンビュー', 'ダイニングセット', 'キッチン', '洗濯機・乾燥機', '空気清浄機', 'アイロン', 'アイロン台', 'トイレ'],
    },
    {
      name: 'コンパクトルーム',
      image: '/20250929-1-71.jpg',
      size: '30㎡',
      capacity: '1-2名',
      beds: 'ダブルベッド',
      description: 'コンパクトながら機能的な設計。一人旅やカップルに最適な、居心地の良い空間です。',
      features: ['シャワールーム', 'ミニキッチン', '冷蔵庫', '無料Wi-Fi', '空気清浄機', 'アイロン', 'アイロン台', 'トイレ'],
    },
    {
      name: 'スタンダードルーム',
      image: '/20250929-1-18.jpg',
      size: '40㎡',
      capacity: '2-3名',
      beds: 'ダブルベッド',
      description: 'シンプルで快適な空間。清潔感あふれる室内には必要な設備が揃っており、リーズナブルな価格で快適にお過ごしいただけます。',
      features: ['シャワールーム', 'テレビ', 'キッチン', '無料Wi-Fi', '空気清浄機', 'アイロン', 'アイロン台', 'トイレ'],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-center text-gray-800 mb-6 tracking-wide">
            客室
          </h2>
          <div className="w-24 h-1 bg-cyan-600 mx-auto mb-12" />
          <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-20">
            与那原の海を望む快適な客室。長期滞在にも対応した設備を完備し、
            お客様のニーズに合わせて3つのタイプからお選びいただけます。
          </p>

          <div className="space-y-16">
            {rooms.map((room, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`h-96 rounded-2xl bg-cover bg-center shadow-xl ${
                    index % 2 === 1 ? 'md:order-2' : ''
                  }`}
                  style={{ backgroundImage: `url(${room.image})` }}
                />
                {room.name !== 'スタンダードルーム' && (
                  <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <h3 className="text-3xl font-light text-gray-800">{room.name}</h3>

                    <p className="text-gray-600 leading-relaxed text-lg">{room.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-20 bg-cyan-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-light text-gray-800 mb-6 text-center">全客室共通設備</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
              {[
                '無料Wi-Fi',
                'エアコン',
                '冷蔵庫',
                'キッチン設備',
                '食器・フライパン等',
                'ヘアドライヤー',
                'シャンプー・ボディソープ',
                '電気ケトル',
                '洗濯機・乾燥機',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
