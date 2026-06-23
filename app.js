const STORAGE_KEY = "healthy-life-pwa-v2";
const ROOM_KEY = "healthy-life-room-code";
const DEFAULT_ROOM = "healthy-life";
const APP_VERSION = "2026.06.23.4";
const VERSION_SEEN_KEY = "healthy-life-seen-version";
const MONTHLY_NOTICE_KEY = "healthy-life-monthly-notice";

const updateNotes = [
  "左上角圖示可以點擊更換，更新後會同步給同房間的人。",
  "當季賽況改成可收合戰報，介面比較不會被紀錄淹沒。",
  "18 號會提醒最後衝刺，19 號會提醒新排行榜出爐。",
];

const defaultMembers = [
  ["yy", "汪圓圓", "#2f7d67"],
  ["zt", "劉暫停", "#ff6f59"],
  ["wl", "糾結倫", "#486a9a"],
  ["yz", "陳疑針", "#f3b23c"],
  ["hx", "心悸小子", "#6d5bd0"],
  ["ww", "宋葳葳", "#d95f8a"],
  ["xy", "祐拉屎", "#178f93"],
];

const canonicalMemberNames = {
  yy: "汪圓圓",
  zt: "劉暫停",
  wl: "糾結倫",
  yz: "陳疑針",
  hx: "心悸小子",
  ww: "宋葳葳",
  xy: "祐拉屎",
};

const currentSeasonSeed = {
  key: "season-21-current",
  entries: [
    { memberId: "wl", count: 2, note: "忘記" },
    { memberId: "zt", count: 2, note: "" },
    { memberId: "ww", count: 3, note: "" },
    { memberId: "yz", count: 2, note: "" },
    { memberId: "yy", count: 3, note: "" },
  ],
};

const topTitles = [
  "斷檔第一，大拉特拉總冠軍",
  "順滑亞軍，咖啡一喝就通",
  "健康守護神，前三常駐人口",
];

const fallbackTitles = [
  "黑馬追進度",
  "壓線一大代表",
  "還在朝健康生活邁進",
];

const autoSettlementTitles = [
  "屎無前例",
  "一便惜敗",
  "健康守護神",
  "黑馬追進度",
  "穩定發揮",
  "還在朝健康生活邁進",
  "祐沒有忘記",
];

