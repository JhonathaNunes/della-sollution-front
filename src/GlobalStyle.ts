import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
  }
  
  html {
    background-color: #F6F8F9;
    font-size: 14px;
  }
    
  body {
    background-color: #F6F8F9;
    margin: 0;
    padding: 0;
  }
  
  .spinner-container {
    height: 100vh;
    width: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
