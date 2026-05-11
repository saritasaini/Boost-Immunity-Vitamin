# 🔥 ULTRA-DETAILED BUILD PROMPT — TakeBoost.com
> **100% based on real scraped content from takeboost.com, /shop, and /about. Zero hallucination.**  
> Paste into v0, Bolt, Lovable, Claude, or hand directly to a developer.

---

## 📦 TECH STACK

| Layer | Technology |
|---|---|
| Framework | **Next.js 14** (App Router) |
| Language | **JavaScript / JSX** |
| Styling | **CSS Modules** + global CSS variables |
| Animations | **GSAP** (`gsap` + `ScrollTrigger` plugin) |
| Fonts | **Bebas Neue** (display) + **DM Sans** (body) via Google Fonts |
| Hosting | **Vercel** |
| E-commerce | Custom cart state (React `useState`) or headless Shopify |
| Analytics | Facebook Pixel `650750642228752`, Pinterest Tag `2612763773698`, Quantcast |

---

## 🧱 GLOBAL DESIGN SYSTEM

### Colors
```css
:root {
  --bg:        #000000;               /* Page background — pure black */
  --text:      #FFFFFF;               /* All text — pure white */
  --muted:     rgba(255,255,255,0.55);/* Secondary text, footer, labels */
  --border:    rgba(255,255,255,0.12);/* Subtle dividers and card borders */
  --btn-bg:    #FFFFFF;               /* CTA button fill */
  --btn-text:  #000000;               /* CTA button text */
}
```

### Typography
```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,700&display=swap');

--font-display: 'Bebas Neue', sans-serif;   /* ALL large headings */
--font-body:    'DM Sans', sans-serif;       /* Body, labels, nav, buttons */

/* Type Scale */
--text-hero:    clamp(72px, 13vw, 160px);   /* H1 hero */
--text-section: clamp(48px, 8vw, 110px);    /* H2 sections */
--text-sub:     clamp(32px, 5vw, 72px);     /* H3 subheadings */
--text-card:    clamp(22px, 3vw, 36px);     /* Card titles */
--text-body:    18px;                        /* Body copy */
--text-label:   12px;                        /* ALL CAPS labels */
--text-small:   13px;                        /* Footer, fine print */

/* Line Heights */
--lh-display: 0.88;   /* Very tight — for giant headings */
--lh-body:    1.6;    /* Comfortable for reading */

/* Letter Spacing */
--ls-label:   0.18em;  /* For ALL CAPS small labels */
--ls-display: -0.02em; /* Slight tightening on big type */
```

### Global CSS Reset
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
  cursor: none; /* Custom cursor replaces default */
}
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
::selection { background: #fff; color: #000; }
```

### Custom Cursor
```css
.cursor {
  position: fixed;
  width: 12px; height: 12px;
  background: #fff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
}
.cursor.hovering {
  width: 40px; height: 40px;
  background: rgba(255,255,255,0.1);
  border: 1px solid white;
}
```

```javascript
// JS — cursor follows mouse
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});
```

### Page Load Overlay
```css
.loader {
  position: fixed; inset: 0;
  background: #000;
  display: flex; align-items: center; justify-content: center;
  z-index: 10000;
  font-family: var(--font-display);
  font-size: 32px;
  letter-spacing: 0.15em;
  color: #fff;
  transition: opacity 0.6s ease;
}
.loader.hidden { opacity: 0; pointer-events: none; }
```
```javascript
// Remove loader after 800ms
window.addEventListener('load', () => {
  setTimeout(() => document.querySelector('.loader').classList.add('hidden'), 800);
});
```

### Shared Pill Button
```css
.btn-pill {
  display: inline-block;
  background: var(--btn-bg);
  color: var(--btn-text);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 16px 48px;
  border-radius: 999px;
  border: 2px solid #fff;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
  cursor: none;
}
.btn-pill:hover {
  background: transparent;
  color: #fff;
  transform: scale(1.04);
}
```

### Shared Marquee Keyframes
```css
@keyframes marquee-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
```

---

## 🗂️ FILE STRUCTURE (Next.js App Router)

```
/app
  layout.js          ← Root layout: fonts, cursor, loader, navbar, footer, analytics
  page.js            ← Homepage (/)
  /shop
    page.js          ← Shop page (/shop)
  /about
    page.js          ← About page (/about)
  /terms
    page.js          ← Terms of service
  /privacy
    page.js          ← Privacy policy

/components
  Cursor.jsx         ← Custom cursor
  Loader.jsx         ← Page load overlay
  Navbar.jsx         ← Fixed top navbar + cart drawer
  CartDrawer.jsx     ← Slide-in cart panel
  Hero.jsx           ← Homepage hero section
  WordSwap.jsx       ← Animated slot-machine word flip
  Ingredients.jsx    ← Ingredients section + marquee
  MarqueeRow.jsx     ← Reusable infinite marquee
  CertTicker.jsx     ← Certifications ticker
  Testimonials.jsx   ← Social proof cards
  BrandTicker.jsx    ← Double-row brand ticker
  GetBoosted.jsx     ← Final CTA section
  Footer.jsx         ← Site footer
  Accordion.jsx      ← Reusable expand/collapse component

/public/images
  elderberries.png
  orange.png
  zinc.png
  /accordion
    elderberry-accordion.png
    orange-accordion.png
    zinc-accordion.png

/styles
  globals.css        ← Reset, variables, keyframes, cursor, loader, btn-pill
