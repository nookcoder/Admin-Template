// Default App Fetch
export function fetchWithBaseURL(url: string, option?: any) {
  return fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
    option ? option : {},
  );
}
