import styled from "styled-components";
import deepClone from "../../utils/deepCopy";
import { entries } from "../utils/typeWrappers";
import { BillingPlan, calculateTotalPrice, FormAddonValues, FormPlanValues, FormStepId, OBillingPlan } from "./Form"
import { useFormContext } from "./FormContext"

const BillWrapper = styled.div`
    background-color: var(--secondary-magnolia);
    padding: 1rem;
    border-radius: 12px;
`

const PlanTypeWrapper = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--secondary-cool-gray);
    padding-bottom: 0.5rem;
`

const FlexWrapper = styled.div`
    display: flex;
    color: var(--secondary-cool-gray);
    align-items: center;
    margin: 0.5rem 0;
`

const PlanType = styled.div`
    color: var(--pimary-marine-blue);
    font-weight: var(--font-weight-bold);
`

const PlanTypeLink = styled.a`
    color: var(--secondary-cool-gray);
    text-decoration: underline;
`

const PlanWrapper = styled.span`
    flex-grow: 1;
`

export default function Summary() {
    const {form, setForm} = useFormContext()

    const selectedBillingPlan = form.steps[FormStepId.PLAN].values.billingPlan;

    const getAddOnLabel = (addOn: keyof FormAddonValues) => {
        switch (addOn) {
            case "onlineService": 
                return "Online service"
            case "largerStorage":
                return "Larger storage"
            case "customTheme":
                return "Customizable profile"
        }
    }

    const getAddOnPrice = (addOn: keyof FormAddonValues, billingPlan: BillingPlan) => {
        switch (addOn) {
            case "onlineService": 
                return billingPlan === OBillingPlan.Monthly ? '+1$/mo' : '+10$/yr'
            case "largerStorage":
            case "customTheme":
                return billingPlan === OBillingPlan.Monthly ? '+2$/mo' : '+20/yr'
        }
    }

    const handleClickChangePlan = () => {
        console.log("here")
        setForm(prev => {
            const deepCopy = deepClone(prev)
            deepCopy.currentStep = FormStepId.PLAN;
            return deepCopy
        })
    }

    return <div>
        <BillWrapper>
        <PlanTypeWrapper>
            <PlanWrapper>
                <PlanType>{form.steps[FormStepId.PLAN].values.selectedPlan} ({form.steps[FormStepId.PLAN].values.billingPlan === OBillingPlan.Monthly ? 'Monthly' : 'Yearly'})</PlanType> 
                <PlanTypeLink onClick={handleClickChangePlan}>Change</PlanTypeLink>
            </PlanWrapper>
            <PlanType>
                $9/mo
            </PlanType>
        </PlanTypeWrapper>
        
        <div>
            {(entries(form.steps[FormStepId.ADD_ON].values))
            .filter((value) => value[1])
            .map(
            (value) => {
                return <FlexWrapper><PlanWrapper>{getAddOnLabel(value[0])}</PlanWrapper><span>{getAddOnPrice(value[0], selectedBillingPlan)}</span></FlexWrapper>
            }
        )}
        </div>
        </BillWrapper>
        <FlexWrapper style={{padding: '1rem'}}><span style={{flexGrow: 1}}>Total (per {selectedBillingPlan === OBillingPlan.Monthly ? 'Month' : 'Year'})</span> <span>+${calculateTotalPrice(form)}</span></FlexWrapper>
    </div>
}