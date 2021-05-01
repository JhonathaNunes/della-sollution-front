import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { CircularProgress } from '@material-ui/core';
import Router from './Router';
import GlobalStyle from './GlobalStyle';
import GlobalContextProvider from './hooks/useGlobal';

function App() {
  return (
    <GlobalContextProvider>
      <GlobalStyle />
      <Suspense
        fallback={(
          <div className="spinner-container">
            <CircularProgress color="primary" />
          </div>
        )}
      >
        <Router />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          closeOnClick
          draggable
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
      </Suspense>
    </GlobalContextProvider>
  );
}

export default App;
