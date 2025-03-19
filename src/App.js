import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import { UserContextProvider } from './contexts/UserContext';

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Outlet />
    </UserContextProvider>
  );
}

export default App;
