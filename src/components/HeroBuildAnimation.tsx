'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

/**
 * "The drawing becomes the house."
 *
 * A scroll-scrubbed architectural sequence: an ink survey drawing of the 1923
 * cottage is set out, footed, framed, roofed and clad; then the draughting
 * lines burn off and the cottage resolves into an evening render below the
 * Făgăraș ridge.
 *
 * The sequence spans a little over one viewport of scroll, so at an ordinary
 * flick it plays in well under five seconds. Only `pathLength`, `opacity` and
 * `transform` are animated — no layout is read or written, so the whole thing
 * stays on the compositor.
 *
 * Accessibility: with `prefers-reduced-motion` the progress value is pinned to
 * 1, which *is* the finished frame — same markup, nothing in motion.
 */

/* ── Geometry ──────────────────────────────────────────────────────────────
   The single place the building is described. Everything derives from this.  */
const G = {
  ground: 600,
  body: { x1: 380, x2: 820, top: 305, bottom: 566 },
  footing: { x1: 362, x2: 838, top: 566, bottom: 600 },
  roof: { apex: { x: 600, y: 150 }, eaveL: { x: 330, y: 305 }, eaveR: { x: 870, y: 305 }, depth: 26 },
  chimney: { x1: 688, x2: 734, top: 108 },
  door: { x1: 566, x2: 638, top: 402, bottom: 566 },
  winL: { x1: 428, x2: 502, top: 372, bottom: 452 },
  winR: { x1: 698, x2: 772, top: 372, bottom: 452 },
  gable: { cx: 600, cy: 250, r: 34 },
  terrace: {
    deckY: 552,
    x1: 178,
    x2: 380,
    postXs: [196, 288, 364],
    roofInner: { x: 402, y: 314 },
    roofOuter: { x: 162, y: 344 },
  },
  courses: [336, 372, 408, 444, 480, 516],
};

/** y on the right-hand roof slope at a given x — keeps the chimney seated. */
const roofYAt = (x: number) =>
  G.roof.apex.y + ((x - G.roof.apex.x) / (G.roof.eaveR.x - G.roof.apex.x)) * (G.roof.eaveR.y - G.roof.apex.y);

/** y on the terrace's shed roof at a given x — keeps the posts the right length. */
const terraceYAt = (x: number) => {
  const { roofInner: i, roofOuter: o } = G.terrace;
  return o.y + ((x - o.x) / (i.x - o.x)) * (i.y - o.y);
};

/** Fraction of the sticky track the construction sequence occupies. */
const BUILD_SPAN = 0.86;

const INK = '#EADDC8';
const GUIDE = '#A38B6B';

const ROOF_LINE = `M ${G.roof.eaveL.x} ${G.roof.eaveL.y} L ${G.roof.apex.x} ${G.roof.apex.y} L ${G.roof.eaveR.x} ${G.roof.eaveR.y}`;
const ROOF_SLAB =
  `M ${G.roof.eaveL.x} ${G.roof.eaveL.y} L ${G.roof.apex.x} ${G.roof.apex.y} L ${G.roof.eaveR.x} ${G.roof.eaveR.y} ` +
  `L ${G.roof.eaveR.x} ${G.roof.eaveR.y + G.roof.depth} L ${G.roof.apex.x} ${G.roof.apex.y + G.roof.depth} ` +
  `L ${G.roof.eaveL.x} ${G.roof.eaveL.y + G.roof.depth} Z`;

/* Custom hooks — declared at module scope so the rules-of-hooks contract is
   explicit. Each is called unconditionally, in a fixed order, exactly once. */
const useStage = (p: MotionValue<number>, a: number, b: number) =>
  useTransform(p, [a, b], [0, 1], { clamp: true });

const useHold = (p: MotionValue<number>, a: number, b: number, c: number, d: number) =>
  useTransform(p, [a, b, c, d], [0, 1, 1, 0], { clamp: true });

/** Attributes that leave a path undrawn before hydration, avoiding a flash. */
const undrawn = { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 } as const;

