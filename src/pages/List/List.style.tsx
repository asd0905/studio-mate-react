import styled from "styled-components";

export const SLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    div {
        display: flex;
        justify-content: center;
        align-items: center; 
        flex-direction: column;
        padding: 20px 0;
        a {
            text-align: center;
        p {
            color: #000000;
        }
    }
    }
`;