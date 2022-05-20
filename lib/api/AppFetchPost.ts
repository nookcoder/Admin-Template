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
  const keyValue =
    `${Math.random()}${process.env.NEXT_PUBLIC_SLACK_KEY_VALUE}` +
    Math.random();
  const authCode = window.btoa(keyValue);
  setAuthCode(authCode);
  fetch(`${process.env.NEXT_PUBLIC_SLACK_WEB_HOOKS}`, {
    body: JSON.stringify({
      text: `${authCode}`,
    }),
    method: "POST",
  })
    .then((res) => {
      alert("인증 토큰이 발행되었습니다. 확인해주세요");
    })
    .catch((err) => {
      console.log(err);
    });
}
