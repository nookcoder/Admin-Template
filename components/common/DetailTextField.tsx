import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "../styles/DetailTextField.module.scss";
import { TextField } from "@mui/material";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  setBirthDay,
  setDisplayName,
} from "../../redux/feature/detailUser/detailUserSlice";

interface IDetailTextField {
  defaultValue: string;
  label: string;
  state: string;
}

const DetailTextField: React.FunctionComponent<IDetailTextField> = ({
  defaultValue,
  label,
}: IDetailTextField): JSX.Element => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>(defaultValue);
  const executeDispatch = useCallback(
    (type: string, payload: string) => {
      switch (type) {
        case "닉네임":
          dispatch(setDisplayName(payload));
          break;
        case "생년월일":
          dispatch(setBirthDay(payload));
          break;
      }
    },
    [dispatch],
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const currentValue = event.currentTarget.value;
      setValue(currentValue);
      executeDispatch(label, currentValue);
    },
    [label, executeDispatch],
  );

  useEffect(() => {
    executeDispatch(label, defaultValue);
  }, [label, defaultValue, executeDispatch]);

  return (
    <div className={styles.container}>
      <TextField
        id="standard-basic"
        label={label}
        variant="standard"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default React.memo(DetailTextField);
