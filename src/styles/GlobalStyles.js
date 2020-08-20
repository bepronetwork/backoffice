import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    ul, h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }

    html, body, #root {
        height: 100vh;
        width: 100vw;
    }

    *, button, input {
        border: 0;
        outline: 0;

        font-family: 'Poppins', sans-serif;
    }

    a {
        color: var(--text-secondary-color);

        &:hover {
            color: var(--primary-hover-color);
        }
    }

    input {
        background: var(--input-background-color);
    }

    html {
        background: var(--background-color);
    }

    ::selection {
        color: white;
        background: var(--primary-color);
    }

    :root {
        --primary-color: #984efb;
        --primary-hover-color: #621ac7;

        --background-color: #f4f7fa;
        --input-background-color: #e8f0fe;
        --card-background-color: #fff;

        --border-color: #dfe1eb;
        --border-hover-color: #0f41f0;

        --text-primary-color: #091439;
        --text-secondary-color: #828aa5;

        --loss-color: #ff3049;
        --gain-color: #00d60d;
    }
`;
