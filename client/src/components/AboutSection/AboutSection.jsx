import React from "react";
import "./AboutSection.css";
// import { AboutUs } from "../../TextData";
import teamwork from './teamwork.svg';

const AboutSection = () => {
  return (
    <div className="about-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-12">
            <img
              src={teamwork}
              alt="About Us Image"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-lg-8 col-md-7 col-sm-12">
            <h2 className="about-title">Who We Are</h2>
            <p className="about-text">
            <p>
        Welcome to Printoo, your one-stop online printing solution! We understand the academic needs of students and aim to make printing services more accessible and efficient. 
      </p>
      <p>
        Our mission is to provide high-quality printing services with fast and reliable delivery right to your university campus. With Printoo, you can save time and focus on what matters most—your studies.
      </p>
      <p>
        Our team is dedicated to offering top-notch service with easy booking, transparent pricing, and seamless delivery. Join thousands of satisfied students who trust Printoo for their academic needs.
      </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
