import styled from "styled-components";


export const MobileWrapper = styled.section`

  @media (max-width: 768px) {
   display: none !important;
  }

`;

export const CasinoCard = styled.section`
  display: flex;
  width: 100%;
  height: 40px;
  padding: 15px;
  max-height: 550px;
  margin: 15px;
  margin-top: 0px;
  background: #814c94;
  border-radius: 6px;
  transition: transform 0.2s;
  overflow: hidden;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.05);

    span {
        font-family: Poppins;
        font-size: 14px;
        color: #ffffff;
    }
`;

export const CasinoContainer = styled.section`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: space-between;
`;

export const Icon = styled.section`
    height: 200px;
    width: 200px;
    opacity: 0.56;
`

export const Link = styled.h1`
    margin-top: -70px;
    margin-bottom: 22px;
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    color: #463e3e;
`;