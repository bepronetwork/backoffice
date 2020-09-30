import styled from 'styled-components';
import { NavLink, Input, InputGroupText } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { Button as MaterialButton } from '@material-ui/core';

export const StyledNavLink = styled(NavLink)`
    /* margin: 0px 20px; */
    cursor: pointer;

    span {
        font-family: Poppins;
        font-size: 18px;
        font-weight: 400;
        color: #564f4f;
    }

    &.active {
        border-left: none;
        background-color: #814c94 !important;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        padding: 8px 40px;

        span {
            font-family: Poppins;
            font-size: 18px;
            font-weight: 400;
            color: #ffffff;
        }
    }

`;

export const TabsContainer = styled.section`
    height: 100%;
    width: 100%;
`;

export const TabContainer = styled.section`
    height: 100%;
    width: 100%;
    margin-top: 7px;
    padding: 30px 0px;
    border-top: solid 1px rgba(164, 161, 161, 0.35); 
`;

export const DepositContent = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding-top: 50px;

`;

export const DepositAddress = styled.section`
    display: flex;
    height: 40px;
    width: 100%;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: #fafcff;
    border-radius: 6px;
    justify-content: space-between;
    align-items: center;
    padding-left: 25px;

    h6 {
        font-family: Poppins;
        font-size: 14px;
        color: #a4a1a1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const CopyButton = styled(MaterialButton)`
    margin: 0px !important;
    margin-left: 10px !important;
    height: 100% !important;
    border-radius: 6px !important;
    background-color: #814c94 !important;
    min-width: 100px !important;
    text-transform: none !important;
    box-shadow: none !important;

    font-family: Poppins !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    color: #ffffff !important;
    overflow: hidden !important;
`;

export const WithdrawContent = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding-top: 50px;

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

export const WithdrawButton = styled(MaterialButton)`
    margin: 42px 0px !important;
    margin-bottom: 10px !important;
    height: 50px !important;
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

`;

export const ErrorMessage = styled.section`
    display: flex;
    width: 100%;
    justify-content: flex-start;

`;