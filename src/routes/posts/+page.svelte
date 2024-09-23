<script lang="ts">
	import { Head, type SeoConfig } from 'svead';

	let posts = $state([
		{
			id: 1,
			title: 'Understanding Macros: The Building Blocks of Your Diet',
			excerpt:
				'Learn about proteins, carbohydrates, and fats - the three main types of nutrients that make up the food we eat.',
			link: '/posts/macros-explained',
		},
		{
			id: 2,
			title: 'Timing Your Macros: When to Eat What',
			excerpt:
				'Discover how to optimize your energy levels, workout performance, and recovery by timing your macro intake.',
			link: '/posts/macro-timing',
		},
		{
			id: 3,
			title: '5x5 Overview',
			excerpt:
				'The 5x5 workout program is a strength training regimen designed to build muscle and increase strength.',
			link: '/posts/5x5-overview',
		},
		{
			id: 4,
			title: 'Intermittent Fasting Benefits',
			excerpt:
				'Intermittent fasting (IF) is an eating pattern that cycles between periods of fasting and eating. Here are some benefits of intermittent fasting.',
			link: '/posts/intermittent-fasting-benefits',
		},
		{
			id: 5,
			title: 'Leangains Overview',
			excerpt:
				'Leangains is a popular intermittent fasting protocol developed by Martin Berkhan. It combines fasting periods with strategic eating to optimize muscle gain and fat loss.',
			link: '/posts/leangains-overview',
		},
		{
			id: 6,
			title: 'The 5:2 Method',
			excerpt:
				'The 5:2 method is a popular intermittent fasting approach that involves eating normally for five days of the week and restricting calorie intake for the remaining two days.',
			link: '/posts/5-2-method',
		},
	]);

	const seo_config: SeoConfig = {
		title: 'Educational Posts | Fit Forge',
		description:
			'Explore our educational posts on nutrition, fitness, and health.',
		url: 'https://fit-forge.pages.dev/posts',
		site_name: 'Fit Forge',
	};
</script>

<Head {seo_config} />

<h1 class="mb-6 text-3xl font-bold">Educational Posts</h1>

<div class="grid gap-6 md:grid-cols-2">
	{#each posts as article}
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">{article.title}</h2>
				<p>{article.excerpt}</p>
				<div class="card-actions justify-end">
					<a href={article.link} class="btn btn-primary">Read More</a>
				</div>
			</div>
		</div>
	{/each}
</div>