const seasonHistory = [
  {
    title: "第一季排名",
    rows: [
      ["🥇", "最強便王", "圓圓", "33"],
      ["🥈", "晚入卻多", "葳葳", "28"],
      ["🥉", "正常人", "暫停、我", "24"],
      ["", "仍須努力", "中原校草", "23"],
      ["", "仍須努力", "淡江校草", "22"],
    ],
  },
  {
    title: "第2季——排名大洗牌",
    rows: [
      ["🥇", "終於冠軍", "宋葳葳", "27"],
      ["🥈", "成功逆襲", "蔡瑋倫", "22"],
      ["🥉", "淪為凡人", "汪圓圓", "20"],
      ["", "一樣普通", "陳咦針", "17"],
      ["", "照常墊底", "林米津", "16"],
      ["", "真實不明", "劉暫停", "11"],
    ],
  },
  {
    title: "第3季——維倫的逆襲",
    rows: [
      ["🥇", "最強冠軍", "蔡維倫 aka 秦💩皇🏆", "29"],
      ["🥈", "衛冕失敗", "宋葳葳", "27"],
      ["🥉", "依然前三", "汪圓圓", "26"],
      ["💒", "好有默契", "陳咦針、林米津", "22"],
      ["😢", "再次墊底", "劉暫停", "21"],
    ],
  },
  {
    title: "第4季——第一次冠軍有人衛冕",
    rows: [
      ["🥇", "成功衛冕", "蔡瑋倫", "28"],
      ["🥈", "只差兩便", "汪圓圓", "26"],
      ["🥉", "雖敗猶榮", "宋葳葳、陳咦針", "21"],
      ["", "爬升一名", "劉暫停", "19"],
      ["", "低估能力", "林米津", "17"],
    ],
  },
  {
    title: "第5季——重生後，我與衛冕冠軍並列第一，勢必要拿回屬於我的大便冠軍",
    rows: [
      ["🥇", "屎無前例", "蔡瑋倫、劉暫停", "30"],
      ["🥈", "一便惜敗", "汪圓圓", "29"],
      ["🥉", "差距甚大", "陳一針", "20"],
      ["", "又有並列", "林米津、宋葳葳", "18"],
      ["", "臨時加入", "祐拉屎", "未知"],
    ],
  },
  {
    title: "第6季——我是曾經衛冕的3、4季大便冠軍，在上一季隱藏實力後被看扁後，這一季我掉馬了",
    rows: [
      ["🥇", "再次登頂", "蔡瑋倫", "38"],
      ["🥈", "屎料未及", "劉暫停", "31"],
      ["🥉", "平平淡淡", "宋葳葳", "28"],
      ["", "急起直追", "汪圓圓", "23"],
      ["", "僅差一便", "陳宜楨", "22"],
      ["8️⃣", "再次屎8️⃣", "林米津", "18"],
      ["❓", "蛤", "祐拉屎", "？"],
    ],
  },
  {
    title: "第7季——我是過氣的拉屎冠軍，輪迴了六輪失敗後我回歸了",
    rows: [
      ["🥇", "強勢回歸", "汪圓圓", "37"],
      ["🥈", "兩便惜敗", "糾結倫", "35"],
      ["🥉", "又是第三", "宋葳葳", "23"],
      ["", "有數字了", "祐拉屎", "20"],
      ["", "拐瓜劣棗", "陳宜楨、心悸小子、劉暫停", "19"],
    ],
  },
  {
    title: "第八季——日本行前排光便便企劃",
    rows: [
      ["🥇", "再次登頂", "蔡維倫", "35"],
      ["🥈", "跌落神壇", "王昱荃", "33"],
      ["🥉", "拉得不夠", "劉芷婷", "31"],
      ["", "穩定發揮", "宋庭葳", "24"],
      ["", "差一點點", "陳疑針", "23"],
      ["", "不知道是便秘還是沒記到", "林翰詳", "18"],
      ["", "祐沒在記", "吳粗哥", "8"],
    ],
  },
  {
    title: "第九季——跨國競賽及國內競賽混合",
    rows: [
      ["🥇", "再次登頂", "蔡維倫", "37"],
      ["🥈", "還想烙賽", "劉芷婷", "35"],
      ["🥉", "登上前三", "宋庭葳", "31"],
      ["", "轉生平民", "王昱荃", "27"],
      ["", "北極熊便斗", "林翰詳", "21"],
      ["", "慘敗", "陳疑針", "19"],
      ["", "祐沒記", "吳健猛", "5"],
    ],
  },
  {
    title: "第十季——哇草快一年啦",
    rows: [
      ["🥇", "首次登頂", "陳一針", "33"],
      ["🥈", "這次謙讓", "糾結倫", "32"],
      ["🥉", "戰況膠著", "宋庭葳、汪圓圓", "31"],
      ["", "轉生平民", "心悸小子、劉暫停", "22"],
      ["", "祐忘記", "祐拉屎", "14"],
    ],
  },
  {
    title: "第十一季——下個月過完就一年啦",
    rows: [
      ["🥇", "捲土重來", "糾結倫", "37"],
      ["🥈", "戰況膠著", "宋葳葳", "36"],
      ["🥉", "不多不少", "汪圓圓", "30"],
      ["", "非常平凡", "陳一針", "24"],
      ["", "差一點點", "劉暫停", "23"],
      ["", "根本沒記", "心悸小子", "16"],
      ["", "哪次記得", "祐拉屎", "4"],
    ],
  },
  {
    title: "第十二季——一年啦？一年啦？那明年不就兩年啦？",
    rows: [
      ["🥇", "久違登頂", "汪圓圓", "33"],
      ["🥈", "國家棟梁", "糾結倫", "28"],
      ["🥉", "還有時差", "宋葳葳", "26"],
      ["", "險勝一便", "劉暫停", "18"],
      ["", "我的最愛", "心悸小子", "17"],
      ["", "快變倒數", "陳疑針", "16"],
      ["", "還是忘記", "祐拉屎", "7"],
    ],
  },
  {
    title: "第一屆-🏅健康生活年度風雲榜🏅",
    rows: [
      ["🏆🥇", "屎勁拉", "糾結倫", "373"],
      ["🥈", "頭尾皆冠", "汪圓圓", "348"],
      ["🥉", "微軟廁所派遣員", "宋葳葳", "320"],
      ["4️⃣", "時好時壞", "劉暫停", "284"],
      ["5️⃣", "當了社畜還未學習偷薪精髓", "陳疑針", "260"],
      ["6️⃣", "沒妳的桃園怎麼拉得多", "心悸小子", "227"],
      ["7️⃣", "神秘力量", "祐拉屎", "一切皆為未知數"],
    ],
  },
  {
    title: "第十三季",
    rows: [
      ["🥇", "入伍半個月依舊登頂", "國軍倫", "32"],
      ["🥉", "跌落神壇", "汪圓圓", "29"],
      ["🥈", "交往有差", "陳疑針", "25"],
      ["", "微軟好夥伴", "劉暫停、宋葳葳", "23"],
      ["", "失望透頂", "心悸小子", "19"],
      ["", "依舊是迷", "祐拉屎", "未知"],
    ],
  },
  {
    title: "第十五季—林久福岡季😍",
    rows: [
      ["🥇", "英國擒屎磺", "宋葳葳", "29"],
      ["🥈", "屎料未及並列第二", "國軍倫、汪圓圓", "22"],
      ["🥉", "關你屁屎", "劉暫停", "21"],
      ["", "對你的愛至屎不渝", "林丹尼", "20"],
      ["", "屎無前例位居倒數", "陳疑針", "12"],
      ["", "有屎有終", "祐祐", "🈚️"],
    ],
  },
  {
    title: "第十六季—林久半年快樂！",
    rows: [
      ["🥇", "睽違11月", "劉暫停", "30"],
      ["🥈", "差一點點厲害葳孟", "宋葳葳", "29"],
      ["🥉", "退伍調整狀態", "退伍細狗倫", "25"],
      ["", "Good job", "陳疑針", "23"],
      ["", "居然倒數", "汪圓圓", "21"],
      ["", "皮炎依舊沒料", "林丹尼", "13"],
      ["", "有屎有終", "祐祐", "🈚️"],
    ],
  },
  {
    title: "第十七季—過年開工逛104開學放榜季！",
    rows: [
      ["🥇", "上課廁所蹲，就像在倫敦", "宋葳葳", "27"],
      ["🥈", "回歸前三", "汪圓圓", "25"],
      ["🥉", "連三久沒登頂", "退伍細狗倫", "23"],
      ["", "日本生魚片發威 五天拉八次", "劉暫停", "21"],
      ["", "踩在詳詳頭上", "陳疑針", "19"],
      ["", "104逛街不拉屎", "林丹尼", "10"],
      ["", "台科王子", "祐祐", "2"],
    ],
  },
  {
    title: "第1️⃣8️⃣季",
    rows: [
      ["🥇", "超爽登頂", "糾結倫", "34"],
      ["🥈", "差一點點", "汪圓圓", "29"],
      ["🥉", "葳持水準", "宋葳葳", "28"],
      ["", "一針見血", "陳疑針", "24"],
      ["", "穩定發揮", "劉暫停", "20"],
      ["", "帶心拉屎候補", "心悸小子", "18"],
      ["", "祐拉屎", "祐拉屎", "未知"],
    ],
  },
  {
    title: "第1️⃣9️⃣季",
    rows: [
      ["🥇", "圓圓登頂", "汪圓圓", "29"],
      ["🥈", "一便領先", "宋葳葳", "23"],
      ["🥉", "帶心拉屎🫀", "心悸小子", "22"],
      ["", "平分秋色", "糾結倫", "22"],
      ["", "三個 22", "劉暫停", "22"],
      ["", "差兩便", "陳疑針", "21"],
      ["", "祐拉屎", "祐拉屎", "未知"],
    ],
  },
  {
    title: "第2️⃣0️⃣季",
    rows: [
      ["🥇", "穩穩二十六", "糾結倫", "26"],
      ["🥈", "圓圓再起", "汪圓圓", "25"],
      ["🥉", "急起直追", "陳疑針", "22"],
      ["", "葳持健康", "宋葳葳", "21"],
      ["", "心悸小子", "心悸小子", "15"],
      ["", "超大超粗", "劉暫停", "15"],
      ["", "祐拉屎", "祐拉屎", "未知"],
    ],
  },
];

