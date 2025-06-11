import albums from '$lib/data/albums.json';
import log from 'loglevel';

import type { RequestEvent } from './$types';
import { supabase } from '$lib/supabaseClient';

export async function GET({ params }: RequestEvent) {
	const { genre } = params;

	while (true) {
		log.info('Choose random album of the day for genre:', genre);

		const genreAlbums = albums.filter((a) => a.genre === genre);
		const randomAlbum = genreAlbums[Math.floor(Math.random() * genreAlbums.length)];
		log.info(`Selected album: ${randomAlbum.album}.`);

		const now = new Date();
		const todayMorningUTC = new Date(
			Date.UTC(
				now.getUTCFullYear(),
				now.getUTCMonth(),
				now.getUTCDate(),
				0,
				0,
				0 // 00:00:00
			)
		);
		const todayMorningUTCIso = todayMorningUTC.toISOString();

		await supabase.from('AlbumOfTheDay').insert({
			date: todayMorningUTCIso,
			albumId: randomAlbum.id,
			genre,
			mood: randomAlbum.mood
		});

		log.info('Inserted album of the day:', randomAlbum.album);

		return new Response();
	}
}
