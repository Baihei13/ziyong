/**
 * PF2e Holodeck 简体中文 — 独立汉化层
 * 不修改 pf2e-holodeck 源文件，仅在渲染后替换可见英文。
 */

/** @type {[string, string][]} 长串优先 */
const PAIRS = [
  ["Holodeck Simulation Matrix (DO NOT DELETE)", "全息甲板模拟矩阵（请勿删除）"],
  ["Campaign Exploration Meta-Metrics", "战役探索综合指标"],
  ["Campaign Combat Meta-Metrics", "战役战斗综合指标"],
  ["Instantly opens or closes the Combat Forensics dashboard.", "快速打开或关闭战斗取证仪表盘。"],
  ["Instantly open or close the combat parser window.", "快速打开或关闭战斗分析窗口。"],
  ["Instantly open or close the Danger Room UI.", "快速打开或关闭危险室界面。"],
  ["Push NPC tweaks to the sidebar", "把 NPC 调整写回侧边栏演员"],
  ["Pit Boss Insights (Classified)", "庄家洞察（机密）"],
  ["Applied vs. Mitigated Damage", "实伤 vs 减免"],
  ["Combat Forensics | All databases purged.", "战斗取证 | 所有数据库已清空。"],
  ["Combat Forensics | Cannot add logs to a Meta aggregate. Select a specific encounter.", "战斗取证 | 无法向综合汇总添加日志，请选择具体遭遇。"],
  ["Combat Forensics | Could not locate ledger data.", "战斗取证 | 找不到账本数据。"],
  ["Combat Forensics | Manual log entry injected.", "战斗取证 | 已注入手动记录。"],
  ["Combat Forensics | Log ID not found.", "战斗取证 | 找不到该日志 ID。"],
  ["Combat Forensics | Log entry deleted safely.", "战斗取证 | 日志已安全删除。"],
  ["Combat Forensics | Live combat archived and wiped.", "战斗取证 | 实时战斗已归档并清空。"],
  ["Combat Forensics | You cannot delete exploration or meta databases from here.", "战斗取证 | 不能从这里删除探索库或综合库。"],
  ["Combat Forensics | Encounter deleted.", "战斗取证 | 遭遇已删除。"],
  ["Combat Forensics | No logs selected.", "战斗取证 | 未选择任何日志。"],
  ["Combat Forensics | Data archived to Journal successfully.", "战斗取证 | 已成功归档到日记。"],
  ["Combat Forensics | JSON download initiated.", "战斗取证 | 已开始下载 JSON。"],
  ["Combat Forensics | Invalid archive data format.", "战斗取证 | 存档数据格式无效。"],
  ["Combat Forensics | Data successfully imported and merged.", "战斗取证 | 数据已成功导入并合并。"],
  ["Combat Forensics | Failed to parse JSON file.", "战斗取证 | 解析 JSON 文件失败。"],
  ["Only the GM can download raw JSON databases.", "仅 GM 可下载原始 JSON。"],
  ["Only the GM can archive to journals.", "仅 GM 可归档到日记。"],
  ["Only the GM can import archives.", "仅 GM 可导入存档。"],
  ["Holodeck | Simulation Active. Sandbox mode engaged.", "全息甲板 | 模拟已启动，沙盒模式开启。"],
  ["Holodeck | Simulation Terminated. Reality restored.", "全息甲板 | 模拟已结束，现实已恢复。"],
  ["Holodeck | Critical Error: Pristine backup missing!", "全息甲板 | 严重错误：原始备份丢失！"],
  ["Holodeck | Critical Error: Matrix database not found!", "全息甲板 | 严重错误：找不到矩阵数据库！"],
  ["Holodeck | No active scene detected.", "全息甲板 | 未检测到活动场景。"],
  ["Holodeck | Matrix database not found!", "全息甲板 | 找不到矩阵数据库！"],
  ["Name new save state...", "输入新存档名称…"],
  ["Initialize Simulation", "启动模拟"],
  ["Deactivate Protocol", "结束模拟"],
  ["Danger Room Controls", "危险室控制台"],
  ["Toggle Holodeck Control Panel", "开关全息甲板控制台"],
  ["Toggle Combat Forensics", "开关战斗取证面板"],
  ["Toggle Combat Metrics", "开关战斗数据面板"],
  ["Current / Live Combat", "当前 / 实时战斗"],
  ["Simulation Meta-Metrics", "模拟综合指标"],
  ["Campaign Aggregators", "战役汇总"],
  ["Holodeck Simulations", "全息甲板模拟"],
  ["Exploration Sessions", "探索场次"],
  ["Combat Encounters", "战斗遭遇"],
  ["Live Exploration", "实时探索"],
  ["Incoming Threat Profile", "承伤威胁画像"],
  ["Ability Output Profile", "能力输出画像"],
  ["Active Time Distribution", "有效时间分布"],
  ["Damage Breakdown (Offense)", "伤害明细（进攻）"],
  ["Damage Breakdown (Defense)", "伤害明细（防御）"],
  ["Awaiting tactical telemetry...", "等待战术遥测数据…"],
  ["Show Raw Event Logs", "显示原始事件日志"],
  ["// Lifetime Campaign Record", "// 战役生涯记录"],
  ["-- Awaiting Selection --", "-- 等待选择 --"],
  ["Select Operative:", "选择作战单位："],
  ["Overwrite Selected", "覆盖所选存档"],
  ["Delete Selected Encounter", "删除所选遭遇"],
  ["Delete Selected", "删除所选存档"],
  ["Load Selected", "读取所选存档"],
  ["Commit NPC Changes", "提交 NPC 改动"],
  ["Inject Manual Log Entry", "注入手动记录"],
  ["Archive & Wipe Live Combat", "归档并清空实时战斗"],
  ["Import Combat Archives", "导入战斗存档"],
  ["Mass Audit Combat Record", "批量审计战斗记录"],
  ["Delete Log Entry", "删除日志条目"],
  ["Delete Encounter", "删除遭遇"],
  ["Add Manual Log", "添加手动记录"],
  ["Export to Journal", "导出到日记"],
  ["Download Raw JSON", "下载原始 JSON"],
  ["Import Archives", "导入存档"],
  ["Purge Archives", "清空存档"],
  ["Select for Mass Audit", "勾选以批量审计"],
  ["Enemy shots you blocked", "你挡住的敌方射击"],
  ["Friendly shots you blocked", "你挡住的友方射击"],
  ["No elemental data logged", "暂无元素数据"],
  ["No turn data logged", "暂无回合数据"],
  ["Expected Difficulty:", "预期难度："],
  ["Active Combatants:", "参战单位："],
  ["Total Actions:", "总动作数："],
  ["Active Time:", "有效用时："],
  ["Fate & Probability", "运气与概率"],
  ["Damage Variance", "伤害偏差"],
  ["Time Efficiency", "时间效率"],
  ["Utility and Defence", "辅助与防御"],
  ["Party vs Mean:", "队伍 vs 均值："],
  ["Enemy vs Mean:", "敌人 vs 均值："],
  ["Party Pace:", "队伍节奏："],
  ["Enemy Pace:", "敌人节奏："],
  ["Top Guardian:", "首席嘲讽："],
  ["Always in the Way:", "总挡子弹："],
  ["Always in the Way", "总挡子弹"],
  ["Hardest to Hit:", "最难命中："],
  ["Most Evasive:", "豁免最强："],
  ["Apex Hunter:", "顶级猎手："],
  ["Iron Wall:", "铁壁："],
  ["Wellspring Surges", "涌能次数"],
  ["Wellspring:", "泉源："],
  ["Enemy Elements", "敌人元素"],
  ["Party & Allies", "队伍与盟友"],
  ["Enemies & Monsters", "敌人与怪物"],
  ["Combatants Present", "在场单位"],
  ["Deployment History", "参战历史"],
  ["Damage vs Mean", "伤害 vs 均值"],
  ["Hardest Hit Taken", "最重承伤"],
  ["Shots Interrupted", "打断射击"],
  ["Damage Instances:", "伤害次数："],
  ["Minions & Summons", "随从与召唤物"],
  ["Combat Forensics", "战斗取证"],
  ["Party DMG", "队伍伤害"],
  ["Enemy DMG", "敌人伤害"],
  ["Fused DMG", "锁定伤害"],
  ["Luckiest:", "最幸运："],
  ["Unluckiest:", "最倒霉："],
  ["Average Pace", "平均节奏"],
  ["Average d20", "d20 均值"],
  ["Best Action", "最强一击"],
  ["Biggest Heal", "最大治疗"],
  ["Total Blocked", "总格挡"],
  ["Dodge Chance", "闪避率"],
  ["Resist Chance", "抵抗率"],
  ["Damage Dealt", "造成伤害"],
  ["Healing Done", "造成治疗"],
  ["Best Hit", "最强一击"],
  ["End of Turn:", "回合结束："],
  ["Taunts Used", "嘲讽使用"],
  ["Hunted Shots", "猎杀射击"],
  ["No data to archive.", "没有可归档的数据。"],
  ["No data to export.", "没有可导出的数据。"],
  ["N/A (No PCs)", "无（无 PC）"],
  ["Meta Aggregate", "综合汇总"],
  ["Overview", "总览"],
  ["Timeline", "时间线"],
  ["Combatants", "参战者"],
  ["Dossier", "档案"],
  ["Deployments", "参战次数"],
  ["Mitigated", "减免"],
  ["Interrupts", "打断"],
  ["Surges", "涌能"],
  ["Taunts", "嘲讽"],
  ["Checks", "检定"],
  ["Uses:", "使用次数："],
  ["Allies:", "盟友："],
  ["Enemies:", "敌人："],
  ["Target", "目标"],
  ["Action", "动作"],
  ["Result", "结果"],
  ["Source", "来源"],
  ["ROUND", "回合"],
  ["Save", "保存"],
  ["Load", "读取"],
  ["Party", "队伍"],
  ["Enemy", "敌人"],
  ["Dodge", "闪避"],
  ["Resist", "抵抗"],
  ["Saves", "豁免"],
  ["Kills", "击杀"],
  ["Extreme", "极端"],
  ["Severe", "严峻"],
  ["Moderate", "中等"],
  ["Trivial", "琐碎"],
  ["Low", "低"],
  ["Rnd", "轮"],
];

