const express = require('express');
const Order = require('../models/orderModel');
const router = express.Router();

// GET /getorders
router.get('/getorders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /post



router.get('/getordersbyemail/:email', async (req, res) => {
  
  const { email } = req.params;
  console.log(email);
  try {
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



// POST /getfilteredorder
router.post('/getfilteredorder', async (req, res) => {
  const { startdate, enddate, starttime, endtime, deliveryslot, minprice, maxprice } = req.body;
  let filter = {};

  // Convert startdate and enddate to Date objects and include time filtering
  if (startdate && enddate && starttime && endtime) {
    const startDateTime = new Date(startdate);
    startDateTime.setHours(starttime, 0, 0, 0); // Set the hours based on starttime

    const endDateTime = new Date(enddate);
    endDateTime.setHours(endtime, 0, 0, 0); // Set the hours based on endtime

    filter.createdAt = { $gte: startDateTime, $lte: endDateTime };
  }

  if (deliveryslot) filter.deliveryslot = deliveryslot;
  if (minprice || maxprice) filter.price = { $gte: minprice || 0, $lte: maxprice || Infinity };

  try {
    const orders = await Order.find(filter).sort({ price: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// DELETE /deleteorder
router.delete('/deleteorder/:id', async (req, res) => {
  const { id } = req.params;
  console.log("request recieved")
  try {
    
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/createorder', async (req, res) => {
  const {
    uname,
    email,
    phoneno,
    deliveryslot,
    typeOfOrder,
    address,
    branch,
    year,
    price,
    paymentdata,
    black_and_white_fileurl = null,  // Default to null if not present
    color_fileurl = null,  // Default to null if not present
    delivered
  } = req.body;

  
  try {
    // Validate the incoming request data
    if (!uname ||!email || !phoneno || !deliveryslot || !typeOfOrder || !address || !branch || !year || !price || !paymentdata || delivered === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new order
    const newOrder = new Order({
      uname,
      email,
      phoneno,
      deliveryslot,
      typeOfOrder,
      address,
      branch,
      year,
      price,
      paymentdata,
      black_and_white_fileurl,
      color_fileurl,
      delivered
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Respond with the saved order data
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating order', error: error.message });
  }
});

// update 
// PATCH /orders/toggledelivered/:id
router.patch('/toggledelivered/:id', async (req, res) => {
  const { id } = req.params;
  
   
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    

    order.delivered = !!req.body.delivered;
    console.log(req.body.delivered); 
    
    await order.save();
    console.log("hello")
    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;
