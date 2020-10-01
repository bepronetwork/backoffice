import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    padding: 10px;
    margin: 10px;
    width: 400px;
    height: 180px;

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

export const TeamResult = styled.div`
    display: grid;

    grid-template-areas: 
    'team result';

    grid-template-columns: 50% 50%; 
    grid-template-rows: 55px;

    margin: 5px 0px;
`;

export const Team = styled.section`
    grid-area: team;

    display: grid;
    grid-template-areas:
    'icon name';

    grid-template-columns: 30% 70%;
    grid-template-rows: auto;

`;

export const TeamIcon = styled.section`
    grid-area: icon;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
        /* padding: 0px 8px; */
        height: 22px;
        width: 22px;
    }
`;

export const TeamName = styled.section`
    grid-area: name;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
        padding: 0px 8px;
        font-family: Poppins;
        font-size: 13px;
    }
`;

export const MatchResultList = styled.section`
    grid-area: result;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MatchResult = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 3px;
    padding: 0;
    background: none;
    outline: none;
    font: inherit;
    z-index: 2;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    color: white;
    background-color: ${props => props.color};
    transition: 0.2s;

    span {
        font-family: Poppins;
        font-weight: 500;
    }

    /* &:hover {
        color: #fff;
        background-color: #39f;
    } */
`;