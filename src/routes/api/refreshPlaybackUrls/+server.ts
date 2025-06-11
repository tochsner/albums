import { retrieveDeezerDataFromId } from '$lib/processing/retrieveDeezerData';
import { supabase } from '$lib/supabaseClient';
import log from 'loglevel';

export async function GET() {
	log.info('Refresh playback URLs.');

	const songs = (await supabase.from('Song').select('id, deezerId')).data;

	if (!songs) {
		log.error('No songs found.');
		return new Response('No songs found.', { status: 404 });
	}

	for (const song of songs) {
		const { tracks } = await retrieveDeezerDataFromId(song.deezerId);

		for (const track of tracks) {
			const { previewUrl } = track;
			await supabase.from('Song').update({ previewUrl }).eq('id', song.id);
		}
	}

	return new Response();
}
