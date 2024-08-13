import React from "react";
import { TextField, FormHelperText, Typography, Box } from "@mui/material";
import { TextFieldElement } from "../types";

interface TextFieldComponentProps extends TextFieldElement {
  value: string;
  onChange: (value: string) => void;
  formTouched: boolean;
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
  title,
  name,
  value,
  onChange,
  formTouched,
}) => {
  return (
    <Box>
      <Typography sx={{ fontWeight: "600", color: "#4B4B4B", mb: "10px" }}>
        {title}
      </Typography>
      <TextField
        name={name}
        fullWidth
        multiline
        rows={4}
        required
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {formTouched && !value && (
        <FormHelperText error>This field is required</FormHelperText>
      )}
    </Box>
  );
};

export default TextFieldComponent;
