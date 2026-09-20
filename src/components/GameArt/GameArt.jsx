import './GameArt.scss';

// Deterministic pseudo-random generator seeded by a string, so the same
// game always renders the same procedural artwork.
function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return () => {
    h = (h * 9301 + 49297) % 233280;
    return h / 233280;
  };
}

function PatternOverlay({ pattern, seed, colorA, colorB }) {
  const rand = seededRandom(seed);
  const uid = `p-${seed.replace(/[^a-z0-9]/gi, '')}`;

  switch (pattern) {
    case 'circuit':
      return (
        <g opacity="0.5">
          {Array.from({ length: 7 }).map((_, i) => {
            const y = 20 + i * 40 + rand() * 10;
            return (
              <path
                key={i}
                d={`M0,${y} H${120 + rand() * 200} V${y - 30} H${400 + rand() * 200}`}
                stroke={colorB}
                strokeWidth="1.5"
                fill="none"
              />
            );
          })}
        </g>
      );
    case 'stars':
      return (
        <g>
          {Array.from({ length: 60 }).map((_, i) => (
            <circle
              key={i}
              cx={rand() * 700}
              cy={rand() * 400}
              r={rand() * 1.6 + 0.3}
              fill={colorB}
              opacity={rand() * 0.8 + 0.2}
            />
          ))}
        </g>
      );
    case 'wave':
      return (
        <g opacity="0.55">
          {Array.from({ length: 5 }).map((_, i) => (
            <path
              key={i}
              d={`M-20,${80 + i * 60} C ${150},${20 + i * 60} ${300},${140 + i * 60} ${720},${60 + i * 60}`}
              stroke={colorB}
              strokeWidth="1.2"
              fill="none"
            />
          ))}
        </g>
      );
    case 'grid':
      return (
        <g opacity="0.35">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="400" stroke={colorB} strokeWidth="1" />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 60} x2="700" y2={i * 60} stroke={colorB} strokeWidth="1" />
          ))}
        </g>
      );
    case 'fog':
      return (
        <g opacity="0.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse
              key={i}
              cx={rand() * 700}
              cy={rand() * 400}
              rx={120 + rand() * 100}
              ry={40 + rand() * 30}
              fill={colorB}
              opacity={0.12}
            />
          ))}
        </g>
      );
    case 'canopy':
      return (
        <g opacity="0.55">
          {Array.from({ length: 18 }).map((_, i) => (
            <circle
              key={i}
              cx={rand() * 700}
              cy={rand() * 400}
              r={14 + rand() * 30}
              fill="none"
              stroke={colorB}
              strokeWidth="1.2"
            />
          ))}
        </g>
      );
    case 'dune':
      return (
        <g opacity="0.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <path
              key={i}
              d={`M-20,${300 - i * 35} Q 350,${220 - i * 35} 720,${300 - i * 35}`}
              stroke={colorB}
              strokeWidth="1.4"
              fill="none"
            />
          ))}
        </g>
      );
    case 'ember':
      return (
        <g>
          {Array.from({ length: 40 }).map((_, i) => (
            <circle
              key={i}
              cx={rand() * 700}
              cy={rand() * 400}
              r={rand() * 2 + 0.5}
              fill={colorB}
              opacity={rand() * 0.7 + 0.15}
            />
          ))}
        </g>
      );
    case 'ash':
    default:
      return (
        <g opacity="0.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={i}
              x1={rand() * 700}
              y1="-10"
              x2={rand() * 700 - 40}
              y2="410"
              stroke={colorB}
              strokeWidth="1"
            />
          ))}
        </g>
      );
  }
}

/**
 * Procedurally generated cover / key-art component.
 * Renders a distinctive SVG composition per game using its palette + pattern
 * seed, avoiding any dependency on external or copyrighted imagery.
 */
export default function GameArt({ title, palette = ['#0a0a0b', '#333', '#999'], pattern = 'grid', variant = 'cover', className = '' }) {
  const [bg, mid, accent] = palette;
  const initials = title
    .split(' ')
    .filter((w) => w[0] && w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join('') || title.slice(0, 2).toUpperCase();

  // SVG url(#id) references break if the id contains spaces or punctuation,
  // so build a safe id instead of using the raw (often multi-word) title.
  const gradId = `grad-${title.replace(/[^a-zA-Z0-9]/g, '')}-${variant}`;

  return (
    <div className={`game-art game-art--${variant} ${className}`} role="img" aria-label={`${title} artwork`}>
      <svg viewBox="0 0 700 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={bg} />
            <stop offset="55%" stopColor={mid} stopOpacity="0.55" />
            <stop offset="100%" stopColor={bg} />
          </linearGradient>
        </defs>
        <rect width="700" height="400" fill={`url(#${gradId})`} />
        <PatternOverlay pattern={pattern} seed={title} colorA={mid} colorB={accent} />
        <text
          x="6%"
          y="88%"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize="140"
          fill={accent}
          opacity="0.16"
          letterSpacing="2"
        >
          {initials}
        </text>
      </svg>
      <div className="game-art__vignette" style={{ '--art-accent': accent }} />
    </div>
  );
}
