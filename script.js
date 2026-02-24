// =============================================
// EVOLVE v4 — Dark Stoic Warrior Monk Engine
// 25 New Features + Bug Fixes
// =============================================

// === CONSTANTS ===
const RANKS = ['INITIATE','ACOLYTE','DISCIPLE','WARRIOR','SENTINEL','CHAMPION','WARLORD','SAGE','TITAN','ASCENDED ONE'];
const RANK_SYMBOLS = ['🔰','⚔️','🛡️','🗡️','🏛️','👑','🐉','🧘','⚡','✨'];
const PET_FORMS = [{name:'Wolf Pup',icon:'🐺',lvl:1},{name:'Shadow Wolf',icon:'🐾',lvl:5},{name:'Spirit Wolf',icon:'🦊',lvl:10},{name:'Dire Wolf',icon:'🐺',lvl:15},{name:'Celestial Beast',icon:'🦁',lvl:20}];
const AVATARS = ['⚔️','🗡️','🛡️','🏛️','👑','🐉','🧘','⚡','🔥','💀','🦅','🐺','🏹','⭐','💎','🌙'];
const VIRTUES = ['Courage','Wisdom','Justice','Temperance'];
const STAT_NAMES = ['STR','INT','WIS','CHA','END'];
const DIFF_XP = [0,10,20,35,50];
const THEMES = ['gold','crimson','emerald','ice','violet','phoenix','arctic','blood'];

const ACHIEVEMENTS = [
  {id:'first_mission',name:'First Blood',desc:'Complete your first mission',rarity:'common'},
  {id:'streak_3',name:'Consistent',desc:'3-day streak',rarity:'common'},
  {id:'streak_7',name:'Iron Will',desc:'7-day streak',rarity:'rare'},
  {id:'streak_14',name:'Unbreakable',desc:'14-day streak',rarity:'epic'},
  {id:'streak_30',name:'Legendary Discipline',desc:'30-day streak',rarity:'legendary'},
  {id:'level_5',name:'Rising Warrior',desc:'Reach Level 5',rarity:'common'},
  {id:'level_10',name:'Proven Fighter',desc:'Reach Level 10',rarity:'rare'},
  {id:'level_15',name:'Battle Hardened',desc:'Reach Level 15',rarity:'epic'},
  {id:'level_20',name:'Ascended',desc:'Reach Level 20',rarity:'legendary'},
  {id:'boss_1',name:'Dragon Slayer',desc:'Defeat your first boss',rarity:'rare'},
  {id:'boss_5',name:'Boss Hunter',desc:'Defeat 5 bosses',rarity:'epic'},
  {id:'boss_10',name:'Warlord',desc:'Defeat 10 bosses',rarity:'legendary'},
  {id:'loot_10',name:'Lucky Finder',desc:'Get 10 loot drops',rarity:'common'},
  {id:'loot_50',name:'Treasure Hoarder',desc:'Get 50 loot drops',rarity:'rare'},
  {id:'combo_5',name:'Combo King',desc:'Reach 5x combo',rarity:'rare'},
  {id:'combo_10',name:'Unstoppable',desc:'Reach 10x combo',rarity:'epic'},
  {id:'mastery_gold',name:'Gold Standard',desc:'Gold mastery on any mission',rarity:'rare'},
  {id:'mastery_diamond',name:'Diamond Hands',desc:'Diamond mastery on any mission',rarity:'legendary'},
  {id:'missions_50',name:'Half Century',desc:'Complete 50 total missions',rarity:'rare'},
  {id:'missions_100',name:'Centurion',desc:'Complete 100 total missions',rarity:'epic'},
  {id:'missions_500',name:'Eternal Warrior',desc:'Complete 500 total missions',rarity:'legendary'},
  {id:'prestige_1',name:'Reborn',desc:'Prestige for the first time',rarity:'epic'},
  {id:'xp_1000',name:'Thousand Club',desc:'Earn 1000 total XP',rarity:'common'},
  {id:'xp_5000',name:'XP Machine',desc:'Earn 5000 total XP',rarity:'rare'},
  {id:'xp_10000',name:'Transcendent',desc:'Earn 10000 total XP',rarity:'epic'},
  {id:'focus_10',name:'Focused Mind',desc:'Complete 10 focus sessions',rarity:'common'},
  {id:'focus_50',name:'Zen Master',desc:'Complete 50 focus sessions',rarity:'rare'},
  {id:'breathing_10',name:'Inner Peace',desc:'Complete 10 breathing sessions',rarity:'common'},
  {id:'arena_win',name:'Arena Champion',desc:'Win a challenge arena',rarity:'rare'},
  {id:'arena_5',name:'Gladiator',desc:'Win 5 arena challenges',rarity:'epic'},
  {id:'memory_win',name:'Sharp Mind',desc:'Win a memory trial',rarity:'common'},
  {id:'memory_5',name:'Photographic Memory',desc:'Win 5 memory trials',rarity:'rare'},
  {id:'all_virtues_10',name:'Virtuous',desc:'All virtues above 10',rarity:'rare'},
  {id:'all_virtues_25',name:'Paragon',desc:'All virtues above 25',rarity:'epic'},
  {id:'wisdom_7',name:'Philosopher',desc:'Complete 7 wisdom challenges',rarity:'rare'},
  {id:'gold_500',name:'Rich Warrior',desc:'Accumulate 500 gold',rarity:'rare'},
  {id:'gold_1000',name:'Golden Emperor',desc:'Accumulate 1000 gold',rarity:'epic'},
  {id:'pet_max',name:'Beast Master',desc:'Max out your spirit pet',rarity:'legendary'},
  {id:'daily_quest_7',name:'Quest Hunter',desc:'Complete daily quests 7 days in a row',rarity:'rare'},
  {id:'emotion_7',name:'Self Aware',desc:'Track emotions for 7 days',rarity:'common'},
];

const TITLES = [
  {id:'initiate',name:'The Initiate',req:'Start your journey',auto:true},
  {id:'iron_will',name:'Iron Will',req:'7-day streak'},
  {id:'shadow_monk',name:'Shadow Monk',req:'Level 10'},
  {id:'dragon_slayer',name:'Dragon Slayer',req:'Defeat 3 bosses'},
  {id:'philosopher',name:'The Philosopher',req:'5 wisdom challenges'},
  {id:'berserker',name:'The Berserker',req:'10x combo'},
  {id:'ascetic',name:'The Ascetic',req:'20 breathing sessions'},
  {id:'strategist',name:'The Strategist',req:'All virtues above 10'},
  {id:'legend',name:'The Legend',req:'Level 20'},
  {id:'prestige',name:'The Reborn',req:'Prestige once'},
  {id:'perfectionist',name:'The Perfectionist',req:'A+ discipline for 7 days'},
  {id:'gold_king',name:'Gold King',req:'500 gold'},
  {id:'beast_lord',name:'Beast Lord',req:'Max pet level'},
  {id:'arena_king',name:'Arena King',req:'5 arena wins'},
  {id:'zen',name:'Zen Master',req:'50 focus sessions'},
  {id:'diamond',name:'Diamond Soul',req:'Diamond mastery any mission'},
  {id:'collector',name:'The Collector',req:'20 achievements'},
  {id:'unstoppable',name:'Unstoppable',req:'30-day streak'},
  {id:'eternal',name:'Eternal Warrior',req:'500 missions'},
  {id:'transcended',name:'Transcended',req:'10000 total XP'},
];

const STOIC_QUOTES = [
  {text:"The impediment to action advances action. What stands in the way becomes the way.",author:"Marcus Aurelius",req:{level:2}},
  {text:"We suffer more in imagination than in reality.",author:"Seneca",req:{level:3}},
  {text:"No man is free who is not master of himself.",author:"Epictetus",req:{level:4}},
  {text:"The best revenge is not to be like your enemy.",author:"Marcus Aurelius",req:{level:5}},
  {text:"Waste no more time arguing about what a good man should be. Be one.",author:"Marcus Aurelius",req:{streak:3}},
  {text:"He who fears death will never do anything worthy of a man who is alive.",author:"Seneca",req:{level:7}},
  {text:"First say to yourself what you would be; then do what you have to do.",author:"Epictetus",req:{streak:7}},
  {text:"The soul becomes dyed with the color of its thoughts.",author:"Marcus Aurelius",req:{level:10}},
  {text:"Difficulties strengthen the mind, as labor does the body.",author:"Seneca",req:{streak:10}},
  {text:"Man is not worried by real problems so much as by his imagined anxieties about real problems.",author:"Epictetus",req:{level:12}},
  {text:"You have power over your mind — not outside events. Realize this, and you will find strength.",author:"Marcus Aurelius",req:{level:14}},
  {text:"It is not that we have a short time to live, but that we waste a great deal of it.",author:"Seneca",req:{streak:14}},
  {text:"Wealth consists not in having great possessions, but in having few wants.",author:"Epictetus",req:{level:16}},
  {text:"The happiness of your life depends upon the quality of your thoughts.",author:"Marcus Aurelius",req:{level:18}},
  {text:"We are more often frightened than hurt; and we suffer more from imagination than from reality.",author:"Seneca",req:{level:20}},
  {text:"If it is not right do not do it; if it is not true do not say it.",author:"Marcus Aurelius",req:{streak:20}},
  {text:"He who laughs at himself never runs out of things to laugh at.",author:"Epictetus",req:{streak:25}},
  {text:"The whole future lies in uncertainty: live immediately.",author:"Seneca",req:{streak:30}},
  {text:"Accept the things to which fate binds you, and love the people with whom fate brings you together.",author:"Marcus Aurelius",req:{level:25}},
  {text:"Only the educated are free.",author:"Epictetus",req:{level:30}},
];

const AFFIRMATIONS = [
  "Today I choose discipline over comfort. My future self will thank me.",
  "I am the architect of my fate. Every rep, every page, every breath counts.",
  "Comfort is the enemy of growth. I embrace the struggle.",
  "The obstacle is not in my way — it IS the way.",
  "I do not rise to the level of my goals. I fall to the level of my systems.",
  "Pain is temporary. The pride of discipline is forever.",
  "I am not what happened to me. I am what I choose to become.",
  "Every day I get 1% better. That compounds into greatness.",
  "The warrior does not give up what he wants most for what he wants now.",
  "Silence the mind. Sharpen the body. Trust the process.",
  "I am building something nobody can take from me.",
  "The only competition is who I was yesterday.",
  "Fall seven times, stand up eight.",
  "My discipline is my freedom.",
];

const WISDOM_PROMPTS = [
  "What is one thing you avoided today that you know you should face?",
  "What would the strongest version of yourself do right now?",
  "What fear are you letting control your actions?",
  "Describe a moment today where you chose comfort over growth.",
  "What habit, if done daily for a year, would transform your life?",
  "What are you grateful for that you usually take for granted?",
  "If today was your last, what would you regret not doing?",
  "What negative thought pattern do you need to break?",
  "Who do you admire and what quality of theirs can you develop?",
  "What boundary do you need to set or enforce?",
  "What is the most important lesson you learned this week?",
  "Where are you making excuses instead of making progress?",
  "What would you attempt if you knew you could not fail?",
  "What small win today can you build momentum from?",
];

const BOSS_NAMES = ['Shadow Wraith','Iron Golem','Mind Flayer','Chaos Serpent','Void Walker','Storm Titan','Blood Knight','Frost Lich','Doom Herald','Abyssal Dragon'];
const BOSS_ICONS = ['👹','🗿','🧠','🐍','👁️','⛈️','🩸','❄️','💀','🐉'];

