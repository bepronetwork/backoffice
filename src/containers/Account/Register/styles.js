import styled from 'styled-components';
import BetProtocol from '../../../assets/img/login/icon_white';
import BackOfficeLogo from '../../../assets/img/login/backoffice_logo_purple.svg';
import BackgroundTop from '../../../assets/img/login/login_background_top.svg';
import BackgroundBottom from '../../../assets/img/login/login_background_bottom.svg';
import CasinoLogo from '../../../assets/img/login/casino_purple.svg';
import { Label } from 'reactstrap';

export const BackgroundBox = styled.section`
  display: flex;
  width: 100%;
  min-height: 100vh;
  z-index: -100;
  justify-content: center;
  background-image: linear-gradient(
    to right bottom,
    #984efb,
    #8b42ee,
    #7d35e1,
    #7028d4,
    #621ac7
  );
`;

export const VerticalSection = styled.section`
  padding: 20px;
  padding-top: 10px;
  width: 100%;
  max-width: 1600px;
  height: 100vh;

  ul {
    display: flex;
    align-items: center;
  }

  span:first-child {
    font-size: 17px;
    color: white;

    @media (max-width: 768px) {
      font-size: 13px;
    }
  }
`;

export const BetProtocolLogo = styled(BetProtocol)``;

export const Container = styled.section`
  display: flex;
  min-height: 60%;
  height: 85%;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.section`
  min-width: 250px;
  width: 500px;
  height: 85%;
  max-height: 720px;
  z-index: 100;
  margin: 30px 0px;
  padding: 25px 15px;
  background: url(${CasinoLogo}) no-repeat left bottom,
    var(--card-background-color);
  border-radius: 6px;
  border: 1px solid var(--border-color);
  box-shadow: rgba(0, 0, 0, 0.3) 30px 30px 30px;

  overflow-x: hidden;

  transition: transform 0.2s;

  &:hover {
    transform: scale(1.025);
    border-radius: 0px;
    box-shadow: rgba(0, 0, 0, 0.3) 50px 50px 30px;
  }
`;

export const CardHeader = styled.section`
  width: 100%;
  min-height: 30px;
  background: url(${BackOfficeLogo}) no-repeat top;
`;

export const CardContent = styled.section`
  padding: 15px;

  > h1 {
    margin-bottom: 25px;
    font-size: 30px;
    font-weight: 500;
    color: var(--text-primary-color);

    @media (max-width: 768px) {
      font-size: 24px;
      margin: 10px 0px;
    }
  }

  @media (max-width: 768px) {
    padding: 10px 0px;
  }
`;

export const Link = styled.a`
  margin: 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary-color);
  opacity: 0.9;
`;

export const CardFooter = styled.section`
  display: flex;
  padding: 5px 10px;
  justify-content: flex-end;
`;

export const Footer = styled.section`
  display: flex;
  position: fixed;
  bottom: 0px;
  padding: 10px 20px;
  width: 100%;
  justify-content: center;

  span {
    font-size: 12px !important;
    color: white;
    word-wrap: break-word;
  }
`;

export const InputLabel = styled(Label)`
  font-size: 14px;
`;
