import { LogIn, Search } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function Header({ onLoginClick, searchValue, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-border px-[32px] py-[25px]">
      <div className="max-w-7xl mx-auto flex items-center gap-8">

        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <svg
            width="32"
            height="32"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Centre */}
            <circle cx="11" cy="11" r="2.2" fill="var(--flora-primary)" />
            {/* 6 petals */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <ellipse
                key={deg}
                cx="11"
                cy="11"
                rx="1.5"
                ry="4.5"
                fill="var(--flora-primary)"
                fillOpacity="0.75"
                transform={`rotate(${deg} 11 11) translate(0 -4.5)`}
              />
            ))}
            {/* Stem */}
            <line x1="11" y1="13.5" x2="11" y2="20" stroke="var(--flora-primary)" strokeWidth="1.2" strokeLinecap="round"/>
            {/* Left leaf */}
            <path d="M11 17.5 Q8 16 7.5 13.5 Q9.5 14.5 11 17.5Z" fill="var(--flora-primary)" fillOpacity="0.6"/>
          </svg>
          <span
            className="tracking-wide whitespace-nowrap"
            style={{
              fontFamily: 'Inknut Antiqua, serif',
              color: 'var(--flora-primary-dark)',
              fontSize: '24px',
            }}
          >
            Flora Conceptus
          </span>
        </div>

        {/* Search bar — ocupa o espaço central */}
        <div className="relative flex-1 min-w-0">
          <Search
            className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            style={{ color: 'var(--muted-foreground)' }}
          />
          <input
            type="text"
            placeholder="Buscar por nome, propriedade ou origem"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-6 pr-3 py-2 bg-transparent focus:outline-none text-sm placeholder:text-[#281E1C]"
            style={{
              borderBottom: '1px solid var(--border)',
              color: 'var(--foreground)',
            }}
          />
        </div>

        {/* CTA button */}
        <button
          onClick={onLoginClick}
          className="flex items-center gap-2 text-sm px-5 py-2 transition-all flex-shrink-0"
          style={{
            border: '1px solid var(--flora-primary-dark)',
            color: 'var(--flora-primary-dark)',
            borderRadius: '2px',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.backgroundColor = 'var(--flora-primary-dark)';
            el.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.backgroundColor = '';
            el.style.color = 'var(--flora-primary-dark)';
          }}
        >
          <LogIn className="w-4 h-4" />
          <span className="hidden sm:inline font-[Libertinus_Serif] text-[16px]">Entrar / Criar conta</span>
          <span className="sm:hidden">Entrar</span>
        </button>

      </div>
    </header>
  );
}