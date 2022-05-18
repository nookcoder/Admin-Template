import React from "react";
import { FormControlLabel, Radio } from "@mui/material";

type TermsType = {
  label: string;
  agreement: boolean;
};

const TermsRadio: React.FunctionComponent<TermsType> = ({
  label,
  agreement,
}) => {
  return (
    <div>
      <FormControlLabel checked={agreement} control={<Radio />} label={label} />
    </div>
  );
};

export default TermsRadio;
