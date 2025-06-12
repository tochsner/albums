import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';

export async function retrieveSpotifyData(album: string, artist: string) {
	const accessToken = await getSpotifyAccessToken();

	const query = `${album} ${artist}`;
	const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=1`;

	const response = await fetch(searchUrl, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	if (!response.ok) {
		throw new Error('Failed to search Spotify');
	}

	const data = await response.json();

	if (data.albums && data.albums.items && data.albums.items.length > 0) {
		const spotifyId = data.albums.items[0].id;
		return { spotifyId };
	} else {
		throw new Error('No album on Spotify found.');
	}
}

async function getSpotifyAccessToken(): Promise<string> {
	const credentials = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${credentials}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: 'grant_type=client_credentials'
	});

	if (!response.ok) {
		throw new Error('Failed to get Spotify access token');
	}

	const data = await response.json();
	return data.access_token;
}
