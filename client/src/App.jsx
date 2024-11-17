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
import DocumentTools from './components/DocumentTools/DocumentTools';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './components/TermsAndConditions/PrivacyPolicy';
import CancellationAndShipping from './components/TermsAndConditions/CancellationAndShippping';
import Aboutus from './pages/Aboutus';
import PDFUploader from './PDFUploader';

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
        <Route path ='/testpdf' element={<PDFUploader/>}/>
        <Route path='/previosorders' element={<OrderDetails/>}/>
        <Route path='/tools' element={<DocumentTools/>}/>
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cancellation-and-shipping" element={<CancellationAndShipping />} />
        <Route path="/about-us" element={<Aboutus/>} />
        {/* <Route path="/contact-us" element={<ContactUs />} /> */}
      </Routes>
      <Footer/>
    </>
  )
}

export default App
