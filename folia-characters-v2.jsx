// folia-characters-v2.jsx
// 6 plant tops (happy/sad mood) + 4 pot shapes + composite character

const V2_MOOD_T = 'opacity 0.9s ease';
const V2_SAD_F = 'saturate(0.28) brightness(0.80)';

// ─── helper: leaf path from base (bx,by) at angle deg (0=up), length len ────
function lp(bx, by, angleDeg, len, curl = 6) {
  const r = (angleDeg - 90) * Math.PI / 180;
  const ex = bx + Math.cos(r) * len;
  const ey = by + Math.sin(r) * len;
  const mx = bx + Math.cos(r) * len * 0.52 + Math.cos(r + Math.PI / 2) * curl;
  const my = by + Math.sin(r) * len * 0.52 + Math.sin(r + Math.PI / 2) * curl;
  return `M${bx},${by} Q${mx},${my} ${ex},${ey}`;
}

// ════════════════════════════════════════════════════════
// PLANT TOPS — grow upward from (cx, cy)
// ════════════════════════════════════════════════════════

// 1. THE WANDERER — Air Plant spiky starburst
function V2WandererTop({ cx = 65, cy = 112, mood = 'happy' }) {
  const happy = mood === 'happy';
  const hA = [-70, -46, -24, -7, 7, 24, 46, 70];
  const sA = [110, 132, 156, 173, -173, -156, -132, -110];
  const lens = [42, 50, 46, 54, 54, 46, 50, 42];
  const cols = ['#5C7A4E', '#8CB87A', '#6A8F5A', '#7AAF64', '#7AAF64', '#6A8F5A', '#8CB87A', '#5C7A4E'];
  const draw = (angles) => angles.map((a, i) => (
    <path key={i} d={lp(cx, cy, a, lens[i], happy ? 7 : -4)} stroke={cols[i]} strokeWidth={3.5} fill="none" strokeLinecap="round" />
  ));
  return (
    <g>
      <g style={{ opacity: happy ? 1 : 0, transition: V2_MOOD_T }}>{draw(hA)}</g>
      <g style={{ opacity: happy ? 0 : 1, transition: V2_MOOD_T, filter: V2_SAD_F }}>{draw(sA)}</g>
    </g>
  );
}

// 2. THE QUIET PRESENCE — Echeveria rosette
function V2QuietPresenceTop({ cx = 65, cy = 112, mood = 'happy' }) {
  const happy = mood === 'happy';
  const petal = (angle, rx, ry, dist, fill, k) => {
    const r = (angle - 90) * Math.PI / 180;
    const px = cx + Math.cos(r) * dist;
    const py = cy + Math.sin(r) * dist;
    return <ellipse key={k} cx={px} cy={py} rx={rx} ry={ry} fill={fill} transform={`rotate(${angle},${px},${py})`} />;
  };
  const outer = [0, 45, 90, 135, 180, 225, 270, 315];
  const inner = [22, 112, 202, 292];
  const hc = ['#C4A0B8', '#D4B8C8', '#B890A8', '#DCC8D8'];
  const sc = ['#B09098', '#C0A4AE', '#A08090', '#C0B0B8'];
  const draw = (c) => (
    <g>
      {outer.map((a, i) => petal(a, 14, 10, 26, i % 2 === 0 ? c[0] : c[1], `o${i}`))}
      {inner.map((a, i) => petal(a, 10, 7, 14, i % 2 === 0 ? c[2] : c[3], `i${i}`))}
      <circle cx={cx} cy={cy} r={9} fill={c[2]} />
      <circle cx={cx} cy={cy} r={5} fill={c[1]} />
    </g>
  );
  return (
    <g>
      <g style={{ opacity: happy ? 1 : 0, transition: V2_MOOD_T }}>{draw(hc)}</g>
      <g style={{ opacity: happy ? 0 : 1, transition: V2_MOOD_T, filter: V2_SAD_F }}>{draw(sc)}</g>
    </g>
  );
}

