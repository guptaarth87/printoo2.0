import React, { useState } from "react";
import "./FaqAccordion.css";

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-containerx">
      <h1 className="faq-titlex">
        <span className="star-iconx">★</span> FAQ
      </h1>

      {faqData.map((item, index) => (
        <div key={index} className="faq-itemx">
          <div
            className={`faq-headerx ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <span>{item.question}</span>
            <span className="toggle-iconx">
              {openIndex === index ? "−" : "+"}
            </span>
          </div>
          <div
            className="faq-contentx"
            style={{
              maxHeight: openIndex === index ? "200px" : "0",
              transition: "max-height 0.3s ease-out",
              overflow: "hidden",
            }}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const faqData = [
  {
    question: "What is Frontend Mentor, and how will it help me?",
    answer:
      "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building.",
  },
  {
    question: "Is Frontend Mentor free?",
    answer:
      "Yes, Frontend Mentor offers both free and premium coding challenges, with the free option providing access to a range of projects suitable for all skill levels.",
  },
  {
    question: "Can I use Frontend Mentor projects in my portfolio?",
    answer:
      "Yes, you can use projects completed on Frontend Mentor in your portfolio. It's an excellent way to showcase your skills to potential employers!",
  },
  {
    question: "How can I get help if I'm stuck on a challenge?",
    answer:
      "The best place to get help is inside Frontend Mentor's Discord community. There's a help channel where you can ask questions and seek support from other community members.",
  },
];

export default FaqAccordion;
