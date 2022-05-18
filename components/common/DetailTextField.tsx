import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "../styles/DetailText.module.scss";
import { TextField } from "@mui/material";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { IDetailTextField } from "../../model/interface/common/IDetailComponent";

const DetailTextField: React.FunctionComponent<IDetailTextField> = ({
  defaultValue,
  label,
  state, // React.memo 를 위한 parameter
  slice,
  isDisabled,
  formatFunction,
}) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>(defaultValue);
  const executeDispatch = useCallback(
    (payload: string) => {
      if (slice) {
        dispatch(slice(payload));
      }
    },
    [dispatch, slice],
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const currentValue = event.currentTarget.value;
      setValue(currentValue);
      executeDispatch(currentValue);
    },
    [executeDispatch],
  );

  useEffect(() => {
    if (formatFunction) {
      const formatString = formatFunction(defaultValue);
      setValue(formatString);
    }
    executeDispatch(defaultValue);
  }, [formatFunction, defaultValue, executeDispatch]);

  return (
    <div className={styles.container}>
      <TextField
        id="standard-basic"
        label={label}
        variant="standard"
        onChange={onChange}
        value={value}
        fullWidth={true}
        disabled={isDisabled}
      />
    </div>
  );
};

export default React.memo(DetailTextField);
