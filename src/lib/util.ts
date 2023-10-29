export const calculate_bmi = (weight_kg: number, height_cm: number) => {
	const height_m = height_cm / 100;
	const bmi = weight_kg / (height_m * height_m);
	return bmi.toFixed(1);
};
