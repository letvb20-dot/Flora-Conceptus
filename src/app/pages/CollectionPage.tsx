import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { Search, X } from 'lucide-react';
import { FlowerCard } from '../components/FlowerCard';
import { Footer } from '../components/Footer';
import { flowers } from '../data/flowers';
import type { RootContext } from '../components/Root';

export default function CollectionPage() {
  const { onFlowerClick } = useOutletContext<RootContext>();
  const [query, setQuery] = useState('');

  const trimmed = query.trim().toLowerCase();
  const filtered = trimmed
    ? flowers.filter(
        (f) =>
          f.name.toLowerCase().includes(trimmed) ||
          f.scientificName.toLowerCase().includes(trimmed) ||
          f.origin.toLowerCase().includes(trimmed) ||
          f.properties.some((p) => p.toLowerCase().includes(trimmed))
      )
    : flowers;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Page header */}
      <div className="px-8 py-12" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto">
          <p
            className="text-xs uppercase mb-3"
            style={{ color: 'var(--muted-foreground)', letterSpacing: '0.2em' }}
          >
            Enciclopédia
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1
              className="text-4xl"
              style={{
                fontFamily: 'Inknut Antiqua, serif',
                fontWeight: 300,
                color: 'var(--flora-primary-dark)',
              }}
            >
              Coleção Completa
            </h1>

            {/* Local search */}
            <div className="relative md:w-72">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                style={{ color: 'var(--muted-foreground)' }}
              />
              <input
                type="text"
                placeholder="Buscar flor ou propriedade"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-sm bg-transparent focus:outline-none"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)',
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--muted-foreground)' }}
                  aria-label="Limpar busca"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <p className="text-xs mt-4" style={{ color: 'var(--muted-foreground)' }}>
            {filtered.length}{' '}
            {filtered.length === 1 ? 'espécie encontrada' : 'espécies'}
            {trimmed ? ` para "${query}"` : ' catalogadas'}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-8 py-10 pb-20">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((flower) => (
              <FlowerCard
                key={flower.id}
                flower={flower}
                onClick={() => onFlowerClick(flower)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
              Nenhuma flor encontrada.
            </p>
            <button
              onClick={() => setQuery('')}
              className="mt-4 text-sm underline"
              style={{ color: 'var(--flora-primary)' }}
            >
              Limpar busca
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
