export type Theme = 'light' | 'dark';

export type ColorPair = {
	/** Background color or main color */
	base: string;

	/** Text color that sits on top of the base color */
	on: string;
};

export type ColorTokens = {
	/* Main brand color */
	primary: ColorPair;

	/* Supporting accent color */
	secondary: ColorPair;

	/* Error / Destructive actions */
	danger: ColorPair;

	/* Success / Confirmation */
	success: ColorPair;

	/* Alerts / Warnings */
	warning: ColorPair;

	/* Informational */
	info: ColorPair;

	/* Backgrounds */
	background: ColorPair; // base + on (text on background)
	surface: ColorPair; // for cards, sheets, modals

	/* Typography */
	text: string; // default body text
	textMuted: string; // hint, caption, weak text
	textInverse: string; // text on very dark backgrounds

	/* Borders / Lines */
	border: string;
	borderStrong: string;

	/* Disabled */
	disabled: ColorPair;

	/* Overlays (modals, backdrops) */
	overlay: string;

	/* Shadows (optional) */
	shadow: string;
};

export type ThemeConfig = {
	light: ColorTokens;
	dark: ColorTokens;
};
