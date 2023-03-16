import { FieldValues, UseFormRegister } from "react-hook-form"
import InputField from "../common/InputField"

interface Props {
    register: UseFormRegister<FieldValues>
}
export default function PlanSelectionForm({register}: Props) {
    return <>
    <label>Name    
    <InputField {...register("name2", {required: true})} placeholder="e.g Stephen King" />
</label>
<label>Email Address    
    <InputField {...register("email2", {required: true})} type="email" placeholder="e.g stephenking@lorem.com"/>
</label>
<label>Phone Number    
    <InputField {...register("phoneNumber3", {required: true})} placeholder={'e.g +1 234 567 890'} />
</label>
</>
}