<script lang="ts">
	import {
		calculate_bmi,
		get_bmi_category,
		get_ideal_weight,
	} from '$lib';

	let weight: number = 0;
	let height: number = 0;
	let bmi = '';
	let weight_unit = 'kg';
	let height_unit = 'cm';
	let category = '';
	let ideal_weight: {
		lower_weight: number;
		upper_weight: number;
	} | null = null;

	const handle_calculate = () => {
		const height_m =
			height_unit === 'cm'
				? height / 100
				: height_unit === 'ft'
					? height * 0.3048
					: height;
		bmi = calculate_bmi(weight, height, weight_unit, height_unit);
		category = get_bmi_category(parseFloat(bmi));
		ideal_weight = get_ideal_weight(height_m, weight_unit);
	};
</script>

<h2 class="mb-6 text-2xl font-bold">BMI Calculator</h2>
<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
	<div class="form-control w-full">
		<label class="label" for="weight">
			<span class="label-text">Weight</span>
		</label>
		<div class="flex">
			<input
				type="number"
				bind:value={weight}
				placeholder="Weight"
				class="input input-bordered w-full rounded-r-none"
				id="weight"
			/>
			<select
				bind:value={weight_unit}
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
				bind:value={height}
				placeholder="Height"
				class="input input-bordered w-full rounded-r-none"
				id="height"
			/>
			<select
				bind:value={height_unit}
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
	on:click={handle_calculate}
	class="btn btn-primary mt-6 w-full md:w-auto">Calculate BMI</button
>

{#if bmi}
	<div class="mt-6 rounded-box bg-base-200 p-4">
		<p class="text-lg font-semibold">
			Your BMI is {bmi} - {category}
		</p>
		<p class="mt-2">
			Ideal weight range: {ideal_weight?.lower_weight.toFixed(1)}
			{weight_unit} to {ideal_weight?.upper_weight.toFixed(1)}
			{weight_unit}
		</p>
	</div>
{/if}
