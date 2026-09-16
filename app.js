const LINES = {
  main: {
    label: "Main line",
    endId: "end",
    endTitle: "All aboard. You reached the end of the line.",
    endBody:
      "You agreed with every stop, from danger in principle through magnitude of outcome.",
    stops: [
      {
        id: "danger_in_principle",
        label: "Danger in principle",
        question:
          "If a system had much higher general intelligence than a human, and no special safeguards, could it act against human interests?",
        subtext:
          "This tests two ideas at once: that intelligence and goals are independent, and that almost any goal makes power and self-preservation useful.",
        detour: {
          id: "danger_in_principle_detour",
          label: "People with an AI",
          question:
            "Even if a superintelligent system never acts against us on its own, could humans use an obedient one to cause a catastrophe?",
          subtext:
            "This separates two risks. One is an AI with its own goals. The other is people with an AI. Their aims range from permanent control to deliberate mass death.",
          switchTo: "misuse",
        },
      },
      {
        id: "reachability",
        label: "Reachability",
        question: "Can we build a system which has higher general intelligence than a human, at all?",
        subtext: "Some people expect a hard ceiling on current methods. Other people expect no such ceiling.",
        detour: {
          id: "reachability_detour",
          label: "Copies and speed",
          question:
            "Even if no single system beats a smart human, could millions of fast copies that coordinate cause the same problem?",
          subtext:
            "A ceiling on one mind is not a ceiling on a population of minds. Speed and numbers can replace raw depth.",
        },
      },
      {
        id: "rate_of_progress",
        label: "Rate of progress",
        question:
          "Is the current rate of AI progress fast enough to reach that point within a few decades, not centuries?",
        subtext:
          "This splits people who accept the idea in principle from people who treat it as a far-future concern.",
        detour: {
          id: "rate_of_progress_detour",
          label: "Slow arrival",
          question: "Even on a slower path, would the control problem still be unsolved when we arrive?",
          subtext: "Extra time helps only if we use it. This asks whether delay alone produces a solution.",
        },
      },
      {
        id: "rsi",
        label: "Recursive self-improvement",
        question:
          "Can an AI system meaningfully speed up AI research on itself, once it reaches some capability level?",
        subtext:
          "This is the mechanism behind an intelligence explosion. Some people expect AI research to stay bottlenecked by compute, data, or human judgment.",
        detour: {
          id: "rsi_detour",
          label: "No loop needed",
          question:
            "Even with no self-improvement loop, could ordinary human-led research still reach a dangerous capability level?",
          subtext:
            "Recursive self-improvement makes the path faster, but it may not be necessary. Human researchers alone could still get there.",
        },
      },
      {
        id: "takeoff_speed",
        label: "Takeoff speed",
        question:
          "If that happens, does capability jump within months or a few years, rather than unfold over many years?",
        subtext: "This sets how much warning time humans and institutions get to react.",
        detour: {
          id: "takeoff_speed_detour",
          label: "Wasted warning",
          question: "Even with years of warning, would governments and labs fail to act in time?",
          subtext:
            "A slow takeoff helps only if institutions use the time. Responses to other known risks have often been slow.",
        },
      },
      {
        id: "alignment_tractable",
        label: "Control and alignment",
        question:
          "Is alignment difficult: will we lack reliable methods to align a much smarter system with human intent, in time?",
        subtext:
          "People who expect alignment methods to keep pace with capability gains usually get off here, since a solved alignment problem breaks the rest of the chain.",
        detour: {
          id: "alignment_tractable_detour",
          label: "Bad actors",
          question:
            "Even if alignment turns out to be solvable, could a careless or malicious actor still build and deploy a dangerous, unaligned system anyway?",
          subtext:
            "A solvable problem is not the same as a problem every actor actually solves. This asks whether misuse alone keeps the risk alive, even with a known fix.",
        },
      },
      {
        id: "competitive_dynamics",
        label: "Competitive dynamics",
        question:
          "Even if some labs or countries act with caution, will competition force someone to deploy an unsafe system anyway?",
        subtext: "This crux is about incentives and coordination, not about technology.",
        detour: {
          id: "competitive_dynamics_detour",
          label: "Wrong about safe",
          question:
            "Even if every actor stays careful and coordinated, could someone deploy a system that everyone wrongly believed was safe?",
          subtext:
            "Caution is not the same as correctness. This asks whether our tests can tell a safe system from an unsafe one.",
        },
      },
      {
        id: "magnitude",
        label: "Magnitude of outcome",
        question:
          "Will superintelligent AI be able to cause human extinction, or a permanent loss of human control over our own future, if misaligned?",
        subtext:
          "Some people accept every earlier stop but expect a bad-but-survivable outcome. This also counts a world where humanity survives but never again decides its own future.",
      },
    ],
  },

  misuse: {
    label: "Misuse line",
    endId: "end_misuse",
    endTitle: "All aboard the misuse line.",
    endBody:
      "You do not expect AI to turn on us by itself. You expect people to point it at us, and you expect that to be enough.",
    stops: [
      {
        id: "misuse_reachability",
        label: "Reachability",
        question:
          "Can we build a system powerful enough that a human group could use it to cause a global catastrophe?",
        subtext:
          "This line does not need the system to have goals of its own. It only needs the system to be powerful enough as a tool.",
      },
      {
        id: "misuse_timeline",
        label: "Timeline",
        question: "Will such a system arrive within a few decades, not centuries?",
        subtext:
          "This splits people who accept the risk in principle from people who treat it as a far-future concern.",
      },
      {
        id: "misuse_proliferation",
        label: "Proliferation",
        question:
          "Will such a system reach hands outside a small set of careful actors, through open weights, theft, or state programs?",
        subtext:
          "The risk depends on who can get a copy. Some people expect strong control of access. Other people expect leaks.",
        detour: {
          id: "misuse_proliferation_detour",
          label: "The careful hands",
          question:
            "Even if the technology stays in a few hands, could those hands themselves use it for catastrophic ends?",
          subtext: "A state or a company that holds it alone is still an actor with its own aims.",
        },
      },
      {
        id: "misuse_intent",
        label: "Intent",
        question:
          "Is there an actor who would use such a system for catastrophic ends, up to the deliberate end of civilization?",
        subtext:
          "Aims vary. Some actors want permanent power. Some accept huge risk to win. A few want mass death for its own sake.",
      },
      {
        id: "misuse_defense",
        label: "Defense",
        question: "Would defenses, monitoring, and the rest of the world fail to stop such an attempt in time?",
        subtext: "Other powerful systems might defend us. This asks whether attack beats defense.",
      },
      {
        id: "misuse_magnitude",
        label: "Magnitude of outcome",
        question:
          "Would the result be human extinction, or a permanent loss of human control over our own future?",
        subtext: "Some people accept every earlier stop but expect a bad-but-survivable outcome.",
      },
    ],
  },
};

