import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import {
	ActivityIndicator,
	Animated,
	GestureResponderEvent,
	StyleSheet,
	Text,
	TextStyle,
	TouchableNativeFeedback,
	TouchableNativeFeedbackProps,
	View,
} from 'react-native';

import { useThemeColor } from '../../hooks/theme/use-theme-color';
import { resolveColor } from '../../utils/theme/resolve-color';

type IBtnVariant =
	| 'primary'
	| 'secondary'
	| 'outline'
	| 'ghost'
	| 'danger'
	| 'success';

type Props = TouchableNativeFeedbackProps & {
	label: string;
	isLoading?: boolean;
	disabled?: boolean;

	variant?: IBtnVariant;
	size?: 'small' | 'normal';

	startIcon?: string;
	textStyle?: TextStyle;
};

const Button = ({
	label,
	isLoading,
	disabled = isLoading,
	variant = 'primary',
	size = 'normal',
	startIcon,
	textStyle,
	style,
	onPressIn,
	onPressOut,
	...otherProps
}: Props) => {
	const scaleValue = useRef(new Animated.Value(1)).current;

	const themeBg = useThemeColor(
		variant === 'outline' || variant === 'ghost' ? 'background' : variant
	);
	const themeBorder = useThemeColor('border');

	const textGhost = useThemeColor('text');

	const themeText = useThemeColor(
		variant === 'outline' || variant === 'ghost' ? 'background' : variant
	);

	const handlePressIn = (event: GestureResponderEvent) => {
		Animated.spring(scaleValue, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
		onPressIn?.(event);
	};

	const handlePressOut = (event: GestureResponderEvent) => {
		Animated.spring(scaleValue, {
			toValue: 1,
			useNativeDriver: true,
		}).start();
		onPressOut?.(event);
	};

	const getBgColor = () => {
		if (variant === 'outline') return 'transparent';
		if (variant === 'ghost') return 'transparent';
		return resolveColor(themeBg);
	};

	const getTextColor = () => {
		if (variant === 'outline' || variant === 'ghost') {
			return resolveColor(textGhost, 'on');
		}
		return resolveColor(themeText, 'on');
	};

	const getBorder = () => {
		if (variant !== 'outline') return {};
		return {
			borderWidth: 1,
			borderColor: resolveColor(themeBorder, 'base'),
		};
	};

	const sizes = {
		small: { paddingVertical: 6, paddingHorizontal: 12, fontSize: 14 },
		normal: { paddingVertical: 10, paddingHorizontal: 16, fontSize: 16 },
	}[size];

	return (
		<TouchableNativeFeedback
			disabled={disabled}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			{...otherProps}
		>
			<Animated.View
				style={[
					styles.container,
					{
						backgroundColor: getBgColor(),
						transform: [{ scale: scaleValue }],
						paddingVertical: sizes.paddingVertical,
						paddingHorizontal: sizes.paddingHorizontal,
					},
					getBorder(),
					style,
				]}
			>
				{isLoading ? (
					<ActivityIndicator color={getTextColor()} />
				) : (
					<View style={styles.labelRow}>
						{startIcon && (
							<Ionicons
								name={startIcon as any}
								size={sizes.fontSize}
								color={getTextColor()}
							/>
						)}
						<Text
							style={[
								styles.label,
								{
									color: getTextColor(),
									fontSize: sizes.fontSize,
								},
								textStyle,
							]}
						>
							{label}
						</Text>
					</View>
				)}
			</Animated.View>
		</TouchableNativeFeedback>
	);
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const styles = StyleSheet.create({
	container: {
		borderRadius: 12,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	label: {
		fontWeight: '600',
		letterSpacing: 0.3,
	},
	labelRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
});

export default Button;
export type { Props as ButtonProps, IBtnVariant };
