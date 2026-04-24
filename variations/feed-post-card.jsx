// FeedPostCard — monochrome, matches design.md
// Two modes: withImage (hero workout image on top), noImage (metric-forward)

function FeedPostCard({ post, dark = false, withImage = false }) {
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

  return (
    <div style={{
      background: t.surface, borderRadius: 16, overflow: 'hidden',
      border: `0.5px solid ${t.border}`,
      fontFamily: '-apple-system, "SF Pro Text", system-ui',
    }}>
      {/* Header: avatar + username + timestamp */}
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 20,
          background: t.chipBg, border: `0.5px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, fontWeight: 600, color: t.text, letterSpacing: -0.2,
        }}>{post.initials}</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: t.text, letterSpacing: -0.2 }}>{post.username}</div>
          <div style={{ fontSize: 12, color: t.textFaint, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{post.timeAgo}</div>
        </div>
      </div>

      {/* Optional image */}
      {withImage && (
        <div style={{
          margin: '0 14px 12px', height: 220, borderRadius: 12, overflow: 'hidden',
          background: `linear-gradient(135deg, ${t.chipBg}, ${t.border})`,
          position: 'relative', border: `0.5px solid ${t.border}`,
        }}>
          {/* Placeholder geometric "workout" artwork */}
          <svg viewBox="0 0 400 220" width="100%" height="100%" style={{ display: 'block' }}>
            <defs>
              <pattern id="stripes" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke={t.border} strokeWidth="1.5"/>
              </pattern>
            </defs>
            <rect width="400" height="220" fill="url(#stripes)"/>
            <circle cx="310" cy="70" r="48" fill={t.surface} opacity="0.7" stroke={t.border} strokeWidth="1"/>
            <rect x="40" y="140" width="160" height="8" rx="4" fill={t.text} opacity="0.35"/>
            <rect x="40" y="156" width="90" height="8" rx="4" fill={t.text} opacity="0.2"/>
          </svg>
          <div style={{
            position: 'absolute', left: 12, bottom: 12,
            fontSize: 11, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase',
            color: t.text, background: t.surface,
            padding: '4px 8px', borderRadius: 6,
            border: `0.5px solid ${t.border}`,
          }}>IMAGE</div>
        </div>
      )}

      {/* Workout title */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.2, color: t.textMuted, marginBottom: 6 }}>
          {post.date}
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.8, color: t.text, lineHeight: 1.1 }}>
          {post.workoutName}
        </div>
      </div>

      {/* Metrics row — big numbers for numeric stats only (Strava-style) */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        padding: '18px 16px 14px', gap: 8,
      }}>
        {[
          { label: 'Time', value: post.time },
          { label: 'Exercises', value: post.exerciseCount },
        ].map((m, i) => (
          <div key={i}>
            <div style={{ fontSize: 13, color: t.textMuted, fontWeight: 500 }}>{m.label}</div>
            <div style={{
              fontSize: 22, fontWeight: 700, letterSpacing: -0.5,
              color: t.text, fontVariantNumeric: 'tabular-nums',
              marginTop: 2, lineHeight: 1.1,
            }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Muscles — plain comma-separated text, its own block so it can wrap */}
      {post.muscles && (() => {
        const text = Array.isArray(post.muscles) ? post.muscles.join(', ') : post.muscles;
        return (
          <div style={{ padding: '0 16px 16px' }}>
            <div style={{ fontSize: 13, color: t.textMuted, fontWeight: 500, marginBottom: 2 }}>
              Muscles worked
            </div>
            <div style={{
              fontSize: 18, fontWeight: 600, color: t.text,
              letterSpacing: -0.3, lineHeight: 1.35, marginTop: 2,
            }}>{text}</div>
          </div>
        );
      })()}

      {/* Optional caption */}
      {post.caption && (
        <div style={{
          padding: '0 16px 14px', fontSize: 14, color: t.text, lineHeight: 1.45,
        }}>{post.caption}</div>
      )}

      {/* Engagement footer — paired container */}
      <div style={{
        margin: '0 12px 12px', padding: 4,
        background: t.bg, borderRadius: 12,
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        border: `0.5px solid ${t.border}`,
      }}>
        <button style={engagementBtn(t)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 13.5s-5-3.2-5-7.1a2.9 2.9 0 0 1 5-2 2.9 2.9 0 0 1 5 2c0 3.9-5 7.1-5 7.1z"
              stroke={t.text} strokeWidth="1.4" strokeLinejoin="round" fill={post.liked ? t.text : 'none'}/>
          </svg>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{post.likes}</span>
        </button>
        <button style={engagementBtn(t)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2.5 4a1.5 1.5 0 0 1 1.5-1.5h8A1.5 1.5 0 0 1 13.5 4v5a1.5 1.5 0 0 1-1.5 1.5H7l-3 2.5v-2.5H4A1.5 1.5 0 0 1 2.5 9V4z"
              stroke={t.text} strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
          </svg>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{post.comments}</span>
        </button>
      </div>
    </div>
  );
}

function engagementBtn(t) {
  return {
    height: 42, border: 'none', borderRadius: 10,
    background: 'transparent', color: t.text,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontSize: 14, fontWeight: 600, letterSpacing: -0.2, cursor: 'pointer',
    fontFamily: 'inherit',
  };
}

Object.assign(window, { FeedPostCard });
