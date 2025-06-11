import { supabase } from './supabaseClient';

export async function getAlbum(id: string) {
	const { data } = await supabase.from('Album').select('*').eq('id', id).limit(1);

	if (!data || data.length === 0) {
		throw new Error('No albums found');
	}

	const album = data[0];

	const songs = await supabase
		.from('Song')
		.select('title, description, themes, highlightedLyrics, previewUrl')
		.eq('albumTitle', album.title)
		.eq('artist', album.artist)
		.order('track');

	const audios = (async () =>
		await supabase
			.from('Song')
			.select('audio')
			.eq('albumTitle', album.title)
			.eq('artist', album.artist)
			.order('track'))();

	return {
		...album,
		songs: songs.data,
		audios
	};
}
