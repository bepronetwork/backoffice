import styled from 'styled-components';
import { ButtonBase } from '@material-ui/core';
import { Input, InputGroupText } from 'reactstrap';
import { Button } from 'react-bootstrap';

export const DialogHeader = styled.section`
    width: 100%;
    height: 30px;
    padding: 20px 10px;

    display: flex;
    justify-content: flex-end;

`;

export const CloseButton = styled(ButtonBase)``;

export const Container = styled.section` 
    display: flex;
    flex-direction: column;
    padding: 15px;
`;

export const CardHeader = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 30%;

    h1 {
        margin-bottom: 10px;
        font-family: Poppins;
        font-size: 16px;
    }
`;

export const CardContent = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 30%;

    h1 {
        font-family: Poppins;
        font-size: 16px;
    }
`;

export const AmountInput = styled(Input)`
    margin: 12px 0px;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: #fafcff;
    font-family: Poppins;
    font-size: 14px;
    line-height: 24px;
    color: #828282;
`;

export const ReasonInput = styled(Input)`
    margin: 12px 0px;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: #fafcff;
    font-family: Poppins;
    font-size: 14px;
    line-height: 24px;
    color: #828282;
`;

export const InputAddOn = styled(InputGroupText)`
    margin: 12px 0px;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: #fafcff;
    height: 35px;
    border-right: none;

    span {
        font-family: Poppins;
        font-size: 14px;
        line-height: 24px;
        color: #828282;
        margin-right: 10px;
    }
`;

export const ConfirmButton = styled(Button)`
    margin: 42px 0px;
    margin-bottom: 10px;
    height: 50px;
    width: 100%;
    border-radius: 6px;
    background-color: #814c94;

    &:disabled {
        pointer-events: none;
    }

    &.btn.icon {
        padding-top: 8px;   
    }

    span {
        font-family: Poppins;
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
    }

`;