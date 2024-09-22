<script lang="ts">
	let articles = $state([
		{
			id: 1,
			title: 'Understanding BMI',
			excerpt: 'Learn about Body Mass Index and its importance in health assessment.',
		},
		{
			id: 2,
			title: 'The Importance of Macronutrients',
			excerpt: 'Discover how proteins, carbohydrates, and fats contribute to your overall health.',
		},
		{
			id: 3,
			title: 'Effective Weight Management Strategies',
			excerpt: 'Explore evidence-based approaches to maintaining a healthy weight.',
		},
	]);
</script>

<h1 class="text-3xl font-bold mb-6">Educational Articles</h1>

<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
	{#each articles as article}
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">{article.title}</h2>
				<p>{article.excerpt}</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Read More</button>
				</div>
			</div>
		</div>
	{/each}
</div>