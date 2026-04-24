// Profile — Refined Native. Monochrome. Light + Dark.
// Follows design.md: no accent color, numbers as UI, opacity ramps for hierarchy.

function ProfileRefined({ state, setState, dark = false, initialView = 'profile', postsWithImages = false }) {
  const [view, setView] = React.useState(initialView);
  // Orange activity ramp; empty days stay neutral gray.
  const ramp = dark
    ? ['rgba(255,255,255,0.06)', '#4a2a12', '#8a4716', '#ff6a1f']
    : ['rgba(0,0,0,0.06)',       '#ffd2a8', '#ff9d5c', '#e56a1f'];

  const t = dark ? {
    bg: '#0a0a0a', surface: '#141414', text: '#fff',
    textMuted: 'rgba(255,255,255,0.55)', textFaint: 'rgba(255,255,255,0.4)',
    border: 'rgba(255,255,255,0.08)', chipBg: 'rgba(255,255,255,0.08)',
    primaryBg: '#fff', primaryText: '#000',
    iconStroke: '#fff',
    dotEmpty: ramp[0], dotLow: ramp[1], dotMid: ramp[2], dotHigh: ramp[3],
  } : {
    bg: '#fafafa', surface: '#fff', text: '#000',
    textMuted: 'rgba(0,0,0,0.5)', textFaint: 'rgba(0,0,0,0.4)',
    border: 'rgba(0,0,0,0.08)', chipBg: 'rgba(0,0,0,0.05)',
    primaryBg: '#000', primaryText: '#fff',
    iconStroke: '#000',
    dotEmpty: ramp[0], dotLow: ramp[1], dotMid: ramp[2], dotHigh: ramp[3],
  };

  const {
    displayName, username, initial, isFollowing,
    workouts, followers, following,
    streakDays, activity, todayIdx,
  } = state;

  if (view === 'posts') {
    return <PostsGridView state={state} theme={t} dark={dark} onBack={() => setView('profile')} withImages={postsWithImages} />;
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: t.bg,
      fontFamily: '-apple-system, "SF Pro Text", system-ui',
      overflowY: 'auto',
    }}>
      {/* Header — identity (avatar + name/handle) */}
      <div style={{ padding: '56px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Avatar — monochrome, initial */}
          <div style={{
            width: 96, height: 96, borderRadius: '50%',
            background: t.text,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{
              fontSize: 44, fontWeight: 700, letterSpacing: -1.5,
              color: t.primaryText, lineHeight: 1,
              fontFamily: '"SF Pro Display", -apple-system, system-ui',
            }}>{initial}</span>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 28, fontWeight: 700, letterSpacing: -0.7, color: t.text,
              lineHeight: 1.1,
            }}>{displayName}</div>
            <div style={{
              fontSize: 15, color: t.textMuted, marginTop: 4,
            }}>@{username}</div>
          </div>
        </div>
      </div>

      {/* Stats — workouts / followers / following */}
      <div style={{ padding: '24px 20px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <Stat theme={t} label="Workouts" value={workouts} />
          <Stat theme={t} label="Followers" value={followers} />
          <Stat theme={t} label="Following" value={following} />
        </div>

        {/* Follow / Unfollow — full-width CTA under stats */}
        <button
          onClick={() => setState(s => ({ ...s, isFollowing: !s.isFollowing }))}
          style={{
            marginTop: 18,
            width: '100%',
            height: 44,
            borderRadius: 12,
            background: isFollowing ? 'transparent' : t.primaryBg,
            color: isFollowing ? t.text : t.primaryText,
            border: isFollowing ? `1px solid ${t.border}` : 'none',
            fontSize: 15, fontWeight: 600, letterSpacing: -0.2,
            fontFamily: 'inherit', cursor: 'pointer',
          }}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>

      <div style={{ height: 0.5, background: t.border, margin: '0 20px' }} />

      {/* Activity grid + Streak */}
      <div style={{ padding: '20px 20px 20px' }}>
        <div style={{
          fontSize: 12, fontWeight: 600, letterSpacing: 1.2,
          color: t.textMuted, textTransform: 'uppercase',
          marginBottom: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span>Activity</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, textTransform: 'none', letterSpacing: 0 }}>
            <svg width="22" height="25" viewBox="0 0 16 18" fill="none" aria-hidden>
              <path d="M8 1.5c.8 2.6 3 3.8 3 6.8 0 1.4-.7 2.6-1.8 3.3.4-.6.5-1.4.2-2.3-.3-1-1.1-1.6-1.4-2.6C7.2 9 6 10 6 11.7c0 .6.2 1.2.4 1.7C5.3 12.7 4.5 11.4 4.5 10c0-2.5 1.6-3.8 2.6-5.8.4-.8.7-1.8.9-2.7Z"
                stroke="#FF6A1F" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
            </svg>
            <span style={{
              fontSize: 22, fontWeight: 700, color: t.text,
              fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4,
              fontFamily: '"SF Pro Display", -apple-system, system-ui',
              lineHeight: 1,
            }}>{streakDays}</span>
          </span>
        </div>

        <div>
          {/* Grid: 7 cols (days), 5 rows (weeks), newest week at bottom */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 8,
            marginBottom: 10,
          }}>
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <div key={i} style={{
                fontSize: 11, fontWeight: 600, letterSpacing: 0.5,
                color: t.textFaint, textAlign: 'center',
              }}>{d}</div>
            ))}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 8,
          }}>
            {activity.map((level, i) => {
              const isToday = i === todayIdx;
              const bg = level === 0 ? t.dotEmpty
                       : level === 1 ? t.dotLow
                       : level === 2 ? t.dotMid
                       : t.dotHigh;
              return (
                <div key={i} style={{
                  aspectRatio: '1 / 1',
                  borderRadius: '50%',
                  background: bg,
                  position: 'relative',
                  justifySelf: 'center',
                  width: '100%',
                  maxWidth: 28,
                }}>
                  {isToday && (
                    <div style={{
                      position: 'absolute',
                      inset: -4,
                      borderRadius: '50%',
                      border: `1.5px solid ${t.text}`,
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ height: 0.5, background: t.border, margin: '0 20px' }} />

      {/* Posts section header */}
      <div style={{ padding: '20px 20px 12px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.2,
          color: t.textMuted, textTransform: 'uppercase' }}>Posts</div>
        <button
          onClick={() => setView('posts')}
          style={{
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 13, color: t.text, fontWeight: 500,
            letterSpacing: -0.1, display: 'flex', alignItems: 'center', gap: 4,
          }}>
          See all
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M4.5 2.5L8 6l-3.5 3.5" stroke={t.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>
      </div>

      {/* Most recent post + See all — replaces carousel */}
      <div style={{ padding: '0 16px 24px' }}>
        {state.posts && state.posts[0] && (
          <FeedPostCard post={state.posts[0]} dark={dark} withImage={false} />
        )}
      </div>
    </div>
  );
}

function PostsGridView({ state, theme: t, dark, onBack, withImages = false }) {
  const rawPosts = state.posts || [];
  // Image placeholders — subtle gym-themed gradients for indices that should show a thumb.
  const imageConfigs = [
    { imageGradient: 'linear-gradient(135deg, #3a2a1f 0%, #6b4a2e 100%)', imageCount: 3 }, // warm wood stack
    null,
    { imageGradient: 'linear-gradient(135deg, #2a2a2a 0%, #555 100%)', imageCount: 1 },    // dumbbell steel
    null,
    { imageGradient: 'linear-gradient(135deg, #4a3b2a 0%, #8a6b4a 100%)', imageCount: 2 }, // kettlebell stack
    null,
    { imageGradient: 'linear-gradient(160deg, #1f2a3a 0%, #3a5a7a 100%)', imageCount: 1 },
    { imageGradient: 'linear-gradient(135deg, #3a2a2a 0%, #7a4a4a 100%)', imageCount: 2 },
  ];
  const posts = withImages
    ? rawPosts.map((p, i) => {
        const cfg = imageConfigs[i % imageConfigs.length];
        return cfg ? { ...p, hasImage: true, ...cfg } : p;
      })
    : rawPosts;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: t.bg,
      fontFamily: '-apple-system, "SF Pro Text", system-ui',
      overflowY: 'auto',
    }}>
      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 2,
        background: t.bg,
        padding: '56px 16px 12px',
        borderBottom: `0.5px solid ${t.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            onClick={onBack}
            style={{
              background: 'none', border: 'none', padding: 4, marginLeft: -4,
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              color: t.text, fontFamily: 'inherit',
              fontSize: 16, fontWeight: 400, letterSpacing: -0.2,
              gap: 2,
            }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
              <path d="M13.5 5L7.5 11l6 6" stroke={t.text} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 17, fontWeight: 600, color: t.text, letterSpacing: -0.3 }}>
              Posts
            </div>
            <div style={{ fontSize: 12, color: t.textMuted, marginTop: 1,
              fontVariantNumeric: 'tabular-nums' }}>
              @{state.username} · {posts.length}
            </div>
          </div>
          <div style={{ width: 22, height: 22 }} />
        </div>
      </div>

      {/* 2-col grid of compact posts */}
      <div style={{
        padding: '16px 12px 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
      }}>
        {posts.map((p, i) => (
          <CompactPostCard key={i} post={p} theme={t} />
        ))}
      </div>
    </div>
  );
}

function CompactPostCard({ post, theme: t }) {
  return (
    <div style={{
      background: t.surface, borderRadius: 12, overflow: 'visible',
      border: `0.5px solid ${t.border}`,
      padding: 12,
      display: 'flex', flexDirection: 'column', gap: 8,
      minHeight: 156,
    }}>
      {/* Header: avatar + time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 24, height: 24, borderRadius: 12,
          background: t.chipBg, border: `0.5px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 600, color: t.text,
        }}>{post.initials}</div>
        <div style={{ fontSize: 11, color: t.textFaint,
          fontVariantNumeric: 'tabular-nums' }}>{post.timeAgo}</div>
      </div>

      {/* Workout name */}
      <div style={{
        fontSize: 15, fontWeight: 600, color: t.text, letterSpacing: -0.3,
        lineHeight: 1.2,
        overflow: 'hidden', display: '-webkit-box',
        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
      }}>
        {post.workoutName}
      </div>

      {/* Stats row (+ optional thumbnail) */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginTop: 'auto' }}>
        <div style={{ display: 'flex', gap: 10, flex: 1 }}>
          <div>
            <div style={{
              fontSize: 16, fontWeight: 700, color: t.text,
              fontVariantNumeric: 'tabular-nums', letterSpacing: -0.3,
              lineHeight: 1,
            }}>{post.time}</div>
            <div style={{ fontSize: 9, color: t.textFaint, marginTop: 3,
              textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600 }}>Time</div>
          </div>
          <div>
            <div style={{
              fontSize: 16, fontWeight: 700, color: t.text,
              fontVariantNumeric: 'tabular-nums', letterSpacing: -0.3,
              lineHeight: 1,
            }}>{post.exerciseCount}</div>
            <div style={{ fontSize: 9, color: t.textFaint, marginTop: 3,
              textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600 }}>Sets</div>
          </div>
        </div>
        {post.hasImage && (
          <div style={{
            width: 52, height: 52, flexShrink: 0,
            marginTop: -8, marginRight: (post.imageCount || 1) > 1 ? 4 : 0,
            position: 'relative',
          }}>
            {/* Stack shadows — 2nd and 3rd cards peeking behind */}
            {(post.imageCount || 1) >= 3 && (
              <div style={{
                position: 'absolute', inset: 0,
                transform: 'translate(4px, 4px) rotate(4deg)',
                borderRadius: 8,
                background: post.imageGradient,
                filter: 'brightness(0.72)',
                border: `1.5px solid ${t.surface}`,
                boxShadow: `0 0 0 1px ${t.textFaint}`,
              }} />
            )}
            {(post.imageCount || 1) >= 2 && (
              <div style={{
                position: 'absolute', inset: 0,
                transform: 'translate(2px, 2px) rotate(-3deg)',
                borderRadius: 8,
                background: post.imageGradient,
                filter: 'brightness(0.85)',
                border: `1.5px solid ${t.surface}`,
                boxShadow: `0 0 0 1px ${t.textFaint}`,
              }} />
            )}
            {/* Top card */}
            <div style={{
              position: 'relative',
              width: 52, height: 52, borderRadius: 8,
              background: post.imageGradient || `linear-gradient(135deg, ${t.chipBg}, ${t.border})`,
              border: `1.5px solid ${t.surface}`,
              boxShadow: `0 0 0 1px ${t.textFaint}`,
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: post.imagePattern || `
                  radial-gradient(circle at 30% 40%, rgba(255,255,255,0.18) 0%, transparent 45%),
                  radial-gradient(circle at 70% 70%, rgba(0,0,0,0.12) 0%, transparent 50%)
                `,
              }} />
            </div>
          </div>
        )}
      </div>

      {/* Footer: likes + comments */}
      <div style={{ display: 'flex', gap: 20, paddingTop: 10,
        justifyContent: 'center',
        borderTop: `0.5px solid ${t.border}`, color: t.textMuted, fontSize: 13,
        fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M7 12S2 8.5 2 5.5C2 3.8 3.3 2.5 5 2.5c.9 0 1.6.4 2 1 .4-.6 1.1-1 2-1 1.7 0 3 1.3 3 3C12 8.5 7 12 7 12Z"
              stroke={t.textMuted} strokeWidth="1.3" fill="none"/>
          </svg>
          {post.likes}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2 5.5C2 3.8 3.3 2.5 5 2.5h4C10.7 2.5 12 3.8 12 5.5v2c0 1.7-1.3 3-3 3H6.5L4 12.5v-2c-1.1 0-2-.9-2-2v-3Z"
              stroke={t.textMuted} strokeWidth="1.3" fill="none"/>
          </svg>
          {post.comments}
        </span>
      </div>
    </div>
  );
}

function Stat({ theme, label, value }) {
  const t = theme;
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.2,
        color: t.textMuted, textTransform: 'uppercase', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{
        fontSize: 32, fontWeight: 700, letterSpacing: -1,
        color: t.text, lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
        fontFamily: '"SF Pro Display", -apple-system, system-ui',
      }}>{value}</div>
    </div>
  );
}

Object.assign(window, { ProfileRefined });