const $ = (selector) => document.querySelector(selector);

const els = {
  activeMember: $("#activeMember"),
  entryMember: $("#entryMember"),
  periodLabel: $("#periodLabel"),
  daysLeft: $("#daysLeft"),
  syncState: $("#syncState"),
  quickAdd: $("#quickAdd"),
  quickNote: $("#quickNote"),
  undoButton: $("#undoButton"),
  leaderboard: $("#leaderboard"),
  todayList: $("#todayList"),
  seasonFeed: $("#seasonFeed"),
  seasonFeedSummary: $("#seasonFeedSummary"),
  feedHighlights: $("#feedHighlights"),
  historySelect: $("#historySelect"),
  historyCard: $("#historyCard"),
  roomCode: $("#roomCode"),
  saveRoomButton: $("#saveRoomButton"),
  manualAddButton: $("#manualAddButton"),
  addMemberButton: $("#addMemberButton"),
  exportButton: $("#exportButton"),
  importInput: $("#importInput"),
  iconUploadButton: $("#iconUploadButton"),
  iconUploadInput: $("#iconUploadInput"),
  brandIcon: $("#brandIcon"),
  updateDialog: $("#updateDialog"),
  updateTitle: $("#updateTitle"),
  updateNotes: $("#updateNotes"),
  closeUpdateButton: $("#closeUpdateButton"),
  monthlyNoticeDialog: $("#monthlyNoticeDialog"),
  monthlyNoticeTitle: $("#monthlyNoticeTitle"),
  monthlyNoticeBody: $("#monthlyNoticeBody"),
  closeMonthlyNoticeButton: $("#closeMonthlyNoticeButton"),
  entryDialog: $("#entryDialog"),
  memberDialog: $("#memberDialog"),
  entryTime: $("#entryTime"),
  entryNote: $("#entryNote"),
  saveEntryButton: $("#saveEntryButton"),
  memberName: $("#memberName"),
  memberColor: $("#memberColor"),
  saveMemberButton: $("#saveMemberButton"),
  toast: $("#toast"),
  installButton: $("#installButton"),
};

