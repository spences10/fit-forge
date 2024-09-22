import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
	},

	daisyui: {
		darkTheme: 'night',
		themes: ['garden'],
		logs: false,
	},

	plugins: [require('@tailwindcss/typography'), require('daisyui')],
} as Config;
