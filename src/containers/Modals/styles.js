import styled from 'styled-components';
import { Input, InputGroupText } from 'reactstrap';
import { Button as MaterialButton } from '@material-ui/core';

export const WalletIDInput = styled(Input)`
    margin: 12px 0px;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: #fafcff;
    font-family: Poppins;
    font-size: 14px;
    line-height: 24px;
    color: #828282;
`;

export const AddressInput = styled(Input)`
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

export const AddCurrencyButton = styled(MaterialButton)`
    margin: 30px 0px !important;
    height: 40px !important;
    width: 100% !important;
    border-radius: 6px !important;
    background-color: #814c94 !important;
    text-transform: none !important;
    box-shadow: none !important;

    span {
        font-family: Poppins !important;
        font-size: 18px !important;
        font-weight: 400 !important;
        color: #ffffff !important;
    }

    &:disabled {
        opacity: 0.5;
    }

`;

export const ErrorMessage = styled.section`
    display: flex;
    width: 100%;
    justify-content: flex-start;
`;