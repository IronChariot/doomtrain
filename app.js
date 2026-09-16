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
        question: "Can we build a system with much higher general intelligence than a human, at all?",
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
const visited = [];
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
  document.getElementById("stop-question").textContent = node.question;
  document.getElementById("stop-subtext").textContent = node.subtext;
  showScreen(screens.stop);
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
  visited.length = 0;
  renderStop();
});

document.getElementById("btn-yes").addEventListener("click", () => {
  const stop = LINES[currentLine].stops[currentIndex];
  visited.push({ id: stop.id, label: stop.label });

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
    visited.push({ id: stop.id, label: stop.label });
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
  visited.push({ id: stop.id, label: stop.label });
  showResult();
});

async function fetchStats() {
  if (!client) return {};
  const { data, error } = await client.rpc("get_stop_stats");
  if (error || !data) return {};
  const map = {};
  for (const row of data) {
    map[row.stop_reached] = { n: Number(row.n), avgPdoom: row.avg_pdoom === null ? null : Number(row.avg_pdoom) };
  }
  return map;
}

function renderBreakdown(stats) {
  const container = document.getElementById("result-breakdown");
  container.innerHTML = "";

  const line = LINES[currentLine];
  const rows = visited.slice();
  if (stopReached === line.endId) {
    rows.push({ id: line.endId, label: "All aboard" });
  }

  for (const row of rows) {
    const isCurrent = row.id === stopReached;
    const entry = stats[row.id];

    const name = document.createElement("span");
    name.textContent = isCurrent ? `${row.label} (you)` : row.label;
    const count = document.createElement("span");
    count.textContent = entry ? entry.n : 0;

    const div = document.createElement("div");
    div.className = "breakdown-row" + (isCurrent ? " current" : "");
    div.append(name, count);
    container.appendChild(div);
  }
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

  fetchStats().then((stats) => renderBreakdown(stats));
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
    const entry = stats[stopReached];
    const statsLine = document.getElementById("stats-line");
    if (entry && entry.avgPdoom !== null) {
      statsLine.textContent = `Visitors who got off at your stop gave an average P(doom) of ${entry.avgPdoom}%, across ${entry.n} responses.`;
    } else {
      statsLine.textContent = "No average P(doom) is available for your stop yet.";
    }

    document.getElementById("stats-block").hidden = false;
    document.getElementById("btn-restart").hidden = false;
    renderBreakdown(stats);
  });
});

document.getElementById("btn-restart").addEventListener("click", () => {
  currentLine = "main";
  currentIndex = 0;
  inDetour = false;
  visited.length = 0;
  stopReached = null;
  exitNode = null;
  exitLabel = null;
  chosenPdoom = null;
  chosenTractability = null;
  for (const key of Object.keys(answers)) delete answers[key];
  pdoomInput.value = 20;
  pdoomValue.textContent = "20%";
  showScreen(screens.intro);
});
