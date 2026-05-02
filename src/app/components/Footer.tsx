import { flowers } from '../data/flowers';

interface FooterProps {
  /** When true, renders the full three-column layout (homepage). Default: false (compact). */
  full?: boolean;
}

export function Footer({ full = false }: FooterProps) {
  return (
    <footer className="py-12 px-8" style={{ backgroundColor: 'var(--flora-primary-dark)' }}>
      <div className="max-w-7xl mx-auto">
        {full && (
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <p
                className="text-white text-lg mb-2"
                style={{ fontFamily: 'Inknut Antiqua, serif', fontWeight: 300 }}
              >
                Flora Conceptus
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Uma enciclopédia visual e informativa sobre as flores do mundo.
              </p>
            </div>

            <div>
              <p
                className="text-xs uppercase mb-3"
                style={{ color: 'var(--flora-primary)', letterSpacing: '0.15em' }}
              >
                Coleção
              </p>
              <ul className="text-xs space-y-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <li>{flowers.length} espécies catalogadas</li>
                <li>6 continentes cobertos</li>
                <li>15+ famílias botânicas</li>
              </ul>
            </div>

            <div>
              <p
                className="text-xs uppercase mb-3"
                style={{ color: 'var(--flora-primary)', letterSpacing: '0.15em' }}
              >
                Informações
              </p>
              <ul className="text-xs space-y-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <li>Dados botânicos verificados</li>
                <li>Imagens via Unsplash</li>
                <li>Mapas de distribuição</li>
              </ul>
            </div>
          </div>
        )}

        <div
          className="text-xs"
          style={{
            borderTop: full ? '1px solid rgba(255,255,255,0.1)' : 'none',
            paddingTop: full ? '24px' : '0',
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          © 2026 Flora Conceptus — Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
