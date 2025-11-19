import { createContext, PropsWithChildren, useContext } from 'react';

import { Theme, ThemeConfig } from '../types/theme';

type ThemeContextProps = {
	theme: Theme;
	colors: ThemeConfig;
};

type Props = PropsWithChildren<ThemeContextProps>;

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider = ({ theme, colors, children }: Props) => {
	return (
		<ThemeContext.Provider value={{ theme, colors }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) throw new Error('ThemeProvider missing');

	return context;
};
