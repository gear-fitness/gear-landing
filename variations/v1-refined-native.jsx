// V1 — Refined Native. Monochrome. Supports light + dark.

function V1Refined({ state, setState, dark = false }) {
  const { sets, reps, weight, exerciseSeconds, currentSetIdx } = state;
  const logged = sets.filter(s => s.logged);
  const [showingTotal, setShowingTotal] = React.useState(false);
  const totalSeconds = (state.totalWorkoutSeconds || (exerciseSeconds + 18 * 60));
  React.useEffect(() => {
    if (!showingTotal) return;
    const id = setTimeout(() => setShowingTotal(false), 5000);
    return () => clearTimeout(id);
  }, [showingTotal]);

  const t = dark ? {
    bg: '#0a0a0a', surface: '#141414', text: '#fff',
    textMuted: 'rgba(255,255,255,0.55)', textFaint: 'rgba(255,255,255,0.4)',
    border: 'rgba(255,255,255,0.08)', chipBg: 'rgba(255,255,255,0.08)',
    primaryBg: '#fff', primaryText: '#000',
    stepperBg: 'rgba(255,255,255,0.06)', stepperBorder: 'rgba(255,255,255,0.12)',
    iconStroke: '#fff',
  } : {
    bg: '#fafafa', surface: '#fff', text: '#000',
    textMuted: 'rgba(0,0,0,0.5)', textFaint: 'rgba(0,0,0,0.4)',
    border: 'rgba(0,0,0,0.08)', chipBg: 'rgba(0,0,0,0.05)',
    primaryBg: '#000', primaryText: '#fff',
    stepperBg: '#fff', stepperBorder: 'rgba(0,0,0,0.1)',
    iconStroke: '#000',
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: t.bg,
      fontFamily: '-apple-system, "SF Pro Text", system-ui',
    }}>
      <div style={{
        paddingTop: 56, paddingBottom: 14, paddingInline: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: `0.5px solid ${t.border}`,
        position: 'relative',
      }}>
        <button
          onClick={() => setShowingTotal(v => !v)}
          style={{
            position: 'relative',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', border: 'none', padding: '4px 12px',
            color: t.text, cursor: 'pointer',
            fontVariantNumeric: 'tabular-nums',
            fontFamily: 'inherit',
          }}>
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none"
               style={{ position: 'absolute', right: 'calc(100% - 4px)', top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="8" cy="9" r="6" stroke={t.iconStroke} strokeWidth="1.4"/>
            <path d="M8 6v3l2 1.5M6 2h4" stroke={t.iconStroke} strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1 }}>
            {fmt(showingTotal ? totalSeconds : exerciseSeconds)}
          </span>
          {showingTotal && (
            <span style={{
              position: 'absolute', left: 'calc(100% - 4px)', top: '50%', transform: 'translateY(-50%)',
              fontSize: 11, letterSpacing: 1.2, fontWeight: 600,
              color: t.textMuted, textTransform: 'uppercase',
            }}>total</span>
          )}
        </button>
        <button style={{
          width: 32, height: 32, borderRadius: 16, border: 'none',
          background: t.chipBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          position: 'absolute', right: 20, top: '50%', transform: 'translateY(-20%)',
        }}>
          <svg width="18" height="18" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke={t.iconStroke} strokeWidth="1.3" fill="none"/><path d="M8 7v4M8 5h.01" stroke={t.iconStroke} strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </div>

      <div style={{ padding: '20px 20px 8px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.2, color: t.textMuted, marginBottom: 6 }}>
          EXERCISE {state.exerciseIdx + 1} · SET {currentSetIdx + 1}
        </div>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.8, color: t.text, lineHeight: 1.05 }}>
          Barbell Row
        </div>
        <div style={{ fontSize: 14, color: t.textMuted, marginTop: 4 }}>
          Last session · 3×10 @ 215 lbs
        </div>
      </div>

      <div style={{ padding: '8px 20px 16px' }}>
        <div style={{
          background: t.surface, borderRadius: 20,
          boxShadow: dark ? '0 1px 0 rgba(255,255,255,0.03)' : '0 1px 0 rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.04)',
          border: dark ? `1px solid ${t.border}` : 'none',
          overflow: 'hidden',
        }}>
          <HeroInput theme={t} label="Reps" value={reps}
            onInc={() => setState(s => ({ ...s, reps: String(+s.reps + 1) }))}
            onDec={() => setState(s => ({ ...s, reps: String(Math.max(0, +s.reps - 1)) }))} />
          <div style={{ height: 0.5, background: t.border }} />
          <HeroInput theme={t} label="Weight" value={weight} unit="lbs"
            onInc={() => setState(s => ({ ...s, weight: String(+s.weight + 5) }))}
            onDec={() => setState(s => ({ ...s, weight: String(Math.max(0, +s.weight - 5)) }))} />
        </div>
      </div>

      <div style={{ padding: '0 20px 18px' }}>
        <button
          onClick={() => logSet(state, setState)}
          style={{
            width: '100%', height: 54, borderRadius: 14,
            background: t.primaryBg, color: t.primaryText, border: 'none',
            fontSize: 17, fontWeight: 600, letterSpacing: -0.2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            cursor: 'pointer',
          }}>
          Log set {currentSetIdx + 1}
          <span style={{ opacity: 0.5, fontWeight: 400 }}>→</span>
        </button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 8px' }}>
        <div style={{
          fontSize: 12, fontWeight: 600, letterSpacing: 1.2, color: t.textMuted,
          padding: '6px 2px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>SETS</span>
          <button
            onClick={() => setState(s => ({ ...s, setsExpanded: !s.setsExpanded }))}
            style={{
              background: 'transparent', border: 'none', padding: '2px 4px', cursor: 'pointer',
              color: t.textMuted, fontSize: 12, fontWeight: 500, letterSpacing: 0,
              display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'inherit',
            }}>
            {logged.length} logged
            <svg width="10" height="10" viewBox="0 0 10 10" style={{
              transform: state.setsExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s',
            }}>
              <path d="M2 4l3 3 3-3" stroke={t.textMuted} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {state.setsExpanded ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {logged.slice().reverse().map((s, ri) => {
              const i = logged.length - 1 - ri;
              return <SetRow key={i} theme={t} idx={i} set={s} />;
            })}
          </div>
        ) : (
          <StackedSets
            theme={t}
            logged={logged}
            onExpand={() => setState(s => ({ ...s, setsExpanded: true }))}
          />
        )}
      </div>

      <div style={{
        margin: '8px 12px 20px', padding: 6,
        background: t.surface, borderRadius: 16,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4,
        boxShadow: dark ? '0 1px 2px rgba(0,0,0,0.4)' : '0 1px 2px rgba(0,0,0,0.06), 0 6px 20px rgba(0,0,0,0.05)',
        border: dark ? `1px solid ${t.border}` : 'none',
      }}>
        <button style={{
          height: 50, border: 'none', borderRadius: 12,
          background: 'transparent', color: t.text, fontSize: 15, fontWeight: 600, letterSpacing: -0.2,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>Summary</button>
        <button style={{
          height: 50, border: 'none', borderRadius: 12,
          background: t.primaryBg, color: t.primaryText,
          fontSize: 15, fontWeight: 600, letterSpacing: -0.2, cursor: 'pointer', fontFamily: 'inherit',
        }}>Next exercise →</button>
      </div>
    </div>
  );
}

function HeroInput({ theme, label, value, unit, onInc, onDec }) {
  const t = theme;
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '18px 20px' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: t.textMuted, fontWeight: 500, marginBottom: 2 }}>{label}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <div
            contentEditable
            suppressContentEditableWarning
            inputMode="numeric"
            style={{
              fontSize: 84, fontWeight: 700, letterSpacing: -3, color: t.text,
              fontVariantNumeric: 'tabular-nums', lineHeight: 1,
              outline: 'none', minWidth: 20, cursor: 'text',
              caretColor: t.text,
            }}
          >{value}</div>
          {unit && <div style={{ fontSize: 22, fontWeight: 500, color: t.textFaint }}>{unit}</div>}
        </div>
      </div>
    </div>
  );
}

