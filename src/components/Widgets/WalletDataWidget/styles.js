import styled from 'styled-components';

export const Container = styled.div`
  display: grid;

  grid-template-areas: 'Icon Data';

  grid-template-rows: 100%;
  grid-template-columns: auto 1fr;

  width: 100%;
  height: 150px;

  padding: 15px;

  border-radius: 9px;
  transition: transform 0.2s;
  box-shadow: 0 4px 8px 0 rgba(41, 59, 155, 0.23);

  color: white;
  background-image: linear-gradient(to right bottom, #984efb, #8b42ee, #7d35e1);

  &:hover {
    transform: scale(1.015) translate(0px, -3px);
    border-radius: 0px;
    box-shadow: 8px 8px 8px 0 rgba(41, 59, 155, 0.23);
  }
`;

export const Icon = styled.div`
  grid-area: Icon;

  padding: 0px 8px;

  align-self: center;

  height: 90px;
  width: 90px;

  @media (max-width: 700px) {
    height: 70px;
    width: 70px;
  }
`;

export const Data = styled.section`
  grid-area: Data;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 0px 10px;
`;

export const Amount = styled.section`
  display: flex;
  flex-wrap: wrap;

  > span {
    margin: 0px 8px;
    font-size: 22px;
    font-weight: 500;
    color: var(--background-color) !important;
    opacity: 0.85;

    align-self: flex-end;
  }
`;

export const Title = styled.h1`
  justify-self: flex-end;
  align-self: flex-start;

  margin: 0;
  padding: 0px 5px;

  font-size: 18px;
  font-weight: 500;
  color: white !important;
`;

export const Subtitle = styled.span`
  justify-self: start;
  align-self: center;

  margin: 0;
  padding: 0px 5px;

  font-size: 13px;
  font-weight: 400;
  color: white !important;
`;
