import { browser } from '$app/environment';

const KEY = 'likedAlbums';

type LikedAlbum = {
	id: number;
	title: string;
	artist: string;
	imageUrl: string;
	spotifyId?: string;
};

export class LikedAlbums {
	likedAlbums = $state<LikedAlbum[]>();
	album = $state<LikedAlbum>();

	constructor(album?: LikedAlbum) {
		this.album = album;

		if (browser) {
			const item = localStorage.getItem(KEY);
			if (item) this.likedAlbums = this.deserialize(item);
		}

		$effect(() => {
			localStorage.setItem(KEY, this.serialize(this.likedAlbums ?? []));
		});
	}

	serialize(value: LikedAlbum[]): string {
		return JSON.stringify(value);
	}

	deserialize(item: string): LikedAlbum[] {
		return JSON.parse(item);
	}

	toggleLike() {
		if (!this.album) return;

		const currentAlbums = this.likedAlbums ?? [];
		const index = currentAlbums.findIndex((a) => a.id === this.album?.id);

		if (index === -1) {
			this.likedAlbums = [...currentAlbums, this.album];
		} else {
			this.likedAlbums = [...currentAlbums.slice(0, index), ...currentAlbums.slice(index + 1)];
		}
	}

	isLiked() {
		const currentAlbums = this.likedAlbums ?? [];
		return currentAlbums.some((a) => a.id === this.album?.id);
	}
}

export function likedAlbums(album?: LikedAlbum) {
	return new LikedAlbums(album);
}
