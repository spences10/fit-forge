import {
	activity_multipliers,
	goal_multipliers,
	macro_ratios,
	type ActivityLevel,
	type Goal,
} from '$lib/config/macro_calculator';
import { convert_length } from './length';

interface WeightUnits {
	[key: string]: number;
}

export const weight_units: WeightUnits = {
	mg: 0.000001,
	g: 0.001,
	kg: 1,
	ton: 1000,
	oz: 0.0283495,
	lb: 0.453592,
	st: 6.35029,
};

export const convert_weight = (
	from_unit: string,
	to_unit: string,
	value: number,
): number | null => {
	if (
		!weight_units.hasOwnProperty(from_unit) ||
		!weight_units.hasOwnProperty(to_unit)
	) {
		return null; // Invalid unit
	}

	// Convert to kilograms first, then to the desired unit
	const value_in_kilograms = value * weight_units[from_unit];
	const converted_value = value_in_kilograms / weight_units[to_unit];

	return converted_value;
};

export const calculate_macros = (
	weight: number,
	weight_unit: string,
	height: number,
	height_unit: string,
	age: number,
	gender: 'male' | 'female',
	activity_level: ActivityLevel,
	goal: Goal,
) => {
	const weight_kg = convert_weight(weight_unit, 'kg', weight) ?? 0;
	const height_cm = convert_length(height_unit, 'cm', height) ?? 0;

	const bmr =
		gender === 'male'
			? 88.362 + 13.397 * weight_kg + 4.799 * height_cm - 5.677 * age
			: 447.593 + 9.247 * weight_kg + 3.098 * height_cm - 4.33 * age;

	const tdee = bmr * activity_multipliers[activity_level];
	const calorie_target = tdee * goal_multipliers[goal];

	const protein = weight_kg * macro_ratios.protein_per_kg;
	const standard_fat = (calorie_target * 0.25) / 9;
	const standard_carbs =
		(calorie_target - protein * 4 - standard_fat * 9) / 4;

	const workout_fat =
		(calorie_target * macro_ratios.fat_percentage.workout) / 9;
	const workout_carbs =
		(calorie_target - protein * 4 - workout_fat * 9) / 4;

	const rest_fat =
		(calorie_target * macro_ratios.fat_percentage.rest) / 9;
	const rest_carbs =
		(calorie_target - protein * 4 - rest_fat * 9) / 4;

	return {
		standard: {
			calories: Math.round(calorie_target),
			protein: Math.round(protein),
			carbs: Math.round(standard_carbs),
			fat: Math.round(standard_fat),
		},
		workout: {
			calories: Math.round(calorie_target),
			protein: Math.round(protein),
			carbs: Math.round(workout_carbs),
			fat: Math.round(workout_fat),
		},
		rest: {
			calories: Math.round(calorie_target),
			protein: Math.round(protein),
			carbs: Math.round(rest_carbs),
			fat: Math.round(rest_fat),
		},
	};
};
