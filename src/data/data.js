
// ─── PERSONAL ────────────────────────────────────────────────────────────────


import photo from '../assets/images/Azizbek3.png'
export const personal = {
  name:     'Azizbek Hafizov',
  initials: 'AH',
  photo:    'src/assets/images/Azizbek3.png',
  cv:       'public/Azizbek-resume.pdf',
  email:    'azizbekhafizov678@gmail.com',
  phone:    '+998 97 917 14 11',
  city:     { uz: 'Samarqand, O\'zbekiston', ru: 'Самарканд, Узбекистан', en: 'Samarqand, Uzbekistan' },
  github:   'https://github.com/azizbekhafizov',
  linkedin: 'https://www.linkedin.com/in/azizbekhafizov/',
  telegram: 'https://t.me/azizbekhafizov',
}

// ─── BIO ─────────────────────────────────────────────────────────────────────
export const bio = {
  uz: [
    `Men <strong>Azizbek Hafizov</strong> — <strong>Samarqand, O'zbekiston</strong>dan Frontend Developer. Men shunchaki kod yozmayman — foydalanuvchini to'xtatib, "bu boshqacha" deb o'ylatadigan interfeyslar yarataman.`,
    `React.js va zamonaviy texnologiyalar asosida har bir animatsiya, har bir o'tish va har bir pikselga e'tibor berib ishlashni yaxshi ko'raman. Toza arxitektura va jasur dizayn — bu mening standartim.`,
    `Hozirda ko'nikmalarimni chuqurlashtirmoqdaman va muhim narsalar yaratmoqdaman. Doim yangi narsalar o'rganishga tayyor.`,
  ],
  ru: [
    `Меня зовут <strong>Азизбек Хафизов</strong> — Frontend Developer из <strong>Самарканда, Узбекистан</strong>. Я не просто пишу код — создаю интерфейсы, которые заставляют пользователей остановиться.`,
    `С сильной базой в React.js и современных технологиях, я уделяю внимание каждой анимации, каждому переходу и каждому пикселю. Чистая архитектура + смелый дизайн — мой стандарт.`,
    `Сейчас совершенствую навыки и создаю важные проекты. Всегда готов учиться новому.`,
  ],
  en: [
    `I'm <strong>Azizbek Hafizov</strong> — a Frontend Developer from <strong>Samarqand, Uzbekistan</strong>. I don't just write code — I build interfaces that make users stop and think, "this feels different."`,
    `With a strong foundation in React.js and modern web technologies, I obsess over every animation, every transition, every pixel. Clean architecture meets bold design — that's my standard.`,
    `Currently sharpening my skills and building things that matter. Always hungry to learn, always ready to deliver.`,
  ],
}

// ─── ROLES (typewriter) ───────────────────────────────────────────────────────
export const roles = {
  uz: [' Frontend Developer', ' React.js Mutaxassisi', 'UI Ustasi', ' Veb Tajriba Yaratuvchi'],
  ru: [' Frontend Developer', ' Специалист React.js', ' UI Мастер', ' Создатель веб-опыта'],
  en: [' Frontend Developer', ' React.js Specialist', ' UI Craftsman', ' Web Experience Builder'],
}

// ─── STATS ────────────────────────────────────────────────────────────────────
export const stats = [
  { num: '2+',  color: 'var(--primary)',   label: { uz: 'Yillik o\'rganish', ru: 'Года обучения', en: 'Years learning' } },
  { num: '8+',  color: 'var(--secondary)', label: { uz: 'Loyihalar',         ru: 'Проектов',      en: 'Projects built' } },
  { num: '10+', color: 'var(--tertiary)',  label: { uz: 'Texnologiyalar',    ru: 'Технологий',    en: 'Technologies'   } },
  { num: '∞',   color: 'var(--primary)',   label: { uz: 'Ishtiyoq',          ru: 'Энтузиазм',     en: 'Passion'        } },
]

