import React from "react";
import { setGridPropsRow } from "../../hooks/GridHook";

export function fetchInApp(url: string, option?: any): Promise<Response> {
  console.log(JSON.stringify(option));
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, ...option);
}

export function fetchWithBaseURL(url: string, option?: any) {
  return fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
    option ? option : {},
  );
}

//  ********** GET ********************
export async function initGridProps(
  url: string,
  accessToken: string,
  setData: React.Dispatch<any>,
) {
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
