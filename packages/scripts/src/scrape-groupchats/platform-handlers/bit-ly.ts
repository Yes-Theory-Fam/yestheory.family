export const handleBitLy = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (response.status === 200 && response.redirected) {
    return response.url;
  }

  console.error(
    `Failed following bit.ly: ${url}; status was ${response.status}, skipping...`,
  );

  return url;
};
