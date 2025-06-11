<script lang="ts">
	import type { PageProps } from './$types';
	import Sized from '$lib/components/sized.svelte';

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
		pop: { bg: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)', text: '#fff', accent: '#ff6b6b' },
		rock: { bg: 'linear-gradient(135deg, #5f27cd 0%, #341f97 100%)', text: '#fff', accent: '#5f27cd' },
		rnb: { bg: 'linear-gradient(135deg, #ff9ff3 0%, #f368e0 100%)', text: '#fff', accent: '#ff9ff3' },
		latin: { bg: 'linear-gradient(135deg, #ff6348 0%, #ff4757 100%)', text: '#fff', accent: '#ff6348' },
		edm: { bg: 'linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)', text: '#fff', accent: '#00d2d3' },
		hiphop: { bg: 'linear-gradient(135deg, #2f3542 0%, #57606f 100%)', text: '#fff', accent: '#2f3542' }
	};

	let hoveredGenre = $state<string | null>(null);
</script>

<div class="min-h-dvh w-full bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 overflow-hidden">
	<!-- Hero Section -->
	<div class="relative flex h-screen w-full flex-col items-center justify-center">
		<!-- Background decoration -->
		<svg
			class="absolute inset-0 w-full h-full opacity-10"
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
					<path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ff6b47" stroke-width="0.5"/>
				</pattern>
			</defs>
			<rect width="100" height="100" fill="url(#grid)" />
		</svg>

		<!-- Floating shapes -->
		<div class="absolute top-20 left-10 w-20 h-20 bg-orange-200/30 rounded-full animate-bounce delay-100"></div>
		<div class="absolute top-40 right-20 w-16 h-16 bg-red-200/30 rounded-full animate-bounce delay-300"></div>
		<div class="absolute bottom-40 left-20 w-24 h-24 bg-amber-200/30 rounded-full animate-bounce delay-500"></div>

		<!-- Main title with creative layout -->
		<div class="relative z-10 text-center mb-16">
			<div class="relative">
				<svg
					viewBox="0 0 400 120"
					class="w-full max-w-md mx-auto"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" style="stop-color:#ff6b47;stop-opacity:1" />
							<stop offset="50%" style="stop-color:#ff8e53;stop-opacity:1" />
							<stop offset="100%" style="stop-color:#ff6348;stop-opacity:1" />
						</linearGradient>
						<filter id="glow">
							<feGaussianBlur stdDeviation="3" result="coloredBlur"/>
							<feMerge> 
								<feMergeNode in="coloredBlur"/>
								<feMergeNode in="SourceGraphic"/>
							</feMerge>
						</filter>
					</defs>
					<path
						d="M20 80 Q50 20 100 60 T180 50 Q220 30 260 70 T340 60 Q370 40 380 80"
						fill="none"
						stroke="url(#titleGradient)"
						stroke-width="4"
						opacity="0.3"
					/>
				</svg>
				<div class="absolute inset-0 flex items-center justify-center">
					<Sized
						text="Album of the Day"
						font="Bebas Neue"
						fontWeight="normal"
						classes="text-orange-700 drop-shadow-lg"
						maxFontSizePx={60}
						minFontSizePx={32}
					/>
				</div>
			</div>
		</div>

		<!-- Genre buttons with enhanced design -->
		<div class="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm px-6">
			{#await albums}
				{#each Array(6).keys() as k (k)}
					<div class="relative w-full">
						<div
							class="w-full h-16 animate-pulse rounded-2xl border-2 border-orange-200 bg-gradient-to-r from-orange-100 to-amber-100"
						></div>
					</div>
				{/each}
			{:then loadedAlbums}
				{#each loadedAlbums as album, index (album.albumId)}
					{@const colors = genreColors[album.genre as keyof typeof genreColors]}
					{@const isHovered = hoveredGenre === album.genre}
					
					<div class="relative w-full group">
						<!-- Background glow effect -->
						<div 
							class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
							style:background={colors.bg}
						></div>
						
						<a
							class="relative block w-full transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
							href={`/${album.mood}/${album.albumId}`}
							onmouseenter={() => hoveredGenre = album.genre}
							onmouseleave={() => hoveredGenre = null}
						>
							<div 
								class="relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300"
								style:background={colors.bg}
							>
								<!-- Animated background pattern -->
								<svg
									class="absolute inset-0 w-full h-full opacity-10"
									viewBox="0 0 60 60"
									xmlns="http://www.w3.org/2000/svg"
								>
									<defs>
										<pattern id={`pattern-${album.genre}`} width="20" height="20" patternUnits="userSpaceOnUse">
											<circle cx="10" cy="10" r="2" fill="white" opacity="0.3">
												<animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" begin={`${index * 0.5}s`}/>
											</circle>
										</pattern>
									</defs>
									<rect width="100%" height="100%" fill={`url(#pattern-${album.genre})`} />
								</svg>

								<div class="relative z-10 px-8 py-4 text-center">
									<div class="font-Bebas text-2xl font-normal text-white drop-shadow-md">
										{genreMap[album.genre as keyof typeof genreMap]}
									</div>
									
									<!-- Subtitle with mood -->
									<div class="font-Baloo text-sm text-white/80 capitalize mt-1">
										{album.mood} vibes
									</div>
								</div>

								<!-- Animated edge highlight -->
								<div 
									class="absolute inset-x-0 bottom-0 h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
								></div>
							</div>
						</a>
					</div>
				{/each}
			{/await}
		</div>

		<!-- Scroll indicator -->
		<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="w-6 h-6 text-orange-600 opacity-60"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
			</svg>
		</div>
	</div>

	<!-- How It Works Section -->
	<div class="relative py-20 px-6">
		<!-- Section background -->
		<div class="absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/50 to-transparent"></div>
		
		<div class="relative z-10 max-w-4xl mx-auto text-center">
			<!-- Section title -->
			<div class="mb-12">
				<h2 class="font-Bebas text-4xl text-orange-700 mb-4">How It Works</h2>
				<div class="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto"></div>
			</div>

			<!-- Content card -->
			<div class="relative">
				<!-- Card background with subtle animation -->
				<div class="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl"></div>
				<div class="absolute inset-0 bg-gradient-to-br from-orange-100/30 to-red-100/30 rounded-3xl"></div>
				
				<div class="relative z-10 p-12">
					<div class="grid md:grid-cols-3 gap-8 mb-8">
						<!-- Step 1 -->
						<div class="text-center">
							<div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
								<span class="font-Bebas text-2xl text-white">1</span>
							</div>
							<h3 class="font-Bebas text-xl text-orange-700 mb-2">Curated Selection</h3>
							<p class="font-Baloo text-gray-700 text-sm">Albums from Rolling Stone's top 250 list</p>
						</div>
						
						<!-- Step 2 -->
						<div class="text-center">
							<div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
								<span class="font-Bebas text-2xl text-white">2</span>
							</div>
							<h3 class="font-Bebas text-xl text-orange-700 mb-2">Daily Refresh</h3>
							<p class="font-Baloo text-gray-700 text-sm">New selections every day by genre</p>
						</div>
						
						<!-- Step 3 -->
						<div class="text-center">
							<div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
								<span class="font-Bebas text-2xl text-white">3</span>
							</div>
							<h3 class="font-Bebas text-xl text-orange-700 mb-2">Discover</h3>
							<p class="font-Baloo text-gray-700 text-sm">Explore music that matches your mood</p>
						</div>
					</div>

					<div class="border-t border-orange-200 pt-8">
						<p class="font-Baloo text-lg text-gray-800 leading-relaxed">
							Every day, we select an album for each genre from Rolling Stone's
							<a
								class="text-orange-600 underline hover:text-orange-700 transition-colors font-medium"
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
			</div>
		</div>
	</div>

	<!-- Footer decoration -->
	<div class="h-20 bg-gradient-to-t from-orange-100/50 to-transparent"></div>
</div>