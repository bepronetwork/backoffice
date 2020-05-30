import React, { Component } from "react";
import styled from 'styled-components';

const Theme = styled.div`
    .a {
    fill: #814c94;
    }

    .b {
    fill: #814c94;
    }

    .c {
    fill: #fff;
    }

    .d {
    fill: #4b2019;
    }

    .e {
    fill: white;
    }

    .f {
    fill: white;
    }
`;


export default class Arrow extends Component {
    render() {
        return (
            <Theme>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.4 86.62">
                <path class="a" d="M70.2,45.84A24.63,24.63,0,0,1,45.57,70.47a17,17,0,0,1-2-.1,24.62,24.62,0,0,0,0-49.07,19.45,19.45,0,0,1,2-.09A24.63,24.63,0,0,1,70.2,45.84Z" />
                <ellipse class="b" cx="43.54" cy="45.84" rx="22.61" ry="24.54" />
                <path class="c" d="M44.94,70.22c-.46.06-.92.12-1.4.15a24.62,24.62,0,0,1,0-49.07c.68.06,1.35.14,2,.25a24.62,24.62,0,0,0-.62,48.67Z" />
                <path class="b" d="M66.15,45.84A24.64,24.64,0,0,1,44.94,70.22a24.62,24.62,0,0,1,.62-48.67A24.64,24.64,0,0,1,66.15,45.84Z" />
                <path class="d" d="M45.57,71.47A25.63,25.63,0,1,1,71.2,45.84,25.66,25.66,0,0,1,45.57,71.47Zm0-49.26A23.63,23.63,0,1,0,69.2,45.84,23.66,23.66,0,0,0,45.57,22.21Z" />
                <polygon class="e" points="30.39 46.9 41.05 57.56 41.05 50.46 57.63 50.46 57.63 43.35 41.05 43.35 41.05 36.25 30.39 46.9" />
                <polygon class="f" points="39.13 55.64 41.04 56.73 41.05 52.83 41.05 50.46 54.34 50.46 54.24 46.65 38.34 46.51 38.34 38.62 30.62 47.13 39.13 55.64" />
                <path class="d" d="M41.05,58.56a1,1,0,0,1-.7-.29L29.69,47.61a1,1,0,0,1,0-1.41L40.35,35.54a1,1,0,0,1,1.7.71v6.1H57.63a1,1,0,0,1,1,1v7.11a1,1,0,0,1-1,1H42.05v6.1a1,1,0,0,1-.61.93A1.07,1.07,0,0,1,41.05,58.56ZM31.81,46.9l8.24,8.25V50.46a1,1,0,0,1,1-1H56.63V44.35H41.05a1,1,0,0,1-1-1V38.66Z" />
                </svg>
            </Theme>
        );
    }
}