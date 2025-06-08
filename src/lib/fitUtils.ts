export const fit = (node: HTMLElement): { destroy: () => void } => {
	const on_resize = (): void => {
		if (node.parentElement) {
			getMaxFontSize(node, node.textContent);
		}
	};

	const resize_observer = new ResizeObserver(on_resize);
	resize_observer.observe(node?.parentElement as HTMLElement);

	return {
		destroy(): void {
			resize_observer.disconnect();
		}
	};
};

export function getWordDimensions(word: string, font: string) {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	context.font = font;

	if (!context) throw Error('Context needs to be accessible to get text measurements.');

	return context.measureText(word);
}

export function getWordWidth(word: string, font: string) {
	const dimensions = getWordDimensions(word, font);
	return dimensions.actualBoundingBoxRight + dimensions.actualBoundingBoxLeft;
}

export function getNumLines(element: HTMLElement) {
	const range = document.createRange();
	range.selectNodeContents(element);
	const rects = range.getClientRects();

	// Count unique Y positions (different lines have different tops)
	const uniqueY = new Set();
	for (let i = 0; i < rects.length; i++) {
		uniqueY.add(Math.round(rects[i].top));
	}

	range.detach();

	return uniqueY.size;
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

	// Reconstruct partitions
	const result = [];
	let j = len;
	for (let i = n; i > 0; i--) {
		const k = div[i][j];
		result.unshift(Array.from({ length: j - k }, (_, idx) => k + idx));
		j = k;
	}

	return result;
}

export function getMaxFontSize(element: HTMLElement, text: string) {
	element.textContent = text;
	element.style.whiteSpace = `nowrap`;

	const deltaRem = 0.02;

	let fontSizeRem = 1.0;
	element.style.fontSize = `${fontSizeRem}rem`;

	while (element.parentElement && element.parentElement.clientWidth >= element.offsetWidth) {
		fontSizeRem += deltaRem;
		element.style.fontSize = `${fontSizeRem}rem`;
	}

	fontSizeRem -= deltaRem;
	element.style.fontSize = `${fontSizeRem}rem`;

	return fontSizeRem;
}

export const parent_style = `display: inline-block; width: 100%; height: 100%;`;