const cfg = window.DOOMTRAIN_CONFIG || {};
const client =
  cfg.supabaseUrl && cfg.supabaseAnonKey
    ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey)
    : null;

const screens = {
  intro: document.getElementById("screen-intro"),
  stop: document.getElementById("screen-stop"),
  result: document.getElementById("screen-result"),
};

let currentLine = "main";
let currentIndex = 0;
let inDetour = false;
const answers = {};
let stopReached = null;
let exitNode = null;
let exitLabel = null;

function showScreen(next) {
  document.querySelectorAll(".screen.active").forEach((el) => {
    if (el !== next) el.classList.remove("active");
  });
  next.classList.remove("active");
  void next.offsetWidth;
  next.classList.add("active");
}

function renderStop() {
  const line = LINES[currentLine];
  const stop = line.stops[currentIndex];
  const node = inDetour ? stop.detour : stop;
  const label = inDetour ? `${stop.label} — ${stop.detour.label}` : stop.label;
  const prefix = currentLine === "main" ? "" : `${line.label} — `;
  document.getElementById("stop-index").textContent =
    `${prefix}Stop ${currentIndex + 1} of ${line.stops.length} — ${label}`;
  const hasTerm = renderQuestionText(document.getElementById("stop-question"), node.question);
  document.getElementById("stop-subtext").textContent = node.subtext;
  document.getElementById("stop-definition").textContent = GLOSSARY_TERM.definition;
  document.getElementById("stop-definition").hidden = !(hasTerm && definitionOpen);
  showScreen(screens.stop);
}

