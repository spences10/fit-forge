<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-base-200">
	<div class="container mx-auto flex-grow p-4">
		<header class="navbar mb-8 rounded-box bg-base-100 shadow-lg">
			<div class="flex-1">
				<a href="/" class="btn btn-ghost text-xl normal-case">
					Fit Forge
				</a>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1">
					<li><a href="/">Home</a></li>
					<li><a href="/articles">Articles</a></li>
					<li><a href="/workouts">Workouts</a></li>
					<li><a href="/macro-calculator">Macro Calculator</a></li>
				</ul>
			</div>
		</header>
		<main class="rounded-box bg-base-100 p-6 shadow-lg">
			{@render children()}
		</main>
	</div>
	<footer
		class="footer footer-center mt-8 rounded-box bg-base-300 p-4 text-base-content"
	>
		<div>
			<p>Copyright © 2023 - All rights reserved by Fit Forge</p>
		</div>
	</footer>
</div>
