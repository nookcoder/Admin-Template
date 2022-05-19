import { fetchWithBaseURL } from "./AppFetch";
import { API } from "../../util/constant";

export function checkAccessAuthorization(accessToken: string) {
  return fetchWithBaseURL(API.POST.HEKARI, {
    method: "POST",
    body: "",
    headers: {
      "X-AUTH-TOKEN": `${accessToken}`,
    },
  });
}
