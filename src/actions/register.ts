"use server";

import * as z from "zod";
import { hash } from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	console.log("vlaes:", values);

	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Failed to parse" };
	}

	const { email, name, password } = validatedFields.data;
	const passHashed = await hash(password, 10);

	const alreadyExists = await getUserByEmail(email);

	if (alreadyExists) {
		return { error: "Email already using" };
	}

	await db.user.create({
		data: {
			name,
			email,
			password: passHashed,
		},
	});

	const verificationToken = await generateVerificationToken(email);
	await sendVerificationEmail(
		verificationToken.token,
		verificationToken.email
	);

	return { success: "Email sent" };
};
