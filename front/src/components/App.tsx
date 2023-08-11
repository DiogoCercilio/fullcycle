import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { routes } from '../config/Routes';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={createBrowserRouter(routes)}
        fallbackElement={<p>Loading...</p>}
      />
    </QueryClientProvider>
  )
}