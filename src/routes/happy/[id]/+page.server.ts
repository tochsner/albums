import type { PageServerLoad } from './$types';

import { getAlbum } from '$lib/getAlbum';

export const load: PageServerLoad = async ({ params }) => getAlbum(params.id);
