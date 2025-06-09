type DeezerAlbum = {
	deezerId: number;
	title: string;
	artist: string;
	imageUrl: string;
	tracks: {
		deezerId: number;
		title: string;
		popularity: number;
		playbackUrl: string;
	}[];
};

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
		tracks: tracks.map((track: { id: number; title: string; rank: number; preview: string }) => ({
			deezerId: track.id,
			title: track.title,
			popularity: track.rank,
			playbackUrl: track.preview
		}))
	};
}
