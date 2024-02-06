import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';


function App() {
  const {currentUser} = useContext(AuthContext)
  //console.log({currentUser})
  const ProtectedRoute = ({children})=>{
   if(!currentUser){
    return <Navigate to="/login" />
   }
   return children
  }


  return (
      <BrowserRouter>
      <Routes>
        <Route path='/'>
        <Route path='home' element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>} 
        />
        <Route path='login' element={<Login />}/>
        <Route index element={<Register />}/>
        </Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
