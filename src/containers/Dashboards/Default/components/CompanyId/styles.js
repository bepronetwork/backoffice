import styled from 'styled-components';
import { Button as MaterialButton } from '@material-ui/core';

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
                margin: 10px 0px;
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

    padding: 0px 10px;
`;

export const BankAddress = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    padding: 5px 10px;

    align-items: flex-end;
    justify-content: flex-start;
`;

export const EditButton = styled(MaterialButton)`
    margin: 7px 0px !important;

    text-transform: none !important;
    background-color: #894798 !important;
    box-shadow: none !important;
    height: 30px !important;
    color: white !important;
    opacity: ${props => props.disabled ? 0.7 : 1};

    font-size: 12px;
`;
