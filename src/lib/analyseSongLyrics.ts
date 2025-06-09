import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { z } from 'zod';

import { OPENAI_API_KEY } from '$env/static/private';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const LyricsAnalysis = z.object({
	description: z.string(),
	themes: z.array(z.string()).max(3),
	highlightedLyrics: z.array(z.string()).max(4),
	lyricsError: z.boolean()
});

export async function analyzeSongLyrics(name: string, artist: string, lyrics: string) {
	const response = await openai.responses.parse({
		model: 'gpt-4.1-mini',
		input: [
			{
				role: 'system',
				content:
					'You are a music enthusiast who can analyze lyrics and extract meaningful information from them. Your task is to provide a very brief description of the song (one short sentence, not more than 50 characters, do not include the name of the song), identify the main themes (up to three, at most two words per theme, Title Case), and highlight some key lyrics (up to four consecutive lines). Furthermore, report if the lyrics do not seem to be actual lyrics of a song.'
			},
			{ role: 'user', content: `${name} by ${artist}: \n ${lyrics}` }
		],
		text: {
			format: zodTextFormat(LyricsAnalysis, 'analysis')
		}
	});

	const analysis = response.output_parsed;

	if (!analysis) {
		throw new Error('OpenAI returned undefined');
	}

	if (analysis.lyricsError) {
		throw new Error('Lyrics do not seem to be actual lyrics of a song');
	}

	return analysis;
}
