import styled from 'styled-components';
import { ButtonBase } from '@material-ui/core';

export const DialogHeader = styled.section`
    width: 100%;
    padding: 10px 20px;
    margin-bottom: 20px;

    display: flex;
    justify-content: flex-end;

`;

export const Title = styled.h1`
    margin-top: 0px;
    font-family: Poppins;
    font-size: 18px;
`;

export const CloseButton = styled(ButtonBase)``;

export const VideoGameIcon = styled.section`
    height: 25px;
    width: 25px;

    margin: 0px 5px;
`;

export const MatchesContainer = styled.div`
    height: 150px;
    width: 100%;

    margin: 10px 5px;
    padding: 5px;

    background-color: #FAFCFF;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
`;

export const Score = styled.section`
    width: 100%;
    min-height: 75px;

    display: grid;

    grid-template-areas: 
    'teamOne date teamTwo';

    grid-template-columns: 40% 20% 40%;
    grid-template-rows: auto;

    align-self: center;
    justify-self: center;
`;

export const TeamOne = styled.section`
    grid-area: teamOne;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    img {
        height: auto;
        width: 35px;
    }

    span {
        margin: 0px 7px;
        font-family: Poppins;
        font-size: 13px;

        &:last-child {
        margin: 0px;
        }
    }
`;

export const TeamTwo = styled.section`
    grid-area: teamTwo;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    img {
        height: auto;
        width: 35px;
    }

    span {
        margin: 0px 7px;
        font-family: Poppins;
        font-size: 13px;

        &:first-child {
        margin: 0px;
        }
    }
`;

export const Result = styled.section`
    grid-area: date;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0px 10px;

    span {
        font-family: Poppins;
        font-size: 14px;
        color: #828282;
    }
`;

export const ResultValue = styled.span`
    margin: 0px 8px;
    font-family: Poppins !important;
    font-size: 18px !important;
    font-weight: 500; 
    color: ${props => props.color} !important;
`;

export const Draw = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 19px;
    border-radius: 3px;
    background-color: #DFE1EC;

    span {
        font-family: Poppins !important;
        font-size: 13px;
        color: #333333 !important;
    }
`;

export const SerieInfo = styled.section`
    grid-area: serieInfo;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;

    span {
        padding-top: 10px;
        color: rgb(95, 110, 133);
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
`;

export const DateInfo = styled.section`
    grid-area: date;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;

export const Time = styled.span`
    font-family: Poppins;
    margin-bottom: 3px;
    font-size: 17px;
    font-weight: 800;
    color: rgb(95, 110, 133);
    padding: 0px 8px;
`;

export const Date = styled.span`
    font-family: Poppins;
    font-size: 13px;
    font-weight: 300;
    color: rgb(95, 110, 133);
`;

export const WonResult = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 22px;
    width: 70px;
    margin: 5px;

    font-family: Poppins;
    font-size: 13px;
    font-weight: 300;
    color: white;

    background-color: ${props => props.isWon ? '#63c965' : '#e6536e' };
    border-radius: 5px;
`;