// ─── SKILLS ───────────────────────────────────────────────────────────────────
export const skillGroups = [
  {
    color: 'var(--primary)',
    label: { uz: 'Asosiy', ru: 'Основы', en: 'Core' },
    skills: [
      { name: 'HTML5',           level: 95 },
      { name: 'CSS3 / SASS',     level: 90 },
      { name: 'JavaScript ES6+', level: 88 },
      { name: 'TypeScript',      level: 75 },
    ],
  },
  {
    color: 'var(--secondary)',
    label: { uz: 'Freymvorklar', ru: 'Фреймворки', en: 'Frameworks' },
    skills: [
      { name: 'React.js',    level: 85 },
      { name: 'Next.js',     level: 75 },
      { name: 'Vue.js',      level: 70 },
      { name: 'TailwindCSS', level: 92 },
    ],
  },
  {
    color: 'var(--tertiary)',
    label: { uz: 'Dizayn', ru: 'Дизайн', en: 'Styling' },
    skills: [
      { name: 'Bootstrap',      level: 85 },
      { name: 'SCSS / SASS',    level: 88 },
      { name: 'CSS Animations', level: 80 },
      { name: 'Responsive',     level: 92 },
    ],
  },
  {
    color: 'var(--on-muted)',
    label: { uz: 'Vositalar', ru: 'Инструменты', en: 'Tools' },
    skills: [
      { name: 'Git / GitHub', level: 85 },
      { name: 'Figma',        level: 70 },
      { name: 'Postman',      level: 72 },
      { name: 'Vite',         level: 75 },
    ],
  },
]

