export interface RadioGroupElement {
  type: "radiogroup";
  name: string;
  title: string;
  choices: string[];
}

export interface CheckboxGroupElement {
  type: "checkbox";
  name: string;
  title: string;
  choices: string[];
}

export interface TextFieldElement {
  type: "text";
  name: string;
  title: string;
  isRequired: boolean;
}

export interface BooleanFieldElement {
  type: "boolean";
  name: string;
  title: string;
  labelTrue: string;
  labelFalse: string;
}

export type FormElement =
  | RadioGroupElement
  | CheckboxGroupElement
  | TextFieldElement
  | BooleanFieldElement;

export interface Page {
  name: string;
  elements: FormElement[];
}

export interface FormData {
  pages: Page[];
}

export interface Assessment {
  name: string;
  slug: string;
  intro: { json: any };
  questions: {
    pages: Page[];
  };
  resultsIntro: { json: any };
}
