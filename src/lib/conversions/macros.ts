import { convert_length } from './length';
import { convert_weight } from './weight';

export const calculate_bmr = (
	weight: number,
	weight_unit: string,
	height: number,
	height_unit: string,
	age: number,
	gender: 'male' | 'female',
): number => {
	const weight_kg = convert_weight(weight_unit, 'kg', weight) ?? 0;
	const height_cm = convert_length(height_unit, 'cm', height) ?? 0;

	if (gender === 'male') {
		return (
			88.362 + 13.397 * weight_kg + 4.799 * height_cm - 5.677 * age
		);
	} else {
		return (
			447.593 + 9.247 * weight_kg + 3.098 * height_cm - 4.33 * age
		);
	}
};
