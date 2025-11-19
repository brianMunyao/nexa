import { ColorPair } from '../../types/theme';

export const resolveColor = (
	color: ColorPair | string,
	pick: 'base' | 'on' = 'base'
) => {
	if (typeof color === 'object') {
		return color[pick];
	}

	return color;
};