let deferredInstallPrompt = null;
let state = loadState();
let roomCode = localStorage.getItem(ROOM_KEY) || DEFAULT_ROOM;
let firebaseConfig = null;
let remote = {
  enabled: false,
  ready: false,
  applying: false,
  ref: null,
  set: null,
  unsubscribe: null,
  saveTimer: null,
};

function loadState() {
  const fallback = {
    members: defaultMembers.map(([id, name, color]) => ({ id, name, color })),
    entries: [],
    archivedSeasons: [],
    seedKeys: [],
    appIcon: "",
    activeMemberId: "yy",
  };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.members) || !Array.isArray(saved.entries)) {
      return fallback;
    }
    return {
      ...fallback,
      ...saved,
      archivedSeasons: Array.isArray(saved.archivedSeasons) ? saved.archivedSeasons : [],
      seedKeys: Array.isArray(saved.seedKeys) ? saved.seedKeys : [],
      appIcon: saved.appIcon || "",
      activeMemberId: saved.activeMemberId || saved.members[0]?.id || "yy",
    };
  } catch {
    return fallback;
  }
}

function persistState({ sync = true } = {}) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (sync) queueRemoteSave();
}

function sharedState() {
  return {
    members: state.members,
    entries: state.entries,
    archivedSeasons: state.archivedSeasons,
    seedKeys: state.seedKeys,
    appIcon: state.appIcon || "",
    updatedAt: new Date().toISOString(),
  };
}

function ensureBaselineData() {
  let changed = false;
  const existingIds = new Set(state.members.map((member) => member.id));
  for (const [id, name, color] of defaultMembers) {
    if (!existingIds.has(id)) {
      state.members.push({ id, name, color });
      changed = true;
    }
  }

  state.members = state.members.map((member) => {
    const nextName = canonicalMemberNames[member.id] || member.name;
    if (nextName !== member.name) changed = true;
    return {
      ...member,
      name: nextName,
    };
  });

  if (!state.seedKeys.includes(currentSeasonSeed.key)) {
    const { start } = getSeasonBounds();
    let offset = 0;
    for (const seed of currentSeasonSeed.entries) {
      for (let index = 0; index < seed.count; index += 1) {
        const isLast = index === seed.count - 1;
        state.entries.push({
          id: `${currentSeasonSeed.key}-${seed.memberId}-${index + 1}`,
          memberId: seed.memberId,
          ts: new Date(start.getFullYear(), start.getMonth(), start.getDate(), 9, offset).toISOString(),
          note: isLast ? seed.note : "",
          seedKey: currentSeasonSeed.key,
        });
        offset += 7;
      }
    }
    state.seedKeys.push(currentSeasonSeed.key);
    changed = true;
  }

  return changed;
}