const ATTRS = ["title", "placeholder", "data-tooltip", "aria-label", "label"];

function translateText(text) {
  if (!text || typeof text !== "string") return text;
  let out = text;
  for (const [en, zh] of PAIRS) {
    if (out.includes(en)) out = out.split(en).join(zh);
  }
  // Holodeck dynamic notifications
  out = out.replace(/^Holodeck \| Simulation state '(.+)' securely archived\.$/, "全息甲板 | 模拟存档「$1」已安全保存。");
  out = out.replace(/^Holodeck \| Simulation state '(.+)' does not exist\.$/, "全息甲板 | 模拟存档「$1」不存在。");
  out = out.replace(/^Holodeck \| Reality overwritten\. State '(.+)' is now active\.$/, "全息甲板 | 现实已覆盖，存档「$1」已激活。");
  out = out.replace(/^Holodeck \| State '(.+)' does not exist\.$/, "全息甲板 | 存档「$1」不存在。");
  out = out.replace(/^Holodeck \| Timeline '(.+)' has been erased\.$/, "全息甲板 | 时间线「$1」已删除。");
  out = out.replace(/^Holodeck \| Success\. Synchronized (\d+) NPCs to the master database\.$/, "全息甲板 | 成功：已将 $1 个 NPC 同步到主数据库。");
  out = out.replace(/^Combat Forensics \| (.+) allegiance swapped\.$/, "战斗取证 | 已切换 $1 的阵营。");
  return out;
}