export const techChips = [
  'HTML5','CSS3','SASS','Bootstrap','TailwindCSS',
  'JavaScript','TypeScript','Vue.js','React.js','Next.js',
  'Git','GitHub','Figma','Postman','VS Code','Vite',
]

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export const projects = [
  {
    id: 1,
    image: 'public/projects/bellissimo.png',
    name: 'Bellissimo',
    cat: 'react',
    gradient: 'linear-gradient(135deg, #c62a47 0%, #6a1b9a 100%)',
    live:   'https://bellissimo-woad.vercel.app/',
    github: 'https://github.com/azizbekhafizov/bellissimo',
    tags: ['React', 'Vite', 'CSS Modules'],
    desc: {
      uz: 'Italiya oshxonasi uslubidagi restoran veb-sayti. Interaktiv menyu, bronlash bo\'limi va zamonaviy animatsiyalar bilan jihozlangan.',
      ru: 'Сайт ресторана в итальянском стиле с интерактивным меню, разделом бронирования и современными анимациями.',
      en: 'Italian-style restaurant website featuring an interactive menu, reservation section and smooth animations.',
    },
  },
  {
    id: 2,
    image: 'public/projects/store.png',
    name: 'Phone Store',
    cat: 'react',
    gradient: 'linear-gradient(135deg, #0d1b4b 0%, #1a3a6b 50%, #0d47a1 100%)',
    live:   'https://phone-store-delta-sable.vercel.app/',
    github: 'https://github.com/azizbekhafizov/phone-store',
    tags: ['React', 'Vite', 'E-commerce', 'Redux'],
    desc: {
      uz: 'Smartfon va aksessuarlar uchun to\'liq funksional onlayn do\'kon. Mahsulot filtrlash, qidiruv va savatcha imkoniyatlari mavjud.',
      ru: 'Полнофункциональный интернет-магазин смартфонов и аксессуаров с фильтрацией, поиском и корзиной.',
      en: 'Fully functional online store for smartphones and accessories with filtering, search and cart features.',
    },
  },
  {
    id: 3,
    image: 'public/projects/upg.png',
    name: 'UPG Project',
    cat: 'react',
    gradient: 'linear-gradient(135deg, #01579b 0%, #0277bd 100%)',
    live:   'https://upg-project-woad.vercel.app/',
    github: 'https://github.com/azizbekhafizov/upg-project',
    tags: ['React', 'Vite', 'Corporate'],
    desc: {
      uz: 'Korporativ kompaniya uchun ishlab chiqilgan professional veb-sayt. Xizmatlar taqdimoti, jamoa va aloqa bo\'limlari bilan.',
      ru: 'Профессиональный корпоративный сайт с презентацией услуг, командой и контактной секцией.',
      en: 'Professional corporate website with service showcase, team presentation and contact section.',
    },
  },
  {
    id: 4,
    image: 'public/projects/pizza-ecommerce.png',
    name: 'Pizza E-commerce',
    cat: 'react',
    gradient: 'linear-gradient(135deg, #b71c1c 0%, #e53935 100%)',
    live:   'https://pizza-ecommerce-main.vercel.app/',
    github: 'https://github.com/azizbekhafizov/pizza-ecommerce-main',
    tags: ['React', 'Vite', 'E-commerce', 'Cart'],
    desc: {
      uz: 'Pizza buyurtma qilish platformasi. Kategoriyalar bo\'yicha menyu, mahsulot tanlash, savatcha va to\'lov jarayoni to\'liq amalga oshirilgan.',
      ru: 'Платформа заказа пиццы с меню по категориям, выбором товаров, корзиной и полноценным оформлением заказа.',
      en: 'Pizza ordering platform with categorized menu, product selection, cart and complete checkout flow.',
    },
  },
  {
    id: 5,
    image: 'public/projects/e-commerce-ui.png',
    name: 'E-commerce UI',
    cat: 'react',
    gradient: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 100%)',
    live:   'https://nest-jet-ten.vercel.app/',
    github: 'https://github.com/muhriddinjs/e-commerce-ui',
    tags: ['React', 'Vite', 'E-commerce', 'Responsive'],
    desc: {
      uz: 'Zamonaviy e-commerce interfeysi. Mahsulot kartalari, kategoriya filtri, saralash va moslashuvchan dizayn bilan qurilgan.',
      ru: 'Современный e-commerce интерфейс с карточками товаров, фильтрацией по категориям, сортировкой и адаптивным дизайном.',
      en: 'Modern e-commerce UI with product cards, category filtering, sorting and fully responsive design.',
    },
  },
  {
    id: 6,
    image: 'public/projects/edu-platform.png',
    name: 'Edu Platform',
    cat: 'react',
    gradient: 'linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%)',
    live:   'https://edu-platform-hazel.vercel.app/',
    github: 'https://github.com/azizbekhafizov/Edu-platform',
    tags: ['React', 'Vite', 'Education', 'LMS'],
    desc: {
      uz: 'Online ta\'lim platformasi. Kurslar katalogi, o\'qituvchilar sahifasi, ro\'yxatdan o\'tish va shaxsiy kabinet bo\'limlari bilan.',
      ru: 'Онлайн-платформа для обучения с каталогом курсов, страницей преподавателей, регистрацией и личным кабинетом.',
      en: 'Online learning platform with course catalog, instructor profiles, registration and personal dashboard.',
    },
  },
  {
    id: 7,
    image: 'public/projects/fast-food.png',
    name: 'Fast Food',
    cat: 'react',
    gradient: 'linear-gradient(135deg, #e65100 0%, #ff8f00 100%)',
    live:   'https://fast-food-nine-drab.vercel.app/',
    github: 'https://github.com/azizbekhafizov/fast-food',
    tags: ['React', 'Vite', 'Food', 'Menu'],
    desc: {
      uz: 'Fast food restoran uchun zamonaviy veb-sayt. Interaktiv menyu, maxsus takliflar va buyurtma berish imkoniyati bilan.',
      ru: 'Современный сайт фастфуд-ресторана с интерактивным меню, спецпредложениями и возможностью оформления заказа.',
      en: 'Modern fast food restaurant website with interactive menu, special offers and order placement.',
    },
  },
  {
    id: 8,
    image: 'public/projects/dom-matrasov.png',
    name: 'Dom Matrasov',
    cat: 'clone',
    gradient: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
    live:   'https://dom-matrasov.vercel.app/',
    github: 'https://github.com/azizbekhafizov/dom-matrasov',
    tags: ['React', 'Vite', 'Clone', 'E-commerce'],
    desc: {
      uz: 'Matras va yotoq jihozlari uchun onlayn do\'kon kloni. Mahsulot katalogi, filtrlash va zamonaviy interfeys bilan.',
      ru: 'Клон интернет-магазина матрасов и товаров для сна с каталогом, фильтрацией и современным интерфейсом.',
      en: 'Clone of an online mattress store with product catalog, filtering and a clean modern interface.',
    },
  },
]

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
export const experience = [
  {
    period: '2022 — 2023',
    color: 'var(--primary)',
    type: { uz: 'Ta\'lim', ru: 'Образование', en: 'Education' },
    title: { uz: 'Frontend dasturlash', ru: 'Frontend разработка', en: 'Frontend Development' },
    org: 'IT Center',
    desc: {
      uz: 'HTML, CSS, JavaScript asoslarini o\'rgandim. Responsive dizayn, Bootstrap va SASS bilan ishlashni o\'zlashtirdim. Birinchi real loyihalarni yaratdim.',
      ru: 'Изучил основы HTML, CSS, JavaScript. Освоил адаптивный дизайн, Bootstrap и SASS. Создал первые реальные проекты.',
      en: 'Learned HTML, CSS, JavaScript fundamentals. Mastered responsive design, Bootstrap and SASS. Built first real projects.',
    },
    tags: ['HTML','CSS','JavaScript','Bootstrap'],
  },
  {
    period: '2024 — 2025',
    color: 'var(--secondary)',
    type: { uz: 'Ta\'lim', ru: 'Образование', en: 'Education' },
    title: { uz: 'Ilg\'or Frontend', ru: 'Продвинутый Frontend', en: 'Advanced Frontend' },
    org: 'Najot Ta\'lim',
    desc: {
      uz: 'React.js, Vue.js, TypeScript va zamonaviy best practice\'larni o\'rgandim. Jamoa loyihalarida ishtirok etdim va Agile metodologiya bilan tanishdim.',
      ru: 'Изучил React.js, Vue.js, TypeScript и современные best practices. Участвовал в командных проектах по методологии Agile.',
      en: 'Studied React.js, Vue.js, TypeScript and modern best practices. Participated in team projects with agile methodology.',
    },
    tags: ['React.js','Vue.js','TypeScript','TailwindCSS'],
  },
  {
    period: '2025',
    color: '#4ade80',
    type: { uz: '2 oy amaliyot', ru: '2 мес. практика', en: '2-month internship' },
    title: { uz: 'Frontend Amaliyotchi', ru: 'Frontend Стажёр', en: 'Frontend Intern' },
    org: 'Najot Ta\'lim',
    desc: {
      uz: '2 oylik amaliyot davomida real loyihalarda ishladim, senior dasturchlar bilan hamkorlik qildim va production-ready kod yozdim.',
      ru: 'В течение 2-месячной практики работал над реальными проектами, сотрудничал с senior-разработчиками и писал production-ready код.',
      en: 'During a 2-month internship, worked on real projects, collaborated with senior developers and wrote production-ready code.',
    },
    tags: ['React.js','Next.js','Git','Teamwork'],
  },
  {
    period: '2023 & 2025',
    color: '#facc15',
    type: { uz: 'Sertifikat', ru: 'Сертификат', en: 'Certificate' },
    title: { uz: 'Sertifikatlar', ru: 'Сертификаты', en: 'Certificates' },
    org: 'IT Center & Najot Ta\'lim',
    desc: {
      uz: 'IT Center va Najot Ta\'limdan rasmiy sertifikatlar olindi — zamonaviy frontend ishlanmasi bo\'yicha ko\'nikmalar tasdiqlandi.',
      ru: 'Получены официальные сертификаты от IT Center и Najot Ta\'lim — подтверждены навыки современной frontend-разработки.',
      en: 'Received official certificates from IT Center and Najot Ta\'lim — validating skills in modern frontend development.',
    },
    tags: ['🏆 IT Center','🏆 Najot Ta\'lim'],
  },
]

// ─── NAV LINKS ────────────────────────────────────────────────────────────────
export const navLinks = [
  { href: '#about',      label: { uz: 'Haqimda',       ru: 'Обо мне',  en: 'About'      } },
  { href: '#skills',     label: { uz: 'Texnologiyalar', ru: 'Навыки',   en: 'Skills'     } },
  { href: '#projects',   label: { uz: 'Loyihalar',      ru: 'Проекты',  en: 'Projects'   } },
  { href: '#experience', label: { uz: 'Tajriba',        ru: 'Опыт',     en: 'Experience' } },
  { href: '#contact',    label: { uz: 'Aloqa',          ru: 'Контакт',  en: 'Contact'    } },
]