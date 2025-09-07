import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { TeamContext, TeamProvider } from './Context/TeamContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <TeamProvider>
      <App/>
    </TeamProvider>
    </BrowserRouter>
  </StrictMode>,
)
