import React, { useEffect } from "react";
import RadioGroupComponent from "./RadioGroupComponent";
import CheckboxGroupComponent from "./CheckboxGroupComponent";
import TextFieldComponent from "./TextFieldComponent";
import BooleanFieldComponent from "./BooleanFieldComponent";
import { FormElement } from "../types";
import { Box } from "@mui/material";

interface FormRendererProps {
  elements: FormElement[];
  formValues: { [key: string]: any };
  handleChange: (name: string, value: any) => void;
  formTouched: boolean;
}

const FormRenderer: React.FC<FormRendererProps> = ({
  formValues,
  handleChange,
  elements,
  formTouched,
}) => {
  const renderElement = (element: FormElement) => {
    switch (element.type) {
      case "radiogroup":
        return (
          <RadioGroupComponent
            key={element.name}
            {...element}
            formTouched={formTouched}
            value={formValues[element.name] || ""}
            onChange={(value) => handleChange(element.name, value)}
          />
        );
      case "checkbox":
        return (
          <CheckboxGroupComponent
            key={element.name}
            {...element}
            formTouched={formTouched}
            value={formValues[element.name] || []}
            onChange={(value) => handleChange(element.name, value)}
          />
        );
      case "text":
        return (
          <TextFieldComponent
            key={element.name}
            {...element}
            formTouched={formTouched}
            value={formValues[element.name] || ""}
            onChange={(value) => handleChange(element.name, value)}
          />
        );
      case "boolean":
        return (
          <BooleanFieldComponent
            key={element.name}
            {...element}
            value={formValues[element.name] || false}
            onChange={(value) => handleChange(element.name, value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      {elements.map((element) => (
        <Box key={element.name} sx={{ mb: 2 }}>
          {renderElement(element)}
        </Box>
      ))}
    </Box>
  );
};

export default FormRenderer;
