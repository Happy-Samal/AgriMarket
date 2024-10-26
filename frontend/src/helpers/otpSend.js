import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import sendEmail from './sendEmail';

// email send
const otpSend = async ({ email, username }) => {
    if (Cookies.get('agrimarketOTP')) {
        const data = { success: false, sent: true , message:'OTP already sent. Please check your email.'}
        return data
    }
    try {
        const res = await fetch(`/api/helper/otpGenerate`, {
            method: 'GET',
            credentials: 'include'
        })
        const ans = await res.json()
        const info = { username: username, email: email, text: ans.otp, subject: 'Your AgriMarket  OTP Code' }
        const data = await sendEmail(info)
        return data
    } catch (err) {
        return toast.error("Internal Server Error!")
    }

}
export default otpSend




















// using @browser/emailjs
// emailjs.init(import.meta.env.VITE_PUBLIC_KEY);  //"YOUR_PUBLIC_KEY"
// const templateParams = {
//     user_name: username,
//     user_email: email,
//     otp_code: res.otp,
// };
// try {
//     const response = await emailjs.send(import.meta.env.VITE_SERVICE_KEY, import.meta.env.VITE_TEMPLATE_KEY, templateParams);
//     Cookies.set('agrimarketOTP', 'some_value', { expires: 1 });
//     return true
// } catch (error) {
//     return false
// }
