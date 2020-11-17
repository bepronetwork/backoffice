import styled from 'styled-components';

import { Input, InputGroupText, Label, CardBody, Row } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { Button as MaterialButton } from '@material-ui/core';

export const Container = styled(CardBody)`
    margin: 10px;
    padding: 15px;

    background-color: #fafcff !important;
    border-radius: 10px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    box-shadow: none !important;
`;

export const Text = styled.h4`
    font-size: 16px;
`;

export const TabsList = styled(Row)``;

export const TabCard = styled.section`
    width: 100%;
    min-width: 178px;
    height: 362px;
    border-radius: 10px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: #fafcff;
    box-shadow: none;
    padding: 15px;
`;

export const TabCardContent = styled.section`
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

export const TabImage = styled.section`
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
    font-size: 16px;
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

export const RemoveTab = styled(MaterialButton)`
    width: 100%;
    text-transform: none !important;
    background-color: #e6536e !important;
    box-shadow: none !important;
    height: 30px !important;
    color: white !important;
`;

export const AddTabButton = styled(MaterialButton)`
    width: 100%;
    text-transform: none !important;
    background-color: #63c965 !important;
    box-shadow: none !important;
    height: 30px !important;
    color: white !important;
    opacity: ${props => props.disabled ? 0.7 : 1};
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

export const CreateNewSubSection = styled(MaterialButton)`
    width: 220px;

    text-transform: none !important;
    background-color: #63c965 !important;
    box-shadow: none !important;
    color: white !important;
    margin: 0px 5px !important;
`;

export const Title = styled.h1`
    font-family: Poppins;
    font-size: 20px;
    margin: 20px 0px;
`;

export const TabIcon = styled.div`
    width: 30px;

    margin: 0px 5px;
`;

export const TabTitle = styled.div`
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    padding: 5px;

    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
`;

export const Header = styled.section`
    display: flex;
    flex-direction: column;

    padding: 10px;

    > h1 {
        font-family: Poppins;
        font-size: 16px;
        color: #212529;
        font-weight: 500;
    }
`;

export const Content = styled.section`
    display: flex;
    flex-direction: column;
    
    padding: 10px;

    > h1 {
        font-family: Poppins;
        font-size: 16px;
        color: #212529;
        font-weight: 500;
    }
`;

export const SubSectionsList = styled.div``;