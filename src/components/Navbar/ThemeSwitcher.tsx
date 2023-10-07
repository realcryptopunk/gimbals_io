
import { type FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { type SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import {useIsSSR} from "@react-aria/ssr";
import clsx from "clsx";
import { Sun, SunMoon } from "lucide-react";

export interface ThemeSwitchProps {
	className?: string;
	classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
	className,
	classNames,
}) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

	const onChange = () => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		setTheme(theme === "light" || isSSR ? "dark" : "light");
	};

	const {
		Component,
		slots,
		isSelected,
		getBaseProps,
		getInputProps,
		getWrapperProps,
	} = useSwitch({
		isSelected: theme === "light" || isSSR,
    "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
		onChange,
	});

	return (
		<Component
			{...getBaseProps({
				className: clsx(
					"px-px transition-opacity hover:opacity-80 cursor-pointer",
					className,
					classNames?.base
				),
			})}
		>
			<VisuallyHidden>
				<input {...getInputProps()} />
			</VisuallyHidden>
			<div
				{...getWrapperProps()}
				className={slots.wrapper({
					class: clsx(
						[
							"w-auto h-auto",
							"bg-transparent",
							"rounded-lg",
							"flex items-center justify-center",
							"group-data-[selected=true]:bg-transparent",
							"!text-default-500",
							"pt-px",
							"px-0",
							"mx-0",
						],
						classNames?.wrapper
					),
				})}
			>
			 {!isSelected || isSSR ? <Sun size={22} /> : <SunMoon size={22} />}
			</div>
		</Component>
	);
};
