import styled from 'styled-components';
import { Input } from 'reactstrap';
import { Button } from '@material-ui/core';

export const InputField = styled(Input)`
    margin: 12px 0px;
    border-radius: 6px;
    border: solid 1.5px rgba(164, 161, 161, 0.35);
    background-color: #fafcff;
    font-family: Poppins;
    font-size: 14px;
    line-height: 24px;
    color: #828282;
`;

export const Actions = styled.section`
    padding-top: 15px;

    > p {
        font-family: Poppins;
        font-size: 13px;
    }
`;

export const CopyButton = styled(Button)`
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