import sharp from 'sharp';
import {
	QuantizerCelebi,
	Score,
	argbFromRgb,
	CorePalette,
	hexFromArgb,
	TonalPalette
} from '@material/material-color-utilities';

async function getPixelsFromUrl(url: string) {
	const response = await fetch(url);

	const buffer = await response.arrayBuffer();
	const sharpImage = sharp(buffer);

	const { data } = await sharpImage.removeAlpha().raw().toBuffer({ resolveWithObject: true });
	const pixelArray = Uint8ClampedArray.from(data);

	return pixelArray;
}

function getColorFromImageBytes(pixelArray: Uint8ClampedArray) {
	const pixels: number[] = [];
	for (let i = 0; i < pixelArray.length; i += 3) {
		const r = pixelArray[i];
		const g = pixelArray[i + 1];
		const b = pixelArray[i + 2];
		const argb = argbFromRgb(r, g, b);
		pixels.push(argb);
	}

	const result = QuantizerCelebi.quantize(pixels, 128);
	const ranked = Score.score(result);
	const top = ranked[0];

	return top;
}

export async function getColorFromUrl(imageUrl: string) {
	const pixelArray = await getPixelsFromUrl(imageUrl);
	const color = getColorFromImageBytes(pixelArray);
	return color;
}

export function hex(palette: TonalPalette, tone: number) {
	return hexFromArgb(palette.tone(tone));
}
