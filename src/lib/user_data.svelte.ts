import type {
	ActivityLevel,
	DayType,
	Goal,
} from '$lib/config/macro_calculator';
import { calculate_macros } from '$lib/conversions/weight';

export function create_user_data() {
	let weight = $state(0);
	let height = $state(0);
	let weight_unit = $state('kg');
	let height_unit = $state('cm');
	let age = $state(0);
	let gender = $state<'male' | 'female'>('male');
	let activity_level = $state<ActivityLevel>('sedentary');
	let goal = $state<Goal>('maintain');
	let day_type = $state<DayType>('rest');
	let macros = $state<ReturnType<typeof calculate_macros> | null>(
		null,
	);

	function update_macros() {
		macros = calculate_macros(
			weight,
			weight_unit,
			height,
			height_unit,
			age,
			gender,
			activity_level,
			goal,
		);
	}

	return {
		get weight() {
			return weight;
		},
		set weight(value: number) {
			weight = value;
			update_macros();
		},
		get height() {
			return height;
		},
		set height(value: number) {
			height = value;
			update_macros();
		},
		get weight_unit() {
			return weight_unit;
		},
		set weight_unit(value: string) {
			weight_unit = value;
			update_macros();
		},
		get height_unit() {
			return height_unit;
		},
		set height_unit(value: string) {
			height_unit = value;
			update_macros();
		},
		get age() {
			return age;
		},
		set age(value: number) {
			age = value;
			update_macros();
		},
		get gender() {
			return gender;
		},
		set gender(value: 'male' | 'female') {
			gender = value;
			update_macros();
		},
		get activity_level() {
			return activity_level;
		},
		set activity_level(value: ActivityLevel) {
			activity_level = value;
			update_macros();
		},
		get goal() {
			return goal;
		},
		set goal(value: Goal) {
			goal = value;
			update_macros();
		},
		get day_type() {
			return day_type;
		},
		set day_type(value: DayType) {
			day_type = value;
			update_macros();
		},
		get macros() {
			return macros;
		},
		update_macros,
	};
}

export const user_data = create_user_data();
