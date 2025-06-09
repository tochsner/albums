import { analyzeSongLyrics } from '$lib/analyseSongLyrics';
import { getColorFromUrl } from '$lib/colorUtils';
import { retrieveDeezerData } from '$lib/retrieveDeezerData';
import { retrieveGeniusData } from '$lib/retrieveGeniusData';
import type { PageServerLoad } from './$types';

import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const todayISOString = today.toISOString();

	const { data, error } = await supabase
		.from('Album')
		.select('*')
		.gte('created_at', todayISOString)
		.order('created_at', { ascending: true })
		.limit(1);

	const album = data[0];

	const songs = await supabase
		.from('Song')
		.select('*')
		.eq('albumTitle', album.title)
		.eq('artist', album.artist);

	console.log(songs.data);

	return {
		...album,
		songs: songs.data
	};
};
