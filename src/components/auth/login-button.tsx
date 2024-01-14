"use client";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
	children: React.ReactNode;
	mode?: "modal" | "redirect";
	asChild?: boolean;
}

export const LoginButton = ({
	children,
	asChild,
	mode = "redirect",
}: LoginButtonProps) => {
	const router = useRouter();
	const onClick = () => {
		router.push("/auth/login");
	};

	if (mode === "modal") {
		return <span className="text-white">TODO: Modal</span>;
	}

	return <span onClick={onClick}>{children}</span>;
};
