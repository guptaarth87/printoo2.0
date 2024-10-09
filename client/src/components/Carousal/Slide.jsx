import React from 'react'
import './Slide.css'
import Img from './image.png';
import {HashLink as Link} from 'react-router-hash-link'

export default function Slide() {
  return (
    <>
        <div className="starterdiv background-clr" id="startersection">
            <div className="container">
            <div className="row ">
              <div className="col-lg-6 col-md-6 col-sm-12">
              <h3 className=" white starter_txt">
              Unlock the power of innovation with our <span className="highlight">seamless</span> 
              <br></br><br></br>
              <Link className="pos_button " to="#services">See Services</Link>
              </h3>
              
              </div>
              
                <img  className="col-lg-5 col-md-6 col-sm-12 animated" src={Img}/>
           
            </div>
            </div>
        </div>
    </>
  )
}
