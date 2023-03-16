import styled from "styled-components";

interface ButtonProps {
    primary?: boolean
}

const StyledButton = styled.button`
    :hover{
        cursor: pointer;
    }
    background-color: ${(props: ButtonProps) => props.primary ? 'var(--pimary-marine-blue)' : 'unset'};
    border: none;
    border-radius: 5px;
    color: ${(props: ButtonProps) => props.primary ? 'var(--secondary-white)' : 'var(--secondary-cool-gray)'};
    font-weight: var(--font-weight-medium);
    padding: 0.75em;
    height: min-content;
`

export default StyledButton