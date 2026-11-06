/* Fadil Karim — site behaviour.
 *
 * Light/dark toggle (persists to localStorage 'fk-theme'), the rail arrows,
 * the nav underline that follows the section you are reading, and the
 * reading-list filter. With JavaScript off the page still shows every entry;
 * the controls that need it are hidden by CSS (html:not(.js)).
 */
(function(){
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── theme ── */
  var toggle = document.getElementById('themeToggle');
  var label = document.getElementById('themeLabel');
  function showTheme(dark){
    if(dark) root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    if(toggle) toggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
    if(label) label.textContent = dark ? 'Light' : 'Dark';
  }
  showTheme(root.getAttribute('data-theme') === 'dark');
  if(toggle) toggle.addEventListener('click', function(){
    var dark = root.getAttribute('data-theme') !== 'dark';
    showTheme(dark);
    try { localStorage.setItem('fk-theme', dark ? 'dark' : 'light'); } catch(e){}
  });

  /* ── rails: page left / right, and dim an arrow at the end of its rail ── */
  var wraps = document.querySelectorAll('.rail-wrap');
  for(var i = 0; i < wraps.length; i++)(function(wrapEl){
    var rail = wrapEl.querySelector('.rail');
    var prev = wrapEl.querySelector('.rarrow.prev');
    var next = wrapEl.querySelector('.rarrow.next');
    if(!rail || !prev || !next) return;
    function page(dir){
      rail.scrollBy({ left: dir * rail.clientWidth * 0.85, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    function sync(){
      var max = rail.scrollWidth - rail.clientWidth;
      wrapEl.classList.toggle('fits', max <= 2);
      prev.disabled = rail.scrollLeft <= 2;
      next.disabled = rail.scrollLeft >= max - 2;
    }
    prev.addEventListener('click', function(){ page(-1); });
    next.addEventListener('click', function(){ page(1); });
    rail.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  })(wraps[i]);

  /* ── nav: underline the section in view ── */
  var navLinks = document.querySelectorAll('.nav-row a[href^="#"]');
  var sections = [];
  for(var n = 0; n < navLinks.length; n++){
    var target = document.getElementById(navLinks[n].getAttribute('href').slice(1));
    if(target) sections.push({ el: target, link: navLinks[n] });
  }
  var ticking = false;
  function spy(){
    ticking = false;
    var line = window.innerHeight * 0.4, current = null;
    for(var s = 0; s < sections.length; s++){
      if(sections[s].el.getBoundingClientRect().top <= line) current = sections[s];
    }
    /* at the very bottom, the last section counts even if it is short */
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if(atBottom && sections.length && window.scrollY > 0) current = sections[sections.length - 1];
    for(var k = 0; k < sections.length; k++){
      if(sections[k] === current) sections[k].link.setAttribute('aria-current', 'true');
      else sections[k].link.removeAttribute('aria-current');
    }
  }
  if(sections.length){
    window.addEventListener('scroll', function(){
      if(!ticking){ ticking = true; requestAnimationFrame(spy); }
    }, { passive: true });
    window.addEventListener('resize', spy);
    spy();
  }

  /* ── reading list: counts, subject filter, and the folded shelf ── */
  var shelf = document.getElementById('shelf');
  if(shelf){
    var rows = [].slice.call(shelf.children);
    var tabs = [].slice.call(document.querySelectorAll('.tab[data-filter]'));
    var more = document.getElementById('shelfMore');
    var moreLabel = more ? more.querySelector('.lbl') : null;
    var status = document.getElementById('shelfStatus');
    var shelfBox = document.getElementById('shelfBox');
    var FOLD = 12;               /* most recent volumes shown before "show the full shelf" */
    var FILTERS = {
      all: null,
      psychology: /psychology/i,
      psychoanalysis: /psychoanalysis/i,
      neuroscience: /neuroscience/i,
      business: /business/i,
      economics: /economics|finance/i,
      strategy: /strategy|politics/i,
      literature: /literature/i,
      papers: /research paper|whitepaper|academic/i
    };
    var active = 'all', expanded = false;

    function subject(row){
      var c = row.querySelector('.lc');
      return c ? c.textContent : '';
    }
    function matches(row, key){
      var re = FILTERS[key];
      return !re || re.test(subject(row));
    }

    /* counts: tabs, plus every [data-count="read"] on the page */
    tabs.forEach(function(t){
      var key = t.getAttribute('data-filter');
      var c = t.querySelector('.n');
      if(c) c.textContent = rows.filter(function(r){ return matches(r, key); }).length;
    });
    [].forEach.call(document.querySelectorAll('[data-count="read"]'), function(el){
      el.textContent = rows.length;
    });

    function render(){
      var total = 0, shown = 0;
      rows.forEach(function(r){
        var ok = matches(r, active);
        if(ok) total++;
        var visible = ok && (active !== 'all' || expanded || total <= FOLD);
        r.hidden = !visible;
        if(visible) shown++;
      });
      if(more){
        more.hidden = active !== 'all' || rows.length <= FOLD;
        more.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        if(moreLabel) moreLabel.textContent = expanded ? 'Fold the shelf' : 'Show the full shelf';
      }
      if(status){
        var tab = tabs.filter(function(t){ return t.getAttribute('data-filter') === active; })[0];
        var name = tab ? tab.firstChild.textContent.trim().toLowerCase() : '';
        status.textContent = active === 'all'
          ? shown + ' of ' + rows.length + ' volumes · most recent first'
          : shown + ' ' + (shown === 1 ? 'volume' : 'volumes') + ' in ' + name;
      }
    }

    tabs.forEach(function(t){
      t.addEventListener('click', function(){
        active = t.getAttribute('data-filter');
        tabs.forEach(function(x){ x.setAttribute('aria-pressed', x === t ? 'true' : 'false'); });
        render();
      });
    });
    if(more) more.addEventListener('click', function(){
      expanded = !expanded;
      render();
      /* folding back up: keep the shelf in view rather than stranding the reader below it */
      if(!expanded && shelfBox && shelfBox.getBoundingClientRect().top < 0){
        shelfBox.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
    render();
  }
})();