export default function HeroBuildAnimation({
  label,
  overlay,
}: {
  label: string;
  /** Receives the eased scroll progress so the headline can breathe with the build. */
  overlay?: (progress: MotionValue<number>) => ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  // A light spring stops fast flicks from strobing.
  const spring = useSpring(scrollYProgress, { stiffness: 140, damping: 34, restDelta: 0.0005 });
  /**
   * Reduced motion pins progress to the finished frame. Otherwise the build is
   * compressed into the first `BUILD_SPAN` of the track, so the completed house
   * is held on screen for the remainder rather than leaving the moment the last
   * line is drawn.
   */
  const p = useTransform(() => (reduced ? 1 : Math.min(1, spring.get() / BUILD_SPAN)));

  /* Draughting layers: fade in, hold, burn off. */
  const gridO = useHold(p, -0.02, 0.0, 0.8, 0.9);
  const titleO = useHold(p, 0.0, 0.05, 0.78, 0.88);
  const dimsO = useHold(p, 0.08, 0.18, 0.78, 0.88);
  /** Shared by every inked group — the moment the render takes over. */
  const inkO = useTransform(p, [0.84, 0.95], [1, 0], { clamp: true });

  /* Construction sequence. */
  const dGround = useStage(p, 0.05, 0.13);
  const dFooting = useStage(p, 0.12, 0.24);
  const dFrame = useStage(p, 0.2, 0.33);
  const dCourses = useStage(p, 0.3, 0.45);
  const dTruss = useStage(p, 0.42, 0.56);
  const dRoof = useStage(p, 0.53, 0.67);
  const dChimney = useStage(p, 0.63, 0.72);
  const dOpenings = useStage(p, 0.68, 0.79);
  const dTerrace = useStage(p, 0.75, 0.86);

  /* Resolve. */
  const renderO = useStage(p, 0.84, 0.98);
  const skyO = useStage(p, 0.82, 1.0);
  const lightsO = useStage(p, 0.9, 1.0);
  const smokeO = useStage(p, 0.92, 1.0);
  const ridgeY = useTransform(p, [0.8, 1], [26, 0], { clamp: true });
  /** Courses sit slightly back from the primary frame lines. */
  const coursesO = useTransform(inkO, (v) => v * 0.85);

  return (
    <div ref={track} className="relative h-[200vh] md:h-[220vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden bg-bark-950">
        {/* Cold draughting light warming to dusk as the render lands. */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_12%,#2E251F_0%,#1C1611_72%)]" />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(180deg,#3A3A3E_0%,#6B5540_36%,#9A6D42_56%,#5A422C_70%,#33291F_82%,#241C16_100%)]"
          style={{ opacity: skyO }}
        />

        <p className="sr-only">{label}</p>

        <svg
          viewBox="0 0 1200 760"
          preserveAspectRatio="xMidYMid meet"
          className="relative w-full max-h-[88svh] scale-[1.5] sm:scale-100"
          role="presentation"
          focusable="false"
        >
          <defs>
            <pattern id="bpGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke={GUIDE} strokeWidth="0.6" opacity="0.3" />
            </pattern>
            <linearGradient id="wallFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F3EADA" />
              <stop offset="100%" stopColor="#D6C3A6" />
            </linearGradient>
            <linearGradient id="roofFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3C3028" />
              <stop offset="100%" stopColor="#221B16" />
            </linearGradient>
            <linearGradient id="glowFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFDA8E" />
              <stop offset="100%" stopColor="#DFA349" />
            </linearGradient>
            <linearGradient id="ridgeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A4640" />
              <stop offset="100%" stopColor="#241E18" />
            </linearGradient>
            <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>

          {/* Draughting grid */}
          <motion.rect width="1200" height="760" fill="url(#bpGrid)" style={{ opacity: gridO }} />

          {/* The ridge behind, revealed with the render */}
          <motion.g style={{ opacity: renderO, y: ridgeY }}>
            <path
              d="M0 470 L120 402 L206 442 L300 356 L392 424 L470 372 L560 430 L648 358 L742 418 L836 366 L930 432 L1024 388 L1120 440 L1200 404 L1200 620 L0 620 Z"
              fill="url(#ridgeFill)"
              opacity="0.9"
            />
            {/* snow on the high tops */}
            <path
              d="M300 356 L336 380 L300 396 L268 378 Z M648 358 L680 380 L648 396 L618 378 Z M470 372 L498 392 L470 406 L444 390 Z M836 366 L864 386 L836 400 L810 384 Z"
              fill="#DDE6E4"
              opacity="0.45"
            />
          </motion.g>

          {/* Title block */}
          <motion.g
            className="hidden sm:block"
            style={{ opacity: titleO }}
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            <rect x="52" y="640" width="336" height="74" fill="none" stroke={GUIDE} strokeWidth="1" opacity="0.75" />
            <line x1="52" y1="668" x2="388" y2="668" stroke={GUIDE} strokeWidth="0.8" opacity="0.6" />
            <text x="66" y="661" fill={GUIDE} fontSize="15" letterSpacing="3.4">CĂSUȚA CU TIHNĂ</text>
            <text x="66" y="690" fill={GUIDE} fontSize="11.5" letterSpacing="2" opacity="0.85">PORUMBACU DE SUS · SIBIU</text>
            <text x="66" y="706" fill={GUIDE} fontSize="11.5" letterSpacing="2" opacity="0.85">ANNO 1923 · SC. 1:50</text>
          </motion.g>

          {/* Dimension lines */}
          <motion.g style={{ opacity: dimsO }} stroke={GUIDE} strokeWidth="1" fill="none"
            fontFamily="ui-monospace, SFMono-Regular, monospace">
            <line x1={G.body.x1} y1="648" x2={G.body.x2} y2="648" />
            <path d={`M${G.body.x1} 641 L${G.body.x1} 655 M${G.body.x2} 641 L${G.body.x2} 655`} />
            <text x={(G.body.x1 + G.body.x2) / 2} y="638" fill={GUIDE} fontSize="13" textAnchor="middle" stroke="none">10.40 m</text>
            <line x1="908" y1={G.roof.apex.y} x2="908" y2={G.ground} />
            <path d={`M901 ${G.roof.apex.y} L915 ${G.roof.apex.y} M901 ${G.ground} L915 ${G.ground}`} />
            <text x="924" y="382" fill={GUIDE} fontSize="13" stroke="none">6.80 m</text>
          </motion.g>

          {/* ── Construction, in order of trade ─────────────────────────── */}

          {/* 1 · setting out */}
          <motion.line
            x1="60" y1={G.ground} x2="1140" y2={G.ground}
            stroke={INK} strokeWidth="2.5" strokeLinecap="round" {...undrawn}
            style={{ pathLength: dGround, opacity: inkO }}
          />

          {/* 2 · stone footing */}
          <motion.path
            {...undrawn}
            d={`M${G.footing.x1} ${G.footing.bottom} L${G.footing.x1} ${G.footing.top} L${G.footing.x2} ${G.footing.top} L${G.footing.x2} ${G.footing.bottom} Z
                M${G.footing.x1} 583 L${G.footing.x2} 583
                M436 ${G.footing.top} L436 583 M540 583 L540 ${G.footing.bottom} M652 ${G.footing.top} L652 583 M756 583 L756 ${G.footing.bottom}`}
            fill="none" stroke={INK} strokeWidth="2.2" strokeLinejoin="round"
            style={{ pathLength: dFooting, opacity: inkO }}
          />

          {/* 3 · sill plate and posts */}
          <motion.path
            {...undrawn}
            d={`M${G.body.x1} ${G.body.bottom} L${G.body.x2} ${G.body.bottom}
                M${G.body.x1} ${G.body.bottom} L${G.body.x1} ${G.body.top}
                M${G.body.x2} ${G.body.bottom} L${G.body.x2} ${G.body.top}
                M600 ${G.body.bottom} L600 ${G.body.top}
                M${G.body.x1} ${G.body.top} L${G.body.x2} ${G.body.top}`}
            fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round"
            style={{ pathLength: dFrame, opacity: inkO }}
          />

          {/* 4 · log courses */}
          <motion.path
            {...undrawn}
            d={G.courses.map((y) => `M${G.body.x1} ${y} L${G.body.x2} ${y}`).join(' ')}
            fill="none" stroke={INK} strokeWidth="1.5"
            style={{ pathLength: dCourses, opacity: coursesO }}
          />

          {/* 5 · roof truss */}
          <motion.path
            {...undrawn}
            d={`${ROOF_LINE}
                M420 305 L780 305
                M${G.roof.apex.x} ${G.roof.apex.y} L${G.roof.apex.x} ${G.body.top}
                M470 258 L${G.roof.apex.x} 258 M730 258 L${G.roof.apex.x} 258`}
            fill="none" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round"
            style={{ pathLength: dTruss, opacity: inkO }}
          />

          {/* 6 · roof boarding */}
          <motion.path
            {...undrawn}
            d={`${ROOF_SLAB}
                M400 245 L400 271 M470 205 L470 231 M540 165 L540 191
                M660 165 L660 191 M730 205 L730 231 M800 245 L800 271`}
            fill="none" stroke={INK} strokeWidth="1.8" strokeLinejoin="round"
            style={{ pathLength: dRoof, opacity: inkO }}
          />

          {/* 7 · chimney */}
          <motion.path
            {...undrawn}
            d={`M${G.chimney.x1} ${roofYAt(G.chimney.x1) + 24} L${G.chimney.x1} ${G.chimney.top}
                L${G.chimney.x2} ${G.chimney.top} L${G.chimney.x2} ${roofYAt(G.chimney.x2) + 24}
                M${G.chimney.x1 - 8} ${G.chimney.top} L${G.chimney.x1 - 8} ${G.chimney.top + 14}
                L${G.chimney.x2 + 8} ${G.chimney.top + 14} L${G.chimney.x2 + 8} ${G.chimney.top} Z`}
            fill="none" stroke={INK} strokeWidth="2.2" strokeLinejoin="round"
            style={{ pathLength: dChimney, opacity: inkO }}
          />

          {/* 8 · joinery */}
          <motion.path
            {...undrawn}
            d={`M${G.door.x1} ${G.door.bottom} L${G.door.x1} ${G.door.top} L${G.door.x2} ${G.door.top} L${G.door.x2} ${G.door.bottom}
                M602 ${G.door.top} L602 ${G.door.bottom}
                M${G.winL.x1} ${G.winL.top} L${G.winL.x2} ${G.winL.top} L${G.winL.x2} ${G.winL.bottom} L${G.winL.x1} ${G.winL.bottom} Z
                M465 ${G.winL.top} L465 ${G.winL.bottom} M${G.winL.x1} 412 L${G.winL.x2} 412
                M${G.winR.x1} ${G.winR.top} L${G.winR.x2} ${G.winR.top} L${G.winR.x2} ${G.winR.bottom} L${G.winR.x1} ${G.winR.bottom} Z
                M735 ${G.winR.top} L735 ${G.winR.bottom} M${G.winR.x1} 412 L${G.winR.x2} 412
                M${G.gable.cx - G.gable.r} ${G.gable.cy} a ${G.gable.r} ${G.gable.r} 0 1 0 ${G.gable.r * 2} 0 a ${G.gable.r} ${G.gable.r} 0 1 0 ${-G.gable.r * 2} 0`}
            fill="none" stroke={INK} strokeWidth="2.2" strokeLinejoin="round"
            style={{ pathLength: dOpenings, opacity: inkO }}
          />

          {/* 9 · terrace */}
          <motion.path
            {...undrawn}
            d={`M${G.terrace.x1} ${G.terrace.deckY} L${G.terrace.x2} ${G.terrace.deckY}
                M${G.terrace.x1} ${G.terrace.deckY + 14} L${G.terrace.x2} ${G.terrace.deckY + 14}
                M${G.terrace.roofOuter.x} ${G.terrace.roofOuter.y} L${G.terrace.roofInner.x} ${G.terrace.roofInner.y}
                ${G.terrace.postXs.map((x) => `M${x} ${G.terrace.deckY} L${x} ${terraceYAt(x) + 6}`).join(' ')}
                M${G.terrace.x1} 508 L${G.terrace.x2} 508
                M${G.terrace.x1} ${G.terrace.deckY + 14} L${G.terrace.x1} ${G.ground}
                M${G.terrace.x2} ${G.terrace.deckY + 14} L${G.terrace.x2} ${G.ground}`}
            fill="none" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"
            style={{ pathLength: dTerrace, opacity: inkO }}
          />

          {/* ══ The built house ══════════════════════════════════════════ */}
          <motion.g style={{ opacity: renderO }}>
            {/* terrace — drawn before the shell so its roof tucks behind the wall */}
            <path
              d={`M${G.terrace.roofOuter.x} ${G.terrace.roofOuter.y} L${G.terrace.roofInner.x} ${G.terrace.roofInner.y}
                  L${G.terrace.roofInner.x} ${G.terrace.roofInner.y + 26} L${G.terrace.roofOuter.x} ${G.terrace.roofOuter.y + 26} Z`}
              fill="#33281F"
            />
            {G.terrace.postXs.map((x) => (
              <rect key={x} x={x - 7} y={terraceYAt(x)} width="14" height={G.terrace.deckY - terraceYAt(x)} fill="#7A522E" />
            ))}
            {/* railing */}
            <rect x={G.terrace.x1} y="494" width={G.terrace.x2 - G.terrace.x1} height="9" fill="#8A5E33" />
            {Array.from({ length: 9 }, (_, i) => G.terrace.x1 + 12 + i * ((G.terrace.x2 - G.terrace.x1 - 24) / 8)).map((x) => (
              <rect key={x} x={x - 2.5} y="503" width="5" height={G.terrace.deckY - 503} fill="#6B4623" />
            ))}
            {/* deck platform and skirt */}
            <rect x={G.terrace.x1 - 8} y={G.terrace.deckY} width={G.terrace.x2 - G.terrace.x1 + 16} height="16" fill="#A87A46" />
            <rect x={G.terrace.x1 - 8} y={G.terrace.deckY + 16} width={G.terrace.x2 - G.terrace.x1 + 16} height={G.ground - G.terrace.deckY - 16} fill="#5E4226" />
            {/* a table, so the scale reads as a place to sit */}
            <rect x="228" y="520" width="118" height="8" rx="2" fill="#B2854E" />
            <rect x="244" y="528" width="7" height="24" fill="#8A6236" />
            <rect x="323" y="528" width="7" height="24" fill="#8A6236" />

            {/* shell */}
            <rect x={G.footing.x1} y={G.footing.top} width={G.footing.x2 - G.footing.x1} height={G.footing.bottom - G.footing.top} fill="#6C6860" />
            <rect x={G.body.x1} y={G.body.top} width={G.body.x2 - G.body.x1} height={G.body.bottom - G.body.top} fill="url(#wallFill)" />
            {G.courses.map((y) => (
              <line key={y} x1={G.body.x1} y1={y} x2={G.body.x2} y2={y} stroke="#C3AC8D" strokeWidth="1.4" opacity="0.65" />
            ))}
            <rect x={G.chimney.x1} y={G.chimney.top} width={G.chimney.x2 - G.chimney.x1} height={roofYAt(G.chimney.x2) + 24 - G.chimney.top} fill="#8A5F4A" />
            <rect x={G.chimney.x1 - 8} y={G.chimney.top} width={G.chimney.x2 - G.chimney.x1 + 16} height="14" fill="#6F4A38" />
            <path d={ROOF_SLAB} fill="url(#roofFill)" />

            {/* lit from inside */}
            <motion.g style={{ opacity: lightsO }}>
              <ellipse cx="465" cy="412" rx="90" ry="74" fill="#F0B95E" opacity="0.22" filter="url(#soft)" />
              <ellipse cx="735" cy="412" rx="90" ry="74" fill="#F0B95E" opacity="0.22" filter="url(#soft)" />
              <rect x={G.winL.x1} y={G.winL.top} width={G.winL.x2 - G.winL.x1} height={G.winL.bottom - G.winL.top} fill="url(#glowFill)" />
              <rect x={G.winR.x1} y={G.winR.top} width={G.winR.x2 - G.winR.x1} height={G.winR.bottom - G.winR.top} fill="url(#glowFill)" />
              <circle cx={G.gable.cx} cy={G.gable.cy} r={G.gable.r} fill="url(#glowFill)" opacity="0.88" />
            </motion.g>

            {/* joinery */}
            <g stroke="#372C24" strokeWidth="3" fill="none">
              <path d={`M${G.winL.x1} ${G.winL.top} h74 v80 h-74 Z M465 ${G.winL.top} v80 M${G.winL.x1} 412 h74`} />
              <path d={`M${G.winR.x1} ${G.winR.top} h74 v80 h-74 Z M735 ${G.winR.top} v80 M${G.winR.x1} 412 h74`} />
              <circle cx={G.gable.cx} cy={G.gable.cy} r={G.gable.r} />
              <path d={`M${G.gable.cx - G.gable.r} ${G.gable.cy} h${G.gable.r * 2} M${G.gable.cx} ${G.gable.cy - G.gable.r} v${G.gable.r * 2}`} strokeWidth="2.5" />
            </g>
            <rect x={G.door.x1} y={G.door.top} width={G.door.x2 - G.door.x1} height={G.door.bottom - G.door.top} fill="#7A522E" stroke="#372C24" strokeWidth="3" />
            <line x1="602" y1={G.door.top} x2="602" y2={G.door.bottom} stroke="#372C24" strokeWidth="2" />

            {/* ground */}
            <path d={`M0 ${G.ground} L1200 ${G.ground} L1200 760 L0 760 Z`} fill="#241E18" />
            <path d={`M0 ${G.ground} Q300 588 600 ${G.ground} T1200 ${G.ground} L1200 646 L0 646 Z`} fill="#33291F" />

            {/* spruce, for scale */}
            {[{ x: 986, s: 1.15 }, { x: 1064, s: 0.85 }, { x: 1132, s: 1 }, { x: 60, s: 0.95 }].map((t) => (
              <g key={t.x} transform={`translate(${t.x} ${G.ground}) scale(${t.s})`}>
                <path d="M0 0 L-26 0 L-14 -30 L-21 -30 L-9 -60 L-15 -60 L0 -96 L15 -60 L9 -60 L21 -30 L14 -30 L26 0 Z" fill="#1E1A14" />
              </g>
            ))}
          </motion.g>

          {/* Smoke — only once the fire is lit. */}
          <motion.g style={{ opacity: smokeO }}>
            {[0, 1, 2].map((i) => (
              <circle
                key={i}
                cx={711 + i * 2}
                cy={G.chimney.top - 10}
                r={7 + i * 2}
                fill="#D9D3C6"
                className="animate-smoke-rise"
                style={{
                  // SVG defaults transform-origin to the user-space origin, which
                  // would scale each puff away from (0,0) instead of its own centre.
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  animationDelay: `${i * 1.5}s`,
                }}
              />
            ))}
          </motion.g>
        </svg>

        {/* Keeps the headline legible over whatever the animation is doing. */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(28,22,17,0.76)_0%,rgba(28,22,17,0.18)_38%,rgba(28,22,17,0.54)_76%,rgba(28,22,17,0.93)_100%)]" />

        {overlay ? <div className="absolute inset-0">{overlay(p)}</div> : null}
      </div>
    </div>
  );
}
