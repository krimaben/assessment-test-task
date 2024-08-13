import React from "react";
import {
  FormControl,
  FormControlLabel,
  Switch,
  FormLabel,
} from "@mui/material";
import { BooleanFieldElement } from "../types";

interface BooleanFieldComponentProps extends BooleanFieldElement {
  value: boolean;
  onChange: (value: boolean) => void;
}

const BooleanFieldComponent: React.FC<BooleanFieldComponentProps> = ({
  title,
  name,
  value = false,
  onChange,
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel
        component="legend"
        sx={{ fontWeight: "600", color: "#4B4B4B" }}
      >
        {title}
      </FormLabel>
      <FormControlLabel
        control={
          <Switch
            name={name}
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
          />
        }
        label={"Yes/No"}
      />
    </FormControl>
  );
};

export default BooleanFieldComponent;
