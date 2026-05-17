import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wider mb-6 text-center animate-fade-in">
          Ocean View<br />Ryukyu Tower
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-light tracking-wide mb-12 text-center max-w-3xl animate-fade-in-delay">
          沖縄南部の美しい海を望む、至高のリゾート体験
        </p>
        <button
          onClick={() => onNavigate('booking')}
          className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-cyan-600 transition-all duration-300 text-lg font-light tracking-wide rounded-full animate-fade-in-delay-2"
        >
          ご予約はこちら
        </button>
      </div>

      <button
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown size={40} />
      </button>
    </div>
  );
}
