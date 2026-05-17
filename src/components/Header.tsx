import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'トップ' },
    { id: 'concept', label: 'コンセプト' },
    { id: 'rooms', label: '客室' },
    { id: 'gallery', label: 'フォトギャラリー' },
    { id: 'tourism', label: '観光' },
    { id: 'blog', label: 'ブログ' },
    { id: 'access', label: 'アクセス' },
    { id: 'booking', label: '予約' },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            onClick={() => handleNavigate('home')}
            className="text-2xl font-light tracking-wider text-gray-800 hover:text-cyan-600 transition-colors"
          >
            Ocean View<br className="sm:hidden" />
            <span className="text-cyan-600 ml-2">Ryukyu Tower</span>
          </button>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`text-sm font-light tracking-wide transition-colors ${
                  currentPage === item.id
                    ? 'text-cyan-600 border-b-2 border-cyan-600 pb-1'
                    : 'text-gray-700 hover:text-cyan-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-cyan-600 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-cyan-50 text-cyan-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
