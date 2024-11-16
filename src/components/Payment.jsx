import React from 'react';
import logo from '../assets/shopApp-logo.png';

function Payment() {
  const paymentHandler = async () => {
    const amount = 500; // Amount in INR (e.g., 500 INR)
    const currency = 'INR';
    const receipt_id = 'receipt_123456';

    // Create order by sending request to the backend
    const response = await fetch('http://localhost:5000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: receipt_id
      })
    });

    const order = await response.json();
    console.log("Order created:", order);

    // Configure Razorpay checkout options
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
      amount: order.amount,
      currency: order.currency,
      name: "Your Company Name",
      description: "Test Transaction",
      image: logo,
      order_id: order.id, // Use order ID from backend response
      handler: async function (response) {
        // Show the successful payment alert
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
    
        // Send data to server for validation
        const validateResponse = await fetch('http://localhost:5000/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
        })       
        });
    
        const validationResult = await validateResponse.json();
        
        console.log("validation Result", validationResult);
    },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };

    console.log(options);

    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert("Payment failed. Error: " + response.error.description);
    });

    rzp1.open();
  };

  return (
    <div>
      <h1>Payment Testing</h1>
      <button onClick={paymentHandler}>Check Out</button>
    </div>
  );
}

export default Payment;