```

---

## 🧭 NAVBAR — Fixed, All Pages

### Behavior
- `position: fixed; top: 0; left: 0; right: 0; z-index: 1000`
- `padding: 20px 32px`
- `display: flex; align-items: center; justify-content: space-between`
- **Fully transparent background** — no blur, no border, no shadow
- Always white text regardless of scroll position

### HTML Structure
```html
<header class="navbar">
  <!-- Left: Logo -->
  <a href="/" class="logo">BOOST</a>

  <!-- Center: Nav Links -->
  <nav>
    <a href="/">Home</a>
    <a href="/shop">Shop</a>
    <a href="/about">About</a>
  </nav>

  <!-- Right: Cart -->
  <button class="cart-btn" onclick="openCart()">Cart</button>
</header>
```

### CSS
```css
.navbar {
  position: fixed; top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 20px 32px;
  display: flex; align-items: center; justify-content: space-between;
  background: transparent;
}
.logo {
  font-family: var(--font-display);
  font-size: 28px;
  letter-spacing: 0.04em;
  color: #fff;
}
nav { display: flex; gap: 32px; }
nav a, .cart-btn {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: var(--ls-label);
  text-transform: uppercase;
  color: rgba(255,255,255,0.65);
  background: none; border: none;
  transition: color 0.2s;
  cursor: none;
}
nav a:hover, .cart-btn:hover { color: #fff; }
```

### Cart Drawer
```html
<!-- Dark overlay -->
<div class="cart-overlay" onclick="closeCart()"></div>

<!-- Drawer panel -->
<aside class="cart-drawer" id="cartDrawer">
  <div class="cart-header">
    <h3>Cart</h3>
    <button onclick="closeCart()">✕</button>
  </div>
  <div class="cart-body">
    <p>Your cart is empty</p>
    <a href="/shop" class="btn-pill">Go Shopping</a>
  </div>
</aside>
```

```css
.cart-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.65);
  z-index: 1100;
  opacity: 0; pointer-events: none;
  transition: opacity 0.3s ease;
}
.cart-overlay.open { opacity: 1; pointer-events: all; }

.cart-drawer {
  position: fixed; top: 0; right: 0;
  width: min(400px, 100vw);
  height: 100vh;
  background: #111;
  z-index: 1200;
  padding: 32px;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex; flex-direction: column; gap: 24px;
}
.cart-drawer.open { transform: translateX(0); }

.cart-header {
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid var(--border);
  padding-bottom: 16px;
}
.cart-header h3 {
  font-family: var(--font-display);
  font-size: 28px; letter-spacing: 0.05em;
}
.cart-header button {
  background: none; border: none; color: #fff;
  font-size: 22px; cursor: none;
}
.cart-body {
  display: flex; flex-direction: column;
  align-items: center; gap: 24px;
  padding-top: 40px;
  color: var(--muted);
  font-size: 16px;
}
```

```javascript
function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.querySelector('.cart-overlay').classList.add('open');
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.querySelector('.cart-overlay').classList.remove('open');
}
```

---

## 🏠 PAGE: HOME (`/`)

---

### SECTION 1 — HERO

- **Full viewport:** `min-height: 100vh`
- **Layout:** Flexbox column, centered both axes
- **No images.** Pure typography.

```html
<section class="hero">
  <!-- 1. Small label -->
  <span class="hero-label">Because Being Sick Sucks</span>

  <!-- 2. Giant H1 -->
  <h1 class="hero-title">
    <span class="hero-line1">BOOST</span>
    <span class="hero-line2"><em>Immunity Gummy Vitamin</em></span>
  </h1>

  <!-- 3. Animated word swap -->
  <div class="hero-swap">
    <span>Stay</span>
    <span class="swap-slot" id="slotA">sick 🤙</span>
    <span>not</span>
    <span class="swap-slot" id="slotB">🤧 sick</span>
  </div>

  <!-- 4. Subtext label -->
  <p class="hero-sub">BOOST helps you get sick less</p>

  <!-- 5. Tagline -->
  <h4 class="hero-tagline">Be proactive not reactive about your immunity</h4>

  <!-- 6. Body copy -->
  <p class="hero-body">
    No one gives a f*ck about their immune system unless they have to...
    and it took us a pandemic to realize that. BOOST is here to fix that.
  </p>

  <!-- 7. CTA -->
  <a href="/shop" class="btn-pill">Buy BOOST</a>
</section>
```

```css
.hero {
  min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center;
  padding: 120px 24px 80px;
  gap: 20px;
}
.hero-label {
  font-family: var(--font-body);
  font-size: var(--text-label);
  letter-spacing: var(--ls-label);
  text-transform: uppercase;
  color: var(--muted);
}
.hero-title {
  display: flex; flex-direction: column;
  line-height: var(--lh-display);
  letter-spacing: var(--ls-display);
}
.hero-line1 {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  color: #fff;
}
.hero-line2 {
  font-family: var(--font-display);
  font-size: clamp(40px, 6vw, 90px);
  font-style: italic;
  color: #fff;
}
.hero-swap {
  font-family: var(--font-display);
  font-size: clamp(36px, 5vw, 72px);
  display: flex; align-items: center; gap: 16px;
  flex-wrap: wrap; justify-content: center;
}
.swap-slot {
  display: inline-block;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease;
}
/* JS animates translateY + opacity every 2.5s — slot machine style */

