import albums from '$lib/data/albums.json';
import { processAlbum } from '$lib/processAlbum';
import log from 'loglevel';

export async function GET() {
	const genres = ['pop', 'rock', 'hiphop', 'edm', 'rnb', 'latin'];

	await Promise.all(
		genres.map(async (genre) => {
			while (true) {
				log.info('Choose random album of the day for genre:', genre);

				const genreAlbums = albums.filter((a) => a.genre === genre);
				const randomAlbum = genreAlbums[Math.floor(Math.random() * genreAlbums.length)];
				log.info(`Selected album: ${randomAlbum.album}.`);

				try {
					await processAlbum(randomAlbum.album, randomAlbum.artist, randomAlbum.mood, genre);
				} catch (error) {
					log.error(`Error processing album: ${error}`);
					continue;
				}

				log.info(`Processed album.`);
			}
		})
	);

	return new Response();
}
