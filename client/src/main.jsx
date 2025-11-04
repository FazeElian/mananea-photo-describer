import { createRoot } from 'react-dom/client'
import Router from './Router.jsx'
import { BrowserRouter } from 'react-router-dom'
import "./assets/css/Global.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Query client - React query
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    <ReactQueryDevtools />
  </QueryClientProvider>
)
