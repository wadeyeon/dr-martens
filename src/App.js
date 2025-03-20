import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import { UserContextProvider } from './contexts/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
