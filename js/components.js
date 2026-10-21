function headerTemplate(page) {
  const link = (href, label, key) => `<a href="${href}" @click="mobileOpen=false" class="block py-2 ${page===key?'text-brand-600 font-medium':'text-gray-700'} hover:text-brand-600 transition">${label}</a>`;
  const dlink = (href, label, key) => `<a href="${href}" class="${page===key?'text-brand-600':'hover:text-brand-600'} transition">${label}</a>`;
  return `
  <div class="bg-brand-900 text-brand-100 text-xs sm:text-sm">
    <div class="max-w-7xl mx-auto px-4 py-2.5 text-center flex flex-wrap items-center justify-center gap-x-3 gap-y-1">✨ Free shipping on orders over $50 · Easy 30-day returns · <a href="track.html" class="underline hover:text-white">Track Order</a> · <a href="contact.html" class="underline hover:text-white">Help</a> · <a href="privacy.html" class="underline hover:text-white">Privacy</a></div>
  </div>
  <header class="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200/60">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
      <a href="index.html" class="flex items-center gap-2 font-display text-2xl font-bold text-gray-900 tracking-tight">
        <!-- IMAGE LOGO: uncomment to use an image logo (set src to your logo file) -->
        <!-- <img loading="lazy" src="logo.png" alt="Logo" class="h-8 w-auto object-contain" /> -->
        <!-- TEXT LOGO: uncomment to use a text logo (uses store name from config) -->
        <span x-text="(typeof config !== 'undefined' && config) ? config.storeName : 'Lumen'">Lumen</span>
      </a>
      <nav class="hidden md:flex gap-7 text-sm font-medium text-gray-600 ml-8">
        ${dlink('index.html','Home','home')}
        ${dlink('shop.html','Shop','shop')}
        ${dlink('about.html','About','about')}
        ${dlink('contact.html','Contact','contact')}
        ${dlink('orders.html','Orders','orders')}
      </nav>
      <div class="flex-1"></div>
      <!-- Desktop search -->
      <div class="relative hidden md:block">
        <input type="search" placeholder="Search…" x-model="query" class="w-44 lg:w-56 pl-9 pr-3 py-2 text-sm rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400 transition" />
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/></svg>
      </div>
      <!-- Desktop right-side icons -->
      <div class="hidden md:flex items-center gap-1">
        <a href="notifications.html" class="relative p-2 rounded-full hover:bg-gray-100 transition" aria-label="Notifications">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          <span x-show="typeof $store !== 'undefined' && $store.notifications && $store.notifications.unreadCount()>0" x-text="$store.notifications.unreadCount()" class="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow"></span>
        </a>
        <div class="relative">
          <button onclick="toggleUserMenu()" class="p-2 rounded-full hover:bg-gray-100 transition" aria-label="User menu">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </button>
          <div x-show="userOpen" x-cloak x-transition class="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-soft border border-gray-100 py-2 z-50">
            <a href="orders.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">Orders</a>
            <a href="wishlist.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">Wishlist</a>
            <a href="cart.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">Cart</a>
            <div class="border-t border-gray-100 my-1"></div>
            <button onclick="toggleDarkMode()" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition flex items-center justify-between">
              <span>Dark mode</span>
              <span class="text-xs text-gray-400" x-text="dark ? 'On' : 'Off'"></span>
            </button>
          </div>
        </div>
        <a href="wishlist.html" class="relative p-2 rounded-full hover:bg-gray-100 transition" aria-label="Wishlist">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          <span x-show="typeof wishlistCount === 'function' && wishlistCount()>0" x-text="typeof wishlistCount === 'function' ? wishlistCount() : 0" class="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow"></span>
        </a>
        <a href="cart.html" class="relative p-2 rounded-full hover:bg-gray-100 transition" aria-label="Cart">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          <span x-show="typeof cartCount === 'function' && cartCount()>0" x-text="typeof cartCount === 'function' ? cartCount() : 0" class="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow"></span>
        </a>
      </div>
      <!-- Mobile menu button -->
      <button onclick="toggleMobileMenu()" class="md:hidden p-2 rounded-full hover:bg-gray-100 transition" aria-label="Menu">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
    <!-- Mobile drawer -->
    <div x-show="mobileOpen" x-cloak x-transition class="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
      <div class="relative">
        <input type="search" placeholder="Search…" x-model="query" class="w-full pl-9 pr-3 py-2 text-sm rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400 transition" />
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/></svg>
      </div>
      <nav class="flex flex-col text-sm font-medium text-gray-700">
        ${link('index.html','Home','home')}
        ${link('shop.html','Shop','shop')}
        ${link('about.html','About','about')}
        ${link('contact.html','Contact','contact')}
        ${link('orders.html','Orders','orders')}
        ${link('wishlist.html','Wishlist','wishlist')}
        ${link('notifications.html','Notifications','notifications')}
      </nav>
      <div class="border-t border-gray-100 pt-3 flex items-center justify-between">
        <span class="text-sm text-gray-600">Dark mode</span>
        <button onclick="toggleDarkMode()" class="text-sm text-brand-600 font-medium" x-text="dark?'On':'Off'"></button>
      </div>
    </div>
  </header>
  <!-- Mobile bottom navigation -->
  <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200 flex items-center justify-around py-2">
    <a href="index.html" class="flex flex-col items-center text-[10px] text-gray-600 hover:text-brand-600">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
      Home
    </a>
    <a href="shop.html" class="flex flex-col items-center text-[10px] text-gray-600 hover:text-brand-600">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      Shop
    </a>
    <a href="cart.html" class="relative flex flex-col items-center text-[10px] text-gray-600 hover:text-brand-600">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
      <span x-show="typeof cartCount === 'function' && cartCount()>0" x-text="typeof cartCount === 'function' ? cartCount() : 0" class="absolute -top-1 right-2 bg-brand-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"></span>
      Cart
    </a>
    <a href="wishlist.html" class="relative flex flex-col items-center text-[10px] text-gray-600 hover:text-brand-600">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
      <span x-show="typeof wishlistCount === 'function' && wishlistCount()>0" x-text="typeof wishlistCount === 'function' ? wishlistCount() : 0" class="absolute -top-1 right-2 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"></span>
      Wishlist
    </a>
    <button onclick="toggleMobileMenu()" class="flex flex-col items-center text-[10px] text-gray-600 hover:text-brand-600">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
      Menu
    </button>
  </nav>
  <div class="md:hidden h-16"></div>
  `;
}

