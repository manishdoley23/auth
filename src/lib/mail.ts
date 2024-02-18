import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
	await resend.emails.send({
		from: process.env.LOCAL_EMAIL!,
		to: email,
		subject: "Your 2FA Code! Please confirm",
		html: `<p>Your 2FA Code is ${token}</p>`,
	});
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = `${process.env.LOCAL_ENVIRONMENT}/auth/new-password?token=${token}`;

	await resend.emails.send({
		from: process.env.LOCAL_EMAIL!,
		to: email,
		subject: "Reset your pasword",
		html: `<p>Click to reset password <a href=${resetLink}>here</a></p>`,
	});
};

export const sendVerificationEmail = async (token: string, email: string) => {
	const confirmationLink = `${process.env.LOCAL_ENVIRONMENT}/auth/new-verification?token=${token}`;

	await resend.emails.send({
		from: process.env.LOCAL_EMAIL!,
		to: email,
		subject: "Confirm email",
		html: `<p>Click <a href=${confirmationLink}>here</a></p>`,
	});
};
