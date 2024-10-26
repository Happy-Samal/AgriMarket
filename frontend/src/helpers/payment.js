import { toast } from 'react-toastify';


// create Rzy Order
const createRzyOrder = async (value)=>{
   try{
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/createRzyOrder`,{
        method:'POST',
        headers:{ "Content-type":'application/json'},
        body:JSON.stringify(value),
        credentials:'include'
    })
    const data = await response.json()
    return data
   }catch(err){
    return toast.error("Internal Server Error!") 
   }
}


// pay online 

const rzyPay = async({data , formInfo , totalAmount , orderProduct})=>{
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
}
export {createRzyOrder , rzyPay}