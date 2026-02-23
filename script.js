
// ==================== EVOLVE — ENGINE v2.0 ====================
// 11 Progression Systems: Ranks, Achievements, Loot, Combos,
// Login Streaks, Particles, Quotes, Avatar, Challenges, Charts, Audio

// ===== AUDIO ENGINE =====
const AudioEngine = {
  ctx: null,
  enabled: true,
  init() {
    try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
  },
  play(type) {
    if (!this.enabled || !this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.connect(g); g.connect(this.ctx.destination);
    const t = this.ctx.currentTime;
    switch(type) {
      case 'complete':
        o.frequency.setValueAtTime(523, t);
        o.frequency.setValueAtTime(659, t + 0.1);
        o.frequency.setValueAtTime(784, t + 0.2);
        g.gain.setValueAtTime(0.15, t);
        g.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
        o.start(t); o.stop(t + 0.4); break;
      case 'levelup':
        o.frequency.setValueAtTime(440, t);
        o.frequency.setValueAtTime(554, t + 0.15);
        o.frequency.setValueAtTime(659, t + 0.3);
        o.frequency.setValueAtTime(880, t + 0.45);
        g.gain.setValueAtTime(0.2, t);
        g.gain.exponentialRampToValueAtTime(0.01, t + 0.7);
        o.start(t); o.stop(t + 0.7); break;
      case 'achievement':
        o.type = 'triangle';
        o.frequency.setValueAtTime(880, t);
        o.frequency.setValueAtTime(1109, t + 0.12);
        o.frequency.setValueAtTime(1318, t + 0.24);
        g.gain.setValueAtTime(0.12, t);
        g.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
        o.start(t); o.stop(t + 0.5); break;
      case 'loot':
        o.type = 'sine';
        o.frequency.setValueAtTime(600, t);
        o.frequency.exponentialRampToValueAtTime(1200, t + 0.3);
        o.frequency.exponentialRampToValueAtTime(800, t + 0.5);
        g.gain.setValueAtTime(0.15, t);
        g.gain.exponentialRampToValueAtTime(0.01, t + 0.6);
        o.start(t); o.stop(t + 0.6); break;
      case 'combo':
        o.frequency.setValueAtTime(700, t);
        o.frequency.setValueAtTime(900, t + 0.08);
        g.gain.setValueAtTime(0.1, t);
        g.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
        o.start(t); o.stop(t + 0.2); break;
    }
  }
};

// ===== PARTICLE ENGINE =====
const Particles = {
  canvas: null, ctx: null, particles: [],
  init() {
    this.canvas = document.getElementById('particleCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loop();
  },
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },
  emit(x, y, count, color, spread) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * spread,
        vy: (Math.random() - 0.5) * spread - 2,
        life: 1,
        decay: 0.01 + Math.random() * 0.02,
        size: 2 + Math.random() * 4,
        color
      });
    }
  },
  burst(count = 60) {
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    const colors = ['#C6A75E', '#FFD700', '#E8E6E3', '#8B6F3D'];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 3 + Math.random() * 5;
      this.particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.008 + Math.random() * 0.015,
        size: 2 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  },
  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles = this.particles.filter(p => {
      p.x += p.vx; p.y += p.vy;
      p.vy += 0.05;
      p.life -= p.decay;
      if (p.life <= 0) return false;
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      this.ctx.fill();
      return true;
    });
    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.loop());
  }
};

// ===== RANK SYSTEM =====
const RANKS = [
  { name: 'INITIATE', minLevel: 1, symbol: '⚔️' },
  { name: 'DISCIPLE', minLevel: 3, symbol: '🗡️' },
  { name: 'MONK', minLevel: 6, symbol: '🧘' },
  { name: 'WARRIOR MONK', minLevel: 10, symbol: '⚔️🧘' },
  { name: 'SHADOW MONK', minLevel: 15, symbol: '🌑' },
  { name: 'MASTER', minLevel: 20, symbol: '👁️' },
  { name: 'GRAND MASTER', minLevel: 28, symbol: '🔱' },
  { name: 'SAGE', minLevel: 38, symbol: '📿' },
  { name: 'SOVEREIGN', minLevel: 50, symbol: '👑' },
  { name: 'ASCENDED ONE', minLevel: 65, symbol: '✨' }
];
function getRank(level) {
  let r = RANKS[0];
  for (const rank of RANKS) { if (level >= rank.minLevel) r = rank; }
  return r;
}
function getNextRank(level) {
  for (const rank of RANKS) { if (level < rank.minLevel) return rank; }
  return null;
}
function getRankProgress(level) {
  const cur = getRank(level);
  const next = getNextRank(level);
  if (!next) return 1;
  const range = next.minLevel - cur.minLevel;
  return (level - cur.minLevel) / range;
}

