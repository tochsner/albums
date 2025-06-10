import type { PageServerLoad } from './$types';

import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const todayISOString = today.toISOString();

	console.log(todayISOString);

	const { data } = await supabase
		.from('Album')
		.select('*')
		.gte('created_at', todayISOString)
		.order('created_at', { ascending: true })
		.limit(1);

	console.log('Fetched');

	const album = data[0];

	console.log(album);

	const songs = await supabase
		.from('Song')
		.select('*')
		.eq('albumTitle', album.title)
		.eq('artist', album.artist);

	console.log(songs);

	return {
		...album,
		songs: songs.data
	};
};
