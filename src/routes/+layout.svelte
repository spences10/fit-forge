<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="bg-base-200 flex min-h-screen flex-col">
	<div class="container mx-auto flex-grow p-4">
		<header class="navbar rounded-box bg-base-100 mb-8 shadow-lg">
			<div class="flex-1">
				<a href="/" class="btn btn-ghost text-xl normal-case">
					Fit Forge
				</a>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1">
					<li><a href="/">Home</a></li>
					<li><a href="/macro-calculator">Macro Calculator</a></li>
					<li><a href="/posts">Posts</a></li>
				</ul>
			</div>
		</header>
		<main class="rounded-box bg-base-100 p-6 shadow-lg">
			{@render children()}
		</main>
	</div>
	<footer
		class="footer footer-center rounded-box bg-base-300 text-base-content mt-8 p-4"
	>
		<div>
			<p>Copyright © 2023 - All rights reserved by Fit Forge</p>
		</div>
	</footer>
</div>
