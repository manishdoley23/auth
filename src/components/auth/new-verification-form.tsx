"use client";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const onSubmit = useCallback(async () => {
		if (success || error) return;

		if (!token) {
			setError("Missing token");
			return;
		}

		const data = await newVerification(token);
		setSuccess(data.success);
		setError(data.error);
	}, [token, success, error]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<CardWrapper
			backButtonHref="/auth/login"
			backButtonLabel="Back to login"
			headerLabel="Confirming your verification"
		>
			<div className="w-full flex justify-center items-center">
				{!success && !error && <BeatLoader />}
				<FormError message={error} />
				{!success && <FormSuccess message={success} />}
			</div>
		</CardWrapper>
	);
};