function normalizeRoom(value) {
  return (value || DEFAULT_ROOM).trim().replace(/[.#$/[\]]/g, "-").slice(0, 32) || DEFAULT_ROOM;
}

function getSeasonBounds(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const startsThisMonth = date.getDate() >= 19;
  const start = startsThisMonth ? new Date(year, month, 19) : new Date(year, month - 1, 19);
  const end = startsThisMonth ? new Date(year, month + 1, 19) : new Date(year, month, 19);
  return { start, end };
}

function getPreviousSeasonBounds(date = new Date()) {
  const { start } = getSeasonBounds(date);
  return {
    start: new Date(start.getFullYear(), start.getMonth() - 1, 19),
    end: start,
  };
}

function seasonKey(bounds) {
  return `${bounds.start.getFullYear()}-${String(bounds.start.getMonth() + 1).padStart(2, "0")}-${String(bounds.start.getDate()).padStart(2, "0")}`;
}

function isInSeason(entry, bounds = getSeasonBounds()) {
  const time = new Date(entry.ts);
  return time >= bounds.start && time < bounds.end;
}

function sameLocalDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatMonthDay(date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatDateTimeLocal(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatTime(date) {
  return new Intl.DateTimeFormat("zh-Hant", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getMember(memberId) {
  return state.members.find((member) => member.id === memberId);
}

function seasonEntries() {
  return state.entries.filter((entry) => isInSeason(entry));
}

function entriesInBounds(bounds) {
  return state.entries.filter((entry) => isInSeason(entry, bounds));
}

function countsByMember() {
  const counts = new Map(state.members.map((member) => [member.id, 0]));
  for (const entry of seasonEntries()) {
    counts.set(entry.memberId, (counts.get(entry.memberId) || 0) + 1);
  }
  return counts;
}

function rankedMembers() {
  const counts = countsByMember();
  const order = new Map(state.members.map((member, index) => [member.id, index]));
  return [...state.members]
    .map((member) => ({ ...member, count: counts.get(member.id) || 0 }))
    .sort((a, b) => b.count - a.count || order.get(a.id) - order.get(b.id));
}

function archivedHistory() {
  return state.archivedSeasons || [];
}

function allHistory() {
  return [...seasonHistory, ...archivedHistory()];
}

function archivePreviousSeasonIfNeeded() {
  const bounds = getPreviousSeasonBounds();
  const key = seasonKey(bounds);
  if (state.archivedSeasons?.some((season) => season.key === key)) return false;

  const entries = entriesInBounds(bounds);
  if (!entries.length) return false;

  const counts = new Map(state.members.map((member) => [member.id, 0]));
  for (const entry of entries) {
    counts.set(entry.memberId, (counts.get(entry.memberId) || 0) + 1);
  }

  const order = new Map(state.members.map((member, index) => [member.id, index]));
  const rows = state.members
    .map((member) => ({ member, count: counts.get(member.id) || 0 }))
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count || order.get(a.member.id) - order.get(b.member.id))
    .map((row, index) => ({
      medal: index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "",
      title: autoSettlementTitles[index] || autoSettlementTitles.at(-1),
      name: row.member.name,
      count: String(row.count),
    }));

  state.archivedSeasons = [
    ...(state.archivedSeasons || []),
    {
      key,
      editable: true,
      title: `自動結算 ${formatMonthDay(bounds.start)}-${formatMonthDay(new Date(bounds.end.getTime() - 1))}`,
      rows,
      createdAt: new Date().toISOString(),
    },
  ];
  return true;
}

function render({ fromRemote = false } = {}) {
  const archivedSeason = archivePreviousSeasonIfNeeded();
  const { start, end } = getSeasonBounds();
  const endInclusive = new Date(end.getTime() - 1);
  const daysLeft = Math.max(0, Math.ceil((end - new Date()) / 86400000));

  if (!getMember(state.activeMemberId)) {
    state.activeMemberId = state.members[0]?.id || "";
  }

  els.periodLabel.textContent = `${formatMonthDay(start)} - ${formatMonthDay(endInclusive)}`;
  els.daysLeft.textContent = String(daysLeft);
  els.roomCode.value = roomCode;
  renderAppIcon();

  renderSyncState();
  renderMemberSelects();
  renderLeaderboard();
  renderToday();
  renderSeasonFeed();
  renderHistory();
  persistState({ sync: !fromRemote || archivedSeason });
}

function renderAppIcon() {
  els.brandIcon.src = state.appIcon || "./assets/icon.svg";
}

function renderSyncState() {
  if (remote.enabled && remote.ready) {
    els.syncState.textContent = `同步中：${roomCode}`;
    return;
  }
  if (remote.enabled) {
    els.syncState.textContent = `連線中：${roomCode}`;
    return;
  }
  els.syncState.textContent = "單機模式：尚未填 Firebase 設定";
}

function renderMemberSelects() {
  const options = state.members
    .map((member) => `<option value="${member.id}">${escapeHtml(member.name)}</option>`)
    .join("");

  els.activeMember.innerHTML = options;
  els.entryMember.innerHTML = options;
  els.activeMember.value = state.activeMemberId;
}

function renderLeaderboard() {
  const rows = rankedMembers();
  els.leaderboard.innerHTML = rows
    .map((member, index) => {
      const title = topTitles[index] || fallbackTitles[index % fallbackTitles.length];
      const lastNote = latestNoteForMember(member.id);
      return `
        <li class="rank-row">
          <span class="rank-badge" style="background:${member.color}">${index + 1}</span>
          <div>
            <strong>${escapeHtml(member.name)}</strong>
            <p class="rank-title">${escapeHtml(title)}</p>
            <p class="last-note">${lastNote ? `上次：${escapeHtml(lastNote)}` : "上次：還沒有備註"}</p>
          </div>
          <div class="rank-controls">
            <button class="mini-adjust" data-adjust="-1" data-member="${member.id}" type="button" aria-label="${escapeHtml(member.name)}減一">−</button>
            <div class="count">${member.count}<small> 次</small></div>
            <button class="mini-adjust" data-adjust="1" data-member="${member.id}" type="button" aria-label="${escapeHtml(member.name)}加一">＋</button>
          </div>
        </li>
      `;
    })
    .join("");
}

function latestNoteForMember(memberId) {
  return seasonEntries()
    .filter((entry) => entry.memberId === memberId && entry.note)
    .sort((a, b) => new Date(b.ts) - new Date(a.ts))[0]?.note;
}

function formatDateLabel(date) {
  return `${date.getMonth() + 1}/${date.getDate()} ${formatTime(date)}`;
}

function renderToday() {
  const today = new Date();
  const entries = state.entries
    .filter((entry) => sameLocalDay(new Date(entry.ts), today))
    .sort((a, b) => new Date(b.ts) - new Date(a.ts));

  if (!entries.length) {
    els.todayList.innerHTML = `<li class="timeline-row empty">今天還沒有人開胡</li>`;
    return;
  }

  els.todayList.innerHTML = entries
    .map((entry) => {
      const member = getMember(entry.memberId);
      const name = member?.name || "神秘成員";
      const note = entry.note ? `：${escapeHtml(entry.note)}` : "";
      return `
        <li class="timeline-row">
          <div>
            <p>${escapeHtml(name)}${note}</p>
            <time>${formatTime(new Date(entry.ts))}</time>
          </div>
          <button class="delete-entry" data-delete="${entry.id}" type="button" aria-label="刪除這筆">×</button>
        </li>
      `;
    })
    .join("");
}

function renderSeasonFeed() {
  const entries = seasonEntries().sort((a, b) => new Date(b.ts) - new Date(a.ts));
  const notedEntries = entries.filter((entry) => entry.note).slice(0, 3);
  els.seasonFeedSummary.textContent = entries.length ? `${entries.length} 次，${notedEntries.length} 則近況` : "本季尚未開胡";

  els.feedHighlights.innerHTML = notedEntries.length
    ? notedEntries
        .map((entry) => {
          const member = getMember(entry.memberId);
          return `<span>${escapeHtml(member?.name || "神秘成員")}：${escapeHtml(entry.note)}</span>`;
        })
        .join("")
    : `<span>目前沒有留言，只有靜靜累積的健康生活</span>`;

  if (!entries.length) {
    els.seasonFeed.innerHTML = `<li class="timeline-row empty">本季還沒有人開胡</li>`;
    return;
  }

  els.seasonFeed.innerHTML = entries
    .map((entry) => {
      const member = getMember(entry.memberId);
      const name = member?.name || "神秘成員";
      const note = entry.note ? `<p class="feed-note">${escapeHtml(entry.note)}</p>` : `<p class="feed-note muted">沒有備註，只有默默健康</p>`;
      return `
        <li class="feed-row">
          <div class="feed-avatar" style="background:${member?.color || "#486a9a"}">${escapeHtml(name.slice(0, 1))}</div>
          <div>
            <strong>${escapeHtml(name)}</strong>
            ${note}
            <time>${formatDateLabel(new Date(entry.ts))}</time>
          </div>
          <button class="delete-entry" data-delete="${entry.id}" type="button" aria-label="刪除這筆">×</button>
        </li>
      `;
    })
    .join("");
}

function renderHistory() {
  const history = allHistory();
  const currentValue = els.historySelect.value;
  els.historySelect.innerHTML = history
    .map((season, index) => `<option value="${index}">${escapeHtml(season.title)}</option>`)
    .join("");
  els.historySelect.value = currentValue || String(history.length - 1);

  const selectedIndex = Number(els.historySelect.value);
  const season = history[selectedIndex] || history.at(-1);
  const isEditable = Boolean(season?.editable);
  els.historyCard.innerHTML = `
    <h3 ${isEditable ? `contenteditable="true" data-edit-season-title="${selectedIndex}"` : ""}>${escapeHtml(season.title)}</h3>
    <ol class="history-list">
      ${season.rows
        .map(
          (row, rowIndex) => {
            const medal = Array.isArray(row) ? row[0] : row.medal;
            const title = Array.isArray(row) ? row[1] : row.title;
            const name = Array.isArray(row) ? row[2] : row.name;
            const count = Array.isArray(row) ? row[3] : row.count;
            return `
            <li>
              <span class="history-medal">${escapeHtml(medal || "•")}</span>
              <div>
                <strong ${isEditable ? `contenteditable="true" data-edit-row-title="${rowIndex}"` : ""}>${escapeHtml(title)}</strong>
                <p>${escapeHtml(name)}</p>
              </div>
              <span class="history-count">${escapeHtml(count)}</span>
            </li>
          `;
          }
        )
        .join("")}
    </ol>
  `;
}

function addEntry({ memberId = state.activeMemberId, ts = new Date().toISOString(), note = "" } = {}) {
  if (!getMember(memberId)) return;
  state.entries.push({
    id: crypto.randomUUID(),
    memberId,
    ts,
    note: note.trim(),
  });
  state.activeMemberId = memberId;
  render();
}

function removeLatestEntryForMember(memberId) {
  const latestIndex = [...state.entries]
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => entry.memberId === memberId && isInSeason(entry))
    .sort((a, b) => new Date(b.entry.ts) - new Date(a.entry.ts))[0]?.index;

  if (latestIndex === undefined) return false;
  state.entries.splice(latestIndex, 1);
  render();
  return true;
}

function resizeImageToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read failed"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("image failed"));
      image.onload = () => {
        const size = 256;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = size;
        canvas.height = size;
        const scale = Math.max(size / image.width, size / image.height);
        const width = image.width * scale;
        const height = image.height * scale;
        context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
        resolve(canvas.toDataURL("image/png"));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function showUpdateNoticeIfNeeded() {
  if (localStorage.getItem(VERSION_SEEN_KEY) === APP_VERSION) return;
  localStorage.setItem(VERSION_SEEN_KEY, APP_VERSION);
  els.updateTitle.textContent = `版本更新 ${APP_VERSION}`;
  els.updateNotes.innerHTML = updateNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join("");
  els.updateDialog.showModal();
}

function showMonthlyNoticeIfNeeded(date = new Date()) {
  const day = date.getDate();
  if (day !== 18 && day !== 19) return;
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;
  if (localStorage.getItem(MONTHLY_NOTICE_KEY) === key) return;

  if (day === 18) {
    els.monthlyNoticeTitle.textContent = "最後衝刺日";
    els.monthlyNoticeBody.textContent = "今天是本季最後一天，請把握機會猛拉狂拉，該補記的不要客氣。";
  } else {
    els.monthlyNoticeTitle.textContent = "新排行榜出爐";
    els.monthlyNoticeBody.textContent = "新的一季開始了，上一季會自動結算，大家可以開始新一輪健康生活。";
  }

  els.monthlyNoticeDialog.dataset.noticeKey = key;
  els.monthlyNoticeDialog.showModal();
}

function openEntryDialog({ withNote = false } = {}) {
  els.entryMember.value = state.activeMemberId;
  els.entryTime.value = formatDateTimeLocal(new Date());
  els.entryNote.value = "";
  els.entryNote.placeholder = withNote ? "例：帶薪拉、壓線一大、咖啡救我" : "可空白";
  els.entryDialog.showModal();
  if (withNote) els.entryNote.focus();
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.setTimeout(() => els.toast.classList.remove("show"), 1800);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char];
  });
}

function queueRemoteSave() {
  if (!remote.enabled || !remote.ready || remote.applying || !remote.ref || !remote.set) return;
  window.clearTimeout(remote.saveTimer);
  remote.saveTimer = window.setTimeout(async () => {
    try {
      await remote.set(remote.ref, sharedState());
    } catch {
      showToast("同步失敗，先存在這支手機");
    }
  }, 260);
}

async function loadFirebaseConfig() {
  firebaseConfig = globalThis.HEALTHY_LIFE_FIREBASE_CONFIG || null;
}

async function initRemoteSync() {
  roomCode = normalizeRoom(roomCode);
  localStorage.setItem(ROOM_KEY, roomCode);

  if (!firebaseConfig?.databaseURL) {
    remote.enabled = false;
    renderSyncState();
    return;
  }

  remote.enabled = true;
  remote.ready = false;
  renderSyncState();

  try {
    const [{ initializeApp }, { getDatabase, ref, onValue, set, get }] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"),
    ]);
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    if (remote.unsubscribe) remote.unsubscribe();
    remote.ref = ref(db, `rooms/${roomCode}/state`);
    remote.set = set;

    const firstSnapshot = await get(remote.ref);
    if (!firstSnapshot.exists()) {
      await set(remote.ref, sharedState());
    } else {
      applyRemoteState(firstSnapshot.val());
    }

    remote.unsubscribe = onValue(remote.ref, (snapshot) => {
      if (snapshot.exists()) applyRemoteState(snapshot.val());
    });
    remote.ready = true;
    renderSyncState();
  } catch {
    remote.enabled = false;
    remote.ready = false;
    renderSyncState();
    showToast("雲端同步還沒連上，先用單機模式");
  }
}