// ===== ACHIEVEMENTS =====
const ACHIEVEMENTS = [
  { id: 'first_blood', name: 'First Blood', desc: 'Complete your first mission', icon: '🩸', rarity: 'common', check: d => d.totalCompleted >= 1 },
  { id: 'on_fire', name: 'On Fire', desc: 'Complete 10 missions', icon: '🔥', rarity: 'common', check: d => d.totalCompleted >= 10 },
  { id: 'centurion', name: 'Centurion', desc: 'Complete 100 missions', icon: '🏛️', rarity: 'rare', check: d => d.totalCompleted >= 100 },
  { id: 'machine', name: 'The Machine', desc: 'Complete 500 missions', icon: '⚙️', rarity: 'epic', check: d => d.totalCompleted >= 500 },
  { id: 'legend', name: 'Living Legend', desc: 'Complete 1000 missions', icon: '🌟', rarity: 'legendary', check: d => d.totalCompleted >= 1000 },
  { id: 'streak3', name: 'Consistency', desc: '3-day streak', icon: '📅', rarity: 'common', check: d => d.maxStreak >= 3 },
  { id: 'streak7', name: 'Iron Week', desc: '7-day streak', icon: '🔗', rarity: 'rare', check: d => d.maxStreak >= 7 },
  { id: 'streak14', name: 'Forged in Fire', desc: '14-day streak', icon: '⛓️', rarity: 'rare', check: d => d.maxStreak >= 14 },
  { id: 'streak30', name: 'Unbreakable', desc: '30-day streak', icon: '💎', rarity: 'epic', check: d => d.maxStreak >= 30 },
  { id: 'streak60', name: 'Diamond Discipline', desc: '60-day streak', icon: '🏆', rarity: 'legendary', check: d => d.maxStreak >= 60 },
  { id: 'lvl5', name: 'Rising', desc: 'Reach Level 5', icon: '⬆️', rarity: 'common', check: d => d.level >= 5 },
  { id: 'lvl10', name: 'Double Digits', desc: 'Reach Level 10', icon: '🔟', rarity: 'rare', check: d => d.level >= 10 },
  { id: 'lvl25', name: 'Quarter Century', desc: 'Reach Level 25', icon: '⚡', rarity: 'epic', check: d => d.level >= 25 },
  { id: 'lvl50', name: 'Sovereign', desc: 'Reach Level 50', icon: '👑', rarity: 'legendary', check: d => d.level >= 50 },
  { id: 'combo5', name: 'Combo Starter', desc: 'Hit a 5x combo', icon: '💥', rarity: 'common', check: d => d.maxCombo >= 5 },
  { id: 'combo10', name: 'Combo King', desc: 'Hit a 10x combo', icon: '🎯', rarity: 'rare', check: d => d.maxCombo >= 10 },
  { id: 'combo20', name: 'Combo God', desc: 'Hit a 20x combo', icon: '☄️', rarity: 'epic', check: d => d.maxCombo >= 20 },
  { id: 'loot10', name: 'Treasure Hunter', desc: 'Collect 10 loot drops', icon: '🎁', rarity: 'common', check: d => d.totalLoot >= 10 },
  { id: 'loot50', name: 'Hoarder', desc: 'Collect 50 loot drops', icon: '💰', rarity: 'rare', check: d => d.totalLoot >= 50 },
  { id: 'focus5', name: 'Deep Work', desc: 'Complete 5 focus sessions', icon: '🧠', rarity: 'common', check: d => d.focusSessions >= 5 },
  { id: 'focus25', name: 'Zen Master', desc: 'Complete 25 focus sessions', icon: '🕯️', rarity: 'rare', check: d => d.focusSessions >= 25 },
  { id: 'focus100', name: 'Time Lord', desc: 'Complete 100 focus sessions', icon: '⏳', rarity: 'epic', check: d => d.focusSessions >= 100 },
  { id: 'perfect_day', name: 'Perfect Day', desc: 'Complete all missions in one day', icon: '✅', rarity: 'rare', check: d => d.perfectDays >= 1 },
  { id: 'perfect5', name: 'Perfect Week', desc: '5 perfect days total', icon: '🌟', rarity: 'epic', check: d => d.perfectDays >= 5 },
  { id: 'login7', name: 'Devoted', desc: '7-day login streak', icon: '🚪', rarity: 'rare', check: d => d.loginStreak >= 7 },
  { id: 'login30', name: 'Ritual', desc: '30-day login streak', icon: '🏠', rarity: 'epic', check: d => d.loginStreak >= 30 },
  { id: 'xp1000', name: 'XP Collector', desc: 'Earn 1,000 total XP', icon: '⭐', rarity: 'common', check: d => d.totalXP >= 1000 },
  { id: 'xp10000', name: 'XP Hoarder', desc: 'Earn 10,000 total XP', icon: '🌠', rarity: 'rare', check: d => d.totalXP >= 10000 },
  { id: 'xp50000', name: 'XP Titan', desc: 'Earn 50,000 total XP', icon: '💫', rarity: 'epic', check: d => d.totalXP >= 50000 },
  { id: 'all_skills', name: 'Omni-skilled', desc: 'Unlock 15 skill nodes', icon: '🌳', rarity: 'epic', check: d => d.skillsUnlocked >= 15 },
  { id: 'night_owl', name: 'Night Owl', desc: 'Complete a mission after midnight', icon: '🦉', rarity: 'common', check: d => d.nightOwl },
  { id: 'early_bird', name: 'Early Bird', desc: 'Complete a mission before 6 AM', icon: '🐦', rarity: 'rare', check: d => d.earlyBird },
  { id: 'challenge3', name: 'Challenger', desc: 'Complete 3 weekly challenges', icon: '🎖️', rarity: 'rare', check: d => d.challengesCompleted >= 3 },
  { id: 'challenge10', name: 'Challenge Master', desc: 'Complete 10 weekly challenges', icon: '🏅', rarity: 'epic', check: d => d.challengesCompleted >= 10 }
];

