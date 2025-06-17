<script lang="ts">
	import { chex } from '$lib/colorUtilsClient';
	import { CorePalette } from '@material/material-color-utilities';
	import type { PageProps } from './$types';
	import Sized from '$lib/components/sized.svelte';
	import AudioPlayback from '$lib/components/audioPlayback.svelte';
	import Share from '$lib/components/share.svelte';
	import Home from '$lib/components/home.svelte';

	let { data }: PageProps = $props();
	let { id, title, artist, imageUrl, color, songs, spotifyId, isPlaybackReliable } = data;

	let titleFontSize = title.length < 24 ? '4.0rem' : '3.0em';

	let palette = CorePalette.contentOf(color);
	let mainBackground = `linear-gradient(45deg,${chex(palette.a3, 10, 90)} 0%,${chex(palette.a1, 20, 90)} 100%)`;
	let mainForeground = chex(palette.a1, 20, 90);

	let songBackground = `linear-gradient(45deg, ${chex(palette.a2, 15, 30)} 0%,${chex(palette.a1, 5, 40)} 100%)`;

	let currentPlaybackIdx = $state<number>();
</script>

<Home {color} />

{@render albumOverview()}

{#each songs as song, idx (song.title)}
	{@render songOverview(idx, song)}
{/each}

{@render footer()}

<AudioPlayback {songs} {currentPlaybackIdx} />

{#snippet albumOverview()}
	<div
		class="flex w-full flex-col items-center justify-center overflow-clip sm:px-[30%]"
		style:background={mainBackground}
	>
		<div class="relative flex aspect-square w-full items-center justify-center">
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 393 393"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="absolute top-0 left-0 w-full"
			>
				<rect y="194" width="274.357" height="281.428" transform="rotate(-45 0 194)" fill="white" />
			</svg>

			<div
				class="font-Bebas z-40 mx-4 my-6 max-w-3/4 overflow-hidden text-center leading-[115%] text-balance overflow-ellipsis text-white"
				style:font-size={titleFontSize}
				style:color={mainForeground}
			>
				{title}
			</div>
		</div>

		<svg
			viewBox="0 0 250 307"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="z-20 -mt-30 -mb-8 w-full"
		>
			<defs>
				<filter id="blur-bg">
					<feGaussianBlur stdDeviation="40" />
				</filter>

				<mask id="fadeMask">
					<path
						d="M153.5 0L307 153.5L153.5 307L0 153.5L153.5 0Z"
						fill="white"
						transform="translate(-28.5)"
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
				x="48.5"
				y="77"
				width="153"
				height="153"
				preserveAspectRatio="xMidYMid slice"
			/>
		</svg>

		<div class="font-Bebas z-40 mb-12 text-[1.7rem] text-white">
			{artist}
		</div>

		<Share {title} {artist} {spotifyId} {id} {imageUrl} light />

		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2.5"
			stroke="currentColor"
			class="mt-8 mb-4 size-6 animate-bounce text-white opacity-70"
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
		class="flex w-full flex-col items-center justify-center overflow-clip overflow-x-clip border-t-2 border-white sm:px-[30%]"
		style:background={songBackground}
	>
		<span class="font-Bebas py-6 text-center text-[2.2rem] text-white/50">
			{idx + 1}.
		</span>

		<Sized
			font="Bebas Neue"
			fontWeight="normal"
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
			class:hidden={!isPlaybackReliable}
			class="origin-center cursor-pointer transition-transform duration-100 ease-in"
		>
			<svg
				viewBox="0 0 307 307"
				preserveAspectRatio="xMidYMid slice"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="mt-16 w-24"
			>
				<defs>
					<mask id="buttonMask">
						<path d="M153.5 0L307 153.5L153.5 307L0 153.5L153.5 0Z" fill="white" />
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
					mask="url(#buttonMask)"
				/>

				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke="white"
					stroke-width="2px"
					transform="translate(88 78) scale(6)"
					opacity={isPlaying ? 0.0 : 1.0}
					class="transition-opacity ease-in"
					d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
				/>

				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke="white"
					stroke-width="2px"
					transform="translate(79 81) scale(6)"
					opacity={isPlaying ? 1.0 : 0.0}
					class="transition-opacity ease-out"
					d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
				/>
			</svg>
		</button>

		{#if song.themes.length > 0}
			<span class="font-Bebas mx-4 mt-12 self-start text-[1.7rem] text-white italic opacity-80">
				Themes
			</span>

			<div class="mt-4 flex w-full flex-wrap justify-center gap-4 px-4">
				{#each song.themes as theme (theme)}
					<span
						class="font-Bebas bg-white/90 px-4 pt-1 text-[1.2rem] text-white"
						style:color={mainForeground}
					>
						{theme}
					</span>
				{/each}
			</div>
		{/if}

		{#if song.description != ''}
			<span class="itlic font-Bebas mx-4 my-4 text-center text-[1.2rem] text-white">
				{song.description}
			</span>
		{/if}

		{#if song.highlightedLyrics.length > 0}
			<span class="font-Bebas mx-4 mt-12 self-start text-[1.7rem] text-white italic opacity-80">
				Lyrics
			</span>

			<div class="mx-6 mt-4 flex -rotate-2 flex-col items-center gap-2">
				{#each song.highlightedLyrics as lyrics, idx (idx)}
					<span
						class="font-Bebas bg-white/20 pt-1 pr-2 pl-6 -indent-4 text-[1.2rem] text-white italic"
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
			class="mt-12 mb-4 size-6 animate-bounce text-white opacity-70"
			class:invisible={idx === songs.length - 1}
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
		</svg>
	</div>
{/snippet}

{#snippet footer()}
	<div class="flex justify-center py-4" style:background={chex(palette.a1, 96, 40)}>
		<Share {title} {artist} {spotifyId} {id} {imageUrl} />
	</div>

	<a
		href="/"
		aria-label="home"
		class="font-Baloo m-6 block text-center text-xl text-orange-700 underline"
	>
		Discover all six albums for today
	</a>

	<div class="font-Baloo m-4 text-center text-gray-600">
		Made using the

		<a class="underline" href="http://www.deezer.com/developers/simpleapi">Deezer API</a>, the
		<a class="underline" href="https://docs.genius.com/#/getting-started-h1">Genius API</a>, the
		<a class="underline" href="https://developer.spotify.com/documentation/web-api/">Spotify API</a
		>, and the
		<a class="underline" href="https://openai.com/api/">OpenAI API</a>.
	</div>
{/snippet}
