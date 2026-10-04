// Diagnosis runs only on pages containing the quiz.
if (document.getElementById("quiz") && document.getElementById("restart")) {

const questions = [
  {text:"挨拶をしても、返事がないことがありますか？", cat:"c", reverse:true},
  {text:"Teamsやメールを送っても、反応がないことがありますか？", cat:"c", reverse:true},
  {text:"「ありがとう」「助かりました」が少ないと感じますか？", cat:"c", reverse:true},
  {text:"管理職の機嫌で、職場の雰囲気が変わることがありますか？", cat:"c", reverse:true},
  {text:"同じ内容をExcelやシステムへ何度も入力していますか？", cat:"i", reverse:true},
  {text:"定型作業にAIや自動化を使える環境がありますか？", cat:"i", reverse:false},
  {text:"必要な情報を探すのに時間がかかることがありますか？", cat:"i", reverse:true},
  {text:"紙や手作業にしかない業務が多く残っていますか？", cat:"i", reverse:true},
  {text:"誰がやるのか曖昧な仕事が多いですか？", cat:"f", reverse:true},
  {text:"同じ確認や手戻りが繰り返されることがありますか？", cat:"f", reverse:true},
  {text:"業務の手順が、人によって大きく違いますか？", cat:"f", reverse:true},
  {text:"小さな改善提案を試しやすい職場ですか？", cat:"f", reverse:false}
];

let index = 0;
let scores = {c:0,i:0,f:0};
const qText = document.getElementById("questionText");
const pText = document.getElementById("progressText");
const pBar = document.getElementById("progressBar");

function renderQuestion(){
  qText.textContent = questions[index].text;
  pText.textContent = `QUESTION ${index+1} / ${questions.length}`;
  pBar.style.width = `${((index+1)/questions.length)*100}%`;
}
function norm(v, reverse){ return reverse ? (2-v) : v; }

document.querySelectorAll(".answers button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const q = questions[index];
    scores[q.cat] += norm(Number(btn.dataset.value), q.reverse);
    index++;
    if(index < questions.length){
      renderQuestion();
    } else {
      showResult();
    }
  });
});

function pct(raw){ return Math.round(raw / 8 * 100); }

function showResult(){
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  const c = pct(scores.c), i = pct(scores.i), f = pct(scores.f);
  const total = Math.round((c+i+f)/3);

  document.getElementById("totalScore").textContent = total;
  document.getElementById("civilityScore").textContent = c;
  document.getElementById("itScore").textContent = i;
  document.getElementById("flowScore").textContent = f;
  document.getElementById("civilityBar").style.width = c+"%";
  document.getElementById("itBar").style.width = i+"%";
  document.getElementById("flowBar").style.width = f+"%";

  let title, lead;
  if(total >= 80){ title="かなりキラキラしています。"; lead="働きやすさの土台が整っています。小さな改善を継続すると、さらに強い職場になりそうです。"; }
  else if(total >= 60){ title="あと少しで、もっとキラキラ。"; lead="大きな問題より、小さな摩擦が残っていそうです。ひとつずつ整える余地があります。"; }
  else if(total >= 40){ title="ちょっと曇り気味かも。"; lead="人・IT・業務のどこかに、日常的な摩擦がありそうです。まず一番低い領域から改善してみましょう。"; }
  else { title="キラキラ不足です。"; lead="職場の仕組みやコミュニケーションに改善余地がありそうです。大改革より、小さな一歩から始めましょう。"; }

  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultLead").textContent = lead;

  const min = Math.min(c,i,f);
  let action;
  if(min === c) action="まずは「挨拶への返答」「ありがとう」「リアクション」のどれか1つを増やしてみる。";
  else if(min === i) action="毎週繰り返している手作業を1つ選び、AI・Excel・自動化で減らせないか考えてみる。";
  else action="担当・手順・完了条件が曖昧な仕事を1つ選び、見える化してみる。";
  document.getElementById("firstAction").textContent = action;
}

document.getElementById("restart").addEventListener("click",()=>{
  index=0; scores={c:0,i:0,f:0};
  document.getElementById("result").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  renderQuestion();
});
renderQuestion();



}

// Animated research statistics
(function () {
  const stats = document.querySelectorAll(".animated-stat");
  if (!stats.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function renderStat(el, value) {
    const suffix = el.dataset.suffix || "";
    const display = value < 0 ? "−" + Math.abs(value) : String(value);
    const span = el.querySelector("span");
    if (span) {
      el.childNodes[0].nodeValue = display;
      span.textContent = suffix;
    } else {
      el.textContent = display + suffix;
    }
  }

  function animateStat(el) {
    if (el.dataset.animated === "true") return;
    el.dataset.animated = "true";

    const start = Number(el.dataset.start || 0);
    const target = Number(el.dataset.target || 0);

    if (reduceMotion) {
      renderStat(el, target);
      return;
    }

    const duration = 1250;
    const started = performance.now();

    function tick(now) {
      const progress = Math.min((now - started) / duration, 1);
      // Smooth ease-out, so the final number lands gently
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(start + (target - start) * eased);
      renderStat(el, value);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        renderStat(el, target);
        el.classList.add("stat-finished");
      }
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.45 });

  stats.forEach((el) => observer.observe(el));
})();


// Click-to-enlarge lightbox for synergy figures
(function () {
  const triggers = document.querySelectorAll('.figure-zoom-trigger');
  const lightbox = document.getElementById('figureLightbox');
  const lightboxImage = document.getElementById('figureLightboxImage');
  const closeButton = document.getElementById('figureLightboxClose');
  if (!triggers.length || !lightbox || !lightboxImage || !closeButton) return;

  let lastTrigger = null;

  function openLightbox(src, alt, trigger) {
    lastTrigger = trigger || null;
    lightboxImage.src = src;
    lightboxImage.alt = alt || '';
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    document.body.classList.remove('lightbox-open');
    if (lastTrigger) lastTrigger.focus();
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openLightbox(trigger.dataset.fullsrc, trigger.dataset.alt, trigger);
    });
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-close-lightbox')) closeLightbox();
  });
  closeButton.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (event) => {
    if (!lightbox.hidden && event.key === 'Escape') closeLightbox();
  });
})();
