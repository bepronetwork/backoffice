import styled from 'styled-components'

export const ConvertContainer = styled.div`
    padding: 25px;
    width: 300px;
`;

export const EsportsNotEnable = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    > div {
        &.spanGroup {
            display: flex;
            flex-direction: column;

            > span {
                font-size: 17px;
                font-weight: 500;
                color: #814c94;
            }
        }
    }

    > img {
        height: 70px;
        width: 70px;

        margin: 0px 10px;
    }
`;