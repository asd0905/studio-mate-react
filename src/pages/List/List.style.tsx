import styled from "styled-components";

export const SForm = styled.form`
    padding: 10px;
    display: flex;
    input {
        width: 100%;
        padding: 0 20px;
    }
    button {
        background-color: #ffffff;
        width: 50px;
        height: 50px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flext: 0 0 auto;
        border-left: 0;
        svg {
            padding: 0;
            width: 20px; 
        }
    }
    p {

    }
`;

export const SError = styled.p`
    padding: 0 20px;
    font-size: 14px;
    color: red;
`;