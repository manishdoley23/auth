"use client";

import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const Social = () => {
	return (
		<div className="w-full gap-x-2 flex items-center">
			<Button
				className="w-full"
				size={"lg"}
				variant={"outline"}
				onClick={() => console.log("1")}
			>
				<FcGoogle className="h-5 w-5" />
			</Button>
			<Button
				className="w-full"
				size={"lg"}
				variant={"outline"}
				onClick={() => console.log("1")}
			>
				<FaGithub className="h-5 w-5" />
			</Button>
		</div>
	);
};
