import type { PageServerLoad } from './$types';

import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async () => {
	const today = new Date();
	const isoDateToday = today.toISOString().split('T')[0];

	const albums = supabase
		.from('AlbumOfTheDay')
		.select('albumId, genre, mood')
		.eq('date', isoDateToday)
		.then((data) => data.data) as Promise<
		{
			albumId: string;
			genre: string;
			mood: string;
		}[]
	>;

	return {
		albums
	};
};
