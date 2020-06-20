import styled from 'styled-components';
import { NavLink } from 'reactstrap';

export const TabContainer = styled.section`
    height: 100%;
    width: 100%;
`;

export const StyledNavLink = styled(NavLink)`
    /* margin: 0px 20px; */
    cursor: pointer;
    border: 1px solid #814c94;
    background-color: white !important;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    padding: 8px 50px;

    span {
        font-family: Poppins;
        font-size: 18px;
        font-weight: 400;
        color: #814c94;
    }


    &.active {
        border-left: none;
        background-color: #814c94 !important;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        padding: 8px 50px;

        span {
            font-family: Poppins;
            font-size: 18px;
            font-weight: 400;
            color: #ffffff;
        }
    }

`;
