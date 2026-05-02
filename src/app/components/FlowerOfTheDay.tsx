import type { Flower } from '../types';

interface Props {
  flower: Flower;
  onClick: () => void;
}

export function FlowerOfTheDay({ flower, onClick }: Props) {
  return (
    <section className="max-w-5xl mx-auto">
      <button
        onClick={onClick}
        className="group w-full text-left overflow-hidden"
        style={{ border: '1px solid var(--border)' }}
      >
        <div className="grid md:grid-cols-2">
          {/* Text panel */}
          <div
            className="flex flex-col justify-center px-10 py-12 order-2 md:order-1"
            style={{ backgroundColor: 'var(--flora-primary-dark)' }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: 'var(--flora-primary)', letterSpacing: '0.2em' }}
            >
              Flor do Dia
            </p>
            <h3
              className="text-3xl text-white mb-2 leading-tight"
              style={{ fontFamily: 'Inknut Antiqua, serif', fontWeight: 300 }}
            >
              {flower.name}
            </h3>
            <p className="text-sm italic mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {flower.scientificName}
            </p>
            <p
              className="text-sm leading-relaxed mb-8 line-clamp-3"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {flower.description}
            </p>
            <span
              className="self-start text-sm px-6 py-2.5 transition-all"
              style={{
                border: '1px solid rgba(255,255,255,0.5)',
                color: '#fff',
              }}
            >
              Ver detalhes →
            </span>
          </div>

          {/* Image */}
          <div className="relative h-64 md:h-auto overflow-hidden order-1 md:order-2">
            <img
              src={flower.imageUrl}
              alt={flower.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </button>
    </section>
  );
}
