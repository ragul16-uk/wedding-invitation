const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const splash = document.getElementById("splash");
const splashBtn = document.getElementById("splashBtn");

/* ── Splash open ── */
splashBtn.addEventListener("click", () => {
  splash.classList.add("hide");
  music.play().then(() => {
    musicToggle.classList.add("playing");
    musicToggle.textContent = "❚❚";
  }).catch(() => {});
  setTimeout(() => splash.remove(), 900);
});

/* ── Music toggle ── */
musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicToggle.classList.add("playing");
    musicToggle.textContent = "❚❚";
  } else {
    music.pause();
    musicToggle.classList.remove("playing");
    musicToggle.textContent = "♪";
  }
});

/* ══════════════════════════════════════
   FLOATING HEARTS CANVAS
══════════════════════════════════════ */
const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener("resize", resize);

const HEART_COUNT = 28;
const hearts = [];

function heartPath(ctx, x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);
  ctx.beginPath();
  ctx.moveTo(0, -0.3);
  ctx.bezierCurveTo(0, -1, -1.4, -1, -1.4, 0.1);
  ctx.bezierCurveTo(-1.4, 0.9, 0, 1.4, 0, 1.4);
  ctx.bezierCurveTo(0, 1.4, 1.4, 0.9, 1.4, 0.1);
  ctx.bezierCurveTo(1.4, -1, 0, -1, 0, -0.3);
  ctx.closePath();
  ctx.restore();
}

function randomHeart() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    size: 4 + Math.random() * 10,
    speed: 0.4 + Math.random() * 0.8,
    drift: (Math.random() - 0.5) * 0.4,
    opacity: 0.15 + Math.random() * 0.45,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.01 + Math.random() * 0.02,
    color: Math.random() > 0.5 ? "#e8a0b0" : "#c9a45a",
  };
}

for (let i = 0; i < HEART_COUNT; i++) {
  const h = randomHeart();
  h.y = Math.random() * canvas.height;
  hearts.push(h);
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => {
    h.y -= h.speed;
    h.wobble += h.wobbleSpeed;
    h.x += Math.sin(h.wobble) * h.drift;

    ctx.globalAlpha = h.opacity;
    ctx.fillStyle = h.color;
    heartPath(ctx, h.x, h.y, h.size);
    ctx.fill();

    if (h.y < -20) Object.assign(h, randomHeart());
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateHearts);
}
animateHearts();

/* ══════════════════════════════════════
   FIREFLY SPARKLES on hero
══════════════════════════════════════ */
const hero = document.querySelector(".hero");
function spawnFirefly() {
  const el = document.createElement("span");
  el.className = "firefly";
  el.style.cssText = `
    left:${Math.random()*100}%;
    top:${Math.random()*100}%;
    width:${2+Math.random()*3}px;
    height:${2+Math.random()*3}px;
    animation-duration:${2+Math.random()*3}s;
    animation-delay:${Math.random()*4}s;
  `;
  hero.appendChild(el);
  setTimeout(() => el.remove(), 6000);
}
setInterval(spawnFirefly, 300);

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
const revealEls = document.querySelectorAll(".quote, .events, .location, .rsvp, footer, .event-card");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("revealed");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => { el.classList.add("reveal"); observer.observe(el); });

/* ══════════════════════════════════════
   SPLASH PETALS
══════════════════════════════════════ */
const splashEl = document.getElementById("splash");
if (splashEl) {
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.cssText = `
      left:${Math.random()*100}%;
      animation-duration:${4+Math.random()*5}s;
      animation-delay:${Math.random()*4}s;
      font-size:${10+Math.random()*14}px;
      opacity:${0.3+Math.random()*0.5};
    `;
    p.textContent = ["🌸","🌺","✿","❀","🌹"][Math.floor(Math.random()*5)];
    splashEl.appendChild(p);
  }
}
