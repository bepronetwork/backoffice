import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const Container = styled.div`
    display: grid;
    height: 100%;
    width: 100%;

    padding: 5px 8px;

    grid-template-areas: 
    'header'
    'input';

    grid-template-columns: 1fr;
    grid-template-rows: 40% 60%;
`;

export const Header = styled.div`
    grid-area: header;

    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    padding: 0px 8px;

    span {
        font-family: Poppins;
        font-size: 13px;
        color: #646777;
    }
`;

export const Actions = styled.div`
    grid-area: input;

    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    padding: 5px 8px;
`;

export const SaveButton = styled(Button)`
    text-transform: none !important;
    background-color: #7bd389 !important;
    color: white !important;
    box-shadow: none !important;

    height: 23px;

    span {
        font-family: Poppins;
        font-size: 11px;
        font-weight: 300;
    }
`;