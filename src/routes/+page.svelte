<script lang="ts">
	import {
		calculate_bmi,
		get_bmi_category,
		get_ideal_weight,
	} from '$lib';
	import { convert_length, convert_weight } from '$lib/conversions';
	import { user_data } from '$lib/user_data.svelte';
	import { slide } from 'svelte/transition';

	let bmi = $state('');
	let category = $state('');
	let ideal_weight = $state<{
		lower_weight: number;
		upper_weight: number;
	} | null>(null);
	let show_results = $state(false);

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
		show_results = true;
	};

	const is_valid_input = () => {
		const weight_kg =
			convert_weight(user_data.weight_unit, 'kg', user_data.weight) ??
			0;
		const height_cm =
			convert_length(user_data.height_unit, 'cm', user_data.height) ??
			0;

		return (
			weight_kg > 0 &&
			height_cm > 0 &&
			weight_kg <= 500 && // Max weight limit in kg
			height_cm <= 250 // Max height limit in cm
		);
	};
</script>

<div class="space-y-12">
	<section class="text-center">
		<h1 class="mb-4 text-4xl font-bold">Welcome to Fit Forge</h1>
		<p class="text-xl">
			Your no-nonsense guide to getting fit, especially for the
			desk-bound developer
		</p>
	</section>

	<section class="grid gap-8 md:grid-cols-2">
		<div>
			<h2 class="mb-4 text-2xl font-bold">About Fit Forge</h2>
			<p>
				Fit Forge is designed for developers and other sedentary
				professionals who want to improve their fitness without the
				fluff. We focus on the essentials: understanding your body
				composition and optimizing your diet. Remember, you can't
				outrun a bad diet!
			</p>
		</div>
		<div>
			<h2 class="mb-4 text-2xl font-bold">Why Diet Matters</h2>
			<p>
				While exercise is important, your diet is the cornerstone of
				fitness. Here's why:
			</p>
			<ul class="mt-2 list-inside list-disc">
				<li>Weight management is 80% diet, 20% exercise</li>
				<li>Proper nutrition fuels your workouts and recovery</li>
				<li>
					A balanced diet improves overall health and energy levels
				</li>
				<li>Consistency in diet is key to long-term success</li>
			</ul>
		</div>
	</section>

	<section>
		<h2 class="mb-4 text-2xl font-bold">Understanding BMI</h2>
		<p class="mb-4">
			Body Mass Index (BMI) is a simple, widely used tool to estimate
			body fat content and screen for weight categories that may lead
			to health problems. Here's why calculating your BMI can be
			helpful:
		</p>
		<ul class="mb-4 list-inside list-disc">
			<li>It provides a quick assessment of your body composition</li>
			<li>
				It can indicate potential health risks associated with weight
			</li>
			<li>
				It's a starting point for discussions with healthcare
				professionals
			</li>
			<li>It allows you to track changes in your body over time</li>
		</ul>
		<p class="mb-4">
			However, it's important to note that BMI is a general guideline
			and has limitations:
		</p>
		<ul class="mb-4 list-inside list-disc">
			<li>It doesn't distinguish between muscle mass and fat</li>
			<li>
				It may not be accurate for athletes or very muscular
				individuals
			</li>
			<li>It doesn't account for body fat distribution</li>
			<li>
				It may not be suitable for elderly individuals or those with
				certain medical conditions
			</li>
		</ul>
		<p>
			Remember, BMI is just one indicator of health. A high BMI
			doesn't necessarily mean you're obese, especially if you're tall
			or have a muscular build. Always consult with a healthcare
			professional for a comprehensive health assessment.
		</p>
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
						min="1"
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
						min="1"
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
			disabled={!is_valid_input()}
		>
			Calculate BMI
		</button>

		{#if show_results}
			<div
				transition:slide={{ duration: 300 }}
				class="mt-6 grid gap-6 md:grid-cols-2"
			>
				<div class="rounded-box bg-base-200 p-4">
					<p class="text-lg font-semibold">
						Your BMI is {bmi} - {category}
					</p>
					<p class="mt-2">
						Ideal weight range: {ideal_weight?.lower_weight.toFixed(
							1,
						)}
						{user_data.weight_unit} to {ideal_weight?.upper_weight.toFixed(
							1,
						)}
						{user_data.weight_unit}
					</p>
					<p class="mt-4 text-sm">
						Remember, BMI is just one indicator of health. Consider
						consulting with a healthcare professional for a more
						comprehensive assessment.
					</p>
				</div>

				<div class="rounded-box bg-base-300 p-4">
					<h3 class="mb-2 text-lg font-semibold">
						Next Step: Calculate Your
						<a
							href="/posts/macros-explained"
							class="link link-primary"
						>
							Macros
						</a>
					</h3>
					<p class="mb-4">
						Now that you know your BMI, it's time to optimize your
						nutrition. Calculating your macronutrients (proteins,
						carbs, and fats) can help you:
					</p>
					<ul class="mb-4 list-inside list-disc">
						<li>Achieve your fitness goals more effectively</li>
						<li>Ensure proper nutrient balance for your body</li>
						<li>
							Customize your diet based on your activity level and
							goals
						</li>
						<li>Improve overall energy and performance</li>
					</ul>
					<a href="/macro-calculator" class="btn btn-secondary">
						Calculate Your Macros
					</a>
				</div>
			</div>
		{/if}
	</section>
</div>
