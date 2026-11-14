// Everything that moves in answer to the visitor:
// - the 3D logo, the drifting products and the glow follow the pointer,
// - cards lean towards the pointer,
// - cards rise into place when first scrolled to.
// Nothing here is needed to read the site: without it the page is static.
//
// "Still" is the state with no motion: the page is in it when the visitor's
// system asks for reduced motion (the small script in the <head> of
// Base.astro sets the `still` class before anything is drawn). The CSS for
// that state is at the end of global.css.

const root = document.documentElement;
const mouse = matchMedia("(hover: hover) and (pointer: fine)").matches;
const isStill = () => root.classList.contains("still");

// Cards rise into place. Only set up when the page starts in motion.
const reveals = document.querySelectorAll("[data-reveal]");
const showAll = () => {
  for (const el of reveals) el.classList.add("is-in");
};
if (!isStill()) {
  root.classList.add("motion");
  const seen = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        seen.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  for (const el of reveals) seen.observe(el);
}

// The pointer's position, eased, as --px and --py from -1 to 1.
let targetX = 0;
let targetY = 0;
let x = 0;
let y = 0;
let frame = 0;

const step = () => {
  x += (targetX - x) * 0.09;
  y += (targetY - y) * 0.09;
  root.style.setProperty("--px", x.toFixed(4));
  root.style.setProperty("--py", y.toFixed(4));
  const settled = Math.abs(targetX - x) < 0.001 && Math.abs(targetY - y) < 0.001;
  frame = settled ? 0 : requestAnimationFrame(step);
};

const resetPointer = () => {
  cancelAnimationFrame(frame);
  frame = 0;
  targetX = targetY = x = y = 0;
  root.style.removeProperty("--px");
  root.style.removeProperty("--py");
  root.classList.remove("tracking");
};

if (mouse) {
  addEventListener(
    "pointermove",
    (event) => {
      if (isStill()) return;
      targetX = (event.clientX / innerWidth) * 2 - 1;
      targetY = (event.clientY / innerHeight) * 2 - 1;
      root.classList.add("tracking");
      if (!frame) frame = requestAnimationFrame(step);
    },
    { passive: true },
  );

  // Cards lean by up to 7 degrees, and a light sits under the pointer.
  const lean = 7;
  for (const card of document.querySelectorAll("[data-tilt]")) {
    card.addEventListener("pointermove", (event) => {
      if (isStill()) return;
      const box = card.getBoundingClientRect();
      const across = (event.clientX - box.left) / box.width;
      const down = (event.clientY - box.top) / box.height;
      card.classList.add("is-tilting");
      card.style.setProperty("--ry", `${((across - 0.5) * 2 * lean).toFixed(2)}deg`);
      card.style.setProperty("--rx", `${((0.5 - down) * 2 * lean).toFixed(2)}deg`);
      card.style.setProperty("--mx", `${(across * 100).toFixed(1)}%`);
      card.style.setProperty("--my", `${(down * 100).toFixed(1)}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.classList.remove("is-tilting");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  }
}

// Follow the system's reduced-motion setting when it changes while the
// page is open.
matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (event) => {
  root.classList.toggle("still", event.matches);
  if (event.matches) {
    showAll();
    resetPointer();
  }
});
