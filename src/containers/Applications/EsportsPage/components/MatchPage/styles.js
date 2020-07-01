import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const MatchContainer = styled.div`
    display: flex;
    flex-direction: column;

    height: 100vh;
    width: 100%;
`;

export const MatchSummary = styled.section`
    background-color: #fafcff;
    border: solid 1px rgba(164, 161, 161, 0.35);

    height: 30%;
    width: 100%;
    min-width: 450px;

    display: grid;

    grid-template-areas: 
    'serie'
    'score'
    'info';

    grid-template-columns: 100%;
    grid-template-rows: 58px auto 49px;
`;

export const SerieSummary = styled.section`
    grid-area: serie;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    display: grid;

    grid-template-areas: 
    'matchStatus'
    'serieInfo';

    grid-template-columns: 100%;
    grid-template-rows: 26px auto;
`;

export const MatchStatus = styled.section`
    grid-area: matchStatus;

    display: flex;
    justify-content: center;
    align-self: baseline;

    border-top: 6px solid #ED5565;
`;

export const SerieInfo = styled.section`
    grid-area: serieInfo;

    display: flex;
    justify-content: flex-start;
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

export const MatchFinishedIcon = styled.section`
    height: 20px;
    width: 220px;
    margin-top: -6px;
`;

export const VideoGameIcon = styled.section`
    margin: 0px 8px;
    height: 14px;
    width: 14px;
`;

export const Score = styled.section`
    width: 75%;
    min-height: 100px;
    grid-area: score;
    padding: 10px 20px;

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

export const InfoContainer = styled.section`
    grid-area: info;
    border-top: solid 1px rgba(164, 161, 161, 0.35);

    display: flex;
    justify-content: flex-end;
    align-items: center;

    padding: 5px 20px;

    min-height: 49px;
`;

export const BookButton = styled(Button)`
    text-transform: none !important;
    background-color: #39f !important;
    color: white !important;
    box-shadow: none !important;

    height: 23px;

    position: absolute;

    span {
        font-family: Poppins;
        font-size: 11px;
        font-weight: 300;
    }
`;

export const RemoveBookButton = styled(Button)`
    text-transform: none !important;
    background-color: #e6536e !important;
    color: white !important;
    box-shadow: none !important;

    height: 23px;

    position: absolute;

    span {
        font-family: Poppins;
        font-size: 11px;
        font-weight: 300;
    }
`;