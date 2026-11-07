/* Site settings. Yahan sirf 2 cheezein badalni hain. */
window.VE_CONFIG = {
  // Amazon Associates tracking ID (jaise "vedikaedit-21"). Approval ke baad yahan daalo.
  tag: "YOURTAG-21",
  // Sampark ke liye email (About aur Footer mein dikhega). Khali chhodo to nahi dikhega.
  email: ""
};
(function () {
  var cfg = window.VE_CONFIG;
  function apply() {
    var links = document.querySelectorAll("a[data-q]");
    for (var i = 0; i < links.length; i++) {
      var q = links[i].getAttribute("data-q");
      links[i].href = "https://www.amazon.in/s?k=" + encodeURIComponent(q) + "&tag=" + encodeURIComponent(cfg.tag);
    }
    if (cfg.email) {
      var boxes = document.querySelectorAll("[data-contact]");
      for (var j = 0; j < boxes.length; j++) {
        boxes[j].textContent = "Sampark: " + cfg.email;
        boxes[j].hidden = false;
      }
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply);
  else apply();
})();