const GLOSSARY_TERM = {
  phrase: "general intelligence",
  definition:
    "An entity with higher general intelligence than a human is defined in this website as an entity capable of performing the vast majority of tasks/solving the vast majority of problems that a human can solve, and have other advantages in this realm over humans, such as speed/parallelisation, greater variety of problems they can solve, needing less data to solve the same problems, etc.",
};

let definitionOpen = false;

// Builds the question as text nodes, with the glossary phrase as a button.
// Returns whether the phrase appeared at all.
function renderQuestionText(el, text) {
  el.textContent = "";
  const idx = text.toLowerCase().indexOf(GLOSSARY_TERM.phrase);
  if (idx === -1) {
    el.textContent = text;
    return false;
  }

  el.append(document.createTextNode(text.slice(0, idx)));

  const term = document.createElement("button");
  term.type = "button";
  term.className = "glossary-term";
  term.textContent = text.slice(idx, idx + GLOSSARY_TERM.phrase.length);
  term.setAttribute("aria-expanded", String(definitionOpen));
  term.addEventListener("click", () => {
    definitionOpen = !definitionOpen;
    term.setAttribute("aria-expanded", String(definitionOpen));
    document.getElementById("stop-definition").hidden = !definitionOpen;
  });
  el.append(term);

  el.append(document.createTextNode(text.slice(idx + GLOSSARY_TERM.phrase.length)));
  return true;
}

function advance() {
  const line = LINES[currentLine];
  if (currentIndex === line.stops.length - 1) {
    stopReached = line.endId;
    showResult();
  } else {
    currentIndex += 1;
    renderStop();
  }
}

document.getElementById("btn-start").addEventListener("click", () => {
  currentLine = "main";
  currentIndex = 0;
  inDetour = false;
  renderStop();
});

document.getElementById("btn-skip").addEventListener("click", async () => {
  showScreen(screens.result);
  document.getElementById("result-title").textContent = "You chose to walk and take in the view.";
  document.getElementById("result-body").textContent =
    "No ride of your own. Here is where everyone else got off.";
  document.getElementById("pdoom-block").hidden = true;
  document.getElementById("tractability-block").hidden = true;
  document.getElementById("sincerity-block").hidden = true;
  document.getElementById("stats-block").hidden = false;
  document.getElementById("btn-restart").hidden = false;
  document.body.classList.add("wide");

  const stats = await fetchStats();
  document.getElementById("stats-line").textContent = stats.total
    ? `${stats.total} people have ridden the train so far.`
    : "Nobody has ridden the train yet.";
  renderOverallStats(stats);

  DoomRail.play({
    canvas: document.getElementById("rail-canvas"),
    tooltip: document.getElementById("rail-tooltip"),
    stats,
    youAnswers: null,
    LINES,
  });
});

document.getElementById("btn-yes").addEventListener("click", () => {
  const stop = LINES[currentLine].stops[currentIndex];

  if (inDetour) {
    answers[stop.detour.id] = true;
    inDetour = false;
    if (stop.detour.switchTo) {
      currentLine = stop.detour.switchTo;
      currentIndex = 0;
      renderStop();
      return;
    }
  } else {
    answers[stop.id] = true;
  }
  advance();
});

document.getElementById("btn-no").addEventListener("click", () => {
  const stop = LINES[currentLine].stops[currentIndex];

  if (inDetour) {
    answers[stop.detour.id] = false;
    inDetour = false;
    exitNode = stop.detour;
    exitLabel = stop.label;
    stopReached = stop.id;
    showResult();
    return;
  }

  answers[stop.id] = false;
  if (stop.detour) {
    inDetour = true;
    renderStop();
    return;
  }

  exitNode = stop;
  exitLabel = stop.label;
  stopReached = stop.id;
  showResult();
});

async function fetchStats() {
  if (!client) return { total: 0, stops: {}, nodes: {} };
  const { data, error } = await client.rpc("get_board_stats");
  if (error || !data) return { total: 0, stops: {}, nodes: {} };
  return { total: data.total || 0, stops: data.stops || {}, nodes: data.nodes || {} };
}

