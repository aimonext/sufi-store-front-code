<script>
  import { notifications } from '#lib/stores/notifications.js';
  let list = $derived($notifications);
</script>

<main class="max-w-3xl mx-auto px-4 py-10">
  <div class="flex items-center justify-between mb-6">
    <h1 class="font-display text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
    <div class="flex gap-2">
      <button onclick={() => notifications.markAllRead()} class="text-sm text-brand-600 hover:underline">Mark all read</button>
      <button onclick={() => notifications.clear()} class="text-sm text-gray-500 hover:text-red-500">Clear</button>
    </div>
  </div>

  {#if list.length === 0}
    <div class="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div class="text-5xl mb-4">🔔</div>
      <p class="text-gray-600 dark:text-gray-300">You're all caught up.</p>
    </div>
  {:else}
    <div class="space-y-3">
      {#each list as n}
        <div class={`bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex gap-4 items-start dark:bg-gray-800 dark:border-gray-700 ${!n.read ? 'border-l-4 border-l-brand-500' : ''}`}>
          <div class="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0">🔔</div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">{n.title}</h3>
              <span class="text-xs text-gray-400">{n.date}</span>
            </div>
            <p class="text-sm text-gray-500 mt-1 dark:text-gray-300">{n.body}</p>
          </div>
          <button onclick={() => notifications.remove(n.id)} class="text-gray-400 hover:text-red-500 transition text-sm">✕</button>
        </div>
      {/each}
    </div>
  {/if}
</main>