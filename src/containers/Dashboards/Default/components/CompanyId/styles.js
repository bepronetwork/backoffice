import styled from 'styled-components';
import { Button as MaterialButton } from '@material-ui/core';
import { Input } from 'reactstrap';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const AppDetails = styled.section`
    display: flex;
    flex-wrap: wrap;

    > img {
        justify-self: center;
        margin: 0px 5px;
    }

    > div {
        &.name-and-description {
            display: flex;
            flex-direction: column;
            align-content: flex-start;

            padding: 0px 10px;

            > p {
                margin: 5px 0px;
                padding: 0;
                height: auto;
            }
        }
    }
`;

export const Edit = styled.section`
    display: flex;
    justify-content: flex-end;
    flex: auto;
`;

export const BankAddress = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    padding: 5px 0px;

    align-items: flex-end;
    justify-content: flex-start;
`;

export const EditButton = styled(MaterialButton)`
    margin: 0px !important;

    text-transform: none !important;
    background-color: #894798 !important;
    box-shadow: none !important;
    height: 25px !important;
    color: white !important;
    opacity: ${props => props.disabled ? 0.7 : 1};

    font-size: 12px;
`;

export const ConfirmButton = styled(MaterialButton)`
    margin: 7px 0px !important;

    width: 100px;

    text-transform: none !important;
    background-color: #63c965 !important;
    box-shadow: none !important;
    height: 30px !important;
    color: white !important;
    opacity: ${props => props.disabled ? 0.7 : 1};
`;

export const DialogHeader = styled.div`
    display: flex;
    justify-content: flex-end;

    width: 100%;
    padding: 20px 30px 0px 30px;
`;

export const DialogActions = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    padding: 10px 24px;
`;

export const TextField = styled(Input)`
    margin: 12px 0px;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: white;
    font-family: Poppins;
    font-size: 14px;
    line-height: 24px;
    color: #828282;
`;
