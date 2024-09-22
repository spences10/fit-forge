import {
	activity_multipliers,
	goal_multipliers,
	macro_ratios,
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
	activity_level: keyof typeof activity_multipliers,
	goal: keyof typeof goal_multipliers,
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
	const fat = (calorie_target * macro_ratios.fat_percentage) / 9;
	const carbs = (calorie_target - protein * 4 - fat * 9) / 4;

	return {
		calories: Math.round(calorie_target),
		protein: Math.round(protein),
		carbs: Math.round(carbs),
		fat: Math.round(fat),
	};
};
