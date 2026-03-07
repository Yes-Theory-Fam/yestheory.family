"use client";

import { create as createNiceModal, useModal } from "@ebay/nice-modal-react";
import { useCallback } from "react";
import { Link } from "ui";
import { Modal, type ModalActionButton } from "ui/client";

const cookieAcceptName = "ytf-cookie-consent";

export const CookieConsentModal = createNiceModal(() => {
	const modal = useModal();

	const acceptCookies = useCallback(async () => {
		const host = location.hostname;
		const expiryDate = new Date();
		expiryDate.setUTCFullYear(expiryDate.getUTCFullYear() + 1);

		await window.cookieStore.set({
			name: cookieAcceptName,
			value: Date.now().toString(),
			expires: expiryDate.getTime(),
			domain: host,
		});

		modal.resolve();
		modal.remove();
	}, [modal]);

	const actions = [
		{
			text: "Decline",
			variant: "outlined",
			onClick: () => (window.location.href = "https://example.com"),
		},
		{
			text: "Accept",
			variant: "outlined",
			onClick: acceptCookies,
		},
	] satisfies ModalActionButton[];

	return (
		<Modal title="Real quick!" actions={actions} ariaTitle="Cookie consent">
			<p>
				This website uses cookies to function. We promise to only use cookies
				that are required to make the website functional!
				<br />
				If you do not agree that cookies are used, you will sadly not be able to
				use this website.
			</p>
			<p>
				Find more information on the use of cookies in our{" "}
				<Link href="/legal/privacy">Privacy Policy</Link>!
			</p>
		</Modal>
	);
});
