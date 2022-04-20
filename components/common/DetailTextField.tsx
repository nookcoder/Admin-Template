import React from "react";
import styles from "../styles/DetailTextField.module.scss";
import { TextField } from "@mui/material";

interface IDetailTextField {
  defaultValue: string;
  label: string;
}

const DetailTextField: React.FunctionComponent<IDetailTextField> = ({
  defaultValue,
  label,
}: IDetailTextField): JSX.Element => {
  return (
    <div className={styles.container}>
      <TextField
        id="standard-basic"
        label={label}
        variant="standard"
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default DetailTextField;
