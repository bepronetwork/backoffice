import styled from 'styled-components';
import { NavLink } from 'reactstrap';


export const TabContainer = styled.section`
    height: 100%;
    width: 100%;
`;

export const StyledNavLink = styled(NavLink)`
    /* margin: 0px 20px; */
    cursor: pointer;
    display: flex;
    border: 1px solid #814c94;
    background-color: white !important;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    padding: 8px;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 150px;
    margin: 0px 5px;

    span {
        margin: 0px 1fr;
        font-family: Poppins;
        font-size: 18px;
        font-weight: 400;
        color: #814c94;
    }


    &.active {
        border-left: none;
        background: #814c94 !important;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;


        span {
            margin: 0px 1fr;
            font-family: Poppins;
            font-size: 18px;
            font-weight: 400;
            color: #ffffff;
        }
    }

`;