import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface HomeGalleryProps {
  onNavigate: (page: string) => void;
}

export default function HomeGallery({ onNavigate }: HomeGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const images: { url: string; category: string }[] = [
    {
      url: '/20250929-1-17 copy.jpg',
      category: 'ベットルーム'
    },
    {
      url: '/20250929-1-18.jpg',
      category: 'ベットルーム'
    },
    {
      url: '/20250929-1-34.jpg',
      category: 'コンパクトなダイニングセット'
    },
    {
      url: '/20250929-1-71.jpg',
      category: 'オーシャンビュー'
    },
    {
      url: '/20250929-1-13.jpg',
      category: 'シャワールーム'
    },
    {
      url: '/kixtutin.jpg',
      category: 'キッチン'
    },
    {
      url: '/files_9224207-2026-03-05T15-31-07-890Z-20250929-1-10.webp',
      category: 'トイレ'
    },
    {
      url: '/20250929-1-31.jpg',
      category: 'テレビ'
    },
    {
      url: '/sentakuki.jpg',
      category: '洗濯機と乾燥機'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  if (images.length === 0) {
    return (
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-light text-center text-gray-800 mb-6 tracking-wide">
            フォトギャラリー
          </h2>
          <div className="w-24 h-1 bg-cyan-600 mx-auto mb-12" />
          <p className="text-center text-gray-600 text-lg">
            画像を準備中です
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-light text-center text-gray-800 mb-6 tracking-wide">
          フォトギャラリー
        </h2>
        <div className="w-24 h-1 bg-cyan-600 mx-auto mb-12" />
        <p className="text-center text-gray-700 text-xl sm:text-2xl font-light tracking-wide max-w-4xl mx-auto mb-12">
          沖縄の“静けさ”に出会う場所 Ocean View Ryukyu Tower
        </p>

        <div className="relative mb-6">
          <div
            className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
            onClick={openLightbox}
          >
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].category}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-lg font-light tracking-wide bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                {images[currentIndex].category}
              </span>
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentIndex
                  ? 'ring-4 ring-cyan-600 ring-offset-2 scale-105'
                  : 'opacity-60 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img
                src={image.url}
                alt={image.category}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-600 text-white hover:bg-cyan-700 transition-colors duration-300 rounded-full text-lg font-light tracking-wide"
          >
            ギャラリーをもっと見る
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={40} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>

          <div className="max-w-5xl max-h-[80vh] px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].category}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <span className="text-white/80 text-lg font-light">
                {images[currentIndex].category}
              </span>
              <span className="text-white/50 text-sm ml-4">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300"
            aria-label="Next image"
          >
            <ChevronRight size={32} className="text-white" />
          </button>
        </div>
      )}
    </section>
  );
}
