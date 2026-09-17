// Animated rail map of every journey through the Doom Train.
// Dots are synthetic: their numbers come from real aggregate counts, so no
// individual response is ever read or replayed.

(function () {
  const VW = 1000;
  const VH = 470;
  const MAIN_Y = 190;
  const DETOUR_Y = 95;
  const MISUSE_Y = 355;
  const MISUSE_DETOUR_Y = 440;
  const SWITCH_Y = 272;

  const MAIN_X = [130, 218, 306, 394, 482, 570, 658, 746];
  const MISUSE_X = [262, 350, 438, 526, 614, 702];

  const START = { x: 55, y: MAIN_Y };
  const END_MAIN = { x: 850, y: MAIN_Y };
  const END_MISUSE = { x: 800, y: MISUSE_Y };

  // Station areas are proportional to how many people got off there. The
  // busiest station is 2.5x the standard diameter; everything scales from it.
  const STD_DIAMETER = 16;
  const MAX_DIAMETER = STD_DIAMETER * 2.5;
  const ELBOW = 24;

  const COLORS = {
    rail: "#2b3037",
    railInner: "#3d444d",
    main: "#5b9dfb",
    misuse: "#b779f5",
    detour: "#f0a838",
    end: "#39d07f",
    you: "#e0463f",
    dot: "#ffffff",
  };

  let layout = null;
  let graph = null;
  let meta = null;

  function buildLayout(LINES) {
    const pos = {};
    const g = { main: [], misuse: [] };
    const m = {};

    LINES.main.stops.forEach((stop, i) => {
      pos[stop.id] = { x: MAIN_X[i], y: MAIN_Y, kind: "stop", line: "main" };
      m[stop.id] = { label: stop.label, question: stop.question };
      g.main.push({ id: stop.id, detour: stop.detour && stop.detour.id, switchTo: stop.detour && stop.detour.switchTo });
      if (stop.detour) {
        m[stop.detour.id] = { label: stop.detour.label, question: stop.detour.question };
        // The apex sits directly above the stop you get off at if you say no.
        pos[stop.detour.id] = {
          x: MAIN_X[i],
          y: stop.detour.switchTo ? SWITCH_Y : DETOUR_Y,
          kind: "detour",
          line: "main",
          parent: stop.id,
        };
      }
    });

    LINES.misuse.stops.forEach((stop, i) => {
      pos[stop.id] = { x: MISUSE_X[i], y: MISUSE_Y, kind: "stop", line: "misuse" };
      m[stop.id] = { label: stop.label, question: stop.question };
      g.misuse.push({ id: stop.id, detour: stop.detour && stop.detour.id });
      if (stop.detour) {
        m[stop.detour.id] = { label: stop.detour.label, question: stop.detour.question };
        pos[stop.detour.id] = {
          x: MISUSE_X[i],
          y: MISUSE_DETOUR_Y,
          kind: "detour",
          line: "misuse",
          parent: stop.id,
        };
      }
    });

    pos.end = { x: END_MAIN.x, y: END_MAIN.y, kind: "end", line: "main" };
    pos.end_misuse = { x: END_MISUSE.x, y: END_MISUSE.y, kind: "end", line: "misuse" };
    m.end = { label: "All aboard", question: "You agreed with every stop on the main line." };
    m.end_misuse = { label: "All aboard, misuse line", question: "You agreed with every stop on the misuse line." };

    layout = pos;
    graph = g;
    meta = m;
  }

  // Plain rails, plus the detour elbows drawn separately in amber.
  function buildRails() {
    const rails = [];
    const elbows = [];
    const chain = (ids) => {
      for (let i = 0; i < ids.length - 1; i++) rails.push([layout[ids[i]], layout[ids[i + 1]]]);
    };

    const mainIds = graph.main.map((s) => s.id);
    rails.push([START, layout[mainIds[0]]]);
    chain(mainIds);
    rails.push([layout[mainIds[mainIds.length - 1]], layout.end]);

    const misuseIds = graph.misuse.map((s) => s.id);
    chain(misuseIds);
    rails.push([layout[misuseIds[misuseIds.length - 1]], layout.end_misuse]);

    const addDetour = (stopId, detourId, nextId) => {
      const a = layout[stopId];
      const apex = layout[detourId];
      const b = layout[nextId];
      rails.push([a, apex], [apex, b]);
      elbows.push({ a, apex, b });
    };

    graph.main.forEach((s, i) => {
      if (!s.detour) return;
      const next = s.switchTo ? graph.misuse[0].id : graph.main[i + 1] && graph.main[i + 1].id;
      if (next) addDetour(s.id, s.detour, next);
    });
    graph.misuse.forEach((s, i) => {
      if (!s.detour) return;
      const next = graph.misuse[i + 1] && graph.misuse[i + 1].id;
      if (next) addDetour(s.id, s.detour, next);
    });

    return { rails, elbows };
  }

  // Split a group of journeys at each node using the real yes/no counts, so the
  // flow along every rail matches the recorded data.
  function buildJourneys(total, nodeStats) {
    const all = [];
    for (let i = 0; i < total; i++) all.push({ path: [], exit: null, end: null });

    function ratio(id) {
      const s = nodeStats[id];
      if (!s) return 1;
      const seen = (s.yes || 0) + (s.no || 0);
      return seen ? s.yes / seen : 1;
    }

    function walk(group, line, idx) {
      if (!group.length) return;
      const stops = graph[line];
      const stop = stops[idx];
      group.forEach((j) => j.path.push(stop.id));

      const yesCount = Math.round(group.length * ratio(stop.id));
      const yesGroup = group.slice(0, yesCount);
      const noGroup = group.slice(yesCount);

      if (noGroup.length) {
        if (stop.detour) {
          noGroup.forEach((j) => j.path.push(stop.detour));
          const dYes = Math.round(noGroup.length * ratio(stop.detour));
          const rejoin = noGroup.slice(0, dYes);
          noGroup.slice(dYes).forEach((j) => (j.exit = stop.id));
          if (rejoin.length) {
            if (stop.switchTo) walk(rejoin, stop.switchTo, 0);
            else if (idx === stops.length - 1) rejoin.forEach((j) => (j.end = line));
            else walk(rejoin, line, idx + 1);
          }
        } else {
          noGroup.forEach((j) => (j.exit = stop.id));
        }
      }

      if (yesGroup.length) {
        if (idx === stops.length - 1) yesGroup.forEach((j) => (j.end = line));
        else walk(yesGroup, line, idx + 1);
      }
    }

    walk(all, "main", 0);
    return all;
  }

  function routeFromAnswers(answers) {
    const path = [];
    let line = "main";
    let idx = 0;
    for (;;) {
      const stops = graph[line];
      const stop = stops[idx];
      path.push(stop.id);
      const yes = answers[stop.id];
      if (yes === undefined) return { path, exit: stop.id, end: null };
      if (!yes) {
        if (!stop.detour) return { path, exit: stop.id, end: null };
        path.push(stop.detour);
        if (!answers[stop.detour]) return { path, exit: stop.id, end: null };
        if (stop.switchTo) {
          line = stop.switchTo;
          idx = 0;
          continue;
        }
      }
      if (idx === stops.length - 1) return { path, exit: null, end: line };
      idx += 1;
    }
  }

  function waypoints(journey) {
    const pts = [START];
    journey.path.forEach((id) => pts.push(layout[id]));
    if (journey.exit) {
      const p = layout[journey.exit];
      pts.push({ x: p.x, y: p.y + (p.line === "misuse" ? -56 : 56) });
    } else if (journey.end) {
      pts.push(journey.end === "misuse" ? layout.end_misuse : layout.end);
    }
    return pts;
  }

  function pathLength(pts) {
    let total = 0;
    for (let i = 0; i < pts.length - 1; i++) total += Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
    return total;
  }

  // Position along the path, plus the unit direction of travel there, so dots
  // can sway across the rail rather than along it.
  function pointAt(pts, dist) {
    let remaining = dist;
    for (let i = 0; i < pts.length - 1; i++) {
      const dx = pts[i + 1].x - pts[i].x;
      const dy = pts[i + 1].y - pts[i].y;
      const seg = Math.hypot(dx, dy);
      if (remaining <= seg) {
        const t = seg ? remaining / seg : 0;
        return {
          x: pts[i].x + dx * t,
          y: pts[i].y + dy * t,
          dx: seg ? dx / seg : 1,
          dy: seg ? dy / seg : 0,
        };
      }
      remaining -= seg;
    }
    const last = pts[pts.length - 1];
    const prev = pts[pts.length - 2] || last;
    const dx = last.x - prev.x;
    const dy = last.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: last.x, y: last.y, dx: dx / len, dy: dy / len };
  }

  function towards(from, to, dist) {
    const d = Math.hypot(to.x - from.x, to.y - from.y) || 1;
    return { x: from.x + ((to.x - from.x) / d) * dist, y: from.y + ((to.y - from.y) / d) * dist };
  }

  function stationColor(id) {
    const p = layout[id];
    if (!p) return COLORS.dot;
    if (p.kind === "end") return COLORS.end;
    return p.line === "misuse" ? COLORS.misuse : COLORS.main;
  }

  let raf = null;

  function play(opts) {
    const { canvas, tooltip, stats, youAnswers, LINES, formatPdoom } = opts;
    if (raf) cancelAnimationFrame(raf);
    buildLayout(LINES);

    const nodeStats = stats.nodes || {};
    const stopStats = stats.stops || {};
    const total = stats.total || 0;
    const { rails, elbows } = buildRails();

    const stations = Object.entries(layout).filter(([, p]) => p.kind !== "detour");
    const maxExit = Math.max(1, ...stations.map(([id]) => (stopStats[id] && stopStats[id].n) || 0));

    const journeys = buildJourneys(total, nodeStats);
    const you = youAnswers ? routeFromAnswers(youAnswers) : null;

    const SPEED = 118;
    const dots = journeys.map((j, i) => {
      const pts = waypoints(j);
      return {
        pts,
        len: pathLength(pts),
        delay: (i / Math.max(1, total)) * 2600 + Math.random() * 900,
        speed: SPEED * (0.9 + Math.random() * 0.2),
        swayAmp: 0.35 + Math.random() * 0.65,
        swayRate: 1.4 + Math.random() * 2.6,
        swayPhase: Math.random() * Math.PI * 2,
        exit: j.exit,
        end: j.end,
        counted: false,
      };
    });

    let youDot = null;
    if (you) {
      const youPts = waypoints(you);
      youDot = { pts: youPts, len: pathLength(youPts), delay: 1400, speed: SPEED };
    }

    const counts = {};
    stations.forEach(([id]) => (counts[id] = 0));

    const ctx = canvas.getContext("2d");
    let scale = 1;
    let dpr = 1;
    let railHalf = 3.5;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = rect.width / VW;
      railHalf = Math.max(5, 7 * scale) / 2;
    }
    const sx = (x) => x * scale;
    const sy = (y) => y * scale;

    // Screen radius, area proportional to how many have arrived so far. Every
    // station starts at a single pixel and grows as its dots land.
    function stationRadius(id) {
      const n = counts[id] || 0;
      return Math.max(0.5, (MAX_DIAMETER / 2) * Math.sqrt(n / maxExit) * scale);
    }

    function drawRails() {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = COLORS.rail;
      ctx.lineWidth = Math.max(5, 7 * scale);
      rails.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(sx(a.x), sy(a.y));
        ctx.lineTo(sx(b.x), sy(b.y));
        ctx.stroke();
      });
      ctx.strokeStyle = COLORS.railInner;
      ctx.lineWidth = Math.max(1, 2 * scale);
      rails.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(sx(a.x), sy(a.y));
        ctx.lineTo(sx(b.x), sy(b.y));
        ctx.stroke();
      });

      // Amber elbow marking each detour, in place of a station dot.
      ctx.strokeStyle = COLORS.detour;
      ctx.lineWidth = Math.max(3, 5 * scale);
      elbows.forEach(({ a, apex, b }) => {
        const p1 = towards(apex, a, ELBOW);
        const p2 = towards(apex, b, ELBOW);
        ctx.beginPath();
        ctx.moveTo(sx(p1.x), sy(p1.y));
        ctx.lineTo(sx(apex.x), sy(apex.y));
        ctx.lineTo(sx(p2.x), sy(p2.y));
        ctx.stroke();
      });
    }

    function drawStations() {
      stations.forEach(([id, p]) => {
        const r = stationRadius(id);
        ctx.beginPath();
        ctx.arc(sx(p.x), sy(p.y), r, 0, Math.PI * 2);
        ctx.fillStyle = stationColor(id);
        ctx.fill();
        if (r > 3) {
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#0b0c0e";
          ctx.stroke();
        }
        if (counts[id] > 0) {
          ctx.fillStyle = "#eceef0";
          ctx.font = `600 ${Math.max(10, 12 * scale)}px system-ui, sans-serif`;
          ctx.textAlign = "center";
          const below = p.line !== "misuse";
          ctx.fillText(String(counts[id]), sx(p.x), sy(p.y) + (below ? r + 18 : -r - 10));
        }
      });
    }

    let startTime = null;
    let done = false;

    function frame(ts) {
      if (startTime === null) startTime = ts;
      const t = ts - startTime;
      resize();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawRails();

      let moving = 0;
      ctx.fillStyle = COLORS.dot;
      dots.forEach((d) => {
        const dt = t - d.delay;
        if (dt < 0) return;
        const travelled = (dt / 1000) * d.speed;
        if (travelled >= d.len) {
          if (!d.counted) {
            d.counted = true;
            const key = d.exit || (d.end === "misuse" ? "end_misuse" : "end");
            counts[key] = (counts[key] || 0) + 1;
          }
          return;
        }
        moving += 1;
        const p = pointAt(d.pts, travelled);
        // Sway across the rail, never along it, and never past the rail edge.
        const sway = Math.sin((t / 1000) * d.swayRate + d.swayPhase) * d.swayAmp * railHalf;
        const px = sx(p.x) - p.dy * sway;
        const py = sy(p.y) + p.dx * sway;
        // A whole pixel on the device grid: an arc this small antialiases into
        // grey instead of staying white.
        ctx.fillRect(Math.round(px * dpr) / dpr, Math.round(py * dpr) / dpr, 1, 1);
      });

      drawStations();

      const ydt = youDot ? t - youDot.delay : -1;
      if (youDot && ydt >= 0) {
        const travelled = Math.min(youDot.len, (ydt / 1000) * youDot.speed);
        const p = pointAt(youDot.pts, travelled);

        // The exit drop is in virtual units but the counter sits at a fixed
        // pixel offset, so on a narrow canvas they collide. Keep clear of it.
        let py = sy(p.y);
        if (you.exit) {
          const st = layout[you.exit];
          const clear = sy(st.y) + (stationRadius(you.exit) + 26) * (st.line === "misuse" ? -1 : 1);
          py = st.line === "misuse" ? Math.min(py, clear) : Math.max(py, clear);
        }

        ctx.beginPath();
        ctx.arc(sx(p.x), py, Math.max(3.5, 4.5 * scale), 0, Math.PI * 2);
        ctx.fillStyle = COLORS.you;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#0b0c0e";
        ctx.stroke();
        ctx.fillStyle = COLORS.you;
        ctx.font = `700 ${Math.max(10, 12 * scale)}px system-ui, sans-serif`;
        ctx.textAlign = "left";
        ctx.fillText("YOU", sx(p.x) + 11, py - 10);
      }

      if (moving === 0 && t > 3000 && !done) {
        done = true;
        Object.entries(stopStats).forEach(([id, s]) => {
          if (counts[id] !== undefined) counts[id] = s.n;
        });
        drawStations();
      }
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    // --- hover ---
    const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : "—");

    function tooltipFor(id) {
      const info = meta[id] || {};
      const n = nodeStats[id];
      const s = stopStats[id];
      const parts = [`<strong>${info.label || id}</strong>`];
      if (info.question) parts.push(`<em>${info.question}</em>`);
      if (n) {
        const seen = (n.yes || 0) + (n.no || 0);
        parts.push(`Reached by ${seen} — ${pct(n.yes, seen)} yes, ${pct(n.no, seen)} no`);
      }
      if (s) {
        parts.push(
          `<span class="tt-rule"></span>Got off here: ${s.n} (${pct(s.n, total)} of everyone)` +
            `<br>Average P(doom): ${formatPdoom ? formatPdoom(s.avg_pdoom) : s.avg_pdoom + "%"}`
        );
        const tr = s.tractability || {};
        const si = s.sincerity || {};
        const trN = (tr.helps || 0) + (tr.locked || 0);
        const siN = (si.sincere || 0) + (si.exaggerating || 0) + (si.downplaying || 0);
        if (trN) parts.push(`Effort helps: ${pct(tr.helps, trN)} · Locked in: ${pct(tr.locked, trN)}`);
        if (siN)
          parts.push(
            `CEOs: ${pct(si.sincere, siN)} sincere · ${pct(si.exaggerating, siN)} exaggerating · ${pct(
              si.downplaying,
              siN
            )} downplaying`
          );
      }
      return parts.join("<br>");
    }

    function onMove(ev) {
      const rect = canvas.getBoundingClientRect();
      const mx = ev.clientX - rect.left;
      const my = ev.clientY - rect.top;

      let hit = null;
      let best = Infinity;
      Object.entries(layout).forEach(([id, p]) => {
        const reach = p.kind === "detour" ? 16 : Math.max(15, stationRadius(id) + 6);
        const d = Math.hypot(sx(p.x) - mx, sy(p.y) - my);
        if (d < reach && d < best) {
          best = d;
          hit = id;
        }
      });

      if (!hit) {
        tooltip.hidden = true;
        canvas.style.cursor = "default";
        return;
      }
      canvas.style.cursor = "pointer";
      tooltip.innerHTML = tooltipFor(hit);
      tooltip.hidden = false;

      const tw = tooltip.offsetWidth;
      const th = tooltip.offsetHeight;
      // Flip above the cursor when there is no room below.
      const below = my + 18 + th <= rect.height;
      tooltip.style.left = `${Math.max(4, Math.min(rect.width - tw - 4, mx - tw / 2))}px`;
      tooltip.style.top = `${below ? my + 18 : my - 18 - th}px`;
    }

    canvas.onmousemove = onMove;
    canvas.onmouseleave = () => (tooltip.hidden = true);
  }

  window.DoomRail = { play };
})();
