import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Concept from './components/Concept';
import Rooms from './components/Rooms';
import Gallery from './components/Gallery';
import HomeGallery from './components/HomeGallery';
import NearbyInfo from './components/NearbyInfo';
import Tourism from './components/Tourism';
import Access from './components/Access';
import Booking from './components/Booking';
import BookingForm from './components/BookingForm';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import BlogAdminNew from './components/BlogAdminNew';
import ContactForm from './components/ContactForm';
import SEO from './components/SEO';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    // URLパスからページを判定
    const path = window.location.pathname;
    console.log('Current path:', path);
    
    if (path === '/blog/admin' || path === '/blog/admin/') {
      console.log('Setting page to: blog-admin');
      setCurrentPage('blog-admin');
    } else if (path === '/blog' || path === '/blog/' || path.startsWith('/blog/')) {
      console.log('Setting page to: blog');
      setCurrentPage('blog');
    } else if (path === '/concept' || path === '/concept/') {
      setCurrentPage('concept');
    } else if (path === '/rooms' || path === '/rooms/') {
      setCurrentPage('rooms');
    } else if (path === '/gallery' || path === '/gallery/') {
      setCurrentPage('gallery');
    } else if (path === '/tourism' || path === '/tourism/') {
      setCurrentPage('tourism');
    } else if (path === '/access' || path === '/access/') {
      setCurrentPage('access');
    } else if (path === '/contact' || path === '/contact/') {
      setCurrentPage('contact');
    } else if (path === '/booking/form' || path === '/booking/form/') {
      setCurrentPage('booking-form');
    } else if (path === '/booking' || path === '/booking/') {
      setCurrentPage('booking');
    } else {
      console.log('Setting page to: home');
      setCurrentPage('home');
    }
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    // URLも更新（オプション）
    const paths: { [key: string]: string } = {
      'home': '/',
      'concept': '/concept',
      'rooms': '/rooms',
      'gallery': '/gallery',
      'tourism': '/tourism',
      'blog': '/blog',
      'blog-admin': '/blog/admin',
      'access': '/access',
      'contact': '/contact',
      'booking': '/booking',
      'booking-form': '/booking/form'
    };
    if (paths[page]) {
      window.history.pushState({}, '', paths[page]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage === 'home' && <SEO />}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === 'home' && (
        <>
          <Hero onNavigate={handleNavigate} />
          <HomeGallery onNavigate={handleNavigate} />
          <NearbyInfo />
        </>
      )}
      {currentPage === 'concept' && <Concept />}
      {currentPage === 'rooms' && <Rooms />}
      {currentPage === 'gallery' && <Gallery />}
      {currentPage === 'tourism' && <Tourism />}
      {currentPage === 'blog' && !selectedPostId && (
        <Blog onPostClick={(postId) => setSelectedPostId(postId)} />
      )}
      {currentPage === 'blog' && selectedPostId && (
        <BlogPost postId={selectedPostId} onBack={() => setSelectedPostId(null)} />
      )}
      {currentPage === 'blog-admin' && <BlogAdminNew />}
      {currentPage === 'access' && <Access />}
      {currentPage === 'contact' && <ContactForm />}
      {currentPage === 'booking' && <Booking onNavigate={handleNavigate} />}
      {currentPage === 'booking-form' && <BookingForm onNavigate={handleNavigate} />}

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-light tracking-wider mb-2">
              Ocean View <span className="text-cyan-400">Ryukyu Tower</span>
            </h3>
            <p className="text-gray-400 text-sm">沖縄南部の海を望む、至高のリゾート体験</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 mb-8 text-center sm:text-left">
            <div>
              <h4 className="text-sm font-medium mb-3 text-cyan-400">お問い合わせ</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                TEL: 06-6130-4050<br />
                Email: info@oceanview-ryukyu.com
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3 text-cyan-400">住所</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                〒901-1303<br />
                沖縄県与那原町東浜4-3
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3 text-cyan-400">チェックイン・アウト</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                IN: 16:00 / OUT: 11:00
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 Ocean View Ryukyu Tower. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
