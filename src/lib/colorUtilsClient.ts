import { hexFromArgb, TonalPalette } from '@material/material-color-utilities';

export function hex(palette: TonalPalette, tone: number) {
	return hexFromArgb(palette.tone(tone));
}

export function chex(palette: TonalPalette, tone: number, chroma: number) {
	return hexFromArgb(TonalPalette.fromHueAndChroma(palette.hue, chroma).tone(tone));
}
