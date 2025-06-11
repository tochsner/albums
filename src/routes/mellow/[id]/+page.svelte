<script lang="ts">
	import { chex } from '$lib/colorUtilsClient';
	import { CorePalette } from '@material/material-color-utilities';
	import type { PageProps } from './$types';
	import Sized from '$lib/components/sized.svelte';
	import AudioPlayback from '$lib/components/audioPlayback.svelte';

	let { data }: PageProps = $props();
	let {  title, artist, imageUrl, color, songs } = data;

	let titleFontSize = title.length < 30 ? '3.0rem' : '2.0rem';

	let palette = CorePalette.contentOf(color);
	let mainBackground = `linear-gradient(45deg,${chex(palette.a3, 60, 20)} 0%,${chex(palette.a1, 50, 30)} 100%)`;
	let songBackground = `linear-gradient(45deg, ${chex(palette.a2, 60, 20)} 0%,${chex(palette.a1, 50, 30)} 100%)`;
	let lyricsBackground = chex(palette.a1, 45, 20);

	let currentPlaybackIdx = $state<number>();
</script>

{@render albumOverview()}

{#each songs as song, idx (song.title)}
	{@render songOverview(idx, song)}
{/each}

<AudioPlayback {songs} {currentPlaybackIdx} />

{#snippet albumOverview()}
	<div
		class="flex w-full flex-col items-center justify-center gap-12"
		style:background={mainBackground}
	>
		<div
			class="font-Aboreto mx-4 mt-19 text-center leading-[115%] text-balance text-white"
			style:font-size={titleFontSize}
		>
			{title}
		</div>

		<svg viewBox="0 0 248 253" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-3/4">
			<defs>
				<filter id="blur-bg">
					<feGaussianBlur stdDeviation="40" />
					<feComponentTransfer>
						<feFuncA type="identity" />
						<feFuncR type="linear" slope="1.5" />
						<feFuncG type="linear" slope="1.5" />
						<feFuncB type="linear" slope="1.5" />
					</feComponentTransfer>
				</filter>

				<radialGradient id="radialFade" cx="50%" cy="50%" r="50%">
					<stop offset="0%" style="stop-color:white;stop-opacity:1" />
					<stop offset="70%" style="stop-color:white;stop-opacity:0.8" />
					<stop offset="100%" style="stop-color:white;stop-opacity:0" />
				</radialGradient>

				<mask id="fadeMask">
					<rect width="100%" height="100%" fill="url(#radialFade)" />
				</mask>
			</defs>

			<image
				href={imageUrl}
				x="0"
				y="0"
				width="100%"
				height="100%"
				filter="url(#blur-bg)"
				preserveAspectRatio="xMidYMid slice"
				mask="url(#fadeMask)"
			/>

			<image
				href={imageUrl}
				x="50"
				y="50"
				width="153"
				height="153"
				preserveAspectRatio="xMidYMid slice"
			/>
		</svg>

		<div class="font-Aboreto text-[1.7rem] text-white">
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
		class="flex w-full flex-col items-center justify-center overflow-x-clip border-t-2 border-white/30"
		style:background={songBackground}
	>
		<span class="font-Aboreto py-6 text-center text-[1.8rem] text-white/50">
			{idx + 1}.
		</span>

		<Sized font="Aboreto" fontWeight="normal" classes="text-center text-white" text={song.title} />

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
						<feComponentTransfer>
							<feFuncA type="identity" />
							<feFuncR type="linear" slope="1.5" />
							<feFuncG type="linear" slope="1.5" />
							<feFuncB type="linear" slope="1.5" />
						</feComponentTransfer>
					</filter>

					<radialGradient id="radialFade" cx="50%" cy="50%" r="50%">
						<stop offset="0%" style="stop-color:white;stop-opacity:1" />
						<stop offset="70%" style="stop-color:white;stop-opacity:0.8" />
						<stop offset="100%" style="stop-color:white;stop-opacity:0" />
					</radialGradient>

					<mask id="fadeMask">
						<rect width="100%" height="100%" fill="url(#radialFade)" />
					</mask>
				</defs>

				<image
					href={imageUrl}
					x="0"
					y="0"
					width="100%"
					height="100%"
					filter="url(#blur-bg)"
					preserveAspectRatio="xMidYMid slice"
					mask="url(#fadeMask)"
				/>

				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke="white"
					stroke-width="2px"
					transform="translate(60 50) scale(6)"
					opacity={isPlaying ? 0.0 : 1.0}
					class="transition-opacity ease-in"
					d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
				/>

				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke="white"
					stroke-width="2px"
					transform="translate(53 54) scale(6)"
					opacity={isPlaying ? 1.0 : 0.0}
					class="transition-opacity ease-out"
					d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
				/>
			</svg>
		</button>

		{#if song.themes.length > 0}
			<span class="font-Aboreto mx-4 mt-12 self-start text-[1.7rem] text-white italic opacity-80">
				Themes
			</span>

			<div class="mt-4 flex w-full flex-wrap justify-center gap-4 px-4">
				{#each song.themes as theme (theme)}
					<span
						class="font-Aboreto rounded-lg border-3 border-white/20 px-4 py-1 text-[1.2rem] text-white

"
						style:background={songBackground}
					>
						{theme}
					</span>
				{/each}
			</div>
		{/if}

		{#if song.description != ''}
			<span class="itlic font-Aboreto mx-4 my-4 text-center text-[1.2rem] text-white">
				{song.description}
			</span>
		{/if}

		{#if song.highlightedLyrics.length > 0}
			<span class="font-Aboreto mx-4 mt-12 self-start text-[1.7rem] text-white italic opacity-80">
				Lyrics
			</span>

			<div class="mx-6 mt-4 flex -rotate-2 flex-col items-center gap-2">
				{#each song.highlightedLyrics as lyrics, idx (idx)}
					<span
						class="font-Aboreto rounded-md bg-red-50 py-1 pr-4 pl-7 -indent-4 text-[1.2rem] text-white italic"
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
