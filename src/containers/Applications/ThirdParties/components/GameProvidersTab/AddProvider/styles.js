import styled from 'styled-components';
import { Button as MaterialButton } from "@material-ui/core";

export const AddProviderContainer = styled.div`
    padding: 15px;

    border-radius: 10px !important;

    background-color: white;
    border: solid 1px rgba(164, 161, 161, 0.35) !important;
    box-shadow: none !important;

    width: 100%;
`;

export const Header = styled.section`
    display: grid;
    grid-template-columns: 120px 1fr;

    width: 100%;
`;

export const Logo = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 120px;
`;

export const Details = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    padding: 8px 10px;

    > span {
        font-family: Poppins;
        font-size: 20px;
    }
`;

export const Actions = styled.section`
    display: flex;
    justify-content: flex-start;

    padding: 15px 10px 0px 10px;
`;

export const AddButton = styled(MaterialButton)`
    margin: 7px 0px !important;

    width: 90px;

    text-transform: none !important;
    background-color: #63c965 !important;
    box-shadow: none !important;
    height: 30px !important;
    color: white !important;
    opacity: ${props => props.disabled ? 0.7 : 1};

    font-size: 12px;
`;
