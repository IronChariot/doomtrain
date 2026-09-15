const STOPS = [
  {
    id: "danger_in_principle",
    label: "Danger in principle",
    question:
      "If a system had much higher general intelligence than a human, and no special safeguards, could it act against human interests?",
    subtext:
      "This tests two ideas at once: that intelligence and goals are independent, and that almost any goal makes power and self-preservation useful.",
  },
  {
    id: "reachability",
    label: "Reachability",
    question: "Can we build a system with much higher general intelligence than a human, at all?",
    subtext: "Some people expect a hard ceiling on current methods. Other people expect no such ceiling.",
  },
  {
    id: "rate_of_progress",
    label: "Rate of progress",
    question:
      "Is the current rate of AI progress fast enough to reach that point within a few decades, not centuries?",
    subtext:
      "This splits people who accept the idea in principle from people who treat it as a far-future concern.",
  },
  {
    id: "rsi",
    label: "Recursive self-improvement",
    question:
      "Can an AI system meaningfully speed up AI research on itself, once it reaches some capability level?",
    subtext:
      "This is the mechanism behind an intelligence explosion. Some people expect AI research to stay bottlenecked by compute, data, or human judgment.",
  },
  {
    id: "takeoff_speed",
    label: "Takeoff speed",
    question: "If that happens, does capability jump within months or a few years, rather than unfold over many years?",
    subtext: "This sets how much warning time humans and institutions get to react.",
  },
  {
    id: "alignment_tractable",
    label: "Control and alignment",
    question:
      "Is alignment difficult: will we lack reliable methods to align a much smarter system with human intent, in time?",
    subtext:
      "People who expect alignment methods to keep pace with capability gains usually get off here, since a solved alignment problem breaks the rest of the chain.",
  },
  {
    id: "competitive_dynamics",
    label: "Competitive dynamics",
    question:
      "Even if some labs or countries act with caution, will competition force someone to deploy an unsafe system anyway?",
    subtext: "This crux is about incentives and coordination, not about technology.",
  },
  {
    id: "magnitude",
    label: "Magnitude of outcome",
    question:
      "Will superintelligent AI be able to cause human extinction or permanent civilizational collapse, if misaligned?",
    subtext: "Some people accept every earlier stop but still expect a bad-but-survivable outcome.",
  },
  {
    id: "tractability",
    label: "Tractability of action",
    question:
      "Is the outcome essentially locked in now, regardless of any safety research, regulation, or coordination?",
    subtext:
      "People who think effort still changes the odds usually get off here, holding the risk as real but not hopeless.",
  },
];

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

let currentIndex = 0;
const answers = {};
let stopReached = null;

function showScreen(next) {
  document.querySelectorAll(".screen.active").forEach((el) => {
    if (el !== next) el.classList.remove("active");
  });
  next.classList.remove("active");
  void next.offsetWidth;
  next.classList.add("active");
}

function renderStop() {
  const stop = STOPS[currentIndex];
  document.getElementById("stop-index").textContent = `Stop ${currentIndex + 1} of ${STOPS.length} — ${stop.label}`;
  document.getElementById("stop-question").textContent = stop.question;
  document.getElementById("stop-subtext").textContent = stop.subtext;
  showScreen(screens.stop);
}

document.getElementById("btn-start").addEventListener("click", () => {
  currentIndex = 0;
  renderStop();
});

document.getElementById("btn-yes").addEventListener("click", () => {
  answers[STOPS[currentIndex].id] = true;
  if (currentIndex === STOPS.length - 1) {
    stopReached = "end";
    showResult();
  } else {
    currentIndex += 1;
    renderStop();
  }
});

document.getElementById("btn-no").addEventListener("click", () => {
  const stop = STOPS[currentIndex];
  answers[stop.id] = false;
  stopReached = stop.id;
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

  const rows = STOPS.map((stop) => ({ id: stop.id, label: stop.label }));
  rows.push({ id: "end", label: "All aboard" });

  const visibleRows =
    stopReached === "end" ? rows : rows.slice(0, STOPS.findIndex((s) => s.id === stopReached) + 1);

  for (const row of visibleRows) {
    const entry = stats[row.id];
    const div = document.createElement("div");
    div.className = "breakdown-row" + (row.id === stopReached ? " current" : "");
    const count = entry ? entry.n : 0;
    div.innerHTML = `<span>${row.label}${row.id === stopReached ? " (you)" : ""}</span><span>${count}</span>`;
    container.appendChild(div);
  }
}

function showResult() {
  showScreen(screens.result);

  const title = document.getElementById("result-title");
  const body = document.getElementById("result-body");

  if (stopReached === "end") {
    title.textContent = "All aboard. You reached the end of the line.";
    body.textContent = "You agreed with every stop on the train, from danger in principle through tractability of action.";
  } else {
    const stop = STOPS.find((s) => s.id === stopReached);
    title.textContent = `You got off at: ${stop.label}`;
    body.textContent = stop.question;
  }

  document.getElementById("pdoom-block").hidden = false;
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

document.getElementById("btn-submit-pdoom").addEventListener("click", () => {
  chosenPdoom = Number(pdoomInput.value);
  document.getElementById("pdoom-block").hidden = true;
  document.getElementById("sincerity-block").hidden = false;
});

document.querySelectorAll("[data-sincerity]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const sincerity = btn.getAttribute("data-sincerity");
    document.getElementById("sincerity-block").hidden = true;

    if (client) {
      await client.from("responses").insert({
        stop_reached: stopReached,
        pdoom: chosenPdoom,
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
  currentIndex = 0;
  stopReached = null;
  chosenPdoom = null;
  for (const key of Object.keys(answers)) delete answers[key];
  pdoomInput.value = 20;
  pdoomValue.textContent = "20%";
  showScreen(screens.intro);
});
