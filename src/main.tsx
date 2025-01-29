import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryCliente = new QueryClient;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryCliente}>
    <App />
    </ QueryClientProvider>
  </StrictMode>,
)
