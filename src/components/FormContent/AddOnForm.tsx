import { useForm } from "react-hook-form";
import styled from "styled-components";
import deepClone from "../../utils/deepCopy";
import Checkbox from "../common/Checkbox";
import Footer from "../Footer/Footer";
import { BillingPlan, FormAddonValues, FormState, FormStepId, OBillingPlan } from "./Form";
import { useFormContext } from "./FormContext";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1em;
`

export default function AddOnForm() {
    const {form, setForm} = useFormContext()
    const selectedBillingPlan = form.steps[FormStepId.PLAN].values.billingPlan

    const {register, handleSubmit, formState: { errors }} = useForm<FormAddonValues>({
        reValidateMode: 'onChange',
        mode: 'onBlur',
        criteriaMode: "all",
        defaultValues: { ...form.steps[FormStepId.ADD_ON].values as FormAddonValues}
      })
    const onSubmit = (data: FormAddonValues) => {
        setForm((prev: FormState) => {
            const deepCopy = deepClone(prev)
            deepCopy.currentStep = FormStepId.SUMMARY;
            deepCopy.steps[FormStepId.ADD_ON].valid = true
            deepCopy.steps[FormStepId.ADD_ON].values = data
            return deepCopy
        })
    }

    const getAddOnPrice = (addOn: keyof FormAddonValues, billingPlan: BillingPlan) => {
        switch (addOn) {
            case "onlineService": 
                return billingPlan === OBillingPlan.Monthly ? 1 : 10
            case "largerStorage":
            case "customTheme":
                return billingPlan === OBillingPlan.Monthly ? 2 : 20
        }
    }

    const {ref: refOnlineService, ...propsOnlineService} = register("onlineService")
    const {ref: refLargerStorage, ...propsLargerStorage} = register("largerStorage")
    const {ref: refCustomTheme, ...propsCustomTheme} = register("customTheme")

    return <Form onSubmit={handleSubmit(onSubmit)}>
        <Checkbox innerRef={refOnlineService} {...propsOnlineService} labelDescription="Access to multiplayer games" labelTitle="Online service" price={getAddOnPrice("onlineService", selectedBillingPlan)}></Checkbox>
        <Checkbox innerRef={refLargerStorage} {...propsLargerStorage} labelDescription="Extra 1TB of cloud save" labelTitle="Larger storage" price={getAddOnPrice("largerStorage", selectedBillingPlan)}></Checkbox>
        <Checkbox innerRef={refCustomTheme} {...propsCustomTheme} labelDescription="Custom theme on your profile" labelTitle="Customizable profile" price={getAddOnPrice("customTheme", selectedBillingPlan)}></Checkbox>
        <Footer />
        </Form>
}