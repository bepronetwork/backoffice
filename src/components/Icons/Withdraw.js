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
        fill: white;
      }

      .e {
        fill: white;
      }

      .f {
        fill: #4b2019;
      }
`;


export default class Reward extends Component {
    render() {
        return (
            <Theme>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.4 86.62">
                <polyline class="a" points="17.74 33.32 17.74 22.73 65.35 22.73 65.35 68.4 17.74 68.4 17.74 56.66" />
                <rect class="b" x="61.41" y="22.92" width="3.42" height="45.03" />
                <rect class="c" x="18.03" y="23.73" width="46.61" height="1.2" />
                <polygon class="d" points="55.09 45.73 40.58 60.24 40.58 50.57 18.01 50.57 18.01 40.9 40.58 40.9 40.58 31.22 55.09 45.73" />
                <polygon class="e" points="43.19 57.63 40.59 59.11 40.58 53.79 40.58 50.57 22.49 50.57 22.62 45.38 44.28 45.19 44.28 34.45 54.78 46.04 43.19 57.63" />
                <path class="f" d="M40.57,61.24a.84.84,0,0,1-.38-.08,1,1,0,0,1-.62-.92V51.57H18a1,1,0,0,1-1-1V40.9a1,1,0,0,1,1-1H39.57V31.22a1,1,0,0,1,.62-.92,1,1,0,0,1,1.09.22L55.79,45a1,1,0,0,1,0,1.42L41.28,61A1,1,0,0,1,40.57,61.24ZM19,49.57H40.57a1,1,0,0,1,1,1v7.26l12.1-12.1L41.57,33.64V40.9a1,1,0,0,1-1,1H19Z" />
                <path class="f" d="M65.35,69.4H17.74a1,1,0,0,1-1-1V56.66a1,1,0,0,1,2,0V67.4H64.35V23.73H18.74v9.59a1,1,0,0,1-2,0V22.73a1,1,0,0,1,1-1H65.35a1,1,0,0,1,1,1V68.4A1,1,0,0,1,65.35,69.4Z" />
                </svg>
            </Theme>
        );
    }
}