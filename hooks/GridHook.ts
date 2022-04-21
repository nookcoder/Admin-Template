import React from "react";

export function setGridPropsRow(
  data: Array<any> | object,
  setData: React.Dispatch<any>,
) {
  if (data instanceof Array) {
    const newDataArray: Array<any> = [];
    data.map((data, id) => {
      const newData = {
        ...data,
        id: id + 1,
      };
      newDataArray.push(newData);
    });
    setData(newDataArray);
    return;
  }
  alert("서버에러");
}
