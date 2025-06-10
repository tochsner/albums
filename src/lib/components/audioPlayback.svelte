<script lang="ts">
	import { browser } from '$app/environment';

	let {
		audios,
		currentPlaybackIdx
	}: { audios: Promise<{ data: { audio: string }[] }>; currentPlaybackIdx?: number } = $props();

	const audioPlayer = browser ? new Audio() : undefined;
	$effect(() => {
		if (currentPlaybackIdx === undefined) {
			audioPlayer?.pause();
			return;
		}

		audios.then(async (audios) => {
			if (currentPlaybackIdx === undefined || audioPlayer === undefined) {
				audioPlayer?.pause();
			} else {
				audioPlayer.src = audios.data[currentPlaybackIdx].audio;
				audioPlayer.play();
			}
		});
	});
</script>
