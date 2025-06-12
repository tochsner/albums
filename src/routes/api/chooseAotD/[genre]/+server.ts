import log from 'loglevel';

import type { RequestEvent } from './$types';
import { supabase } from '$lib/supabaseClient';

export async function GET({ params }: RequestEvent) {
	const { genre } = params;

	while (true) {
		log.info('Choose random album of the day for genre:', genre);

		const genreAlbums = (await supabase.from('Album').select('id, title, mood').eq('genre', genre))
			.data;

		if (!genreAlbums || genreAlbums.length === 0) {
			log.error('No albums found for genre:', genre);
			continue;
		}

		const randomAlbum = genreAlbums[Math.floor(Math.random() * genreAlbums.length)];
		log.info(`Selected album: ${randomAlbum.title}.`);

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

		log.info('Inserted album of the day:', randomAlbum.title);

		return new Response();
	}
}