const RANDOM_EVENTS = [
  {text:'A wandering sage appears! +50 bonus XP!',type:'xp',value:50},
  {text:'You found a hidden treasure chest! +30 gold!',type:'gold',value:30},
  {text:'The stars align! Double XP for 10 minutes!',type:'buff',value:'double_xp'},
  {text:'A mysterious potion appears in your inventory!',type:'item',value:'xp_potion'},
  {text:'Your spirit pet found a gem! +20 XP!',type:'xp',value:20},
  {text:'A storm approaches... Boss takes 50 extra damage!',type:'boss_dmg',value:50},
  {text:'You feel a surge of energy! +30 Spirit Energy!',type:'energy',value:30},
  {text:'A merchant drops a streak shield!',type:'item',value:'streak_shield'},
];

const SHOP_ITEMS = [
  {id:'xp_potion',name:'XP Potion',desc:'2x XP next mission',price:50,icon:'🧪'},
  {id:'streak_shield',name:'Streak Shield',desc:'Protect streak once',price:80,icon:'🛡️'},
  {id:'boss_bomb',name:'Boss Bomb',desc:'Deal 100 boss damage',price:100,icon:'💣'},
  {id:'energy_refill',name:'Energy Refill',desc:'+50 Spirit Energy',price:40,icon:'⚡'},
  {id:'loot_charm',name:'Loot Charm',desc:'Next 3 missions guaranteed loot',price:120,icon:'🍀'},
  {id:'title_scroll',name:'Mystery Title',desc:'Unlock a random title',price:200,icon:'📜'},
];

const DAILY_QUEST_POOL = [
  {name:'Complete 3 missions',type:'missions',target:3,xp:40},
  {name:'Complete 5 missions',type:'missions',target:5,xp:70},
  {name:'Reach 3x combo',type:'combo',target:3,xp:50},
  {name:'Do a focus session',type:'focus',target:1,xp:30},
  {name:'Do breathing exercise',type:'breathing',target:1,xp:25},
  {name:'Complete a wisdom challenge',type:'wisdom',target:1,xp:35},
  {name:'Earn 100 XP today',type:'xp_today',target:100,xp:45},
  {name:'Complete a Physical mission',type:'cat_physical',target:1,xp:25},
  {name:'Complete a Mental mission',type:'cat_mental',target:1,xp:25},
  {name:'Complete a Stoic mission',type:'cat_stoic',target:1,xp:25},
  {name:'Deal damage to boss',type:'boss_dmg',target:1,xp:30},
  {name:'Use a power-up',type:'use_item',target:1,xp:20},
  {name:'Win a Memory Trial',type:'memory_win',target:1,xp:40},
];

// === STATE ===
let S = {};
let modalQueue = [];
let showingModal = false;
let comboTimer = null;
let breathInterval = null;
let focusTimerInterval = null;
let focusRunning = false;
let arenaInterval = null;
let arenaActive = false;
let miniGameSequence = [];
let miniGamePlayerSeq = [];
let miniGameRound = 0;
let miniGamePlaying = false;
let doubleXPUntil = 0;
let lootCharmCount = 0;
let xpEarnedToday = 0;

function todayStr() { return new Date().toISOString().split('T')[0]; }
function xpForLevel(l) { return 80 + (l - 1) * 30; }

function getDefaultState() {
  return {
    name:'WARRIOR MONK', manifesto:'Discipline is freedom.',
    avatar:'⚔️', warCry:'FOR GLORY!', theme:'gold',
    level:1, xp:0, totalXP:0, skillPoints:0,
    stats:{STR:1,INT:1,WIS:1,CHA:1,END:1},
    virtues:{Courage:0,Wisdom:0,Justice:0,Temperance:0},
    missions:[
      {id:1,name:'Cold Shower',cat:'physical',diff:2,done:false,mastery:0},
      {id:2,name:'Read 20 Pages',cat:'mental',diff:2,done:false,mastery:0},
      {id:3,name:'Meditate 10 min',cat:'stoic',diff:1,done:false,mastery:0},
      {id:4,name:'Journal Entry',cat:'strategic',diff:1,done:false,mastery:0},
      {id:5,name:'No Complaints',cat:'social',diff:3,done:false,mastery:0},
      {id:6,name:'Workout',cat:'physical',diff:3,done:false,mastery:0},
    ],
    skills:{}, unlockedAchievements:[], pinnedAchievements:[],
    streak:0, longestStreak:0, lastActiveDate:null,
    boss:null, bossesDefeated:0,
    inventory:[], gold:0, totalGold:0,
    combo:0, maxCombo:0, lastMissionTime:0,
    loginStreak:0, lastLoginDate:null, loginBonusClaimed:false,
    history:[], timeline:[], battleLog:[],
    journal:{}, wisdomDone:{}, wisdomCount:0,
    weekChallenges:[], weekChallengesDate:null,
    statHistory:{}, emotionLog:{},
    unlockedTitles:['initiate'], activeTitle:'initiate',
    focusSessions:0, breathSessions:0,
    arenaWins:0, memoryWins:0,
    prestigeCount:0, totalMissions:0, totalLoot:0,
    energy:100, lastEnergyDate:null,
    dailyQuests:[], dailyQuestsDate:null, dailyQuestStreak:0,
    dailyQuestProgress:{},
    soundOn:true, nightDim:false,
    bestDayXP:0, bestDayDate:null,
    personalRecords:{},
    shopPurchases:0,
    nextMissionId:7,
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem('evolve_v4');
    if (raw) {
      S = JSON.parse(raw);
      // Migrate missing fields
      const def = getDefaultState();
      for (let k in def) { if (S[k] === undefined) S[k] = def[k]; }
      for (let m of S.missions) { if (m.mastery === undefined) m.mastery = 0; }
    } else { S = getDefaultState(); }
  } catch(e) { S = getDefaultState(); }
}

function saveState() { localStorage.setItem('evolve_v4', JSON.stringify(S)); }

function checkNewDay() {
  const today = todayStr();
  if (S.lastActiveDate && S.lastActiveDate !== today) {
    // Save yesterday
    const yData = { date:S.lastActiveDate, missions:S.missions.filter(m=>m.done).length, total:S.missions.length };
    S.history.push(yData);
    if (S.history.length > 30) S.history.shift();
    // Save stat snapshot
    S.statHistory[S.lastActiveDate] = {...S.stats};
    // Check streak
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
    const yStr = yesterday.toISOString().split('T')[0];
    if (S.lastActiveDate === yStr) {
      // consecutive day
    } else {
      // Missed days — check streak shield
      if (S.inventory.includes('streak_shield')) {
        S.inventory.splice(S.inventory.indexOf('streak_shield'), 1);
        addBattleLog('🛡️ Streak Shield activated! Streak preserved.', 'event');
      } else {
        // XP Decay: lose XP if inactive 3+ days
        const daysMissed = Math.floor((new Date(today) - new Date(S.lastActiveDate)) / 86400000);
        if (daysMissed >= 3) {
          const decay = Math.min(S.xp, daysMissed * 10);
          S.xp -= decay;
          if (decay > 0) addBattleLog('📉 XP Decay: -' + decay + ' XP for ' + daysMissed + ' days inactive', 'event');
        }
        S.streak = 0;
      }
    }
    // Reset missions
    S.missions.forEach(m => m.done = false);
    S.loginBonusClaimed = false;
    xpEarnedToday = 0;
  }
  if (!S.lastActiveDate) S.lastActiveDate = today;
  // Energy refill
  if (S.lastEnergyDate !== today) {
    S.energy = 100;
    S.lastEnergyDate = today;
  }
  // Daily quests
  if (S.dailyQuestsDate !== today) {
    // Check if yesterday's quests were all complete
    if (S.dailyQuests.length > 0 && S.dailyQuests.every(q => q.completed)) {
      S.dailyQuestStreak++;
    } else if (S.dailyQuestsDate) {
      S.dailyQuestStreak = 0;
    }
    generateDailyQuests();
    S.dailyQuestsDate = today;
    S.dailyQuestProgress = {};
  }
  S.lastActiveDate = today;
  saveState();
}

function generateDailyQuests() {
  const pool = [...DAILY_QUEST_POOL];
  const quests = [];
  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    quests.push({...pool[idx], completed: false});
    pool.splice(idx, 1);
  }
  S.dailyQuests = quests;
}

function checkLoginBonus() {
  const today = todayStr();
  if (S.lastLoginDate !== today) {
    S.loginStreak++;
    S.lastLoginDate = today;
    S.loginBonusClaimed = false;
    saveState();
  }
}

function claimLoginBonus() {
  if (S.loginBonusClaimed) return;
  const bonus = Math.min(15 + (S.loginStreak - 1) * 5, 100);
  S.loginBonusClaimed = true;
  addXP(bonus, true);
  addBattleLog('⚡ Login bonus: +' + bonus + ' XP (Day ' + S.loginStreak + ')', 'xp');
  showToast('⚡ Login Streak Day ' + S.loginStreak + ': +' + bonus + ' XP!');
  saveState();
  renderAll();
}

// === MODAL QUEUE SYSTEM ===
function queueModal(fn) {
  modalQueue.push(fn);
  if (!showingModal) processModalQueue();
}
function processModalQueue() {
  if (modalQueue.length === 0) { showingModal = false; return; }
  showingModal = true;
  const fn = modalQueue.shift();
  fn();
}
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  showingModal = false;
  setTimeout(processModalQueue, 200);
}

function closeLevelUp() { closeModal('levelUpModal'); }
function closeLoot() { closeModal('lootModal'); }
function closeAchievementModal() { closeModal('achievementModal'); }
function closeBossDefeated() { closeModal('bossDefeatedModal'); }
function closeMilestone() { closeModal('milestoneModal'); }
function closePrestige() { closeModal('prestigeModal'); }
function closeRandomEvent() { closeModal('randomEventModal'); }
function closeDailyReport() { closeModal('dailyReportModal'); }
function closeMiniGame() { miniGamePlaying = false; closeModal('miniGameModal'); }
function closeArena() { arenaActive = false; if(arenaInterval) clearInterval(arenaInterval); closeModal('arenaModal'); }
function closeShop() { closeModal('shopModal'); }
function closeAvatarPicker() { closeModal('avatarPicker'); }
function closeAddMission() { closeModal('addMissionModal'); }
function closeExportImport() { closeModal('exportImportModal'); }
function closeWisdom() { closeModal('wisdomModal'); }

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.style.display = 'block';
  setTimeout(() => t.style.display = 'none', 3000);
}

// === SOUND ===
function playSound(type) {
  if (!S.soundOn) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    gain.gain.value = 0.1;
    const sounds = {
      complete:[440,0.15,'sine'], levelup:[660,0.3,'square'], loot:[520,0.2,'triangle'],
      achievement:[880,0.3,'sine'], combo:[550,0.1,'sawtooth'], boss:[220,0.4,'square'],
      event:[600,0.2,'triangle']
    };
    const s = sounds[type] || sounds.complete;
    osc.frequency.value = s[0]; osc.type = s[2];
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + s[1]);
    osc.start(); osc.stop(ctx.currentTime + s[1]);
  } catch(e) {}
}

function toggleSound() {
  S.soundOn = !S.soundOn;
  document.getElementById('soundBtn').textContent = S.soundOn ? '🔊' : '🔇';
  saveState();
}

// === PARTICLES ===
let particles = [];
const canvas = document.getElementById('particles');
const ctx2d = canvas.getContext('2d');
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resizeCanvas); resizeCanvas();

