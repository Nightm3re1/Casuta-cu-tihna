import Image from 'next/image';
import type { Scene } from '@/content/gallery';

/**
 * Renders a real photograph when one has been supplied, and an original,
 * on-brand illustration of the same subject when one has not.
 *
 * The illustrations exist so the layout can be judged, shipped and reviewed
 * with no photography in hand — the site never shows a grey box or a broken
 * image. Populate `src` in src/content/gallery.ts and the photograph takes over
 * with no other change.
 */
export default function Photo({
  src,
  scene,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}: {
  src: string | null;
  scene: Scene;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }
  // An empty alt marks the image as decorative; anything else is content and
  // needs an image role with a name.
  const decorative = alt.trim() === '';
  return (
    <svg
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full ${className}`}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': alt })}
      focusable="false"
    >
      <SceneArt scene={scene} />
    </svg>
  );
}

function SceneArt({ scene }: { scene: Scene }) {
  const uid = `s-${scene}`;
  switch (scene) {
    case 'ridge':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F6D9A8" />
              <stop offset="52%" stopColor="#E6BE95" />
              <stop offset="100%" stopColor="#C9A98E" />
            </linearGradient>
          </defs>
          <rect width="800" height="800" fill={`url(#${uid}-sky)`} />
          <circle cx="566" cy="238" r="52" fill="#FFF0CE" opacity="0.9" />
          <path d="M0 470 L118 396 L212 448 L318 348 L410 424 L508 358 L612 438 L712 372 L800 432 L800 800 L0 800 Z" fill="#4E6259" opacity="0.55" />
          <path d="M0 540 L96 470 L206 522 L316 432 L430 512 L540 446 L660 528 L764 466 L800 498 L800 800 L0 800 Z" fill="#31463C" opacity="0.8" />
          <path d="M316 432 L352 462 L316 480 L282 458 Z M540 446 L572 474 L540 490 L512 470 Z" fill="#EFF3EE" opacity="0.7" />
          <path d="M0 622 L140 566 L286 616 L440 552 L588 618 L724 566 L800 600 L800 800 L0 800 Z" fill="#1D3126" />
          {[70, 168, 268, 372, 470, 578, 690, 762].map((x, i) => (
            <g key={x} transform={`translate(${x} ${712 + (i % 3) * 14}) scale(${0.9 + (i % 4) * 0.16})`}>
              <path d="M0 0 L-19 0 L-10 -23 L-15 -23 L-7 -45 L-11 -45 L0 -74 L11 -45 L7 -45 L15 -23 L10 -23 L19 0 Z" fill="#132019" />
            </g>
          ))}
        </>
      );

    case 'cabin':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DCE7DE" />
              <stop offset="100%" stopColor="#F2E9D9" />
            </linearGradient>
          </defs>
          <rect width="800" height="800" fill={`url(#${uid}-sky)`} />
          <path d="M0 388 L128 318 L246 372 L372 296 L498 366 L628 306 L752 372 L800 344 L800 560 L0 560 Z" fill="#4A5F55" opacity="0.42" />
          <rect y="556" width="800" height="244" fill="#2A3F32" />
          <path d="M0 556 Q200 528 400 556 T800 556 L800 620 L0 620 Z" fill="#35513F" />
          {/* cottage */}
          <path d="M168 400 L400 236 L632 400 L632 432 L400 268 L168 432 Z" fill="#392C24" />
          <rect x="212" y="400" width="376" height="192" fill="#F1E7D6" />
          {[430, 462, 494, 526, 558].map((y) => (
            <line key={y} x1="212" y1={y} x2="588" y2={y} stroke="#D3BE9E" strokeWidth="2" />
          ))}
          <rect x="212" y="586" width="376" height="20" fill="#6E6A60" />
          <rect x="486" y="286" width="40" height="88" fill="#8A5F4A" />
          <rect x="479" y="278" width="54" height="14" fill="#6F4A38" />
          <circle cx="400" cy="342" r="25" fill="#DFA349" stroke="#392C24" strokeWidth="4" />
          <rect x="258" y="442" width="66" height="72" fill="#DFA349" stroke="#392C24" strokeWidth="4" />
          <line x1="291" y1="442" x2="291" y2="514" stroke="#392C24" strokeWidth="3" />
          <rect x="476" y="442" width="66" height="72" fill="#DFA349" stroke="#392C24" strokeWidth="4" />
          <line x1="509" y1="442" x2="509" y2="514" stroke="#392C24" strokeWidth="3" />
          <rect x="372" y="470" width="60" height="122" fill="#7A522E" stroke="#392C24" strokeWidth="4" />
          {[80, 700, 760].map((x, i) => (
            <g key={x} transform={`translate(${x} 600) scale(${1.5 + i * 0.2})`}>
              <path d="M0 0 L-24 0 L-13 -28 L-19 -28 L-8 -56 L-14 -56 L0 -90 L14 -56 L8 -56 L19 -28 L13 -28 L24 0 Z" fill="#1B2E23" />
            </g>
          ))}
          {/* foreground: a path to the door, shrubs and a picket line, so the
              lower third of the frame carries detail instead of flat colour */}
          <path d="M368 606 L432 606 L486 800 L314 800 Z" fill="#8F7B57" />
          <path d="M368 606 L432 606 L486 800 L314 800 Z" fill="none" stroke="#7A6748" strokeWidth="3" />
          {[{ x: 210, r: 34 }, { x: 268, r: 24 }, { x: 556, r: 30 }, { x: 610, r: 21 }].map((b) => (
            <circle key={b.x} cx={b.x} cy={620} r={b.r} fill="#2F4A38" />
          ))}
          {Array.from({ length: 12 }, (_, i) => 8 + i * 68).map((x) => (
            <rect key={x} x={x} y="690" width="12" height="62" rx="5" fill="#5A7050" opacity="0.75" />
          ))}
          <rect y="712" width="800" height="9" fill="#4E6446" opacity="0.75" />
        </>
      );

    case 'interior':
      return (
        <>
          <rect width="800" height="800" fill="#EDE2CE" />
          <rect y="620" width="800" height="180" fill="#9B7042" />
          {[0, 120, 240, 360, 480, 600, 720].map((x) => (
            <line key={x} x1={x} y1="620" x2={x - 40} y2="800" stroke="#825C36" strokeWidth="3" />
          ))}
          {/* beams */}
          {[54, 150].map((y) => (
            <rect key={y} y={y} width="800" height="34" fill="#5E4326" />
          ))}
          <rect x="96" y="54" width="30" height="566" fill="#6B4C2C" opacity="0.55" />
          <rect x="674" y="54" width="30" height="566" fill="#6B4C2C" opacity="0.55" />
          {/* window onto the ridge */}
          <rect x="278" y="212" width="244" height="222" fill="#BFD4CB" stroke="#4A3626" strokeWidth="12" />
          <path d="M284 396 L346 336 L400 380 L462 320 L516 372 L516 428 L284 428 Z" fill="#4E6259" />
          <line x1="400" y1="212" x2="400" y2="434" stroke="#4A3626" strokeWidth="8" />
          <line x1="278" y1="326" x2="522" y2="326" stroke="#4A3626" strokeWidth="8" />
          {/* table */}
          <rect x="196" y="536" width="408" height="18" rx="4" fill="#8A5E33" />
          <rect x="228" y="554" width="16" height="80" fill="#70491F" />
          <rect x="556" y="554" width="16" height="80" fill="#70491F" />
          <ellipse cx="400" cy="530" rx="52" ry="10" fill="#C6A05C" opacity="0.5" />
          <path d="M366 500 h44 a10 10 0 0 1 0 20 h-44 z" fill="#F5EFE4" stroke="#B9A487" strokeWidth="2" />
          <rect x="454" y="486" width="40" height="44" rx="3" fill="#5C7A64" />
        </>
      );

    case 'terrace':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F2D2A0" />
              <stop offset="100%" stopColor="#DCC4A8" />
            </linearGradient>
          </defs>
          <rect width="800" height="800" fill={`url(#${uid}-sky)`} />
          <path d="M0 396 L142 330 L266 386 L400 306 L536 380 L668 318 L800 384 L800 556 L0 556 Z" fill="#4C6157" opacity="0.5" />
          <path d="M0 470 L150 418 L300 466 L448 408 L604 470 L740 420 L800 448 L800 620 L0 620 Z" fill="#2E4437" />
          {/* deck */}
          <rect y="600" width="800" height="200" fill="#9B7042" />
          {[640, 690, 742, 794].map((y) => (
            <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#7E5730" strokeWidth="4" />
          ))}
          {/* eaves and posts */}
          <rect width="800" height="86" fill="#33271F" />
          <path d="M0 86 L800 118 L800 86 Z" fill="#241C16" />
          <rect x="86" y="86" width="26" height="516" fill="#7A522E" />
          <rect x="688" y="86" width="26" height="516" fill="#7A522E" />
          <rect x="86" y="150" width="628" height="10" fill="#6B4623" opacity="0.7" />
          {/* table and two chairs */}
          <rect x="236" y="486" width="330" height="16" rx="4" fill="#A87A46" />
          <rect x="266" y="502" width="14" height="98" fill="#8A6236" />
          <rect x="522" y="502" width="14" height="98" fill="#8A6236" />
          <path d="M170 600 v-96 h64 v96 M170 540 h64" stroke="#7A522E" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M568 600 v-96 h64 v96 M568 540 h64" stroke="#7A522E" strokeWidth="12" fill="none" strokeLinecap="round" />
          <circle cx="330" cy="470" r="16" fill="#F5EFE4" />
          <circle cx="470" cy="470" r="16" fill="#F5EFE4" />
        </>
      );

    case 'stove':
      return (
        <>
          <defs>
            <radialGradient id={`${uid}-fire`} cx="50%" cy="60%" r="55%">
              <stop offset="0%" stopColor="#FFD98A" />
              <stop offset="60%" stopColor="#DE8B3C" />
              <stop offset="100%" stopColor="#8C3F1E" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          <rect width="800" height="800" fill="#2A2019" />
          <rect width="800" height="800" fill="#3A2C21" opacity="0.6" />
          <rect y="660" width="800" height="140" fill="#5E4226" />
          {/* stove body */}
          <rect x="228" y="216" width="344" height="450" rx="10" fill="#6B4A3A" />
          <rect x="248" y="236" width="304" height="410" rx="6" fill="#7C5745" />
          {[300, 372, 444, 516, 588].map((y) => (
            <line key={y} x1="248" y1={y} x2="552" y2={y} stroke="#654534" strokeWidth="3" />
          ))}
          {[248, 324, 400, 476, 552].map((x) => (
            <line key={x} x1={x} y1="236" x2={x} y2="646" stroke="#654534" strokeWidth="3" />
          ))}
          <rect x="206" y="188" width="388" height="34" rx="6" fill="#54382A" />
          <rect x="366" y="0" width="68" height="192" fill="#3E2C22" />
          {/* firebox */}
          <rect x="306" y="408" width="188" height="150" rx="6" fill="#241812" />
          <ellipse cx="400" cy="492" rx="104" ry="86" fill={`url(#${uid}-fire)`} />
          <path d="M356 552 q18 -66 44 -84 q26 18 44 84 z" fill="#FFC061" />
          <path d="M378 552 q12 -42 22 -54 q10 12 22 54 z" fill="#FFEBB8" />
          <rect x="306" y="408" width="188" height="150" rx="6" fill="none" stroke="#1A110C" strokeWidth="10" />
          {/* firewood */}
          <g fill="#8A5E33">
            <rect x="612" y="588" width="132" height="26" rx="13" />
            <rect x="612" y="620" width="132" height="26" rx="13" />
            <rect x="628" y="556" width="100" height="26" rx="13" />
          </g>
          <ellipse cx="400" cy="700" rx="260" ry="60" fill="#E0A64A" opacity="0.14" />
        </>
      );

    case 'orchard':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E9E2C9" />
              <stop offset="100%" stopColor="#F5EEDC" />
            </linearGradient>
          </defs>
          <rect width="800" height="800" fill={`url(#${uid}-sky)`} />
          <path d="M0 356 L160 300 L320 350 L480 292 L640 348 L800 302 L800 470 L0 470 Z" fill="#59705F" opacity="0.35" />
          <rect y="452" width="800" height="348" fill="#63813F" />
          <path d="M0 452 Q200 424 400 452 T800 452 L800 530 L0 530 Z" fill="#71914A" />
          {/* fruit trees */}
          {[{ x: 150, s: 1 }, { x: 400, s: 1.25 }, { x: 648, s: 0.92 }].map((t) => (
            <g key={t.x} transform={`translate(${t.x} 560) scale(${t.s})`}>
              <rect x="-13" y="-92" width="26" height="106" fill="#6B4A2A" />
              <path d="M-13 -60 L-52 -96 M13 -66 L54 -104" stroke="#6B4A2A" strokeWidth="9" strokeLinecap="round" />
              <circle cx="0" cy="-140" r="86" fill="#3F6B33" />
              <circle cx="-56" cy="-108" r="52" fill="#477736" />
              <circle cx="58" cy="-116" r="56" fill="#356028" />
              {[[-40, -160], [22, -186], [58, -132], [-14, -116], [36, -84]].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="8" fill="#C9502F" />
              ))}
            </g>
          ))}
          {/* fence */}
          {Array.from({ length: 18 }, (_, i) => 20 + i * 46).map((x) => (
            <rect key={x} x={x} y="636" width="15" height="104" rx="6" fill="#A98A5F" />
          ))}
          <rect y="666" width="800" height="12" fill="#96784F" />
          <rect y="712" width="800" height="12" fill="#96784F" />
          <ellipse cx="400" cy="790" rx="420" ry="40" fill="#4F6B33" opacity="0.45" />
        </>
      );
  }
}
