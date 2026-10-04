/* ═══════════════════════════════════════════
   ZEBRA COFFEE · Бишкек — script.js
   1) Переключение языка RU/EN
   2) Рендер карточек филиалов
   3) Бургер-меню, скролл-навигация, анимации
   ═══════════════════════════════════════════ */

"use strict";

/* ─────────────────────────────────────────
   1. ПЕРЕВОДЫ
───────────────────────────────────────── */
const i18n = {
  ru: {
    "nav.brand": "О бренде",
    "nav.menu": "Меню",
    "nav.branches": "Филиалы",
    "nav.contacts": "Контакты",
    "hero.kicker": "Сеть кофеен · Бишкек",
    "hero.sub": "Кофе, который заряжает город. Свежая обжарка, быстрый формат, тёплая атмосфера.",
    "hero.ctaMenu": "Смотреть меню",
    "hero.ctaBranches": "Наши филиалы",
    "marquee": "ЭСПРЕССО · КАПУЧИНО · РАФ · МАТЧА · БАМБЛ · ГОРЯЧИЙ ШОКОЛАД · ПОНЧИКИ · КОФЕ С СОБОЙ · ",
    "brand.title": "О бренде",
    "brand.p1": "ZEBRA COFFEE — городская сеть кофеен экспресс-формата. Мы верим, что хороший кофе — это ежедневная привычка, а не повод для ожидания.",
    "brand.p2": "Чёрное и белое — наша графика. Тёплый и мягкий — наш характер. В каждом филиале — стильный интерьер, открытая зона и напитки, которые берут с собой или пьют здесь.",
    "brand.stat1": "филиалов в Бишкеке",
    "brand.stat2": "позиций в меню",
    "brand.stat3": "лет с городом",
    "brand.v1t": "Свежая обжарка",
    "brand.v1p": "Зёрна отборных сортов, стабильный вкус в каждой чашке.",
    "brand.v2t": "Быстрый формат",
    "brand.v2p": "Ваш напиток готов, пока вы выбираете пончик.",
    "brand.v3t": "Уютный интерьер",
    "brand.v3p": "Зебра-графика, мягкий свет и место, где хочется остаться.",
    "menu.title": "Меню",
    "menu.raf": "Раф кофе",
    "menu.masala": "Чай масала",
    "menu.hotchoc": "Горячий шоколад",
    "menu.kakao": "Какао",
    "menu.shake": "Молочный коктейль",
    "menu.lemonade": "Лимонад",
    "menu.donut": "Пончики",
    "menu.dessert": "Десерты дня",
    "menu.ask": "уточняйте",
    "menu.ask2": "уточняйте",
    "menu.beans": "Зерно с собой",
    "menu.note": "Цены в сомах. Меню может отличаться в филиалах.",
    "branches.title": "Филиалы",
    "branch.gis": "Открыть в 2GIS",
    "branch.wa": "WhatsApp",
    "footer.tag": "Кофе · Атмосфера · Город",
    "footer.hours": "Ежедневно с 08:00 до 23:00"
  },
  en: {
    "nav.brand": "About",
    "nav.menu": "Menu",
    "nav.branches": "Locations",
    "nav.contacts": "Contacts",
    "hero.kicker": "Coffee shop chain · Bishkek",
    "hero.sub": "Coffee that charges the city. Fresh roasting, fast format, warm atmosphere.",
    "hero.ctaMenu": "View menu",
    "hero.ctaBranches": "Our locations",
    "marquee": "ESPRESSO · CAPPUCCINO · RAF · MATCHA · BUMBLE · HOT CHOCOLATE · DONUTS · COFFEE TO GO · ",
    "brand.title": "About the brand",
    "brand.p1": "ZEBRA COFFEE is an urban express-format coffee chain. We believe great coffee is a daily habit, not a reason to wait.",
    "brand.p2": "Black and white is our graphics. Warm and soft is our character. Every location features a stylish interior, open seating and drinks to stay or to go.",
    "brand.stat1": "locations in Bishkek",
    "brand.stat2": "menu items",
    "brand.stat3": "years with the city",
    "brand.v1t": "Fresh roasting",
    "brand.v1p": "Selected beans, a consistent taste in every cup.",
    "brand.v2t": "Fast format",
    "brand.v2p": "Your drink is ready while you pick a donut.",
    "brand.v3t": "Cozy interior",
    "brand.v3p": "Zebra graphics, soft light and a place you want to stay.",
    "menu.title": "Menu",
    "menu.raf": "Raf coffee",
    "menu.masala": "Masala tea",
    "menu.hotchoc": "Hot chocolate",
    "menu.kakao": "Cocoa",
    "menu.shake": "Milkshake",
    "menu.lemonade": "Lemonade",
    "menu.donut": "Donuts",
    "menu.dessert": "Desserts of the day",
    "menu.ask": "ask us",
    "menu.ask2": "ask us",
    "menu.beans": "Beans to go",
    "menu.note": "Prices in soms. Menu may vary by location.",
    "branches.title": "Locations",
    "branch.gis": "Open in 2GIS",
    "branch.wa": "WhatsApp",
    "footer.tag": "Coffee · Atmosphere · City",
    "footer.hours": "Daily from 08:00 to 23:00"
  }
};

