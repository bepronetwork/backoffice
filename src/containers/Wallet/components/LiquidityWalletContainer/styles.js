import styled from 'styled-components';
import { NavLink } from 'reactstrap';

export const Container = styled.section`
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 10px;
`;

export const Header = styled.section`
    display: flex;
    flex-direction: column;
    margin-bottom: 29px;

    h3 {
        margin: 0;
        font-family: Poppins;
        font-size: 18px;
        font-weight: 500;
        color: #463e3e;
    }

    p {
        margin: 0;
        font-size: 14px;
        line-height: 27px;
        color: #a4a1a1;
    }

`;

export const Content = styled.section`
    display: flex;
    height: 100%;
    width: 100%;

`;

export const CurrenciesTabContainer = styled.section`
    height: 100%;
    width: 100%;
    min-width: 176px;
`;

export const TabsContainer = styled.section`
    height: 100%;
    width: 100%;
`;

export const StyledNavLink = styled(NavLink)`
    cursor: pointer;
    filter: grayscale(1);
    opacity: 0.7;
    padding: 0;

    &.active {
        padding: 0;
        opacity: 1;
        filter: grayscale(0);
        border-left: none;
        background-color: transparent !important;
    }
`;

export const WalletContainer = styled.section`
    display: flex;
    height: 100%;
    width: 100%;

`;

export const WalletDetails = styled.section`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-left: 15px;
    pointer-events: all;

    h3 {
        margin-bottom: 0px;
        font-family: Poppins;
        font-size: 20px;
        font-weight: 500;
        color: #814c94;
    }

    span {
        opacity: 0.86;
        font-family: Poppins;
        font-size: 16px !important;
        line-height: 27px;
        text-align: left;
        color: #828282 !important;
    }

`;

export const Paragraph = styled.p`
    margin: 0;
    font-size: 14px;
    line-height: 27px;
    color: #a4a1a1;
`;