import { retrieveDeezerSongData } from '$lib/processing/retrieveDeezerData';
import { supabase } from '$lib/supabaseClient';
import log from 'loglevel';

export async function GET() {
	log.info('Refresh playback URLs for all album of the last two days.');

	const today = new Date();
	today.setDate(today.getDate());
	const isoDateYesterday = today.toISOString().split('T')[0];

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
				try {
					const { previewUrl } = await retrieveDeezerSongData(song.deezerId);
					await supabase.from('Song').update({ previewUrl }).eq('id', song.id);
					log.info(`Refreshed for song ${song.id} ${previewUrl}`);
				} catch {
					log.error(
						`Failed to refresh playback URL for song ${song.id}. We wait and try again later`
					);

					const randomWaitTime = Math.floor(Math.random() * 5000) + 1000;
					await new Promise((resolve) => setTimeout(resolve, randomWaitTime));

					try {
						const { previewUrl } = await retrieveDeezerSongData(song.deezerId);
						await supabase.from('Song').update({ previewUrl }).eq('id', song.id);
						log.info(`Refreshed for song ${song.id} ${previewUrl}`);
					} catch {
						log.error(`Failed to refresh playback URL for song ${song.id}. We give up.`);
					}
				}
			})
		);

		// we wait for a second before refreshing the next album
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}

	log.info('Playback URLs refreshed.');

	return new Response();
}
