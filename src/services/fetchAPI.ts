export const getJson = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Unexpected HTTP Response');
  }
  return await response.json();
};
