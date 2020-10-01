import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
`;

export const Tab = styled.div`
    width: 100%;
    /* min-height: 58px; */
    background-color: white;

    display: grid;

    grid-template-areas: 
    'indicator game winner';

    grid-template-columns: 3px calc(30% - 3px) 70%;
    grid-template-rows: 20px;

    margin-bottom: 15px;
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

    display: flex;
    justify-content: center;
    align-items: center;

    span {
        font-family: Poppins;
        font-size: 14px;
        font-weight: 400;
        color: #5f6e85;
    }
`;

export const Winner = styled.section`
    grid-area: winner;

    display: grid;

    grid-template-areas: 
    'icon team';

    grid-template-columns: 20px auto;
    grid-template-rows: auto;

`;

export const Icon = styled.section`
    grid-area: icon;

    display: flex;
    justify-content: center;
`;

export const TrophyIcon = styled.section`
    height: 8px;
    width: 8px;
`;

export const Team = styled.section`
    grid-area: team;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
        font-family: Poppins;
        color: #c8c8c8;
        font-size: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
