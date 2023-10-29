<script lang="ts">
	import { calculate_bmi } from '$lib';

	let weight: number = 0;
	let height: number = 0;
	let bmi = '';
	let weight_unit = 'kg';
	let height_unit = 'cm';

	const handle_calculate = () => {
		bmi = calculate_bmi(weight, height, weight_unit, height_unit);
	};
</script>

<input type="number" bind:value={weight} placeholder="Weight" />
<select bind:value={weight_unit}>
	<option value="mg">mg</option>
	<option value="g">g</option>
	<option value="kg" selected>kg</option>
	<option value="ton">ton</option>
	<option value="oz">oz</option>
	<option value="lb">lb</option>
	<option value="st">st</option>
</select>
<input type="number" bind:value={height} placeholder="Height" />
<select bind:value={height_unit}>
	<option value="mm">mm</option>
	<option value="cm">cm</option>
	<option value="m" selected>m</option>
	<option value="km">km</option>
	<option value="in">in</option>
	<option value="ft">ft</option>
	<option value="yd">yd</option>
	<option value="mi">mi</option>
</select>
<button on:click={handle_calculate}>Calculate BMI</button>

{#if bmi}
	<p>Your BMI is {bmi}</p>
{/if}
