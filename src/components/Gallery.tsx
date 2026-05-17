import { useState } from 'react';
import { X } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images: { url: string; category: string }[] = [
    { url: '/20250929-1-18.jpg', category: 'ベッドルーム' },
    { url: '/20250929-1-31.jpg', category: 'テレビ' },
    { url: '/20250929-1-34.jpg', category: 'ダイニング' },
    { url: '/20250929-1-23.jpg', category: 'ベッドルーム' },
    { url: '/20250929-1-71.jpg', category: '眺望' },
    { url: '/20250929-1-13.jpg', category: 'シャワールーム' },
    { url: '/tawa.webp', category: '外観' },
    { url: '/kixtutin.jpg', category: 'キッチン' },
    { url: '/umi.jpg', category: '沖縄　東海岸の海' },
    { url: '/20250929-1-25.jpg', category: '部屋からの眺望' },
    { url: '/20250929-1-9.jpg', category: '洗面台' },
    { url: '/S__31654122.jpg', category: '電子レンジ・食器・炊飯器あり' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-center text-gray-800 mb-6 tracking-wide">
            フォトギャラリー
          </h2>
          <div className="w-24 h-1 bg-cyan-600 mx-auto mb-12" />
          <div className="max-w-4xl mx-auto mb-20 space-y-6 text-center text-gray-600">
            <p className="text-xl sm:text-2xl font-light leading-relaxed whitespace-pre-line">
              那覇からほど近い場所にありながら、
              ここには観光地の喧騒はありません。

              目の前に広がるのは、穏やかな東海岸の海。
              朝は静かな海から昇る光に包まれ、
              夜は音のない時間がゆっくりと流れます。

              ただ海を眺めるだけで満たされる、
              そんな贅沢なひとときをお過ごしください。
            </p>
            <p className="text-lg leading-relaxed">
              Ocean View Ryukyu Towerの美しい景色と施設をご覧ください。
              写真をクリックすると拡大表示されます。
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square"
                onClick={() => setSelectedImage(image.url)}
              >
                <div
                  className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${image.url})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-sm font-light tracking-wide">{image.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-cyan-400 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X size={40} />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
