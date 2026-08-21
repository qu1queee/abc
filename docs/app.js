const $ = (id) => document.getElementById(id);
const PREFS_KEY = "abc:prefs";
const STAGES = ["upper", "lower", "word", "remember"];

const copy = {
  en: {
    home: "Home",
    hear: "Hear",
    tap: "Tap to hear",
    next: "Next",
    again: "Again",
    which: "Which picture starts with this letter?",
    right: "Yes!",
    wrong: "Try another.",
    done: "You finished the alphabet.",
  },
  es: {
    home: "Inicio",
    hear: "Escuchar",
    tap: "Toca para escuchar",
    next: "Siguiente",
    again: "Otra vez",
    which: "¿Cuál empieza con esta letra?",
    right: "¡Sí!",
    wrong: "Prueba otra.",
    done: "Terminaste el abecedario.",
  },
};

const state = {
  catalog: null,
  lang: "en",
  deck: null,
  queue: [],
  index: 0,
  stage: 0,
  choices: [],
  locked: false,
};

function t(key) {
  return (copy[state.lang] || copy.en)[key];
}

function prefs() {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY) || "{}");
  } catch {
    return {};
  }
}

function savePrefs(extra) {
  localStorage.setItem(PREFS_KEY, JSON.stringify({ ...prefs(), lang: state.lang, ...extra }));
}

function deckFor(lang) {
  return state.catalog.decks.find((d) => d.lang === lang);
}

function currentLetter() {
  return state.queue[state.index];
}

function speak(text) {
  if (!window.speechSynthesis || !text) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = state.lang === "es" ? "es-ES" : "en-US";
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

function hear() {
  const letter = currentLetter();
  if (!letter) return;
  speak(`${letter.name}. ${letter.word}`);
}

function shuffle(items) {
  const copyItems = items.slice();
  for (let i = copyItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyItems[i], copyItems[j]] = [copyItems[j], copyItems[i]];
  }
  return copyItems;
}

function rememberChoices(letter) {
  const others = state.deck.letters.filter((l) => l.id !== letter.id);
  const distractors = shuffle(others).slice(0, 2);
  return shuffle([letter, ...distractors]);
}

function renderRail() {
  const letter = currentLetter();
  $("rail").innerHTML = "";
  for (const item of state.deck.letters) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = item.upper;
    if (letter && item.id === letter.id) btn.classList.add("current");
    btn.addEventListener("click", () => jumpTo(item.id));
    $("rail").append(btn);
  }
}

function renderStages() {
  const letter = currentLetter();
  const labels = [
    letter?.upper || "A",
    letter?.lower || "a",
    letter ? `${letter.upper}${letter.lower}` : "Aa",
    "?",
  ];
  $("stages").innerHTML = "";
  STAGES.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = labels[i];
    btn.setAttribute("aria-label", STAGES[i]);
    if (i === state.stage) btn.classList.add("on");
    btn.addEventListener("click", () => {
      if (!currentLetter()) return;
      state.stage = i;
      showPage();
    });
    $("stages").append(btn);
  });
}

function showPage() {
  const letter = currentLetter();
  const ui = copy[state.lang] || copy.en;
  $("back").textContent = ui.home;
  $("hear").setAttribute("aria-label", ui.hear);
  $("hotspot").setAttribute("aria-label", ui.tap);
  $("next").textContent = ui.next;
  $("again").textContent = ui.again;
  $("feedback").textContent = "";
  $("choices").hidden = true;
  $("choices").innerHTML = "";
  $("art").hidden = true;
  $("word").hidden = true;
  $("hotspot").hidden = false;
  $("page").classList.remove("spread", "quiz", "done");
  state.locked = false;
  $("next").disabled = false;

  if (!letter) {
    $("page").classList.add("done");
    $("glyph").textContent = "★";
    $("sound").textContent = ui.done;
    $("meta").textContent = state.deck.name;
    $("next").disabled = true;
    renderRail();
    renderStages();
    return;
  }

  $("meta").textContent = `${letter.upper}${letter.lower}`;
  const stage = STAGES[state.stage];
  if (stage === "upper") {
    $("glyph").textContent = letter.upper;
    $("sound").textContent = letter.sound;
  } else if (stage === "lower") {
    $("glyph").textContent = letter.lower;
    $("sound").textContent = letter.sound;
  } else if (stage === "word") {
    $("page").classList.add("spread");
    $("hotspot").hidden = true;
    $("art").hidden = false;
    $("art").innerHTML = pictureSVG(letter.picture);
    $("word").hidden = false;
    $("word").textContent = `${letter.upper}${letter.lower}  ${letter.word}`;
    $("sound").textContent = letter.sound;
  } else {
    $("page").classList.add("quiz");
    $("glyph").textContent = letter.upper;
    $("sound").textContent = ui.which;
    $("choices").hidden = false;
    state.choices = rememberChoices(letter);
    for (const choice of state.choices) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.innerHTML = `${pictureSVG(choice.picture)}<span>${choice.word}</span>`;
      btn.addEventListener("click", () => pickChoice(choice.id, btn));
      $("choices").append(btn);
    }
    $("next").disabled = true;
  }
  renderRail();
  renderStages();
}

