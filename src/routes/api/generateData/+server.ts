import albums from '$lib/data/albums.json';
import { processAlbum } from '$lib/processAlbum';
import log from 'loglevel';

export async function GET() {
	while (true) {
		log.info('Choose random album of the day.');

		const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
		log.info(`Selected album: ${randomAlbum.album}.`);

		try {
			// await processAlbum(randomAlbum.album, randomAlbum.artist);
			await processAlbum('I Let It in and It Took Everything', 'Loathe');
		} catch (error) {
			log.error(`Error processing album: ${error}`);
			continue;
		}

		log.info(`Processed album.`);

		return new Response(JSON.stringify(randomAlbum));
	}
}
