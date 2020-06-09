import styled from 'styled-components';
import { ReactComponent as BetProtocol } from '../../../assets/img/login/icon_white.svg';
import BackOfficeLogo from '../../../assets/img/login/backoffice_logo_purple.svg';
import BackgroundTop from '../../../assets/img/login/login_background_top.svg';
import BackgroundBottom from '../../../assets/img/login/login_background_bottom.svg';
import CasinoLogo from '../../../assets/img/login/casino_purple.svg';
import { Input, InputGroupText, Label } from 'reactstrap';

const textColor = '#463e3e';

export const BackgroundBox = styled.section`
  display: flex;
  width: 100%;
  min-height: 100vh;
  z-index: -100;
  justify-content: center;
  background: url(${BackgroundTop}) top, url(${BackgroundBottom}) bottom,
    #8954a4ff;
  background-repeat: repeat-x;
  background-size: 2560px;
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
    font-family: 'Poppins';
    font-size: 17px;
    color: white;
  }
`;

export const BetProtocolLogo = styled(BetProtocol)`
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

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
  max-height: 680px;
  z-index: 100;
  margin: 15px 0px;
  padding: 25px 15px;
  background: url(${CasinoLogo}) no-repeat left bottom, #f8f8f8;
  border-radius: 6px;
  transition: transform 0.2s;
  overflow-x: hidden;

  &:hover {
    transform: scale(1.025);
  }
`;

export const CardHeader = styled.section`
  width: 100%;
  min-height: 30px;
  background: url(${BackOfficeLogo}) no-repeat top;
`;

export const CardContent = styled.section`
  padding: 15px;

  h1 {
    margin-bottom: 25px;
    font-family: 'Poppins';
    font-size: 26px;
    font-weight: 500;
    color: ${textColor};
  }
`;

export const Link = styled.a`
  margin: 10px;
  font-family: 'Poppins';
  font-size: 13px;
  font-weight: 500;
  color: ${textColor};
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
    font-family: 'Poppins';
    font-size: 12px !important;
    color: white;
    word-wrap: break-word;
  }
`;

export const InputLabel = styled(Label)`
    font-size: 14px;
    font-family: Poppins;
`;

export const UsernameInput = styled(Input)`
    margin: 12px 0px;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: #fafcff !important;
    font-family: Poppins;
    font-size: 14px;
    line-height: 24px;
    color: #828282;
`;

export const EmailInput = styled(Input)`
    margin: 12px 0px;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: #fafcff !important;
    font-family: Poppins;
    font-size: 14px;
    line-height: 24px;
    color: #828282;
`;

export const PasswordInput = styled(Input)`
    margin: 12px 0px;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: #fafcff !important;
    font-family: Poppins;
    font-size: 14px;
    line-height: 24px;
    color: #828282;
`;

export const NameInput = styled(Input)`
    margin: 12px 0px;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: #fafcff !important;
    font-family: Poppins;
    font-size: 14px;
    line-height: 24px;
    color: #828282;
`;