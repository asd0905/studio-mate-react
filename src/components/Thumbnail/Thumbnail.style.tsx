import styled from "styled-components";

export const SThumnail = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; 
    flex-direction: column;
    padding: 20px 0;
    max-height: 300px;
    div {
        display: inline-flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        a {
            text-align: center;
        }
        p {
            color: #000000;
            line-height: 30px;
        }
        img {
            display: block;
            max-width: 100%;
            width: auto;
            max-height: calc(100% - 40px);
            margin-bottom: 10px;
        }
    }
`;