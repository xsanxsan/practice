import { useContext } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"
import styled from "styled-components"
import AddOnForm from "./AddOnForm"
import { FormStep, FormStepId, formRecords } from "./Form"
import { useFormContext } from "./FormContext"
import PersonalInfoForm from "./PersonalInfoForm"
import PlanSelectionForm from "./PlanSelectionForm"
import Summary from "./Summary"

const FormWrapper = styled.div`
  background-color: var(--secondary-white);
  margin: 0 1em;
  margin-bottom: 1em;
  border-radius: 15px;
  padding: 1em;
  overflow: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
    color: var(--pimary-marine-blue);
    font-weight: var(--font-weight-bold);
    font-size: 1.75em;
    padding-bottom: 0.75rem;
`

const Paragraph = styled.p`
    color: var(--secondary-cool-gray);
    padding-bottom: 0.75rem;
`

const renderCurrentFormStep = (currentStep: number) => {
    switch (currentStep) {
        case FormStepId.PERSONAL_INFO: 
        return <PersonalInfoForm />
        case FormStepId.PLAN:
            return <PlanSelectionForm />
        case FormStepId.ADD_ON: 
            return <AddOnForm />
        case FormStepId.SUMMARY:
            return <Summary />
    }
}

export default function FormContent() {
    const { form, setForm } = useFormContext();

    return <FormWrapper>
    <Title>{formRecords[form.currentStep].title}</Title>
    { formRecords[form.currentStep].description && <Paragraph>{formRecords[form.currentStep].description}</Paragraph>}
    { 
        renderCurrentFormStep(form.currentStep)
    }
    </FormWrapper>
}