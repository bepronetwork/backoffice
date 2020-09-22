import styled from 'styled-components';
import { Input, InputGroupText, Label } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { Button as MaterialButton } from '@material-ui/core';

export const LinkCard = styled.section`
    width: 100%;
    min-width: 230px;
    height: 362px;
    border-radius: 10px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: #fafcff;
    box-shadow: none;
    padding: 15px;
`;

export const LinkCardContent = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-family: Poppins;
        font-size: 20px;
    }

    span {
        font-display: Poppins;
        font-size: 14px;
    }

`;

export const LinkImage = styled.section`
    height: 50%;
    width: 60%;
    padding: 5px;
    border: solid 2px rgba(164, 161, 161, 0.35);
    border-radius: 6px;
    border-style: dashed;
    margin-bottom: 10px;
`;


export const InputField = styled(Input)`
    margin: 12px 0px;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: #FFFFFF;
    font-family: Poppins;
    font-size: 14px;
    line-height: 24px;
    color: #828282;
    margin-top: 0px;
`;

export const InputLabel = styled(Label)`
    font-size: 14px;
    font-family: Poppins;
`;

export const InputAddOn = styled(InputGroupText)`
    margin: 12px 0px;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: #FFFFFF;
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

export const RemoveLink = styled(MaterialButton)`
    width: 100%;
    text-transform: none !important;
    background-color: #e6536e !important;
    box-shadow: none !important;
    height: 30px !important;
    color: white !important;
`;

export const AddLinkButton = styled(MaterialButton)`
    width: 100%;
    text-transform: none !important;
    background-color: #63c965 !important;
    box-shadow: none !important;
    height: 30px !important;
    color: white !important;
`;


export const Yes = styled(MaterialButton)`
    width: 30%;
    text-transform: none !important;
    background-color: #63c965 !important;
    box-shadow: none !important;
    height: 30px !important;
    color: white !important;
    margin: 0px 5px !important;
`;

export const Cancel = styled(MaterialButton)`
    width: 30%;
    text-transform: none !important;
    background-color: #e6536e !important;
    box-shadow: none !important;
    height: 30px !important;
    color: white !important;
    margin: 0px 5px !important;
`;

export const Title = styled.h1`
    font-family: Poppins;
    font-size: 18px;
    font-weight: 600;
`;