<script lang="ts">
	import {
		calculate_bmi,
		get_bmi_category,
		get_ideal_weight,
	} from '$lib';
	import { user_data } from '$lib/user_data.svelte';

	let bmi = $state('');
	let category = $state('');
	let ideal_weight = $state<{
		lower_weight: number;
		upper_weight: number;
	} | null>(null);

	const handle_calculate = () => {
		const height_m =
			user_data.height_unit === 'cm'
				? user_data.height / 100
				: user_data.height_unit === 'ft'
					? user_data.height * 0.3048
					: user_data.height;
		bmi = calculate_bmi(
			user_data.weight,
			user_data.height,
			user_data.weight_unit,
			user_data.height_unit,
		);
		category = get_bmi_category(parseFloat(bmi));
		ideal_weight = get_ideal_weight(height_m, user_data.weight_unit);
	};
</script>

<div class="space-y-12">
	<section class="text-center">
		<h1 class="mb-4 text-4xl font-bold">Welcome to Fit Forge</h1>
		<p class="text-xl">
			Your personal fitness companion for a healthier lifestyle
		</p>
	</section>

	<section class="grid gap-8 md:grid-cols-2">
		<div>
			<h2 class="mb-4 text-2xl font-bold">About Fit Forge</h2>
			<p>
				Fit Forge is your all-in-one fitness solution, designed to
				help you achieve your health and wellness goals. Whether
				you're just starting your fitness journey or looking to take
				your workouts to the next level, we've got you covered.
			</p>
		</div>
		<div>
			<h2 class="mb-4 text-2xl font-bold">Key Features</h2>
			<ul class="list-inside list-disc">
				<li>Personalized workout plans</li>
				<li>Nutrition tracking and advice</li>
				<li>Progress monitoring</li>
				<li>Community support</li>
			</ul>
		</div>
	</section>

	<section>
		<h2 class="mb-6 text-2xl font-bold">BMI Calculator</h2>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="form-control w-full">
				<label class="label" for="weight">
					<span class="label-text">Weight</span>
				</label>
				<div class="flex">
					<input
						type="number"
						bind:value={user_data.weight}
						placeholder="Weight"
						class="input input-bordered w-full rounded-r-none"
						id="weight"
					/>
					<select
						bind:value={user_data.weight_unit}
						class="select select-bordered rounded-l-none"
					>
						<option value="kg" selected>kg</option>
						<option value="lb">lb</option>
						<option value="st">st</option>
					</select>
				</div>
			</div>
			<div class="form-control w-full">
				<label class="label" for="height">
					<span class="label-text">Height</span>
				</label>
				<div class="flex">
					<input
						type="number"
						bind:value={user_data.height}
						placeholder="Height"
						class="input input-bordered w-full rounded-r-none"
						id="height"
					/>
					<select
						bind:value={user_data.height_unit}
						class="select select-bordered rounded-l-none"
					>
						<option value="cm">cm</option>
						<option value="m" selected>m</option>
						<option value="in">in</option>
						<option value="ft">ft</option>
					</select>
				</div>
			</div>
		</div>

		<button
			onclick={handle_calculate}
			class="btn btn-primary mt-6 w-full md:w-auto"
			>Calculate BMI</button
		>

		{#if bmi}
			<div class="mt-6 rounded-box bg-base-200 p-4">
				<p class="text-lg font-semibold">
					Your BMI is {bmi} - {category}
				</p>
				<p class="mt-2">
					Ideal weight range: {ideal_weight?.lower_weight.toFixed(1)}
					{user_data.weight_unit} to {ideal_weight?.upper_weight.toFixed(
						1,
					)}
					{user_data.weight_unit}
				</p>
			</div>
		{/if}
	</section>
</div>
