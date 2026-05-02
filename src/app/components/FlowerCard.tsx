import { MapPin } from 'lucide-react';
import type { Flower } from '../types';

interface FlowerCardProps {
  flower: Flower;
  onClick: () => void;
}

export function FlowerCard({ flower, onClick }: FlowerCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-card overflow-hidden cursor-pointer group"
      style={{ border: '1px solid var(--border)' }}
    >
      {/* Image */}
      <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={flower.imageUrl}
          alt={flower.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="text-lg mb-0.5 leading-snug"
          style={{ fontFamily: 'Inknut Antiqua, serif', fontWeight: 300 }}
        >
          {flower.name}
        </h3>
        <p
          className="text-xs italic mb-3"
          style={{ color: 'var(--flora-primary)', letterSpacing: '0.02em' }}
        >
          {flower.scientificName}
        </p>
        <p
          className="text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {flower.description}
        </p>
        <div
          className="flex items-center gap-1.5 text-xs"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="line-clamp-1">{flower.origin}</span>
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div
        className="h-0.5 w-0 group-hover:w-full transition-all duration-300"
        style={{ backgroundColor: 'var(--flora-primary)' }}
      />
    </div>
  );
}
