// folia-images.jsx
// Image-based compositing for real plant + pot photos

const V2_IMG_PLANTS = {
  wanderer: 'uploads/plant/wanderer.png',
  quietpresence: 'uploads/plant/quietpresence.png',
  dreamer: 'uploads/plant/dreamer.png',
  steadyone: 'uploads/plant/steadyone.png',
};

const V2_IMG_POTS = {
  pumpkin: 'uploads/pots/pumpkin.png',
  pineapple: 'uploads/pots/pineapple.png',
  pear: 'uploads/pots/pear.png',
  bear: 'uploads/pots/bear.png',
};

const V2_COMPOSITE_PLANTS = ['wanderer', 'quietpresence', 'dreamer', 'steadyone'];
const V2_COMPOSITE_SHAPES = ['pumpkin', 'pineapple', 'pear', 'bear'];
const V2_COMPOSITE_COLOR_IDS = ['yellow', 'purple', 'blue', 'pink'];
const V2_COMPOSITE_IMAGES = {};

V2_COMPOSITE_PLANTS.forEach(plantId => {
  V2_COMPOSITE_SHAPES.forEach(potShape => {
    V2_COMPOSITE_COLOR_IDS.forEach(colorId => {
      const key = `${plantId}-${potShape}-${colorId}`;
      V2_COMPOSITE_IMAGES[key] = `uploads/composite/${key}.png`;
    });
  });
});

function V2ResolvePotColorId({ potColorId, potColor } = {}) {
  if (V2_COMPOSITE_COLOR_IDS.includes(potColorId)) return potColorId;
  const color = V2_POT_COLORS.find(c => c.hex === potColor || c.apply === potColor);
  return color ? color.id : 'yellow';
}

function V2CompositeImageKey({ plantId, potShape, potColorId, potColor }) {
  return `${plantId}-${potShape}-${V2ResolvePotColorId({ potColorId, potColor })}`;
}

// Converts a hex color to a CSS filter string using sepia+hue-rotate+saturate
function hexToSepiaFilter(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  const hueDeg = h * 360;
  const hueShift = hueDeg - 38; // sepia base hue ~38°
  const satMult = Math.min((s / 0.6), 3); // scale saturation gently
  return `sepia(1) hue-rotate(${hueShift.toFixed(1)}deg) saturate(${satMult.toFixed(2)})`;
}


// Layout math (all at scale=1, base container 150×210px):
//   potW = 132px → potH = 132 × 1264/843 = 198px
//   pot body starts at ~40% = 79px from top → pot body = 119px tall
//   rim at ~20% into pot body = 24px → rim from bottom = 119-24 = 95px
//   airPlant: 128×128px, base at 80% = 102px → bottom offset = 95-(128-102) = 69px
//   echeveria: 132×198px, base at 88% = 174px → bottom offset = 95-(198-174) = 71px

