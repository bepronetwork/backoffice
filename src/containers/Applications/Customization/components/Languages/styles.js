import styled from 'styled-components';
import { Input, InputGroupText, Label } from 'reactstrap';

export const LanguageCard = styled.section`
    width: 100%;
    min-width: 230px;
    border-radius: 10px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: #fafcff;
    box-shadow: none;
    padding: 15px;
`;

export const LanguageCardContent = styled.section`
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

export const LanguageImage = styled.section`
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

    width: 100%;
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

export const Title = styled.h1`
    font-family: Poppins;
    font-size: 18px;
    font-weight: 600;
`;