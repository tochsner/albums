import { supabase } from '$lib/supabaseClient';
import log from 'loglevel';

export async function GET() {
	log.info('Delete all album of the days which are older than two days.');

	const now = new Date();
	const yesterdayMorningUTC = new Date(
		Date.UTC(
			now.getUTCFullYear(),
			now.getUTCMonth(),
			now.getUTCDate() - 1, // yesterday
			0,
			0,
			0 // 00:00:00
		)
	);
	const yesterdayMorningUTCIso = yesterdayMorningUTC.toISOString();

	await supabase.from('AlbumOfTheDay').delete().lt('created_at', yesterdayMorningUTCIso);

	return new Response();
}