function spawnParticles(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x, y, vx:(Math.random()-0.5)*6, vy:(Math.random()-0.5)*6 - 2,
      life:60+Math.random()*40, maxLife:100, color, size:2+Math.random()*3
    });
  }
}
function animateParticles() {
  ctx2d.clearRect(0,0,canvas.width,canvas.height);
  particles = particles.filter(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life--;
    ctx2d.globalAlpha = p.life / p.maxLife;
    ctx2d.fillStyle = p.color;
    ctx2d.fillRect(p.x, p.y, p.size, p.size);
    return p.life > 0;
  });
  ctx2d.globalAlpha = 1;
  requestAnimationFrame(animateParticles);
}
animateParticles();

// === BATTLE LOG ===
function addBattleLog(msg, type) {
  const time = new Date().toLocaleTimeString();
  S.battleLog.unshift({msg, type: type||'xp', time});
  if (S.battleLog.length > 200) S.battleLog.pop();
}

// === XP SYSTEM ===
function addXP(amount, skipCombo) {
  let mult = 1;
  // Prestige bonus
  mult += S.prestigeCount * 0.05;
  // Time bonus
  const tb = getTimeBonus();
  mult *= tb.mult;
  // Combo
  if (!skipCombo && S.combo > 1) mult *= (1 + S.combo * 0.1);
  // Double XP buff
  if (Date.now() < doubleXPUntil) mult *= 2;
  // XP Potion from inventory
  if (S.inventory.includes('xp_potion') && !skipCombo) {
    S.inventory.splice(S.inventory.indexOf('xp_potion'), 1);
    mult *= 2;
    showToast('🧪 XP Potion consumed! 2x XP!');
    addBattleLog('🧪 XP Potion used — 2x multiplier!', 'loot');
  }
  // Difficulty scaling bonus
  const scalingBonus = 1 + (S.level - 1) * 0.02;
  mult *= scalingBonus;

  const final = Math.round(amount * mult);
  S.xp += final;
  S.totalXP += final;
  xpEarnedToday += final;

  // Track daily quest progress
  updateQuestProgress('xp_today', xpEarnedToday);

  // Update personal records
  if (xpEarnedToday > (S.bestDayXP || 0)) {
    S.bestDayXP = xpEarnedToday;
    S.bestDayDate = todayStr();
  }

  // Check level up
  while (S.xp >= xpForLevel(S.level)) {
    S.xp -= xpForLevel(S.level);
    S.level++;
    S.skillPoints++;
    const newRank = Math.min(Math.floor((S.level - 1) / 3), RANKS.length - 1);
    const titleCheck = checkTitleUnlock();

    queueModal(() => {
      document.getElementById('levelUpText').textContent = 'You are now Level ' + S.level + ' — ' + RANKS[newRank];
      document.getElementById('levelUpTitle').textContent = titleCheck ? '🎖️ New Title: ' + titleCheck : (S.warCry || '');
      document.getElementById('levelUpModal').style.display = 'flex';
      playSound('levelup');
      spawnParticles(window.innerWidth/2, window.innerHeight/2, '#ffd700', 50);
    });

    addBattleLog('⬆️ LEVEL UP! Now Level ' + S.level, 'level');
    addTimeline('⬆️ Reached Level ' + S.level);
    checkAchievements();
  }

  // XP Milestones
  const milestone = Math.floor(S.totalXP / 500);
  const prevMilestone = Math.floor((S.totalXP - final) / 500);
  if (milestone > prevMilestone) {
    const bonus = 25 + milestone * 5;
    S.gold += 20;
    queueModal(() => {
      document.getElementById('milestoneText').textContent = milestone * 500 + ' Total XP reached! +' + bonus + ' bonus XP + 20 gold!';
      document.getElementById('milestoneModal').style.display = 'flex';
      spawnParticles(window.innerWidth/2, window.innerHeight/2, '#00bfff', 40);
    });
    S.xp += bonus;
    addBattleLog('💎 XP Milestone: ' + milestone * 500 + ' total XP! +' + bonus + ' XP + 20 gold', 'achievement');
    addTimeline('💎 XP Milestone: ' + milestone * 500);
  }

  saveState();
  return final;
}

function getTimeBonus() {
  const h = new Date().getHours();
  if (h >= 5 && h < 8) return {label:'☀️ Early Bird', mult:1.5};
  if (h >= 22 || h < 1) return {label:'🌙 Night Owl', mult:1.3};
  return {label:'', mult:1.0};
}

// === BOSS SYSTEM ===
function spawnNewBoss() {
  const idx = S.bossesDefeated % BOSS_NAMES.length;
  const baseHP = 200 + S.bossesDefeated * 50;
  S.boss = { name:BOSS_NAMES[idx], icon:BOSS_ICONS[idx], maxHP:baseHP, hp:baseHP, spawned:todayStr() };
  addBattleLog('🐉 New Boss: ' + S.boss.name + ' (HP: ' + baseHP + ')', 'boss');
  addTimeline('🐉 Boss appeared: ' + S.boss.name);
  saveState();
}

function damageBoss(amount) {
  if (!S.boss || S.boss.hp <= 0) return;
  S.boss.hp = Math.max(0, S.boss.hp - amount);
  addBattleLog('⚔️ Dealt ' + amount + ' damage to ' + S.boss.name + ' (HP: ' + S.boss.hp + '/' + S.boss.maxHP + ')', 'boss');
  updateQuestProgress('boss_dmg', 1);
  if (S.boss.hp <= 0) defeatBoss();
  saveState();
}

function defeatBoss() {
  const xpReward = 100 + S.bossesDefeated * 20;
  const goldReward = 30 + S.bossesDefeated * 10;
  S.bossesDefeated++;
  S.gold += goldReward;
  S.totalGold = (S.totalGold || 0) + goldReward;

  queueModal(() => {
    document.getElementById('bossDefeatedText').textContent =
      S.boss.name + ' has fallen! +' + xpReward + ' XP + ' + goldReward + ' Gold!';
    document.getElementById('bossDefeatedModal').style.display = 'flex';
    playSound('boss');
    spawnParticles(window.innerWidth/2, window.innerHeight/2, '#ff4444', 60);
  });

  addXP(xpReward, true);
  addBattleLog('💀 BOSS DEFEATED: ' + S.boss.name + '! +' + xpReward + ' XP, +' + goldReward + ' gold', 'boss');
  addTimeline('💀 Defeated Boss: ' + S.boss.name);
  checkAchievements();

  // Spawn next boss after a moment
  setTimeout(() => { spawnNewBoss(); renderAll(); }, 1000);
}

// === LOOT SYSTEM ===
function tryLootDrop(missionDiff) {
  let chance = 0.25 + missionDiff * 0.05;
  if (lootCharmCount > 0) { chance = 1.0; lootCharmCount--; }

  if (Math.random() < chance) {
    S.totalLoot++;
    const roll = Math.random();
    let lootText, lootType;
    if (roll < 0.25) {
      const xp = 15 + Math.floor(Math.random() * 30);
      addXP(xp, true);
      lootText = '+' + xp + ' Bonus XP!';
      lootType = 'xp';
    } else if (roll < 0.4) {
      const gold = 10 + Math.floor(Math.random() * 25);
      S.gold += gold; S.totalGold = (S.totalGold||0) + gold;
      lootText = '+' + gold + ' Gold!';
      lootType = 'gold';
    } else if (roll < 0.55) {
      const stat = STAT_NAMES[Math.floor(Math.random()*5)];
      S.stats[stat]++;
      lootText = '+1 ' + stat + '!';
      lootType = 'stat';
    } else if (roll < 0.7) {
      S.skillPoints++;
      lootText = '+1 Skill Point!';
      lootType = 'sp';
    } else if (roll < 0.82) {
      S.inventory.push('xp_potion');
      lootText = '🧪 XP Potion added to inventory!';
      lootType = 'item';
    } else if (roll < 0.92) {
      S.inventory.push('streak_shield');
      lootText = '🛡️ Streak Shield added to inventory!';
      lootType = 'item';
    } else {
      S.inventory.push('boss_bomb');
      lootText = '💣 Boss Bomb added to inventory!';
      lootType = 'item';
    }

    queueModal(() => {
      document.getElementById('lootText').textContent = lootText;
      document.getElementById('lootModal').style.display = 'flex';
      playSound('loot');
      spawnParticles(window.innerWidth/2, window.innerHeight/2, '#aa66ff', 30);
    });

    addBattleLog('🎁 Loot Drop: ' + lootText, 'loot');
    checkAchievements();
    saveState();
  }
}

// === COMBO SYSTEM ===
function updateCombo() {
  const now = Date.now();
  if (now - S.lastMissionTime < 60000 && S.lastMissionTime > 0) {
    S.combo++;
    if (S.combo > S.maxCombo) S.maxCombo = S.combo;
    if (S.combo >= 3) {
      playSound('combo');
      showToast('🔥 COMBO x' + S.combo + '!');
      spawnParticles(window.innerWidth/2, 100, '#ff8844', S.combo * 5);
    }
    updateQuestProgress('combo', S.combo);
  } else {
    S.combo = 1;
  }
  S.lastMissionTime = now;
  if (comboTimer) clearTimeout(comboTimer);
  comboTimer = setTimeout(() => { S.combo = 0; renderAll(); }, 60000);
}

// === MISSION COMPLETION ===
function completeMission(id) {
  const m = S.missions.find(x => x.id === id);
  if (!m || m.done) return;
  m.done = true;
  m.mastery = (m.mastery || 0) + 1;
  S.totalMissions++;

  updateCombo();
  const xpGained = addXP(DIFF_XP[m.diff] || 10);
  const goldGained = Math.floor((DIFF_XP[m.diff] || 10) * 0.3);
  S.gold += goldGained;
  S.totalGold = (S.totalGold || 0) + goldGained;

  // Virtues
  const virtueMap = {physical:'Courage',mental:'Wisdom',stoic:'Temperance',strategic:'Wisdom',social:'Justice'};
  const v = virtueMap[m.cat];
  if (v) S.virtues[v] = (S.virtues[v]||0) + 1;

  // Stats
  const statMap = {physical:'STR',mental:'INT',stoic:'WIS',strategic:'INT',social:'CHA'};
  const stat = statMap[m.cat];
  if (stat && Math.random() < 0.3) { S.stats[stat]++; }
  S.stats.END = Math.max(S.stats.END, Math.floor(S.totalMissions / 20));

  // Streak
  const today = todayStr();
  if (S.lastActiveDate !== today || S.streak === 0) {
    S.streak++;
    if (S.streak > S.longestStreak) S.longestStreak = S.streak;
  }

  // Boss damage
  const dmg = 10 + m.diff * 5 + Math.floor(S.level * 2);
  damageBoss(dmg);

  // Gold
  addBattleLog('⚔️ Mission: ' + m.name + ' (+' + xpGained + ' XP, +' + goldGained + ' gold, ' + dmg + ' boss dmg)', 'xp');

  // Loot
  tryLootDrop(m.diff);

  // Random event chance (10%)
  if (Math.random() < 0.1) triggerRandomEvent();

  // Daily quest tracking
  updateQuestProgress('missions', S.missions.filter(x=>x.done).length);
  if (m.cat) updateQuestProgress('cat_' + m.cat, 1);

  // Mission mastery achievements
  checkMasteryAchievements(m);

  playSound('complete');
  checkAchievements();
  checkTitleUnlock();
  saveState();
  renderAll();
}

