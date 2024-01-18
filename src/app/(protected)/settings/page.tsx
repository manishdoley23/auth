import { auth, signOut } from "@/auth";

export default async function SettingsPage() {
	const session = await auth();

	return (
		<div className="">
			{JSON.stringify(session)}
			<form
				action={async () => {
					"use server";

					await signOut();
				}}
			>
				<button type="submit">SIGN OUT</button>
			</form>
		</div>
	);
}
