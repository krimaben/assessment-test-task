import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import { RadioGroupElement } from "../types";

interface RadioGroupComponentProps extends RadioGroupElement {
  value: string;
  onChange: (value: string) => void;
  formTouched: boolean;
}

const RadioGroupComponent: React.FC<RadioGroupComponentProps> = ({
  title,
  name,
  choices,
  value,
  onChange,
  formTouched,
}) => {
  return (
    <FormControl component="fieldset" required>
      <FormLabel
        component="legend"
        sx={{ fontWeight: "600", color: "#4B4B4B" }}
      >
        {title}
      </FormLabel>
      <RadioGroup
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {choices.map((choice) => (
          <FormControlLabel
            key={choice}
            value={choice}
            control={<Radio />}
            label={choice}
          />
        ))}
      </RadioGroup>
      {formTouched && !value && (
        <FormHelperText error>This field is required</FormHelperText>
      )}
    </FormControl>
  );
};

export default RadioGroupComponent;
