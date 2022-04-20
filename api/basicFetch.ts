export function fetchInBrowser(url: string) {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`);
}
