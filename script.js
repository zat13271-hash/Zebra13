/* ============================================================
   ZEBRA COFFEE — script.js
   i18n (RU/EN), mobile nav, header scroll state, reveal anim
   ============================================================ */

const I18N = {
  ru: {
    'nav.about': 'О нас',
    'nav.menu': 'Меню',
    'nav.gallery': 'Интерьер',
    'nav.branches': 'Филиалы',

    'hero.eyebrow': 'Казахстанская сеть кофеен',
    'hero.tagline': 'Кофе, который дарит эмоции',
    'hero.cta': 'Найти кофейню',
    'hero.cta2': 'Смотреть меню',

    'about.title': 'О бренде',
    'about.lead': 'ZEBRA COFFEE — казахстанская сеть кофеен, где каждый напиток — маленький повод улыбнуться.',
    'about.fact1': 'арабика в фирменном бленде',
    'about.fact2': 'города — Астана и Алматы',
    'about.fact3': 'ежедневно, без выходных',

    'menu.title': 'Вкусы Zebra',
    'menu.card1.title': 'Zebra Blend №1',
    'menu.card1.text': 'Средняя обжарка: шоколад Бразилии и цветочные тропические нотки.',
    'menu.card2.title': 'Cherry Energy',
    'menu.card2.text': 'Бодрящий кофе со льдом и неповторимым вкусом вишни.',
    'menu.card3.title': 'Ice Raf «Испанский персик»',
    'menu.card3.text': 'Нежный, приятный персиковый вкус с молочной сливочностью.',
    'menu.card4.title': 'Фраппе и лимонады',
    'menu.card4.text': 'Освежающая классика и авторские хиты на каждый день.',
    'menu.note': 'Полное меню — в наших кофейнях и в 2ГИС',

    'gallery.title': 'Атмосфера',

    'branches.title': 'Филиалы',
    'branches.astana': 'Астана',
    'branches.astana.a': 'пр. Улы Дала, 31Б',
    'branches.astana.b': 'пр. Кабанбай Батыра, 13',
    'branches.astana.c': 'ул. Кайыма Мухамедханова, 4А',
    'branches.astana.d': 'ул. Каныша Сатпаева, 14',
    'branches.astana.e': 'ул. Достык, 8',
    'branches.almaty': 'Алматы',
    'branches.almaty.a': 'пр. Сакена Сейфуллина, 416',
    'branches.open': 'Все кофейни в 2ГИС',
    'branches.open2': 'Все кофейни в 2ГИС',

    'meta.title': 'ZEBRA COFFEE — казахстанская сеть кофеен'
  },

  en: {
    'nav.about': 'About',
    'nav.menu': 'Menu',
    'nav.gallery': 'Interior',
    'nav.branches': 'Locations',

    'hero.eyebrow': 'Kazakh coffee shop chain',
    'hero.tagline': 'Coffee that gives you emotions',
    'hero.cta': 'Find a coffee shop',
    'hero.cta2': 'Explore the menu',

    'about.title': 'About the brand',
    'about.lead': 'ZEBRA COFFEE is a Kazakh coffee shop chain where every drink is a little reason to smile.',
    'about.fact1': 'arabica in our signature blend',
    'about.fact2': 'cities — Astana & Almaty',
    'about.fact3': 'open daily, no days off',

    'menu.title': 'Zebra flavours',
    'menu.card1.title': 'Zebra Blend No. 1',
    'menu.card1.text': 'Medium roast: Brazilian chocolate notes with bright floral, tropical hints.',
    'menu.card2.title': 'Cherry Energy',
    'menu.card2.text': 'An energising iced coffee with an unmistakable cherry taste.',
    'menu.card3.title': 'Ice Raf “Spanish Peach”',
    'menu.card3.text': 'A gentle, pleasant peach flavour with creamy milk.',
    'menu.card4.title': 'Frappes & lemonades',
    'menu.card4.text': 'Refreshing classics and signature hits for every day.',
    'menu.note': 'Full menu — in our coffee shops and on 2GIS',

    'gallery.title': 'Atmosphere',

    'branches.title': 'Locations',
    'branches.astana': 'Astana',
    'branches.astana.a': 'Uly Dala Ave., 31B',
    'branches.astana.b': 'Kabanbay Batyr Ave., 13',
    'branches.astana.c': 'Kaiyr Mukhamedkhanov St., 4A',
    'branches.astana.d': 'Kanysh Satpayev St., 14',
    'branches.astana.e': 'Dostyk St., 8',
    'branches.almaty': 'Almaty',
    'branches.almaty.a': 'Saken Seifullin Ave., 416',
    'branches.open': 'All coffee shops on 2GIS',
    'branches.open2': 'All coffee shops on 2GIS',

    'meta.title': 'ZEBRA COFFEE — Kazakh coffee shop chain'
  }
};

/* ---------- Language switcher ---------- */
const langToggle = document.getElementById('langToggle');
const langOpts = langToggle.querySelectorAll('.lang-toggle__opt');

function setLang(lang) {
  const dict = I18N[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });

  document.documentElement.lang = lang;
  document.title = dict['meta.title'];

  langOpts.forEach((opt) => {
    opt.classList.toggle('is-active', opt.dataset.lang === lang);
  });

  try { localStorage.setItem('zebra-lang', lang); } catch (e) {}
}

langToggle.addEventListener('click', () => {
  const current = document.documentElement.lang === 'ru' ? 'ru' : 'en';
  setLang(current === 'ru' ? 'en' : 'ru');
});

langOpts.forEach((opt) => {
  opt.addEventListener('click', (e) => {
    e.stopPropagation();
    setLang(opt.dataset.lang);
  });
});

// Restore saved language or browser preference
(function initLang() {
  let lang = 'ru';
  try { lang = localStorage.getItem('zebra-lang') || lang; } catch (e) {}
  if (!I18N[lang]) lang = 'ru';
  setLang(lang);
})();

/* ---------- Mobile navigation ---------- */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('is-open');
  nav.classList.toggle('is-open');
  document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    burger.classList.remove('is-open');
    nav.classList.remove('is-open');
    document.body.style.overflow = '';
  });
});

/* ---------- Header scroll state ---------- */
const header = document.getElementById('header');

function onScroll() {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Reveal on scroll ---------- */
const revealTargets = document.querySelectorAll(
  '.section__head, .about__lead, .fact, .card, .gallery__item, .branch'
);

revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => observer.observe(el));

/* ---------- Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
