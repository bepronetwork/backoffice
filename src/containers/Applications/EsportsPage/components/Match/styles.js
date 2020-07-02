import styled from 'styled-components';
import { ButtonBase, Button } from '@material-ui/core';

export const MatchLink = styled(ButtonBase)`
    cursor: pointer;
    padding: 0;
    background: none;
    outline: none;
    border: 0;
`;

export const MatchContainer = styled.div`
    display: grid;

    grid-template-areas: 
    'indicator match teams action'
    'indicator footer footer footer';

    grid-template-columns: 4px calc(25% - 4px) 60% 15%;
    grid-template-rows: 58px 30px;

    width: 100%;
    min-width: 450px;
    height: auto;
    margin: 10px 10px;
    background-color: #fafcff;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    transition: 0.2s;

    &:hover {
        transform: scale(1.005);
    }
`;

export const Indicator = styled.section`
    grid-area: indicator;
    z-index: 10;
    margin-left: -1px;
    background-color: ${props => props.color ? props.color : '#333333'};
    border-radius: 4px 0 0 4px;
`;

export const MatchInfo = styled.section`
    grid-area: match;

    display: grid;

    grid-template-areas: 
    'videogame date info';

    grid-template-columns: 20% 40% 40%;
    grid-template-rows: auto;

    padding: 0px 20px;
    padding-right: 0px;
`;

export const VideogameInfo = styled.section`
    grid-area: videogame;

    display: flex;
    justify-content: center;
    align-items: center;

`;

export const VideoGameIcon = styled.section`
    height: 22px;
    width: 22px;
`;

export const DateInfo = styled.section`
    grid-area: date;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    padding: 0px 8px;

`;

export const Status = styled.section`
    grid-area: info;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding: 0px 5px;
`;

export const Tag = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 81px;
    height: 23px;
    padding: 0;
    margin-right: 10px;
    border-radius: 3px;

    font-family: Poppins;
    font-size: 12px;
    font-weight: 300;

    background-color: ${props => props.backgroundColor};
    color: ${props => props.textColor};
`;

export const Time = styled.span`
    margin-bottom: 2px;
    font-family: Poppins;
    font-size: 12px;
    font-weight: 800;
`;

export const Date = styled.span`
    margin-bottom: 2px;
    font-family: Poppins;
    font-size: 10px;
    font-weight: 600;
`;

export const TeamsInfo = styled.section`
    grid-area: teams;
    
    display: grid;

    grid-template-areas: 
    'teamOne result teamTwo';

    grid-template-columns: 35% 30% 35%;
    grid-template-rows: auto;
`;

export const TeamOne = styled.section`
    grid-area: teamOne;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    img {
        height: auto;
        width: 25px;
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

export const Result = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0px 10px;

    span {
        font-family: Poppins;
        font-size: 13px;
        color: #828282;
    }
`;

export const ResultValue = styled.span`
    margin: 0px 8px;
    font-family: Poppins;
    font-size: 15px;
    font-weight: 800; 
    color: #333;
`;

export const TeamTwo = styled.section`
    grid-area: teamTwo;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    img {
        height: auto;
        width: 25px;
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

export const ActionArea = styled.section`
    grid-area: action;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    padding: 0px 15px;
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

export const Footer = styled.section`
    grid-area: footer;
    display: flex;
    padding: 0px 30px;
    align-items: center;
    justify-content: flex-start;
    border-top: solid 1px rgba(164, 161, 161, 0.35);
`;

export const SerieName = styled.span`
    font-family: Poppins;
    font-size: 13px;
`;