import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
`;

export const Tab = styled.section`
    width: 100%;
    /* min-height: 58px; */
    background-color: white;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
`;


export const MatchIcon = styled.a`
    cursor: pointer;

    display: grid;

    grid-template-areas: 
    'indicator game';

    grid-template-columns: 3px auto;

    margin: 5px 0px;
`;

export const Indicator = styled.section`
    grid-area: indicator;
    
    z-index: 10;
    margin-left: -1px;
    background-color: ${props => props.status === "finished" ? "#ED5565" : "white"};
    border-radius: 4px 0 0 4px;
`;

export const Game = styled.section`
    grid-area: game;

    width: 37px;
    height: 37px;
    border-radius: 3px;
    background-color: #ecf1f4;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
        font-family: Poppins;
        font-size: 14px;
        color: #333;
    }
`;