function getMasteryTier(count) {
  if (count >= 50) return {tier:'Diamond',icon:'💎',color:'#b9f2ff'};
  if (count >= 25) return {tier:'Gold',icon:'🥇',color:'#ffd700'};
  if (count >= 10) return {tier:'Silver',icon:'🥈',color:'#c0c0c0'};
  if (count >= 3) return {tier:'Bronze',icon:'🥉',color:'#cd7f32'};
  return {tier:'',icon:'',color:''};
}

function checkMasteryAchievements(m) {
  if (m.mastery >= 25) checkAchievement('mastery_gold');
  if (m.mastery >= 50) checkAchievement('mastery_diamond');
}

// === ACHIEVEMENTS ===
function checkAchievement(id) {
  if (S.unlockedAchievements.includes(id)) return false;
  S.unlockedAchievements.push(id);
  const ach = ACHIEVEMENTS.find(a => a.id === id);
  if (!ach) return false;

  queueModal(() => {
    document.getElementById('achievementText').textContent = ach.name + ' — ' + ach.desc;
    document.getElementById('achievementModal').style.display = 'flex';
    playSound('achievement');
    spawnParticles(window.innerWidth/2, window.innerHeight/2, '#44ff88', 40);
  });

  addBattleLog('🏆 Achievement: ' + ach.name, 'achievement');
  addTimeline('🏆 Achievement: ' + ach.name);
  return true;
}

function checkAchievements() {
  if (S.totalMissions >= 1) checkAchievement('first_mission');
  if (S.streak >= 3) checkAchievement('streak_3');
  if (S.streak >= 7) checkAchievement('streak_7');
  if (S.streak >= 14) checkAchievement('streak_14');
  if (S.streak >= 30) checkAchievement('streak_30');
  if (S.level >= 5) checkAchievement('level_5');
  if (S.level >= 10) checkAchievement('level_10');
  if (S.level >= 15) checkAchievement('level_15');
  if (S.level >= 20) checkAchievement('level_20');
  if (S.bossesDefeated >= 1) checkAchievement('boss_1');
  if (S.bossesDefeated >= 5) checkAchievement('boss_5');
  if (S.bossesDefeated >= 10) checkAchievement('boss_10');
  if (S.totalLoot >= 10) checkAchievement('loot_10');
  if (S.totalLoot >= 50) checkAchievement('loot_50');
  if (S.maxCombo >= 5) checkAchievement('combo_5');
  if (S.maxCombo >= 10) checkAchievement('combo_10');
  if (S.totalMissions >= 50) checkAchievement('missions_50');
  if (S.totalMissions >= 100) checkAchievement('missions_100');
  if (S.totalMissions >= 500) checkAchievement('missions_500');
  if (S.totalXP >= 1000) checkAchievement('xp_1000');
  if (S.totalXP >= 5000) checkAchievement('xp_5000');
  if (S.totalXP >= 10000) checkAchievement('xp_10000');
  if (S.focusSessions >= 10) checkAchievement('focus_10');
  if (S.focusSessions >= 50) checkAchievement('focus_50');
  if (S.breathSessions >= 10) checkAchievement('breathing_10');
  if (S.arenaWins >= 1) checkAchievement('arena_win');
  if (S.arenaWins >= 5) checkAchievement('arena_5');
  if (S.memoryWins >= 1) checkAchievement('memory_win');
  if (S.memoryWins >= 5) checkAchievement('memory_5');
  if (S.prestigeCount >= 1) checkAchievement('prestige_1');
  if (S.wisdomCount >= 7) checkAchievement('wisdom_7');
  if (Object.values(S.virtues).every(v => v >= 10)) checkAchievement('all_virtues_10');
  if (Object.values(S.virtues).every(v => v >= 25)) checkAchievement('all_virtues_25');
  if ((S.totalGold||0) >= 500) checkAchievement('gold_500');
  if ((S.totalGold||0) >= 1000) checkAchievement('gold_1000');
  if (S.dailyQuestStreak >= 7) checkAchievement('daily_quest_7');
  const emotionDays = Object.keys(S.emotionLog||{}).length;
  if (emotionDays >= 7) checkAchievement('emotion_7');
  // Pet max check
  if (S.level >= 20) checkAchievement('pet_max');
  // Collector
  if (S.unlockedAchievements.length >= 20) checkAchievement('collector');
  saveState();
}

// === TITLES ===
function checkTitleUnlock() {
  let newTitle = null;
  const checks = {
    iron_will: S.streak >= 7,
    shadow_monk: S.level >= 10,
    dragon_slayer: S.bossesDefeated >= 3,
    philosopher: S.wisdomCount >= 5,
    berserker: S.maxCombo >= 10,
    ascetic: S.breathSessions >= 20,
    strategist: Object.values(S.virtues).every(v => v >= 10),
    legend: S.level >= 20,
    prestige: S.prestigeCount >= 1,
    gold_king: (S.totalGold||0) >= 500,
    beast_lord: S.level >= 20,
    arena_king: S.arenaWins >= 5,
    zen: S.focusSessions >= 50,
    diamond: S.missions.some(m => (m.mastery||0) >= 50),
    collector: S.unlockedAchievements.length >= 20,
    unstoppable: S.streak >= 30,
    eternal: S.totalMissions >= 500,
    transcended: S.totalXP >= 10000,
  };
  for (let id in checks) {
    if (checks[id] && !S.unlockedTitles.includes(id)) {
      S.unlockedTitles.push(id);
      newTitle = TITLES.find(t => t.id === id)?.name || id;
      addBattleLog('🎖️ Title Unlocked: ' + newTitle, 'achievement');
      addTimeline('🎖️ Title: ' + newTitle);
    }
  }
  saveState();
  return newTitle;
}

function selectTitle(id) {
  if (S.unlockedTitles.includes(id)) {
    S.activeTitle = id;
    saveState();
    renderAll();
  }
}

// === DAILY QUESTS ===
function updateQuestProgress(type, value) {
  if (!S.dailyQuestProgress) S.dailyQuestProgress = {};
  if (type.startsWith('cat_')) {
    S.dailyQuestProgress[type] = (S.dailyQuestProgress[type] || 0) + (type === 'missions' || type === 'xp_today' ? 0 : value);
  }
  if (type === 'missions' || type === 'xp_today' || type === 'combo') {
    S.dailyQuestProgress[type] = value;
  } else {
    S.dailyQuestProgress[type] = (S.dailyQuestProgress[type] || 0) + value;
  }
  // Check quest completion
  S.dailyQuests.forEach((q, i) => {
    if (q.completed) return;
    const progress = S.dailyQuestProgress[q.type] || 0;
    if (progress >= q.target) {
      q.completed = true;
      addXP(q.xp, true);
      S.gold += 10;
      showToast('📅 Quest Complete: ' + q.name + ' (+' + q.xp + ' XP, +10 gold)');
      addBattleLog('📅 Daily Quest: ' + q.name + ' (+' + q.xp + ' XP)', 'xp');
    }
  });
  saveState();
}

// === RANDOM EVENTS ===
function triggerRandomEvent() {
  const event = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
  queueModal(() => {
    document.getElementById('randomEventText').textContent = event.text;
    document.getElementById('randomEventModal').style.display = 'flex';
    playSound('event');
    spawnParticles(window.innerWidth/2, window.innerHeight/2, '#ff8844', 35);
  });

  switch(event.type) {
    case 'xp': addXP(event.value, true); break;
    case 'gold': S.gold += event.value; S.totalGold = (S.totalGold||0) + event.value; break;
    case 'buff': doubleXPUntil = Date.now() + 600000; break;
    case 'item':
      S.inventory.push(event.value);
      if (event.value === 'streak_shield') lootCharmCount = 0;
      break;
    case 'boss_dmg': damageBoss(event.value); break;
    case 'energy': S.energy = Math.min(100, S.energy + event.value); break;
  }
  addBattleLog('🎲 Random Event: ' + event.text, 'event');
  saveState();
}

// === SPIRIT ENERGY ===
function useEnergy(type) {
  const costs = {xp:30, boss:50, gold:20};
  const cost = costs[type];
  if (S.energy < cost) { showToast('Not enough energy!'); return; }
  S.energy -= cost;
  switch(type) {
    case 'xp': addXP(25, true); showToast('⚡ Converted energy to +25 XP'); break;
    case 'boss': damageBoss(80); showToast('⚡ Spirit blast! 80 boss damage!'); break;
    case 'gold': S.gold += 10; S.totalGold=(S.totalGold||0)+10; showToast('⚡ Converted energy to +10 gold'); break;
  }
  addBattleLog('⚡ Used ' + cost + ' energy → ' + type, 'event');
  saveState();
  renderAll();
}

// === SHOP ===
function openShop() {
  document.getElementById('shopGold').textContent = S.gold;
  let html = '';
  SHOP_ITEMS.forEach(item => {
    html += '<div class="shop-item" onclick="buyItem(\'' + item.id + '\')">' +
      '<div style="font-size:1.5em">' + item.icon + '</div>' +
      '<div>' + item.name + '</div>' +
      '<div class="muted">' + item.desc + '</div>' +
      '<div class="price">' + item.price + ' 🪙</div></div>';
  });
  document.getElementById('shopItems').innerHTML = html;
  document.getElementById('shopModal').style.display = 'flex';
}

function buyItem(itemId) {
  const item = SHOP_ITEMS.find(i => i.id === itemId);
  if (!item) return;
  if (S.gold < item.price) { showToast('Not enough gold!'); return; }
  S.gold -= item.price;
  S.shopPurchases = (S.shopPurchases||0) + 1;

  if (itemId === 'energy_refill') {
    S.energy = Math.min(100, S.energy + 50);
  } else if (itemId === 'boss_bomb') {
    damageBoss(100);
  } else if (itemId === 'loot_charm') {
    lootCharmCount += 3;
  } else if (itemId === 'title_scroll') {
    const locked = TITLES.filter(t => !S.unlockedTitles.includes(t.id));
    if (locked.length > 0) {
      const t = locked[Math.floor(Math.random()*locked.length)];
      S.unlockedTitles.push(t.id);
      showToast('📜 Title unlocked: ' + t.name);
    } else {
      S.gold += item.price; // refund
      showToast('You already have all titles!');
      return;
    }
  } else {
    S.inventory.push(itemId);
  }

  updateQuestProgress('use_item', 1);
  showToast('Purchased: ' + item.name + '!');
  addBattleLog('🛒 Bought: ' + item.name + ' for ' + item.price + ' gold', 'loot');
  document.getElementById('shopGold').textContent = S.gold;
  saveState();
  renderAll();
}

// === INVENTORY POWER-UPS ===
function openPowerUp() { /* handled inline */ }
function closePowerUp() { closeModal('powerUpModal'); }
function confirmUsePowerUp() { closePowerUp(); }

function usePowerUp(idx) {
  const item = S.inventory[idx];
  if (!item) return;
  S.inventory.splice(idx, 1);
  updateQuestProgress('use_item', 1);
  switch(item) {
    case 'xp_potion':
      addXP(50, true);
      showToast('🧪 Used XP Potion: +50 XP!');
      break;
    case 'streak_shield':
      showToast('🛡️ Streak Shield is auto-used when you miss a day');
      S.inventory.push('streak_shield'); // put it back, it's passive
      return;
    case 'boss_bomb':
      damageBoss(100);
      showToast('💣 Boss Bomb: 100 damage!');
      break;
  }
  addBattleLog('🎒 Used: ' + item, 'loot');
  saveState();
  renderAll();
}

// === MINI GAME ===
function openMiniGame() {
  miniGameRound = 0;
  miniGamePlaying = false;
  document.getElementById('miniGameStatus').textContent = '';
  document.getElementById('miniGameStartBtn').style.display = '';
  renderMiniGameGrid();
  document.getElementById('miniGameModal').style.display = 'flex';
}

