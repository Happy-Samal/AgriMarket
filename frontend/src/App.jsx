import './App.css';
import { RouterProvider } from 'react-router-dom';
import Router from './routes/Router';
import CookieBanner from './components/CookieBanner';

function App() {
  return (
    <div className=" bg-gradient-to-r from-[#16520f] to-[#7efb71] font-sans">
      <RouterProvider router={Router} />
      <CookieBanner/>  {/* This is where the cookie banner is rendered  */}
    </div>
  );
}

export default App;
