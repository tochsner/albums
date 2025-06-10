<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let { albums } = data;

	const genreMap = {
		pop: 'Pop',
		rock: 'Rock',
		rnb: 'R&B / Soul',
		latin: 'Latin / Reggaeton',
		edm: 'EDM / House',
		hiphop: 'Hip Hop / Rap'
	};
</script>

<div class="flex h-dvh w-full flex-col items-center justify-center gap-3 bg-gray-50">
	<h1 class="font-Bebas mb-12 text-center text-5xl text-orange-700">Album of the Day</h1>

	{#await albums}
		{#each Array(6).keys() as k (k)}
			<div
				class="font-Bebas h-[54px] w-32 animate-pulse rounded-full border border-gray-300 bg-white px-6 py-3 text-xl"
			></div>
		{/each}
	{:then loadedAlbums}
		{#each loadedAlbums as album (album.id)}
			<a
				class="font-Bebas rounded-full border border-orange-300 bg-white px-6 py-3 text-xl"
				href={`/${album.mood}/${album.id}`}
			>
				{genreMap[album.genre as keyof typeof genreMap]}
			</a>
		{/each}
	{/await}

	<h2 class="font-Bebas mt-12 text-center text-2xl text-orange-700">How It Works</h2>
	<p class="font-Roboto text-md mx-6 self-start text-gray-900">
		Every day, we select an album for each genre from Rolling Stone's
		<a
			class="text-orange-700 underline"
			href="https://www.rollingstone.com/music/music-lists/best-albums-21st-century-1235177256/destinys-child-survivor-1235184131/"
		>
			The 250 Greatest Albums of the 21st Century So Far</a
		> list.
	</p>
</div>