.hero-sub {
  font-family: var(--font-body);
  font-size: var(--text-label);
  letter-spacing: var(--ls-label);
  text-transform: uppercase;
  color: var(--muted);
}
.hero-tagline {
  font-family: var(--font-body);
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 500;
  color: var(--muted);
  max-width: 600px;
}
.hero-body {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--muted);
  max-width: 540px;
  line-height: var(--lh-body);
}
```

**Word Swap Animation (JS):**
```javascript
// Slot-machine vertical flip every 2.5s
// slotA stays "sick 🤙" — slotB cycles "🤧 sick"
// Animate: translateY(0→-24px) + opacity(1→0) OUT, then (24px→0) + (0→1) IN
setInterval(() => {
  const slot = document.getElementById('slotB');
  slot.style.transform = 'translateY(-24px)';
  slot.style.opacity = '0';
  setTimeout(() => {
    slot.textContent = '🤧 sick'; // swap content here if cycling multiple words
    slot.style.transition = 'none';
    slot.style.transform = 'translateY(24px)';
    slot.style.opacity = '0';
    requestAnimationFrame(() => {
      slot.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
      slot.style.transform = 'translateY(0)';
      slot.style.opacity = '1';
    });
  }, 400);
}, 2500);
```

---

### SECTION 2 — INGREDIENTS

```html
<section class="ingredients">

  <!-- Section Header -->
  <div class="ingredients-header">
    <h2 class="ingredients-title"><em>Ingred&nbsp;—&nbsp;ients</em></h2>
    <p class="ingredients-sub">And you, of course.<br><em>your mom will love</em></p>
  </div>

  <!-- Marquee Row 1: LEFT scroll -->
  <div class="marquee-wrap">
    <div class="marquee-track">
      <img src="/images/elderberries.png" alt="Elderberry">
      <span>ELDERBERRY</span>
      <img src="/images/orange.png" alt="Vitamin C">
      <span>VITAMIN C</span>
      <img src="/images/zinc.png" alt="Zinc">
      <span>ZINC</span>
      <!-- DUPLICATE below for seamless infinite loop -->
      <img src="/images/elderberries.png" alt="Elderberry">
      <span>ELDERBERRY</span>
      <img src="/images/orange.png" alt="Vitamin C">
      <span>VITAMIN C</span>
      <img src="/images/zinc.png" alt="Zinc">
      <span>ZINC</span>
    </div>
  </div>

  <!-- 3 Ingredient Cards -->
  <div class="ingredient-cards">
    <div class="ing-card">
      <img src="/images/elderberries.png" alt="Elderberry">
      <h3>Elderberry</h3>
    </div>
    <div class="ing-card">
      <img src="/images/orange.png" alt="Vitamin C">
      <h3>Vitamin C</h3>
    </div>
    <div class="ing-card">
      <img src="/images/zinc.png" alt="Zinc">
      <h3>Zinc</h3>
    </div>
  </div>

  <!-- Marquee Row 2: identical, LEFT scroll -->
  <div class="marquee-wrap">
    <!-- same content as Row 1 -->
  </div>

</section>
```

```css
.ingredients { padding: 100px 0; overflow: hidden; }

.ingredients-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 48px;
  margin-bottom: 60px;
  gap: 32px; flex-wrap: wrap;
}
.ingredients-title {
  font-family: var(--font-display);
  font-size: var(--text-section);
  font-style: italic;
  line-height: var(--lh-display);
}
.ingredients-sub {
  font-family: var(--font-body);
  font-size: clamp(16px, 2vw, 22px);
  color: var(--muted);
  text-align: right;
  font-style: italic;
  line-height: 1.4;
}

/* Marquee */
.marquee-wrap {
  overflow: hidden; width: 100%;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 20px 0; margin: 40px 0;
}
.marquee-track {
  display: flex; align-items: center;
  gap: 48px; width: max-content;
  animation: marquee-left 28s linear infinite;
}
.marquee-track img {
  width: 80px; height: 80px;
  object-fit: contain; border-radius: 50%;
  background: rgba(255,255,255,0.06);
  padding: 8px;
}
.marquee-track span {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 56px);
  letter-spacing: 0.04em;
  white-space: nowrap;
}

/* Ingredient Cards */
.ingredient-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 48px;
  border: 1px solid var(--border);
}
.ing-card {
  display: flex; flex-direction: column;
  align-items: center; gap: 20px;
  padding: 48px 24px;
  border-right: 1px solid var(--border);
  transition: background 0.3s;
}
.ing-card:last-child { border-right: none; }
.ing-card:hover { background: rgba(255,255,255,0.04); }
.ing-card img { width: 120px; height: 120px; object-fit: contain; }
.ing-card h3 {
  font-family: var(--font-display);
  font-size: 36px; letter-spacing: 0.05em;
}
```

---

### SECTION 3 — CERTIFICATIONS TICKER

```html
<section class="cert-ticker">
  <div class="marquee-wrap cert-row">
    <div class="cert-track">
      <span>Vegan</span><span class="bull">•</span>
      <span>Non GMO</span><span class="bull">•</span>
      <span>Nut Free</span><span class="bull">•</span>
      <em>Gluten Free</em><span class="bull">•</span>
      <span>Made in USA</span><span class="bull">•</span>
      <!-- Duplicate -->
      <span>Vegan</span><span class="bull">•</span>
      <em>Gluten Free</em><span class="bull">•</span>
      <span>Non GMO</span><span class="bull">•</span>
      <span>Nut Free</span><span class="bull">•</span>
      <span>Made in USA</span><span class="bull">•</span>
    </div>
  </div>
