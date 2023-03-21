import { useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Footer from "../Footer/Footer";
import { useFormContext } from "./FormContext";
import deepClone from "../../utils/deepCopy";
import { FormInfoValues, FormState, FormStepId } from "./Form";
import styled from "styled-components";

const Form = styled.form`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export default function PersonalInfoForm() {
    const {form, setForm} = useFormContext()
    const {register, handleSubmit, formState: { errors }} = useForm<FormInfoValues>({
        reValidateMode: 'onChange',
        mode: 'onBlur',
        criteriaMode: "all",
        defaultValues: { ...form.steps[FormStepId.PERSONAL_INFO].values as FormInfoValues}
        // shouldUseNativeValidation: true
      })
      const onSubmit = (data: FormInfoValues) => {
        console.log(data);
        setForm((prev: FormState) => {
            const deepCopy = deepClone(prev)
            //Move to next step
            deepCopy.currentStep = FormStepId.PLAN;

            deepCopy.steps[FormStepId.PERSONAL_INFO].valid = true
            deepCopy.steps[FormStepId.PERSONAL_INFO].values = {
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber
            }
            return deepCopy
        })
      }

      const {ref: nameRef , ...nameProps } = {...register("name", {required: 'The name field is required', minLength: {value: 3, message: "Your name should be at least 3 characters long"}, pattern: {value: /([A-Z])\w+/, message: 'Should have a capital letter'}})}
      const {ref: emailRef , ...emailProps } = {...register("email", {required: 'The email is required'})}
      const {ref: phoneRef , ...phoneProps } = {...register("phoneNumber", {required: 'The phone number is required'})}
    
    return <Form onSubmit={handleSubmit(onSubmit)}>
        <span>
    <InputField 
        errors={errors.name?.types} 
        innerRef={nameRef} 
        {...nameProps} 
        label={"Name"} 
        placeholder="e.g Stephen King" 
    />
    <InputField 
        errors={errors.email?.types} 
        label={"Email Address"} 
        innerRef={emailRef} 
        {...emailProps} 
        type="email" 
        placeholder="e.g stephenking@lorem.com"
    />
    <InputField 
        errors={errors.phoneNumber?.types} 
        label={"Phone Number"} 
        innerRef={phoneRef} 
        {...phoneProps} 
        placeholder={'e.g +1 234 567 890'} />
        </span>
        <span>
    <Footer />
    </span>
</Form>
}