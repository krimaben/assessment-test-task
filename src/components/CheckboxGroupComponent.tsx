import React from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { CheckboxGroupElement } from "../types";

interface CheckboxGroupComponentProps extends CheckboxGroupElement {
  value: string[];
  onChange: (value: string[]) => void;
  formTouched: boolean;
}

const CheckboxGroupComponent: React.FC<CheckboxGroupComponentProps> = ({
  title,
  name,
  choices,
  value,
  onChange,
  formTouched,
}) => {
  const handleToggle = (choice: string) => {
    if (value.includes(choice)) {
      onChange(value.filter((item) => item !== choice));
    } else {
      onChange([...value, choice]);
    }
  };

  return (
    <FormControl component="fieldset" required={true}>
      <FormLabel
        component="legend"
        sx={{ fontWeight: "600", color: "#4B4B4B" }}
      >
        {title}
      </FormLabel>
      <FormGroup>
        {choices.map((choice) => (
          <FormControlLabel
            key={choice}
            control={
              <Checkbox
                checked={value.includes(choice)}
                onChange={() => handleToggle(choice)}
                name={name}
              />
            }
            label={choice}
          />
        ))}
      </FormGroup>
      {formTouched && !value.length && (
        <FormHelperText error>This field is required</FormHelperText>
      )}
    </FormControl>
  );
};

export default CheckboxGroupComponent;
