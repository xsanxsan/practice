import { ComponentProps, ComponentPropsWithRef } from "react";
import AnimateHeight from "react-animate-height";
import { FieldError, FieldErrorsImpl, Merge, MultipleFieldErrors, RefCallBack } from "react-hook-form";
import styled, { keyframes } from "styled-components";

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

const errorAnimation = keyframes`
 0% { margin-left: -10px; opacity: 0}
 100% { margin-left: 0px; opacity: 1 }
 `
 
const Errors = styled.div`
    color: red;
    font-size: 0.75rem;
    animation-name: ${errorAnimation};
    animation-duration: 0.5s;
    animation-iteration-count: 1;
`

export interface InputProps extends React.ComponentPropsWithRef<"input"> {
    errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | MultipleFieldErrors | undefined;
    label: string,
    innerRef: RefCallBack,
  }

export default function Input({ errors, label, innerRef, ...inputProps}: InputProps) {
    const getHeight = (errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | MultipleFieldErrors | undefined) => {
        if (errors){
            return  Object.values(errors).length * 18
        }
        return 0
      }
      
    return <label>{label}    
    <InputField ref={innerRef} {...inputProps}/>
    <AnimateHeight
    id="example-panel"
    duration={500}
    height={getHeight(errors)} // see props documentation below
  >
    {errors && Object.values(errors).map(value => <Errors key={value}>{value}</Errors>)}
  </AnimateHeight>
    </label>
}