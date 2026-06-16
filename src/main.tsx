import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.tsx'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

const quertClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={quertClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
