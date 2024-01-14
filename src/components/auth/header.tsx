import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"],
});

interface HeaderProps {
	label: string;
}

export const Header = (props: HeaderProps) => {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center w-full gap-y-4 text-black"
			)}
		>
			<h1 className={cn("text-3xl font-semibold", font.className)}>
				Auth
			</h1>
			<p className="text-sm text-muted-foreground">{props.label}</p>
		</div>
	);
};
