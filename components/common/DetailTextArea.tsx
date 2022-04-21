import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IDetailTextArea } from "../../model/interface/common/IDetailComponent";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { setStoryContent } from "../../redux/feature/detail/donationSlice";
import styles from "../styles/DetailText.module.scss";
import { TextField } from "@mui/material";

const DetailTextArea: React.FunctionComponent<IDetailTextArea> = ({
  defaultValue,
  label,
  state, // React.memo 를 위한 parameter
}) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>(defaultValue);

  const executeDispatch = useCallback(
    (type: string, payload: string) => {
      switch (type) {
        case "사연내용":
          dispatch(setStoryContent(payload));
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
    [setValue, executeDispatch, label],
  );

  useEffect(() => {
    executeDispatch(label, defaultValue);
  }, [executeDispatch, label, defaultValue]);

  return (
    <div className={styles.container}>
      <TextField
        id="standard-basic"
        label={label}
        variant={"standard"}
        onChange={onChange}
        value={value}
        minRows={1}
        maxRows={15}
        multiline
      />
    </div>
  );
};

export default React.memo(DetailTextArea);
