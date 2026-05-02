import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Flower } from '../data/flowers';

interface Props {
  flowers: Flower[];
  onFlowerClick: (flower: Flower) => void;
}

// 4 featured IDs: Rosa, Sakura, Lótus, Orquídea
const FEATURED_IDS = ['1', '7', '5', '4'];

export function FeaturedSlideshow({ flowers, onFlowerClick }: Props) {
  const featured = FEATURED_IDS.map((id) => flowers.find((f) => f.id === id)!).filter(Boolean);
  const [current, setCurrent] = useState(0);
  const isSliding = useRef(false);

  const go = useCallback(
    (next: number) => {
      if (isSliding.current) return;
      isSliding.current = true;
      setCurrent(next);
      setTimeout(() => {
        isSliding.current = false;
      }, 420);
    },
    []
  );

  const goNext = useCallback(() => go((current + 1) % featured.length), [current, featured.length, go]);
  const goPrev = useCallback(() => go((current - 1 + featured.length) % featured.length), [current, featured.length, go]);

  // Touch / drag support
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  useEffect(() => {
    const t = setInterval(goNext, 5500);
    return () => clearInterval(t);
  }, [goNext]);

  if (!featured.length) return null;

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: '520px' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Sliding track — all slides side by side */}
      <div
        style={{
          display: 'flex',
          width: `${featured.length * 100}%`,
          height: '100%',
          transform: `translateX(-${(current * 100) / featured.length}%)`,
          transition: 'transform 420ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}
      >
        {featured.map((flower) => (
          <div
            key={flower.id}
            style={{
              width: `${100 / featured.length}%`,
              height: '100%',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            {/* Background image */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${flower.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to right, rgba(40,30,28,0.88) 0%, rgba(40,30,28,0.55) 50%, rgba(40,30,28,0.08) 100%)',
              }}
            />

            {/* Text content */}
            <div className="relative h-full flex items-center">
              <div className="px-12 md:px-20 max-w-xl">
                <p
                  className="text-xs uppercase mb-3"
                  style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', fontFamily: 'serif' }}
                >
                  {flower.origin}
                </p>
                <h2
                  className="text-white mb-4 leading-tight"
                  style={{
                    fontFamily: 'Inknut Antiqua, serif',
                    fontWeight: 300,
                    fontSize: 'clamp(28px, 4vw, 48px)',
                  }}
                >
                  {flower.name}
                </h2>
                <p
                  className="text-sm leading-relaxed mb-3 italic"
                  style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'serif' }}
                >
                  {flower.scientificName}
                </p>
                <p
                  className="text-sm leading-relaxed mb-8"
                  style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'serif', maxWidth: '380px' }}
                >
                  {flower.description.length > 130
                    ? flower.description.slice(0, 130) + '…'
                    : flower.description}
                </p>
                <button
                  onClick={() => onFlowerClick(flower)}
                  className="text-sm px-6 py-2.5 text-white transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.5)', fontFamily: 'serif' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrow controls */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center transition-all"
        style={{
          backgroundColor: 'rgba(255,255,255,0.12)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
        aria-label="Anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center transition-all"
        style={{
          backgroundColor: 'rgba(255,255,255,0.12)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
        aria-label="Próximo"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="transition-all"
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: i === current ? 'var(--flora-primary)' : 'rgba(255,255,255,0.35)',
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        className="absolute bottom-5 right-6 text-xs"
        style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'serif' }}
      >
        {current + 1} / {featured.length}
      </div>
    </section>
  );
}
