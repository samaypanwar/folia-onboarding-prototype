// folia-screens-v2.jsx — Screens 1, 2, 3

// ── Design tokens ────────────────────────────────────────────
const V2T = {
  cream: '#F5F0E8',
  charcoal: '#2C2420',
  green: '#5C7A4E',
  terra: '#52BD97',
  accent: '#52BD97',
  muted: '#8C7B6E',
  serif: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', system-ui, sans-serif",
};

// ── Shared atoms ─────────────────────────────────────────────
function V2CTAButton({ children, onClick, color, disabled = false, fullWidth = false }) {
  const [pressed, setPressed] = React.useState(false);
  const bg = disabled ? '#C8BDB7' : (color || V2T.accent);
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => !disabled && setPressed(true)}
      onTouchEnd={() => { setPressed(false); if (!disabled && onClick) onClick(); }}
      style={{
        background: bg, color: V2T.cream,
        fontFamily: V2T.sans, fontWeight: 600, fontSize: 17,
        border: 'none', borderRadius: 100,
        width: fullWidth ? '100%' : undefined,
        padding: fullWidth ? '15px 20px' : '15px 40px',
        cursor: disabled ? 'default' : 'pointer',
        transform: pressed ? 'scale(0.96)' : 'scale(1)',
        transition: 'transform 0.15s ease, background 0.3s ease',
        boxShadow: disabled ? 'none' : '0 6px 20px rgba(44,36,32,0.15)',
        letterSpacing: 0.2, whiteSpace: 'nowrap', boxSizing: 'border-box',
      }}>
      {children}
    </button>
  );
}

function V2ScreenWrap({ children, bg }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: bg || V2T.cream,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      fontFamily: V2T.sans,
    }}>
      {children}
    </div>
  );
}

function V2StepLabel({ n, color }) {
  return (
    <div style={{
      fontFamily: V2T.sans, fontSize: 12, fontWeight: 600,
      letterSpacing: 1.3, textTransform: 'uppercase', color: color || V2T.accent,
      marginBottom: 6
    }}>
      Step {n}
    </div>
  );
}

function V2Heading({ children }) {
  return (
    <div style={{
      fontFamily: V2T.serif, fontSize: 28, fontWeight: 700,
      color: V2T.charcoal, lineHeight: 1.2, letterSpacing: -0.5
    }}>
      {children}
    </div>
  );
}

