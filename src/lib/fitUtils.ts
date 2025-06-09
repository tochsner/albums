export function getWordDimensions(word: string, font: string) {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	if (!context) throw Error('Context needs to be accessible to get text measurements.');

	context.font = font;

	return context.measureText(word);
}

export function getWordWidth(word: string, font: string) {
	const dimensions = getWordDimensions(word, font);
	return dimensions.actualBoundingBoxRight + dimensions.actualBoundingBoxLeft;
}

export function getPartitions(arr: number[], n: number) {
	const len = arr.length;
	const prefixSum = Array(len + 1).fill(0);

	for (let i = 0; i < len; i++) {
		prefixSum[i + 1] = prefixSum[i] + arr[i];
	}

	const dp = Array.from({ length: n + 1 }, () => Array(len + 1).fill(Infinity));
	const div = Array.from({ length: n + 1 }, () => Array(len + 1).fill(0));

	dp[0][0] = 0;

	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= len; j++) {
			for (let k = 0; k < j; k++) {
				const cost = Math.max(dp[i - 1][k], prefixSum[j] - prefixSum[k]);
				if (dp[i][j] > cost) {
					dp[i][j] = cost;
					div[i][j] = k;
				}
			}
		}
	}

	// reconstruct partitions
	const result = [];
	let j = len;
	for (let i = n; i > 0; i--) {
		const k = div[i][j];
		result.unshift(Array.from({ length: j - k }, (_, idx) => k + idx));
		j = k;
	}

	return result;
}

export function shrinkWrap(element: HTMLElement) {
	const { firstChild, lastChild } = element;
	if (!element || !firstChild || !lastChild) return;

	const range = document.createRange();
	range.setStartBefore(firstChild);
	range.setEndAfter(lastChild);

	const { width } = range.getBoundingClientRect();
	element.style.width = width + 'px';
	element.style.boxSizing = 'content-box';
	element.style.opacity = '100';
}
