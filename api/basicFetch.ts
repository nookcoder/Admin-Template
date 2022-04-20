import React from "react";

export function fetchDataOnBrowser(url: string, setData: React.Dispatch<any>) {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`).then((res) => {
    res.json().then((value) => {
      setData(value);
    });
  });
}
