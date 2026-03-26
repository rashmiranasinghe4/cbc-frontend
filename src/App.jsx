
import { BrowserRouter, Route, Routes ,Navigate} from 'react-router-dom';
import './App.css'
import ProductCard from './components/productCard';
import SuperProduct from './components/superProduct';
import HomePage from './pages/admin/homePage';
import LoginPage from './pages/admin/loginPage';
import RegisterPage from './pages/admin/registerPage';
import AdminPage from './pages/admin/adminPage';
import TestPage from './pages/admin/testPage';
import { Toaster } from 'react-hot-toast';

function App() {
     const token = localStorage.getItem("token");

   
  return (
      <BrowserRouter>
          <div className='w-full h-screen flex justify-center items-center'>
             <Toaster position="top-right"></Toaster>
             <Routes>
                 <Route path="/" element={<HomePage/>}/>
                  <Route path="/login" element={<LoginPage/>}/>
                   <Route path="/register" element={<RegisterPage/>}/>
                   <Route path="/test" element={<TestPage/>}/>
                   <Route path="/admin/*" element={ token ? <AdminPage /> : <Navigate to="/login" replace /> }/>

             </Routes> 
             
          </div>
      </BrowserRouter>
      
    
  );
}

export default App;
