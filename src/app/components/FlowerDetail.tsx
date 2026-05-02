import { X, MapPin, Calendar, Palette, Sparkles, Leaf } from 'lucide-react';
import type { Flower } from '../types';
import { WorldMap } from './WorldMap';

interface FlowerDetailProps {
  flower: Flower;
  onClose: () => void;
}

const sectionLabel = 'text-xs uppercase tracking-widest mb-3';

export function FlowerDetail({ flower, onClose }: FlowerDetailProps) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-card max-w-6xl w-full max-h-[92vh] overflow-hidden shadow-2xl grid md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
        style={{ border: '1px solid var(--border)' }}
      >
        {/* Left: info panel */}
        <div className="overflow-y-auto max-h-[92vh]">
          {/* Hero image */}
          <div className="relative h-64 overflow-hidden bg-muted">
            <img
              src={flower.imageUrl}
              alt={flower.name}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(40,30,28,0.6) 0%, transparent 50%)',
              }}
            />
            <div className="absolute bottom-6 left-8">
              <h2
                className="text-3xl text-white leading-tight"
                style={{ fontFamily: 'Inknut Antiqua, serif', fontWeight: 300 }}
              >
                {flower.name}
              </h2>
              <p className="text-sm italic mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {flower.scientificName}
              </p>
            </div>
          </div>

          <div className="p-8 space-y-7">
            {/* Descrição */}
            <div>
              <p className={sectionLabel} style={{ color: 'var(--flora-primary)' }}>
                <Leaf className="w-3 h-3 inline mr-1.5 mb-0.5" />
                Descrição
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {flower.description}
              </p>
            </div>

            {/* Origem + Floração */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className={sectionLabel} style={{ color: 'var(--flora-primary)' }}>
                  <MapPin className="w-3 h-3 inline mr-1.5 mb-0.5" />
                  Origem
                </p>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  {flower.origin}
                </p>
              </div>
              <div>
                <p className={sectionLabel} style={{ color: 'var(--flora-primary)' }}>
                  <Calendar className="w-3 h-3 inline mr-1.5 mb-0.5" />
                  Época de Floração
                </p>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  {flower.bloomingSeason}
                </p>
              </div>
            </div>

            {/* Cores */}
            <div>
              <p className={sectionLabel} style={{ color: 'var(--flora-primary)' }}>
                <Palette className="w-3 h-3 inline mr-1.5 mb-0.5" />
                Cores
              </p>
              <div className="flex flex-wrap gap-2">
                {flower.colors.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1 text-xs"
                    style={{
                      border: '1px solid var(--border)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Propriedades */}
            <div>
              <p className={sectionLabel} style={{ color: 'var(--flora-primary)' }}>
                <Sparkles className="w-3 h-3 inline mr-1.5 mb-0.5" />
                Propriedades
              </p>
              <div className="flex flex-wrap gap-2">
                {flower.properties.map((property) => (
                  <span
                    key={property}
                    className="px-3 py-1 text-xs text-white"
                    style={{ backgroundColor: 'var(--flora-primary)' }}
                  >
                    {property}
                  </span>
                ))}
              </div>
            </div>

            {/* Simbolismo */}
            <div>
              <p className={sectionLabel} style={{ color: 'var(--flora-primary)' }}>
                Simbolismo
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {flower.symbolism}
              </p>
            </div>

            {/* História */}
            <div>
              <p className={sectionLabel} style={{ color: 'var(--flora-primary)' }}>
                História
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {flower.history}
              </p>
            </div>
          </div>
        </div>

        {/* Right: map panel */}
        <div
          className="relative flex flex-col max-h-[92vh]"
          style={{
            backgroundColor: 'var(--background)',
            borderLeft: '1px solid var(--border)',
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 transition-opacity hover:opacity-75"
            style={{
              backgroundColor: 'var(--flora-primary-dark)',
              color: '#fff',
              padding: '6px',
              borderRadius: '2px',
            }}
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-6 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: 'var(--flora-primary)' }}
            >
              Distribuição Geográfica
            </p>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Regiões onde a espécie ocorre estão destacadas.
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-hidden p-4">
            <WorldMap regions={flower.regions} />
          </div>
        </div>
      </div>
    </div>
  );
}