// ===== STOIC QUOTES =====
const STOIC_QUOTES = [
  { text: "We suffer more in imagination than in reality.", author: "Seneca", unlock: 'level', req: 1 },
  { text: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius", unlock: 'level', req: 3 },
  { text: "No man is free who is not master of himself.", author: "Epictetus", unlock: 'level', req: 5 },
  { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius", unlock: 'level', req: 7 },
  { text: "He who fears death will never do anything worthy of a man who is alive.", author: "Seneca", unlock: 'level', req: 10 },
  { text: "If it is not right, do not do it. If it is not true, do not say it.", author: "Marcus Aurelius", unlock: 'streak', req: 3 },
  { text: "Difficulties strengthen the mind, as labor does the body.", author: "Seneca", unlock: 'streak', req: 7 },
  { text: "The best revenge is not to be like your enemy.", author: "Marcus Aurelius", unlock: 'level', req: 12 },
  { text: "Man is not worried by real problems so much as by his imagined anxieties about real problems.", author: "Epictetus", unlock: 'streak', req: 14 },
  { text: "You have power over your mind, not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius", unlock: 'level', req: 15 },
  { text: "The whole future lies in uncertainty: live immediately.", author: "Seneca", unlock: 'level', req: 18 },
  { text: "First say to yourself what you would be; and then do what you have to do.", author: "Epictetus", unlock: 'streak', req: 21 },
  { text: "It is not that we have a short time to live, but that we waste a great deal of it.", author: "Seneca", unlock: 'level', req: 20 },
  { text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius", unlock: 'level', req: 25 },
  { text: "He who is brave is free.", author: "Seneca", unlock: 'streak', req: 30 },
  { text: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.", author: "Marcus Aurelius", unlock: 'level', req: 30 },
  { text: "Hang on to your youthful enthusiasms — you will be able to use them better when you are older.", author: "Seneca", unlock: 'level', req: 35 },
  { text: "The soul becomes dyed with the color of its thoughts.", author: "Marcus Aurelius", unlock: 'level', req: 40 },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", unlock: 'streak', req: 45 },
  { text: "To be everywhere is to be nowhere.", author: "Seneca", unlock: 'level', req: 50 }
];

// ===== LOOT TABLE =====
const LOOT_TABLE = [
  { name: 'XP Fragment', desc: 'A shard of experience', reward: 'xp', amount: 10, rarity: 'common', icon: '✨', weight: 40 },
  { name: 'XP Crystal', desc: 'Concentrated experience', reward: 'xp', amount: 25, rarity: 'common', icon: '💎', weight: 25 },
  { name: 'XP Orb', desc: 'A sphere of pure growth', reward: 'xp', amount: 50, rarity: 'rare', icon: '🔮', weight: 15 },
  { name: 'Discipline Shard', desc: '+1 Discipline', reward: 'stat', stat: 'discipline', amount: 1, rarity: 'rare', icon: '🔴', weight: 8 },
  { name: 'Focus Shard', desc: '+1 Focus', reward: 'stat', stat: 'focus', amount: 1, rarity: 'rare', icon: '🟡', weight: 8 },
  { name: 'Energy Shard', desc: '+1 Energy', reward: 'stat', stat: 'energy', amount: 1, rarity: 'rare', icon: '🟢', weight: 8 },
  { name: 'Strength Shard', desc: '+1 Strength', reward: 'stat', stat: 'strength', amount: 1, rarity: 'rare', icon: '🔵', weight: 8 },
  { name: 'Resilience Shard', desc: '+1 Resilience', reward: 'stat', stat: 'resilience', amount: 1, rarity: 'rare', icon: '🟣', weight: 8 },
  { name: 'Knowledge Shard', desc: '+1 Knowledge', reward: 'stat', stat: 'knowledge', amount: 1, rarity: 'rare', icon: '⚪', weight: 8 },
  { name: 'XP Mega Orb', desc: 'Massive experience burst', reward: 'xp', amount: 100, rarity: 'epic', icon: '🌟', weight: 4 },
  { name: 'Stat Surge', desc: '+2 to a random stat', reward: 'stat_random', amount: 2, rarity: 'epic', icon: '⚡', weight: 3 },
  { name: 'Skill Point', desc: 'A free skill point', reward: 'sp', amount: 1, rarity: 'epic', icon: '🧿', weight: 3 },
  { name: 'Golden XP Chalice', desc: 'Overflowing with experience', reward: 'xp', amount: 250, rarity: 'legendary', icon: '🏆', weight: 1 },
  { name: 'Ascension Shard', desc: '+3 to ALL stats', reward: 'stat_all', amount: 3, rarity: 'legendary', icon: '👑', weight: 0.5 }
];

// ===== WEEKLY CHALLENGES TEMPLATES =====
const CHALLENGE_TEMPLATES = [
  { name: 'Iron Core', desc: 'Complete all core missions 5 days this week', icon: '🔴', target: 5, type: 'core_days', reward: 75 },
  { name: 'Growth Spurt', desc: 'Complete 15 growth missions this week', icon: '🌱', target: 15, type: 'growth_count', reward: 60 },
  { name: 'Focus Champion', desc: 'Complete 5 focus sessions this week', icon: '🧠', target: 5, type: 'focus_sessions', reward: 80 },
  { name: 'Combo Hunter', desc: 'Hit a 5x combo 3 times this week', icon: '💥', target: 3, type: 'combo_5', reward: 50 },
  { name: 'Perfect Day', desc: 'Have 2 perfect days this week', icon: '✅', target: 2, type: 'perfect_days', reward: 100 },
  { name: 'Challenge Seeker', desc: 'Complete 4 challenge missions this week', icon: '🟣', target: 4, type: 'challenge_count', reward: 70 },
  { name: 'Early Riser', desc: 'Complete a mission before 7 AM 3 times', icon: '🌅', target: 3, type: 'early_missions', reward: 55 },
  { name: 'Streak Builder', desc: 'Maintain your streak all week', icon: '🔥', target: 7, type: 'streak_days', reward: 90 },
  { name: 'XP Hunter', desc: 'Earn 200 XP this week', icon: '⭐', target: 200, type: 'weekly_xp', reward: 45 },
  { name: 'Full Sweep', desc: 'Complete every mission 3 days this week', icon: '🧹', target: 3, type: 'full_sweep', reward: 85 }
];

// ===== SKILL TREE =====
const SKILL_TREE = [
  { branch: 'Physical Discipline', icon: '💪', nodes: [
    { id: 'pd1', name: 'Iron Body', cost: 1, desc: '+5% Strength XP', icon: '🏋️' },
    { id: 'pd2', name: 'Endurance', cost: 2, desc: '+5% Energy XP', icon: '🏃' },
    { id: 'pd3', name: 'Fortitude', cost: 3, desc: '+10% Resilience XP', icon: '🛡️' },
    { id: 'pd4', name: 'Titan', cost: 4, desc: '+1 all physical stats', icon: '⚡' }
  ]},
  { branch: 'Mental Clarity', icon: '🧠', nodes: [
    { id: 'mc1', name: 'Clear Mind', cost: 1, desc: '+5% Focus XP', icon: '🎯' },
    { id: 'mc2', name: 'Deep Focus', cost: 2, desc: '+10 Timer XP', icon: '⏱️' },
    { id: 'mc3', name: 'Photographic', cost: 3, desc: '+10% Knowledge XP', icon: '📖' },
    { id: 'mc4', name: 'Enlightened', cost: 4, desc: '+1 all mental stats', icon: '💡' }
  ]},
  { branch: 'Stoic Control', icon: '🏛️', nodes: [
    { id: 'sc1', name: 'Calm', cost: 1, desc: 'Slower momentum decay', icon: '☯️' },
    { id: 'sc2', name: 'Patience', cost: 2, desc: '+5% all XP', icon: '⌛' },
    { id: 'sc3', name: 'Detachment', cost: 3, desc: 'Streak forgiveness (1 day)', icon: '🔒' },
    { id: 'sc4', name: 'Amor Fati', cost: 5, desc: '+15% all XP', icon: '🌟' }
  ]},
  { branch: 'Strategic Intelligence', icon: '♟️', nodes: [
    { id: 'si1', name: 'Planner', cost: 1, desc: '+1 weekly challenge slot', icon: '📋' },
    { id: 'si2', name: 'Tactician', cost: 2, desc: '+10% loot chance', icon: '🎲' },
    { id: 'si3', name: 'Strategist', cost: 3, desc: 'Double combo window', icon: '⚔️' },
    { id: 'si4', name: 'Mastermind', cost: 5, desc: '+20% all XP', icon: '🧩' }
  ]},
  { branch: 'Social Authority', icon: '👥', nodes: [
    { id: 'sa1', name: 'Presence', cost: 1, desc: '+5% Discipline XP', icon: '🗣️' },
    { id: 'sa2', name: 'Influence', cost: 2, desc: '+1 daily login XP/level', icon: '🤝' },
    { id: 'sa3', name: 'Command', cost: 3, desc: 'Missions give +2 stat points', icon: '👑' },
    { id: 'sa4', name: 'Legacy', cost: 5, desc: 'All bonuses doubled', icon: '🏰' }
  ]}
];

// ===== DEFAULT STATE =====
function getDefaultState() {
  return {
    identity: { title: 'THE IRON DISCIPLE', manifesto: 'I am becoming the version of myself that cannot be stopped.' },
    stats: { discipline: 5, focus: 5, energy: 5, strength: 5, resilience: 5, knowledge: 5 },
    momentum: { streak: 0, value: 50, maxStreak: 0 },
    xp: { current: 0, level: 1, total: 0, sp: 0 },
    tasks: [
      { id: 't1', name: 'Morning Training', cat: 'core', diff: 2, stat: 'strength', xp: 20, done: false },
      { id: 't2', name: 'Cold Shower', cat: 'core', diff: 2, stat: 'resilience', xp: 15, done: false },
      { id: 't3', name: 'Read 20 Pages', cat: 'core', diff: 1, stat: 'knowledge', xp: 15, done: false },
      { id: 't4', name: 'Meditate 15min', cat: 'growth', diff: 1, stat: 'focus', xp: 12, done: false },
      { id: 't5', name: 'Journal Entry', cat: 'growth', diff: 1, stat: 'discipline', xp: 10, done: false },
      { id: 't6', name: 'Learn New Skill', cat: 'growth', diff: 2, stat: 'knowledge', xp: 18, done: false },
      { id: 't7', name: 'Do Something Uncomfortable', cat: 'challenge', diff: 3, stat: 'resilience', xp: 30, done: false }
    ],
    history: [],
    skillTree: [],
    achievements: [],
    lastDate: null,
    combo: { count: 0, lastTime: 0, max: 0 },
    loginStreak: { count: 0, lastDate: null, totalLogins: 0 },
    journal: {},
    weeklyChallenges: { challenges: [], weekStart: null, progress: {} },
    quotesUnlocked: [],
    journeyEvents: [],
    totalCompleted: 0,
    totalLoot: 0,
    focusSessions: 0,
    perfectDays: 0,
    challengesCompleted: 0,
    nightOwl: false,
    earlyBird: false,
    audioEnabled: true,
    statHistory: {}
  };
}

// ===== STATE MANAGEMENT =====
let S;
function loadState() {
  const raw = localStorage.getItem('evolve_v2');
  if (raw) {
    const saved = JSON.parse(raw);
    S = { ...getDefaultState(), ...saved };
    // Merge missing fields
    const def = getDefaultState();
    for (const k of Object.keys(def)) {
      if (S[k] === undefined) S[k] = def[k];
    }
    if (!S.combo) S.combo = def.combo;
    if (!S.loginStreak) S.loginStreak = def.loginStreak;
    if (!S.weeklyChallenges) S.weeklyChallenges = def.weeklyChallenges;
    if (!S.statHistory) S.statHistory = {};
    if (!S.journeyEvents) S.journeyEvents = [];
  } else {
    S = getDefaultState();
    addJourneyEvent('🌅 Journey Begins', 'You opened the temple for the first time.');
  }
}
function saveState() { localStorage.setItem('evolve_v2', JSON.stringify(S)); }

// ===== XP & LEVELING =====
function xpForLevel(lvl) { return Math.floor(80 + lvl * 40 + lvl * lvl * 5); }
function getMomentumMult() { return 1 + S.momentum.value / 200; }
function getComboBonus() { return S.combo.count > 1 ? 1 + (S.combo.count - 1) * 0.05 : 1; }

function addXP(base, source) {
  let amount = Math.floor(base * getMomentumMult() * getComboBonus());
  S.xp.current += amount;
  S.xp.total += amount;
  // Track weekly XP for challenges
  if (S.weeklyChallenges.progress) {
    S.weeklyChallenges.progress.weekly_xp = (S.weeklyChallenges.progress.weekly_xp || 0) + amount;
  }

  while (S.xp.current >= xpForLevel(S.xp.level)) {
    S.xp.current -= xpForLevel(S.xp.level);
    S.xp.level++;
    S.xp.sp++;
    onLevelUp();
  }
  saveState();
  renderDashboard();
}

function onLevelUp() {
  const rank = getRank(S.xp.level);
  const prevRank = getRank(S.xp.level - 1);

  // Journey event
  addJourneyEvent('⬆️ Level ' + S.xp.level, 'Reached level ' + S.xp.level + ' — Rank: ' + rank.name);

  // Rank up check
  if (rank.name !== prevRank.name) {
    addJourneyEvent('🏅 Rank Up: ' + rank.name, 'You have evolved to ' + rank.name);
  }

  // Unlock quotes
  STOIC_QUOTES.forEach((q, i) => {
    if (q.unlock === 'level' && S.xp.level >= q.req && !S.quotesUnlocked.includes(i)) {
      S.quotesUnlocked.push(i);
    }
  });

  AudioEngine.play('levelup');
  Particles.burst(80);

  // Show level up modal
  document.getElementById('levelUpNumber').textContent = S.xp.level;
  document.getElementById('levelUpRank').textContent = rank.name;
  document.getElementById('levelUpReward').textContent = '+1 Skill Point earned';
  document.getElementById('levelUpOverlay').classList.remove('hidden');
}

function closeLevelUp() {
  document.getElementById('levelUpOverlay').classList.add('hidden');
  checkAchievements();
}

// ===== COMBO SYSTEM =====
function registerCombo() {
  const now = Date.now();
  const window_ms = hasSkill('si3') ? 120000 : 60000; // 1 or 2 min window
  if (now - S.combo.lastTime < window_ms) {
    S.combo.count++;
  } else {
    S.combo.count = 1;
  }
  S.combo.lastTime = now;
  if (S.combo.count > S.combo.max) S.combo.max = S.combo.count;

  if (S.combo.count >= 2) {
    AudioEngine.play('combo');
    const el = document.getElementById('comboIndicator');
    document.getElementById('comboCount').textContent = 'x' + S.combo.count;
    el.classList.remove('hidden');
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = 'comboSlam .3s ease';

    document.getElementById('navCombo').classList.remove('hidden');
    document.getElementById('navComboText').textContent = '🔥 x' + S.combo.count + ' COMBO';

    // Track combo 5 for challenges
    if (S.combo.count >= 5) {
      S.weeklyChallenges.progress.combo_5 = (S.weeklyChallenges.progress.combo_5 || 0) + 1;
    }

    clearTimeout(window._comboTimer);
    window._comboTimer = setTimeout(() => {
      document.getElementById('comboIndicator').classList.add('hidden');
      document.getElementById('navCombo').classList.add('hidden');
    }, 3000);
  }
  saveState();
}

// ===== LOOT SYSTEM =====
function rollLoot() {
  const chance = hasSkill('si2') ? 0.45 : 0.35;
  if (Math.random() > chance) return;

  const totalWeight = LOOT_TABLE.reduce((s, l) => s + l.weight, 0);
  let roll = Math.random() * totalWeight;
  let loot = LOOT_TABLE[0];
  for (const item of LOOT_TABLE) {
    roll -= item.weight;
    if (roll <= 0) { loot = item; break; }
  }

  S.totalLoot++;

  // Apply reward
  if (loot.reward === 'xp') {
    S.xp.current += loot.amount;
    S.xp.total += loot.amount;
  } else if (loot.reward === 'stat') {
    S.stats[loot.stat] += loot.amount;
  } else if (loot.reward === 'stat_random') {
    const keys = Object.keys(S.stats);
    const k = keys[Math.floor(Math.random() * keys.length)];
    S.stats[k] += loot.amount;
  } else if (loot.reward === 'stat_all') {
    for (const k of Object.keys(S.stats)) S.stats[k] += loot.amount;
  } else if (loot.reward === 'sp') {
    S.xp.sp += loot.amount;
  }

  AudioEngine.play('loot');
  showLootModal(loot);
  saveState();
}

function showLootModal(loot) {
  document.getElementById('lootDesc').textContent = loot.desc;
  const rarEl = document.getElementById('lootRarity');
  rarEl.textContent = loot.rarity.toUpperCase();
  rarEl.className = 'loot-rarity ' + loot.rarity;
  document.getElementById('lootReward').textContent = loot.icon + ' ' + loot.name;
  document.getElementById('lootModal').classList.remove('hidden');
  Particles.emit(window.innerWidth / 2, window.innerHeight / 2, 30,
    loot.rarity === 'legendary' ? '#FFD700' : loot.rarity === 'epic' ? '#A855F7' : '#C6A75E', 8);
}
function closeLoot() { document.getElementById('lootModal').classList.add('hidden'); }

// ===== ACHIEVEMENTS =====
function checkAchievements() {
  const data = {
    totalCompleted: S.totalCompleted,
    maxStreak: S.momentum.maxStreak,
    level: S.xp.level,
    maxCombo: S.combo.max,
    totalLoot: S.totalLoot,
    focusSessions: S.focusSessions,
    perfectDays: S.perfectDays,
    loginStreak: S.loginStreak.count,
    totalXP: S.xp.total,
    skillsUnlocked: S.skillTree.length,
    nightOwl: S.nightOwl,
    earlyBird: S.earlyBird,
    challengesCompleted: S.challengesCompleted
  };

  for (const ach of ACHIEVEMENTS) {
    if (S.achievements.includes(ach.id)) continue;
    if (ach.check(data)) {
      S.achievements.push(ach.id);
      showAchievementToast(ach);
      addJourneyEvent('🏆 ' + ach.name, ach.desc + ' (' + ach.rarity.toUpperCase() + ')');
      AudioEngine.play('achievement');
    }
  }
  saveState();
}

function showAchievementToast(ach) {
  const toast = document.getElementById('achievementToast');
  document.getElementById('achievementName').textContent = ach.icon + ' ' + ach.name;
  toast.classList.remove('hidden');
  toast.style.animation = 'none';
  toast.offsetHeight;
  toast.style.animation = 'toastSlide .5s ease';
  Particles.emit(window.innerWidth - 100, 50, 20, '#FFD700', 6);
  setTimeout(() => toast.classList.add('hidden'), 4000);
}

// ===== DAILY LOGIN =====
function checkDailyLogin() {
  const today = new Date().toDateString();
  if (S.loginStreak.lastDate === today) return; // Already logged in today

  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (S.loginStreak.lastDate === yesterday) {
    S.loginStreak.count++;
  } else if (S.loginStreak.lastDate !== null) {
    S.loginStreak.count = 1;
  } else {
    S.loginStreak.count = 1;
  }
  S.loginStreak.lastDate = today;
  S.loginStreak.totalLogins++;
  saveState();

  // Show login bonus modal
  showLoginBonus();
}

function showLoginBonus() {
  const dots = document.getElementById('loginStreakDots');
  dots.innerHTML = '';
  for (let i = 1; i <= 7; i++) {
    const d = document.createElement('div');
    d.className = 'streak-dot';
    if (i < (S.loginStreak.count % 7 || 7)) d.classList.add('filled');
    if (i === (S.loginStreak.count % 7 || 7)) d.classList.add('today');
    d.textContent = i;
    dots.appendChild(d);
  }
  const bonus = Math.min(10 + S.loginStreak.count * 5, 100);
  document.getElementById('loginBonusXP').textContent = '+' + bonus + ' XP';
  document.getElementById('loginBonusModal').classList.remove('hidden');
}

function claimLoginBonus() {
  const bonus = Math.min(10 + S.loginStreak.count * 5, 100);
  addXP(bonus, 'login');
  document.getElementById('loginBonusModal').classList.add('hidden');
  AudioEngine.play('complete');
  Particles.burst(30);
  checkAchievements();
}

// ===== DAILY RESET =====
function checkDayReset() {
  const today = new Date().toDateString();
  if (S.lastDate && S.lastDate !== today) {
    // Log yesterday
    const completedCount = S.tasks.filter(t => t.done).length;
    const totalCount = S.tasks.length;
    const coreComplete = S.tasks.filter(t => t.cat === 'core').every(t => t.done);
    const allComplete = S.tasks.every(t => t.done);

    S.history.push({
      date: S.lastDate,
      completed: completedCount,
      total: totalCount,
      coreComplete,
      alignment: totalCount ? Math.round(completedCount / totalCount * 100) : 0,
      stats: { ...S.stats }
    });

    // Record stat history
    const dayKey = S.lastDate;
    S.statHistory[dayKey] = { ...S.stats };

    // Perfect day tracking
    if (allComplete) {
      S.perfectDays++;
      if (S.weeklyChallenges.progress) {
        S.weeklyChallenges.progress.perfect_days = (S.weeklyChallenges.progress.perfect_days || 0) + 1;
      }
    }

    // Streak logic
    if (coreComplete) {
      S.momentum.streak++;
      if (S.momentum.streak > S.momentum.maxStreak) S.momentum.maxStreak = S.momentum.streak;
      S.momentum.value = Math.min(100, S.momentum.value + 8);
      // Track for challenges
      if (S.weeklyChallenges.progress) {
        S.weeklyChallenges.progress.streak_days = (S.weeklyChallenges.progress.streak_days || 0) + 1;
      }
    } else {
      if (!hasSkill('sc3') || S.momentum.streak <= 0) {
        S.momentum.streak = 0;
      } else {
        S.momentum.streak = Math.max(0, S.momentum.streak - 1);
      }
      S.momentum.value = Math.max(0, S.momentum.value - 15);
    }

    // Unlock streak quotes
    STOIC_QUOTES.forEach((q, i) => {
      if (q.unlock === 'streak' && S.momentum.streak >= q.req && !S.quotesUnlocked.includes(i)) {
        S.quotesUnlocked.push(i);
      }
    });

    // Reset daily tasks
    S.tasks.forEach(t => t.done = false);
    S.combo.count = 0;
  }
  S.lastDate = today;
  saveState();
}

// ===== WEEKLY CHALLENGES =====
function getWeekStart() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff)).toDateString();
}

function checkWeeklyChallenges() {
  const weekStart = getWeekStart();
  if (S.weeklyChallenges.weekStart !== weekStart) {
    // New week — generate 3 random challenges
    const shuffled = [...CHALLENGE_TEMPLATES].sort(() => Math.random() - 0.5);
    S.weeklyChallenges.challenges = shuffled.slice(0, 3).map(c => ({ ...c, completed: false }));
    S.weeklyChallenges.weekStart = weekStart;
    S.weeklyChallenges.progress = {};
    saveState();
  }
}

function renderWeeklyChallenges() {
  const el = document.getElementById('weeklyChallenges');
  el.innerHTML = '';
  const ch = S.weeklyChallenges.challenges || [];
  ch.forEach((c, i) => {
    const prog = S.weeklyChallenges.progress[c.type] || 0;
    const pct = Math.min(100, Math.round(prog / c.target * 100));
    const done = prog >= c.target;
    if (done && !c.completed) {
      c.completed = true;
      S.challengesCompleted++;
      addXP(c.reward, 'challenge');
      addJourneyEvent('⚡ Challenge Complete', c.name + ' — +' + c.reward + ' XP');
      AudioEngine.play('achievement');
      saveState();
    }
    el.innerHTML += '<div class="challenge-card ' + (done ? 'completed' : '') + '">' +
      '<span class="ch-icon">' + c.icon + '</span>' +
      '<div class="ch-info"><div class="ch-name">' + c.name + '</div><div class="ch-desc">' + c.desc + '</div></div>' +
      '<div><div class="ch-progress">' + pct + '%</div><div class="ch-reward">+' + c.reward + ' XP</div></div></div>';
  });
  // Timer until week reset
  const now = new Date();
  const nextMon = new Date(now);
  nextMon.setDate(now.getDate() + (8 - now.getDay()) % 7);
  nextMon.setHours(0, 0, 0, 0);
  const diff = nextMon - now;
  const days = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  document.getElementById('challengeTimer').textContent = 'Resets in ' + days + 'd ' + hrs + 'h';
}

// ===== MISSION COMPLETION =====
function toggleMission(id) {
  const task = S.tasks.find(t => t.id === id);
  if (!task) return;

  if (!task.done) {
    task.done = true;
    S.totalCompleted++;

    // Time-based achievements
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) S.nightOwl = true;
    if (hour >= 4 && hour < 6) S.earlyBird = true;

    // Track challenge progress
    const p = S.weeklyChallenges.progress || {};
    if (task.cat === 'core') {
      // Check if all core done today
      if (S.tasks.filter(t => t.cat === 'core').every(t => t.done)) {
        p.core_days = (p.core_days || 0) + 1;
      }
    }
    if (task.cat === 'growth') p.growth_count = (p.growth_count || 0) + 1;
    if (task.cat === 'challenge') p.challenge_count = (p.challenge_count || 0) + 1;
    if (hour < 7) p.early_missions = (p.early_missions || 0) + 1;
    if (S.tasks.every(t => t.done)) {
      p.full_sweep = (p.full_sweep || 0) + 1;
    }
    S.weeklyChallenges.progress = p;

    // Stat increase
    const statBonus = hasSkill('sa3') ? 2 : 1;
    S.stats[task.stat] = (S.stats[task.stat] || 5) + statBonus * task.diff * 0.5;
    S.stats[task.stat] = Math.round(S.stats[task.stat] * 10) / 10;

    registerCombo();
    addXP(task.xp * task.diff, 'mission');
    rollLoot();

    // Particle burst at click position
    AudioEngine.play('complete');
    Particles.emit(window.innerWidth / 2, 300, 15, '#C6A75E', 5);

    checkAchievements();
  } else {
    task.done = false;
  }
  saveState();
  renderDashboard();
}

