<script lang="ts">
	let { album, artist, light }: { album: string; artist: string; light?: boolean } = $props();
	import { page } from '$app/stores';
	import { createWebSocketModuleRunnerTransport } from 'vite/module-runner';
</script>

<div class="flex gap-4">
	<a class="m-4" href="https://open.spotify.com/search/${encodeURIComponent(`${artist} ${album}`)}">
		<img
			src={light ? '/images/spotify.png' : '/images/spotify_dark.png'}
			alt="Spotify Logo"
			class="h-8 w-8"
		/>
	</a>

	<button
		class="m-4"
		onclick={async () => {
			await navigator.share({
				title: `Check out ${album} by ${artist}`,
				url: $page.url.pathname
			});
		}}
		aria-label="Share on Spotify"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			class="size-6"
			style:color={light ? '#fff' : '#000'}
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
			/>
		</svg>
	</button>
</div>
