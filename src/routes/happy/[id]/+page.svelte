<script lang="ts">
	import { chex } from '$lib/colorUtilsClient';
	import { CorePalette } from '@material/material-color-utilities';
	import type { PageProps } from './$types';
	import Sized from '$lib/components/sized.svelte';
	import AudioPlayback from '$lib/components/audioPlayback.svelte';

	let { data }: PageProps = $props();
	let { title, artist, imageUrl, color, songs, audios } = data;

	let titleFontSize = title.length < 30 ? '3.0rem' : '2.0rem';

	let palette = CorePalette.contentOf(color);
	let mainBackground = `linear-gradient(45deg,${chex(palette.a3, 70, 40)} 0%,${chex(palette.a1, 70, 50)} 100%)`;
	let mainForeground = chex(palette.a1, 60, 70);

	let songBackground = `linear-gradient(45deg, ${chex(palette.a2, 70, 30)} 0%,${chex(palette.a1, 85, 40)} 100%)`;

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
		<div class="relative mt-19 flex items-center justify-center">
			<svg
				viewBox="0 0 297 184"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="absolute top-0 left-0 h-full w-full"
				preserveAspectRatio="none slice"
			>
				<path
					d="M15.1571 135.777C19.0264 157.846 37.6481 174.302 60.0247 175.427L228.985 183.925C270.302 186.003 302.705 148.927 295.113 108.261L284.132 49.4436C280.054 27.6006 261.517 11.4119 239.324 10.3116L51.0367 0.976547C20.2792 -0.54837 -3.93729 26.8746 1.38105 57.2072L15.1571 135.777Z"
					fill="white"
				/>
			</svg>

			<div
				class="font-Fredoka z-20 mx-4 my-6 h-full text-center leading-[115%] font-semibold text-balance overflow-ellipsis text-white"
				style:font-size={titleFontSize}
				style:color={mainForeground}
			>
				{title}
			</div>
		</div>

		<svg viewBox="0 0 248 253" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-3/4">
			<defs>
				<filter id="blur-bg">
					<feGaussianBlur stdDeviation="40" />
				</filter>

				<mask id="fadeMask">
					<path
						transform="translate(10 5)"
						d="M16.844 32.5156C18.0502 21.0579 27.2279 12.0738 38.7087 11.1121L165.379 0.501838C205.568 -2.86453 238.815 31.3296 234.322 71.4083L219.682 202.01C218.404 213.409 209.238 222.311 197.806 223.255L52.7535 235.231C22.7633 237.708 -2.08326 212.295 1.06745 182.368L16.844 32.5156Z"
						fill="white"
					/>
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

		<div class="font-Fredoka text-[1.7rem] font-semibold text-white">
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
		playbackUrl: string;
		description: string;
		themes: string[];
		highlightedLyrics: string[];
	}
)}
	{@const isPlaying = currentPlaybackIdx == idx}

	<div
		class="flex w-full flex-col items-center justify-center overflow-x-clip"
		style:background={songBackground}
	>
		<span class="font-Bebas py-6 text-center text-[2rem] text-white" style:color={mainForeground}>
			{idx + 1}.
		</span>

		<Sized font="Fredoka" fontWeight="600" classes="text-center text-white" text={song.title} />

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

		<span
			class="font-Fredoka mx-4 mt-12 self-start text-[1.7rem] font-semibold text-white italic opacity-80"
		>
			Themes
		</span>

		<div class="mt-4 flex w-full flex-wrap justify-center gap-4 px-4">
			{#each song.themes as theme (theme)}
				<span
					class="font-Fredoka rounded-full bg-white/90 px-4 py-1 text-[1.2rem] font-semibold text-white"
					style:color={mainForeground}
				>
					{theme}
				</span>
			{/each}
		</div>

		<span class="itlic font-Fredoka mx-4 my-4 text-center text-[1.2rem] font-semibold text-white">
			{song.description}
		</span>

		<span
			class="font-Fredoka mx-4 mt-12 self-start text-[1.7rem] font-semibold text-white italic opacity-80"
		>
			Lyrics
		</span>

		<div class="mx-6 mt-4 flex -rotate-2 flex-col items-center gap-2">
			{#each song.highlightedLyrics as lyrics, idx (idx)}
				<span
					class="font-Fredoka rounded-xl bg-white/20 py-1 pr-2 pl-6 -indent-4 text-[1.2rem] font-semibold text-white italic"
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
