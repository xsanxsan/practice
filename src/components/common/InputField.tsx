import styled from "styled-components";

const InputField = styled.input`
&:focus {
    outline: none;
    border: 2px solid var(--primary-purplish-blue);
}
width: 100%;
height: 2.5em;
padding: 0 0.5em;
border: 1px solid var(--secondary-cool-gray);
border-radius: 5px;
`

// const InputWrapper = styled.div`
//     padding: 0.5em 0;
// `

// interface InputProps {
//     placeholder?: string
//     label: string
//     type?: React.HTMLInputTypeAttribute
//     pattern?: string
//     required?: boolean
// }

// export default function Input({placeholder, label, type, pattern, required}: InputProps) {
//     return <InputWrapper>
//         <label>{label}     
//         <InputField type={type} id="email"
//        pattern={pattern} required={required} placeholder={placeholder} /></label>
//     </InputWrapper>
// }

export default InputField