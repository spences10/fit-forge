<script lang="ts">
	let workouts = $state([
		{ id: 1, name: 'Full Body Workout', duration: '45 min' },
		{ id: 2, name: 'Cardio Blast', duration: '30 min' },
		{ id: 3, name: 'Yoga Flow', duration: '60 min' },
	]);
</script>

<h1 class="text-3xl font-bold mb-6">Workouts</h1>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
	{#each workouts as workout}
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">{workout.name}</h2>
				<p>Duration: {workout.duration}</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Start Workout</button>
				</div>
			</div>
		</div>
	{/each}
</div>