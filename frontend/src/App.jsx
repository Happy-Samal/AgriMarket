import './App.css';
import { RouterProvider } from 'react-router-dom';
import Router from './routes/Router';

function App() {
  return (
    <div className=" bg-gradient-to-r from-[#16520f] to-[#7efb71] font-sans">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