function applyRemoteState(value) {
  if (!value || !Array.isArray(value.members) || !Array.isArray(value.entries)) return;
  remote.applying = true;
  state = {
    ...state,
    members: value.members,
    entries: value.entries,
    archivedSeasons: Array.isArray(value.archivedSeasons) ? value.archivedSeasons : state.archivedSeasons || [],
    seedKeys: Array.isArray(value.seedKeys) ? value.seedKeys : state.seedKeys || [],
    appIcon: value.appIcon || state.appIcon || "",
  };
  const changed = ensureBaselineData();
  render({ fromRemote: true });
  remote.applying = false;
  if (changed) persistState();
}

els.activeMember.addEventListener("change", () => {
  state.activeMemberId = els.activeMember.value;
  persistState({ sync: false });
});

els.historySelect.addEventListener("change", renderHistory);

els.iconUploadButton.addEventListener("click", () => {
  els.iconUploadInput.click();
});

els.iconUploadInput.addEventListener("change", async () => {
  const file = els.iconUploadInput.files?.[0];
  if (!file) return;
  try {
    state.appIcon = await resizeImageToDataUrl(file);
    render();
    showToast("圖示已更新");
  } catch {
    showToast("這張圖讀不起來");
  } finally {
    els.iconUploadInput.value = "";
  }
});

