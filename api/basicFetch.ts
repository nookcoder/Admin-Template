import React from "react";
import IUser from "../model/interface/user/IUser";

export function fetchWithBaseURL(url: string) {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`);
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