function renderMiniGameGrid() {
  let html = '';
  for (let i = 0; i < 9; i++) {
    html += '<div class="game-cell" id="cell_' + i + '" onclick="miniGameClick(' + i + ')"></div>';
  }
  document.getElementById('miniGameGrid').innerHTML = html;
}

function startMiniGame() {
  miniGameRound++;
  miniGameSequence = [];
  miniGamePlayerSeq = [];
  miniGamePlaying = false;
  document.getElementById('miniGameStartBtn').style.display = 'none';
  document.getElementById('miniGameStatus').textContent = 'Watch the sequence...';

  const seqLen = 2 + miniGameRound;
  for (let i = 0; i < seqLen; i++) {
    miniGameSequence.push(Math.floor(Math.random() * 9));
  }

  // Show sequence
  let delay = 500;
  miniGameSequence.forEach((cell, idx) => {
    setTimeout(() => {
      const el = document.getElementById('cell_' + cell);
      el.classList.add('lit');
      setTimeout(() => el.classList.remove('lit'), 400);
    }, delay + idx * 600);
  });

  setTimeout(() => {
    miniGamePlaying = true;
    document.getElementById('miniGameStatus').textContent = 'Your turn! Repeat the sequence.';
  }, delay + seqLen * 600 + 200);
}

function miniGameClick(cell) {
  if (!miniGamePlaying) return;
  miniGamePlayerSeq.push(cell);
  const idx = miniGamePlayerSeq.length - 1;

  if (miniGamePlayerSeq[idx] !== miniGameSequence[idx]) {
    // Wrong!
    document.getElementById('cell_' + cell).classList.add('wrong');
    miniGamePlaying = false;
    const xp = miniGameRound * 10;
    document.getElementById('miniGameStatus').textContent = 'Wrong! Earned ' + xp + ' XP for round ' + miniGameRound;
    document.getElementById('miniGameStartBtn').style.display = '';
    document.getElementById('miniGameStartBtn').textContent = 'TRY AGAIN';
    if (xp > 0) { addXP(xp, true); addBattleLog('🧠 Memory Trial: Round ' + miniGameRound + ' (+' + xp + ' XP)', 'xp'); }
    miniGameRound = 0;
    return;
  }

  document.getElementById('cell_' + cell).classList.add('correct');
  setTimeout(() => document.getElementById('cell_' + cell).classList.remove('correct'), 300);

  if (miniGamePlayerSeq.length === miniGameSequence.length) {
    // Correct!
    miniGamePlaying = false;
    const xp = (2 + miniGameRound) * 12;
    addXP(xp, true);
    S.memoryWins++;
    updateQuestProgress('memory_win', 1);
    document.getElementById('miniGameStatus').textContent = 'Perfect! +' + xp + ' XP! Round ' + (miniGameRound + 1) + ' incoming...';
    addBattleLog('🧠 Memory Trial Round ' + miniGameRound + ' cleared! +' + xp + ' XP', 'xp');
    checkAchievements();
    saveState();
    setTimeout(startMiniGame, 1500);
  }
}

// === CHALLENGE ARENA ===
let arenaTarget = 0;
let arenaCompleted = 0;
let arenaTimeLeft = 0;
let arenaReward = 0;

function openArena() {
  arenaTarget = 3 + Math.floor(Math.random() * 3);
  arenaReward = arenaTarget * 25;
  arenaCompleted = 0;
  arenaTimeLeft = 120;
  arenaActive = false;
  document.getElementById('arenaText').textContent = 'Complete ' + arenaTarget + ' missions in 2 minutes for +' + arenaReward + ' XP + 50 gold!';
  document.getElementById('arenaTimer').textContent = '2:00';
  document.getElementById('arenaProgress').textContent = '0 / ' + arenaTarget;
  document.getElementById('arenaStartBtn').style.display = '';
  document.getElementById('arenaModal').style.display = 'flex';
}

function startArena() {
  arenaActive = true;
  arenaCompleted = 0;
  document.getElementById('arenaStartBtn').style.display = 'none';
  document.getElementById('arenaText').textContent = 'GO! Complete missions now!';
  closeArenaModal();

  arenaInterval = setInterval(() => {
    arenaTimeLeft--;
    if (arenaTimeLeft <= 0) {
      clearInterval(arenaInterval);
      arenaActive = false;
      showToast('🏟️ Arena time is up! Completed ' + arenaCompleted + '/' + arenaTarget);
      addBattleLog('🏟️ Arena ended: ' + arenaCompleted + '/' + arenaTarget, 'event');
    }
  }, 1000);

  showToast('🏟️ Arena started! Complete ' + arenaTarget + ' missions!');
}

function closeArenaModal() {
  document.getElementById('arenaModal').style.display = 'none';
}

function checkArenaProgress() {
  if (!arenaActive) return;
  arenaCompleted++;
  if (arenaCompleted >= arenaTarget) {
    clearInterval(arenaInterval);
    arenaActive = false;
    addXP(arenaReward, true);
    S.gold += 50; S.totalGold = (S.totalGold||0) + 50;
    S.arenaWins++;
    showToast('🏟️ ARENA COMPLETE! +' + arenaReward + ' XP + 50 gold!');
    addBattleLog('🏟️ Arena Victory! +' + arenaReward + ' XP + 50 gold', 'achievement');
    addTimeline('🏟️ Arena Victory');
    checkAchievements();
    spawnParticles(window.innerWidth/2, window.innerHeight/2, '#ff4444', 50);
    saveState();
  }
}

// === EMOTION TRACKER ===
function logEmotion(emoji) {
  S.emotionLog[todayStr()] = emoji;
  document.getElementById('todayEmotion').textContent = emoji;
  addBattleLog('😤 Mood logged: ' + emoji, 'event');
  checkAchievements();
  saveState();
}

// === WISDOM CHALLENGE ===
function openWisdom() {
  const today = todayStr();
  if (S.wisdomDone[today]) { showToast('Already completed today!'); return; }
  const prompt = WISDOM_PROMPTS[Math.floor(Math.random() * WISDOM_PROMPTS.length)];
  document.getElementById('wisdomPrompt').textContent = prompt;
  document.getElementById('wisdomAnswer').value = '';
  document.getElementById('wisdomModal').style.display = 'flex';
}

function submitWisdom() {
  const answer = document.getElementById('wisdomAnswer').value.trim();
  if (!answer) { showToast('Write your reflection first!'); return; }
  S.wisdomDone[todayStr()] = answer;
  S.wisdomCount++;
  addXP(30, true);
  updateQuestProgress('wisdom', 1);
  showToast('📜 Wisdom submitted: +30 XP');
  addBattleLog('📜 Wisdom Challenge completed (+30 XP)', 'xp');
  checkAchievements();
  saveState();
  closeWisdom();
  renderAll();
}

// === FOCUS TIMER ===
let timerSeconds = 1500;
let timerRemaining = 1500;

function renderTimer() {
  const m = Math.floor(timerRemaining / 60);
  const s = timerRemaining % 60;
  const display = m.toString().padStart(2,'0') + ':' + s.toString().padStart(2,'0');
  const html = '<div class="timer-display">' + display + '</div>' +
    '<div class="timer-controls">' +
    '<button class="btn-small" onclick="adjustTimer(-300)">-5m</button>' +
    '<button class="btn-small" onclick="toggleTimer()">' + (focusRunning ? '⏸ Pause' : '▶ Start') + '</button>' +
    '<button class="btn-small" onclick="adjustTimer(300)">+5m</button></div>';
  document.getElementById('timerArea').innerHTML = html;
  const ft = document.getElementById('focusTimer');
  if (ft) ft.innerHTML = '<div class="timer-display">' + display + '</div>';
}

function adjustTimer(sec) {
  if (focusRunning) return;
  timerSeconds = Math.max(60, timerSeconds + sec);
  timerRemaining = timerSeconds;
  renderTimer();
}

function toggleTimer() {
  if (focusRunning) {
    clearInterval(focusTimerInterval);
    focusRunning = false;
  } else {
    focusRunning = true;
    focusTimerInterval = setInterval(() => {
      timerRemaining--;
      if (timerRemaining <= 0) {
        clearInterval(focusTimerInterval);
        focusRunning = false;
        timerRemaining = timerSeconds;
        S.focusSessions++;
        addXP(20, true);
        updateQuestProgress('focus', 1);
        showToast('⏱ Focus session complete! +20 XP');
        addBattleLog('⏱ Focus session #' + S.focusSessions + ' completed (+20 XP)', 'xp');
        playSound('levelup');
        checkAchievements();
        saveState();
      }
      renderTimer();
    }, 1000);
  }
  renderTimer();
}

// === BREATHING ===
let breathPhase = 0;
function toggleBreathing() {
  if (breathInterval) {
    clearInterval(breathInterval);
    breathInterval = null;
    document.getElementById('breathText').textContent = 'BEGIN';
    document.getElementById('breathCircle').className = 'breath-circle';
    return;
  }
  let phase = 0;
  const phases = [
    {text:'INHALE',class:'inhale',dur:4000},
    {text:'HOLD',class:'inhale',dur:4000},
    {text:'EXHALE',class:'exhale',dur:4000},
  ];
  let cycles = 0;

  function nextPhase() {
    const p = phases[phase % 3];
    document.getElementById('breathText').textContent = p.text;
    document.getElementById('breathCircle').className = 'breath-circle ' + p.class;
    phase++;
    if (phase % 3 === 0) {
      cycles++;
      if (cycles >= 4) {
        clearInterval(breathInterval);
        breathInterval = null;
        S.breathSessions++;
        addXP(15, true);
        updateQuestProgress('breathing', 1);
        showToast('🧘 Breathing complete! +15 XP');
        addBattleLog('🧘 Breathing session #' + S.breathSessions + ' (+15 XP)', 'xp');
        checkAchievements();
        saveState();
        document.getElementById('breathText').textContent = 'DONE ✓';
        document.getElementById('breathCircle').className = 'breath-circle';
        setTimeout(() => { document.getElementById('breathText').textContent = 'BEGIN'; }, 2000);
        return;
      }
    }
  }
  nextPhase();
  breathInterval = setInterval(nextPhase, 4000);
}

// === FOCUS MODE ===
function toggleFocusMode() {
  const overlay = document.getElementById('focusOverlay');
  if (overlay.style.display === 'none') {
    overlay.style.display = 'block';
    // Render focus missions
    let html = '';
    S.missions.forEach(m => {
      const check = m.done ? '✅' : '⬜';
      html += '<div class="mission-item' + (m.done ? ' completed' : '') + '">' +
        '<div class="mission-check' + (m.done ? ' done' : '') + '" onclick="completeMission(' + m.id + ');toggleFocusMode();toggleFocusMode();">' + check + '</div>' +
        '<div class="mission-info"><div class="mission-name">' + m.name + '</div></div></div>';
    });
    document.getElementById('focusMissions').innerHTML = html;
  } else {
    overlay.style.display = 'none';
  }
}

// === SKILLS ===
const SKILL_BRANCHES = [
  {name:'Physical Discipline',stat:'STR',skills:['Iron Body','Pain Tolerance','Endurance','Peak Form','Titan Strength']},
  {name:'Mental Clarity',stat:'INT',skills:['Sharp Focus','Speed Reading','Memory Palace','Analytical Mind','Genius Insight']},
  {name:'Stoic Control',stat:'WIS',skills:['Emotional Armor','Patience','Detachment','Inner Fortress','Unshakable Will']},
  {name:'Strategic Intelligence',stat:'INT',skills:['Pattern Recognition','Risk Assessment','Long Game','Master Tactician','Omniscient']},
  {name:'Social Authority',stat:'CHA',skills:['Commanding Presence','Persuasion','Leadership','Influence','Legendary Aura']},
];

