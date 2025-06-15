import { supabase } from './supabaseClient';

export async function getAlbum(id: string) {
	const { data } = await supabase
		.from('Album')
		.select('*, AlbumOfTheDay!AlbumOfTheDay_albumId_fkey ( date )')
		.eq('id', id)
		.limit(1);

	if (!data || data.length === 0) {
		throw new Error('No albums found');
	}

	const album = data[0];

	// if this is not an album of the day
	// the playback won't be available
	const isPlaybackReliable = album.AlbumOfTheDay.length > 0;

	const songs = await supabase
		.from('Song')
		.select('id, title, description, themes, highlightedLyrics, previewUrl')
		.eq('albumTitle', album.title)
		.eq('artist', album.artist)
		.order('track');

	const audios = [] as never[]; // todo: implement if the refreshing of audio links is not reliable

	return {
		...album,
		songs: songs.data,
		audios,
		isPlaybackReliable
	};
}
