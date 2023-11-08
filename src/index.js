import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <GlobalStyle/>
        <App />
      </BrowserRouter>
    </DndProvider>
  </React.StrictMode>
);
