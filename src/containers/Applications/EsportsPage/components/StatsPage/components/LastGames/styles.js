import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    padding: 10px;
    margin: 10px;
    width: 400px;

    background-color: #fafcff;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
`;

export const TeamResult = styled.div`
    display: grid;

    grid-template-areas: 
    'team result';

    grid-template-columns: 40% 60%; 
    grid-template-rows: 70px;
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
    justify-content: center;
    align-items: center;

    span {
        padding: 0px 8px;
        font-family: Poppins;
        font-size: 14px;
    }
`;

export const MatchResult = styled.button`
    padding: 0;
    background: none;
    outline: none;
    font: inherit;
    z-index: 2;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    color: #39f;
    background-color: #fff;
    transition: 0.2s;

    &:hover {
        color: #fff;
        background-color: #39f;
    }
`;