function showResult() {
  showScreen(screens.result);

  const title = document.getElementById("result-title");
  const body = document.getElementById("result-body");
  const line = LINES[currentLine];

  if (stopReached === line.endId) {
    title.textContent = line.endTitle;
    body.textContent = line.endBody;
  } else {
    const where = currentLine === "main" ? "" : ` on the ${line.label.toLowerCase()}`;
    title.textContent = `You got off${where} at: ${exitLabel}`;
    body.textContent = exitNode.question;
  }

  document.getElementById("pdoom-block").hidden = false;
  document.getElementById("tractability-block").hidden = true;
  document.getElementById("sincerity-block").hidden = true;
  document.getElementById("stats-block").hidden = true;
  document.getElementById("btn-restart").hidden = true;
}

const pdoomInput = document.getElementById("pdoom-input");
const pdoomValue = document.getElementById("pdoom-value");
pdoomInput.addEventListener("input", () => {
  pdoomValue.textContent = `${pdoomInput.value}%`;
});

let chosenPdoom = null;
let chosenTractability = null;

document.getElementById("btn-submit-pdoom").addEventListener("click", () => {
  chosenPdoom = Number(pdoomInput.value);
  document.getElementById("pdoom-block").hidden = true;
  document.getElementById("tractability-block").hidden = false;
});

document.querySelectorAll("[data-tractability]").forEach((btn) => {
  btn.addEventListener("click", () => {
    chosenTractability = btn.getAttribute("data-tractability");
    document.getElementById("tractability-block").hidden = true;
    document.getElementById("sincerity-block").hidden = false;
  });
});

document.querySelectorAll("[data-sincerity]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const sincerity = btn.getAttribute("data-sincerity");
    document.getElementById("sincerity-block").hidden = true;

    if (client) {
      await client.from("responses").insert({
        line: currentLine,
        stop_reached: stopReached,
        pdoom: chosenPdoom,
        tractability: chosenTractability,
        ceo_sincerity: sincerity,
        answers,
      });
    }

    const stats = await fetchStats();
    renderStatsLine(stats);
    renderYourStats(stats, sincerity);

    document.getElementById("stats-block").hidden = false;
    document.getElementById("btn-restart").hidden = false;
    document.body.classList.add("wide");

    DoomRail.play({
      canvas: document.getElementById("rail-canvas"),
      tooltip: document.getElementById("rail-tooltip"),
      stats,
      youAnswers: answers,
      LINES,
    });
  });
});

function labelFor(id) {
  if (id === "end") return "All aboard, main line";
  if (id === "end_misuse") return "All aboard, misuse line";
  for (const line of Object.values(LINES)) {
    for (const stop of line.stops) {
      if (stop.id === id) return stop.label;
    }
  }
  return id;
}

// The walk-past view: no ride of your own, so show the whole picture instead.
function renderOverallStats(stats) {
  const wrap = document.getElementById("your-stats");
  wrap.innerHTML = "";
  const total = stats.total || 0;
  const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : "—");

  let pdoomSum = 0;
  let pdoomN = 0;
  let busiest = null;
  const tr = { helps: 0, locked: 0 };
  const si = { sincere: 0, exaggerating: 0, downplaying: 0 };

  for (const [id, s] of Object.entries(stats.stops || {})) {
    if (s.avg_pdoom !== null && s.avg_pdoom !== undefined) {
      pdoomSum += Number(s.avg_pdoom) * s.n;
      pdoomN += s.n;
    }
    tr.helps += (s.tractability || {}).helps || 0;
    tr.locked += (s.tractability || {}).locked || 0;
    si.sincere += (s.sincerity || {}).sincere || 0;
    si.exaggerating += (s.sincerity || {}).exaggerating || 0;
    si.downplaying += (s.sincerity || {}).downplaying || 0;
    if (!busiest || s.n > busiest.n) busiest = { id, n: s.n };
  }

  const trN = tr.helps + tr.locked;
  const siN = si.sincere + si.exaggerating + si.downplaying;

  const cards = [
    { k: "People so far", v: String(total) },
    { k: "Average P(doom)", v: pdoomN ? `${(pdoomSum / pdoomN).toFixed(1)}%` : "—" },
    {
      k: "Busiest stop",
      v: busiest ? labelFor(busiest.id) : "—",
      sub: busiest ? `${busiest.n} people — ${pct(busiest.n, total)} of everyone` : null,
    },
    {
      k: "Everyone says effort…",
      rows: trN
        ? [
            ["still changes the odds", pct(tr.helps, trN)],
            ["is already too late", pct(tr.locked, trN)],
          ]
        : null,
      v: trN ? null : "—",
    },
    {
      k: "Everyone says CEOs are…",
      rows: siN
        ? [
            ["sincere", pct(si.sincere, siN)],
            ["exaggerating", pct(si.exaggerating, siN)],
            ["downplaying", pct(si.downplaying, siN)],
          ]
        : null,
      v: siN ? null : "—",
    },
  ];

  renderCards(wrap, cards);
}

