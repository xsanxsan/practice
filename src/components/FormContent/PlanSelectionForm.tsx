import { useForm } from "react-hook-form"
import styled from "styled-components"
import Footer from "../Footer/Footer"
import {  FormPlanValues, FormState, FormStepId, OPlanType } from "./Form"
import iconArcade from "../../assets/icon-arcade.svg"
import iconAdvanced from "../../assets/icon-advanced.svg"
import iconPro from "../../assets/icon-pro.svg"
import { useState } from "react"
import { useFormContext } from "./FormContext"
import deepClone from "../../utils/deepCopy"
import Switch from "../common/Switch"
import TitleLabel from "../common/TitleLabel"
import DescriptionLabel from "../common/DescriptionLabel"
import Label from "../common/Label"

const InputRadio = styled.input`
position: fixed;
opacity: 0;
pointer-events: none;
`

const Form = styled.form`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* gap: 0.5rem; */
`

const PlanSpan = styled.span`
  display: flex;
  flex-direction: column;
  gap: 1em;
  @media (min-width: 1024px) {
    flex-direction: row;
    > * {
      flex-grow: 1;
    }
  }
  
`
const BillingPlanWrapper = styled.div`
margin-top: 1em;
    display: flex;
    justify-content: space-around;
    background-color: var(--secondary-magnolia);
    padding: 0.5em 0;
    border-radius: 12px;
    border: 2px solid transparent;
    :focus-within {
        border: 2px solid var(--primary-purplish-blue);
    }
`

interface BillingLabelPros {
    selected: boolean
}

const Billinglabel = styled.div`
    color: ${(props: BillingLabelPros) => props.selected ? "var(--secondary-cool-gray)" : "var(--pimary-marine-blue-cool-gray)"} ;
    flex-grow: 1;
    padding: 0 1em;
    font-weight: var(--font-weight-bold);
`

export default function PlanSelectionForm() {
  const {form, setForm} = useFormContext();
  const [billingPlan, setBillingPlan] = useState(form.steps[FormStepId.PLAN].values.billingPlan)
    const {register, handleSubmit, formState: { errors }} = useForm<FormPlanValues>({
        reValidateMode: 'onChange',
        mode: 'onBlur',
        // shouldUseNativeValidation: true
        defaultValues: {
            billingPlan: form.steps[FormStepId.PLAN].values.billingPlan,
            selectedPlan: form.steps[FormStepId.PLAN].values.selectedPlan
        }
      })
      const onSubmit = (data: FormPlanValues) => {
        console.log(data);
        setForm((prev: FormState) => {
            const deepCopy = deepClone(prev)
            deepCopy.currentStep = FormStepId.ADD_ON;
            deepCopy.steps[FormStepId.PLAN].valid = true
            deepCopy.steps[FormStepId.PLAN].values = {
                billingPlan: data.billingPlan,
                selectedPlan: data.selectedPlan
            }
            return deepCopy
        })
      }

      const {ref: billingSwitchRef , ...billingSwitchProps } = {...register("billingPlan")}

    return <Form onSubmit={handleSubmit(onSubmit)}>
      <span>
      <PlanSpan>
    <Label>
    <InputRadio type="radio" {...register("selectedPlan")} id={OPlanType.Arcade} name="selectedPlan" value={OPlanType.Arcade}
             />
             <img src={iconArcade}></img>
             <div>
                <TitleLabel>{OPlanType.Arcade}</TitleLabel>
                <DescriptionLabel>{!billingPlan ? "$9/mo" : "$90/yr\n+2 months free"}</DescriptionLabel>
            </div>
    </Label>
    <Label>
    <InputRadio type="radio" {...register("selectedPlan")} id={OPlanType.Advanced} name="selectedPlan" value={OPlanType.Advanced}
             />
             <img src={iconAdvanced}></img>
             <div>
             <TitleLabel>{OPlanType.Advanced}</TitleLabel>
             <DescriptionLabel>{!billingPlan ? "$12/mo" : "$120/yr\n+2 months free"}</DescriptionLabel>
             </div>
    </Label>

    <Label>
      <InputRadio type="radio" {...register("selectedPlan")} id={OPlanType.Pro} name="selectedPlan" value={OPlanType.Pro}
             />
             <img src={iconPro}></img>
             <span>
             <TitleLabel>{OPlanType.Pro}</TitleLabel>
             <DescriptionLabel>{!billingPlan ? "$15/mo" : "$150/yr\n+2 months free"}</DescriptionLabel>
             </span>
        
    </Label>
    </PlanSpan>
    <BillingPlanWrapper>
    <Billinglabel selected={billingPlan} style={{textAlign: "end"}}>Monthly</Billinglabel>
      <Switch innerRef={billingSwitchRef} onChecked={setBillingPlan} {...billingSwitchProps} />
    <Billinglabel selected={!billingPlan}>Yearly</Billinglabel>
    </BillingPlanWrapper>
    </span>
    <span>
    <Footer />
    </span>
    </Form>
}