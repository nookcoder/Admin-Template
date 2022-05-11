import React from "react";
import IUser from "../../model/interface/user/IUser";
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

export function fetchData(url: string, setData: React.Dispatch<any>) {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`).then((res) => {
    res.json().then((value) => {
      setData(value);
    });
  });
}

export function fetchInitUserData(
  url: string,
  setData: React.Dispatch<IUser[]>,
) {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`).then((res) => {
    res.json().then((value: IUser[]) => {
      const initData: Array<IUser> = [];
      value.map((data, index) => {
        const user = {
          ...data,
          id: index,
        };
        initData.push(user);
      });
      setData(initData);
    });
  });
}
