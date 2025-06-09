import { getColorFromUrl } from '$lib/colorUtils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const imageUrl = 'https://d1rgjmn2wmqeif.cloudfront.net/r/b/354381-1.jpg';
	const color = await getColorFromUrl(imageUrl);
	return {
		title: 'For Emma, Forever Ago',
		artist: 'Bon Iver',
		imageUrl,
		color,
		songs: [
			{
				title: 'Flume',
				description:
					'Layered falsetto vocals over gentle acoustic guitar, creating an ethereal, intimate atmosphere',
				themes: ['Identity', 'Love', 'Mystery'],
				lyricsHighlight: [
					'Only love is all maroon',
					'Gluey feathers on a flume',
					"Sky is womb and she's the moon"
				],
				playbackUrl: 'https://www.kozco.com/tech/WAV-MP3.wav'
			},
			{
				title: 'Lump Sum',
				description: 'A haunting falsetto folk song about isolation and transformation.',
				themes: ['Sacrifice', 'Emotional Struggle'],
				lyricsHighlight: [
					'Sold my red horse for a venture home',
					'To vanish on the bow',
					'Settling slow'
				],
				playbackUrl: 'https://sample-files.com/downloads/audio/mp3/tone-test.mp3'
			}
		]
	};
};
