import React from "react";

export function setGridPropsRow(
  data: Array<any>,
  setData: React.Dispatch<any>,
) {
  const newDataArray: Array<any> = [];
  data.map((data, id) => {
    const newData = {
      ...data,
      id: id + 1,
    };
    newDataArray.push(newData);
  });
  setData(newDataArray);
}
