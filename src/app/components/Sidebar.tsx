import { useState } from 'react';
import { ChevronLeft, Menu, Home, Sparkles, LayoutGrid, Leaf } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import type { Flower } from '../data/flowers';

interface SidebarProps {
  flowers: Flower[];
  onFlowerClick: (flower: Flower) => void;
}

export function Sidebar({ flowers, onFlowerClick }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollOrNavigate = (id: string) => {
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
    setOpen(false);
  };

  const navItems = [
    {
      label: 'Início',
      icon: Home,
      onClick: () => {
        navigate('/');
        setOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      label: 'Destaque do Dia',
      icon: Sparkles,
      onClick: () => scrollOrNavigate('flor-do-dia'),
    },
    {
      label: 'Coleção Completa',
      icon: LayoutGrid,
      onClick: () => {
        navigate('/colecao');
        setOpen(false);
      },
    },
  ];

  const sorted = [...flowers].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Toggle tab — vertically centred, left edge */}
      <button
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((v) => !v)}
        className="fixed top-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 group"
        style={{
          left: open ? '260px' : '0px',
          width: '38px',
          height: '96px',
          backgroundColor: 'var(--flora-primary)',
          borderRadius: '0 8px 8px 0',
          color: '#fff',
          boxShadow: open
            ? '2px 0 12px rgba(137,117,92,0.35)'
            : '3px 0 18px rgba(137,117,92,0.55)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.width = '44px';
          e.currentTarget.style.backgroundColor = 'var(--flora-primary-dark)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.width = '38px';
          e.currentTarget.style.backgroundColor = 'var(--flora-primary)';
        }}
      >
        {open ? (
          <ChevronLeft className="w-4 h-4 flex-shrink-0" />
        ) : (
          <>
            <Menu className="w-4 h-4 flex-shrink-0" />
            <span
              style={{
                fontSize: '8px',
                letterSpacing: '0.18em',
                fontFamily: 'serif',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                lineHeight: 1,
                opacity: 0.85,
              }}
            >
              MENU
            </span>
          </>
        )}
      </button>

      {/* Sidebar panel */}
      <aside
        className="fixed left-0 top-0 h-full z-40 flex flex-col transition-transform duration-300"
        style={{
          width: '260px',
          backgroundColor: '#F9F7F4',
          borderRight: '1px solid var(--border)',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: open ? '4px 0 24px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        {/* Sidebar header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4" style={{ color: 'var(--flora-primary)' }} />
            <span
              style={{
                fontFamily: 'Inknut Antiqua, serif',
                color: 'var(--flora-primary-dark)',
                fontSize: '13px',
              }}
            >
              Flora Conceptus
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 transition-opacity hover:opacity-60"
          >
            <ChevronLeft className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
          </button>
        </div>

        {/* Navigation links */}
        <div className="px-4 py-4 flex-shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
          <p
            className="text-xs uppercase mb-3 px-3"
            style={{ color: 'var(--muted-foreground)', letterSpacing: '0.15em' }}
          >
            Navegação
          </p>
          <nav className="space-y-0.5">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left rounded-sm transition-colors"
                style={{ color: 'var(--flora-primary-dark)', fontFamily: 'serif' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = 'rgba(137,117,92,0.1)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = '')
                }
              >
                <item.icon
                  className="w-3.5 h-3.5 flex-shrink-0"
                  style={{ color: 'var(--flora-primary)' }}
                />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* A–Z flower list */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <p
            className="text-xs uppercase mb-3 px-3"
            style={{ color: 'var(--muted-foreground)', letterSpacing: '0.15em' }}
          >
            Espécies A–Z
          </p>
          <ul className="space-y-0.5">
            {sorted.map((flower) => (
              <li key={flower.id}>
                <button
                  onClick={() => {
                    onFlowerClick(flower);
                    setOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-sm transition-colors"
                  style={{ fontFamily: 'serif' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = 'rgba(137,117,92,0.1)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '')
                  }
                >
                  <span
                    className="block text-sm"
                    style={{ color: 'var(--flora-primary-dark)' }}
                  >
                    {flower.name}
                  </span>
                  <span
                    className="block text-xs italic"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {flower.scientificName}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div
          className="px-5 py-3 flex-shrink-0 text-xs"
          style={{
            borderTop: '1px solid var(--border)',
            color: 'var(--muted-foreground)',
            fontFamily: 'serif',
          }}
        >
          {flowers.length} espécies catalogadas
        </div>
      </aside>
    </>
  );
}