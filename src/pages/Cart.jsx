import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { NavLink } from 'react-router-dom';
import logo from '../assets/shopApp-logo.png'

function Cart() {
    const { cart } = useSelector((state) => state);
    const [totalAmount, setTotalAmount] = useState(0);

    const paymentHandling = async () => {
        const amount = totalAmount; // Amount in INR (e.g., 500 INR)
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

    useEffect(() => {
        setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
    }, [cart]);

    return (
        <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
            {
                cart.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-5xl">
                        {/* Cart Items Section */}
                        <div className="flex flex-col gap-4 w-full lg:w-2/3">
                            {cart.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>

                        {/* Summary Section */}
                        <div className="w-full lg:w-1/3 p-6 bg-white shadow-lg rounded-lg">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Cart Summary</h2>
                            <p className="text-lg text-gray-700 mb-2">Total Items: {cart.length}</p>
                            <p className="text-lg font-semibold text-gray-800 mb-6">Total Amount: ${totalAmount.toFixed(2)}</p>
                            <button onClick={paymentHandling} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                                CheckOut Now
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center mt-10">
                        <p className="text-xl font-medium text-gray-700 mb-4">Your Cart is Empty</p>
                        <NavLink to='/'>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                                Shop Now
                            </button>
                        </NavLink>
                    </div>
                )
            }
        </div>
    );
}

export default Cart;
