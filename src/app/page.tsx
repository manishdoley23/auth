import { cn } from "@/lib/utils";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
	subsets: ["latin"],
	weight: ["400"],
});

export default function Home() {
	return (
		<main className="flex flex-col h-full items-center justify-center bg-black">
			<div className="space-y-6 text-center">
				<h1
					className={cn(
						"text-white text-6xl drop-shadow-md font-semibold",
						font.className
					)}
				>
					Auth
				</h1>
				<p className="text-white text-lg">Auth service</p>
				<div>
					<LoginButton>
						<Button variant={"secondary"} size={"lg"}>
							Sign in
						</Button>
					</LoginButton>
				</div>
			</div>
		</main>
	);
}
