import styled from "styled-components"
import { DesktopWrapper } from "../common/DesktopWrapper"
import { formRecords } from "../FormContent/Form"
import { useFormContext } from "../FormContent/FormContext"
interface StepsProps {
    active?: boolean
}

const StepsWrapper = styled.div`
    padding: 1.5em 0;
    display: flex;
    justify-content: center;
    gap: 1.5em;
    @media (min-width: 1024px) {
    flex-direction: column;
  }
`

const StepSpan = styled.span`
  text-transform: uppercase;
  font-size: 0.80rem;
  color: var(--secondary-light-gray);
`

const AdditionalTextSpan = styled.span`
  color: var(--secondary-white);
  text-transform: uppercase;
  font-weight: var(--font-weight-bold);
  letter-spacing: .15rem;
`

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Step = styled.button`
    :disabled {
      /* color: var(--secondary-light-gray); */
      background-color: var(--secondary-light-gray);
      border-color: var(--secondary-light-gray);
      :hover {
        cursor: no-drop;
      }
    }
    :not(:disabled) {
      :hover {
        border-color: var(--pimary-marine-blue);
      }
    }
    :hover{
      cursor: pointer;
      
    }
    font-weight: var(--font-weight-bold);
    background-color: ${(props: StepsProps) => props.active  ? 'var(--primary-light-blue)' : 'unset'};
    border: 2px solid ${(props: StepsProps) => props.active  ? 'var(--primary-light-blue)' : 'var(--secondary-white)'};
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

    const isStepDisabled = (step: number) => {
      if (step === 0) return false
      return !Object.entries(form.steps)[step - 1][1].valid
    }

    return <StepsWrapper>
      {
        (Object.entries(form.steps)).map((value)=> <StepWrapper><Step disabled={isStepDisabled(parseInt(value[0]))} key={value[0]} onClick={() => handleClickStep(parseInt(value[0]))} active={parseInt(value[0]) === form.currentStep}>
        {formRecords[parseInt(value[0])].label}
      </Step>
      <DesktopWrapper>
        <StepSpan>Step {formRecords[parseInt(value[0])].label}</StepSpan><br/>
        <AdditionalTextSpan>{formRecords[parseInt(value[0])].additionalText}</AdditionalTextSpan>
      </DesktopWrapper>
      </StepWrapper>)
      }
      </StepsWrapper>
}