function V2SmartComposite({
  plantId = 'wanderer',
  potShape = 'pumpkin',
  potColor = '#C4714A',
  potColorId,
  mood = 'happy',
  expression = 'neutral',
  scale = 1,
  selected = false,
}) {
  const plantImg = V2_IMG_PLANTS[plantId];
  const potImg = V2_IMG_POTS[potShape];
  const compositeKey = V2CompositeImageKey({ plantId, potShape, potColorId, potColor });
  const compositeImg = V2_COMPOSITE_IMAGES[compositeKey];
  const W = 150 * scale;
  const H = 210 * scale;
  const sadF = mood === 'sad' ? 'saturate(0.28) brightness(0.80)' : 'none';
  const sadT = 'filter 1.0s ease';
  const shadow = selected ? 'drop-shadow(0 12px 24px rgba(0,0,0,0.18))' : 'none';
  const [missingCompositeKey, setMissingCompositeKey] = React.useState(null);

  React.useEffect(() => {
    setMissingCompositeKey(null);
  }, [compositeKey]);

  if (compositeImg && missingCompositeKey !== compositeKey) {
    return (
      <div style={{ position: 'relative', width: W, height: H, filter: shadow }}>
        <img src={compositeImg}
          onError={() => setMissingCompositeKey(compositeKey)}
          style={{
            width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'center',
            display: 'block',
            userSelect: 'none', pointerEvents: 'none',
            filter: sadF, transition: sadT,
          }} alt="" />
      </div>
    );
  }

  // Pure SVG path
  if (!plantImg && !potImg) {
    return (
      <V2PlantComposite
        plantId={plantId} potShape={potShape} potColor={potColor}
        mood={mood} expression={expression} scale={scale} selected={selected}
      />
    );
  }

  const potW = W * 0.88;
  const potH = potW * (1264 / 843);

  // Rim height from container bottom (pot sits at bottom:0)
  const rimFromBottom = potH * 0.60 * 0.80 * scale;

  // Plant image dims
  const apW = W * 0.85;                       // air plant (square)
  const apH = apW;
  const apBase = apH * 0.80;
  const apBottom = rimFromBottom - (apH - apBase);

  const ecW = W * 0.90;                       // echeveria
  const ecH = ecW * (1264 / 843);
  const ecBase = ecH * 0.88;
  const ecBottom = rimFromBottom - (ecH - ecBase);

  const isAir = plantId === 'wanderer';
  const pW = isAir ? apW : ecW;
  const pH = isAir ? apH : ecH;
  const pBot = (isAir ? apBottom : ecBottom);

  return (
    <div style={{ position: 'relative', width: W, height: H, filter: shadow }}>

      {/* ── POT layer (z=1) ──────────────────────────────── */}
      {potImg ? (
        <div style={{
          position: 'absolute', bottom: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: potW,
          zIndex: 1,
          isolation: 'isolate',
        }}>
          <img src={potImg}
            style={{ width: '100%', display: 'block', mixBlendMode: 'multiply', userSelect: 'none', pointerEvents: 'none' }} alt="" />
          <div style={{
            position: 'absolute', inset: 0,
            background: potColor,
            mixBlendMode: 'color',
            WebkitMaskImage: `url(${potImg})`,
            WebkitMaskSize: '100% 100%',
            maskImage: `url(${potImg})`,
            maskSize: '100% 100%',
          }} />
        </div>
      ) : (
        <svg style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', overflow: 'visible', zIndex: 1 }}
          width={W} height={H * 0.56} viewBox={`0 0 130 118`}>
          {React.createElement(
            V2_POT_SHAPES[potShape] || V2PearPot,
            { cx: 65, potTop: 0, color: potColor, expression }
          )}
        </svg>
      )}

      {/* ── PLANT layer (z=2, in front) ───────────────────── */}
      {plantImg ? (
        <img src={plantImg}
          style={{
            position: 'absolute',
            bottom: Math.max(pBot, 0),
            left: '50%',
            transform: 'translateX(-50%)',
            width: pW,
            zIndex: 2,
            mixBlendMode: 'multiply',
            userSelect: 'none', pointerEvents: 'none',
            filter: sadF, transition: sadT,
          }} alt="" />
      ) : (
        <svg style={{
          position: 'absolute', bottom: rimFromBottom, left: '50%',
          transform: 'translateX(-50%)', overflow: 'visible', zIndex: 2,
          filter: sadF, transition: sadT,
        }} width={W} height={H * 0.55} viewBox={`0 0 130 112`}>
          {React.createElement(
            V2_PLANT_TOPS[plantId] || V2WandererTop,
            { cx: 65, cy: 112, mood }
          )}
        </svg>
      )}
    </div>
  );
}

// ─── Small plant preview for selection cards ──────────────────
function V2SmartPlantPreview({ plantId, mood = 'happy', size = 78 }) {
  const img = V2_IMG_PLANTS[plantId];
  if (img) {
    return (
      <img src={img}
        style={{
          width: size, height: size,
          objectFit: 'contain', objectPosition: 'center',
          mixBlendMode: 'multiply',
          userSelect: 'none', pointerEvents: 'none',
          filter: mood === 'sad' ? 'saturate(0.28) brightness(0.8)' : 'none',
          transition: 'filter 1s ease',
        }} alt="" />
    );
  }
  return <V2PlantPreview plantId={plantId} mood={mood} size={size} />;
}

// ─── Pot shape thumbnail (for picker tiles) ───────────────────
function V2PotThumbnail({ potShape, size = 52 }) {
  const img = V2_IMG_POTS[potShape];
  if (img) {
    // Crop to just the pot body portion
    return (
      <div style={{ width: size, height: size * 0.68, position: 'relative', overflow: 'hidden' }}>
        <img src={img}
          style={{
            position: 'absolute', bottom: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: size * 1.1,
            objectFit: 'contain', objectPosition: 'bottom',
            mixBlendMode: 'multiply',
            userSelect: 'none', pointerEvents: 'none',
          }} alt="" />
      </div>
    );
  }
  return null;
}

Object.assign(window, {
  V2SmartComposite,
  V2SmartPlantPreview,
  V2PotThumbnail,
  V2ResolvePotColorId,
  V2CompositeImageKey,
  V2_COMPOSITE_IMAGES,
  V2_IMG_PLANTS,
  V2_IMG_POTS,
});
