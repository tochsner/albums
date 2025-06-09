import { getColorFromUrl } from '$lib/colorUtils';
import { retrieveDeezerData } from '$lib/retrieveDeezerData';
import { retrieveGeniusData } from '$lib/retrieveGeniusData';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const deezerData = await retrieveDeezerData('Happier Than Ever', 'Billie Eilish');
	const geniusData = await retrieveGeniusData('Happier Than Ever', 'Billie Eilish');

	const color = await getColorFromUrl(deezerData.imageUrl);

	const songs = deezerData.tracks.map((track) => ({
		title: track.title,
		description:
			'Layered falsetto vocals over gentle acoustic guitar, creating an ethereal, intimate atmosphere',
		themes: ['Identity', 'Love', 'Mystery'],
		highlightedLyrics: [
			'Only love is all maroon',
			'Gluey feathers on a flume',
			"Sky is womb and she's the moon"
		],
		playbackUrl: track.playbackUrl
	}));

	return {
		title: deezerData.title,
		artist: deezerData.artist,
		imageUrl: deezerData.imageUrl,
		color,
		songs
	};
};
