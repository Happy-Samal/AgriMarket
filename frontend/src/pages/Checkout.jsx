import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserProvider'
import { useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { addOrder } from '../helpers/order'
import { createRzyOrder } from '../helpers/payment'

const Checkout = () => {
  const loginUser = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation();
  const [totalAmount, setTotalAmount] = useState(NaN)
  const [products, setProducts] = useState([])
  const { product, quantity, price, cartItems } = location.state || {};
  const [formInfo, setFormInfo] = useState({})
  const [loading, setLoading] = useState(false)
  const [loader , setLoader] = useState(false)

  useEffect(() => {
    if (loginUser) {
      setFormInfo(loginUser.user)
    }

    if ((product && quantity && price) || cartItems) {
      const products = cartItems ? cartItems : [{ product, quantity, price }]
      setProducts(products)
      const totalAmount = cartItems ? cartItems.reduce((total, item) => total + item.price, 0) : price
      setTotalAmount(totalAmount)
    } else {
      navigate('/NotFound')
    }

  }, [loginUser])



  const inputChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
  }

  const orderProduct = async () => {
    const value = { products, totalAmount, formInfo }
    setLoading(true)
    const res = await addOrder(value)
    setLoading(false)
    if (res.success) {
      navigate('/ordersuccessfully', {
        state: { confirm: true }
      })
    } else {
      toast.error(res.message)
    }
  }

  const cashOnDelivery = async () => {
    await orderProduct()
  }

  const onlinePayment = async () => {
    setLoading(true);
    const data = await createRzyOrder({ amount: totalAmount });
    setLoading(false);

    if (data.success) {
      const options = {
        key: data.rzy_id, // Your Razorpay Key ID
        amount: Number(totalAmount) * 100, // Amount in subunits
        currency: "INR",
        name: 'AgriMarket', // Your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: data.id, // Razorpay Order ID from backend
        prefill: {
          name: formInfo?.username,
          email: formInfo?.email,
          contact: formInfo?.phone // Customer's phone number
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        },
        handler: async function (response) {
          const paymentData = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature
          };
          const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/rzyCallBackUrl`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
          });

          const resultData = await result.json();

          if (resultData.success) {
            toast.success(resultData.message);
            await orderProduct();
          } else {
            toast.error(resultData.message);
          }
        },
        modal: {
          onDismiss: function () {
            toast.error("Payment process was cancelled.");
          }
        }
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
      rzp1.on('payment.failed', function (response) {
        toast.error("Payment failed, please try again.");
      });
    } else {
      toast.error(data.message);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    if (formInfo.paymentMethod == 'Cash on Delivery') {
      cashOnDelivery()
    } else {
      onlinePayment()
    }
    setFormInfo(loginUser.user)
  }
  return (
    <>
      <Helmet>
        <title>Order your Item </title>
        <meta name="description" content="AgriMarket - From Farm to Your Table, Fresh and Direct " />
      </Helmet>


      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section: Shipping and Payment Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg  sm:text-sm"
                    placeholder="John Doe"
                    name='username'
                    value={formInfo?.username || ''}
                    onChange={inputChange}
                    required
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg  sm:text-sm"
                    placeholder="1234 Main St"
                    name='address'
                    value={formInfo?.address || ''}
                    onChange={inputChange}
                    required
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg  sm:text-sm"
                    placeholder="abc@gmail.com"
                    name='email'
                    value={formInfo?.email || ''}
                    onChange={inputChange}
                    required
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg  sm:text-sm"
                    placeholder="+1234567890"
                    name='phone'
                    value={formInfo?.phone || ""}
                    onChange={inputChange}
                    required
                  />
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold">Payment Method</h3>
                  <div className="mt-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Cash on Delivery"
                        className="form-radio text-green-600 cursor-pointer"
                        onChange={inputChange}
                        required
                      />
                      <span className="ml-2 text-gray-700 cursor-pointer">Cash on Delivery</span>
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Online Payment"
                        className="form-radio text-green-600 cursor-pointer"
                        onChange={inputChange}
                        required
                      />
                      <span className="ml-2 text-gray-700 cursor-pointer">Online Payment</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center"
                >
                  {loading ?
                    <img src="loading.gif" alt="loading" className='w-5 md:w-6 invert' />
                    :
                    <span>Confirm and Pay</span>
                  }

                </button>
              </form>
            </div>

            {/* Right Section: Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              {cartItems ? (
                <div>
                  <h3 className="font-semibold mb-2">Items in Cart:</h3>
                  {cartItems.map((item, index) => (
                    <div key={index} className="mb-4">
                      <p>Product ID: {item.product}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>price: ₹{item.price}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold mb-2">Product Details:</h3>
                  <p>Product ID: {product}</p>
                  <p>Quantity: {quantity}</p>
                  <p>Total Amount: ₹{price}</p>
                </div>
              )}

              <div className="mt-6 border-t pt-4">
                <p className="font-semibold text-lg">Total Amount: ₹ {totalAmount} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

