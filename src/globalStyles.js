import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: rgb(235, 235, 235);
    }

    .App {
        position: relative;
        width: calc(100% - 400px);
        margin: 0 auto;
        font-family: 'Roboto', sans-serif;
        color: white;
    }

    .loader {
        width: 70px;
        height: 70px;
        border: 5px solid #FFF;
        border-bottom-color: #FF3D00;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        top: 5%;
        position: absolute;
        }

        @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
} 
`;

export default GlobalStyle;