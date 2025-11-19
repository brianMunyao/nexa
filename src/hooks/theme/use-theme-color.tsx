import { useTheme } from '../../theme/theme-provider';

export const useThemeColor = (
	token: keyof ReturnType<typeof useTheme>['colors']['light']
) => {
	const { theme, colors } = useTheme();
	return colors[theme][token];
};
