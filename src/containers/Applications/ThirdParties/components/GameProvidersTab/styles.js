import styled from 'styled-components';
import { CardBody as Card, Input } from 'reactstrap';

export const CardBody = styled(Card)`
    margin: 10px !important;
    padding: 25px 15px 15px 15px !important;
    border-radius: 10px !important;
    background-color: #fafcff !important;

    border: solid 1px rgba(164, 161, 161, 0.35) !important;
    box-shadow: none !important;

    > h1 {
        font-family: Poppins;
        font-size: 16px;
        color: #212529;
        font-weight: 500;
        line-height: 24px;
    }
`;

export const ProvidersList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    grid-gap: 15px;
    justify-items: start;

    width: 100%;
    height: 100%;
`;  

export const ProviderContainer = styled.div`
    width: 100%;
    padding: 15px 25px;

    border-radius: 10px !important;

    background-color: white;
    border: solid 1px rgba(164, 161, 161, 0.35) !important;
    box-shadow: none !important;
`;

export const Header = styled.section`
    > img {
        width: 100px !important;
        margin: 5px 0px !important;
    }
`;

export const Actions = styled.section`
    padding-top: 15px;

    > p {
        font-family: Poppins;
        font-size: 13px;
    }
`;

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
