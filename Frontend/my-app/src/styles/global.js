import {createGlobalStyle} from 'styled-components';
export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding:0;
}
body{
    width:100vw;
    height:100vh;
    background-color:#f2f2f2;
}
.custom-footer{
    background-color:#11415F;
    position:absolute;
    bottom:0;
    width:100%;
}
.footer-logo{
    max-width:300px;
}
.disabled{
    background: #c3c3c3 !important;
    cursor: not-allowed !important;
}
`;
