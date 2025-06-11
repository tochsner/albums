<script lang="ts">
	import { chex } from '$lib/colorUtilsClient';
	import { CorePalette } from '@material/material-color-utilities';
	import type { PageProps } from './$types';
	import Sized from '$lib/components/sized.svelte';
	import AudioPlayback from '$lib/components/audioPlayback.svelte';
	import { shrinkWrap } from '$lib/fitUtils';

	let { data }: PageProps = $props();
	let { title, artist, imageUrl, color, songs, audios } = data;

	let titleFontSize = title.length < 30 ? '2.8rem' : '2.0rem';

	let palette = CorePalette.contentOf(color);
	let mainBackground = `linear-gradient(45deg,${chex(palette.a3, 70, 40)} 0%,${chex(palette.a1, 70, 50)} 100%)`;
	let mainForeground = chex(palette.a1, 60, 70);

	let songBackground = `linear-gradient(45deg, ${chex(palette.a2, 75, 40)} 0%,${chex(palette.a1, 90, 40)} 100%)`;

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
				class="font-Baloo z-20 mx-12 my-6 h-full text-center leading-[115%] font-semibold text-balance overflow-ellipsis text-white"
				style:font-size={titleFontSize}
				style:color={mainForeground}
				use:shrinkWrap
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
						d="M14.7651 51.2616C17.1776 28.3462 35.533 10.3782 58.4947 8.45481L155.676 0.314567C200.889 -3.4726 238.292 34.9958 233.238 80.0844L221.881 181.389C219.325 204.188 200.994 221.991 178.13 223.879L52.7535 234.231C22.7633 236.708 -2.08326 211.295 1.06745 181.368L14.7651 51.2616Z"
						fill="white"
					>
						<animate
							attributeName="d"
							dur="12s"
							repeatCount="indefinite"
							values="M14.7651 51.2616C17.1776 28.3462 35.533 10.3782 58.4947 8.45481L155.676 0.314567C200.889 -3.4726 238.292 34.9958 233.238 80.0844L221.881 181.389C219.325 204.188 200.994 221.991 178.13 223.879L52.7535 234.231C22.7633 236.708 -2.08326 211.295 1.06745 181.368L14.7651 51.2616Z;M2.38144 53.0516C2.72921 27.7224 22.7001 7.02349 48.0005 5.76937L152.808 0.574153C196.319 -1.58263 231.763 35.0928 228.121 78.5045L219.63 179.722C217.569 204.292 197.229 223.304 172.576 223.704L49.4522 225.699C22.3832 226.137 0.307332 204.116 0.679002 177.046L2.38144 53.0516Z;M14.7651 51.2616C17.1776 28.3462 35.533 10.3782 58.4947 8.45481L155.676 0.314567C200.889 -3.4726 238.292 34.9958 233.238 80.0844L221.881 181.389C219.325 204.188 200.994 221.991 178.13 223.879L52.7535 234.231C22.7633 236.708 -2.08326 211.295 1.06745 181.368L14.7651 51.2616Z"
						/>
					</path>
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

		<div class="font-Baloo text-[1.7rem] font-semibold text-white">
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
		<span class="font-Bebas py-6 text-center text-[2rem] text-white/60">
			{idx + 1}.
		</span>

		<Sized
			font="'Baloo Bhaijaan 2'"
			fontWeight="600"
			classes="text-center text-white"
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
						<feComponentTransfer>
							<feFuncA type="identity" />
							<feFuncR type="linear" slope="1.5" />
							<feFuncG type="linear" slope="1.5" />
							<feFuncB type="linear" slope="1.5" />
						</feComponentTransfer>
					</filter>
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
					transform="translate(52 54) scale(6)"
					opacity={isPlaying ? 1.0 : 0.0}
					class="transition-opacity ease-out"
					d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
				/>
			</svg>
		</button>

		<span
			class="font-Baloo mx-4 mt-12 self-start text-[1.7rem] font-semibold text-white italic opacity-80"
		>
			Themes
		</span>

		<div class="mt-4 flex w-full flex-wrap justify-center gap-4 px-4">
			{#each song.themes as theme (theme)}
				<span
					class="font-Baloo rounded-full bg-white/90 px-4 pt-1 text-[1.2rem] font-semibold text-white"
					style:color={mainForeground}
				>
					{theme}
				</span>
			{/each}
		</div>

		<span class="itlic font-Baloo mx-4 my-4 text-center text-[1.2rem] font-semibold text-white">
			{song.description}
		</span>

		<span
			class="font-Baloo mx-4 mt-12 self-start text-[1.7rem] font-semibold text-white italic opacity-80"
		>
			Lyrics
		</span>

		<div class="mx-6 mt-4 flex -rotate-2 flex-col items-center gap-2">
			{#each song.highlightedLyrics as lyrics, idx (idx)}
				<span
					class="font-Baloo rounded-full bg-white/20 pt-1 pr-4 pl-7 -indent-4 text-[1.2rem] font-semibold text-white italic"
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
