<script lang="ts">
	import { chex, hex } from '$lib/colorUtilsClient';
	import { CorePalette } from '@material/material-color-utilities';
	import type { PageProps } from './$types';
	import Sized from '$lib/components/sized.svelte';
	import { shrinkWrap } from '$lib/fitUtils';
	import AudioPlayback from '$lib/components/audioPlayback.svelte';

	let { data }: PageProps = $props();
	let { title, artist, imageUrl, color, songs, audios } = data;

	let titleFontSize = title.length < 30 ? '3.0rem' : '2.2rem';

	let palette = CorePalette.contentOf(color);
	let mainBackground = `linear-gradient(45deg,${chex(palette.a3, 90, 20)} 0%,${chex(palette.a1, 90, 20)} 100%)`;
	let songBackground = `linear-gradient(45deg, ${chex(palette.a2, 90, 20)} 0%,${chex(palette.a1, 80, 40)} 100%)`;
	let mainForeground = hex(palette.a2, 60);

	let currentPlaybackIdx = $state<number>();
</script>

{@render albumOverview()}

{#each songs as song, idx (song.title)}
	{@render songOverview(idx, song)}
{/each}

<AudioPlayback {audios} {currentPlaybackIdx} />

{#snippet albumOverview()}
	<div
		class="flex w-full flex-col items-center justify-center gap-12"
		style:background={mainBackground}
	>
		<div
			class="font-EBGaramond mx-8 mt-16 rounded-lg bg-white px-4 py-3 text-center leading-[115%] font-extrabold text-balance opacity-0"
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

		<div class="font-EBGaramond text-[1.7rem] font-extrabold text-white">
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
{/snippet}

{#snippet songOverview(
	idx: number,
	song: {
		title: string;
		playbackUrl: string;
		description: string;
		themes: string[];
		highlightedLyrics: string[];
	}
)}
	{@const isPlaying = currentPlaybackIdx == idx}

	<div
		class="flex w-full flex-col items-center justify-center overflow-x-clip pt-16"
		style:background={songBackground}
	>
		<Sized
			font="EB Garamond"
			fontWeight="bolder"
			classes="text-white text-center"
			text={song.title}
		/>

		<button
			onclick={() => {
				if (isPlaying) {
					currentPlaybackIdx = undefined;
				} else {
					currentPlaybackIdx = idx;
				}
			}}
			aria-label="Start playback."
			class:scale-110={isPlaying}
			class:animate-scalePulse={isPlaying}
			class="origin-center transition-transform duration-100 ease-in"
		>
			<svg viewBox="0 0 248 253" fill="none" xmlns="http://www.w3.org/2000/svg" class="mt-16 w-24">
				<defs>
					<filter id="blur-bg">
						<feGaussianBlur stdDeviation="40" />
					</filter>

					<clipPath id="clip-shape">
						<path
							fill="white"
							d="M24.2385 20.5113C53.762 -1.02366 131.94 -1.54198 186.658 1.12421C220.155 2.75642 246.156 29.6366 246.962 63.1641C248.411 123.489 246.069 211.802 221.239 229.011C189.991 250.668 116.055 253.373 64.2212 252.287C31.6779 251.606 5.50694 226.684 2.9254 194.237C-1.92131 133.318 -4.0974 41.18 24.2385 20.5113Z"
						>
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

				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke="white"
					stroke-width="2px"
					transform="translate(51 55) scale(6)"
					opacity={isPlaying ? 0.0 : 1.0}
					class="transition-opacity ease-in"
					d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
				/>

				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke="white"
					stroke-width="2px"
					transform="translate(51 55) scale(6)"
					opacity={isPlaying ? 1.0 : 0.0}
					class="transition-opacity ease-out"
					d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
				/>
			</svg>
		</button>

		<span
			class="font-EBGaramond mx-4 mt-12 self-start text-[1.7rem] font-extrabold text-white italic opacity-80"
		>
			Themes
		</span>

		<div class="mt-4 flex w-full flex-wrap justify-center gap-4 px-4">
			{#each song.themes as theme (theme)}
				<span
					class="font-EBGaramond rounded-lg border-2 border-white px-4 py-1 text-[1.2rem] font-extrabold text-white

"
					style:background={songBackground}
				>
					{theme}
				</span>
			{/each}
		</div>

		<span
			class="itlic font-EBGaramond mx-4 my-4 text-center text-[1.2rem] font-extrabold text-white"
		>
			{song.description}
		</span>

		<span
			class="font-EBGaramond mx-4 mt-12 self-start text-[1.7rem] font-extrabold text-white italic opacity-80"
		>
			Lyrics
		</span>

		<div class="mx-6 mt-4 flex -rotate-2 flex-col items-center gap-2">
			{#each song.highlightedLyrics as lyrics, idx (idx)}
				<span
					class="font-EBGaramond bg-red-50 py-1 pr-2 pl-6 -indent-4 text-[1.2rem] font-extrabold text-white italic"
					style:background={mainForeground}
				>
					{lyrics}
				</span>
			{/each}
		</div>

		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2.5"
			stroke="currentColor"
			class="mt-12 mb-4 size-6 text-white opacity-70"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
		</svg>
	</div>
{/snippet}
