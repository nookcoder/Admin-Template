import axios from "axios";

export const appAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

export function appAxiosPost(url: string, body: any, accessToken: string) {
  return appAxios.post(url, body, {
    headers: {
      "X-AUTH-TOKEN": `${accessToken}`,
    },
  });
}

export function appAxiosGet(url: string, accessToken: string) {
  return appAxios.get(url, {
    headers: {
      "X-AUTH-TOKEN": `${accessToken}`,
    },
  });
}

export function appAxiosPatch(url: string, formData: any, accessToken: string) {
  return appAxios.patch(url, formData, {
    headers: {
      "X-AUTH-TOKEN": `${accessToken}`,
    },
  });
}
