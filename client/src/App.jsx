import { useState } from 'react'

import './App.css'
import {Routes , Route} from 'react-router-dom';
import Index from './pages/Index';
import Footer from './components/Footer/Footer';
import BookingPage from './pages/BookingPage';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import OrderDetails from './pages/OrderDetails';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/login' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Index/>}/>
        <Route path='/bookorder' element={<BookingPage/>}/>
        <Route path='/feedback' element={<FeedbackForm/>}/>
        <Route path='/previosorders' element={<OrderDetails/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
