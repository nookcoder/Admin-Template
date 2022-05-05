import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "../styles/DetailText.module.scss";
import { TextField } from "@mui/material";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import {
  setBirthDay,
  setDisplayName,
} from "../../redux/feature/detail/userSlice";
import { setStoryTitle } from "../../redux/feature/detail/donationSlice";
import { IDetailTextField } from "../../model/interface/common/IDetailComponent";
import { setEventTitle } from "../../redux/feature/event/eventSlice";

const DetailTextField: React.FunctionComponent<IDetailTextField> = ({
  defaultValue,
  label,
  state, // React.memo 를 위한 parameter
}) => {
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
        case "사연제목":
          dispatch(setStoryTitle(payload));
          break;
        case "이벤트 제목":
          dispatch(setEventTitle(payload));
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
        fullWidth={true}
      />
    </div>
  );
};

export default React.memo(DetailTextField);
