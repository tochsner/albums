import albums from '$lib/data/albums.json';
import { processAlbum } from '$lib/processing/processAlbum';
import { supabase } from '$lib/supabaseClient';
import log from 'loglevel';

export async function GET() {
	const existingAlbums = (await supabase.from('Album').select('id')).data;

	for (let idx = 0; idx < albums.length; idx++) {
		const album = albums[idx];
		log.info('Process album nr ' + idx);

		if (existingAlbums?.some((existing) => album.id === existing.id)) {
			log.info(`Album ${album.album} already processed. Skipping.`);
			continue;
		}

		try {
			await processAlbum(album.album, album.artist, album.mood, album.genre, album.id);
		} catch (error) {
			log.error(`Error processing album ${album.album}: ${error}`);
			await new Promise((resolve) => setTimeout(resolve, 5000));
		}

		log.info('Processed album nr ' + idx);

		await new Promise((resolve) => setTimeout(resolve, 5000));
	}

	return new Response();
}
