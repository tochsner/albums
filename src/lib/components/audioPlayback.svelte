<script lang="ts">
	import { browser } from '$app/environment';
	import { beforeNavigate } from '$app/navigation';

	let {
		songs,
		currentPlaybackIdx
	}: { songs: { id: number; previewUrl: string }[]; currentPlaybackIdx?: number } = $props();

	const audioPlayer = browser ? new Audio() : undefined;
	$effect(() => {
		if (currentPlaybackIdx === undefined || !audioPlayer) {
			audioPlayer?.pause();
			return;
		}

		if (songs[currentPlaybackIdx].previewUrl) {
			audioPlayer.src = songs[currentPlaybackIdx].previewUrl;
		} else {
			throw Error('No preview URL available');
		}

		audioPlayer.play();
	});

	beforeNavigate(() => {
		audioPlayer?.pause();
	});
</script>
