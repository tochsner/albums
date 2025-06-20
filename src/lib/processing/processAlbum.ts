import { analyzeSongLyrics } from '$lib/processing/analyseSongLyrics';
import { getColorFromUrl } from '$lib/colorUtils';
import { retrieveDeezerData } from '$lib/processing/retrieveDeezerData';
import { retrieveGeniusData } from '$lib/processing/retrieveGeniusData';
import { supabase } from '$lib/supabaseClient';

import log from 'loglevel';
import { retrieveSpotifyData } from './retrieveSpotifyData';

export async function processAlbum(
	name: string,
	artist: string,
	mood: string,
	genre: string,
	id?: number,
	retrieveAudio?: boolean
) {
	log.info('Processing album:', name, artist);

	const deezerData = await retrieveDeezerData(name, artist, retrieveAudio);
	log.info('Retrieved Deezer data.');

	const spotifyData = await retrieveSpotifyData(name, artist);

	const color = await getColorFromUrl(deezerData.imageUrl);
	log.info('Retrieved main color.');

	await supabase.from('Album').insert({
		id,
		deezerId: deezerData.deezerId,
		title: deezerData.title,
		artist: deezerData.artist,
		imageUrl: deezerData.imageUrl,
		color,
		mood,
		genre,
		spotifyData: spotifyData.spotifyId
	});
	log.info('Stored album into DB.');

	try {
		await Promise.all(
			deezerData.tracks.map(async (track) => {
				log.info('Processing track:', track.title);

				const { lyrics } = await retrieveGeniusData(track.title, deezerData.artist);
				log.info('Retrieved lyrics.');

				const { description, themes, highlightedLyrics } = await analyzeSongLyrics(
					track.title,
					deezerData.artist,
					lyrics
				);
				log.info('Analyzed song lyrics.');

				await supabase.from('Song').insert({
					deezerId: track.deezerId,
					track: track.track,
					title: track.title,
					artist: deezerData.artist,
					albumTitle: deezerData.title,
					description,
					themes,
					lyrics,
					highlightedLyrics,
					audio: track.audio,
					previewUrl: track.previewUrl
				});
				log.info('Stored song into DB.');
			})
		);
	} catch (error) {
		log.error('Error processing album:', error);

		const a = await supabase.from('Album').delete().eq('title', deezerData.title);
		log.info('Deleted album from DB.', a, deezerData.title);

		throw error;
	}
}
