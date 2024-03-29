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