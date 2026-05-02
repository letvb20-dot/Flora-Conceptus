import type { Region } from '../types';

interface WorldMapProps {
  regions: Region[];
}

type Continent = {
  id: Region;
  name: string;
  d: string;
  labelX: number;
  labelY: number;
};

const continents: Continent[] = [
  {
    id: 'na',
    name: 'América do Norte',
    labelX: 200,
    labelY: 175,
    d: 'M85,95 L130,80 L175,75 L215,72 L255,80 L295,90 L320,110 L335,135 L325,160 L305,180 L285,195 L295,215 L280,235 L260,245 L235,255 L210,265 L195,255 L185,235 L170,225 L155,235 L145,250 L135,240 L130,220 L120,200 L110,180 L95,160 L82,135 L78,115 Z M155,260 L175,275 L165,290 L150,285 Z',
  },
  {
    id: 'sa',
    name: 'América do Sul',
    labelX: 270,
    labelY: 380,
    d: 'M245,275 L275,265 L300,275 L320,285 L335,310 L340,340 L335,375 L320,410 L300,440 L280,460 L260,465 L245,455 L235,430 L228,400 L222,365 L222,335 L228,305 Z',
  },
  {
    id: 'eu',
    name: 'Europa',
    labelX: 510,
    labelY: 130,
    d: 'M440,80 L470,72 L505,68 L540,72 L575,78 L600,90 L605,108 L590,125 L575,140 L555,148 L535,158 L510,170 L485,178 L465,170 L445,160 L430,145 L425,125 L428,105 Z',
  },
  {
    id: 'af',
    name: 'África',
    labelX: 540,
    labelY: 320,
    d: 'M465,190 L510,185 L555,188 L600,200 L625,225 L635,260 L625,295 L610,330 L595,365 L575,395 L555,420 L535,430 L515,425 L495,405 L478,375 L465,340 L455,305 L450,270 L450,235 L455,210 Z',
  },
  {
    id: 'as',
    name: 'Ásia',
    labelX: 770,
    labelY: 165,
    d: 'M605,75 L660,68 L720,65 L775,68 L825,75 L870,85 L905,100 L925,125 L935,155 L920,185 L895,210 L860,230 L820,245 L775,255 L730,255 L690,245 L650,230 L620,210 L605,185 L595,160 L590,135 L592,110 L598,90 Z M850,255 L880,265 L905,280 L920,310 L900,335 L870,340 L845,325 L835,300 L840,275 Z',
  },
  {
    id: 'oc',
    name: 'Oceania',
    labelX: 855,
    labelY: 380,
    d: 'M790,355 L830,345 L875,348 L910,360 L920,385 L905,410 L880,425 L845,430 L815,425 L790,410 L780,385 Z M925,395 L945,405 L935,420 L920,415 Z',
  },
];

export function WorldMap({ regions }: WorldMapProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div
        className="w-full overflow-hidden bg-card"
        style={{ border: '1px solid var(--border)' }}
      >
        <svg viewBox="0 0 1000 500" className="w-full h-auto block">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="0" y="0" width="1000" height="500" fill="var(--map-background)" />

          {[...Array(9)].map((_, i) => (
            <line
              key={`lat-${i}`}
              x1="0" y1={50 * (i + 1)} x2="1000" y2={50 * (i + 1)}
              stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4"
            />
          ))}
          {[...Array(9)].map((_, i) => (
            <line
              key={`lng-${i}`}
              x1={100 * (i + 1)} y1="0" x2={100 * (i + 1)} y2="500"
              stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4"
            />
          ))}

          {continents.map((c) => {
            const active = regions.includes(c.id);
            return (
              <path
                key={c.id}
                d={c.d}
                fill={active ? 'var(--flora-primary)' : 'var(--muted)'}
                stroke={active ? 'var(--flora-primary-dark)' : 'var(--border)'}
                strokeWidth={active ? 2 : 1}
                strokeLinejoin="round"
                opacity={active ? 1 : 0.5}
                filter={active ? 'url(#glow)' : undefined}
                style={{ transition: 'all 0.4s ease' }}
              >
                <title>{c.name}</title>
              </path>
            );
          })}

          {continents.map((c) => {
            const active = regions.includes(c.id);
            return (
              <text
                key={`label-${c.id}`}
                x={c.labelX}
                y={c.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="15"
                fontWeight="400"
                fill={active ? '#ffffff' : 'var(--muted-foreground)'}
                style={{ pointerEvents: 'none', letterSpacing: '0.2px' }}
              >
                {c.name}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