// 3. THE DREAMER — String of Pearls trailing
function V2DreamerTop({ cx = 65, cy = 112, mood = 'happy' }) {
  const happy = mood === 'happy';
  const r = 5.5;
  const happyData = [
    { path: `M${cx},${cy} Q${cx - 18},${cy + 10} ${cx - 34},${cy + 42}`, beads: [[cx - 8, cy + 8], [cx - 20, cy + 22], [cx - 30, cy + 36], [cx - 34, cy + 42]] },
    { path: `M${cx},${cy} Q${cx + 2},${cy - 20} ${cx + 5},${cy - 50}`, beads: [[cx + 1, cy - 12], [cx + 3, cy - 28], [cx + 4, cy - 42]] },
    { path: `M${cx},${cy} Q${cx + 18},${cy + 10} ${cx + 34},${cy + 42}`, beads: [[cx + 8, cy + 8], [cx + 20, cy + 22], [cx + 30, cy + 36], [cx + 34, cy + 42]] },
  ];
  const sadData = [
    { path: `M${cx},${cy} Q${cx - 6},${cy + 20} ${cx - 8},${cy + 52}`, beads: [[cx - 2, cy + 12], [cx - 4, cy + 26], [cx - 6, cy + 40], [cx - 8, cy + 52]] },
    { path: `M${cx},${cy} Q${cx + 2},${cy - 18} ${cx + 4},${cy - 46}`, beads: [[cx + 1, cy - 12], [cx + 2, cy - 26], [cx + 3, cy - 40]] },
    { path: `M${cx},${cy} Q${cx + 6},${cy + 20} ${cx + 8},${cy + 52}`, beads: [[cx + 2, cy + 12], [cx + 4, cy + 26], [cx + 6, cy + 40], [cx + 8, cy + 52]] },
  ];
  const draw = (data, br) => data.map((s, i) => (
    <g key={i}>
      <path d={s.path} stroke="#5C7A4E" strokeWidth={2} fill="none" strokeLinecap="round" />
      {s.beads.map(([bx, by], j) => <circle key={j} cx={bx} cy={by} r={br} fill="#7CB87A" stroke="#5C7A4E" strokeWidth={1} />)}
    </g>
  ));
  return (
    <g>
      <g style={{ opacity: happy ? 1 : 0, transition: V2_MOOD_T }}>{draw(happyData, r)}</g>
      <g style={{ opacity: happy ? 0 : 1, transition: V2_MOOD_T, filter: V2_SAD_F }}>{draw(sadData, r - 0.8)}</g>
    </g>
  );
}

// 4. THE STEADY ONE — Haworthia upright striped leaves
function V2SteadyOneTop({ cx = 65, cy = 112, mood = 'happy' }) {
  const happy = mood === 'happy';
  const angles = [-28, -13, 0, 13, 28];
  const lens = [44, 52, 58, 52, 44];
  const draw = () => angles.map((a, i) => {
    const rad = (a - 90) * Math.PI / 180;
    const len = lens[i];
    const ex = cx + Math.cos(rad) * len, ey = cy + Math.sin(rad) * len;
    const w = 8;
    const pr = rad + Math.PI / 2;
    const x1l = cx + Math.cos(pr) * w / 2, y1l = cy + Math.sin(pr) * w / 2;
    const x1r = cx - Math.cos(pr) * w / 2, y1r = cy - Math.sin(pr) * w / 2;
    const mx = cx + Math.cos(rad) * len * 0.55, my = cy + Math.sin(rad) * len * 0.55;
    return (
      <g key={i}>
        <path d={`M${x1l},${y1l} Q${mx + Math.cos(pr) * 3},${my + Math.sin(pr) * 3} ${ex},${ey} Q${mx - Math.cos(pr) * 3},${my - Math.sin(pr) * 3} ${x1r},${y1r} Z`}
          fill="#3A6642" />
        <line x1={cx + Math.cos(rad) * len * 0.3} y1={cy + Math.sin(rad) * len * 0.3}
          x2={cx + Math.cos(rad) * len * 0.72} y2={cy + Math.sin(rad) * len * 0.72}
          stroke="#D4E8C0" strokeWidth={1.5} opacity={0.85} />
      </g>
    );
  });
  return (
    <g>
      <g style={{ opacity: happy ? 1 : 0, transition: V2_MOOD_T }}>{draw()}</g>
      <g style={{ opacity: happy ? 0 : 1, transition: V2_MOOD_T, filter: V2_SAD_F }}>{draw()}</g>
    </g>
  );
}

