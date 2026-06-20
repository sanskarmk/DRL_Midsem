/* ===========================================================
   DRL Exam Prep — shared behaviour
   =========================================================== */

/* ---------- MathJax (load from CDN, SVG output = self-contained) ---------- */
window.MathJax = {
  tex: { inlineMath: [['\\(','\\)'],['$','$']], displayMath: [['\\[','\\]'],['$$','$$']], processEscapes:true },
  svg: { fontCache:'global' },
  options:{ skipHtmlTags:['script','noscript','style','textarea','pre','code'] }
};
(function(){
  var s=document.createElement('script');
  s.src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.js';
  s.async=true; s.id='MathJax-script';
  document.head.appendChild(s);
})();

/* ---------- site navigation model ---------- */
const NAV = [
  { h:'Start here', items:[
    ['index.html','🏠','Home / Dashboard',''],
    ['cheatsheet.html','📋','Exam Cheat-Sheet',''],
  ]},
  { h:'Topics — learn the theory', items:[
    ['t1-rl-fundamentals.html','①','RL Fundamentals',''],
    ['t2-bandits.html','②','Multi-Armed Bandits',''],
    ['t3-mdps.html','③','Markov Decision Processes',''],
    ['t4-dynamic-programming.html','④','Dynamic Programming',''],
    ['t5-monte-carlo.html','⑤','Monte Carlo Methods',''],
  ]},
  { h:'Practice & drills', items:[
    ['numericals.html','🔢','Numerical Drills','NEW'],
    ['tools.html','🧮','Interactive Tools',''],
  ]},
  { h:'Solved papers — every question', items:[
    ['s-dec2025.html','📝','Dec 2025 Midsem','NEW'],
    ['s-jan2024.html','📝','Jan 2024 Regular',''],
    ['s-jul2023.html','📝','Jul 2023 (Open Book)',''],
    ['s-jul2024-regular.html','📝','Jul 2024 Regular',''],
    ['s-jul2024-makeup.html','📝','Jul 2024 Makeup',''],
  ]},
];

function buildSidebar(){
  const cur = (location.pathname.split('/').pop()||'index.html');
  let html = `<a class="brand" href="index.html">
      <span class="logo">RL</span>
      <span><b>DRL Exam Prep</b><span>AIMLCZG512 · Midsem</span></span></a>`;
  NAV.forEach(g=>{
    html += `<div class="nav-group"><h4>${g.h}</h4><div class="nav">`;
    g.items.forEach(([href,ic,label,tag])=>{
      const active = (href===cur)?'active':'';
      html += `<a class="${active}" href="${href}"><span class="ic">${ic}</span>${label}${tag?`<span class="tag">${tag}</span>`:''}</a>`;
    });
    html += `</div></div>`;
  });
  const sb=document.querySelector('.sidebar');
  if(sb) sb.innerHTML=html;
}

/* ---------- theme ---------- */
function applyTheme(t){ document.documentElement.setAttribute('data-theme',t);
  try{localStorage.setItem('drl-theme',t)}catch(e){}
  const b=document.querySelector('.theme-btn'); if(b) b.textContent = (t==='dark'?'☀️':'🌙'); }
function initTheme(){ let t='light'; try{t=localStorage.getItem('drl-theme')||'light'}catch(e){} applyTheme(t); }
function toggleTheme(){ const cur=document.documentElement.getAttribute('data-theme'); applyTheme(cur==='dark'?'light':'dark'); }

/* ---------- mobile sidebar ---------- */
function toggleMenu(){ document.querySelector('.sidebar').classList.toggle('open');
  document.querySelector('.scrim').classList.toggle('show'); }
function closeMenu(){ document.querySelector('.sidebar').classList.remove('open');
  document.querySelector('.scrim').classList.remove('show'); }

/* ---------- reveal solutions / generic toggles (event delegation) ---------- */
document.addEventListener('click',function(e){
  const t=e.target.closest('.sol-toggle');
  if(t){ const sol=t.nextElementSibling;
    if(sol&&sol.classList.contains('solution')){
      sol.classList.toggle('open'); t.classList.toggle('open');
      const open=sol.classList.contains('open');
      const lbl=t.querySelector('.lbl-txt'); if(lbl) lbl.textContent= open?'Hide solution':'Show solution';
      if(open&&window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([sol]);
    }
  }
});

/* ---------- quiz engine ---------- */
document.addEventListener('click',function(e){
  const opt=e.target.closest('.qz-opt');
  if(!opt) return;
  const quiz=opt.closest('.quiz'); if(quiz.dataset.done==='1') return;
  const correct = opt.dataset.correct==='1';
  if(correct){ opt.classList.add('correct'); }
  else{ opt.classList.add('wrong');
    // also reveal the correct one
    const c=quiz.querySelector('.qz-opt[data-correct="1"]'); if(c) c.classList.add('correct'); }
  quiz.dataset.done='1';
  const exp=quiz.querySelector('.qz-exp'); if(exp) exp.classList.add('show');
});

/* ---------- reveal-all (for printing / studying) ---------- */
function revealAll(){ document.querySelectorAll('.solution').forEach(s=>s.classList.add('open'));
  document.querySelectorAll('.sol-toggle').forEach(t=>{t.classList.add('open');
    const l=t.querySelector('.lbl-txt'); if(l)l.textContent='Hide solution';});
  if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise();
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded',function(){
  initTheme(); buildSidebar();
  const tb=document.querySelector('.theme-btn'); if(tb) tb.addEventListener('click',toggleTheme);
  const mb=document.querySelector('.menu-btn'); if(mb) mb.addEventListener('click',toggleMenu);
  const sc=document.querySelector('.scrim'); if(sc) sc.addEventListener('click',closeMenu);
  document.querySelectorAll('.sidebar a').forEach(a=>a.addEventListener('click',closeMenu));
});
