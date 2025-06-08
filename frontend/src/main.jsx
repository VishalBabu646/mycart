import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import store from './Store.js'
import {Provider} from 'react-redux'


createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </HelmetProvider>
)