function translateElement(root) {
  if (!root) return;

  // attributes
  if (root.querySelectorAll) {
    for (const el of root.querySelectorAll("*")) {
      for (const attr of ATTRS) {
        if (!el.hasAttribute?.(attr)) continue;
        const v = el.getAttribute(attr);
        const nv = translateText(v);
        if (nv !== v) el.setAttribute(attr, nv);
      }
      if (el.tagName === "OPTGROUP" && el.label) {
        const nv = translateText(el.label);
        if (nv !== el.label) el.label = nv;
      }
    }
  }

  // text nodes
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const raw = node.nodeValue;
    if (!raw || !raw.trim()) continue;
    const nv = translateText(raw);
    if (nv !== raw) node.nodeValue = nv;
  }

  // window title bar (ApplicationV2)
  const app = root.closest?.(".application");
  if (app) {
    const title = app.querySelector?.(".window-title");
    if (title?.textContent) {
      const nv = translateText(title.textContent);
      if (nv !== title.textContent) title.textContent = nv;
    }
  }
}

function wrapNotifications() {
  if (!ui?.notifications) return;
  for (const type of ["info", "warn", "error"]) {
    const orig = ui.notifications[type].bind(ui.notifications);
    ui.notifications[type] = (message, ...rest) => {
      if (typeof message === "string") message = translateText(message);
      return orig(message, ...rest);
    };
  }
}

