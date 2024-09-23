<script lang="ts">
	import { Head, type SeoConfig } from 'svead';

	export let data;
	let { Copy, meta } = data;

	const seo_config: SeoConfig = {
		title: `${meta.title} | Fit Forge`,
		description: meta.description.slice(0, 155) + '...',
		url: 'https://fit-forge.pages.dev/posts/' + meta.slug,
		site_name: 'Fit Forge',
	};
</script>

<Head {seo_config} />

<article class="all-prose">
	<Copy />
</article>
