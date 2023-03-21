import { RefCallBack } from "react-hook-form"
import styled from "styled-components"
import DescriptionLabel from "./DescriptionLabel"
import Label from "./Label"
import TitleLabel from "./TitleLabel"

const InputCheckbox = styled.input`
    text-align-last: center;
    -moz-appearance:none;
	-webkit-appearance:none;
	-o-appearance:none;
	outline: none;
	content: none;	
    :before {
        content: "✓";
        color: transparent !important;
        background: #fef2e0;
        display: block;
        width: 1.5em;
        height: 1.5em;
        border-radius: 3px;
        border: 2px solid var(--secondary-cool-gray);
        -webkit-text-stroke: medium;
    }
    :checked:before {
        background-color:var(--primary-purplish-blue) ;
        color: var(--secondary-white) !important;
    }
`

const PriceSpan = styled.span`
    color: var(--primary-purplish-blue);
    font-size: 0.8rem;
    font-weight: var(--font-weight-bold);
`

const Details = styled.div`
    flex: 1;
`
export interface CheckboxProps extends React.ComponentPropsWithRef<"input"> {
    labelTitle: string;
    labelDescription: string,
    innerRef?: RefCallBack,
    price?: number,
  }

export default function Checkbox({labelTitle, labelDescription, price, innerRef, ...inputProps}: CheckboxProps) {
    return <Label><InputCheckbox ref={innerRef} type={"checkbox"} {...inputProps}/>
    <Details>
        <TitleLabel>{labelTitle}</TitleLabel>
        <DescriptionLabel>{labelDescription}</DescriptionLabel>
    </Details>
    {price && <PriceSpan>+${price}/yr</PriceSpan>}
    </Label>
}