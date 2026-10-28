/* Shared header and footer.
   Every page loads this file. It fills <header id="site-header"> and <footer id="site-footer">.
   Each page's <body> declares two attributes:
     data-root  path from that page back to the site root ("./" for the home page, "../" one folder down)
     data-page  which nav item is the current page ("home", "publications", ...)
   To add a page, add one entry to NAV below. To change the footer, edit it once here. */
(function () {
  var body = document.body;
  var root = body.getAttribute('data-root') || './';
  var page = body.getAttribute('data-page') || '';

  var NAV = [
    { label: 'Research',       href: 'index.html#research' },
    { label: 'Courses',        href: 'index.html#courses' },
    { label: 'Undergraduate',  href: 'index.html#undergraduate' },
    { label: 'Awards',         href: 'index.html#awards' },
    // { label: 'News',           href: 'index.html#news' },
    { label: 'Members',           href: 'members/' },
    { label: 'Publications',   href: 'publications/', page: 'publications' }
  ];

  var items = NAV.map(function (n) {
    var current = n.page && n.page === page ? ' aria-current="page"' : '';
    return '<li><a href="' + root + n.href + '"' + current + '>' + n.label + '</a></li>';
  }).join('\n        ');

  var header = document.getElementById('site-header');
  if (header) {
    header.innerHTML =
      '<div class="wrap">' +
        '<a class="brand" href="' + root + 'index.html">Chih-Tsun Huang<span>黃稚存</span></a>' +
        '<button class="toggle" aria-expanded="false" aria-controls="menu" aria-label="選單">' +
          '<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">' +
            '<path class="bars" d="M3 6h16M3 11h16M3 16h16"/>' +
            '<path class="cross" d="M5 5l12 12M17 5L5 17"/>' +
          '</svg>' +
        '</button>' +
        '<nav aria-label="主選單"><ul class="menu" id="menu">' + items + '</ul></nav>' +
      '</div>';
  }

  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.innerHTML = `
  <div class="wrap">
    <div class="fgrid">
      <div>
        <h4>NTHU</h4>
        <ul>
          <li><a href="https://www.nthu.edu.tw/">National Tsing Hua University</a></li>
          <li><a href="https://dcs.site.nthu.edu.tw/">Department of Computer Science</a></li>
          <li><a href="https://dee.site.nthu.edu.tw/">Department of Electrical Engineering</a></li>
          <li><a href="https://sites.google.com/view/nthudtc">IC Design Technology Center (DTC)</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <address>
          <a href="mailto:cthuang@cs.nthu.edu.tw">cthuang@cs.nthu.edu.tw</a><br>
          Room 642, Delta Building,<br>101, Section 2, Kuang Fu Road,<br>East District, Hsinchu City 300044,<br>Taiwan R.O.C.<br>
          +886 3 5715131 x31213
        </address>
      </div>
    </div>
    <div class="fine">© All rights reserved</div>
  </div>`;
  }

  /* scroll reveal: sections fade up when they enter the viewport */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('main section, main .quote');
  if ('IntersectionObserver' in window && !reduce && targets.length) {
    document.documentElement.classList.add('js');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(function (t) { t.classList.add('reveal'); io.observe(t); });
    /* a deep link (#awards) must not land on an invisible section */
    window.addEventListener('hashchange', function () {
      var t = document.querySelector(location.hash || 'x'); if (t) t.classList.add('in');
    });
    if (location.hash) { var h = document.querySelector(location.hash); if (h) h.classList.add('in'); }
  }

  /* mobile menu toggle */
  var btn = document.querySelector('.toggle');
  var menu = document.getElementById('menu');
  if (btn && menu) {
    var set = function (open) {
      menu.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
    };
    btn.addEventListener('click', function () { set(!menu.classList.contains('open')); });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  }
})();
