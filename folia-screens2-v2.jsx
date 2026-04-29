// folia-screens2-v2.jsx — Screens 4, 5, 6, 7

// ─────────────────────────────────────────────────────────────
// SCREEN 4 — Name Your Plant
// ─────────────────────────────────────────────────────────────
function V2Screen4({ onNext, state, setState }) {
  const data = state.plantId ? V2_PLANT_DATA[state.plantId] : V2_PLANT_DATA.wanderer;
  const [focused, setFocused] = React.useState(false);
  const firstName = state.plantName.trim().split(' ')[0];

  return (
    <V2ScreenWrap>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 28px 28px', overflow: 'hidden' }}>
        <div style={{ paddingTop: 52, marginBottom: 20, width: '100%' }}>
          <V2ProgressBar step={3} total={4} color={V2T.accent} />
          <div style={{ marginTop: 20 }}>
            <V2Heading>Give your plant a name.</V2Heading>
            <div style={{ fontFamily: V2T.sans, fontSize: 14, color: V2T.muted, marginTop: 6, lineHeight: 1.5 }}>
              Make this {data.label.toLowerCase()} feel like yours.
            </div>
          </div>
        </div>

        {/* Character */}
        <div style={{
          marginBottom: 20,
        }}>
          <V2SmartComposite
            plantId={state.plantId || 'wanderer'}
            potShape={state.potShape || 'pumpkin'}
            potColor={state.potApplyColor || state.potColor || '#B29BC3'}
            potColorId={state.potColorId}
            mood={state.plantName ? 'happy' : 'neutral'}
            expression={state.plantName ? 'happy' : 'neutral'}
            scale={1.3}
          />
        </div>

        {/* Name input */}
        <input
          value={state.plantName}
          onChange={e => setState(s => ({ ...s, plantName: e.target.value }))}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={e => { if (e.key === 'Enter' && state.plantName.trim()) onNext(); }}
          maxLength={22}
          placeholder="e.g. Miso, Fig"
          style={{
            width: 230, maxWidth: '100%', boxSizing: 'border-box',
            fontFamily: V2T.serif, fontSize: 28, fontWeight: 700,
            color: V2T.charcoal, textAlign: 'center',
            background: 'transparent', border: 'none',
            borderBottom: `2px solid ${focused ? V2T.accent : 'rgba(44,36,32,0.15)'}`,
            outline: 'none', padding: '8px 0', marginBottom: 16,
            transition: 'border-color 0.3s ease',
          }}
        />

        <div style={{
          fontFamily: V2T.serif, fontStyle: 'italic',
          fontSize: 14, color: V2T.muted, textAlign: 'center',
          lineHeight: 1.6, maxWidth: 250,
          opacity: state.plantName ? 1 : 0.5,
          transition: 'opacity 0.4s ease',
        }}>
          {state.plantName
            ? `${firstName} will be waiting on your desk.`
            : 'This is who will be waiting on your desk.'}
        </div>

        <div style={{ width: '100%', marginTop: 20 }}>
          <V2CTAButton onClick={onNext} disabled={!state.plantName.trim()} color={data.color} fullWidth>
            {state.plantName.trim() ? `Hello, ${firstName}` : 'Name them to continue'}
          </V2CTAButton>
        </div>
      </div>
    </V2ScreenWrap>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 5 — Your Rhythm
// ─────────────────────────────────────────────────────────────
const V2_RHYTHM_QS = [
  { id: 'freq', q: () => 'How often do you step outside during your day?', opts: ['Barely ever', 'Once or twice', 'A few times', 'Whenever I can'] },
  { id: 'lastSun', q: () => 'When did you last go outside just for yourself — not to commute or run errands?', opts: ['Today', 'A few days ago', 'Honestly can\u2019t remember'] },
  { id: 'bestTime', q: () => 'What part of the day feels most yours?', opts: ['Early morning', 'Midday', 'Late afternoon', 'Evening'] },
];

function V2RhythmOpt({ label, selected, color, onSelect }) {
  return (
    <div onClick={onSelect} style={{
      background: selected ? `${color}12` : '#fff',
      border: selected ? `2px solid ${color}` : '2px solid rgba(44,36,32,0.08)',
      borderRadius: 14, padding: '12px 16px',
      display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: V2T.sans, fontSize: 14,
      color: selected ? V2T.charcoal : V2T.muted,
      fontWeight: selected ? 600 : 400,
      cursor: 'pointer',
      transform: selected ? 'scale(1.02)' : 'scale(1)',
      transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
        background: selected ? color : 'transparent',
        border: selected ? 'none' : '2px solid rgba(44,36,32,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s ease',
      }}>
        {selected && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />}
      </div>
      {label}
    </div>
  );
}

function V2Screen5({ onNext, state, setState }) {
  const data = state.plantId ? V2_PLANT_DATA[state.plantId] : V2_PLANT_DATA.wanderer;
  const name = state.plantName || 'your plant';
  const rhythm = state.rhythm || {};
  const allDone = V2_RHYTHM_QS.every(q => rhythm[q.id]);

  return (
    <V2ScreenWrap>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 18px 24px', overflowY: 'auto' }}>
        <div style={{ paddingTop: 52, marginBottom: 20 }}>
          <V2ProgressBar step={4} total={4} color={V2T.accent} />
          <V2Heading>How does {name.split(' ')[0]}<br />like to explore?</V2Heading>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {V2_RHYTHM_QS.map(rq => (
            <div key={rq.id}>
              <div style={{ fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 15, color: V2T.charcoal, marginBottom: 9, lineHeight: 1.45 }}>
                {rq.q(name)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {rq.opts.map(opt => (
                  <V2RhythmOpt key={opt} label={opt}
                    selected={rhythm[rq.id] === opt}
                    color={data.color}
                    onSelect={() => setState(s => ({ ...s, rhythm: { ...s.rhythm, [rq.id]: opt } }))}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ width: '100%', marginTop: 20 }}>
          <V2CTAButton onClick={onNext} disabled={!allDone} color={data.color} fullWidth>
            {allDone ? 'Almost there' : 'Answer to continue'}
          </V2CTAButton>
        </div>
      </div>
    </V2ScreenWrap>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 6 — Reveal
// ─────────────────────────────────────────────────────────────
function V2Screen6({ onNext, state }) {
  const [stage, setStage] = React.useState(0);
  const data = state.plantId ? V2_PLANT_DATA[state.plantId] : V2_PLANT_DATA.wanderer;
  const name = state.plantName || 'your plant';

  React.useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 200);
    const t2 = setTimeout(() => setStage(2), 900);
    const t3 = setTimeout(() => setStage(3), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <V2ScreenWrap>
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 320, height: 320, borderRadius: '50%',
        background: `radial-gradient(circle, ${data.color}1A 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '60px 32px 48px',
      }}>

        {/* Character reveal */}
        <div style={{
          opacity: stage >= 1 ? 1 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.34,1.56,0.64,1)',
          marginBottom: 24,
        }}>
          <V2SmartComposite
            plantId={state.plantId || 'wanderer'}
            potShape={state.potShape || 'pumpkin'}
            potColor={state.potApplyColor || state.potColor || data.color}
            potColorId={state.potColorId}
            mood="happy"
            expression="happy"
            scale={1.3}
          />
        </div>

        {/* Name */}
        <div style={{
          opacity: stage >= 2 ? 1 : 0,
          transform: stage >= 2 ? 'translateY(0)' : 'translateY(14px)',
          transition: 'all 0.6s ease',
          fontFamily: V2T.serif, fontSize: 40, fontWeight: 700,
          color: V2T.charcoal, letterSpacing: -1, marginBottom: 10,
        }}>
          {name}.
        </div>

        <div style={{
          opacity: stage >= 2 ? 1 : 0,
          transform: stage >= 2 ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.6s ease 0.12s',
          fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 16,
          color: V2T.muted, textAlign: 'center', lineHeight: 1.6,
          maxWidth: 250, marginBottom: 12,
        }}>
          They can't wait to see the world through you.
        </div>

        <div style={{ opacity: stage >= 2 ? 1 : 0, transition: 'opacity 0.5s ease 0.25s' }}>
          <div style={{
            fontFamily: V2T.sans, fontSize: 12, fontWeight: 600,
            color: data.color, background: `${data.color}14`,
            borderRadius: 100, padding: '5px 14px',
          }}>
            {data.label}
          </div>
        </div>

        <div style={{
          opacity: stage >= 3 ? 1 : 0,
          transform: stage >= 3 ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.5s ease',
          width: '100%',
          marginTop: 20,
        }}>
          <V2CTAButton onClick={onNext} color={data.color} fullWidth>
            Place your order
          </V2CTAButton>
        </div>
      </div>
    </V2ScreenWrap>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 7 — Order & Setup
// ─────────────────────────────────────────────────────────────
function V2OrderField({ label, placeholder, type = 'text' }) {
  const [focused, setFocused] = React.useState(false);
  const [val, setVal] = React.useState('');
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontFamily: V2T.sans, fontSize: 11, color: V2T.muted, fontWeight: 600, letterSpacing: 0.5, display: 'block', marginBottom: 5 }}>
        {label}
      </label>
      <input type={type} placeholder={placeholder} value={val}
        onChange={e => setVal(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', boxSizing: 'border-box',
          fontFamily: V2T.sans, fontSize: 15, color: V2T.charcoal,
          background: '#fff',
          border: `1.5px solid ${focused ? V2T.accent : 'rgba(44,36,32,0.1)'}`,
          borderRadius: 12, padding: '12px 14px', outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
      />
    </div>
  );
}

function V2Screen7({ state }) {
  const data = state.plantId ? V2_PLANT_DATA[state.plantId] : V2_PLANT_DATA.wanderer;
  const name = state.plantName || 'your plant';
  const [done, setDone] = React.useState(false);

  if (done) {
    return (
      <V2ScreenWrap bg={data.bg}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 32px' }}>
          <div style={{ marginBottom: 24, filter: `drop-shadow(0 10px 24px ${data.color}40)` }}>
            <V2SmartComposite plantId={state.plantId || 'wanderer'} potShape={state.potShape || 'pumpkin'}
              potColor={state.potApplyColor || state.potColor || data.color} potColorId={state.potColorId} mood="happy" expression="happy" scale={0.82} />
          </div>
          <div style={{ fontFamily: V2T.serif, fontSize: 30, fontWeight: 700, color: V2T.charcoal, textAlign: 'center', marginBottom: 12, letterSpacing: -0.5 }}>
            {name} is on<br />their way.
          </div>
          <div style={{ fontFamily: V2T.serif, fontStyle: 'italic', fontSize: 15, color: V2T.muted, textAlign: 'center', lineHeight: 1.65, maxWidth: 255, marginBottom: 40 }}>
            We'll send a tracking link. Download Folia to get everything ready before they arrive.
          </div>
          <div style={{
            background: V2T.charcoal, borderRadius: 18,
            padding: '16px 22px', width: '100%', maxWidth: 290,
            display: 'flex', alignItems: 'center', gap: 16, boxSizing: 'border-box',
          }}>
            <div style={{ fontSize: 28 }}>📱</div>
            <div>
              <div style={{ fontFamily: V2T.sans, fontWeight: 700, fontSize: 15, color: '#fff' }}>Download Folia</div>
              <div style={{ fontFamily: V2T.sans, fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>Available on the App Store</div>
            </div>
          </div>
        </div>
      </V2ScreenWrap>
    );
  }

  return (
    <V2ScreenWrap>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px 32px', overflowY: 'auto' }}>
        <div style={{ paddingTop: 52, marginBottom: 18 }}>
          <div style={{ fontFamily: V2T.sans, fontSize: 12, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: data.color, marginBottom: 6 }}>Almost done</div>
          <V2Heading>Where shall we<br />send {name}?</V2Heading>
        </div>

        {/* Order summary */}
        <div style={{
          background: data.bg, borderRadius: 14, padding: '12px 14px', marginBottom: 18,
          border: `1.5px solid ${data.color}20`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 42, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <V2SmartComposite plantId={state.plantId || 'wanderer'} potShape={state.potShape || 'pumpkin'}
              potColor={state.potApplyColor || state.potColor || data.color} potColorId={state.potColorId} mood="happy" expression="happy" scale={0.23} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: V2T.sans, fontWeight: 700, fontSize: 14, color: V2T.charcoal }}>{name}</div>
            <div style={{ fontFamily: V2T.sans, fontSize: 12, color: V2T.muted }}>
              {data.label} - {state.potShape ? V2_POT_DATA.find(p => p.id === state.potShape)?.label : 'Pear'} pot
            </div>
          </div>
          <div style={{ fontFamily: V2T.sans, fontWeight: 700, fontSize: 16, color: V2T.charcoal }}>$89</div>
        </div>

        <V2OrderField label="Full name" placeholder="Jane Doe" />
        <V2OrderField label="Email" placeholder="jane@example.com" type="email" />
        <V2OrderField label="Delivery address" placeholder="4200 Fifth Avenue" />
        <V2OrderField label="City" placeholder="Pittsburgh" />
        <V2OrderField label="ZIP code" placeholder="15213" />

        <div>
          <label style={{ fontFamily: V2T.sans, fontSize: 11, color: V2T.muted, fontWeight: 600, letterSpacing: 0.5, display: 'block', marginBottom: 5 }}>CARD NUMBER</label>
          <div style={{ background: '#fff', border: '1.5px solid rgba(44,36,32,0.1)', borderRadius: 12, padding: '12px 14px', fontFamily: V2T.sans, fontSize: 15, color: 'rgba(44,36,32,0.3)' }}>
            4242 4242 4242 4242
          </div>
        </div>

        <div style={{ marginTop: 20, width: '100%' }}>
          <V2CTAButton onClick={() => setDone(true)} color={data.color} fullWidth>
            Place order - $89
          </V2CTAButton>
        </div>

        <div style={{ textAlign: 'center', marginTop: 10, fontFamily: V2T.sans, fontSize: 12, color: V2T.muted }}>
          Free US delivery - 30-day returns
        </div>
      </div>
    </V2ScreenWrap>
  );
}

Object.assign(window, {
  V2Screen4, V2Screen5, V2Screen6, V2Screen7,
  V2_RHYTHM_QS, V2RhythmOpt, V2OrderField,
});