function SetRow({ theme, idx, set }) {
  const t = theme;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '24px 1fr 1fr auto',
      alignItems: 'center', padding: '14px 14px',
      background: t.surface, borderRadius: 12,
      border: t === undefined ? 'none' : `0.5px solid ${t.border}`,
      fontFamily: '"SF Pro Display", -apple-system, system-ui',
    }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: t.textFaint }}>{idx + 1}</span>
      <span style={{ fontSize: 22, fontWeight: 600, color: t.text, fontVariantNumeric: 'tabular-nums' }}>
        {set.reps}<span style={{ fontSize: 12, color: t.textFaint, marginLeft: 4 }}>reps</span>
      </span>
      <span style={{ fontSize: 22, fontWeight: 600, color: t.text, fontVariantNumeric: 'tabular-nums' }}>
        {set.weight}<span style={{ fontSize: 12, color: t.textFaint, marginLeft: 4 }}>lbs</span>
      </span>
      <svg width="14" height="14" viewBox="0 0 16 16"><path d="M3 8l3.5 3.5L13 5" stroke={t.text} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  );
}

function StackedSets({ theme, logged, onExpand }) {
  const t = theme;
  if (logged.length === 0) {
    return <div style={{ padding: '14px', textAlign: 'center', fontSize: 13, color: t.textFaint }}>No sets logged yet</div>;
  }
  const newest = logged[logged.length - 1];
  const newestIdx = logged.length - 1;
  const behindCount = Math.min(2, logged.length - 1);

  return (
    <div style={{ position: 'relative', paddingBottom: 28 }}>
      {Array.from({ length: behindCount }).map((_, bi) => {
        const depth = bi + 1;
        return (
          <div key={bi} style={{
            position: 'absolute', left: 10 + depth * 6, right: 10 + depth * 6,
            top: depth * 6, height: 60, borderRadius: 12,
            background: t.surface,
            border: `0.5px solid ${t.border}`,
            opacity: 1 - depth * 0.22,
            zIndex: 1,
          }} />
        );
      })}
      <div style={{ position: 'relative', zIndex: 3 }}>
        <SetRow theme={t} idx={newestIdx} set={newest} />
      </div>
      <button
        onClick={onExpand}
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          background: 'transparent', border: 'none', padding: '6px 0',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          fontSize: 12, color: t.textMuted, fontFamily: 'inherit', cursor: 'pointer', zIndex: 4,
        }}>
        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke={t.textMuted} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Tap to expand
      </button>
    </div>
  );
}

function fmt(t) {
  const m = Math.floor(t / 60), s = t % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function logSet(state, setState) {
  setState(s => ({
    ...s,
    sets: [...s.sets.filter(x => x.logged), { reps: s.reps, weight: s.weight, logged: true }],
    currentSetIdx: s.currentSetIdx + 1,
  }));
}

Object.assign(window, { V1Refined, fmt, logSet, HeroInput, SetRow, StackedSets });
