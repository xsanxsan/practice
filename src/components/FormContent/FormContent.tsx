import { useContext } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"
import styled from "styled-components"
import { FormStep, FormStepId, formRecords } from "./Form"
import { useFormContext } from "./FormContext"
import PersonalInfoForm from "./PersonalInfoForm"
import PlanSelectionForm from "./PlanSelectionForm"

const FormWrapper = styled.div`
  background-color: var(--secondary-white);
  margin: 0 1em;
  margin-bottom: 1em;
  border-radius: 15px;
  padding: 1em;
  overflow: auto;
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

const renderCurrentFormStep = (currentStep: number, register: UseFormRegister<FieldValues>) => {
    switch (currentStep) {
        case 0: 
        return <PersonalInfoForm register={register}/>
        case 1:
            return <PlanSelectionForm register={register} />
        case 2: 
            return <></>
        case 3:
            return <></>
    }
}
interface Props {
    register: UseFormRegister<FieldValues>
}
export default function FormContent({register}: Props) {
    const { form, setForm } = useFormContext();

    return <FormWrapper>
    <Title>{formRecords[form.currentStep].title}</Title>
    { formRecords[form.currentStep].description && <Paragraph>{formRecords[form.currentStep].description}</Paragraph>}
    { 
        renderCurrentFormStep(form.currentStep, register)
    }
    </FormWrapper>
}