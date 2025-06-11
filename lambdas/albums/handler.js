const url = 'https://albums-lemon.vercel.app/api/';

exports.generatePop = async () => {
	await fetch(url + 'chooseAotD/pop');
};

exports.generateRock = async () => {
	await fetch(url + 'chooseAotD/rock');
};

exports.generateLatin = async () => {
	await fetch(url + 'chooseAotD/latin');
};

exports.generateHiphop = async () => {
	await fetch(url + 'chooseAotD/hiphop');
};

exports.generateRnb = async () => {
	await fetch(url + 'chooseAotD/rnb');
};

exports.generateEdm = async () => {
	await fetch(url + 'chooseAotD/edm');
};

exports.refreshPlaybackUrls = async () => {
	await fetch(url + 'refreshPlaybackUrls');
};

exports.tidyDb = async () => {
	await fetch(url + 'tidyDb');
};
