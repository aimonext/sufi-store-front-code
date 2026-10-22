<script>
  import { marked } from 'marked';
  import privacyMd from '#lib/content/privacy.md?raw';
  const html = marked(privacyMd);
</script>

<main class="max-w-3xl mx-auto px-4 py-10">
  <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm prose prose-sm max-w-none dark:bg-gray-800 dark:border-gray-700 dark:prose-invert">{@html html}</div>
</main>