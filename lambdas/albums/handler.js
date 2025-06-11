const url = 'https://albums-lemon.vercel.app/api/';

exports.generatePop = async () => {
	fetch(url + 'chooseAotD/pop');
};

exports.generateRock = async () => {
	fetch(url + 'chooseAotD/rock');
};

exports.generateLatin = async () => {
	fetch(url + 'chooseAotD/latin');
};

exports.generateHiphop = async () => {
	fetch(url + 'chooseAotD/hiphop');
};

exports.generateRnb = async () => {
	fetch(url + 'chooseAotD/rnb');
};

exports.generateEdm = async () => {
	fetch(url + 'chooseAotD/edm');
};

exports.refreshPlaybackUrls = async () => {
	fetch(url + 'refreshPlaybackUrls');
};

exports.tidyDb = async () => {
	fetch(url + 'tidyDb');
};
