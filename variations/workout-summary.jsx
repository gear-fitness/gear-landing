// WorkoutSummary — in-progress workout, full screen, matches design.md
function WorkoutSummary({ exercises = [], seconds = 21, running = true, dark = false, onClose = () => {} }) {
  const t = dark ? {
    bg: '#0a0a0a', surface: '#141414', text: '#fff',
    textMuted: 'rgba(255,255,255,0.55)', textFaint: 'rgba(255,255,255,0.4)',
    border: 'rgba(255,255,255,0.08)', chipBg: 'rgba(255,255,255,0.08)',
    primaryBg: '#fff', primaryText: '#000',
  } : {
    bg: '#fafafa', surface: '#fff', text: '#000',
    textMuted: 'rgba(0,0,0,0.5)', textFaint: 'rgba(0,0,0,0.4)',
    border: 'rgba(0,0,0,0.08)', chipBg: 'rgba(0,0,0,0.05)',
    primaryBg: '#000', primaryText: '#fff',
  };

  const today = 'APR 20, 2026';
  const todayLong = 'April 23, 2026';
  const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  const totalSets = exercises.reduce((n, ex) => n + (ex.sets?.filter(x => x.reps && x.weight).length || 0), 0);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: t.bg, fontFamily: '-apple-system, "SF Pro Text", system-ui',
      position: 'relative',
    }}>
      {/* Floating close */}
      <button onClick={onClose} aria-label="Close" style={{
        position: 'absolute', top: 56, left: 16, zIndex: 10,
        width: 40, height: 40, borderRadius: 20, padding: 0,
        background: t.surface, color: t.text,
        border: `0.5px solid ${t.border}`,
        boxShadow: dark ? 'none' : '0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke={t.text} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: '110px 20px 8px' }}>
          <div style={{
            fontSize: 12, fontWeight: 600, letterSpacing: 1.2, color: t.textMuted,
            marginBottom: 8, display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 3,
              background: running ? '#22B574' : t.textFaint,
            }} />
            {running ? 'IN PROGRESS' : 'PAUSED'}
          </div>
          <div style={{
            fontFamily: '"Libre Caslon Text", Georgia, serif',
            fontSize: 32, fontWeight: 400, letterSpacing: -0.4, color: t.text, lineHeight: 1.2,
          }}>
            {todayLong}
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'auto auto auto',
            marginTop: 20, columnGap: 28, rowGap: 6, alignItems: 'start',
          }}>
            <Metric t={t} label="Time" value={fmt(seconds)} />
            <Metric t={t} label="Exercises" value={exercises.length} />
            <Metric t={t} label="Sets" value={totalSets} />
          </div>
        </div>

        {/* Exercises */}
        <div style={{ padding: '20px 20px 16px' }}>
          <div style={{
            fontSize: 12, fontWeight: 600, letterSpacing: 1.2, color: t.textMuted, marginBottom: 10,
          }}>
            EXERCISES
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {exercises.map((ex, i) => {
              const last = [...(ex.sets || [])].reverse().find(s => s.reps && s.weight);
              return (
                <button key={i} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto auto',
                  alignItems: 'center', gap: 12, padding: '16px 16px',
                  background: t.surface, borderRadius: 12, border: `0.5px solid ${t.border}`,
                  textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', color: 'inherit',
                }}>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 600, color: t.text, letterSpacing: -0.3 }}>
                      {ex.name}
                    </div>
                    <div style={{ fontSize: 12, color: t.textFaint, marginTop: 2 }}>
                      {ex.bodyPart}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {last ? (
                      <>
                        <div style={{
                          fontSize: 11, fontWeight: 600, letterSpacing: 1, color: t.textMuted,
                        }}>LAST SET</div>
                        <div style={{
                          fontSize: 15, fontWeight: 600, color: t.text,
                          fontVariantNumeric: 'tabular-nums', marginTop: 2,
                        }}>
                          {last.reps}×{last.weight}
                          <span style={{ fontSize: 11, color: t.textFaint, marginLeft: 3, fontWeight: 400 }}>lb</span>
                        </div>
                      </>
                    ) : (
                      <div style={{
                        fontSize: 12, fontWeight: 500, color: t.textFaint, fontStyle: 'italic',
                      }}>Not started</div>
                    )}
                  </div>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke={t.textFaint} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              );
            })}
          </div>

          <button style={{
            marginTop: 8, width: '100%', height: 48, padding: '0 16px',
            background: 'transparent', color: t.text,
            border: `1.5px dashed ${dark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.18)'}`,
            borderRadius: 12, fontSize: 14, fontWeight: 600, letterSpacing: -0.2,
            cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke={t.text} strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            Add exercise
          </button>
        </div>
      </div>

      {/* Footer — paired container + Finish */}
      <div style={{ padding: '8px 12px 34px', background: t.bg, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {running ? (
          <>
            <div style={{
              padding: 4, background: t.surface, borderRadius: 16,
              border: dark ? `1px solid ${t.border}` : 'none',
              boxShadow: dark ? 'none' : '0 1px 2px rgba(0,0,0,0.06), 0 6px 20px rgba(0,0,0,0.05)',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2,
            }}>
              <button style={{
                height: 50, border: 'none', borderRadius: 12,
                background: 'transparent', color: t.text,
                fontSize: 15, fontWeight: 600, letterSpacing: -0.2,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>Pause</button>
              <button style={{
                height: 50, border: 'none', borderRadius: 12,
                background: '#C93838', color: '#fff',
                fontSize: 15, fontWeight: 600, letterSpacing: -0.2,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>Finish</button>
            </div>
          </>
        ) : (
          <button style={{
            height: 54, border: 'none', borderRadius: 14,
            background: '#007AFF', color: '#fff',
            fontSize: 17, fontWeight: 600, letterSpacing: -0.2,
            cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>Resume</button>
        )}
      </div>
    </div>
  );
}

function Metric({ t, label, value }) {
  return (
    <div>
      <div style={{ fontSize: 13, color: t.textMuted, fontWeight: 500 }}>{label}</div>
      <div style={{
        fontSize: 22, fontWeight: 700, letterSpacing: -0.5,
        color: t.text, fontVariantNumeric: 'tabular-nums',
        marginTop: 2, lineHeight: 1.15, whiteSpace: 'nowrap',
      }}>{value}</div>
    </div>
  );
}

Object.assign(window, { WorkoutSummary });
