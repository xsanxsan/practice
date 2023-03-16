import { useRef } from "react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import InputField from "../common/InputField";
import StyledButton from "../common/StyledButton";
import Footer from "../Footer/Footer";

interface Props {
    register: UseFormRegister<FieldValues>
}
export default function PersonalInfoForm({register}: Props) {
    
    return <>
        <label>Name    
        <InputField {...register("name", {required: true})} placeholder="e.g Stephen King" />
    </label>
    <label>Email Address    
        <InputField {...register("email", {required: true})} type="email" placeholder="e.g stephenking@lorem.com"/>
    </label>
    <label>Phone Number    
        <InputField {...register("phoneNumber", {required: true})} placeholder={'e.g +1 234 567 890'} />
    </label>
    <Footer />
    </>
}