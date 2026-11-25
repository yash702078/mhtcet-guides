/* Free 10-minute expert guidance: booking prompts on every page that loads it (Yash Aradhye, 25 Nov 2026).
 * Loaded site-wide from /mhtcet-cutoff-explorer/assets/site-config.js. Edit only this file (repo mhtcet-guides/assets).
 * Adds: (1) a contextual card after the first data table, (2) a card before the FAQs / at the end of the article,
 *       (3) on desktop, a small floating "Free 10-min guidance" button bottom-left after some scrolling.
 * Skips: the booking page itself, and inline cards on pages without an <article>/<main> (e.g. homepage gets only the floating button).
 * Tracking: dataLayer event 'consult_cta_click' {cta_position}; link carries ?from=<page> so the Bookings sheet shows the source. */
(function (w, d) {
  if (w.__yaCC) return; w.__yaCC = true;
  var URL = '/guides/free-10-minute-mht-cet-consultation.html';
  var path = location.pathname;
  if (path.indexOf('free-10-minute-mht-cet-consultation') >= 0) return;

  var mr = /\/mr\//.test(path) || (d.documentElement.lang || '').indexOf('mr') === 0;
  var p = path.toLowerCase();
  var T = mr ? {
    h: 'तुम्हाला नक्की कोणते कॉलेज मिळेल? मोफत तज्ज्ञ मार्गदर्शन घ्या',
    s: 'यश आराध्ये यांच्या टीमसोबत 10 मिनिटांचा मोफत Google Meet: तुमचा percentile, category आणि पुढची पायरी.',
    b: 'मोफत 10 मिनिटांचे मार्गदर्शन बुक करा', f: 'मोफत 10-मिनिट मार्गदर्शन'
  } : /cutoff|percentile|colleges-for|-vs-|college\//.test(p) ? {
    h: 'Not sure which of these colleges you can really get?',
    s: "Get a free 10-minute expert check of your percentile, category and options with Yash Aradhye's team on Google Meet."
  } : /freeze|betterment|spot|option|cap-|round|document|admission-process|tfws|ews|sebc|girls/.test(p) ? {
    h: 'Stuck on a CAP or admission decision?',
    s: "Talk it through in a free 10-minute Google Meet with Yash Aradhye's team and leave with a clear next step."
  } : /2027|exam|registration|jee|josaa|syllabus|attempt/.test(p) ? {
    h: 'Planning for MHT-CET 2027?',
    s: "Get free expert guidance on your exam plan, target colleges and documents in a 10-minute Google Meet."
  } : {
    h: 'Confused about your engineering admission?',
    s: "Get free expert guidance from Yash Aradhye's team in a 10-minute Google Meet."
  };
  T.b = T.b || 'Book free 10-min expert guidance';
  T.f = T.f || 'Free 10-min expert guidance';

  var css = '.ya-cc{display:flex;gap:.9rem;align-items:center;flex-wrap:wrap;background:linear-gradient(135deg,#0f2457,#2748d8);color:#fff;border-radius:18px;padding:1rem 1.1rem;margin:1.3rem 0;box-shadow:0 14px 34px rgba(39,72,216,.18);font-family:inherit;animation:yaccIn .5s ease both}' +
    '.ya-cc .t{flex:1 1 240px}.ya-cc b{display:block;font-size:1.02rem;line-height:1.3;color:#fff}.ya-cc span{display:block;font-size:.86rem;color:#dbe4ff;margin-top:.25rem;line-height:1.45}' +
    '.ya-cc a{display:inline-flex;align-items:center;gap:.45rem;background:#ffb020;color:#0f2457!important;font-weight:800;font-size:.92rem;border-radius:12px;padding:.7rem 1rem;text-decoration:none!important;white-space:nowrap;transition:transform .15s,box-shadow .15s}' +
    '.ya-cc a:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(0,0,0,.2)}.ya-cc .lv{display:inline-flex;align-items:center;gap:.35rem;font-size:.72rem;font-weight:700;color:#bbf7d0;margin-bottom:.3rem}' +
    '.ya-cc .lv i{width:7px;height:7px;border-radius:50%;background:#4ade80;animation:yaccP 1.6s infinite}' +
    '.ya-ccf{position:fixed;left:18px;bottom:18px;z-index:997;display:none;align-items:center;gap:.5rem;background:#0f2457;color:#fff!important;border-radius:999px;padding:.7rem 1.05rem;font:700 .88rem/1 "Plus Jakarta Sans",system-ui,sans-serif;box-shadow:0 10px 26px rgba(15,36,87,.35);text-decoration:none!important;transform:translateY(90px);transition:transform .35s ease}' +
    '.ya-ccf.on{transform:none}.ya-ccf i{width:8px;height:8px;border-radius:50%;background:#4ade80;animation:yaccP 1.6s infinite}.ya-ccf:hover{background:#2748d8}' +
    '@media(min-width:900px){.ya-ccf{display:inline-flex}}' +
    '@keyframes yaccIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}' +
    '@keyframes yaccP{0%{box-shadow:0 0 0 0 rgba(74,222,128,.6)}70%{box-shadow:0 0 0 7px rgba(74,222,128,0)}100%{box-shadow:0 0 0 0 rgba(74,222,128,0)}}' +
    '@media(prefers-reduced-motion:reduce){.ya-cc,.ya-cc .lv i,.ya-ccf i{animation:none}.ya-ccf{transition:none}}';

  function href(pos) { return URL + '?from=' + encodeURIComponent(path) + '&cta=' + pos + '#book'; }
  function track(pos) { try { (w.dataLayer = w.dataLayer || []).push({ event: 'consult_cta_click', cta_position: pos, page_path: path }); } catch (e) {} }
  function card(pos) {
    var c = d.createElement('aside'); c.className = 'ya-cc'; c.setAttribute('aria-label', T.f);
    c.innerHTML = '<div class="t"><div class="lv"><i></i>' + (mr ? 'मोफत · 10 मिनिटे · Google Meet' : 'Free · 10 min · Google Meet') + '</div><b></b><span></span></div><a></a>';
    c.querySelector('b').textContent = T.h; c.querySelector('span').textContent = T.s;
    var a = c.querySelector('a'); a.href = href(pos); a.textContent = '📅 ' + T.b; a.onclick = function () { track(pos); };
    return c;
  }
  function run() {
    var st = d.createElement('style'); st.textContent = css; d.head.appendChild(st);
    var art = d.querySelector('article.article') || d.querySelector('article') || d.querySelector('main');
    var isHome = path === '/' || path === '/index.html';
    if (art && !isHome) {
      // 1) after the first data table that is not part of a tool/form
      var tbls = art.querySelectorAll('.tbl-wrap, .table-wrap, table'), tb = null;
      for (var i = 0; i < tbls.length; i++) { if (!tbls[i].closest('form, .tool, #tool, .ya-cc')) { tb = tbls[i].closest('.tbl-wrap, .table-wrap') || tbls[i]; break; } }
      if (tb && tb.parentNode) tb.parentNode.insertBefore(card('after_table'), tb.nextSibling);
      // 2) before the FAQs, else before the next-step box, else at the end of the article
      var faq = art.querySelector('#faq, h2[id*="faq"]'), ns = art.querySelector('.next-step');
      var anchor = faq || ns;
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(card('before_faq'), anchor);
      else if (!tb) art.appendChild(card('article_end'));
    }
    // 3) desktop floating button
    var f = d.createElement('a'); f.className = 'ya-ccf'; f.href = href('floating'); f.innerHTML = '<i></i>';
    f.appendChild(d.createTextNode(T.f)); f.onclick = function () { track('floating'); };
    d.body.appendChild(f);
    var shown = false;
    w.addEventListener('scroll', function () {
      if (shown) return;
      var h = d.documentElement; if ((h.scrollTop + w.innerHeight) / h.scrollHeight > 0.3) { shown = true; f.classList.add('on'); }
    }, { passive: true });
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', run); else run();
})(window, document);