</section>
```

```css
.cert-ticker { overflow: hidden; }
.cert-row { padding: 16px 0; }
.cert-track {
  display: flex; align-items: center;
  gap: 32px; width: max-content;
  animation: marquee-left 20s linear infinite;
}
.cert-track span, .cert-track em {
  font-family: var(--font-display);
  font-size: clamp(36px, 5vw, 72px);
  white-space: nowrap;
}
.cert-track em { font-style: italic; }
.cert-track .bull { color: var(--muted); font-size: 0.5em; }
```

---

### SECTION 4 — TESTIMONIALS

```html
<section class="testimonials">
  <h2 class="testimonials-title">
    Let the 💪 BOOST 💪 flow thru you⚡️
  </h2>

  <div class="testimonial-grid">
    <blockquote class="t-card">
      <p>"I haven't sneezed since I took BOOST"</p>
      <cite>@superman</cite>
    </blockquote>
    <blockquote class="t-card">
      <p>"It's the perfect pick-me-up"</p>
      <cite>@Karenfromyouroffice</cite>
    </blockquote>
  </div>
</section>
```

```css
.testimonials { padding: 100px 48px; display: flex; flex-direction: column; gap: 64px; }
.testimonials-title {
  font-family: var(--font-display);
  font-size: var(--text-sub);
  line-height: var(--lh-display);
  max-width: 800px;
}
.testimonial-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
}
.t-card {
  padding: 48px;
  border: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 16px;
  transition: background 0.3s;
}
.t-card:hover { background: rgba(255,255,255,0.03); }
.t-card p {
  font-family: var(--font-body);
  font-size: clamp(20px, 2.5vw, 32px);
  font-style: italic;
  line-height: 1.3; color: #fff;
}
.t-card cite {
  font-family: var(--font-body);
  font-size: var(--text-label);
  letter-spacing: var(--ls-label);
  text-transform: uppercase;
  color: var(--muted);
  font-style: normal;
}
```

---

### SECTION 5 — DOUBLE BRAND TICKER

```html
<section class="brand-ticker">
  <!-- Row 1: scrolls LEFT -->
  <div class="ticker-row">
    <div class="ticker-track left">
      <span>• AN IMMUNITY VITAMIN</span>
      <span>• IT'S LIKE A CONDOM FOR YOUR HEALTH</span>
      <span>• FOMO FOR YOUR HEALTH</span>
      <span>• BECAUSE BEING SICK SUCKS</span>
      <span>• DON'T PANIC, TAKE BOOST</span>
      <span>• BOOST YOUR IMMUNITY</span>
      <!-- DUPLICATE the full set again for seamless loop -->
    </div>
  </div>

  <!-- Row 2: scrolls RIGHT (reverse) -->
  <div class="ticker-row">
    <div class="ticker-track right">
      <!-- Same content as Row 1 -->
    </div>
  </div>
</section>
```

```css
.brand-ticker { overflow: hidden; }
.ticker-row {
  border-top: 1px solid var(--border);
  padding: 14px 0; overflow: hidden;
}
.ticker-track {
  display: flex; align-items: center;
  gap: 48px; width: max-content;
  font-family: var(--font-display);
  font-size: clamp(20px, 3vw, 36px);
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.ticker-track.left  { animation: marquee-left  30s linear infinite; }
.ticker-track.right { animation: marquee-right 30s linear infinite; }
```

---

### SECTION 6 — GET BOOSTED (Final CTA)

```html
<section class="get-boosted">
  <a href="/shop" class="boosted-link">
    <span class="get">GET</span>
    <span class="boosted">BOOSTED</span>
  </a>
</section>
```

```css
.get-boosted {
  padding: 120px 48px;
  border-top: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
}
.boosted-link {
  display: flex; flex-direction: column;
  align-items: center; line-height: var(--lh-display);
  transition: opacity 0.2s;
}
.get, .boosted {
  font-family: var(--font-display);
  font-size: clamp(80px, 16vw, 200px);
  letter-spacing: var(--ls-display);
  color: #fff; display: block;
}
.boosted-link:hover .boosted {
  -webkit-text-stroke: 2px #fff;
  color: transparent;
  transition: color 0.2s, -webkit-text-stroke 0.2s;
}
```

---

## 🛒 PAGE: SHOP (`/shop`)

### Shop Hero / Intro Block
```html
<section class="shop-intro">
  <span class="section-label">IMMUNITY GUMMY VITAMINS</span>
  <p>
    BOOST immunity gummy vitamins are loaded with Elderberry, Vitamin C and Zinc —
    the three power ingredients that put your immune system on the offense.
    BOOST has 3g of sugar (half the amount of sugar as the leading gummy vitamins) per serving.
  </p>
  <h3>Because being sick sucks</h3>
</section>
```

```css
.shop-intro {
  padding: 160px 48px 80px;
  display: flex; flex-direction: column; gap: 24px;
  max-width: 800px;
}
.section-label {
  font-family: var(--font-body);
  font-size: var(--text-label);
  letter-spacing: var(--ls-label);
  text-transform: uppercase;
  color: var(--muted);
}
.shop-intro p {
  font-family: var(--font-body);
  font-size: clamp(16px, 1.8vw, 20px);
  color: var(--muted);
  line-height: var(--lh-body);
}
.shop-intro h3 {
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 64px);
}
```

### Pricing Cards (2 options)
```html
<section class="pricing">

  <div class="price-card">
    <h4>Single Purchase</h4>
    <div class="price">$35.00</div>
    <ul>
      <li>+ One Bottle</li>
      <li>+ One Time Purchase</li>
      <li>+ Standard Tips*</li>
      <li class="note">*Standard Tips include weekly immunity consulting and FIRE limited time offers...all for free</li>
    </ul>
    <button class="btn-pill">ADD TO CART</button>
  </div>

  <div class="price-card featured">
    <h4>Subscribe and Save</h4>
    <div class="price">$30.00</div>
    <ul>
      <li>+ One Bottle/Month</li>
      <li>+ Cancel Anytime</li>
      <li>+ *BOOST Membership</li>
      <li class="note">*BOOST membership includes weekly immunity tips, limited time offers, sick discounts, first access to new products and merch, and 24/7 customer service</li>
    </ul>
    <button class="btn-pill">ADD TO CART</button>
  </div>

