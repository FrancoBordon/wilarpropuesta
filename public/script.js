const header = document.querySelector("[data-header]");
const navLinks = [...document.querySelectorAll(".nav a")];
const revealItems = document.querySelectorAll(".reveal");

const onScroll = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const active = navLinks.find((link) => link.getAttribute("href") === `#${entry.target.id}`);
      navLinks.forEach((link) => link.classList.toggle("is-active", link === active));
    });
  },
  { rootMargin: "-38% 0px -54% 0px", threshold: 0.01 }
);

window.addEventListener("scroll", onScroll, { passive: true });
revealItems.forEach((item) => revealObserver.observe(item));
document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
onScroll();