function unlockSkill(branch, idx) {
  if (S.skillPoints <= 0) { showToast('No skill points!'); return; }
  const key = branch + '_' + idx;
  if (S.skills[key]) return;
  // Must unlock in order
  if (idx > 0 && !S.skills[branch + '_' + (idx-1)]) { showToast('Unlock previous skill first!'); return; }
  S.skills[key] = true;
  S.skillPoints--;
  const b = SKILL_BRANCHES[branch];
  S.stats[b.stat] += 2;
  addBattleLog('🌳 Skill: ' + b.skills[idx] + ' (+2 ' + b.stat + ')', 'level');
  addTimeline('🌳 Skill: ' + b.skills[idx]);

  // Skill combos: completing a full branch gives bonus
  const branchComplete = b.skills.every((_, i) => S.skills[branch + '_' + i]);
  if (branchComplete) {
    S.stats[b.stat] += 5;
    showToast('💥 SKILL COMBO: ' + b.name + ' mastered! +5 ' + b.stat);
    addBattleLog('💥 Skill Combo: ' + b.name + ' fully mastered! +5 ' + b.stat, 'achievement');
    addTimeline('💥 Skill Mastery: ' + b.name);
    spawnParticles(window.innerWidth/2, window.innerHeight/2, '#44ff88', 40);
  }

  playSound('levelup');
  checkAchievements();
  saveState();
  renderAll();
}

// === PRESTIGE ===
function openPrestige() {
  if (S.level < 20) { showToast('Requires Level 20!'); return; }
  document.getElementById('prestigeModal').style.display = 'flex';
}

function confirmPrestige() {
  S.prestigeCount++;
  const keepAch = [...S.unlockedAchievements];
  const keepTitles = [...S.unlockedTitles];
  const keepRecords = S.personalRecords ? {...S.personalRecords} : {};
  const keepTimeline = [...S.timeline];
  const keepBattleLog = [...S.battleLog];
  const keepPrestige = S.prestigeCount;
  const keepBossesDefeated = S.bossesDefeated;
  const keepMemoryWins = S.memoryWins;
  const keepArenaWins = S.arenaWins;
  const keepFocusSessions = S.focusSessions;
  const keepBreathSessions = S.breathSessions;
  const keepTotalMissions = S.totalMissions;
  const keepTotalXP = S.totalXP;
  const keepTotalLoot = S.totalLoot;
  const keepName = S.name;
  const keepManifesto = S.manifesto;
  const keepAvatar = S.avatar;
  const keepWarCry = S.warCry;
  const keepTheme = S.theme;
  const keepSound = S.soundOn;
  const keepNight = S.nightDim;

  S = getDefaultState();
  S.unlockedAchievements = keepAch;
  S.unlockedTitles = keepTitles;
  S.personalRecords = keepRecords;
  S.timeline = keepTimeline;
  S.battleLog = keepBattleLog;
  S.prestigeCount = keepPrestige;
  S.bossesDefeated = keepBossesDefeated;
  S.memoryWins = keepMemoryWins;
  S.arenaWins = keepArenaWins;
  S.focusSessions = keepFocusSessions;
  S.breathSessions = keepBreathSessions;
  S.totalMissions = keepTotalMissions;
  S.totalXP = keepTotalXP;
  S.totalLoot = keepTotalLoot;
  S.name = keepName;
  S.manifesto = keepManifesto;
  S.avatar = keepAvatar;
  S.warCry = keepWarCry;
  S.theme = keepTheme;
  S.soundOn = keepSound;
  S.nightDim = keepNight;
  S.lastActiveDate = todayStr();
  S.lastLoginDate = todayStr();

  addTimeline('♻️ PRESTIGE #' + S.prestigeCount);
  addBattleLog('♻️ PRESTIGE! Permanent +' + (S.prestigeCount * 5) + '% XP bonus', 'level');
  spawnParticles(window.innerWidth/2, window.innerHeight/2, '#ffd700', 80);

  checkAchievements();
  spawnNewBoss();
  saveState();
  closePrestige();
  renderAll();
}

// === SETTINGS ===
function saveIdentity() {
  S.name = document.getElementById('nameInput').value || 'WARRIOR MONK';
  S.manifesto = document.getElementById('manifestoInput').value || '';
  saveState();
  renderAll();
  showToast('Identity saved!');
}

function saveWarCry() {
  S.warCry = document.getElementById('warCryInput').value || 'FOR GLORY!';
  saveState();
  showToast('War cry saved: ' + S.warCry);
}

function toggleNightDim() {
  S.nightDim = document.getElementById('nightDimToggle').checked;
  applyNightDim();
  saveState();
}

function applyNightDim() {
  if (S.nightDim) {
    const h = new Date().getHours();
    document.body.classList.toggle('night-dim', h >= 22 || h < 6);
  } else {
    document.body.classList.remove('night-dim');
  }
}

function setTheme(theme) {
  S.theme = theme;
  document.body.setAttribute('data-theme', theme);
  saveState();
  renderAll();
}

function applySeason() {
  const month = new Date().getMonth();
  let season, badge;
  if (month >= 2 && month <= 4) { season = 'spring'; badge = '🌸'; }
  else if (month >= 5 && month <= 7) { season = 'summer'; badge = '☀️'; }
  else if (month >= 8 && month <= 10) { season = 'autumn'; badge = '🍂'; }
  else { season = 'winter'; badge = '❄️'; }
  document.body.className = document.body.className.replace(/seasonal-\w+/g, '');
  document.body.classList.add('seasonal-' + season);
  document.getElementById('seasonBadge').textContent = badge;
}

// === MISSIONS CRUD ===
function openAddMission() {
  document.getElementById('missionName').value = '';
  document.getElementById('addMissionModal').style.display = 'flex';
}

function saveMission() {
  const name = document.getElementById('missionName').value.trim();
  if (!name) { showToast('Enter a mission name!'); return; }
  const cat = document.getElementById('missionCat').value;
  const diff = parseInt(document.getElementById('missionDiff').value);
  S.missions.push({id:S.nextMissionId++, name, cat, diff, done:false, mastery:0});
  saveState();
  closeAddMission();
  renderAll();
  showToast('Mission added: ' + name);
}

function deleteMission(id) {
  S.missions = S.missions.filter(m => m.id !== id);
  saveState();
  renderAll();
}

// === EXPORT / IMPORT ===
function openExportImport() {
  document.getElementById('exportImportModal').style.display = 'flex';
}

function exportSave() {
  const data = JSON.stringify(S);
  const blob = new Blob([data], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'evolve_save_' + todayStr() + '.json';
  a.click(); URL.revokeObjectURL(url);
  showToast('Save exported!');
}

function importSave() {
  try {
    const data = document.getElementById('importArea').value;
    S = JSON.parse(data);
    const def = getDefaultState();
    for (let k in def) { if (S[k] === undefined) S[k] = def[k]; }
    saveState();
    closeExportImport();
    renderAll();
    showToast('Save imported!');
  } catch(e) { showToast('Invalid save data!'); }
}

function resetAll() {
  if (confirm('Are you SURE? This deletes EVERYTHING.')) {
    if (confirm('LAST CHANCE. All progress will be lost forever.')) {
      localStorage.removeItem('evolve_v4');
      location.reload();
    }
  }
}

// === TIMELINE ===
function addTimeline(text) {
  S.timeline.unshift({text, date:new Date().toLocaleString()});
  if (S.timeline.length > 100) S.timeline.pop();
}

// === JOURNAL ===
function saveJournal() {
  const entry = document.getElementById('journalEntry').value.trim();
  if (!entry) return;
  S.journal[todayStr()] = entry;
  document.getElementById('journalEntry').value = '';
  saveState();
  renderAll();
  showToast('Journal saved!');
}

// === AVATAR ===
function openAvatarPicker() {
  let html = '';
  AVATARS.forEach(a => {
    html += '<div class="avatar-option" onclick="pickAvatar(\'' + a + '\')">' + a + '</div>';
  });
  document.getElementById('avatarGrid').innerHTML = html;
  document.getElementById('avatarPicker').style.display = 'flex';
}

function pickAvatar(a) {
  S.avatar = a;
  saveState();
  closeAvatarPicker();
  renderAll();
}

// === COMPANION MESSAGES ===
function getCompanionMessage() {
  const h = new Date().getHours();
  const done = S.missions.filter(m => m.done).length;
  const total = S.missions.length;

  if (h < 6) return "The world sleeps. Warriors train. 🌙";
  if (h < 9) return "A new day rises. Seize it before it seizes you. ☀️";
  if (done === 0) return "No missions completed yet. The journey begins with one step. ⚔️";
  if (done === total) return "ALL MISSIONS COMPLETE. You are a force of nature. 🔥";
  if (done >= total * 0.7) return "Almost there. Don't stop now, warrior. 💪";
  if (S.streak >= 7) return "Week " + Math.floor(S.streak/7) + " of your streak. The chains grow stronger. 🔗";
  if (S.combo >= 3) return "COMBO x" + S.combo + "! The fire burns bright! 🔥";
  if (h >= 22) return "The night is dark. Your discipline shines brighter. 🌙";
  return "Stay the course. Every rep counts. ⚔️";
}

// === DAILY REPORT ===
function generateDailyReport() {
  const done = S.missions.filter(m => m.done).length;
  const total = S.missions.length;
  const pct = total > 0 ? Math.round(done/total*100) : 0;
  const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 50 ? 'C' : pct >= 30 ? 'D' : 'F';

  let html = '<div class="report-grade">' + grade + '</div>';
  html += '<div class="report-stat"><span>Missions</span><span>' + done + '/' + total + '</span></div>';
  html += '<div class="report-stat"><span>XP Today</span><span>' + xpEarnedToday + '</span></div>';
  html += '<div class="report-stat"><span>Streak</span><span>' + S.streak + ' days</span></div>';
  html += '<div class="report-stat"><span>Combo Best</span><span>x' + S.maxCombo + '</span></div>';
  html += '<div class="report-stat"><span>Boss DMG Today</span><span>' + (S.boss ? (S.boss.maxHP - S.boss.hp) : 0) + '</span></div>';
  html += '<div class="report-stat"><span>Gold Earned</span><span>' + S.gold + '</span></div>';
  html += '<p style="margin-top:12px;font-style:italic;color:var(--accent)">';
  if (pct >= 80) html += 'Outstanding discipline today. You are becoming the person you aspire to be.';
  else if (pct >= 50) html += 'Good effort. Push harder tomorrow. Consistency beats intensity.';
  else html += 'Rough day. Remember: even showing up counts. Come back stronger.';
  html += '</p>';

  document.getElementById('dailyReportContent').innerHTML = html;
  document.getElementById('dailyReportModal').style.display = 'flex';
}

// === DISCIPLINE SCORE ===
function calcDiscipline() {
  let score = 50;
  score += Math.min(S.streak * 3, 30);
  const done = S.missions.filter(m => m.done).length;
  const total = S.missions.length;
  if (total > 0) score += (done / total) * 20;
  if (S.combo >= 3) score += 5;
  if (S.loginStreak >= 7) score += 5;
  score = Math.max(0, Math.min(100, score));
  if (score >= 95) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 75) return 'B+';
  if (score >= 65) return 'B';
  if (score >= 50) return 'C';
  if (score >= 35) return 'D';
  return 'F';
}

