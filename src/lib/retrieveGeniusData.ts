import { GENIUS_CLIENT_ID, GENIUS_CLIENT_SECRET } from '$env/static/private';
import * as cheerio from 'cheerio';

export async function retrieveGeniusData(song: string, artist: string): Promise<string> {
	const songUrl = await getSongUrl(song, artist);
	const lyrics = await getLyrics(songUrl);
	return lyrics;
}

async function getSongUrl(song: string, artist: string) {
	const accessToken = await getAccessToken();

	const searchQuery = `${song} ${artist}`;
	const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(searchQuery)}`;

	const searchResponse = await fetch(searchUrl, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			Accept: 'application/json',
			'User-Agent': 'SongsApp/1.0'
		}
	});

	if (!searchResponse.ok) {
		throw new Error(`Search request failed: ${searchResponse.status}`);
	}

	const searchData = await searchResponse.json();
	const hits = searchData.response.hits;

	if (hits.length === 0) {
		return `No results found for "${song}" by ${artist}`;
	}

	// Look for an exact or close match
	const bestMatch =
		hits.find(
			// @ts-expect-error: we expect the hit to have a correct shape
			(hit) =>
				hit.result.title.toLowerCase().includes(song.toLowerCase()) &&
				hit.result.primary_artist.name.toLowerCase().includes(artist.toLowerCase())
		) || hits[0]; // Fallback to first result

	const songUrl = bestMatch.result.url;
	return songUrl;
}

async function getLyrics(geniusUrl: string) {
	const $ = await cheerio.fromURL(geniusUrl);

	$('[data-exclude-from-selection="true"]').remove();

	const lyricElements = $('div[class^="Lyrics__Container-"]');
	const lyrics = lyricElements.find('br').replaceWith('\n').end().text();

	return lyrics;
}

async function getAccessToken() {
	const tokenResponse = await fetch('https://api.genius.com/oauth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'client_credentials',
			client_id: GENIUS_CLIENT_ID,
			client_secret: GENIUS_CLIENT_SECRET
		})
	});

	if (!tokenResponse.ok) {
		throw new Error(`Token request failed: ${tokenResponse.status}`);
	}
	const tokenData = await tokenResponse.json();
	const accessToken = tokenData.access_token;

	return accessToken;
}
