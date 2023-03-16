import { createContext, useContext, useState } from "react";
import { FormState, FORM_STATE } from "./Form";

const FormStateContext = createContext({
    form: FORM_STATE,
    setForm: (
      form: FormState | ((form:FormState) => FormState)
    ) => {},
  });

export function useFormContext() {
    const context = useContext(FormStateContext)
    return context
}

export default FormStateContext