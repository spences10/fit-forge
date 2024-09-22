<script lang="ts">
	import { user_data } from '$lib/user_data.svelte';

	let age = $state(0);
	let gender = $state('male');
	let activity_level = $state('sedentary');
	let goal = $state('maintain');

	let macros = $state<{
		protein: number;
		carbs: number;
		fat: number;
	} | null>(null);

	const calculate_macros = () => {
		// Convert weight to kg if necessary
		const weight_kg = user_data.weight_unit === 'lb' 
			? user_data.weight * 0.453592 
			: user_data.weight;

		// Convert height to cm if necessary
		const height_cm = user_data.height_unit === 'm' 
			? user_data.height * 100 
			: user_data.height_unit === 'ft' 
				? user_data.height * 30.48 
				: user_data.height;

		const bmr =
			gender === 'male'
				? 88.362 + 13.397 * weight_kg + 4.799 * height_cm - 5.677 * age
				: 447.593 + 9.247 * weight_kg + 3.098 * height_cm - 4.33 * age;

		const activity_multipliers = {
			sedentary: 1.2,
			light: 1.375,
			moderate: 1.55,
			active: 1.725,
			very_active: 1.9,
		};

		const tdee =
			bmr *
			activity_multipliers[
				activity_level as keyof typeof activity_multipliers
			];

		let calorie_target = tdee;
		if (goal === 'lose') calorie_target *= 0.8;
		if (goal === 'gain') calorie_target *= 1.2;

		const protein = weight_kg * 2.2; // 1g per lb of body weight
		const fat = (calorie_target * 0.25) / 9; // 25% of calories from fat
		const carbs = (calorie_target - protein * 4 - fat * 9) / 4;

		macros = {
			protein: Math.round(protein),
			carbs: Math.round(carbs),
			fat: Math.round(fat),
		};
	};
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
			bind:value={age}
			id="age"
			class="input input-bordered"
		/>
	</div>
	<div class="form-control">
		<label class="label" for="gender">
			<span class="label-text">Gender</span>
		</label>
		<select
			bind:value={gender}
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
			bind:value={activity_level}
			id="activity"
			class="select select-bordered"
		>
			<option value="sedentary">Sedentary</option>
			<option value="light">Lightly Active</option>
			<option value="moderate">Moderately Active</option>
			<option value="active">Active</option>
			<option value="very_active">Very Active</option>
		</select>
	</div>
	<div class="form-control">
		<label class="label" for="goal">
			<span class="label-text">Goal</span>
		</label>
		<select
			bind:value={goal}
			id="goal"
			class="select select-bordered"
		>
			<option value="lose">Lose Weight</option>
			<option value="maintain">Maintain Weight</option>
			<option value="gain">Gain Weight</option>
		</select>
	</div>
</div>

<button onclick={calculate_macros} class="btn btn-primary mt-6"
	>Calculate Macros</button
>

{#if macros}
	<div class="mt-6 rounded-box bg-base-200 p-4">
		<h2 class="mb-2 text-xl font-semibold">Your Daily Macros</h2>
		<p>Protein: {macros.protein}g</p>
		<p>Carbohydrates: {macros.carbs}g</p>
		<p>Fat: {macros.fat}g</p>
	</div>
{/if}
