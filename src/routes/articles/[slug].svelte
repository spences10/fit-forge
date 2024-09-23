<script lang="ts">
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import { page } from '$app/stores';

  let content = '';

  onMount(async () => {
    const slug = $page.params.slug;
    const response = await fetch(`/src/lib/content/${slug}.md`);
    content = await response.text();
  });
</script>

<article class="all-prose">
  {@html marked(content)}
</article>