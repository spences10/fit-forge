import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: null,
					},
				},
			},
		},
	},

	daisyui: {
		darkTheme: 'night',
		themes: ['garden'],
		logs: false,
	},

	plugins: [require('@tailwindcss/typography'), require('daisyui')],
} as Config;
