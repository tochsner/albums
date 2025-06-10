import type { PageServerLoad } from './$types';

import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async () => {
	const albums = supabase
		.from('Album')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(6)
		.then((data) => data.data) as Promise<
		{
			id: string;
			title: string;
			artist: string;
			genre: string;
			mood: string;
			color: string;
		}[]
	>;

	return {
		albums
	};
};
