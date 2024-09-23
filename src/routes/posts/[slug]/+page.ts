import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { slug } = params;

	try {
		const Copy = await import(`../../../lib/content/${slug}.md`);
		return {
			Copy: Copy.default,
			meta: { ...Copy.metadata, slug },
		};
	} catch (e) {
		throw error(404, 'Uh oh!');
	}
};
