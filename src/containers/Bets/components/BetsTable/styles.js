import styled from 'styled-components';

export const Container = styled.div`
    padding: 10px;

    border-radius: 10px;
    border: solid 1px rgba(164, 161, 161, 0.35);

    background-color: '#FAFCFF';
`;


export const WonResult = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 22px;
    width: 70px;
    margin: 5px;

    font-size: 13px;
    font-weight: 400;
    color: white;

    background-color: ${props => props.isWon ? '#63c965' : '#e6536e' };
    border-radius: 5px;
`;