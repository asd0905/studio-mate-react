import styled, { keyframes } from "styled-components";

export const SLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    padding: 0 30px;
`;

export const animation = keyframes`
    0& {
        transform:rotate(0deg);
    }
    100% {
        transform:rotate(360deg);
    }
`
export const SLoading = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, .8);
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        fill: #000000;
        display: block;
        width: 50px;
        animation: ${animation} 1.5s linear infinite;
    }
`;

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