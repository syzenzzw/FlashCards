import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryCliente = new QueryClient;

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryCliente}>
    <App />
    </ QueryClientProvider>
)
