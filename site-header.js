(function () {
  var DC = /\.dc\.html$/i.test(location.pathname);
  var L = DC ? {
    home: "G%26C-estates%20Landing.dc.html", blog: "Blog.dc.html",
    why: "De%20ce%20noi.dc.html", proj: "Proiecte.dc.html", calc: "Calculator.dc.html", jobs: "Cariere.dc.html", contact: "Contact.dc.html", faq: "Intrebari%20frecvente.dc.html"
  } : { home: "/", blog: "/blog", why: "/de-ce-noi", proj: "/proiecte", calc: "/calculator", jobs: "/cariere", contact: "/contact", faq: "/intrebari-frecvente" };
  var RULE = "2px solid rgba(32,30,29,.4)";
  var nav = [
    ["Calculator", L.calc], ["Proiecte", L.proj], ["Cariere", L.jobs],
    ["Întrebări", L.faq], ["De ce noi", L.why], ["Blog", L.blog], ["Contact", L.contact]
  ];
  var ico = {
    tel: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>',
    wa: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>'
  };
  var svg = function (p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:19px;height:19px">' + p + '</svg>'; };
  var iconBtn = "display:flex;align-items:center;justify-content:center;width:48px;border:none;border-left:" + RULE + ";background:transparent;color:#201e1d;cursor:pointer;text-decoration:none";

  function applyTheme(dark) {
    var f = dark ? "invert(1) hue-rotate(180deg)" : "";
    document.documentElement.style.filter = f;
    document.documentElement.style.background = dark ? "#f3f2f2" : "";
    document.querySelectorAll("img").forEach(function (i) { if (i.parentElement) i.parentElement.style.filter = f; });
  }
  function isDark() { try { return localStorage.getItem("gc-theme") === "dark"; } catch (e) { return false; } }

  function render(el) {
    if (el.dataset.ready && el.querySelector('[data-gc="nav"]')) return;
    el.dataset.ready = "1";
    el.style.cssText += ";display:flex;align-items:stretch;justify-content:space-between;gap:16px;border-bottom:" + RULE + ";position:fixed;top:0;left:50%;transform:translateX(-50%);width:min(100%,1400px);box-sizing:border-box;border-left:" + RULE + ";border-right:" + RULE + ";background:#f3f2f2;z-index:50;font-family:Archivo,system-ui,sans-serif";
    if (el.parentElement) el.parentElement.style.paddingTop = "58px";
    el.innerHTML =
      '<a href="' + L.home + '" aria-label="G&amp;C Construcții" style="display:flex;align-items:center;gap:9px;padding:16px clamp(16px,3vw,28px);border-right:' + RULE + ';color:#201e1d;text-decoration:none">' +
        '<svg viewBox="-9.53 -7.92 19.06 18.92" style="width:22px;height:22px;display:block;flex:none"><polygon points="9.53,5.5 0,11 0,3.08 9.53,-2.42" style="fill:#ec3013"></polygon><polygon points="0,-7.92 9.53,-2.42 0,3.08 -9.53,-2.42" style="fill:#201e1d"></polygon></svg>' +
        '<span style="font-weight:800;font-size:26px;line-height:19px;letter-spacing:-.015em">G&amp;C</span></a>' +
      '<nav data-gc="nav" style="display:flex;align-items:center;flex-wrap:nowrap;white-space:nowrap;gap:clamp(10px,1.2vw,22px);padding:0 clamp(12px,1.4vw,20px);font-size:12.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;flex:1;min-width:0">' +
        nav.map(function (n) { return '<a href="' + n[1] + '" style="color:#201e1d;text-decoration:none">' + n[0] + '</a>'; }).join("") +
      '</nav>' +
      '<div style="display:flex;align-items:stretch;flex:none;margin-left:auto">' +
        '<a href="tel:+40728241379" aria-label="Telefon" style="' + iconBtn + '">' + svg(ico.tel) + '</a>' +
        '<a href="https://wa.me/40728241379" target="_blank" rel="noopener" aria-label="WhatsApp" style="' + iconBtn + '">' + svg(ico.wa) + '</a>' +
        '<button data-gc="theme" aria-label="Mod întunecat" title="Mod întunecat" style="' + iconBtn + '">' + svg(ico.moon) + '</button>' +
        '<button data-gc="burger" aria-label="Meniu" style="display:none;flex-direction:column;justify-content:center;gap:5px;width:52px;min-height:52px;border:none;border-left:' + RULE + ';background:transparent;cursor:pointer;padding:0 14px">' +
          '<span style="display:block;width:24px;height:2px;background:#201e1d"></span><span style="display:block;width:24px;height:2px;background:#201e1d"></span><span style="display:block;width:24px;height:2px;background:#201e1d"></span></button>' +
        '<a data-gc="cta" href="' + L.contact + '" style="display:flex;align-items:center;background:#ec3013;color:#f3f2f2;padding:0 clamp(16px,2vw,26px);font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap;text-decoration:none">Cere ofertă</a>' +
      '</div>' +
      '<nav data-gc="drawer" style="display:none;flex-direction:column;position:absolute;left:0;right:0;top:100%;background:#f3f2f2;border-bottom:' + RULE + '">' +
        nav.map(function (n) { return '<a href="' + n[1] + '" style="display:flex;align-items:center;min-height:52px;padding:0 20px;border-bottom:2px solid rgba(32,30,29,.15);font-size:15px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#201e1d;text-decoration:none">' + n[0] + '</a>'; }).join("") +
        '<a href="' + L.contact + '" style="display:flex;align-items:center;min-height:56px;padding:0 20px;background:#ec3013;color:#f3f2f2;font-size:15px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;text-decoration:none">Cere ofertă</a>' +
      '</nav>';
    var q = function (k) { return el.querySelector('[data-gc="' + k + '"]'); };
    var drawer = q("drawer");
    q("burger").addEventListener("click", function () { drawer.style.display = drawer.style.display === "flex" ? "none" : "flex"; });
    q("theme").addEventListener("click", function () {
      var d = !isDark();
      try { localStorage.setItem("gc-theme", d ? "dark" : "light"); } catch (e) {}
      applyTheme(d);
    });
    var layout = function () {
      var w = el.clientWidth || window.innerWidth, compact = w < 1120, narrow = w < 860;
      q("nav").style.display = compact ? "none" : "flex";
      q("burger").style.display = compact ? "flex" : "none";
      q("cta").style.display = narrow ? "none" : "flex";
      if (!compact) drawer.style.display = "none";
    };
    layout();
    window.addEventListener("resize", layout);
    applyTheme(isDark());
  }

  var pending = false;
  function scan() {
    pending = false;
    var el = document.getElementById("gc-header");
    if (el) render(el);
  }
  scan();
  new MutationObserver(function () {
    if (pending) return;
    pending = true;
    requestAnimationFrame(scan);
  }).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("load", scan);
})();
