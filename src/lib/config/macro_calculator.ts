export const activity_multipliers = {
	sedentary: 1.2,
	light: 1.375,
	moderate: 1.55,
	active: 1.725,
	very_active: 1.9,
} as const;

export const goal_multipliers = {
	lose: 0.8,
	maintain: 1,
	gain: 1.2,
} as const;

export const macro_ratios = {
	protein_per_kg: 2.2, // 1g per lb of body weight
	fat_percentage: {
		workout: 0.2, // 20% of calories from fat on workout days
		rest: 0.35, // 35% of calories from fat on rest days
	},
};

export type ActivityLevel = keyof typeof activity_multipliers;
export type Goal = keyof typeof goal_multipliers;
export type DayType = 'workout' | 'rest';
