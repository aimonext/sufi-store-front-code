<script>
  let sending = $state(false);
  let sent = $state(false);
  let form = $state({ name: '', email: '', subject: '', message: '' });

  async function submit() {
    sending = true;
    await new Promise(r => setTimeout(r, 900));
    sending = false;
    sent = true;
    form = { name: '', email: '', subject: '', message: '' };
  }
</script>

<section class="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
  <div>
    <p class="text-brand-600 text-sm font-semibold tracking-widest uppercase mb-3">Get in touch</p>
    <h1 class="font-display text-4xl font-bold text-gray-900 dark:text-white">We'd love to hear from you.</h1>
    <p class="mt-4 text-gray-500 leading-relaxed">Questions about an order, a product, or just want to say hello? Send us a message and we'll get back within 24 hours.</p>
    <div class="mt-8 space-y-4 text-sm text-gray-600 dark:text-gray-300">
      <div class="flex items-center gap-3"><span class="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">✉</span> hello@lumen.store</div>
      <div class="flex items-center gap-3"><span class="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">☎</span> +1 (555) 012-3456</div>
      <div class="flex items-center gap-3"><span class="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">📍</span> 123 Market St, San Francisco, CA</div>
    </div>
  </div>

  <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <form onsubmit={(e) => { e.preventDefault(); submit(); }} class="space-y-4">
      <input type="text" required placeholder="Your name" bind:value={form.name} class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
      <input type="email" required placeholder="Email address" bind:value={form.email} class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
      <input type="text" placeholder="Subject" bind:value={form.subject} class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
      <textarea required rows="5" placeholder="Message" bind:value={form.message} class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"></textarea>
      <button type="submit" disabled={sending} class="w-full bg-gray-900 hover:bg-brand-600 text-white py-3 rounded-full font-medium transition disabled:opacity-50 dark:bg-gray-700">
        {sending ? 'Sending…' : (sent ? 'Message sent ✓' : 'Send message')}
      </button>
      {#if sent}<p class="text-sm text-brand-600 text-center">Thanks! We'll reply soon.</p>{/if}
    </form>
  </div>
</section>