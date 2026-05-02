import { useEffect } from 'react';
import { useOutletContext, useLocation, useNavigate } from 'react-router';
import { FlowerCard } from '../components/FlowerCard';
import { FlowerOfTheDay } from '../components/FlowerOfTheDay';
import { FeaturedSlideshow } from '../components/FeaturedSlideshow';
import { Footer } from '../components/Footer';
import { flowers } from '../data/flowers';
import type { RootContext } from '../components/Root';

/** Returns a deterministic day-of-year index into the flowers array. */
function getDayFlowerIndex(): number {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86_400_000);
  return dayOfYear % flowers.length;
}

export default function HomePage() {
  const { onFlowerClick, searchTerm } = useOutletContext<RootContext>();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to a section anchor when arriving from another route with { scrollTo } state.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;
    const el = document.getElementById(target);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80);
      // Clear the state so that a page refresh doesn't re-scroll.
      navigate('/', { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const flowerOfDay = flowers[getDayFlowerIndex()];

  // Search results view — rendered when the header search bar has input.
  const trimmed = searchTerm.trim().toLowerCase();
  const isSearching = trimmed.length > 0;
  const filteredFlowers = isSearching
    ? flowers.filter(
        (f) =>
          f.name.toLowerCase().includes(trimmed) ||
          f.scientificName.toLowerCase().includes(trimmed) ||
          f.origin.toLowerCase().includes(trimmed) ||
          f.description.toLowerCase().includes(trimmed) ||
          f.properties.some((p) => p.toLowerCase().includes(trimmed))
      )
    : [];

  if (isSearching) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-12 pb-16">
        <p className="text-sm mb-8" style={{ color: 'var(--muted-foreground)' }}>
          {filteredFlowers.length}{' '}
          {filteredFlowers.length === 1 ? 'flor encontrada' : 'flores encontradas'}
        </p>
        {filteredFlowers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFlowers.map((flower) => (
              <FlowerCard key={flower.id} flower={flower} onClick={() => onFlowerClick(flower)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
              Nenhuma flor encontrada com esses critérios.
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--muted-foreground)' }}>
              Tente buscar por outro termo.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section>
        <div className="grid md:grid-cols-2">
          <div
            className="flex flex-col justify-center px-12 py-20 md:py-28"
            style={{ backgroundColor: 'var(--flora-primary)' }}
          >
            <p
              className="text-xs uppercase mb-6"
              style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2em' }}
            >
              Enciclopédia das flores
            </p>
            <h2
              className="text-4xl md:text-5xl text-white mb-6 leading-tight"
              style={{ fontFamily: 'Inknut Antiqua, serif', fontWeight: 300 }}
            >
              Descubra a beleza e sabedoria da flora mundial.
            </h2>
            <p
              className="text-sm leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              35 espécies catalogadas com histórias, origens, simbolismos e distribuição geográfica.
            </p>
            <button
              onClick={() =>
                document.getElementById('destaques')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="self-start text-sm px-7 py-3 text-white transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.6)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
              }}
            >
              Explorar destaques
            </button>
          </div>
          <div className="h-72 md:h-auto overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1773152965775-7427eb3c4afc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXJzJTIwYm91cXVldCUyMGJvdGFuaWNhbCUyMGVsZWdhbnR8ZW58MXx8fHwxNzc3Njc0NDE5fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Flores botânicas"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-3 divide-x divide-border">
            {[
              { value: `${flowers.length}`, label: 'Espécies catalogadas' },
              { value: '6', label: 'Continentes cobertos' },
              { value: '15+', label: 'Famílias botânicas' },
            ].map((stat) => (
              <div key={stat.label} className="py-10 px-8 text-center">
                <p
                  className="text-4xl mb-1"
                  style={{
                    fontFamily: 'Inknut Antiqua, serif',
                    fontWeight: 300,
                    color: 'var(--flora-primary)',
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs uppercase"
                  style={{ color: 'var(--muted-foreground)', letterSpacing: '0.12em' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flower of the Day — clicking opens the detail modal */}
      <section id="flor-do-dia" className="max-w-7xl mx-auto px-8 py-16">
        <p
          className="text-xs uppercase mb-8"
          style={{ color: 'var(--muted-foreground)', letterSpacing: '0.18em' }}
        >
          Destaque do dia
        </p>
        <FlowerOfTheDay flower={flowerOfDay} onClick={() => onFlowerClick(flowerOfDay)} />
      </section>

      {/* Featured slideshow */}
      <section id="destaques">
        <div
          className="max-w-7xl mx-auto px-8 pb-5 flex items-end justify-between"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <h3
            className="text-2xl"
            style={{ fontFamily: 'Inknut Antiqua, serif', fontWeight: 300 }}
          >
            Entradas populares
          </h3>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            4 destaques
          </p>
        </div>
        <FeaturedSlideshow flowers={flowers} onFlowerClick={onFlowerClick} />
      </section>

      <Footer full />
    </>
  );
}