// ===== SKILL TREE =====
function hasSkill(id) { return S.skillTree.includes(id); }

function unlockSkill(id) {
  if (hasSkill(id)) return;
  let node;
  for (const b of SKILL_TREE) {
    node = b.nodes.find(n => n.id === id);
    if (node) break;
  }
  if (!node || S.xp.sp < node.cost) return;
  S.xp.sp -= node.cost;
  S.skillTree.push(id);
  addJourneyEvent('🌳 Skill Unlocked', node.name + ' — ' + node.desc);
  AudioEngine.play('achievement');
  Particles.burst(40);
  saveState();
  renderSkillTree();
  renderDashboard();
  checkAchievements();
}

// ===== JOURNEY EVENTS =====
function addJourneyEvent(title, desc) {
  S.journeyEvents.unshift({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    title, desc
  });
  if (S.journeyEvents.length > 100) S.journeyEvents.pop();
  saveState();
}

// ===== TIMER =====
let timerInterval = null, timerSeconds = 1500, timerRunning = false;
function renderTimer() {
  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  document.getElementById('timerDisplay').textContent =
    String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}
function toggleTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('timerBtn').textContent = 'START';
  } else {
    AudioEngine.init(); // Ensure audio context on user gesture
    timerRunning = true;
    document.getElementById('timerBtn').textContent = 'PAUSE';
    timerInterval = setInterval(() => {
      timerSeconds--;
      renderTimer();
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        timerSeconds = 1500;
        document.getElementById('timerBtn').textContent = 'START';
        S.focusSessions++;
        // Challenge tracking
        if (S.weeklyChallenges.progress) {
          S.weeklyChallenges.progress.focus_sessions = (S.weeklyChallenges.progress.focus_sessions || 0) + 1;
        }
        addXP(hasSkill('mc2') ? 25 : 15, 'focus');
        addJourneyEvent('⏱️ Focus Complete', 'Completed a focus session');
        Particles.burst(50);
        renderTimer();
        checkAchievements();
      }
    }, 1000);
  }
}
function adjustTimer(min) {
  if (!timerRunning) {
    timerSeconds = Math.max(60, timerSeconds + min * 60);
    renderTimer();
  }
}