// === RENDER FUNCTIONS ===
function switchTab(name) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  // Find matching tab button
  document.querySelectorAll('.tab').forEach(t => {
    if (t.textContent.toLowerCase().includes(name.substring(0,4))) t.classList.add('active');
  });
  renderAll();
}

function renderAll() {
  renderIdentity();
  renderAffirmation();
  renderHabitChain();
  renderStats();
  renderVirtues();
  renderPet();
  renderEnergy();
  renderBoss();
  renderMomentum();
  renderDailyQuests();
  renderMissions();
  renderTimer();
  renderTimeBonus();
  renderLoginStreak();
  renderWeeklyChallenges();
  renderStatCharts();
  renderInventory();
  renderSkills();
  renderAchievements();
  renderTitles();
  renderQuotes();
  renderBattleLog();
  renderReview();
  renderEmotionHistory();
  renderLeaderboard();
  renderTimeline();
  renderJournal();
  renderPersonalRecords();
  renderHallOfRecords();
  renderSettings();
  renderCompanion();
  renderDisciplineBadge();
  renderGoldEnergy();
}

function renderIdentity() {
  document.getElementById('avatarSymbol').textContent = S.avatar;
  document.getElementById('playerName').textContent = S.name;
  const title = TITLES.find(t => t.id === S.activeTitle);
  document.getElementById('playerTitle').textContent = title ? title.name : '';
  document.getElementById('playerManifesto').textContent = S.manifesto;
  const needed = xpForLevel(S.level);
  const pct = Math.min((S.xp / needed) * 100, 100);
  document.getElementById('xpBar').style.width = pct + '%';
  document.getElementById('xpText').textContent = S.xp + ' / ' + needed + ' XP';
  const rankIdx = Math.min(Math.floor((S.level - 1) / 3), RANKS.length - 1);
  document.getElementById('rankBadge').textContent = RANK_SYMBOLS[rankIdx] + ' ' + RANKS[rankIdx];
  document.getElementById('levelBadge').textContent = 'Level ' + S.level;
  // Prestige stars
  let stars = '';
  for (let i = 0; i < S.prestigeCount; i++) stars += '⭐';
  document.getElementById('prestigeStars').textContent = stars;
  // Pet on avatar
  const pet = PET_FORMS.filter(p => S.level >= p.lvl).pop() || PET_FORMS[0];
  document.getElementById('petDisplay').textContent = pet.icon;
  // Today emotion
  document.getElementById('todayEmotion').textContent = S.emotionLog[todayStr()] || '';
}

function renderAffirmation() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(),0,0)) / 86400000);
  const aff = AFFIRMATIONS[dayOfYear % AFFIRMATIONS.length];
  document.getElementById('affirmation').textContent = '"' + aff + '"';
}

function renderHabitChain() {
  let html = '';
  const days = Math.max(S.streak, 30);
  for (let i = days; i >= 1; i--) {
    const active = i <= S.streak;
    const isToday = i === S.streak || (S.streak === 0 && i === 1);
    html += '<div class="chain-link ' + (active ? 'active' : 'inactive') + (isToday ? ' today' : '') + '">' + i + '</div>';
  }
  document.getElementById('habitChain').innerHTML = html;
}

function renderStats() {
  let html = '';
  STAT_NAMES.forEach(s => {
    const val = S.stats[s] || 1;
    const pct = Math.min(val * 2, 100);
    html += '<div class="stat-item"><div class="stat-name">' + s + '</div>' +
      '<div class="stat-value">' + val + '</div>' +
      '<div class="stat-bar"><div class="stat-bar-fill" style="width:' + pct + '%"></div></div></div>';
  });
  document.getElementById('statsGrid').innerHTML = html;
}

function renderVirtues() {
  let html = '';
  VIRTUES.forEach(v => {
    html += '<div class="virtue-item"><div class="virtue-name">' + v + '</div>' +
      '<div class="virtue-value">' + (S.virtues[v]||0) + '</div></div>';
  });
  document.getElementById('virtuesGrid').innerHTML = html;
}

function renderPet() {
  const pet = PET_FORMS.filter(p => S.level >= p.lvl).pop() || PET_FORMS[0];
  const nextPet = PET_FORMS.find(p => S.level < p.lvl);
  let html = '<div class="pet-icon">' + pet.icon + '</div>' +
    '<div class="pet-name">' + pet.name + '</div>' +
    '<div class="pet-level">Your companion since Level ' + pet.lvl + '</div>';
  if (nextPet) {
    html += '<div class="muted">Evolves to ' + nextPet.name + ' ' + nextPet.icon + ' at Level ' + nextPet.lvl + '</div>';
  } else {
    html += '<div class="muted" style="color:var(--green)">✨ Fully evolved!</div>';
  }
  document.getElementById('petInfo').innerHTML = html;
}

function renderEnergy() {
  const pct = (S.energy / 100) * 100;
  document.getElementById('energyInfo').innerHTML =
    '<div class="energy-bar"><div class="energy-fill" style="width:' + pct + '%"></div></div>' +
    '<span>' + S.energy + ' / 100 Energy</span>';
}

function renderBoss() {
  if (!S.boss) { spawnNewBoss(); }
  const b = S.boss;
  const pct = (b.hp / b.maxHP) * 100;
  document.getElementById('bossArea').innerHTML =
    '<div class="boss-icon">' + b.icon + '</div>' +
    '<div class="boss-name">' + b.name + '</div>' +
    '<div class="boss-hp-bar"><div class="boss-hp-fill" style="width:' + pct + '%"></div></div>' +
    '<span class="muted">' + b.hp + ' / ' + b.maxHP + ' HP</span>' +
    '<div class="muted">Bosses defeated: ' + S.bossesDefeated + '</div>';
}

function renderMomentum() {
  const html = '<div><strong>🔥 Streak:</strong> ' + S.streak + ' days (best: ' + S.longestStreak + ')</div>' +
    '<div><strong>⚡ Combo:</strong> x' + S.combo + (S.combo > 0 ? ' (best: x' + S.maxCombo + ')' : '') + '</div>' +
    (doubleXPUntil > Date.now() ? '<div style="color:var(--green)">✨ DOUBLE XP ACTIVE!</div>' : '');
  document.getElementById('momentumArea').innerHTML = html;
}

function renderDailyQuests() {
  let html = '';
  if (!S.dailyQuests || S.dailyQuests.length === 0) {
    html = '<div class="muted">No quests today</div>';
  } else {
    S.dailyQuests.forEach(q => {
      const progress = S.dailyQuestProgress[q.type] || 0;
      const pct = Math.min(Math.round(progress / q.target * 100), 100);
      html += '<div class="quest-item' + (q.completed ? ' completed' : '') + '">' +
        '<div><strong>' + q.name + '</strong><br><span class="muted">' + progress + '/' + q.target + ' (' + pct + '%)</span></div>' +
        '<div>' + (q.completed ? '✅' : '⬜') + ' +' + q.xp + ' XP</div></div>';
    });
    html += '<div class="muted" style="margin-top:6px">Daily Quest Streak: ' + (S.dailyQuestStreak||0) + ' days</div>';
  }
  document.getElementById('dailyQuests').innerHTML = html;
}

function renderMissions() {
  const filter = document.getElementById('missionFilter')?.value || 'all';
  let missions = S.missions;
  if (filter !== 'all') missions = missions.filter(m => m.cat === filter);

  let html = '';
  missions.forEach(m => {
    const mastery = getMasteryTier(m.mastery||0);
    const masteryStr = mastery.tier ? '<span class="mission-mastery" style="color:' + mastery.color + '">' + mastery.icon + ' ' + mastery.tier + ' (' + m.mastery + ')</span>' : '';
    html += '<div class="mission-item' + (m.done ? ' completed' : '') + '">' +
      '<div class="mission-check' + (m.done ? ' done' : '') + '" onclick="completeMission(' + m.id + ');if(typeof checkArenaProgress===\'function\')checkArenaProgress();">' + (m.done ? '✅' : '') + '</div>' +
      '<div class="mission-info"><div class="mission-name">' + m.name + masteryStr + '</div>' +
      '<div class="mission-meta">' + m.cat + ' • ' + ['','Easy','Medium','Hard','Epic'][m.diff] + ' • +' + DIFF_XP[m.diff] + ' XP</div></div>' +
      '<span class="mission-delete" onclick="deleteMission(' + m.id + ')">🗑️</span></div>';
  });
  document.getElementById('missionList').innerHTML = html || '<div class="muted">No missions match filter</div>';
}

function renderTimeBonus() {
  const tb = getTimeBonus();
  document.getElementById('timeBonus').innerHTML = tb.label ?
    '<div style="font-size:1.5em">' + tb.label + '</div><div class="muted">' + tb.mult + 'x XP multiplier active!</div>' :
    '<div class="muted">No time bonus active. Early Bird (5-8am) = 1.5x, Night Owl (10pm-1am) = 1.3x</div>';
}

function renderLoginStreak() {
  const bonus = Math.min(15 + (S.loginStreak - 1) * 5, 100);
  document.getElementById('loginStreak').innerHTML =
    '<div><strong>Day ' + S.loginStreak + '</strong></div>' +
    (S.loginBonusClaimed ? '<div class="muted">✅ Bonus claimed: +' + bonus + ' XP</div>' :
    '<button class="btn-small glow" onclick="claimLoginBonus()">Claim +' + bonus + ' XP</button>');
}

function renderWeeklyChallenges() {
  // Simple weekly challenges based on week number
  const el = document.getElementById('weeklyChallenges');
  const challenges = [
    {name:'Complete 15 missions this week', target:15, progress:Math.min(S.totalMissions, 15)},
    {name:'Reach Level ' + (S.level + 2), target:S.level+2, progress:S.level},
    {name:'Deal 500 boss damage', target:500, progress:S.boss ? (S.boss.maxHP - S.boss.hp) : 0},
  ];
  let html = '';
  challenges.forEach(c => {
    const pct = Math.min(Math.round(c.progress/c.target*100), 100);
    html += '<div class="quest-item"><div><strong>' + c.name + '</strong><br><span class="muted">' + pct + '% complete</span></div></div>';
  });
  el.innerHTML = html;
}

function renderStatCharts() {
  // Simple text-based chart using recent history
  const dates = Object.keys(S.statHistory || {}).sort().slice(-7);
  if (dates.length < 2) {
    document.getElementById('statCharts').innerHTML = '<div class="muted">Need 2+ days of data for charts</div>';
    return;
  }
  let html = '';
  STAT_NAMES.forEach(stat => {
    const values = dates.map(d => (S.statHistory[d] || {})[stat] || 0);
    const max = Math.max(...values, 1);
    html += '<div class="mini-chart"><div class="mini-chart-title">' + stat + ' (Last ' + dates.length + ' days)</div>';
    html += '<div style="display:flex;align-items:end;gap:3px;height:50px">';
    values.forEach(v => {
      const h = Math.max(4, (v/max) * 46);
      html += '<div style="flex:1;height:' + h + 'px;background:var(--accent);border-radius:2px" title="' + v + '"></div>';
    });
    html += '</div></div>';
  });
  document.getElementById('statCharts').innerHTML = html;
}

