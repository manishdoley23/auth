import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
	return (
		<CardWrapper
			backButtonHref="/auth/login"
			backButtonLabel="Back to login"
			headerLabel="Something went wrong!"
		>
			<div className="w-full flex justify-center">
				<ExclamationTriangleIcon className="text-destructive" />
			</div>
		</CardWrapper>
	);
};
