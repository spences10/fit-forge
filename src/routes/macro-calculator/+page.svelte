<script lang="ts">
	import {
		activity_multipliers,
		goal_multipliers,
	} from '$lib/config/macro_calculator';
	import { user_data } from '$lib/user_data.svelte';

	let show_leangains = $state(false);

	$effect(() => {
		if (user_data.weight && user_data.height && user_data.age) {
			user_data.update_macros();
		}
	});
</script>

<h1 class="mb-6 text-3xl font-bold">Macro Calculator</h1>

<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
	<div class="form-control">
		<label class="label" for="weight">
			<span class="label-text">Weight ({user_data.weight_unit})</span>
		</label>
		<input
			type="number"
			bind:value={user_data.weight}
			id="weight"
			class="input input-bordered"
		/>
	</div>
	<div class="form-control">
		<label class="label" for="height">
			<span class="label-text">Height ({user_data.height_unit})</span>
		</label>
		<input
			type="number"
			bind:value={user_data.height}
			id="height"
			class="input input-bordered"
		/>
	</div>
	<div class="form-control">
		<label class="label" for="age">
			<span class="label-text">Age</span>
		</label>
		<input
			type="number"
			bind:value={user_data.age}
			id="age"
			class="input input-bordered"
		/>
	</div>
	<div class="form-control">
		<label class="label" for="gender">
			<span class="label-text">Gender</span>
		</label>
		<select
			bind:value={user_data.gender}
			id="gender"
			class="select select-bordered"
		>
			<option value="male">Male</option>
			<option value="female">Female</option>
		</select>
	</div>
	<div class="form-control">
		<label class="label" for="activity">
			<span class="label-text">Activity Level</span>
		</label>
		<select
			bind:value={user_data.activity_level}
			id="activity"
			class="select select-bordered"
		>
			{#each Object.keys(activity_multipliers) as level}
				<option value={level}>{level}</option>
			{/each}
		</select>
	</div>
	<div class="form-control">
		<label class="label" for="goal">
			<span class="label-text">Goal</span>
		</label>
		<select
			bind:value={user_data.goal}
			id="goal"
			class="select select-bordered"
		>
			{#each Object.keys(goal_multipliers) as goal}
				<option value={goal}>{goal}</option>
			{/each}
		</select>
	</div>
</div>

<button
	onclick={() => (show_leangains = !show_leangains)}
	class="btn btn-secondary mt-6"
>
	{show_leangains ? 'Hide' : 'Show'} Leangains Options
</button>

{#if user_data.macros}
	{#if !show_leangains}
		<div class="mt-6 rounded-box bg-base-200 p-4">
			<h2 class="mb-2 text-xl font-semibold">Your Daily Macros</h2>
			<p>Calories: {user_data.macros.standard.calories} kcal</p>
			<p>Protein: {user_data.macros.standard.protein}g</p>
			<p>Carbohydrates: {user_data.macros.standard.carbs}g</p>
			<p>Fat: {user_data.macros.standard.fat}g</p>
		</div>
	{:else}
		<div class="mt-6 grid gap-6 md:grid-cols-2">
			<div class="rounded-box bg-base-200 p-4">
				<h2 class="mb-2 text-xl font-semibold">Workout Day Macros</h2>
				<p>Calories: {user_data.macros.workout.calories} kcal</p>
				<p>Protein: {user_data.macros.workout.protein}g</p>
				<p>Carbohydrates: {user_data.macros.workout.carbs}g</p>
				<p>Fat: {user_data.macros.workout.fat}g</p>
			</div>
			<div class="rounded-box bg-base-200 p-4">
				<h2 class="mb-2 text-xl font-semibold">Rest Day Macros</h2>
				<p>Calories: {user_data.macros.rest.calories} kcal</p>
				<p>Protein: {user_data.macros.rest.protein}g</p>
				<p>Carbohydrates: {user_data.macros.rest.carbs}g</p>
				<p>Fat: {user_data.macros.rest.fat}g</p>
			</div>
		</div>
	{/if}
{/if}
