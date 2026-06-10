import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@/index.css'
import { store } from '@/store'
import App from '@/App'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster
          toastOptions={{
            position: 'top-right'
          }}
        />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
