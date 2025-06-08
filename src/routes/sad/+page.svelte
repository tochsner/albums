<script lang="ts">
	import { hex } from '$lib/colorUtilsClient';
	import { CorePalette } from '@material/material-color-utilities';
	import type { PageProps } from './$types';
	import Sized from '$lib/components/sized.svelte';

	let { data }: PageProps = $props();
	let { title, artist, imageUrl, color, songs } = data;

	function shrinkWrap(element: HTMLElement) {
		const { firstChild, lastChild } = element;
		if (!element || !firstChild || !lastChild) return;

		const range = document.createRange();
		range.setStartBefore(firstChild);
		range.setEndAfter(lastChild);

		const { width } = range.getBoundingClientRect();
		element.style.width = width + 'px';
		element.style.boxSizing = 'content-box';

		element.style.background = 'white';
	}

	let titleFontSize = title.length < 30 ? '3.2rem' : '2.4rem';

	let palette = CorePalette.contentOf(color);
	let mainBackground = `linear-gradient(45deg,${hex(palette.a3, 80)} 0%,${hex(palette.a1, 80)} 100%)`;
	let mainForeground = hex(palette.a2, 60);
</script>

<div
	class="flex w-full flex-col items-center justify-center gap-16"
	style:background={mainBackground}
>
	<div
		class="mx-8 mt-24 rounded-lg bg-white px-4 py-3 text-center font-[EBGaramond] leading-[115%] font-extrabold text-balance"
		style:color={mainForeground}
		style:font-size={titleFontSize}
		use:shrinkWrap
	>
		{title}
	</div>

	<svg viewBox="0 0 248 253" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-2/3">
		<defs>
			<filter id="blur-bg">
				<feGaussianBlur stdDeviation="40" />
			</filter>

			<clipPath id="clip-shape">
				<path
					fill="white"
					d="M24.2385 20.5113C53.762 -1.02366 131.94 -1.54198 186.658 1.12421C220.155 2.75642 246.156 29.6366 246.962 63.1641C248.411 123.489 246.069 211.802 221.239 229.011C189.991 250.668 116.055 253.373 64.2212 252.287C31.6779 251.606 5.50694 226.684 2.9254 194.237C-1.92131 133.318 -4.0974 41.18 24.2385 20.5113Z"
				>
					<animate
						attributeName="d"
						dur="15s"
						repeatCount="indefinite"
						values="M24.2385 20.5113C53.762 -1.02366 131.94 -1.54198 186.658 1.12421C220.155 2.75642 246.156 29.6366 246.962 63.1641C248.411 123.489 246.069 211.802 221.239 229.011C189.991 250.668 116.055 253.373 64.2212 252.287C31.6779 251.606 5.50694 226.684 2.9254 194.237C-1.92131 133.318 -4.0974 41.18 24.2385 20.5113Z;
						M30.2385 26.5113C60.762 5.02366 127.94 -5.54198 182.658 2.62421C216.155 14.2564 241.156 35.6366 242.962 68.1641C244.411 128.489 240.069 201.802 210.239 223.011C176.991 244.668 113.055 241.373 61.2212 240.287C28.6779 239.606 11.5069 214.684 8.9254 182.237C4.0787 121.318 -0.9026 47.68 30.2385 26.5113Z;
						M24.2385 20.5113C53.762 -1.02366 131.94 -1.54198 186.658 1.12421C220.155 2.75642 246.156 29.6366 246.962 63.1641C248.411 123.489 246.069 211.802 221.239 229.011C189.991 250.668 116.055 253.373 64.2212 252.287C31.6779 251.606 5.50694 226.684 2.9254 194.237C-1.92131 133.318 -4.0974 41.18 24.2385 20.5113Z"
						calcMode="spline"
						keySplines="0.35 0 0.45 1; 0.35 0 0.45 1"
						keyTimes="0; 0.5; 1"
					/>
				</path>
			</clipPath>
		</defs>

		<image
			href={imageUrl}
			x="0"
			y="0"
			width="248"
			height="253"
			filter="url(#blur-bg)"
			preserveAspectRatio="xMidYMid slice"
			clip-path="url(#clip-shape)"
		/>

		<image
			href={imageUrl}
			x="40"
			y="40"
			width="168"
			height="173"
			preserveAspectRatio="xMidYMid slice"
			clip-path="url(#clip-shape)"
		/>
	</svg>

	<div class="font-[EBGaramond] text-[1.7rem] font-extrabold text-white">
		{artist}
	</div>

	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2.5"
		stroke="currentColor"
		class="mb-4 size-6 text-white opacity-70"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
	</svg>
</div>

{#each songs as song (song.title)}
	<div
		class="flex w-full flex-col items-center justify-center gap-16 pb-16"
		style:background={mainBackground}
	>
		<Sized
			font="EBGaramond"
			fontWeight="bolder"
			classes="text-white text-center"
			text={song.title}
		/>
	</div>
{/each}
