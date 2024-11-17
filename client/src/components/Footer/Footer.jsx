import './Footer.css';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';

function Footer(){
    return (
        <> 
        <div id = "contactus" className=" wrapbox w-100 py-4 flex-shrink-0">
     
     
        <div className="footercomponent background-clr">
       
            <div className="row gy-4 gx-5">
                <div className="col-lg-3 col-md-6">
                    <h5 className="h1 white">Printto 2.0</h5>
                    <p className="small white subhead">Don't go anywhere get prints delivered!</p>
                    <p className="small white mb-0">&copy; Copyrights. All rights reserved. Printo 2.0</p>
                </div>
                <div className="subdiv background-clr col-lg-8">
                <div className="row">
                <div className="col-lg-2 col-md-6">
                    <h5 className="mb-3 white">Quick links</h5>
                     <ul className="list-unstyled ">
                     <li><HashLink className="link white" to="/bookorder">Place Order</HashLink></li>
                       <li><HashLink className="link white" to="/previosorders">Go to Orders</HashLink></li>
                       <li><HashLink className="link white" to="/">Home</HashLink></li>
                       <li><HashLink className="link white" to="/about-us">About us</HashLink></li>
                       <li><HashLink className="link white" to="/feedback">Feedback</HashLink></li>
                       <li><Link className="link white" to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="col-lg-2 col-md-6">
                    <h5 className="mb-3 white">Social Media</h5>
                    <ul className="list-unstyled ">
                        <li><a className="link white" href="#">Facebook</a></li>
                        <li><a className="link white" href=""  target="_blank">Instagram</a></li>
                        <li><a className="link white" href="#">Linkedin</a></li>
                        
                    </ul>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="mb-3 white">Legal</h5>
                    <ul className="list-unstyled ">
                        <li><a className="link white" href="/terms-and-conditions">Terms & Conditions</a></li>
                        <li><a className="link white" href="/privacy-policy"  >Privacy Policy</a></li>
                        <li><a className="link white" href="/cancellation-and-shipping">Cancellation & shipping</a></li>
                        {/* <li><a className="link white" href="#">Cancellation & shipping</a></li> */}
                    </ul>
                </div>
                <div className="col-lg-4 col-md-6 ">
                    <h5 className="mb-3 white">Contact info</h5>
                    <ul className="list-unstyled ">
                        <li className='white'>Phone No : +91 9111869645</li>
                        <li className='white'>Email : printooo@gmail.com</li>
                        <li className='white'>Instagram :@printoooinsta </li>
                        
                    </ul>
                </div>
               
               
                </div>
             </div>
            </div>
           
        </div>
       
         
        
    </div>
        
       
        
        </>
    )
}

export default Footer;