// 5. THE OLD SOUL — Moss Ball kokedama
function V2OldSoulTop({ cx = 65, cy = 112, mood = 'happy' }) {
  const happy = mood === 'happy';
  const ballCy = cy - 30;
  const bumps = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return [cx + Math.cos(a) * 36, ballCy + Math.sin(a) * 28];
  });
  const ball = (ry) => (
    <g>
      <ellipse cx={cx} cy={ballCy} rx={38} ry={ry} fill="#2E5C28" />
      <ellipse cx={cx} cy={ballCy} rx={33} ry={ry - 4} fill="#3A7032" />
      {bumps.map(([bx, by], i) => <circle key={i} cx={bx} cy={by} r={5} fill="#4A8040" />)}
      <ellipse cx={cx - 10} cy={ballCy - 12} rx={12} ry={8} fill="rgba(255,255,255,0.07)" />
    </g>
  );
  return (
    <g>
      <g style={{ opacity: happy ? 1 : 0, transition: V2_MOOD_T }}>{ball(30)}</g>
      <g style={{ opacity: happy ? 0 : 1, transition: V2_MOOD_T, filter: V2_SAD_F }}>{ball(26)}</g>
    </g>
  );
}

// 6. THE CURIOUS ONE — Brain Cactus round with ridges
function V2CuriousOneTop({ cx = 65, cy = 112, mood = 'happy' }) {
  const happy = mood === 'happy';
  const r = 36, top = cy - r * 0.55;
  const ridges = () => [0, 1, 2, 3, 4].map(i => {
    const x = cx - 26 + i * 13;
    let d = `M${x},${top - 4}`;
    for (let j = 0; j < 7; j++) {
      const y = top - 4 + (r * 1.8 / 6) * j;
      d += ` L${x + (j % 2 === 0 ? 4 : -4)},${y}`;
    }
    return <path key={i} d={d} stroke={i % 2 === 0 ? '#3E7C2A' : '#5AAA3C'} strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
  });
  return (
    <g>
      <g style={{ opacity: happy ? 1 : 0, transition: V2_MOOD_T }}>
        <ellipse cx={cx} cy={top + r * 0.45} rx={r + 2} ry={r} fill="#5A9644" />
        {ridges()}
        <ellipse cx={cx - 8} cy={top + 4} rx={10} ry={7} fill="rgba(255,255,255,0.1)" />
      </g>
      <g style={{ opacity: happy ? 0 : 1, transition: V2_MOOD_T, filter: V2_SAD_F }}>
        <ellipse cx={cx} cy={top + r * 0.45} rx={r + 2} ry={r} fill="#5A9644" />
        {ridges()}
      </g>
    </g>
  );
}

