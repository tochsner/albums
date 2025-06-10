import type { PageServerLoad } from './$types';

import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async () => {
	const { data } = await supabase
		.from('Album')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(1);

	if (!data || data.length === 0) {
		throw new Error('No albums found');
	}

	const album = data[0];

	const songs = await supabase
		.from('Song')
		.select('title, description, themes, highlightedLyrics')
		.eq('albumTitle', album.title)
		.eq('artist', album.artist)
		.order('track');

	const audios = supabase
		.from('Song')
		.select('audio')
		.eq('albumTitle', album.title)
		.eq('artist', album.artist)
		.order('track');

	return {
		...album,
		songs: songs.data,
		audios
	};
};
