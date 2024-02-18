"use client";

import * as z from "zod";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked"
			? "Email in use with different provider"
			: "";

	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			login(values)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data.error);
					} else if (data?.success) {
						form.reset();
						setSuccess(data.success);
					} else if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => setError("Something went wrong"));
		});
	};

	return (
		<CardWrapper
			headerLabel="Welcome back?"
			backButtonLabel="Don't have an account?"
			backButtonHref="/auth/register"
			showSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4">
						{showTwoFactor && (
							<>
								<FormField
									control={form.control}
									name="code"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Two Factor Code
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="987654"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
						{!showTwoFactor && (
							<>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="example@example.com"
													type="email"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="password1234"
													type="password"
													disabled={isPending}
												/>
											</FormControl>
											<Button
												size={"sm"}
												variant={"link"}
												asChild
												className="px-0 font-normal"
											>
												<Link href={"/auth/reset"}>
													Forgot password?
												</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
					</div>
					<FormSuccess message={success} />
					<FormError message={error || urlError} />

					<Button
						disabled={isPending}
						className="w-full"
						type="submit"
					>
						{showTwoFactor ? "Confirm" : "Login"}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
