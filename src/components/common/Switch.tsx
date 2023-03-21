import { RefCallBack } from "react-hook-form";
import styled from "styled-components";

const CheckBoxWrapper = styled.div`
  position: relative;
  display: flex;
  align-self: center;
`

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: var(--pimary-marine-blue);
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

export interface SwitchProps extends React.ComponentPropsWithRef<"input"> {
    onChecked: (checked: boolean) => void,
    innerRef: RefCallBack,
  }

export default function Switch({onChecked, innerRef, ...inputProps}: SwitchProps) {
    return <CheckBoxWrapper>
    <CheckBox ref={innerRef} {...inputProps} onChange={(e) => onChecked(e.target.checked)} id="checkbox" type="checkbox" />
    <CheckBoxLabel htmlFor="checkbox" />
</CheckBoxWrapper>
}