// ════════════════════════════════════════════════════════
// POT FACE
// ════════════════════════════════════════════════════════
function V2PotFace({ cx, eyeY, expression = 'neutral', lidColor = '#C4714A' }) {
  const sp = 22, er = 13;
  const lidH = expression === 'sad' ? er * 0.7 : expression === 'happy' ? er * 0.32 : er * 0.18;
  const iris = '#1a1008';
  const eye = (ex) => (
    <g>
      <circle cx={ex} cy={eyeY} r={er} fill="#fff" />
      <circle cx={ex} cy={eyeY + 2} r={er * 0.65} fill={iris} />
      <circle cx={ex} cy={eyeY + 2} r={er * 0.35} fill="#000" />
      <circle cx={ex + 4} cy={eyeY - 3} r={er * 0.2} fill="rgba(255,255,255,0.9)" />
      <rect x={ex - er} y={eyeY - er} width={er * 2} height={lidH} rx={2} fill={lidColor} />
    </g>
  );
  return (
    <g>
      {eye(cx - sp)}
      {eye(cx + sp)}
      <ellipse cx={cx} cy={eyeY + 20} rx={3} ry={2} fill="rgba(0,0,0,0.2)" />
      {expression === 'happy'
        ? <path d={`M${cx - 12},${eyeY + 30} Q${cx},${eyeY + 40} ${cx + 12},${eyeY + 30}`} stroke="rgba(0,0,0,0.22)" strokeWidth={2} fill="none" strokeLinecap="round" />
        : expression === 'sad'
          ? <path d={`M${cx - 12},${eyeY + 38} Q${cx},${eyeY + 28} ${cx + 12},${eyeY + 38}`} stroke="rgba(0,0,0,0.2)" strokeWidth={2} fill="none" strokeLinecap="round" />
          : <path d={`M${cx - 10},${eyeY + 30} Q${cx},${eyeY + 36} ${cx + 10},${eyeY + 30}`} stroke="rgba(0,0,0,0.18)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      }
    </g>
  );
}

// ════════════════════════════════════════════════════════
// POT SHAPES — rendered from potTop downward
// ════════════════════════════════════════════════════════

function V2PearPot({ cx = 65, potTop = 112, color = '#C4714A', expression = 'neutral' }) {
  const b = potTop + 90;
  return (
    <g>
      <ellipse cx={cx} cy={b + 6} rx={44} ry={5} fill="rgba(0,0,0,0.07)" />
      <rect x={cx - 32} y={potTop} width={64} height={11} rx={5} fill={color} />
      <rect x={cx - 32} y={potTop} width={64} height={11} rx={5} fill="rgba(255,255,255,0.22)" />
      <path d={`M${cx - 30},${potTop + 11} C${cx - 44},${potTop + 30} ${cx - 50},${potTop + 54} ${cx - 42},${potTop + 74} C${cx - 34},${potTop + 90} ${cx - 16},${potTop + 90} ${cx},${potTop + 90} C${cx + 16},${potTop + 90} ${cx + 34},${potTop + 90} ${cx + 42},${potTop + 74} C${cx + 50},${potTop + 54} ${cx + 44},${potTop + 30} ${cx + 30},${potTop + 11} Z`} fill={color} />
      <path d={`M${cx - 30},${potTop + 11} C${cx - 44},${potTop + 30} ${cx - 50},${potTop + 54} ${cx - 42},${potTop + 74} C${cx - 36},${potTop + 58} ${cx - 30},${potTop + 32} ${cx - 18},${potTop + 11} Z`} fill="rgba(255,255,255,0.1)" />
      <V2PotFace cx={cx} eyeY={potTop + 48} expression={expression} lidColor={color} />
    </g>
  );
}

function V2PumpkinPot({ cx = 65, potTop = 112, color = '#C4714A', expression = 'neutral' }) {
  const midY = potTop + 50, b = potTop + 88;
  return (
    <g>
      <ellipse cx={cx} cy={b + 5} rx={46} ry={5} fill="rgba(0,0,0,0.07)" />
      <rect x={cx - 30} y={potTop} width={60} height={10} rx={5} fill={color} />
      <rect x={cx - 30} y={potTop} width={60} height={10} rx={5} fill="rgba(255,255,255,0.22)" />
      <ellipse cx={cx} cy={midY} rx={48} ry={40} fill={color} />
      {[-24, -12, 0, 12, 24].map((ox, i) => (
        <path key={i} d={`M${cx + ox},${potTop + 10} Q${cx + ox + 4},${midY} ${cx + ox},${b}`} stroke="rgba(0,0,0,0.08)" strokeWidth={4} fill="none" />
      ))}
      <ellipse cx={cx - 14} cy={potTop + 26} rx={12} ry={8} fill="rgba(255,255,255,0.1)" />
      <V2PotFace cx={cx} eyeY={potTop + 44} expression={expression} lidColor={color} />
    </g>
  );
}

function V2MushroomPot({ cx = 65, potTop = 112, color = '#C4714A', expression = 'neutral' }) {
  const capH = 16, capW = 56, bodyW = 30, bodyH = 70;
  return (
    <g>
      <ellipse cx={cx} cy={potTop + capH + bodyH + 5} rx={bodyW + 4} ry={5} fill="rgba(0,0,0,0.07)" />
      {/* Wide mushroom cap */}
      <rect x={cx - capW} y={potTop} width={capW * 2} height={capH} rx={8} fill={color} />
      <rect x={cx - capW} y={potTop} width={capW * 2} height={capH} rx={8} fill="rgba(255,255,255,0.2)" />
      {/* Narrow body */}
      <rect x={cx - bodyW} y={potTop + capH} width={bodyW * 2} height={bodyH} rx={10} fill={color} />
      <rect x={cx - bodyW} y={potTop + capH} width={bodyW * 0.45} height={bodyH} rx={10} fill="rgba(255,255,255,0.1)" />
      {/* Underside of cap shadow */}
      <rect x={cx - capW} y={potTop + capH - 2} width={capW * 2} height={6} rx={0} fill="rgba(0,0,0,0.06)" />
      <V2PotFace cx={cx} eyeY={potTop + capH + 32} expression={expression} lidColor={color} />
    </g>
  );
}

function V2DragonFruitPot({ cx = 65, potTop = 112, color = '#C4714A', expression = 'neutral' }) {
  const midY = potTop + 48, rx = 44, ry = 42;
  const scales = Array.from({ length: 9 }, (_, i) => {
    const a = ((i / 9) * Math.PI * 1.1) + Math.PI * 0.45;
    const sx = cx + Math.cos(a) * (rx + 1);
    const sy = midY + Math.sin(a) * (ry + 1);
    return { sx, sy, a };
  });
  return (
    <g>
      <ellipse cx={cx} cy={potTop + 95} rx={42} ry={5} fill="rgba(0,0,0,0.07)" />
      <rect x={cx - 28} y={potTop} width={56} height={10} rx={5} fill={color} />
      <rect x={cx - 28} y={potTop} width={56} height={10} rx={5} fill="rgba(255,255,255,0.22)" />
      <ellipse cx={cx} cy={midY} rx={rx} ry={ry} fill={color} />
      {scales.map((s, i) => (
        <polygon key={i}
          points={`${s.sx},${s.sy} ${s.sx + Math.cos(s.a - 0.3) * 12},${s.sy + Math.sin(s.a - 0.3) * 12} ${s.sx + Math.cos(s.a + 0.3) * 12},${s.sy + Math.sin(s.a + 0.3) * 12}`}
          fill={color} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
      ))}
      <ellipse cx={cx - 12} cy={potTop + 24} rx={11} ry={8} fill="rgba(255,255,255,0.1)" />
      <V2PotFace cx={cx} eyeY={potTop + 40} expression={expression} lidColor={color} />
    </g>
  );
}

// ════════════════════════════════════════════════════════
// COMPOSITE CHARACTER — plant top + pot
// ════════════════════════════════════════════════════════
const V2_PLANT_TOPS = {
  wanderer: V2WandererTop,
  quietpresence: V2QuietPresenceTop,
  dreamer: V2DreamerTop,
  steadyone: V2SteadyOneTop,
  oldsoul: V2OldSoulTop,
  curiousone: V2CuriousOneTop,
};

const V2_POT_SHAPES = {
  pear: V2PearPot,
  pumpkin: V2PumpkinPot,
  pineapple: V2DragonFruitPot,
  bear: V2MushroomPot,
  mushroom: V2MushroomPot,
  dragonFruit: V2DragonFruitPot,
};

function V2PlantComposite({ plantId = 'wanderer', potShape = 'pear', potColor = '#C4714A', mood = 'happy', expression = 'neutral', scale = 1, selected = false }) {
  const Plant = V2_PLANT_TOPS[plantId] || V2WandererTop;
  const Pot = V2_POT_SHAPES[potShape] || V2PearPot;
  const vw = 130, vh = 215, cx = 65, potTop = 112;
  return (
    <svg viewBox={`0 0 ${vw} ${vh}`} width={vw * scale} height={vh * scale}
      style={{ overflow: 'visible', filter: selected ? `drop-shadow(0 10px 20px ${potColor}55)` : 'none', transition: 'filter 0.3s' }}>
      <Plant cx={cx} cy={potTop} mood={mood} />
      <Pot cx={cx} potTop={potTop} color={potColor} expression={expression} />
    </svg>
  );
}

// Small plant-only preview for selection grid
function V2PlantPreview({ plantId = 'wanderer', mood = 'happy', size = 78 }) {
  const Plant = V2_PLANT_TOPS[plantId] || V2WandererTop;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible' }}>
      <Plant cx={50} cy={96} mood={mood} />
    </svg>
  );
}

