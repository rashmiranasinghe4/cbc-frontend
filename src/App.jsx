
import { BrowserRouter, Route, Routes ,Navigate} from 'react-router-dom';
import './App.css'
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import AdminPage from './pages/adminPage';
import ContactPage from "./pages/contactPage";
import ReviewPage from "./pages/reviewPage";
import { Toaster } from 'react-hot-toast';
import ClientWebPage from "./pages/client/clientPage";
import { GoogleOAuthProvider } from '@react-oauth/google';
 import ForgetPasswordPage from "./pages/client/forgetPassword";

const clientId = "448689123633-67o8kap7vkl67up0i50oud34rc8ol9v9.apps.googleusercontent.com";


function App() {
     

  return (
      <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
          <div className='w-full h-screen flex justify-center items-center'>
             <Toaster position="top-right"></Toaster>
             <Routes>
                 <Route path="/" element={<HomePage/>}/>
                  <Route path="/login" element={<LoginPage/>}/>
                   <Route path="/register" element={<RegisterPage/>}/>
                   <Route path="/contact-us" element={<ContactPage/>}/>
                    <Route path="/reviews" element={<ReviewPage/>}/>
                    
                   <Route path="/admin/*" element={<AdminPage/>}/>  
                   <Route path="/forget" element={<ForgetPasswordPage/>}/>
                   <Route path="/*" element={<ClientWebPage/>}/>
                    
             </Routes> 
             
          </div>
     </GoogleOAuthProvider>
      </BrowserRouter>
      
    
  );
}

export default App;