function V2ProgressBar({ step, total = 3, color = V2T.accent }) {
  const pct = Math.max(0, Math.min(1, step / total)) * 100;
  return (
    <div style={{
      width: '100%', height: 7, borderRadius: 100,
      background: 'rgba(44,36,32,0.10)', overflow: 'hidden',
    }}>
      <div style={{
        width: `${pct}%`, height: '100%', borderRadius: 100,
        background: color || V2T.accent,
        transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1)',
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 1 — Welcome  (happy ↔ sad mood cycle)
// ─────────────────────────────────────────────────────────────
function V2Screen1({ onNext }) {
  return (
    <V2ScreenWrap>
      {/* soft radial glow */}
      <div style={{
        position: 'absolute', top: '31%', left: '50%', transform: 'translateX(-50%)',
        width: 260, height: 260, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,113,74,0.10) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 32px', gap: 0,
      }}>
        {/* Logo */}
        <img
          src="uploads/Asset 1 1 (1).png"
          alt="Folia"
          style={{
            width: 171, maxWidth: '100%', height: 'auto',
            display: 'block', marginBottom: 18,
            userSelect: 'none', pointerEvents: 'none',
          }}
        />

        {/* Tagline */}
        <div style={{
          fontFamily: V2T.serif, fontStyle: 'italic',
          fontSize: 16, color: V2T.muted,
          textAlign: 'center', lineHeight: 1.6,
          maxWidth: 248,
        }}>
          A desk plant that experiences<br />the world through you.
        </div>

        <div style={{ width: '85%', marginTop: 20 }}>
          <V2CTAButton onClick={onNext} fullWidth>Build your own</V2CTAButton>
        </div>
      </div>
    </V2ScreenWrap>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 2 — Choose Your Plant  (2 × 3 grid)
// ─────────────────────────────────────────────────────────────
const V2_PLANT_ORDER = ['wanderer', 'quietpresence', 'dreamer', 'steadyone'];

function V2PlantCard({ plantId, selected, onSelect }) {
  const data = V2_PLANT_DATA[plantId];
  const [bounce, setBounce] = React.useState(false);

  const handle = () => {
    onSelect(plantId);
    setBounce(true);
    setTimeout(() => setBounce(false), 420);
  };

  return (
    <div onClick={handle} style={{
      flex: '1 1 calc(50% - 5px)', minWidth: 0,
      aspectRatio: '1 / 1',
      background: '#fff',
      borderRadius: 18,
      border: selected ? `2px solid ${V2T.accent}` : '2px solid transparent',
      boxShadow: selected ? `0 8px 22px ${V2T.accent}30` : '0 2px 10px rgba(44,36,32,0.07)',
      padding: '12px 10px 11px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'space-between', boxSizing: 'border-box',
      cursor: 'pointer',
      transform: bounce ? 'scale(1.06) translateY(-4px)' : selected ? 'translateY(-2px)' : 'scale(1)',
      transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      <div style={{
        flex: 1, width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: 0,
      }}>
        <V2SmartPlantPreview plantId={plantId} mood={selected ? 'happy' : 'neutral'} size={100} />
      </div>
      <div style={{
        fontFamily: V2T.serif, fontSize: 14, fontWeight: 700,
        color: V2T.charcoal, textAlign: 'center',
        lineHeight: 1.16, marginBottom: 4,
      }}>{data.label}</div>
      <div style={{
        fontFamily: V2T.sans, fontSize: 11, color: V2T.muted,
        textAlign: 'center', lineHeight: 1.28,
        opacity: selected ? 1 : 0.7,
      }}>{data.tagline}</div>
    </div>
  );
}

function V2Screen2({ onNext, state, setState }) {
  return (
    <V2ScreenWrap>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 18px 20px', overflowY: 'auto' }}>

        <div style={{ paddingTop: 52, marginBottom: 20 }}>
          <V2ProgressBar step={1} total={4} color={V2T.accent} />
          <div style={{ marginTop: 20 }}>
            <V2Heading>Choose your plant.</V2Heading>
            <div style={{ fontFamily: V2T.sans, fontSize: 14, color: V2T.muted, marginTop: 6, lineHeight: 1.5 }}>
              Every Folia has its own personality. Pick yours.
            </div>
          </div>
        </div>

        {/* 2 × 3 grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignContent: 'flex-start' }}>
          {V2_PLANT_ORDER.map(id => (
            <V2PlantCard key={id} plantId={id}
              selected={state.plantId === id}
              onSelect={p => setState(s => ({ ...s, plantId: p }))}
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, paddingBottom: 8, width: '100%' }}>
          <V2CTAButton onClick={onNext} disabled={!state.plantId} fullWidth>
            {state.plantId ? 'Looks good' : 'Choose to continue'}
          </V2CTAButton>
        </div>
      </div>
    </V2ScreenWrap>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 3 — Design Your Pot
// Controls top · Live preview bottom
// ─────────────────────────────────────────────────────────────

function V2DrawCanvas({ label }) {
  const ref = React.useRef(null);
  const drawing = React.useRef(false);
  const [drawn, setDrawn] = React.useState(false);
  const pos = (e, c) => {
    const rect = c.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - rect.left, y: t.clientY - rect.top };
  };
  const start = e => { e.preventDefault(); drawing.current = true; const c = ref.current; const ctx = c.getContext('2d'); const p = pos(e, c); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
  const move = e => { e.preventDefault(); if (!drawing.current) return; const c = ref.current; const ctx = c.getContext('2d'); const p = pos(e, c); ctx.lineTo(p.x, p.y); ctx.strokeStyle = '#2C2420'; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); setDrawn(true); };
  const end = () => { drawing.current = false; };
  const clear = () => { ref.current.getContext('2d').clearRect(0, 0, 110, 72); setDrawn(false); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ fontFamily: V2T.sans, fontSize: 10, color: V2T.muted, letterSpacing: 0.3 }}>{label}</div>
      <div style={{ borderRadius: 10, overflow: 'hidden', border: '1.5px solid rgba(44,36,32,0.1)', background: '#fff' }}>
        <canvas ref={ref} width={110} height={72}
          onMouseDown={start} onMouseMove={move} onMouseUp={end}
          onTouchStart={start} onTouchMove={move} onTouchEnd={end}
          style={{ display: 'block', touchAction: 'none', cursor: 'crosshair' }} />
      </div>
      {drawn && <button onClick={clear} style={{ fontFamily: V2T.sans, fontSize: 10, color: V2T.muted, background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}>clear</button>}
    </div>
  );
}

function V2PotShapeCard({ pot, selected, color, onSelect }) {
  const potImg = V2_IMG_POTS[pot.id];
  const Pot = V2_POT_SHAPES[pot.id] || V2PearPot;
  return (
    <div onClick={onSelect} style={{
      flex: '0 0 178px', width: 178, height: 178, boxSizing: 'border-box',
      background: '#fff',
      border: selected ? `2px solid ${color}` : '2px solid rgba(44,36,32,0.06)',
      borderRadius: 18, boxShadow: selected ? `0 8px 22px ${color}26` : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      {potImg
        ? <img src={potImg} style={{
          width: 148, height: 148,
          objectFit: 'contain', objectPosition: 'center',
          mixBlendMode: 'multiply',
          userSelect: 'none', pointerEvents: 'none',
        }} alt="" />
        : <svg width={148} height={136} viewBox="0 0 130 118" style={{ overflow: 'visible' }}>
          <Pot cx={65} potTop={10} color={color} expression="neutral" />
        </svg>
      }
    </div>
  );
}

function V2PotShapeCarousel({ selectedShape, color, onSelect }) {
  const rowRef = React.useRef(null);
  const hasPositioned = React.useRef(false);
  const CARD_W = 178;
  const GAP = 10;
  const SET_COUNT = 9;
  const middleSet = Math.floor(SET_COUNT / 2);
  const repeatedPots = Array.from({ length: SET_COUNT }, () => V2_POT_DATA).flat();

  React.useEffect(() => {
    const row = rowRef.current;
    if (!row || hasPositioned.current) return;
    hasPositioned.current = true;
    const selectedIndex = Math.max(0, V2_POT_DATA.findIndex(p => p.id === selectedShape));
    const targetIndex = (middleSet * V2_POT_DATA.length) + selectedIndex;
    row.scrollLeft = (targetIndex * (CARD_W + GAP)) - ((row.clientWidth - CARD_W) / 2);
  }, [selectedShape]);

  return (
    <div style={{ position: 'relative', marginLeft: -18, marginRight: -18 }}>
      <div ref={rowRef} style={{
        display: 'flex', flexWrap: 'nowrap', gap: GAP,
        overflowX: 'auto',
        padding: `2px calc(50% - ${CARD_W / 2}px) 6px`,
        WebkitOverflowScrolling: 'touch',
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
      }}>
        {repeatedPots.map((pot, idx) => (
          <div key={`${pot.id}-${idx}`} style={{ scrollSnapAlign: 'center' }}>
            <V2PotShapeCard
              pot={pot}
              selected={selectedShape === pot.id}
              color={color}
              onSelect={() => onSelect(pot.id)}
            />
          </div>
        ))}
      </div>
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: 42,
        background: 'linear-gradient(90deg, rgba(245,240,232,0.95), rgba(245,240,232,0))',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0,
        width: 42,
        background: 'linear-gradient(90deg, rgba(245,240,232,0), rgba(245,240,232,0.95))',
        pointerEvents: 'none',
      }} />
    </div>
  );
}

function V2Screen3({ onNext, state, setState }) {
  const accentColor = V2T.accent;

  return (
    <V2ScreenWrap>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '16px 18px 18px', overflow: 'hidden' }}>
        <div style={{ paddingTop: 52, marginBottom: 14 }}>
          <V2ProgressBar step={2} total={4} color={accentColor} />
          <div style={{ marginTop: 20 }}>
            <V2Heading>Design your pot.</V2Heading>
            <div style={{ fontFamily: V2T.sans, fontSize: 14, color: V2T.muted, marginTop: 6, lineHeight: 1.45 }}>
              Same plant, different look. Pick what fits.
            </div>
          </div>
        </div>

        <div style={{
          height: 282, flexShrink: 0, borderRadius: 24, marginBottom: 0,
          background: '#F3EADB',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <V2SmartComposite
            plantId={state.plantId || 'wanderer'}
            potShape={state.potShape || 'pumpkin'}
            potColor={state.potApplyColor || state.potColor}
            potColorId={state.potColorId}
            mood="happy"
            expression="happy"
            scale={1.2}
          />
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 0 10px', marginBottom: 12 }}>
            <div style={{ fontFamily: V2T.sans, fontWeight: 600, fontSize: 12, color: V2T.charcoal, marginBottom: 8, letterSpacing: 0.2 }}>Colour</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {V2_POT_COLORS.map(c => {
                const selectedColorId = V2ResolvePotColorId({ potColorId: state.potColorId, potColor: state.potColor });
                const sel = selectedColorId === c.id;
                return (
                  <div key={c.id} onClick={() => setState(s => ({ ...s, potColorId: c.id, potColor: c.hex, potApplyColor: c.apply }))} style={{
                    width: 32, height: 32, borderRadius: '50%', background: c.hex,
                    outline: sel ? `3px solid ${V2T.accent}` : 'none', outlineOffset: 2,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.12)', cursor: 'pointer',
                    transform: sel ? 'scale(1.14)' : 'scale(1)', transition: 'all 0.2s ease',
                  }} />
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: 10 }}>
            <div style={{ fontFamily: V2T.sans, fontWeight: 600, fontSize: 12, color: V2T.charcoal, marginBottom: 8, letterSpacing: 0.2 }}>Shape</div>
            <V2PotShapeCarousel
              selectedShape={state.potShape}
              color={accentColor}
              onSelect={potShape => setState(s => ({ ...s, potShape }))}
            />
          </div>
        </div>

        <div style={{ width: '100%', marginTop: 20 }}>
          <V2CTAButton onClick={onNext} color={accentColor} fullWidth>
            Looking good
          </V2CTAButton>
        </div>
      </div>
    </V2ScreenWrap>
  );
}

Object.assign(window, {
  V2T, V2CTAButton, V2ScreenWrap, V2StepLabel, V2Heading, V2ProgressBar,
  V2Screen1, V2Screen2, V2Screen3,
  V2PlantCard, V2DrawCanvas, V2PotShapeCarousel,
  V2_PLANT_ORDER,
});