let currentLang = localStorage.getItem("zebra-lang") || "ru";

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("zebra-lang", lang);
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[lang][key] !== undefined) el.textContent = i18n[lang][key];
  });
  document.querySelectorAll(".lang-toggle__opt").forEach(opt =>
    opt.classList.toggle("is-active", opt.dataset.lang === lang)
  );
  renderBranches(); // карточки филиалов тоже переводим
}

document.getElementById("langToggle").addEventListener("click", () => {
  applyLang(currentLang === "ru" ? "en" : "ru");
});

/* ─────────────────────────────────────────
   2. ФИЛИАЛЫ (данные + рендер)
   2GIS-ссылки ведут на карточки филиалов в 2ГИС
───────────────────────────────────────── */
const branches = [
  {
    name: { ru: "ТРЦ «ГУМ»", en: "GUM Mall" },
    addr: "пр. Чуй, 92/3",
    hours: "08:00 – 23:00",
    gis: "https://2gis.kg/bishkek/firm/70000001060982875",
    wa: "https://wa.me/996504113250"
  },
  {
    name: { ru: "ТЦ «Ала-Арча»", en: "Ala-Archa Mall" },
    addr: "пр. Чынгыза Айтматова, 299в",
    hours: "08:00 – 00:00",
    gis: "https://2gis.kg/bishkek/firm/70000001064789037",
    wa: "https://wa.me/996504113250"
  },
  {
    name: { ru: "ул. Токтогула, 90", en: "Toktogula St., 90" },
    addr: "БЦ «Мото»",
    hours: "08:00 – 23:00",
    gis: "https://2gis.kg/bishkek/firm/70000001113714754",
    wa: "https://wa.me/996504113250"
  },
  {
    name: { ru: "ТЦ «Караван»", en: "Caravan Mall" },
    addr: "ул. Киевская, 128",
    hours: "07:00 – 23:00",
    gis: "https://2gis.kg/bishkek/search/Zebra%20Coffee%20Киевская",
    wa: "https://wa.me/996504113250"
  },
  {
    name: { ru: "ул. Нурбаева, 28/1", en: "Nurbaeva St., 28/1" },
    addr: "",
    hours: "08:00 – 23:00",
    gis: "https://2gis.kg/bishkek/search/Zebra%20Coffee%20Нурбаева",
    wa: "https://wa.me/996504113250"
  }
];

const ICON_PIN = '<svg viewBox="0 0 24 24"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
const ICON_CLOCK = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const ICON_GIS = '<svg viewBox="0 0 24 24"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zm0 0v14m6-12v14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
const ICON_WA = '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';

function renderBranches() {
  const grid = document.getElementById("branchesGrid");
  grid.innerHTML = branches.map(b => `
    <article class="branch-card reveal is-visible">
      <h3 class="branch-card__name">${b.name[currentLang]}</h3>
      <div class="branch-card__addr">${ICON_PIN}<span>${b.addr}</span></div>
      <div class="branch-card__hours">${ICON_CLOCK}<span>${b.hours}</span></div>
      <div class="branch-card__actions">
        <a class="branch-btn branch-btn--gis" href="${b.gis}" target="_blank" rel="noopener">${ICON_GIS}${i18n[currentLang]["branch.gis"]}</a>
        <a class="branch-btn branch-btn--wa" href="${b.wa}" target="_blank" rel="noopener">${ICON_WA}${i18n[currentLang]["branch.wa"]}</a>
      </div>
    </article>
  `).join("");
}

/* ─────────────────────────────────────────
   3. UI: навигация, бургер, анимации, счётчики
───────────────────────────────────────── */
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 30);
}, { passive: true });

burger.addEventListener("click", () => {
  burger.classList.toggle("is-open");
  navLinks.classList.toggle("is-open");
});
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    burger.classList.remove("is-open");
    navLinks.classList.remove("is-open");
  })
);

/* Появление блоков при скролле */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("is-visible");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* Анимированные счётчики в блоке «О бренде» */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    const duration = 1200;
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(start);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll(".stat__num").forEach(el => counterObserver.observe(el));

/* Инициализация */
applyLang(currentLang);
