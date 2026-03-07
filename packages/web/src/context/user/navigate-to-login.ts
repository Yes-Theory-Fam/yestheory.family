export const navigateToLogin = async (
	customRedirect?: string,
): Promise<void> => {
	const lastLocation = window.location.href;
	const domain = window.location.hostname;
	await window.cookieStore.set({
		name: "last_location",
		value: customRedirect ?? lastLocation,
		domain: domain,
		path: "/",
	});
	window.location.href = "/oauth/discord";
};