function renderStatsLine(stats) {
  const entry = stats.stops[stopReached];
  const line = document.getElementById("stats-line");
  if (entry && entry.avg_pdoom !== null && entry.avg_pdoom !== undefined) {
    line.textContent = `${stats.total} people have ridden the train. Those who got off at your stop gave an average P(doom) of ${entry.avg_pdoom}%, across ${entry.n} of them.`;
  } else {
    line.textContent = "No average P(doom) is available for your stop yet.";
  }
}

function renderYourStats(stats, sincerity) {
  const wrap = document.getElementById("your-stats");
  wrap.innerHTML = "";
  const entry = stats.stops[stopReached] || {};
  const total = stats.total || 0;
  const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : "—");

  const tr = entry.tractability || {};
  const si = entry.sincerity || {};
  const trN = (tr.helps || 0) + (tr.locked || 0);
  const siN = (si.sincere || 0) + (si.exaggerating || 0) + (si.downplaying || 0);

  const cards = [
    { k: "Your P(doom)", v: `${chosenPdoom}%` },
    {
      k: "Average at your stop",
      v: entry.avg_pdoom === undefined || entry.avg_pdoom === null ? "—" : `${entry.avg_pdoom}%`,
    },
    { k: "Got off where you did", v: entry.n ? `${entry.n}` : "—", sub: entry.n ? `${pct(entry.n, total)} of everyone` : "You are the first" },
    {
      k: "At your stop, effort…",
      rows: trN
        ? [
            ["still changes the odds", pct(tr.helps, trN)],
            ["is already too late", pct(tr.locked, trN)],
          ]
        : null,
      v: trN ? null : "—",
    },
    {
      k: "At your stop, CEOs are…",
      rows: siN
        ? [
            ["sincere", pct(si.sincere, siN)],
            ["exaggerating", pct(si.exaggerating, siN)],
            ["downplaying", pct(si.downplaying, siN)],
          ]
        : null,
      v: siN ? null : "—",
    },
    { k: "You said CEOs are", v: sincerity },
  ];

  renderCards(wrap, cards);
}

function renderCards(wrap, cards) {
  for (const card of cards) {
    const el = document.createElement("div");
    el.className = "stat-card" + (card.rows ? " stat-card--rows" : "");

    const key = document.createElement("span");
    key.className = "k";
    key.textContent = card.k;
    el.appendChild(key);

    if (card.rows) {
      for (const [label, value] of card.rows) {
        const row = document.createElement("div");
        row.className = "stat-row";
        const a = document.createElement("span");
        a.textContent = label;
        const b = document.createElement("span");
        b.className = "stat-row-v";
        b.textContent = value;
        row.append(a, b);
        el.appendChild(row);
      }
    } else {
      const val = document.createElement("span");
      val.className = "v";
      val.textContent = card.v;
      el.appendChild(val);
      if (card.sub) {
        const sub = document.createElement("span");
        sub.className = "sub";
        sub.textContent = card.sub;
        el.appendChild(sub);
      }
    }

    wrap.appendChild(el);
  }
}

document.getElementById("btn-restart").addEventListener("click", () => {
  currentLine = "main";
  currentIndex = 0;
  inDetour = false;
  stopReached = null;
  exitNode = null;
  exitLabel = null;
  chosenPdoom = null;
  chosenTractability = null;
  for (const key of Object.keys(answers)) delete answers[key];
  pdoomInput.value = 20;
  pdoomValue.textContent = "20%";
  document.body.classList.remove("wide");
  showScreen(screens.intro);
});
