type DeezerAlbum = {
	deezerId: number;
	title: string;
	artist: string;
	imageUrl: string;
	tracks: {
		deezerId: number;
		track: number;
		title: string;
		popularity: number;
		audio: string;
	}[];
};

async function downloadAudio(playbackUrl: string) {
	const response = await fetch(playbackUrl);

	const arrayBuffer = await response.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const contentType = response.headers.get('content-type') || 'audio/mpeg';
	const base64String = `data:${contentType};base64,${buffer.toString('base64')}`;

	return base64String;
}

export async function retrieveDeezerData(name: string, artist: string): Promise<DeezerAlbum> {
	const encodedQuery = encodeURIComponent(`${name} ${artist}`);

	const albumSearchResponse = await fetch(`https://api.deezer.com/search/album?q=${encodedQuery}`);
	const albumSearchResults = await albumSearchResponse.json();
	const album = albumSearchResults.data[0];

	if (!album) throw new Error('Album not found');

	const tracksResponse = await fetch(album.tracklist);
	const tracks = (await tracksResponse.json()).data;

	return {
		deezerId: album.id,
		title: album.title,
		artist: album.artist.name,
		imageUrl: album.cover_big,
		tracks: await Promise.all(
			tracks.map(
				async (
					track: { id: number; title_short: string; rank: number; preview: string },
					idx: number
				) => ({
					deezerId: track.id,
					title: track.title_short,
					popularity: track.rank,
					audio: await downloadAudio(track.preview),
					track: idx + 1
				})
			)
		)
	};
}
