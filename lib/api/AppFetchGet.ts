//  ********** GET ********************
import React from "react";
import { setGridPropsRow } from "../../hooks/GridHook";
import { fetchWithBaseURL } from "./AppFetch";

export async function initGridProps(
  url: string,
  accessToken: string,
  setData: React.Dispatch<any>,
) {
  console.log(accessToken);
  const res = await fetchWithBaseURL(url, {
    header: {
      "X-AUTH-TOKEN": `${accessToken}`,
    },
  });
  const data = await res.json();
  await setGridPropsRow([...data], setData);
}

export async function initDetailInformation(
  url: string,
  accessToken: string,
  setData: React.Dispatch<any>,
) {
  const res = await fetchWithBaseURL(`${url}`, {
    header: {
      "X-AUTH-TOKEN": `${accessToken}`,
    },
  });

  const data = await res.json();
  setData(data);
  return;
}

export function fetchData(url: string, setData: React.Dispatch<any>) {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`).then((res) => {
    res.json().then((value) => {
      setData(value);
    });
  });
}
