import styled from 'styled-components';
import { CardBody, Input } from 'reactstrap';
import { Button } from '@material-ui/core';

export const Container = styled(CardBody)`
    width: 307px;

    margin: 10px;
    padding: 20px;

    border-radius: 10px;
    border: solid 1px rgba(164, 161, 161, 0.35) !important;
    background-color: #fafcff !important;
    box-shadow: none !important;
`;

export const EditImage = styled.section`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const Image = styled.img`
    width: 85px;

    padding: 10px 5px;
`;

export const Name = styled.span`
    font-family: Poppins;
    font-size: 20px;
`;

export const UploadButton = styled(Button)`
    height: 25px !important;

    text-transform: none !important;
    background-color: #63c965 !important;
    box-shadow: none !important;

    p {
        font-size: 12px !important;
        color: white !important;
    }

    svg {
        color: white !important;
    }
`;

export const Label = styled.h4`
    font-size: 15px;
`;

export const TextField = styled(Input)`
    margin: 5px 0px;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: white;
    font-family: Poppins;
    font-size: 14px;
    line-height: 24px;
    color: #828282;
`;

export const Logo = styled.section`
    height: 50%;
    width: 40%;
    padding: 5px;
    border: solid 2px rgba(164, 161, 161, 0.35);
    border-radius: 6px;
    border-style: dashed;
    margin-bottom: 10px;
`;

export const ConvertContainer = styled.div`
    padding: 25px;
    width: 300px;
`;