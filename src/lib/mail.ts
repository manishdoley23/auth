import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (token: string, email: string) => {
	const confirmationLink = `http://localhost:3001/auth/new-verification?token=${token}`;

	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Confirm email",
		html: `<p>Click <a href=${confirmationLink}>here</a></p>`,
	});
};
