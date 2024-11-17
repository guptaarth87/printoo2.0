import React from 'react'
import Carousal from '../components/Carousal/Carousal'
import BookingButtons from '../components/ButtonsSection/BookingButtons'
import PriceChart from '../components/PriceChart/PriceChart'
import AvailableSlots from '../components/AvailableSlots/AvailableSlots'
import FaqAccordion from '../components/Faqs/FaqAccordion'
import FeedbackForm from '../components/FeedbackForm/FeedbackForm'

export default function Index() {
  return (
    <>
    <Carousal/>
    <div className="container">
    <BookingButtons/>
    <div className="mt-5">
    <div className="row">
        {/* First PriceChart */}
        <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
          <PriceChart/>
        </div>
        {/* Second PriceChart */}
        <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
          <AvailableSlots/>
        </div>
      </div>
      <FaqAccordion/>
      <FeedbackForm/>
    </div>
    </div>
    </>
  )
}