els.closeUpdateButton.addEventListener("click", () => {
  els.updateDialog.close();
});

els.closeMonthlyNoticeButton.addEventListener("click", () => {
  const key = els.monthlyNoticeDialog.dataset.noticeKey;
  if (key) localStorage.setItem(MONTHLY_NOTICE_KEY, key);
  els.monthlyNoticeDialog.close();
});

els.historyCard.addEventListener("blur", (event) => {
  const titleIndex = event.target.dataset.editSeasonTitle;
  const rowIndex = event.target.dataset.editRowTitle;
  if (titleIndex === undefined && rowIndex === undefined) return;

  const staticCount = seasonHistory.length;
  const selectedIndex = Number(els.historySelect.value);
  const archivedIndex = selectedIndex - staticCount;
  const archivedSeason = state.archivedSeasons?.[archivedIndex];
  if (!archivedSeason?.editable) return;

  const value = event.target.textContent.trim();
  if (!value) {
    renderHistory();
    return;
  }

  if (titleIndex !== undefined) {
    archivedSeason.title = value;
  }
  if (rowIndex !== undefined) {
    archivedSeason.rows[Number(rowIndex)].title = value;
  }

  persistState();
  renderHistory();
}, true);

els.saveRoomButton.addEventListener("click", async () => {
  roomCode = normalizeRoom(els.roomCode.value);
  localStorage.setItem(ROOM_KEY, roomCode);
  await initRemoteSync();
  showToast(firebaseConfig?.databaseURL ? `已切到房間：${roomCode}` : "要先填 Firebase 設定才會同步");
});

