import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const sendEmail = async (info) => {
    try {
        const response = await fetch(`/api/helper/sendEmail`,
            {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify(info),
                credentials: 'include'
            }
        )
        const data = await response.json()
        if (data.success) {
            Cookies.set('agrimarketOTP', 'AgrimarketTeam', { expires: 1 });
            return data
        }
        return data
    } catch (err) {
        return toast.error("Internal Server Error!") 
    }

}

export default sendEmail