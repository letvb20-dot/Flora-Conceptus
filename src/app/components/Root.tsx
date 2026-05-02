import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { X } from 'lucide-react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { FlowerDetail } from './FlowerDetail';
import { AuthScreen } from './AuthScreen';
import { flowers } from '../data/flowers';
import type { Flower } from '../data/flowers';

export interface RootContext {
  onFlowerClick: (flower: Flower) => void;
  searchTerm: string;
}

export default function Root() {
  const [showAuth, setShowAuth] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const context: RootContext = {
    onFlowerClick: setSelectedFlower,
    searchTerm,
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar flowers={flowers} onFlowerClick={setSelectedFlower} />

      <Header
        onLoginClick={() => setShowAuth(true)}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <main>
        <Outlet context={context} />
      </main>

      {selectedFlower && (
        <FlowerDetail flower={selectedFlower} onClose={() => setSelectedFlower(null)} />
      )}

      {showAuth && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAuth(false);
          }}
        >
          <div
            className="relative w-full max-w-4xl mx-4 shadow-2xl overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-4 right-4 z-10 text-white p-1.5 transition-colors"
              style={{ backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: '2px' }}
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
            <AuthScreen onAuthenticated={() => setShowAuth(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
