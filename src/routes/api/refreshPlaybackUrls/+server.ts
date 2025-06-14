import { retrieveDeezerSongData } from '$lib/processing/retrieveDeezerData';
import { supabase } from '$lib/supabaseClient';
import log from 'loglevel';

export async function GET() {
	log.info('Refresh playback URLs for all album of the last two days.');

	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	const isoDateYesterday = yesterday.toISOString().split('T')[0];

	const recentAotD = (
		await supabase.from('AlbumOfTheDay').select('albumId').gte('date', isoDateYesterday)
	).data?.map((e) => e.albumId);
	const recentAlbums = (
		await supabase
			.from('Album')
			.select('title, artist')
			.in('id', recentAotD ?? [])
	).data;

	for (const album of recentAlbums ?? []) {
		const songs =
			(
				await supabase
					.from('Song')
					.select('id, deezerId')
					.eq('albumTitle', album.title)
					.eq('artist', album.artist)
			).data ?? [];

		await Promise.all(
			songs.map(async (song) => {
				const { previewUrl } = await retrieveDeezerSongData(song.deezerId);
				await supabase.from('Song').update({ previewUrl }).eq('id', song.id);
			})
		);
	}

	log.info('Playback URLs refreshed.');

	return new Response();
}