function renderInventory() {
  const inv = S.inventory || [];
  if (inv.length === 0) {
    document.getElementById('inventoryGrid').innerHTML = '<div class="muted">No items. Complete missions for loot drops!</div>';
    return;
  }
  const counts = {};
  inv.forEach(i => counts[i] = (counts[i]||0) + 1);
  const icons = {xp_potion:'🧪',streak_shield:'🛡️',boss_bomb:'💣',loot_charm:'🍀'};
  const names = {xp_potion:'XP Potion',streak_shield:'Streak Shield',boss_bomb:'Boss Bomb',loot_charm:'Loot Charm'};
  let html = '';
  Object.keys(counts).forEach(item => {
    html += '<div class="shop-item" onclick="usePowerUp(' + inv.indexOf(item) + ')">' +
      '<div style="font-size:1.5em">' + (icons[item]||'📦') + '</div>' +
      '<div>' + (names[item]||item) + ' x' + counts[item] + '</div>' +
      '<div class="muted">Click to use</div></div>';
  });
  document.getElementById('inventoryGrid').innerHTML = '<div class="shop-grid">' + html + '</div>';
}

function renderSkills() {
  let html = '';
  const sp = document.getElementById('spDisplay');
  if (sp) sp.textContent = '(' + S.skillPoints + ' SP available)';

  SKILL_BRANCHES.forEach((branch, bi) => {
    const allUnlocked = branch.skills.every((_, i) => S.skills[bi + '_' + i]);
    html += '<div class="skill-branch"><h4>' + branch.name + ' (' + branch.stat + ')' +
      (allUnlocked ? ' <span class="skill-combo-badge">💥 MASTERED</span>' : '') + '</h4><div class="skill-nodes">';
    branch.skills.forEach((skill, si) => {
      const unlocked = S.skills[bi + '_' + si];
      const canUnlock = si === 0 || S.skills[bi + '_' + (si-1)];
      html += '<div class="skill-node ' + (unlocked ? 'unlocked' : (canUnlock ? '' : 'locked')) + '" onclick="unlockSkill(' + bi + ',' + si + ')">' + skill + '</div>';
    });
    html += '</div></div>';
  });
  document.getElementById('skillTree').innerHTML = html;
}

function renderAchievements() {
  let html = '';
  ACHIEVEMENTS.forEach(a => {
    const unlocked = S.unlockedAchievements.includes(a.id);
    const pinned = (S.pinnedAchievements||[]).includes(a.id);
    html += '<div class="achievement-item ' + (unlocked ? 'unlocked' : '') + (pinned ? ' pinned' : '') + '" onclick="togglePin(\'' + a.id + '\')">' +
      '<strong>' + a.name + '</strong><br>' +
      '<span class="muted">' + a.desc + '</span><br>' +
      '<span class="achievement-rarity rarity-' + a.rarity + '">' + a.rarity.toUpperCase() + '</span>' +
      (pinned ? ' 📌' : '') + '</div>';
  });
  document.getElementById('achievementGrid').innerHTML = html;

  // Showcase
  const pins = (S.pinnedAchievements||[]).slice(0,3);
  let showcase = '';
  for (let i = 0; i < 3; i++) {
    if (pins[i]) {
      const a = ACHIEVEMENTS.find(x => x.id === pins[i]);
      showcase += '<div class="showcase-slot">' + (a ? a.name : pins[i]) + '</div>';
    } else {
      showcase += '<div class="showcase-slot muted">Empty Slot</div>';
    }
  }
  document.getElementById('achievementShowcase').innerHTML = showcase;
}

function togglePin(id) {
  if (!S.unlockedAchievements.includes(id)) return;
  if (!S.pinnedAchievements) S.pinnedAchievements = [];
  const idx = S.pinnedAchievements.indexOf(id);
  if (idx >= 0) {
    S.pinnedAchievements.splice(idx, 1);
  } else if (S.pinnedAchievements.length < 3) {
    S.pinnedAchievements.push(id);
  } else {
    showToast('Max 3 pinned! Unpin one first.');
    return;
  }
  saveState();
  renderAchievements();
}

function renderTitles() {
  let html = '';
  TITLES.forEach(t => {
    const unlocked = S.unlockedTitles.includes(t.id);
    const active = S.activeTitle === t.id;
    html += '<div class="title-item ' + (unlocked ? 'unlocked' : '') + (active ? ' active' : '') + '" onclick="selectTitle(\'' + t.id + '\')">' +
      t.name + '</div>';
  });
  document.getElementById('titlesGrid').innerHTML = html;
}

function renderQuotes() {
  let html = '';
  STOIC_QUOTES.forEach(q => {
    const unlocked = (q.req.level && S.level >= q.req.level) || (q.req.streak && S.streak >= q.req.streak);
    html += '<div class="quote-item ' + (unlocked ? '' : 'locked') + '">' +
      (unlocked ? '"' + q.text + '" — ' + q.author : '🔒 Locked (Level ' + (q.req.level||'') + (q.req.streak ? 'Streak ' + q.req.streak : '') + ')') + '</div>';
  });
  document.getElementById('quotesList').innerHTML = html;
}

function renderBattleLog() {
  let html = '';
  (S.battleLog || []).slice(0, 50).forEach(entry => {
    html += '<div class="log-entry ' + (entry.type||'') + '"><span class="log-time">' + entry.time + '</span> ' + entry.msg + '</div>';
  });
  document.getElementById('battleLog').innerHTML = html || '<div class="muted">No entries yet</div>';
}

function clearBattleLog() {
  S.battleLog = [];
  saveState();
  renderBattleLog();
}

function renderReview() {
  // Heatmap
  let heatHtml = '';
  const days7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const ds = d.toISOString().split('T')[0];
    const dayData = S.history.find(h => h.date === ds);
    const pct = dayData ? Math.round(dayData.missions / Math.max(dayData.total,1) * 100) : 0;
    const bg = pct >= 80 ? 'var(--green)' : pct >= 50 ? 'var(--accent)' : pct > 0 ? 'var(--orange)' : 'var(--border)';
    const dayName = d.toLocaleDateString('en',{weekday:'short'});
    heatHtml += '<div class="heat-day" style="background:' + bg + '">' + dayName + '<br>' + pct + '%</div>';
  }
  document.getElementById('heatmap').innerHTML = heatHtml;
  document.getElementById('reviewStats').innerHTML =
    '<div><strong>Current Streak:</strong> ' + S.streak + '</div>' +
    '<div><strong>Longest Streak:</strong> ' + S.longestStreak + '</div>' +
    '<div><strong>Total XP:</strong> ' + S.totalXP + '</div>' +
    '<div><strong>Total Missions:</strong> ' + S.totalMissions + '</div>';
}

function renderEmotionHistory() {
  const dates = Object.keys(S.emotionLog||{}).sort().slice(-14);
  let html = '';
  dates.forEach(d => {
    html += '<div class="emotion-day"><div>' + d.slice(5) + '</div><div style="font-size:1.5em">' + S.emotionLog[d] + '</div></div>';
  });
  document.getElementById('emotionHistory').innerHTML = html || '<div class="muted">Log your mood to see history</div>';
}

function renderLeaderboard() {
  const days = (S.history||[]).sort((a,b) => {
    const pctA = a.total > 0 ? a.missions/a.total : 0;
    const pctB = b.total > 0 ? b.missions/b.total : 0;
    return pctB - pctA;
  }).slice(0, 10);

  let html = '';
  days.forEach((d, i) => {
    const pct = d.total > 0 ? Math.round(d.missions/d.total*100) : 0;
    html += '<div class="lb-entry"><span class="lb-rank">#' + (i+1) + '</span><span>' + d.date + '</span><span>' + pct + '% (' + d.missions + '/' + d.total + ')</span></div>';
  });
  document.getElementById('leaderboard').innerHTML = html || '<div class="muted">Complete more days to build your leaderboard</div>';
}

function renderTimeline() {
  let html = '';
  (S.timeline || []).slice(0, 50).forEach(t => {
    html += '<div class="timeline-item"><div class="timeline-dot"></div><div><div>' + t.text + '</div><div class="timeline-date">' + t.date + '</div></div></div>';
  });
  document.getElementById('timeline').innerHTML = html || '<div class="muted">Your journey starts here...</div>';
}

function renderJournal() {
  const el = document.getElementById('journalHistory');
  if (!el) return;
  const dates = Object.keys(S.journal||{}).sort().reverse().slice(0,10);
  let html = '';
  dates.forEach(d => {
    html += '<div style="margin-top:8px;padding:8px;background:var(--bg);border-radius:6px"><strong>' + d + '</strong><br>' + S.journal[d] + '</div>';
  });
  el.innerHTML = html;
}

function renderPersonalRecords() {
  const records = [
    {label:'Best Day XP', value:S.bestDayXP || 0},
    {label:'Longest Streak', value:S.longestStreak + ' days'},
    {label:'Max Combo', value:'x' + S.maxCombo},
    {label:'Bosses Defeated', value:S.bossesDefeated},
    {label:'Arena Wins', value:S.arenaWins},
    {label:'Memory Trial Wins', value:S.memoryWins},
    {label:'Focus Sessions', value:S.focusSessions},
    {label:'Breathing Sessions', value:S.breathSessions},
    {label:'Wisdom Challenges', value:S.wisdomCount},
    {label:'Prestige Count', value:S.prestigeCount},
  ];
  let html = '';
  records.forEach(r => {
    html += '<div class="record-item"><div class="record-value">' + r.value + '</div><div class="record-label">' + r.label + '</div></div>';
  });
  document.getElementById('personalRecords').innerHTML = html;
}

function renderHallOfRecords() {
  const records = [
    {label:'Total XP', value:S.totalXP},
    {label:'Total Missions', value:S.totalMissions},
    {label:'Total Gold Earned', value:S.totalGold||0},
    {label:'Total Loot Drops', value:S.totalLoot},
    {label:'Achievements', value:S.unlockedAchievements.length + '/' + ACHIEVEMENTS.length},
    {label:'Titles', value:S.unlockedTitles.length + '/' + TITLES.length},
    {label:'Skills Unlocked', value:Object.keys(S.skills).length + '/25'},
    {label:'Shop Purchases', value:S.shopPurchases||0},
  ];
  let html = '';
  records.forEach(r => {
    html += '<div class="record-item"><div class="record-value">' + r.value + '</div><div class="record-label">' + r.label + '</div></div>';
  });
  document.getElementById('hallOfRecords').innerHTML = html;
}

function renderSettings() {
  document.getElementById('nameInput').value = S.name;
  document.getElementById('manifestoInput').value = S.manifesto;
  document.getElementById('warCryInput').value = S.warCry || '';
  document.getElementById('nightDimToggle').checked = S.nightDim || false;

  // Theme buttons
  let themeHtml = '';
  THEMES.forEach(t => {
    themeHtml += '<div class="theme-btn theme-' + t + (S.theme === t ? ' active' : '') + '" onclick="setTheme(\'' + t + '\')"></div>';
  });
  document.getElementById('themeSelector').innerHTML = themeHtml;
}

function renderCompanion() {
  document.getElementById('companionMsg').textContent = getCompanionMessage();
}

function renderDisciplineBadge() {
  document.getElementById('disciplineBadge').textContent = calcDiscipline();
}

function renderGoldEnergy() {
  document.getElementById('goldDisplay').textContent = '🪙 ' + S.gold;
  document.getElementById('energyDisplay').textContent = '⚡ ' + S.energy;
}

// === INIT ===
function init() {
  loadState();
  checkNewDay();
  checkLoginBonus();
  if (!S.boss || S.boss.hp <= 0) spawnNewBoss();
  document.body.setAttribute('data-theme', S.theme || 'gold');
  document.getElementById('soundBtn').textContent = S.soundOn ? '🔊' : '🔇';
  applyNightDim();
  applySeason();
  renderAll();

  // Auto night dim check every minute
  setInterval(applyNightDim, 60000);

  // Save periodically
  setInterval(saveState, 30000);
}

init();
