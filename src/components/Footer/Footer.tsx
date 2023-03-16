import styled from "styled-components"
import StyledButton from "../common/StyledButton"
import { useFormContext } from "../FormContent/FormContext"

const FooterWrapper = styled.footer`
  border: 1px solid rebeccapurple;
  height: 5em;
  background-color: var(--white);
  display: flex;
  align-items: center;
    justify-content: space-between;
    padding: 0 1em;
`

export default function Footer() {
    const {form, setForm} = useFormContext()

    const handleNext = () => {
        if (form.currentStep < Object.keys(form.steps).length - 1) 
        setForm((prev) => {return {...prev, currentStep: prev.currentStep+1}})
    }

    const handlePrev = () => {
        setForm((prev) => {return {...prev, currentStep: prev.currentStep-1}})
    }

    return <FooterWrapper>
        <StyledButton onClick={handlePrev} disabled={form.currentStep === 0}>Back</StyledButton>
        <StyledButton primary type={"submit"} disabled={form.currentStep === Object.keys(form.steps).length - 1}>Next Step</StyledButton>
    </FooterWrapper>
}