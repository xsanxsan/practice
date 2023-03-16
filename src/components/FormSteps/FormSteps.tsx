import { useContext } from "react"
import styled from "styled-components"
import { FormStep, form, FormStepId, FormStepState, formRecords } from "../FormContent/Form"
import FormStateContext, { useFormContext } from "../FormContent/FormContext"
import { entries } from "../utils/typeWrappers"
interface StepsProps {
    active?: boolean
}

const StepsWrapper = styled.div`
    padding: 1.5em 0;
    display: flex;
    justify-content: center;
    gap: 1.5em;
`

const Steps = styled.button`
    :hover{
    cursor: pointer;
    border-color: ${(props: StepsProps) => props.active  ? 'var(--primary-light-blue)' : 'var(--pimary-marine-blue)'};
    }
    font-weight: var(--font-weight-bold);
    background-color: ${(props: StepsProps) => props.active  ? 'var(--primary-light-blue)' : 'unset'};
    border: 1px solid ${(props: StepsProps) => props.active  ? 'var(--primary-light-blue)' : 'var(--secondary-white)'};
    color: ${(props: StepsProps) => props.active  ? 'black' : 'var(--secondary-white);'};
    z-index: 2;
    height: 2.5em;
    width: 2.5em;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function FormSteps() {

    const { form, setForm } = useFormContext();
    
    const handleClickStep = (clikedStep: number) => {
      setForm((prev) => {return {...prev, currentStep: clikedStep}})
    }

    return <StepsWrapper>
      {
        (Object.entries(form.steps)).map((value)=> <Steps key={value[0]} onClick={() => handleClickStep(parseInt(value[0]))} active={parseInt(value[0]) === form.currentStep}>
        {formRecords[parseInt(value[0])].label}
      </Steps>)
      }
      </StepsWrapper>
}