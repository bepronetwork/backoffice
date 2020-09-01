import styled from 'styled-components';
import { CardBody as Card, Input } from 'reactstrap';

export const CardBody = styled(Card)`
    margin: 10px !important;
    border-radius: 10px !important;
    background-color: #fafcff !important;

    border: solid 1px rgba(164, 161, 161, 0.35) !important;
    box-shadow: none !important;
`;

export const ProvidersList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 15px;

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

export const ApiField = styled(Input)`
    margin: 12px 0px;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: white;
    font-family: Poppins;
    font-size: 14px;
    line-height: 24px;
    color: #828282;
`;