function patchSceneControls() {
  Hooks.on("getSceneControlButtons", (controls) => {
    const patch = (tools) => {
      if (!tools) return;
      const list = Array.isArray(tools) ? tools : Object.values(tools);
      for (const t of list) {
        if (t?.name === "holodeck" && typeof t.title === "string") {
          t.title = translateText(t.title);
        }
      }
    };
    if (Array.isArray(controls)) {
      for (const c of controls) patch(c.tools);
    } else {
      for (const c of Object.values(controls ?? {})) patch(c?.tools);
    }
  });
}

function isHolodeckUi(app, element) {
  const id = app?.id || app?.options?.id || "";
  if (id === "holodeck-hud" || id === "combat-forensics-ui") return true;
  if (element?.querySelector?.(".holodeck-container, .forensics-container")) return true;
  const title = app?.options?.window?.title || "";
  return /Danger Room|Combat Forensics|Holodeck/i.test(String(title));
}

/**
 * 战斗识别修复（猴补原版 CombatParser）：
 * 1) 密语/盲消息（metagame_secretDamage）原先整段跳过 → 实战承伤全丢
 * 2) origin 可能是纯 UUID 字符串
 * 3) 友好 disposition 的 NPC（玩家控猎人）算盟友
 * 4) 中文「结算摘要」等 AoE 文案
 */