function throwConfetti(from) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = $("confetti");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  canvas.hidden = false;
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const colors = ["#c45c26", "#2f6f4e", "#e6b422", "#4a7fd4", "#e07a9a", "#fffdf8"];
  const origin = from.getBoundingClientRect();
  const x0 = origin.left + origin.width / 2;
  const y0 = origin.top + origin.height / 2;
  const bits = Array.from({ length: 90 }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI;
    const speed = 6 + Math.random() * 10;
    return {
      x: x0,
      y: y0,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  });
  const started = performance.now();
  function frame(now) {
    const t = (now - started) / 1000;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const bit of bits) {
      bit.vy += 0.28;
      bit.x += bit.vx;
      bit.y += bit.vy;
      bit.rot += bit.vr;
      ctx.save();
      ctx.translate(bit.x, bit.y);
      ctx.rotate(bit.rot);
      ctx.globalAlpha = Math.max(0, 1 - t / 1.2);
      ctx.fillStyle = bit.color;
      ctx.fillRect(-bit.w / 2, -bit.h / 2, bit.w, bit.h);
      ctx.restore();
    }
    if (t < 1.2) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      canvas.hidden = true;
    }
  }
  requestAnimationFrame(frame);
}

function pickChoice(id, btn) {
  if (state.locked) return;
  const letter = currentLetter();
  const ui = copy[state.lang] || copy.en;
  if (id === letter.id) {
    state.locked = true;
    btn.classList.add("right");
    $("feedback").textContent = ui.right;
    $("next").disabled = false;
    throwConfetti(btn);
  } else {
    btn.classList.remove("wrong");
    void btn.offsetWidth;
    btn.classList.add("wrong");
    $("feedback").textContent = ui.wrong;
    queueForLater(letter);
  }
}

function queueForLater(letter) {
  if (!letter) return;
  const later = state.queue.slice(state.index + 1);
  if (later.length && later[later.length - 1].id === letter.id) return;
  state.queue.push(letter);
}

function jumpTo(id) {
  const i = state.deck.letters.findIndex((l) => l.id === id);
  if (i < 0) return;
  state.queue = state.deck.letters.slice();
  state.index = i;
  state.stage = 0;
  savePrefs({ letter: id });
  showPage();
}

function next() {
  const letter = currentLetter();
  if (!letter) return;
  if (state.stage < STAGES.length - 1) {
    state.stage += 1;
    showPage();
    return;
  }
  state.index += 1;
  state.stage = 0;
  savePrefs({ letter: currentLetter()?.id || "" });
  showPage();
}

function again() {
  queueForLater(currentLetter());
  state.stage = 0;
  showPage();
}

function openBook(lang) {
  const deck = deckFor(lang);
  if (!deck) return;
  state.lang = lang;
  state.deck = deck;
  state.queue = deck.letters.slice();
  state.index = 0;
  state.stage = 0;
  const stored = prefs().letter;
  if (stored) {
    const i = state.queue.findIndex((l) => l.id === stored);
    if (i >= 0) state.index = i;
  }
  savePrefs();
  $("home").hidden = true;
  $("book").hidden = false;
  document.documentElement.lang = lang === "es" ? "es" : "en";
  showPage();
}

function goHome() {
  $("book").hidden = true;
  $("home").hidden = false;
}

async function boot() {
  const res = await fetch("data/letters.json", { cache: "no-store" });
  if (!res.ok) throw new Error(`letters.json ${res.status}`);
  state.catalog = await res.json();
  const wanted = new URLSearchParams(location.search).get("lang") || prefs().lang || state.catalog.defaultLang || "en";
  document.querySelectorAll(".lang").forEach((btn) => {
    btn.addEventListener("click", () => openBook(btn.dataset.lang));
  });
  $("back").addEventListener("click", goHome);
  $("hear").addEventListener("click", hear);
  $("next").addEventListener("click", next);
  $("again").addEventListener("click", again);
  $("hotspot").addEventListener("click", () => {
    const letter = currentLetter();
    if (!letter || STAGES[state.stage] === "remember") return;
    speak(letter.name);
  });
  $("art").addEventListener("click", () => {
    const letter = currentLetter();
    if (letter && STAGES[state.stage] === "word") speak(letter.word);
  });
  if (new URLSearchParams(location.search).get("lang")) openBook(wanted);
}

boot().catch((err) => {
  $("home").querySelector(".lede").textContent = err.message;
});
