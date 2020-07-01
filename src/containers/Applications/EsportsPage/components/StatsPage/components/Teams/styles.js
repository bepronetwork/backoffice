import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;

    width: 100%;
`;

export const PlayerCardContainer = styled.div`
    display: grid;

    grid-template-areas:
    'photo'
    'info';

    grid-template-columns: 100%;
    grid-template-rows: 45% 55%;

    height: 200px;
    width: 150px;

    background-color: white;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);

    margin: 10px;
`;

export const PlayerPhoto = styled.section`
    grid-area: photo;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 15px 5px;

    img {
        margin: 5px;
        height: 80px;
        width: auto;
    }
`;

export const PlayerInfo = styled.section`
    grid-area: info;
    padding: 5px 10px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const PlayerName = styled.span`
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
`;

export const PlayerFullName = styled.span`
    font-family: Poppins;
    font-size: 11px;
    font-weight: 400;
`;

export const Age = styled.span`
    font-family: Poppins;
    font-size: 12px;
    font-weight: 400;
`;

export const HomeTown = styled.span`
    font-family: Poppins;
    font-size: 12px;
    font-weight: 400;
`;

export const Nationality = styled.section`
    display: flex;
    padding: 10px 0px;

    span {
        margin-right: 8px;
        font-family: Poppins;
        font-size: 12px;
        font-weight: 400;
    }
`;

export const Role = styled.section`
    display: flex;

    span {
        font-family: Poppins;
        font-size: 12px;
        font-weight: 400;
    }
`;

export const TeamCard = styled.div`
    display: flex;
    flex-direction: column;

    background-color: #fafcff;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    padding: 10px;

    margin: 10px 0px;

    width: 100%;
`;

export const TeamList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const TeamInfo = styled.section`
    display: grid;
    grid-template-areas:
    'icon name';

    width: 200px;

    grid-template-columns: 20% 80%;
    grid-template-rows: auto;

    margin: 10px 0px;

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