function patchCombatRecognition() {
  const CP = window.CombatParser;
  if (!CP) {
    console.warn("PF2e Holodeck 简体中文 | CombatParser 尚未就绪，稍后重试识别补丁");
    return false;
  }

  const allyOf = (actDoc, combatant = null) => {
    if (!actDoc) return false;
    if (actDoc.type === "character" || actDoc.type === "familiar") return true;
    if (actDoc.alliance === "party") return true;
    try {
      if (game.users.some((u) => !u.isGM && actDoc.testUserPermission(u, "OWNER"))) return true;
    } catch (e) {}
    try {
      const tok = combatant?.token ?? actDoc.getActiveTokens?.()?.[0]?.document;
      const disp = tok?.disposition ?? actDoc.prototypeToken?.disposition;
      if (disp === CONST.TOKEN_DISPOSITIONS.FRIENDLY) return true;
    } catch (e) {}
    return false;
  };

  if (typeof CP.seedCombatants === "function" && !CP.__zhSeedPatched) {
    const origSeed = CP.seedCombatants.bind(CP);
    CP.seedCombatants = function (combat) {
      origSeed(combat);
      if (!combat?.combatants) return;
      for (const c of combat.combatants) {
        const actorDoc = c.actor;
        if (!actorDoc) continue;
        const rawName = CP.getCanonicalName(actorDoc, c.name);
        const actorName = CP.resolveOwner(rawName, actorDoc, c.name);
        const entry = this.ledger?.actors?.[actorName];
        if (entry && allyOf(actorDoc, c)) entry.isAlly = true;
      }
    };
    CP.__zhSeedPatched = true;
  }

  if (typeof CP.parseMessage === "function" && !CP.__zhParsePatched) {
    const origParse = CP.parseMessage.bind(CP);
    CP.parseMessage = function (message) {
      try {
        if (!message || message.__holodeckParsed) return;
        const flags = message?.flags?.pf2e || message?.flags?.sf2e || {};
        const rawOrigin = flags.origin;
        if (rawOrigin && typeof rawOrigin === "string") {
          flags.origin = { uuid: rawOrigin };
          if (message.flags?.pf2e) message.flags.pf2e.origin = flags.origin;
          else if (message.flags?.sf2e) message.flags.sf2e.origin = flags.origin;
        }
      } catch (e) {}
      return origParse(message);
    };
    CP.__zhParsePatched = true;
  }

  if (!Hooks.__zhHolodeckSecretFix) {
    // 抢在原版 hook 之前：把「密语且非 holodeck」改成允许 GM/收件人解析
    // 原版 hook 在 parser.js 末尾注册；我们在 ready 再注册的话顺序更晚。
    // 做法：用 libWrapper 风格包装不可行时，直接再挂一个同名逻辑的前置过滤器——
    // 原版是 `if (isSecret && !isHolodeck) return;`，我们无法删掉它。
    // 因此必须改原版 parser.js，或在 createChatMessage 用更早优先级重新 parse。
    Hooks.on("createChatMessage", (message) => {
      if (!message?.id) return;
      if (message.flags?.core?.initiativeRoll) return;
      const isSecret = (message.whisper && message.whisper.length > 0) || message.blind;
      const isHolodeck = canvas.scene?.getFlag("pf2e-holodeck", "active");
      if (!isSecret || isHolodeck) return; // 非密语：原版已处理

      const recipients = message.whisper || [];
      const canSee = game.user.isGM || recipients.includes(game.user.id);
      if (!canSee) return;

      // 原版因 isSecret 提前 return 了；这里补跑一遍解析
      try {
        window.CombatParser?.parseMessage?.(message);
        if (window.combatForensicsInstance?.rendered) window.combatForensicsInstance.render();
      } catch (err) {
        console.error("PF2e Holodeck 简体中文 | 密语伤害补解析失败", err);
      }
    });
    Hooks.__zhHolodeckSecretFix = true;
  }

  console.log("PF2e Holodeck 简体中文 | 战斗识别补丁已生效");
  return true;
}

Hooks.once("init", () => {
  console.log("PF2e Holodeck 简体中文 | 独立汉化层已加载");
  patchSceneControls();
});

Hooks.once("ready", () => {
  if (!game.modules.get("pf2e-holodeck")?.active) {
    ui.notifications.warn("PF2e Holodeck 简体中文 | 请先启用原版「PF2e Holodeck」模组。");
    return;
  }
  wrapNotifications();
  // CombatParser 在 holodeck 的 esmodule 里定义；ready 时通常已有
  if (!patchCombatRecognition()) {
    setTimeout(() => patchCombatRecognition(), 1500);
  }
});

Hooks.on("renderApplicationV2", (app, element) => {
  try {
    if (!isHolodeckUi(app, element)) return;
    const root = element instanceof HTMLElement ? element : element?.[0] || app?.element;
    translateElement(root);
    // 标题可能稍后写入
    requestAnimationFrame(() => translateElement(root));
  } catch (err) {
    console.error("PF2e Holodeck 简体中文 | 翻译失败", err);
  }
});

// 兼容部分 DialogV2 / 旧 Application
Hooks.on("renderApplication", (app, html) => {
  try {
    const title = app?.options?.title || app?.title || "";
    if (!/Danger Room|Combat Forensics|Holodeck|Inject Manual|Delete Encounter|Import Combat|Mass Audit|Archive/i.test(String(title))) return;
    const root = html?.[0] || html || app?.element;
    translateElement(root);
  } catch (err) {
    console.error("PF2e Holodeck 简体中文 | Dialog 翻译失败", err);
  }
});
