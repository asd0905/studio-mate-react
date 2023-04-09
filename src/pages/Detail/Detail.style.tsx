import styled from "styled-components";

export const SDetail = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding: 50px 20px;
    h1 {
        font-size: 35px;
    }
    img {
        widht: auto;
        max-width: 100%;
    }
    h3 {
        margin-top: 50px;
    }
`;

export const STypes = styled.div`
    display: flex;
    justify-content: center;
    span {
        display: inline-flex;
        margin: 0 10px;
        border-radius: 5px;
        padding: 0 15px;
        height: 40px;
        justify-content: center;
        align-items: center;
        border: 2px solid #000;
        font-weight: bold;
    }
`;