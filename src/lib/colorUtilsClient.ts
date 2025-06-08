import { hexFromArgb, TonalPalette } from '@material/material-color-utilities';

export function hex(palette: TonalPalette, tone: number) {
	return hexFromArgb(palette.tone(tone));
}
