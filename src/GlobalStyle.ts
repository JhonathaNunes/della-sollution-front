import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    font-family: 'Lato', sans-serif;
    font-weight: 600;
  }
  
  html {
    background-color: #F6F8F9;
    font-size: 14px;
  }
    
  body {
    background-color: #F6F8F9;
    margin: 0;
    padding: 0;
    color: #262626;
  }
  
  .spinner-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: auto;
    scrollbar-color: #878787 #ffffff;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 15px;
  }

  *::-webkit-scrollbar-track {
    background: #ffffff;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #878787;
    border-radius: 15px;
    border: 4px solid #ffffff;
  }
`;
