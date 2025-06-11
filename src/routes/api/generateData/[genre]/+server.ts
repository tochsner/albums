import albums from '$lib/data/albums.json';
import { processAlbum } from '$lib/processing/processAlbum';
import log from 'loglevel';

import type { RequestEvent } from './$types';

export async function GET({ params }: RequestEvent) {
	const { genre } = params;

	while (true) {
		log.info('Choose random album of the day for genre:', genre);

		const genreAlbums = albums.filter((a) => a.genre === genre);
		const randomAlbum = genreAlbums[Math.floor(Math.random() * genreAlbums.length)];
		log.info(`Selected album: ${randomAlbum.album}.`);

		try {
			await processAlbum(randomAlbum.album, randomAlbum.artist, randomAlbum.mood, genre);
		} catch (error) {
			log.error(`Error processing album: ${error}`);

			log.info('Wait for 5 seconds before retrying');
			await new Promise((resolve) => setTimeout(resolve, 5000));

			continue;
		}

		log.info(`Processed album.`);

		return new Response();
	}
}
