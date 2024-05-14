import {createGlobalStyle,styled} from 'styled-components';

export const GlobalStyle = createGlobalStyle`

*{
    margin: 0;
    padding:0;
    font-family:'poppoins', 'sansserif' !important;
}
body{
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    background-color:#f2f2f2;
}
`;

export const Container  = styled.div`
  width:100%;
  height:100%;
  max-width:800px;
  margin-top:20px;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:10px;
`;