els.leaderboard.addEventListener("click", (event) => {
  const button = event.target.closest("[data-adjust]");
  if (!button) return;

  const memberId = button.dataset.member;
  const amount = Number(button.dataset.adjust);
  const member = getMember(memberId);
  if (!member) return;

  if (amount > 0) {
    addEntry({ memberId, note: "手動調整" });
    showToast(`${member.name} 已加 1`);
    return;
  }

  const removed = removeLatestEntryForMember(memberId);
  showToast(removed ? `${member.name} 已扣 1` : `${member.name} 本季沒有可扣紀錄`);
});

els.quickAdd.addEventListener("click", () => {
  addEntry({ note: els.quickNote.value });
  els.quickNote.value = "";
  showToast("已加 1，健康生活持續推進");
});

els.manualAddButton.addEventListener("click", () => openEntryDialog());

els.undoButton.addEventListener("click", () => {
  const latestOwnIndex = [...state.entries]
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => entry.memberId === state.activeMemberId && isInSeason(entry))
    .sort((a, b) => new Date(b.entry.ts) - new Date(a.entry.ts))[0]?.index;

  if (latestOwnIndex === undefined) {
    showToast("這期還沒有可以扣的紀錄");
    return;
  }

  state.entries.splice(latestOwnIndex, 1);
  render();
  showToast("已扣回剛剛那次");
});

els.saveEntryButton.addEventListener("click", () => {
  const memberId = els.entryMember.value;
  const rawTime = els.entryTime.value;
  if (!memberId || !rawTime) return;
  addEntry({
    memberId,
    ts: new Date(rawTime).toISOString(),
    note: els.entryNote.value,
  });
  els.entryNote.value = "";
  els.entryDialog.close();
  showToast("補記完成");
});

els.addMemberButton.addEventListener("click", () => {
  els.memberName.value = "";
  els.memberColor.value = "#2f7d67";
  els.memberDialog.showModal();
  els.memberName.focus();
});

els.saveMemberButton.addEventListener("click", () => {
  const name = els.memberName.value.trim();
  if (!name) return;
  const member = {
    id: crypto.randomUUID(),
    name,
    color: els.memberColor.value,
  };
  state.members.push(member);
  state.activeMemberId = member.id;
  els.memberDialog.close();
  render();
  showToast(`${name} 加入戰局`);
});

els.todayList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete]");
  if (!button) return;
  state.entries = state.entries.filter((entry) => entry.id !== button.dataset.delete);
  render();
  showToast("已刪除這筆");
});

els.seasonFeed.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete]");
  if (!button) return;
  state.entries = state.entries.filter((entry) => entry.id !== button.dataset.delete);
  render();
  showToast("已刪除這筆");
});

els.exportButton.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(sharedState(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `健康生活備份-${formatMonthDay(new Date()).replace("/", "-")}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

els.importInput.addEventListener("change", async () => {
  const file = els.importInput.files?.[0];
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (!Array.isArray(imported.members) || !Array.isArray(imported.entries)) {
      throw new Error("Bad backup");
    }
    state = {
      ...state,
      members: imported.members,
      entries: imported.entries,
    };
    render();
    showToast("匯入成功");
  } catch {
    showToast("這個備份讀不起來");
  } finally {
    els.importInput.value = "";
  }
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  els.installButton.hidden = false;
});

els.installButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  els.installButton.hidden = true;
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js");
}

ensureBaselineData();
render({ fromRemote: true });
showUpdateNoticeIfNeeded();
showMonthlyNoticeIfNeeded();
loadFirebaseConfig().then(initRemoteSync);
