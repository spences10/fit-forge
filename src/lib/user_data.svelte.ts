export function create_user_data() {
	let weight = $state(0);
	let height = $state(0);
	let weight_unit = $state('kg');
	let height_unit = $state('cm');

	return {
		get weight() {
			return weight;
		},
		set weight(value: number) {
			weight = value;
		},
		get height() {
			return height;
		},
		set height(value: number) {
			height = value;
		},
		get weight_unit() {
			return weight_unit;
		},
		set weight_unit(value: string) {
			weight_unit = value;
		},
		get height_unit() {
			return height_unit;
		},
		set height_unit(value: string) {
			height_unit = value;
		},
	};
}

export const user_data = create_user_data();
