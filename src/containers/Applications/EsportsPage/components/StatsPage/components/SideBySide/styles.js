import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    padding: 10px;
    margin: 10px;
    width: 500px;
    height: 480px;

    background-color: #fafcff;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
`;

export const Header = styled.section`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    height: 20px;
    padding: 10px 20px;

    span {
        text-transform: uppercase;
        font-family: Poppins;
        font-size: 14px;
        color: #5f6e85
    }

`;

export const Content = styled.div`
    display: grid;

    grid-template-areas: 
    'teamOne teamTwo';

    grid-template-columns: 50% 50%; 
    grid-template-rows: 400px;

`;

export const TeamOne = styled.section`
    grid-area: teamOne;

    padding: 8px;

    display: grid;

    grid-template-areas: 
    'header'
    'results';

    grid-template-columns: 100%; 
    grid-template-rows: 25% 75%;
    border-right: solid 1px rgba(164, 161, 161, 0.35);

`;

export const TeamOneHeader = styled.section`
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    img {
        margin: 0px 7px;
        height: auto;
        width: 28px;
    }

    span {
        margin: 0px 7px;
        font-family: Poppins;
        font-size: 14px;

        &:last-child {
        margin: 0px;
        }
    }
`;

export const TeamOneResults = styled.section`
    grid-area: results;

    display: flex;
    flex-direction: column;

`;

export const TeamOneResult = styled.section`
    display: grid;

    grid-template-areas: 
    'label result';

    grid-template-columns: 80% 20%; 
    grid-template-rows: 30px;

    margin: 3px 0px;
`;

export const Label = styled.section`
    grid-area: label;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    span {
        margin: 0px 5px;
        font-family: Poppins;
        font-size: 13px;
        /* color: #5f6e85; */
    }
`;

export const Result = styled.section`
    grid-area: result;

    display: flex;
    align-items: center;
    justify-content: center;

    span {
        margin: 0px 5px;
        font-family: Poppins;
        font-size: 22px;
        color: ${props => props.color ? props.color : "#b0b0b0" };
    }
`;


export const TeamTwo = styled.section`
    grid-area: teamTwo;

    padding: 8px;

    display: grid;

    grid-template-areas: 
    'header'
    'results';

    grid-template-columns: 100%; 
    grid-template-rows: 25% 75%;
    border-left: solid 1px rgba(164, 161, 161, 0.35);

`;

export const TeamTwoHeader = styled.section`
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    img {
        margin: 0px 7px;
        height: auto;
        width: 28px;
    }

    span {
        margin: 0px 7px;
        font-family: Poppins;
        font-size: 14px;

        &:last-child {
        margin: 0px;
        }
    }
`;

export const TeamTwoResults = styled.section`
    grid-area: results;

    display: flex;
    flex-direction: column;

`;

export const TeamTwoResult = styled.section`
    display: grid;

    grid-template-areas: 
    'result label';

    grid-template-columns: 20% 80%; 
    grid-template-rows: 30px;

    margin: 3px 0px;
`;

export const TeamTwoLabel = styled(Label)`
    justify-content: flex-start;
`;