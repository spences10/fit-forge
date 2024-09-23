<script lang="ts">
	let articles = $state([
		{
			id: 1,
			title: 'Understanding Macros: The Building Blocks of Your Diet',
			excerpt:
				'Learn about proteins, carbohydrates, and fats - the three main types of nutrients that make up the food we eat.',
			link: '/articles/macros-explained',
		},
		{
			id: 2,
			title: 'Timing Your Macros: When to Eat What',
			excerpt:
				'Discover how to optimize your energy levels, workout performance, and recovery by timing your macro intake.',
			link: '/articles/macro-timing',
		},
	]);
</script>

<h1 class="mb-6 text-3xl font-bold">Educational Articles</h1>

<div class="grid gap-6 md:grid-cols-2">
	{#each articles as article}
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
