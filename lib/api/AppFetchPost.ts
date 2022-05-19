import { fetchWithBaseURL } from "./AppFetch";
import { API } from "../../util/constant";
import React from "react";

export function checkAccessAuthorization(accessToken: string) {
  return fetchWithBaseURL(API.POST.HEKARI, {
    method: "POST",
    body: "",
    headers: {
      "X-AUTH-TOKEN": `${accessToken}`,
    },
  });
}

export function sendAuthCodeToSlack(setAuthCode: React.Dispatch<string>) {
  const authCode = window.btoa(`${process.env.NEXT_PUBLIC_SLACK_KEY_VALUE}`);
  setAuthCode(authCode);
  fetch(`${process.env.NEXT_PUBLIC_SLACK_WEB_HOOKS}`, {
    body: JSON.stringify({
      text: `${authCode}`,
    }),
    method: "POST",
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
