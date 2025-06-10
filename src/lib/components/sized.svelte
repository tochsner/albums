<script lang="ts">
	import { getPartitions, getWordDimensions, getWordWidth } from '$lib/fitUtils';
	import { browser } from '$app/environment';

	let {
		text,
		font,
		fontWeight = 'normal',
		classes = '',
		maxNumLines = 3,
		minFontSizePx = 40.0,
		maxFontSizePx = 100.0,
		gapPx = -1
	}: {
		text: string;
		font: string;
		fontWeight: string;
		classes: string;
		maxNumLines?: number;
		minFontSizePx?: number;
		maxFontSizePx?: number;
		gapPx?: number;
	} = $props();

	let width: number | undefined = $state();

	type Line = {
		text: string;
		font: string;
		lineHeight: string;
		top: string;
	};
	let lines = $state([] as Line[]);
	let totalHeight = $state('64px');

	$effect.pre(() => {
		if (!browser || width === undefined) return;

		const baselineFont = `${fontWeight} ${minFontSizePx}px ${font}`;

		document.fonts.load(baselineFont).then(() => {
			console.log('Loaded');

			const words = text.split(' ') || [];
			const wordWidths = words.map((word) => getWordWidth(`${word} `, baselineFont));
			const maxPossibleLines = Math.min(maxNumLines || 3, words.length);

			for (let numLines = 1; numLines <= maxPossibleLines; numLines++) {
				const partitions = getPartitions(wordWidths, numLines);
				const partitionedLines = partitions
					.filter((partition) => partition.length > 0)
					.map((partition) => partition.map((idx) => words[idx]).join(' '));

				const tempLines = [];
				let accTop = 0.0;
				let currentMaxFontSizePx = 0.0;
				for (const line of partitionedLines) {
					const dimensions = getWordDimensions(line, baselineFont);
					const scaleFactor = width / dimensions.width;
					const fontSize = minFontSizePx * scaleFactor;
					const height =
						(dimensions.actualBoundingBoxAscent + dimensions.actualBoundingBoxDescent) *
						scaleFactor;
					const lineHeight = dimensions.actualBoundingBoxAscent * scaleFactor;

					tempLines.push({
						text: line,
						font: `${fontWeight} ${fontSize}px ${font}`,
						top: `${accTop}px`,
						lineHeight: `${lineHeight}px`
					});
					accTop += height + gapPx;
					currentMaxFontSizePx = Math.max(currentMaxFontSizePx, fontSize);
				}

				if (1 < numLines && maxFontSizePx < currentMaxFontSizePx) {
					break;
				}

				lines = tempLines;
				totalHeight = `${accTop}px`;
			}
		});
	});
</script>

<div class="relative w-full" style:height={totalHeight} bind:clientWidth={width}>
	{#each lines as { text, font, top, lineHeight } (text)}
		<span
			style:font
			class={`whitespace-nowrap ${classes} absolute inline-block align-baseline`}
			style:top
			style:line-height={lineHeight}>{text}</span
		>
	{/each}
</div>
