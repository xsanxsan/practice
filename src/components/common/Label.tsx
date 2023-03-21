import styled from "styled-components"

const Label = styled.label`
    :focus {
        border-color: red;
    }
    :has(input:checked) {
        border: 2px solid var(--primary-purplish-blue);
        background-color: var(--secondary-magnolia);
    }
    cursor: pointer;
    align-items: center;
    border: 2px solid var(--secondary-cool-gray);
    padding: 1em;
    display: flex;
    gap: 1em;
    border-radius: 12px;
    
`

export default Label