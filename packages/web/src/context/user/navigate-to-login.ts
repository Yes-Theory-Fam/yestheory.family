export const navigateToLogin = (customRedirect?: string): void => {
  const lastLocation = window.location.href;
  const domain = window.location.hostname;
  document.cookie = `last_location=${
    customRedirect ?? lastLocation
  };domain=${domain};path=/`;
  window.location.href = '/oauth/discord';
};
