<script lang="ts">
	import { likedAlbums } from '$lib/stores/likedAlbums.svelte';
	import { fade, slide } from 'svelte/transition';
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

	// Create a dynamic color palette for each genre
	const genreColors = {
		pop: {
			bg: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
			text: '#fff',
			accent: '#ff6b6b'
		},
		rock: {
			bg: 'linear-gradient(135deg, #5f27cd 0%, #341f97 100%)',
			text: '#fff',
			accent: '#5f27cd'
		},
		rnb: {
			bg: 'linear-gradient(135deg, #ff9ff3 0%, #f368e0 100%)',
			text: '#fff',
			accent: '#ff9ff3'
		},
		latin: {
			bg: 'linear-gradient(135deg, #ff6348 0%, #ff4757 100%)',
			text: '#fff',
			accent: '#ff6348'
		},
		edm: {
			bg: 'linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)',
			text: '#fff',
			accent: '#00d2d3'
		},
		hiphop: {
			bg: 'linear-gradient(135deg, #2f3542 0%, #57606f 100%)',
			text: '#fff',
			accent: '#2f3542'
		}
	};

	const liked = likedAlbums();
</script>

<div
	class="min-h-dvh w-full overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-red-50"
	data-sveltekit-preload-data="hover"
>
	<!-- Hero Section -->
	<div class="relative mt-16 flex w-full flex-col items-center">
		<!-- Main title with creative layout -->
		<div class="relative z-10 mb-16 text-center">
			<h1 class="font-Bebas text-5xl text-orange-700 md:text-6xl">Album of the Day</h1>
			<p class="font-Baloo mt-6 text-xl leading-relaxed text-gray-800">
				Discover the greatest albums of this century, one album at a time.
			</p>
		</div>

		<!-- Genre buttons with enhanced design -->
		<div class="relative z-10 flex w-full max-w-sm flex-col items-center gap-6 px-6">
			{#await albums}
				{#each Array(6).keys() as k (k)}
					<div class="relative w-full">
						<div
							class="h-16 w-full animate-pulse rounded-2xl border-2 border-orange-200 bg-gradient-to-r from-orange-100 to-amber-100"
						></div>
					</div>
				{/each}
			{:then loadedAlbums}
				{#each loadedAlbums as album, index (album.albumId)}
					{@const colors = genreColors[album.genre as keyof typeof genreColors]}

					<div class="group relative w-full">
						<!-- Background glow effect -->
						<div
							class="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20"
							style:background={colors.bg}
						></div>

						<a
							class="relative block w-full transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
							href={`/${album.mood}/${album.albumId}`}
						>
							<div
								class="relative overflow-hidden rounded-2xl border border-white/20 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
								style:background={colors.bg}
							>
								<!-- Animated background pattern -->
								<svg
									class="absolute inset-0 h-full w-full opacity-10"
									viewBox="0 0 60 60"
									xmlns="http://www.w3.org/2000/svg"
								>
									<defs>
										<pattern
											id={`pattern-${album.genre}`}
											width="20"
											height="20"
											patternUnits="userSpaceOnUse"
										>
											<circle cx="10" cy="10" r="2" fill="white" opacity="0.3">
												<animate
													attributeName="r"
													values="2;4;2"
													dur="3s"
													repeatCount="indefinite"
													begin={`${index * 0.5}s`}
												/>
											</circle>
										</pattern>
									</defs>
									<rect width="100%" height="100%" fill={`url(#pattern-${album.genre})`} />
								</svg>

								<div class="relative z-10 px-8 py-4 text-center">
									<div class="font-Bebas text-2xl font-normal text-white drop-shadow-md">
										{genreMap[album.genre as keyof typeof genreMap]}
									</div>
								</div>

								<!-- Animated edge highlight -->
								<div
									class="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transform bg-white/30 transition-transform duration-300 group-hover:scale-x-100"
								></div>
							</div>
						</a>
					</div>
				{/each}
			{/await}
		</div>

		<!-- Scroll indicator -->
		<div class="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="h-6 w-6 text-orange-600 opacity-60"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
			</svg>
		</div>
	</div>

	<!-- Liked Albums Section -->
	<div class="relative px-6 py-20">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="font-Bebas mb-8 text-4xl text-orange-700">Your Liked Albums</h2>
			{#if liked.likedAlbums?.length}
				<div class="space-y-4">
					{#each liked.likedAlbums as album (album.id)}
						<div
							class="group flex items-center justify-between gap-4 rounded-lg bg-white/50 px-4 shadow-sm transition-all hover:bg-white/70"
							transition:slide
						>
							<div class="flex flex-1 items-center gap-4">
								<div class="text-left">
									<h3 class="font-Baloo text-lg font-semibold text-gray-900">{album.title}</h3>
									<p class="font-Baloo text-sm text-gray-600">{album.artist}</p>
								</div>
							</div>
							<button
								class="mx-2 cursor-pointer"
								onclick={() => liked.toggleLikeAlbum(album)}
								aria-label="Unlike album"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									stroke="currentColor"
									class="size-8"
									stroke-width="2"
								>
									<path
										fill="black"
										d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
									/>
								</svg>
							</button>
							<div class="ml-auto">
								<a
									class="m-4"
									href="https://open.spotify.com/album/{album.spotifyId}"
									aria-label="Open on Spotify"
									target="_blank"
								>
									<img src="/images/spotify_dark.png" alt="Spotify Logo" class="h-8 w-8" />
								</a>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="font-Baloo text-lg text-gray-600">
					No liked albums yet. Start exploring to add some!
				</p>
			{/if}
		</div>
	</div>

	<!-- How It Works Section -->
	<div class="relative px-6 py-20">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="font-Bebas mb-8 text-4xl text-orange-700">How It Works</h2>
			<p class="font-Baloo text-lg leading-relaxed text-gray-800">
				Every day, we select an album for each genre from Rolling Stone's
				<a
					class="font-medium text-orange-600 underline transition-colors hover:text-orange-700"
					href="https://www.rollingstone.com/music/music-lists/best-albums-21st-century-1235177256/destinys-child-survivor-1235184131/"
					target="_blank"
					rel="noopener noreferrer"
				>
					The 250 Greatest Albums of the 21st Century So Far
				</a>
				list.
			</p>
		</div>
	</div>

	<!-- Footer decoration -->
	<div class="h-20 bg-gradient-to-t from-orange-100/50 to-transparent text-center">
		<a href="/impressum" class="text-orange-600 underline transition-colors hover:text-orange-700"
			>Impressum</a
		>
	</div>
</div>