</section>
```

```css
.pricing {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px; margin: 0 48px;
}
.price-card {
  border: 1px solid var(--border);
  padding: 48px;
  display: flex; flex-direction: column; gap: 24px;
  transition: background 0.3s;
}
.price-card:hover { background: rgba(255,255,255,0.03); }
.price-card.featured { border-color: rgba(255,255,255,0.5); }
.price-card h4 {
  font-family: var(--font-body);
  font-size: var(--text-label);
  letter-spacing: var(--ls-label);
  text-transform: uppercase;
  color: var(--muted);
}
.price-card .price {
  font-family: var(--font-display);
  font-size: clamp(48px, 6vw, 80px);
  line-height: 1;
}
.price-card ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.price-card li { font-size: 16px; color: rgba(255,255,255,0.8); line-height: 1.5; }
.price-card li.note { font-size: 13px; color: var(--muted); font-style: italic; }
```

### What's Inside — Ingredient Accordion

**Heading:**
```html
<section class="whats-inside">
  <h2>WHAT'S INSIDE?<em>Peep the ingredients</em></h2>

  <!-- Elderberry -->
  <details class="accordion">
    <summary>
      <span class="acc-name">Elderberry</span>
      <span class="acc-amount">BOOST has 150mg of Elderberry Extract per serving</span>
      <span class="acc-toggle">+</span>
    </summary>
    <div class="acc-body">
      <div class="acc-text">
        <p>A natural remedy with a long history of medicinal use, Elderberry Extract has a wide array of health benefits and powerful immune-boosting, antiviral properties.</p>
        <h5>Benefits</h5>
        <ul>
          <li><strong>Major Cold and Flu Relief</strong> — Elderberry extract has been shown to be a safe treatment for both cold and flu symptoms thanks to its anthocyanidins, chemical compounds known for their immuno-stimulant effects 🤒</li>
          <li><strong>Encourages Healthy Skin</strong> — Its bio-flavonoids, antioxidants, and high Vitamin A content make it awesome for skin health 💅</li>
          <li><strong>Sinus Infection Aid</strong> — With elderberry's anti-inflammatory and antioxidant properties, it also helps clear up sinus infections and ease allergies 🤧</li>
          <li><strong>Anti-inflammatory benefits</strong> — Elderberry is packed with antioxidants that help fight inflammation, linked to improving symptoms of arthritis 🧐</li>
        </ul>
      </div>
      <img src="/images/accordion/elderberry-accordion.png" alt="Elderberry">
    </div>
  </details>

  <!-- Vitamin C -->
  <details class="accordion">
    <summary>
      <span class="acc-name">Vitamin C</span>
      <span class="acc-amount">BOOST has 100mg of Vitamin C per serving</span>
      <span class="acc-toggle">+</span>
    </summary>
    <div class="acc-body">
      <div class="acc-text">
        <p>One of the best known ingredients for improving immune health, Vitamin C acts as an antioxidant in the body, and may help reduce symptoms and shorten the duration of the common cold.</p>
        <h5>Benefits</h5>
        <ul>
          <li><strong>Improves Symptoms of the Common Cold</strong> — May help reduce symptoms and shorten the duration of respiratory tract infections 😷</li>
          <li><strong>Holds Powerful Antioxidant Properties</strong> — Helps prevent the buildup of free radicals to protect your body against disease 🤑</li>
          <li><strong>Promotes Glowing Skin</strong> — Believed to help slow skin aging and protect against skin damage 🧖‍♀️</li>
          <li><strong>Enhances Brain Function</strong> — High antioxidant intake of Vitamin C could slow cognitive delay in older adults 🤓</li>
        </ul>
      </div>
      <img src="/images/accordion/orange-accordion.png" alt="Vitamin C">
    </div>
  </details>

  <!-- Zinc -->
  <details class="accordion">
    <summary>
      <span class="acc-name">Zinc</span>
      <span class="acc-amount">BOOST has 10mg of Zinc per serving</span>
      <span class="acc-toggle">+</span>
    </summary>
    <div class="acc-body">
      <div class="acc-text">
        <p>Zinc helps control inflammation and aids in the development of immune cells. This natural, essential mineral helps fight the common cold and may reduce your risk of becoming sick.</p>
        <h5>Benefits</h5>
        <ul>
          <li><strong>Acts as a Powerful Antioxidant</strong> — May relieve stress on the immune system, helping BOOST the function of T-cells 🥵</li>
          <li><strong>Helps Balance Hormones</strong> — Plays an important role in hormone production by increasing testosterone naturally 😵</li>
          <li><strong>Maintains Heart Health</strong> — Needed to maintain the health of cells within the cardiovascular system 🤜🤛</li>
          <li><strong>Aids in Digestion</strong> — Affects protein synthesis and is required by the body to use amino acids from food 💆‍♂️</li>
        </ul>
      </div>
      <img src="/images/accordion/zinc-accordion.png" alt="Zinc">
    </div>
  </details>

  <!-- Inactive Ingredients -->
  <div class="inactive-ing">
    <strong>Inactive Ingredients</strong>
    <p>Maltose Syrup, Purified Water, Sucrose, Polydextrose, Carrageenan, Pectin, Sodium Hexametaphosphate, Blueberry Flavor, Vegetable Oil, Carnauba Wax, Trisodium Citrate.</p>
  </div>

