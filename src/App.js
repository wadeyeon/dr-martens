import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import { UserContextProvider } from './contexts/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
        <Footer />
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