function footerTemplate() {
  return `
  <footer class="border-t border-gray-200 bg-white py-8 mt-6">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="text-xs text-gray-400">We accept:</span>
          <div class="flex gap-2 items-center">
            <!-- Visa -->
            <svg class="h-6 w-10" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="32" rx="4" fill="#1A1F71"/><text x="24" y="21" font-family="Arial" font-size="12" font-weight="bold" fill="#fff" text-anchor="middle">VISA</text></svg>
            <!-- Mastercard -->
            <svg class="h-6 w-10" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="32" rx="4" fill="#fff" stroke="#ddd"/><circle cx="18" cy="16" r="8" fill="#EB001B"/><circle cx="30" cy="16" r="8" fill="#F79E1B" opacity="0.9"/></svg>
            <!-- Amex -->
            <svg class="h-6 w-10" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="32" rx="4" fill="#2E77BC"/><text x="24" y="20" font-family="Arial" font-size="9" font-weight="bold" fill="#fff" text-anchor="middle">AMEX</text></svg>
            <!-- PayPal -->
            <svg class="h-6 w-10" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="32" rx="4" fill="#003087"/><text x="24" y="20" font-family="Arial" font-size="9" font-weight="bold" fill="#fff" text-anchor="middle">PayPal</text></svg>
            <!-- Cash on Delivery -->
            <svg class="h-6 w-10" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="32" rx="4" fill="#16a34a"/><text x="24" y="14" font-family="Arial" font-size="7" font-weight="bold" fill="#fff" text-anchor="middle">CASH ON</text><text x="24" y="23" font-family="Arial" font-size="7" font-weight="bold" fill="#fff" text-anchor="middle">DELIVERY</text></svg>
          </div>
        </div>
        <div class="flex gap-4 text-sm text-gray-500">
          <a href="privacy.html" class="hover:text-gray-900 transition">Privacy Policy</a>
          <a href="terms.html" class="hover:text-gray-900 transition">Terms &amp; Conditions</a>
        </div>
      </div>
      <div class="mt-4 text-center text-xs text-gray-400">© <span x-text="new Date().getFullYear()"></span> Lumen · Powered by Sufi Storefront</div>
    </div>
  </footer>`;
}

function mountLayout() {
  const headerEl = document.getElementById('app-header');
  const footerEl = document.getElementById('app-footer');
  if (headerEl) {
    const page = headerEl.dataset.page || '';
    headerEl.outerHTML = headerTemplate(page);
    window.__injectedHeader = document.querySelector('header.sticky');
  }
  if (footerEl) {
    footerEl.outerHTML = footerTemplate();
    window.__injectedFooter = document.querySelector('footer.border-t');
  }
}
window.mountLayout = mountLayout;
// Inject markup as early as possible
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountLayout);
} else {
  mountLayout();
}
// Initialize Alpine directives on injected markup after Alpine is ready
window.addEventListener('load', () => {
  if (window.Alpine) {
    const scope = document.body._x_dataStack ? document.body._x_dataStack[0] : undefined;
    if (window.__injectedHeader) {
      window.__injectedHeader._x_dataStack = document.body._x_dataStack;
      Alpine.initTree(window.__injectedHeader);
    }
    if (window.__injectedFooter) {
      window.__injectedFooter._x_dataStack = document.body._x_dataStack;
      Alpine.initTree(window.__injectedFooter);
    }
  }
});

window.toggleMobileMenu = function () {
  const s = document.body._x_dataStack && document.body._x_dataStack[0];
  if (s) s.mobileOpen = !s.mobileOpen;
};
window.toggleUserMenu = function () {
  const s = document.body._x_dataStack && document.body._x_dataStack[0];
  if (s) s.userOpen = !s.userOpen;
};
window.toggleDarkMode = function () {
  const s = document.body._x_dataStack && document.body._x_dataStack[0];
  if (s) s.dark = !s.dark;
};