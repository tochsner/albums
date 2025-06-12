<script lang="ts">
	import { chex, hex } from '$lib/colorUtilsClient';
	import { CorePalette } from '@material/material-color-utilities';
	import type { PageProps } from './$types';
	import Sized from '$lib/components/sized.svelte';
	import { shrinkWrap } from '$lib/fitUtils';
	import AudioPlayback from '$lib/components/audioPlayback.svelte';
	import Share from '$lib/components/share.svelte';

	let { data }: PageProps = $props();
	let { title, artist, imageUrl, color, songs, spotifyId } = data;

	let titleFontSize = title.length < 30 ? '4.0rem' : '3rem';

	let palette = CorePalette.contentOf(color);
	let mainBackground = `linear-gradient(45deg,${chex(palette.a3, 90, 10)} 0%,${chex(palette.a1, 90, 30)} 100%)`;
	let songBackground = `linear-gradient(45deg, ${chex(palette.a2, 35, 20)} 0%,${chex(palette.a1, 35, 40)} 100%)`;
	let mainForeground = hex(palette.a1, 50);
	let lyricsBackground = chex(palette.a1, 45, 90);

	let currentPlaybackIdx = $state<number>();
</script>

{@render albumOverview()}

{#each songs as song, idx (song.title)}
	{@render songOverview(idx, song)}
{/each}

<AudioPlayback {songs} {currentPlaybackIdx} />

{#snippet albumOverview()}
	<div
		class="flex w-full flex-col items-center justify-center gap-12 sm:px-[25%]"
		style:background={mainBackground}
	>
		<div
			class="font-Anton mx-10 mt-16 rounded-full bg-white px-8 py-6 text-center leading-[115%] text-balance opacity-0"
			style:color={mainForeground}
			style:font-size={titleFontSize}
			use:shrinkWrap
		>
			{title}
		</div>

		<svg viewBox="0 0 248 253" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-3/4">
			<defs>
				<filter id="blur-bg">
					<feGaussianBlur stdDeviation="40" />
				</filter>

				<clipPath id="clip-shape">
					<circle cx="124" cy="126.5" r="124" fill="white" />
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
				x="50"
				y="50"
				width="153"
				height="153"
				preserveAspectRatio="xMidYMid slice"
				clip-path="url(#clip-shape)"
			/>
		</svg>

		<div class="font-Anton text-[1.7rem]" style:color={mainForeground}>
			{artist}
		</div>

		<Share album={title} {artist} {spotifyId} />

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
		idx: number;
		title: string;
		previewUrl: string;
		description: string;
		themes: string[];
		highlightedLyrics: string[];
	}
)}
	{@const isPlaying = currentPlaybackIdx == idx}

	<div
		class="flex w-full flex-col items-center justify-center overflow-x-clip border-t-2 border-white sm:px-[25%]"
		style:background={songBackground}
	>
		<span class="font-Anton py-6 text-center text-[2.3rem] text-white/60">
			{idx + 1}.
		</span>

		<Sized font="Anton" fontWeight="normal" classes="text-center text-white" text={song.title} />

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
					transform="translate(60 56) scale(6)"
					opacity={isPlaying ? 0.0 : 1.0}
					class="transition-opacity ease-in"
					d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
				/>

				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke="white"
					stroke-width="2px"
					transform="translate(53 57) scale(6)"
					opacity={isPlaying ? 1.0 : 0.0}
					class="transition-opacity ease-out"
					d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
				/>
			</svg>
		</button>

		{#if song.themes.length > 0}
			<span class="font-Anton mx-4 mt-12 self-start text-[1.7rem] text-white italic opacity-80">
				Themes
			</span>

			<div class="mt-4 flex w-full flex-wrap justify-center gap-4 px-4">
				{#each song.themes as theme (theme)}
					<span
						class="font-Anton rounded-full border-3 border-white/20 px-4 py-1 text-[1.2rem] text-white

"
						style:background={songBackground}
					>
						{theme}
					</span>
				{/each}
			</div>
		{/if}

		{#if song.description != ''}
			<span class="itlic font-Anton mx-4 my-4 text-center text-[1.2rem] text-white">
				{song.description}
			</span>
		{/if}

		{#if song.highlightedLyrics.length > 0}
			<span class="font-Anton mx-4 mt-12 self-start text-[1.7rem] text-white italic opacity-80">
				Lyrics
			</span>

			<div class="mx-6 mt-4 flex -rotate-2 flex-col items-center gap-2">
				{#each song.highlightedLyrics as lyrics, idx (idx)}
					<span
						class="font-Anton bg-red-50 py-1 pr-2 pl-6 -indent-4 text-[1.2rem] text-white italic"
						style:background={lyricsBackground}
					>
						{lyrics}
					</span>
				{/each}
			</div>
		{/if}

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
