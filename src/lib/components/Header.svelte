<script>
  import { theme } from '#lib/stores/theme.js';
  import { cart } from '#lib/stores/cart.js';
  import { wishlist } from '#lib/stores/wishlist.js';
  import { notifications } from '#lib/stores/notifications.js';

  let mobileOpen = $state(false);
  let userOpen = $state(false);
  let query = $state('');
  let scrolled = $state(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => { scrolled = window.scrollY > 10; }, { passive: true });
  }

  function toggleMobile() { mobileOpen = !mobileOpen; }
  function toggleUser() { userOpen = !userOpen; }
  function toggleDark() { theme.toggle(); }
</script>

<!-- Layer 1 -->
<div class="hide-on-scroll bg-brand-900 text-brand-100 text-xs sm:text-sm" class:scrolled>
  <div class="max-w-7xl mx-auto px-4 py-2.5 text-center flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
    ✨ Free shipping on orders over $50 · Easy 30-day returns ·
    <a href="/track" class="underline hover:text-white">Track Order</a> ·
    <a href="/contact" class="underline hover:text-white">Help</a> ·
    <a href="/privacy" class="underline hover:text-white">Privacy</a>
  </div>
</div>

<!-- Layer 2 -->
<header class="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200/60 dark:bg-gray-900/80 dark:border-gray-700">
  <div class="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
    <a href="/" class="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Lumen
    </a>
    <div class="flex-1"></div>
    <div class="relative hidden md:block">
      <input type="search" placeholder="Search…" bind:value={query} class="w-44 lg:w-56 pl-9 pr-3 py-2 text-sm rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400 transition dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/></svg>
    </div>
    <div class="hidden md:flex items-center gap-1">
      <a href="/notifications" class="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" aria-label="Notifications">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
        {#if $notifications.filter(n => !n.read).length > 0}
          <span class="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">{$notifications.filter(n => !n.read).length}</span>
        {/if}
      </a>
      <div class="relative">
        <button onclick={toggleUser} class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" aria-label="User menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        </button>
        {#if userOpen}
          <div class="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-soft border border-gray-100 py-2 z-50 dark:bg-gray-800 dark:border-gray-700">
            <a href="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700 transition">Orders</a>
            <a href="/wishlist" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700 transition">Wishlist</a>
            <a href="/cart" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700 transition">Cart</a>
            <div class="border-t border-gray-100 my-1 dark:border-gray-700"></div>
            <button onclick={toggleDark} class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700 transition flex items-center justify-between">
              <span>Dark mode</span>
              <span class="text-xs text-gray-400">{$theme ? 'On' : 'Off'}</span>
            </button>
          </div>
        {/if}
      </div>
      <a href="/wishlist" class="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" aria-label="Wishlist">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        {#if $wishlist.length > 0}
          <span class="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">{$wishlist.length}</span>
        {/if}
      </a>
      <a href="/cart" class="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" aria-label="Cart">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        {#if $cart.length > 0}
          <span class="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">{$cart.reduce((s,i)=>s+i.qty,0)}</span>
        {/if}
      </a>
    </div>
    <button onclick={toggleMobile} class="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" aria-label="Menu">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
  </div>

  <!-- Layer 3: centered nav (hides on scroll) -->
  <div class="hide-on-scroll hidden md:block border-t border-gray-100 dark:border-gray-800" class:scrolled={scrolled}>
    <nav class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
      <a href="/" class="hover:text-brand-600 transition">Home</a>
      <a href="/shop" class="hover:text-brand-600 transition">Shop</a>
      <a href="/contact" class="hover:text-brand-600 transition">Contact</a>
      <a href="/orders" class="hover:text-brand-600 transition">Orders</a>
      <a href="/wishlist" class="hover:text-brand-600 transition">Wishlist</a>
      <a href="/notifications" class="hover:text-brand-600 transition">Notifications</a>
    </nav>
  </div>

  <!-- Mobile drawer -->
  {#if mobileOpen}
    <div class="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3 dark:bg-gray-900 dark:border-gray-700">
      <div class="relative">
        <input type="search" placeholder="Search…" bind:value={query} class="w-full pl-9 pr-3 py-2 text-sm rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400 transition dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/></svg>
      </div>
      <nav class="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-200">
        <a href="/" class="block py-2">Home</a>
        <a href="/shop" class="block py-2">Shop</a>
        <a href="/contact" class="block py-2">Contact</a>
        <a href="/orders" class="block py-2">Orders</a>
        <a href="/wishlist" class="block py-2">Wishlist</a>
        <a href="/notifications" class="block py-2">Notifications</a>
      </nav>
      <div class="border-t border-gray-100 pt-3 flex items-center justify-between dark:border-gray-700">
        <span class="text-sm text-gray-600 dark:text-gray-300">Dark mode</span>
        <button onclick={toggleDark} class="text-sm text-brand-600 font-medium">{$theme ? 'On' : 'Off'}</button>
      </div>
    </div>
  {/if}
</header>

<!-- Mobile bottom nav -->
<nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200 flex items-center justify-around py-2 dark:bg-gray-900/95 dark:border-gray-700">
  <a href="/" class="flex flex-col items-center text-[10px] text-gray-600 hover:text-brand-600 dark:text-gray-300">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
    Home
  </a>
  <a href="/shop" class="flex flex-col items-center text-[10px] text-gray-600 hover:text-brand-600 dark:text-gray-300">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
    Shop
  </a>
  <a href="/cart" class="relative flex flex-col items-center text-[10px] text-gray-600 hover:text-brand-600 dark:text-gray-300">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
    {#if $cart.length > 0}
      <span class="absolute -top-1 right-2 bg-brand-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{$cart.reduce((s,i)=>s+i.qty,0)}</span>
    {/if}
    Cart
  </a>
  <a href="/track" class="flex flex-col items-center text-[10px] text-gray-600 hover:text-brand-600 dark:text-gray-300">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1"/></svg>
    Track
  </a>
  <button onclick={() => mobileOpen = !mobileOpen} class="flex flex-col items-center text-[10px] text-gray-600 hover:text-brand-600 dark:text-gray-300">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
    Menu
  </button>
</nav>
<div class="md:hidden h-16"></div>