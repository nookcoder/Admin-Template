import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IDetailTextArea } from "../../model/interface/common/IDetailComponent";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import styles from "../styles/DetailText.module.scss";
import { TextField } from "@mui/material";

const DetailTextArea: React.FunctionComponent<IDetailTextArea> = ({
  defaultValue,
  label,
  state, // React.memo 를 위한 parameter
  slice,
}) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>(defaultValue);

  const executeDispatch = useCallback(
    (payload: string) => {
      dispatch(slice(payload));
    },
    [dispatch, slice],
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const currentValue = event.currentTarget.value;
      setValue(currentValue);
      executeDispatch(currentValue);
    },
    [setValue, executeDispatch],
  );

  useEffect(() => {
    executeDispatch(defaultValue);
  }, [executeDispatch, defaultValue]);

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
        fullWidth={true}
      />
    </div>
  );
};

export default React.memo(DetailTextArea);