</section>
```

```css
.whats-inside { padding: 100px 48px; }
.whats-inside h2 {
  font-family: var(--font-display);
  font-size: var(--text-section);
  line-height: var(--lh-display);
  margin-bottom: 64px;
  display: flex; flex-direction: column;
}
.whats-inside h2 em {
  font-style: italic;
  font-size: 0.45em;
  color: var(--muted);
  letter-spacing: 0.02em;
}

/* Accordion */
.accordion { border-top: 1px solid var(--border); }
.accordion:last-of-type { border-bottom: 1px solid var(--border); }

.accordion summary {
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 28px 0;
  cursor: none;
  list-style: none;
  gap: 24px;
}
.accordion summary::-webkit-details-marker { display: none; }

.acc-name {
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 52px);
  min-width: 200px;
}
.acc-amount {
  font-family: var(--font-body);
  font-size: 14px; color: var(--muted);
  flex: 1; text-align: center;
}
.acc-toggle {
  font-size: 28px; font-weight: 300; color: #fff;
  transition: transform 0.35s ease;
}
.accordion[open] .acc-toggle { transform: rotate(45deg); }

.acc-body {
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 48px;
  padding: 0 0 48px;
  align-items: start;
}
.acc-body img { width: 220px; object-fit: contain; }
.acc-text p {
  font-family: var(--font-body);
  font-size: 16px; color: var(--muted);
  line-height: var(--lh-body);
  margin-bottom: 24px;
}
.acc-text h5 {
  font-family: var(--font-body);
  font-size: var(--text-label);
  letter-spacing: var(--ls-label);
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 16px;
}
.acc-text ul { list-style: none; }
.acc-text li {
  font-family: var(--font-body);
  font-size: 16px; color: rgba(255,255,255,0.75);
  line-height: 1.6;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.acc-text li strong { color: #fff; }

.inactive-ing {
  padding: 32px 0;
  border-top: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 8px;
}
.inactive-ing strong {
  font-family: var(--font-body);
  font-size: var(--text-label);
  letter-spacing: var(--ls-label);
  text-transform: uppercase;
  color: var(--muted);
}
.inactive-ing p { font-size: 14px; color: var(--muted); line-height: 1.6; }
```

### Shop Testimonials (3 Cards)
```html
<section class="shop-testimonials">
  <div class="shop-testimonials-header">
    <span class="section-label">WORD ON THE STREET</span>
    <h3>Trust us with your immunity</h3>
  </div>

  <div class="t-grid-3">
    <blockquote class="t-card">
      <p>"I haven't sneezed since I took BOOST"</p>
      <cite>@superman</cite>
    </blockquote>
    <blockquote class="t-card">
      <p>"The only [best] way to rise and shine"</p>
      <cite>@TheentireKUWTKcast</cite>
    </blockquote>
    <blockquote class="t-card">
      <p>"It's like a refreshing cold shower"</p>
      <cite>@JesseClemente</cite>
    </blockquote>
  </div>
</section>
```

```css
.shop-testimonials { padding: 80px 48px; }
.shop-testimonials-header {
  display: flex; flex-direction: column; gap: 8px;
  margin-bottom: 48px;
}
.shop-testimonials-header h3 {
  font-family: var(--font-display);
  font-size: var(--text-sub);
  line-height: var(--lh-display);
}
.t-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}
```

Then: Brand Ticker (double row) → GET BOOSTED CTA → Footer

---

## ℹ️ PAGE: ABOUT (`/about`)

### About Hero
```html
<section class="about-hero">
  <h1>Your immune system will<br>thank you later.</h1>
</section>
```
```css
.about-hero {
  min-height: 70vh;
  display: flex; align-items: flex-end;
  padding: 120px 48px 80px;
}
.about-hero h1 {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  line-height: var(--lh-display);
  max-width: 900px;
}
```

### Who We Are (2-column)
```html
<section class="about-who">
  <div class="about-col">
    <span class="section-label">Who we are</span>
    <p>BOOST is the first company dedicated to helping you get sick less. Because, honestly, why wait until you're sick to take care of your health? We consider immunity to be of the utmost importance, and we believe vitamins should work for you…even if you're not working for them.</p>
  </div>
  <div class="about-col">
    <h3>We make products to help you feel good while still tasting 👅 good.</h3>
    <p>We hope to BOOST your mood in the process. BOOST is not just another brand, it's a movement. Your immune system will thank you later.</p>
  </div>
</section>
```
```css
.about-who {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  padding: 80px 48px;
  border-top: 1px solid var(--border);
}
.about-col { display: flex; flex-direction: column; gap: 20px; }
.about-col h3 {
  font-family: var(--font-display);
  font-size: clamp(28px, 3.5vw, 48px);
  line-height: 1.1;
}
.about-col p { font-size: 18px; color: var(--muted); line-height: var(--lh-body); }
```

### FAQ Section (Accordion, 3 categories)

**Category labels:** General · Shipping · Brand  
Use the same `.accordion` CSS as the shop page.

```html
<section class="faq">
  <h2>Faq</h2>

  <div class="faq-category">
    <span class="section-label">General</span>

    <details class="accordion">
      <summary>
        <span class="acc-name">Do I have to sign up for your texting service?</span>
        <span class="acc-toggle">+</span>
      </summary>
      <div class="faq-answer">
        <p>No, but you should. BOOST works best when you take advantage of everyyyything we offer. Plus we're cool people. Text us about literally anything.</p>
      </div>
    </details>

    <details class="accordion">
      <summary>
        <span class="acc-name">Do I need to sign up for a BOOST Membership?</span>
        <span class="acc-toggle">+</span>
      </summary>
      <div class="faq-answer">
        <p>No, but members get ~all~ the perks and ~sick~ deals. Trust us, you don't want to miss out.</p>
      </div>
    </details>

    <details class="accordion">
      <summary>
        <span class="acc-name">Are your products gluten free?</span>
        <span class="acc-toggle">+</span>
      </summary>
      <div class="faq-answer">
        <p>Yes, we're gluten free and you'll find the gluten free logo on our bottles.</p>
      </div>
    </details>

    <details class="accordion">
      <summary>
        <span class="acc-name">Are your products vegan?</span>
        <span class="acc-toggle">+</span>
      </summary>
      <div class="faq-answer">
        <p>Yes, BOOST gummies are made from pectin, a byproduct of plants. No shady gelatin here.</p>
      </div>
    </details>

    <details class="accordion">
      <summary>
        <span class="acc-name">Are your products organic?</span>
        <span class="acc-toggle">+</span>
      </summary>
      <div class="faq-answer">
        <p>Our products have active ingredients that are organic although none of our products are entirely certified organic. We're in the process of becoming certified and it's one of our top priorities.</p>
      </div>
    </details>
  </div>

  <div class="faq-category">
    <span class="section-label">Shipping</span>

    <details class="accordion">
      <summary>
        <span class="acc-name">When can I expect my order?</span>
        <span class="acc-toggle">+</span>
      </summary>
      <div class="faq-answer">
        <p>We're currently filing a ton of orders from AWESOME people like you. Feel free to email sup@takeboost.com with any questions.</p>
      </div>
    </details>

    <details class="accordion">
      <summary>
        <span class="acc-name">Where is BOOST located?</span>
        <span class="acc-toggle">+</span>
      </summary>
      <div class="faq-answer">
        <p>Our offices are in New York City and all of our products are made and manufactured in the USA.</p>
      </div>
    </details>
  </div>

  <div class="faq-category">
    <span class="section-label">Brand</span>

    <details class="accordion">
      <summary>
        <span class="acc-name">Why BOOST?</span>
        <span class="acc-toggle">+</span>
      </summary>
      <div class="faq-answer">
        <p>We're on a mission to make health simple and we're starting with your immune system 🤓 We're the first company totally dedicated to your immune system and that's why you should pick BOOST — to help you get sick less.</p>
      </div>
    </details>

    <details class="accordion">
      <summary>
        <span class="acc-name">When will you be releasing new products?</span>
        <span class="acc-toggle">+</span>
      </summary>
      <div class="faq-answer">
        <p>We're currently working to release another line. Sign up for our email list to stay in the loop.</p>
      </div>
    </details>

    <details class="accordion">
      <summary>
        <span class="acc-name">Does BOOST test on animals?</span>
        <span class="acc-toggle">+</span>
      </summary>
      <div class="faq-answer">
        <p>Literally, Kim, we would never. Ew. Who does that anymore?</p>
      </div>
    </details>
  </div>
</section>
```

```css
.faq { padding: 80px 48px; }
.faq h2 {
  font-family: var(--font-display);
  font-size: var(--text-section);
  margin-bottom: 64px;
}
.faq-category { margin-bottom: 64px; }
.faq-category > .section-label {
  display: block;
  margin-bottom: 24px;
}
.faq-answer {
  padding: 0 0 28px;
}
.faq-answer p { font-size: 16px; color: var(--muted); line-height: var(--lh-body); }
```

### About CTA
```html
<div class="about-cta">
  <h2>Stay sick 🤙🤧 not sick</h2>
</div>
```
```css
.about-cta {
  padding: 80px 48px;
  border-top: 1px solid var(--border);
}
.about-cta h2 {
  font-family: var(--font-display);
  font-size: var(--text-section);
  line-height: var(--lh-display);
}
```

Then: Brand Ticker (double row) → GET BOOSTED → Footer

---

## 🦶 FOOTER — All Pages

```html
<footer>
  <div class="footer-inner">

    <!-- Column 1: Logo + copyright -->
    <div class="footer-col">
      <a href="/" class="logo">BOOST</a>
      <span class="footer-copy">©2020</span>
    </div>

    <!-- Column 2: Nav links (2 groups) -->
    <div class="footer-col links">
      <div class="link-group">
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/about">About</a>
      </div>
      <div class="link-group">
        <a href="mailto:sup@takeboost.com">Contact</a>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
      </div>
    </div>

    <!-- Column 3: Social + SMS -->
    <div class="footer-col social">
      <div class="link-group">
        <a href="https://instagram.com/takeboost" target="_blank" rel="noopener">Instagram</a>
        <a href="https://tiktok.com/@takeboost" target="_blank" rel="noopener">TikTok</a>
        <a href="https://facebook.com/takeboostvitamins" target="_blank" rel="noopener">Facebook</a>
      </div>
      <div class="sms-block">
        <p>Text us - your 24/7 immunity consultants</p>
        <a href="tel:+19175408641">+1 (917) 540-8641</a>
      </div>
    </div>

  </div>
</footer>
```

```css
footer {
  border-top: 1px solid var(--border);
  padding: 48px;
}
.footer-inner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 64px;
  align-items: start;
}
.footer-col.links {
  display: flex; gap: 48px; flex-wrap: wrap;
}
.link-group {
  display: flex; flex-direction: column; gap: 10px;
}
.link-group a {
  font-family: var(--font-body);
  font-size: var(--text-small);
  letter-spacing: var(--ls-label);
  text-transform: uppercase;
  color: var(--muted);
  transition: color 0.2s;
}
.link-group a:hover { color: #fff; }
.footer-copy {
  font-family: var(--font-body);
  font-size: var(--text-small);
  color: var(--muted);
  margin-top: 8px;
  display: block;
}
.sms-block {
  display: flex; flex-direction: column; gap: 6px;
  margin-top: 16px;
}
.sms-block p, .sms-block a {
  font-family: var(--font-body);
  font-size: var(--text-small);
  color: var(--muted);
}
.sms-block a { text-decoration: underline; }
.sms-block a:hover { color: #fff; }
```

---

## ⚙️ ALL ANIMATIONS SUMMARY

| Element | Animation | Trigger |
|---|---|---|
| Page load overlay | Fade out (opacity 1→0) | `window.load` after 800ms |
| Hero text lines | Staggered fade + slide up (`translateY 40px→0`) | On load, 100ms delay each |
| Word slot swap | Vertical flip `translateY` + opacity | `setInterval` every 2500ms |
| Ingredient marquee | `marquee-left` CSS keyframe, 28s | Always running |
| Cert ticker | `marquee-left` CSS keyframe, 20s | Always running |
| Brand ticker row 1 | `marquee-left` 30s | Always running |
| Brand ticker row 2 | `marquee-right` 30s | Always running |
| Ingredient cards | Fade + `translateY 30px→0` | Intersection Observer |
| Accordion open/close | `+` rotates 45° | `<details>` native toggle |
| Cart drawer | `translateX(100%→0)` + overlay fade | Button click |
| CTA button hover | `scale(1.04)` + invert colors | `:hover` |
| GET BOOSTED hover | Text stroke outline on BOOSTED | `:hover` |
| Cursor | Follows mouse; expands on hover | `mousemove` |
| Custom cursor enlarge | `width/height 12px→40px` | `mouseenter` on links/buttons |

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile: < 768px */
@media (max-width: 768px) {
  .navbar { padding: 16px 20px; }
  nav { display: none; } /* Hamburger menu or inline stack */
  .hero-line1 { font-size: clamp(60px, 18vw, 90px); }
  .ingredient-cards { grid-template-columns: 1fr; margin: 0 20px; }
  .ing-card { border-right: none; border-bottom: 1px solid var(--border); }
  .testimonial-grid, .t-grid-3 { grid-template-columns: 1fr; }
  .pricing { grid-template-columns: 1fr; }
  .about-who { grid-template-columns: 1fr; }
  .footer-inner { grid-template-columns: 1fr; gap: 32px; }
  .ingredients-header, .testimonials, .faq,
  .shop-intro, .whats-inside, .get-boosted { padding-left: 20px; padding-right: 20px; }
  .acc-body { grid-template-columns: 1fr; }
  .acc-body img { width: 120px; }
}

/* Tablet: 768px – 1024px */
@media (min-width: 768px) and (max-width: 1024px) {
  .t-grid-3 { grid-template-columns: 1fr 1fr; }
  .footer-inner { grid-template-columns: 1fr 1fr; }
}
```

---

## 🚫 STRICT DO-NOT LIST

- ❌ No gradients anywhere — pure flat black `#000000`
- ❌ No box shadows — completely flat design
- ❌ No rounded card corners (only pill buttons use `border-radius`)
- ❌ No background images on sections — only on ingredient photos
- ❌ No default blue/purple hyperlink colors
- ❌ No serif body text — `DM Sans` only for body copy
- ❌ No placeholder lorem ipsum — use all real copy from this document
- ❌ No hamburger menu icon on desktop
- ❌ No footer background color change — stays `#000000`
- ❌ No sticky cart counter bubble unless cart has items

---

## ✅ REAL COPY REFERENCE

| Location | Exact text |
|---|---|
| Meta description | "Loaded with Elderberry, Vitamin C, and Zinc, BOOST is the first gummy vitamin dedicated to your immune system. BOOST helps you get sick less." |
| Hero label | "BECAUSE BEING SICK SUCKS" |
| Hero H1 | "BOOST / Immunity Gummy Vitamin" |
| Hero swap | "Stay sick 🤙 not 🤧 sick" |
| Hero sub | "BOOST helps you get sick less" |
| Hero tagline | "Be proactive not reactive about your immunity" |
| Hero body | "No one gives a f*ck about their immune system unless they have to...and it took us a pandemic to realize that. BOOST is here to fix that." |
| Hero CTA | "Buy BOOST" |
| Ingredients title | "Ingred — ients" |
| Ingredients sub | "And you, of course. your mom will love" |
| Cert ticker | "Vegan • Non GMO • Nut Free • Gluten Free • Made in USA" |
| Testimonial heading | "Let the 💪 BOOST 💪 flow thru you⚡️" |
| Brand ticker | "• AN IMMUNITY VITAMIN • IT'S LIKE A CONDOM FOR YOUR HEALTH • FOMO FOR YOUR HEALTH • BECAUSE BEING SICK SUCKS • DON'T PANIC, TAKE BOOST • BOOST YOUR IMMUNITY" |
| Final CTA | "GET BOOSTED" (links to /shop) |
| Contact email | sup@takeboost.com |
| SMS number | +1 (917) 540-8641 |
| Instagram | @takeboost |
| TikTok | @takeboost |
| Facebook | takeboostvitamins |

---

*Build prompt generated from live site: takeboost.com · /shop · /about*
