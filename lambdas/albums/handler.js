const url = 'https://albums-lemon.vercel.app/api/';

export async function generatePop() {
	fetch(url + 'generateData/pop');
}

export async function generateRock() {
	fetch(url + 'generateData/rock');
}

export async function generateLatin() {
	fetch(url + 'generateData/latin');
}

export async function generateHiphop() {
	fetch(url + 'generateData/hiphop');
}

export async function generateRnb() {
	fetch(url + 'generateData/rnb');
}

export async function generateEdm() {
	fetch(url + 'generateData/edm');
}

export async function refreshPlaybackUrls() {
	fetch(url + 'refreshPlaybackUrls');
}

export async function tidyDb() {
	fetch(url + 'tidyDb');
}
