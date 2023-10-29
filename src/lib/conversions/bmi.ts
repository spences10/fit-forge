import { convert_length } from './length';
import { convert_weight } from './weight';

export const calculate_bmi = (
	weight: number,
	height: number,
	weight_unit: string,
	height_unit: string
) => {
	const weight_kg = convert_weight(weight_unit, 'kg', weight);
	const height_m = convert_length(height_unit, 'm', height);

	if (weight_kg === null || height_m === null) {
		return 'Invalid unit'; // Return a string indicating an invalid unit
	}

	const bmi = weight_kg / (height_m * height_m);
	return bmi.toFixed(1);
};
