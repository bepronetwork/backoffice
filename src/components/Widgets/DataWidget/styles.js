import styled from 'styled-components';

import CasinoLogo from '../../../assets/img/login/casino_purple.svg';

export const Container = styled.div`
  width: 100%;
  height: 150px;

  padding: 15px 20px;

  border-radius: 9px;
  transition: transform 0.2s;
  box-shadow: 0 4px 8px 0 rgba(41, 59, 155, 0.23);
  background: url(${CasinoLogo}) no-repeat left bottom;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    transform: scale(1.015) translate(0px, -3px);
    border-radius: 0px;
    box-shadow: 8px 8px 8px 0 rgba(41, 59, 155, 0.23);
  }

  &.primary {
    color: white;
    background-image: linear-gradient(
      to right bottom,
      #984efb,
      #8b42ee,
      #7d35e1
    );

    /* &:hover {
      border: 1.5px solid var(--primary-hover-color);
    } */
  }

  &.secondary {
    color: var(--primary-color);
    background-color: var(--card-background-color);
    /* border: 1px solid var(--border-color); */

    &:hover {
      border: 1px solid var(--primary-hover-color);
    }
  }

  > p {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
`;

export const Description = styled.section`
  display: grid;

  grid-template-areas: 'Title Subtitle';

  grid-template-rows: 48px;
  grid-template-columns: auto 1fr;
`;

export const Title = styled.h1`
  grid-area: Title;

  justify-self: start;
  align-self: center;

  margin: 0;
  padding: 0px 5px;

  font-size: 24px;
  font-weight: 500;
  color: var(--primary-hover-color) !important;
`;

export const Subtitle = styled.span`
  grid-area: Subtitle;

  justify-self: start;
  align-self: center;

  margin: 0;
  padding: 0px 5px;

  font-size: 13px;
  font-weight: 400;
  color: var(--primary-color) !important;
`;