// ===== STAT CHARTS =====
function renderStatCharts() {
  const grid = document.getElementById('statChartsGrid');
  grid.innerHTML = '';
  const statNames = Object.keys(S.stats);
  const histDates = Object.keys(S.statHistory).sort().slice(-7);

  statNames.forEach(stat => {
    const card = document.createElement('div');
    card.className = 'stat-chart-card';
    const canvas = document.createElement('canvas');
    canvas.width = 200; canvas.height = 60;
    card.appendChild(canvas);
    const label = document.createElement('div');
    label.className = 'stat-chart-label';
    label.textContent = stat.toUpperCase();
    card.appendChild(label);
    grid.appendChild(card);

    // Draw mini chart
    const ctx = canvas.getContext('2d');
    const values = histDates.map(d => (S.statHistory[d] && S.statHistory[d][stat]) || 5);
    values.push(S.stats[stat]); // Current
    if (values.length < 2) return;

    const max = Math.max(...values, 10);
    const min = Math.min(...values, 0);
    const range = max - min || 1;
    const w = canvas.width;
    const h = canvas.height;
    const step = w / (values.length - 1);

    ctx.strokeStyle = '#C6A75E';
    ctx.lineWidth = 2;
    ctx.beginPath();
    values.forEach((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * (h - 10) - 5;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Fill under
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = 'rgba(198, 167, 94, 0.08)';
    ctx.fill();
  });
}

// ===== RENDER FUNCTIONS =====
function renderDashboard() {
  // Identity
  document.getElementById('identityTitle').textContent = S.identity.title;
  document.getElementById('identityManifesto').textContent = S.identity.manifesto;

  // Rank & Avatar
  const rank = getRank(S.xp.level);
  const nextRank = getNextRank(S.xp.level);
  document.getElementById('avatarSymbol').textContent = rank.symbol;
  document.getElementById('avatarRankBadge').textContent = rank.name;
  document.getElementById('currentRankLabel').textContent = rank.name;
  document.getElementById('nextRankLabel').textContent = nextRank ? nextRank.name : 'MAX';
  document.getElementById('rankBarFill').style.width = (getRankProgress(S.xp.level) * 100) + '%';

  // Alignment
  const totalT = S.tasks.length || 1;
  const doneT = S.tasks.filter(t => t.done).length;
  const align = Math.round(doneT / totalT * 100);
  document.getElementById('alignPercent').textContent = align + '%';
  const offset = 326.7 - (326.7 * align / 100);
  document.getElementById('alignRingFill').style.strokeDashoffset = offset;
  const hdr = document.getElementById('identityHeader');
  hdr.style.boxShadow = align > 80 ? '0 0 30px rgba(198,167,94,0.1)' : align < 40 ? '0 0 30px rgba(122,28,28,0.2)' : 'none';

  // XP
  document.getElementById('levelNum').textContent = S.xp.level;
  const needed = xpForLevel(S.xp.level);
  document.getElementById('xpText').textContent = S.xp.current + ' / ' + needed + ' XP';
  document.getElementById('xpFill').style.width = (S.xp.current / needed * 100) + '%';
  document.getElementById('totalXPDisplay').textContent = S.xp.total.toLocaleString();
  document.getElementById('spDisplay').textContent = S.xp.sp;
  document.getElementById('loginStreakDisplay').textContent = S.loginStreak.count;

  // Attributes
  const grid = document.getElementById('attributesGrid');
  grid.innerHTML = '';
  for (const [key, val] of Object.entries(S.stats)) {
    const maxV = Math.max(val, 50);
    grid.innerHTML += '<div class="attr-card"><div class="attr-name">' + key.toUpperCase() +
      '</div><div class="attr-value">' + Math.floor(val) + '</div><div class="attr-bar"><div class="attr-bar-fill" style="width:' +
      (val / maxV * 100) + '%"></div></div></div>';
  }

  // Momentum
  document.getElementById('streakNum').textContent = S.momentum.streak;
  document.getElementById('momentumFill').style.width = S.momentum.value + '%';
  document.getElementById('momentumVal').textContent = S.momentum.value + ' / 100';
  document.getElementById('momentumMult').textContent = '×' + getMomentumMult().toFixed(2);

  // Brightness based on momentum
  document.body.style.filter = 'brightness(' + (0.85 + S.momentum.value * 0.0015) + ')';

  // Missions
  renderMissions('core', 'coreMissions');
  renderMissions('growth', 'growthMissions');
  renderMissions('challenge', 'challengeMissions');

  renderWeeklyChallenges();
  renderStatCharts();
  renderTimer();
}

function renderMissions(cat, elId) {
  const el = document.getElementById(elId);
  el.innerHTML = '';
  S.tasks.filter(t => t.cat === cat).forEach(t => {
    const xpDisplay = Math.floor(t.xp * t.diff * getMomentumMult() * getComboBonus());
    el.innerHTML += '<div class="mission-item ' + (t.done ? 'done' : '') + '" onclick="toggleMission(\'' + t.id + '\')">' +
      '<div class="mission-check">' + (t.done ? '✓' : '') + '</div>' +
      '<div class="mission-info"><div class="mission-name">' + t.name + '</div>' +
      '<div class="mission-meta"><span class="mission-tag diff-' + t.diff + '">' +
      ['', 'EASY', 'MED', 'HARD'][t.diff] + '</span><span class="mission-tag">' + t.stat.toUpperCase() + '</span></div></div>' +
      '<span class="mission-xp">+' + xpDisplay + ' XP</span></div>';
  });
}

function renderSkillTree() {
  const grid = document.getElementById('skillTreeGrid');
  grid.innerHTML = '';
  document.getElementById('spTree').textContent = S.xp.sp;
  SKILL_TREE.forEach(branch => {
    let html = '<div class="skill-branch"><div class="skill-branch-title">' + branch.icon + ' ' + branch.branch.toUpperCase() + '</div><div class="skill-nodes">';
    branch.nodes.forEach(node => {
      const unlocked = hasSkill(node.id);
      const canBuy = !unlocked && S.xp.sp >= node.cost;
      html += '<div class="skill-node ' + (unlocked ? 'unlocked' : canBuy ? '' : 'locked') + '" onclick="unlockSkill(\'' + node.id + '\')">' +
        '<div class="sn-icon">' + node.icon + '</div><div class="sn-name">' + node.name + '</div>' +
        '<div class="sn-cost">' + (unlocked ? '✓ UNLOCKED' : node.cost + ' SP') + '</div></div>';
    });
    html += '</div></div>';
    grid.innerHTML += html;
  });
}

function renderAchievements() {
  const grid = document.getElementById('achievementGrid');
  grid.innerHTML = '';
  document.getElementById('achUnlocked').textContent = S.achievements.length;
  document.getElementById('achTotal').textContent = ACHIEVEMENTS.length;
  const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
  const rarest = S.achievements.map(id => ACHIEVEMENTS.find(a => a.id === id)).filter(Boolean)
    .sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);
  document.getElementById('achRarest').textContent = rarest.length ? rarest[0].icon + ' ' + rarest[0].name : '—';

  const filter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
  ACHIEVEMENTS.forEach(ach => {
    if (filter !== 'all' && ach.rarity !== filter) return;
    const unlocked = S.achievements.includes(ach.id);
    grid.innerHTML += '<div class="ach-card ' + (unlocked ? 'unlocked' : 'locked') + '">' +
      '<span class="ach-rarity-tag ' + ach.rarity + '">' + ach.rarity.toUpperCase() + '</span>' +
      '<div class="ach-icon">' + (unlocked ? ach.icon : '🔒') + '</div>' +
      '<div class="ach-title">' + (unlocked ? ach.name : '???') + '</div>' +
      '<div class="ach-desc">' + (unlocked ? ach.desc : 'Keep pushing...') + '</div></div>';
  });
}

function renderQuoteVault() {
  const vault = document.getElementById('quoteVault');
  vault.innerHTML = '';
  STOIC_QUOTES.forEach((q, i) => {
    const unlocked = S.quotesUnlocked.includes(i);
    vault.innerHTML += '<div class="quote-card ' + (unlocked ? '' : 'locked') + '">' +
      '<span class="quote-unlock">' + (unlocked ? '✓ UNLOCKED' : q.unlock.toUpperCase() + ' ' + q.req) + '</span>' +
      '<div class="quote-text">"' + q.text + '"</div>' +
      '<div class="quote-author">— ' + q.author + '</div></div>';
  });
}

function renderJourney() {
  const el = document.getElementById('journeyTimeline');
  el.innerHTML = '';
  (S.journeyEvents || []).forEach(ev => {
    el.innerHTML += '<div class="journey-event"><div class="je-date">' + ev.date + ' • ' + (ev.time || '') + '</div>' +
      '<div class="je-title">' + ev.title + '</div><div class="je-desc">' + ev.desc + '</div></div>';
  });
  if (!S.journeyEvents.length) {
    el.innerHTML = '<div class="journey-event"><div class="je-title">Begin your journey</div><div class="je-desc">Complete missions to carve your path.</div></div>';
  }
}

function renderReview() {
  const hm = document.getElementById('heatmap');
  hm.innerHTML = '';
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const last7 = S.history.slice(-7);
  for (let i = 0; i < 7; i++) {
    const d = last7[i];
    let level = 0;
    if (d) {
      const pct = d.alignment;
      level = pct > 90 ? 4 : pct > 70 ? 3 : pct > 40 ? 2 : pct > 0 ? 1 : 0;
    }
    hm.innerHTML += '<div><div class="heat-cell h' + level + '"></div><div class="heat-label">' + days[i] + '</div></div>';
  }

  const rs = document.getElementById('reviewStats');
  rs.innerHTML = '';
  for (const [k, v] of Object.entries(S.stats)) {
    rs.innerHTML += '<p>' + k.charAt(0).toUpperCase() + k.slice(1) + '<span>' + Math.floor(v) + '</span></p>';
  }

  if (last7.length) {
    const avg = Math.round(last7.reduce((s, d) => s + d.alignment, 0) / last7.length);
    document.getElementById('avgAlign').textContent = avg + '%';
    const missed = last7.filter(d => !d.coreComplete).length;
    document.getElementById('missedCore').textContent = missed;
  }
}

function renderSettings() {
  document.getElementById('setTitle').value = S.identity.title;
  document.getElementById('setManifesto').value = S.identity.manifesto;
  document.getElementById('audioToggle').checked = S.audioEnabled !== false;

  const mgr = document.getElementById('missionManager');
  mgr.innerHTML = '';
  S.tasks.forEach(t => {
    mgr.innerHTML += '<div class="mission-mgr-item"><span class="mm-name">' + t.name + '</span>' +
      '<span class="mm-cat">' + t.cat.toUpperCase() + '</span>' +
      '<button class="mission-delete" onclick="deleteMission(\'' + t.id + '\')">✕</button></div>';
  });
}

// ===== ACTIONS =====
function openAddMission() { document.getElementById('addMissionModal').classList.remove('hidden'); }
function closeAddMission() { document.getElementById('addMissionModal').classList.add('hidden'); }
function saveMission() {
  const name = document.getElementById('mName').value.trim();
  if (!name) return;
  S.tasks.push({
    id: 't' + Date.now(),
    name,
    cat: document.getElementById('mCat').value,
    diff: parseInt(document.getElementById('mDiff').value),
    stat: document.getElementById('mStat').value,
    xp: parseInt(document.getElementById('mXP').value) || 15,
    done: false
  });
  document.getElementById('mName').value = '';
  closeAddMission();
  saveState();
  renderDashboard();
}
function deleteMission(id) {
  S.tasks = S.tasks.filter(t => t.id !== id);
  saveState();
  renderSettings();
  renderDashboard();
}
function saveIdentity() {
  S.identity.title = document.getElementById('setTitle').value || S.identity.title;
  S.identity.manifesto = document.getElementById('setManifesto').value || S.identity.manifesto;
  saveState();
  renderDashboard();
}
function saveJournal() {
  const entry = document.getElementById('journalEntry').value;
  S.journal[new Date().toDateString()] = entry;
  saveState();
  addJourneyEvent('📝 Journal Entry', 'Wrote a reflection');
}
function toggleAudio() {
  S.audioEnabled = document.getElementById('audioToggle').checked;
  AudioEngine.enabled = S.audioEnabled;
  saveState();
}
function resetAll() {
  if (confirm('This will delete ALL progress permanently. Are you sure?')) {
    if (confirm('REALLY sure? This cannot be undone.')) {
      localStorage.removeItem('evolve_v2');
      location.reload();
    }
  }
}

// ===== NAVIGATION =====
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + btn.dataset.page).classList.add('active');

    // Render page content
    const page = btn.dataset.page;
    if (page === 'skilltree') renderSkillTree();
    if (page === 'achievements') renderAchievements();
    if (page === 'quotes') renderQuoteVault();
    if (page === 'journey') renderJourney();
    if (page === 'review') renderReview();
    if (page === 'settings') renderSettings();
  });
});

// Achievement filters
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderAchievements();
  });
});

// ===== INIT =====
function init() {
  loadState();
  AudioEngine.enabled = S.audioEnabled !== false;
  Particles.init();
  checkDayReset();
  checkWeeklyChallenges();
  renderDashboard();
  // Login bonus after first render
  setTimeout(() => {
    AudioEngine.init();
    checkDailyLogin();
  }, 500);
}

init();