// ════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════
const V2_PLANT_DATA = {
  wanderer: { label: 'The Wanderer', tagline: "Doesn\u2019t need to be rooted anywhere to thrive.", color: '#52BD97', bg: '#FDF0E8' },
  quietpresence: { label: 'The Quiet Presence', tagline: 'Calm, grounded. Just needs occasional light.', color: '#52BD97', bg: '#F4EFF8' },
  dreamer: { label: 'The Dreamer', tagline: 'Goes wherever gravity takes it, unhurried.', color: '#52BD97', bg: '#EDF4EE' },
  steadyone: { label: 'The Steady One', tagline: 'Observant, consistent. Notices small details.', color: '#52BD97', bg: '#EDF4EE' },
  oldsoul: { label: 'The Old Soul', tagline: 'Slow, patient, deeply content just existing.', color: '#52BD97', bg: '#EDF4E8' },
  curiousone: { label: 'The Curious One', tagline: 'Thinks differently. Always surprising.', color: '#52BD97', bg: '#FDF4EC' },
};

const V2_POT_DATA = [
  { id: 'pumpkin', label: 'Pumpkin' },
  { id: 'pineapple', label: 'Pineapple' },
  { id: 'pear', label: 'Pear' },
  { id: 'bear', label: 'Bear' },
];

const V2_POT_COLORS = [
  { id: 'yellow', hex: '#E8C040', label: 'Yellow', apply: '#C4B87A' },
  { id: 'purple', hex: '#9B7EC8', label: 'Purple', apply: '#B29BC3' },
  { id: 'blue', hex: '#6A9EC8', label: 'Blue', apply: '#9AAFC4' },
  { id: 'pink', hex: '#C87890', label: 'Pink', apply: '#C4A8B4' },
];

Object.assign(window, {
  V2WandererTop, V2QuietPresenceTop, V2DreamerTop, V2SteadyOneTop, V2OldSoulTop, V2CuriousOneTop,
  V2PearPot, V2PumpkinPot, V2MushroomPot, V2DragonFruitPot,
  V2PotFace, V2PlantComposite, V2PlantPreview,
  V2_PLANT_TOPS, V2_POT_SHAPES, V2_PLANT_DATA, V2_POT_DATA, V2_POT_COLORS,
});
