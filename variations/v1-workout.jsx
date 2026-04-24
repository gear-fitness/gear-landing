// Workout screen redesign — matches design.md
function V1Workout({ state, setState, dark = false, quoteFont, ctaVariant = 'outline', ctaLabel, routinesVariant = 'cards', routineAffordance = 'start-chevron' }) {
  const { streak, elapsedSec, inProgress } = state;

  const t = dark ? {
    bg: '#0a0a0a', surface: '#141414', text: '#fff',
    textMuted: 'rgba(255,255,255,0.55)', textFaint: 'rgba(255,255,255,0.4)',
    border: 'rgba(255,255,255,0.08)', chipBg: 'rgba(255,255,255,0.08)',
    primaryBg: '#fff', primaryText: '#000',
    iconStroke: '#fff',
  } : {
    bg: '#fafafa', surface: '#fff', text: '#000',
    textMuted: 'rgba(0,0,0,0.5)', textFaint: 'rgba(0,0,0,0.4)',
    border: 'rgba(0,0,0,0.08)', chipBg: 'rgba(0,0,0,0.05)',
    primaryBg: '#000', primaryText: '#fff',
    iconStroke: '#000',
  };

  const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const routines = [
    { id: 1, name: 'Push day', count: 5 },
    { id: 2, name: 'Pull day', count: 4 },
  ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: t.bg, fontFamily: '-apple-system, "SF Pro Text", system-ui',
    }}>
      {/* Header bar — streak + paired nav unit */}
      <div style={{
        paddingTop: 56, paddingBottom: 14, paddingInline: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <svg width="30" height="32" viewBox="0 0 16 18" fill="none" aria-hidden>
              <path d="M8 1.5c.8 2.6 3 3.8 3 6.8 0 1.4-.7 2.6-1.8 3.3.4-.6.5-1.4.2-2.3-.3-1-1.1-1.6-1.4-2.6C7.2 9 6 10 6 11.7c0 .6.2 1.2.4 1.7C5.3 12.7 4.5 11.4 4.5 10c0-2.5 1.6-3.8 2.6-5.8.4-.8.7-1.8.9-2.7Z"
                stroke="#FF6A1F" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
            </svg>
            <div style={{
              fontSize: 34, fontWeight: 700, letterSpacing: -0.6,
              color: t.text, fontVariantNumeric: 'tabular-nums', lineHeight: 1,
            }}>
              {streak}
            </div>
          </div>
          <div style={{
            fontSize: 12, fontWeight: 600, letterSpacing: 1.2, color: t.textMuted,
            marginTop: 6, textAlign: 'center',
          }}>
            STREAK
          </div>
        </div>
        {/* Nav — separate circular icon buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button aria-label="Exercises" style={iconBtn(t, dark)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 10v4M6 7v10M9 5v14M15 5v14M18 7v10M21 10v4"
                stroke={t.iconStroke} strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
          <button aria-label="Routines" style={iconBtn(t, dark)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 3h12v18l-6-4-6 4V3z"
                stroke={t.iconStroke} strokeWidth="1.6" strokeLinejoin="round" fill="none"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Hero — split 50/50: quote centered in top half, CTA+routines start at center */}
      <div style={{ padding: '0 20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top half — quote block vertically centered */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.2, color: t.textMuted, marginBottom: 6, textAlign: 'center' }}>
            {inProgress ? 'IN PROGRESS' : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
          </div>
          {inProgress ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 12, fontWeight: 600, letterSpacing: 1.4,
                color: t.textMuted, textTransform: 'uppercase',
              }}>Elapsed</div>
              <div style={{
                marginTop: 10,
                fontSize: 92, fontWeight: 700, letterSpacing: -3,
                color: t.text, fontVariantNumeric: 'tabular-nums',
                lineHeight: 1,
              }}>
                {fmt(elapsedSec)}
              </div>
            </div>
          ) : (
            <div style={{ fontFamily: quoteFont || '"Libre Caslon Text", Georgia, serif', fontSize: 34, fontWeight: 400, letterSpacing: -0.2, color: t.text, lineHeight: 1.2, textWrap: 'pretty', textAlign: 'center', WebkitTextStroke: '0.35px currentColor' }}>
              {dailyQuote()}
            </div>
          )}
        </div>

        {/* Bottom half — CTA + routines (idle) / end workout (running) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Primary CTA */}
        <div>
          <StartCTA
            variant={ctaVariant}
            inProgress={inProgress}
            t={t}
            dark={dark}
            labelOverride={inProgress ? 'End Workout' : ctaLabel}
            destructive={inProgress}
            onClick={() => setState(s => ({ ...s, inProgress: !s.inProgress }))}
          />
        </div>

        {/* Today's routines — hidden while in progress */}
        {!inProgress && (
          <div style={{ marginTop: 28 }}>
            <RoutinesList variant={routinesVariant} routines={routines} t={t} dark={dark} affordance={routineAffordance} />
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

function navBtn(t) {
  return {
    height: 36, padding: '0 14px', border: 'none', borderRadius: 10,
    background: 'transparent', color: t.text,
    fontSize: 14, fontWeight: 600, letterSpacing: -0.2, cursor: 'pointer',
    fontFamily: 'inherit',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };
}

function iconBtn(t, dark) {
  return {
    width: 44, height: 44, borderRadius: 22, padding: 0,
    background: t.surface, color: t.text,
    border: `0.5px solid ${t.border}`,
    boxShadow: dark ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', fontFamily: 'inherit',
  };
}

function useWorkoutState() {
  const [state, setState] = React.useState({
    streak: 4,
    elapsedSec: 12 * 60 + 34,
    inProgress: false,
  });
  React.useEffect(() => {
    const id = setInterval(() => {
      setState(s => s.inProgress ? { ...s, elapsedSec: s.elapsedSec + 1 } : s);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return [state, setState];
}

Object.assign(window, { V1Workout, useWorkoutState });

function dailyQuote() {
  const quotes = [
    'The only bad workout is the one that didn\u2019t happen.',
    'Discipline is choosing between what you want now and what you want most.',
    'Strength doesn\u2019t come from what you can do. It comes from overcoming what you couldn\u2019t.',
    'Small steps every day.',
    'You don\u2019t have to be extreme, just consistent.',
    'Sweat now, shine later.',
    'The body achieves what the mind believes.',
    'Don\u2019t count the days. Make the days count.',
    'Train insane or remain the same.',
    'Progress, not perfection.',
    'Your only limit is you.',
    'One more rep. One more set. One more day.',
    'Rest, but never quit.',
    'Be stronger than your excuses.',
  ];
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  const day = Math.floor((d - start) / 86400000);
  return quotes[day % quotes.length];
}

function StartCTA({ variant, inProgress, t, dark, onClick, labelOverride, destructive }) {
  const label = labelOverride || (inProgress ? 'Continue' : 'Start');
  const red = dark ? '#FF5B4B' : '#E23B2B';
  const base = {
    width: '100%', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    letterSpacing: -0.2,
  };

  if (variant === 'solid') {
    return (
      <button onClick={onClick} style={{
        ...base, height: 54, borderRadius: 14,
        background: t.primaryBg, color: t.primaryText,
        fontSize: 17, fontWeight: 600, gap: 8,
      }}>
        {label}
        <span style={{ opacity: 0.5, fontWeight: 400 }}>→</span>
      </button>
    );
  }

  if (variant === 'pill-arrow') {
    return (
      <button onClick={onClick} style={{
        ...base, height: 64, borderRadius: 32,
        background: t.primaryBg, color: t.primaryText,
        fontSize: 17, fontWeight: 600, justifyContent: 'space-between',
        padding: '0 8px 0 28px',
      }}>
        <span>{label}</span>
        <span style={{
          width: 48, height: 48, borderRadius: 24,
          background: dark ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, fontWeight: 400,
        }}>→</span>
      </button>
    );
  }

  if (variant === 'outline') {
    return (
      <button onClick={onClick} style={{
        ...base, height: 54, borderRadius: 14,
        background: 'transparent',
        color: destructive ? red : t.text,
        border: `1.5px solid ${destructive ? red : t.text}`,
        fontSize: 17, fontWeight: 600,
      }}>
        {label}
      </button>
    );
  }

  // Outline — hairline, generous, refined
  if (variant === 'outline-hairline') {
    return (
      <button onClick={onClick} style={{
        ...base, height: 62, borderRadius: 16,
        background: 'transparent', color: t.text,
        border: `0.75px solid ${t.text}`,
        fontSize: 16, fontWeight: 500, gap: 14, letterSpacing: 0.2,
      }}>
        {label}
        <span style={{ opacity: 0.45, fontWeight: 300, fontSize: 18 }}>→</span>
      </button>
    );
  }

  // Outline — pill, wide spacing, uppercase
  if (variant === 'outline-pill') {
    return (
      <button onClick={onClick} style={{
        ...base, height: 58, borderRadius: 29,
        background: 'transparent', color: t.text,
        border: `1px solid ${t.text}`,
        fontSize: 12, fontWeight: 600, gap: 16, letterSpacing: 2,
        textTransform: 'uppercase',
      }}>
        {label}
        <span style={{ fontWeight: 400, letterSpacing: 0 }}>→</span>
      </button>
    );
  }

  // Outline — split: outlined text + filled arrow knob on the right
  if (variant === 'outline-knob') {
    return (
      <button onClick={onClick} style={{
        ...base, height: 64, borderRadius: 16,
        background: 'transparent', color: t.text,
        border: `1px solid ${t.text}`,
        fontSize: 17, fontWeight: 600,
        justifyContent: 'space-between',
        padding: '0 6px 0 24px',
      }}>
        <span>{label}</span>
        <span style={{
          width: 52, height: 52, borderRadius: 13,
          background: t.text, color: t.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, fontWeight: 400,
        }}>→</span>
      </button>
    );
  }

  if (variant === 'split') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
        <button onClick={onClick} style={{
          ...base, height: 54, borderRadius: 14,
          background: t.primaryBg, color: t.primaryText,
          fontSize: 17, fontWeight: 600,
        }}>{label}</button>
        <button style={{
          ...base, width: 54, height: 54, borderRadius: 14,
          background: t.surface, color: t.text,
          border: `0.5px solid ${t.border}`, fontSize: 18,
        }}>⋯</button>
      </div>
    );
  }

  if (variant === 'ticker') {
    return (
      <button onClick={onClick} style={{
        ...base, height: 64, borderRadius: 14,
        background: t.primaryBg, color: t.primaryText,
        padding: '0 22px', justifyContent: 'space-between',
      }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.4, opacity: 0.55 }}>PRESS TO</div>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.3, marginTop: 1 }}>{label}</div>
        </div>
        <span style={{ fontSize: 22, fontWeight: 300, opacity: 0.6 }}>→</span>
      </button>
    );
  }

  if (variant === 'tall-typographic') {
    return (
      <button onClick={onClick} style={{
        ...base, height: 88, borderRadius: 18,
        background: t.primaryBg, color: t.primaryText,
        fontFamily: '"Libre Caslon Text", Georgia, serif',
        fontSize: 28, fontWeight: 400, gap: 14,
      }}>
        {label}
        <span style={{ opacity: 0.55, fontWeight: 400, fontFamily: '-apple-system, system-ui' }}>→</span>
      </button>
    );
  }

  // Tall typographic — italic, oversized, ampersand-style swash arrow
  if (variant === 'tall-serif-italic') {
    return (
      <button onClick={onClick} style={{
        ...base, height: 96, borderRadius: 20,
        background: t.primaryBg, color: t.primaryText,
        fontFamily: '"Libre Caslon Text", Georgia, serif',
        fontSize: 30, fontWeight: 400, fontStyle: 'italic',
        gap: 18, letterSpacing: -0.3,
      }}>
        {label}
        <span style={{ fontStyle: 'normal', fontFamily: '"Libre Caslon Text", Georgia, serif', opacity: 0.65, fontSize: 32 }}>›</span>
      </button>
    );
  }

  // Tall typographic — outlined cream, editorial
  if (variant === 'tall-serif-outline') {
    return (
      <button onClick={onClick} style={{
        ...base, height: 92, borderRadius: 20,
        background: 'transparent', color: t.text,
        border: `1px solid ${t.text}`,
        fontFamily: '"Libre Caslon Text", Georgia, serif',
        fontSize: 30, fontWeight: 400, gap: 16,
        WebkitTextStroke: '0.3px currentColor',
      }}>
        {label}
        <span style={{ fontSize: 28, opacity: 0.55 }}>→</span>
      </button>
    );
  }

  // Tall typographic — stacked, kicker + serif word, deliberate
  if (variant === 'tall-serif-stacked') {
    return (
      <button onClick={onClick} style={{
        ...base, height: 110, borderRadius: 20,
        background: t.primaryBg, color: t.primaryText,
        flexDirection: 'column', gap: 4,
      }}>
        <div style={{
          fontSize: 10, fontWeight: 600, letterSpacing: 2.5,
          opacity: 0.55, textTransform: 'uppercase',
          fontFamily: '-apple-system, system-ui',
        }}>Today</div>
        <div style={{
          fontFamily: '"Libre Caslon Text", Georgia, serif',
          fontSize: 34, fontWeight: 400, letterSpacing: -0.4,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          {label}
          <span style={{ opacity: 0.5, fontSize: 28, fontFamily: 'inherit' }}>→</span>
        </div>
      </button>
    );
  }

  return null;
}

function RoutinesList({ variant, routines, t, dark, affordance = 'chevron' }) {
  const Affordance = ({ variant: av }) => {
    const chev = (
      <svg width="10" height="12" viewBox="0 0 10 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2l5 4-5 4"/>
      </svg>
    );
    if (av === 'double-chevron') return (
      <span style={{ display: 'flex', color: t.text, letterSpacing: -4 }}>{chev}{chev}</span>
    );
    if (av === 'arrow') return <span style={{ color: t.text, fontSize: 18 }}>→</span>;
    if (av === 'start-chevron') return (
      <span style={{ color: t.textMuted, fontSize: 10, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
        START <span style={{ color: t.text }}>{chev}</span>
      </span>
    );
    if (av === 'play-label') return (
      <span style={{ color: t.text, fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
        Play {chev}
      </span>
    );
    if (av === 'chevron-outline-pill') return (
      <span style={{ border: `1px solid ${t.border}`, borderRadius: 999, padding: '6px 10px', color: t.text, display: 'flex', alignItems: 'center' }}>{chev}</span>
    );
    if (av === 'dot-chevron') return (
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: t.text }}>
        <span style={{ width: 6, height: 6, borderRadius: 3, background: t.text }} />
        {chev}
      </span>
    );
    return <span style={{ color: t.text }}>{chev}</span>;
  };

  const labelRow = (right) => (
    <div style={{
      fontSize: 12, fontWeight: 600, letterSpacing: 1.2, color: t.textMuted,
      padding: '6px 2px 10px', display: 'flex', justifyContent: 'space-between',
    }}>
      <span>TODAY'S ROUTINES</span>
      {right}
    </div>
  );

  // cards — current baseline
  if (variant === 'cards') {
    return (
      <div>
        {labelRow(<span style={{ fontWeight: 500, letterSpacing: 0 }}>{routines.length} scheduled</span>)}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {routines.map(r => (
            <div key={r.id} style={{
              display: 'grid', gridTemplateColumns: '1fr auto',
              alignItems: 'center', padding: '14px 14px',
              background: t.surface, borderRadius: 12,
              border: `0.5px solid ${t.border}`,
            }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: t.text, letterSpacing: -0.2 }}>{r.name}</div>
                <div style={{ fontSize: 12, color: t.textFaint, marginTop: 2 }}>{r.count} exercises</div>
              </div>
              <button style={{
                minWidth: 44, height: 34, padding: '0 6px',
                background: 'transparent', color: t.text, cursor: 'pointer',
                border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
              }}>
                <Affordance variant={affordance} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // hairlines — no surfaces; horizontal rules, serif headline numeral
  if (variant === 'hairlines') {
    return (
      <div>
        {labelRow(null)}
        <div style={{ borderTop: `0.5px solid ${t.border}` }}>
          {routines.map((r, i) => (
            <div key={r.id} style={{
              display: 'grid', gridTemplateColumns: 'auto 1fr auto',
              alignItems: 'baseline', gap: 14,
              padding: '18px 2px',
              borderBottom: `0.5px solid ${t.border}`,
            }}>
              <div style={{
                fontFamily: '"Libre Caslon Text", Georgia, serif',
                fontSize: 22, color: t.textFaint, fontVariantNumeric: 'tabular-nums',
                minWidth: 22,
              }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ fontSize: 17, fontWeight: 500, color: t.text, letterSpacing: -0.2 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: t.textFaint, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                {r.count} exercises
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // chips — grid of square outline tiles
  if (variant === 'chips') {
    return (
      <div>
        {labelRow(null)}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {routines.map(r => (
            <button key={r.id} style={{
              aspectRatio: '1.15 / 1',
              background: 'transparent', color: t.text,
              border: `1px solid ${t.text}`, borderRadius: 12,
              fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left',
              padding: 14,
              display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.4, lineHeight: 1.05 }}>{r.name}</div>
              <div style={{ fontSize: 11, color: t.textFaint, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                {r.count} exercises
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // index — no header, each routine is a serif line, arrow on far right
  if (variant === 'index') {
    return (
      <div>
        <div style={{ borderTop: `0.5px solid ${t.border}` }}>
          {routines.map((r, i) => (
            <button key={r.id} style={{
              width: '100%', border: 'none', background: 'transparent',
              padding: '20px 2px', borderBottom: `0.5px solid ${t.border}`,
              display: 'grid', gridTemplateColumns: '1fr auto auto',
              alignItems: 'center', gap: 14, cursor: 'pointer',
              fontFamily: 'inherit', color: t.text, textAlign: 'left',
            }}>
              <div style={{
                fontFamily: '"Libre Caslon Text", Georgia, serif',
                fontSize: 24, letterSpacing: -0.2,
              }}>{r.name}</div>
              <div style={{ fontSize: 12, color: t.textFaint, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                {r.count} ex.
              </div>
              <span style={{ fontSize: 20, color: t.textFaint, fontWeight: 300 }}>→</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
