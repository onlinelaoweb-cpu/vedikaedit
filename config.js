/* Site settings. Yahan sirf 2 cheezein badalni hain (tag aur email). */
window.VE_CONFIG = {
  // Amazon Associates tracking ID (jaise "vedikaedit-21"). Approval ke baad yahan daalo.
  tag: "YOURTAG-21",
  // Contact email (About page aur footer mein dikhega). Khali chhodo to nahi dikhega.
  email: ""
};
(function () {
  var cfg = window.VE_CONFIG;

  // Regional languages: open the current page through Google Translate's translate.goog proxy.
  // Works only on the live public site (not on file:// or localhost).
  function translateHref(code) {
    var loc = window.location;
    if (loc.protocol !== "http:" && loc.protocol !== "https:") return null;
    var host = loc.hostname;
    if (/\.translate\.goog$/.test(host) || host === "localhost" || /^[\d.]+$/.test(host)) return null;
    var sl = (document.documentElement.lang || "en").split("-")[0];
    var proxy = host.replace(/-/g, "--").replace(/\./g, "-") + ".translate.goog";
    return "https://" + proxy + loc.pathname + "?_x_tr_sl=" + sl + "&_x_tr_tl=" + code + "&_x_tr_hl=" + code + "&_x_tr_pto=wapp";
  }

  function apply() {
    var i, links = document.querySelectorAll("a[data-q]");
    for (i = 0; i < links.length; i++) {
      var q = links[i].getAttribute("data-q");
      links[i].href = "https://www.amazon.in/s?k=" + encodeURIComponent(q) + "&tag=" + encodeURIComponent(cfg.tag);
    }
    if (cfg.email) {
      var boxes = document.querySelectorAll("[data-contact]");
      for (i = 0; i < boxes.length; i++) {
        boxes[i].textContent = (boxes[i].getAttribute("data-label") || "") + cfg.email;
        boxes[i].hidden = false;
      }
    }
    var tl = document.querySelectorAll("a[data-tl]");
    for (i = 0; i < tl.length; i++) {
      (function (a) {
        var href = translateHref(a.getAttribute("data-tl"));
        if (href) { a.href = href; a.rel = "noopener"; return; }
        a.classList.add("off");
        a.setAttribute("aria-disabled", "true");
        a.addEventListener("click", function (e) {
          e.preventDefault();
          var hint = document.querySelector(".lang-hint");
          if (hint) hint.hidden = false;
        });
      })(tl[i]);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply);
  else apply();

  // Close the language menu on outside click or Escape.
  document.addEventListener("click", function (e) {
    var open = document.querySelectorAll("details.lang[open]");
    for (var i = 0; i < open.length; i++) if (!open[i].contains(e.target)) open[i].removeAttribute("open");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var open = document.querySelectorAll("details.lang[open]");
    for (var i = 0; i < open.length; i++) { open[i].removeAttribute("open"); var s = open[i].querySelector("summary"); if (s) s.focus(); }
  });
})();
