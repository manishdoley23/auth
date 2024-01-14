"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
	console.log("vlaes:", values);

	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Failed to parse" };
	}

	return { success: "Email sent" };
};
