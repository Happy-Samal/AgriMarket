import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Otp from '../features/Otp'
import Verification from '../features/Verification'
import SetPassword from '../features/SetPassword'
import NotFound from '../pages/NotFound'
import Error from '../pages/Error'
import ContactUs from '../pages/ContactUs'
import About from '../pages/About'
import TermsCondition from '../pages/TermsCondition'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import CustomerProfile from '../pages/CustomerProfile'
import FarmerDashboard from '../pages/FarmerDashboard'
import Cart from '../pages/Cart'
import Product from '../pages/Product'
import Chat from '../pages/Chat'
import ShowProducts from '../pages/ShowProducts'
import Checkout from '../pages/Checkout'
import OrderConfirmImg from '../common/OrderConfirmImg'

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/user/signup', element: <Signup /> },
            { path: '/user/login', element: <Login /> },
            { path: '/user/login/otp', element: <Otp /> },
            { path: '/user/login/otp/verification', element: <Verification /> },
            { path: '/user/login/otp/verification/setpassword', element: <SetPassword /> },
            { path: '/contactus', element: <ContactUs /> },
            { path: '/about', element: <About /> },
            { path: '/termsCondition', element: <TermsCondition /> },
            { path: '/privacyPolicy', element: <PrivacyPolicy /> },
            { path: '/farmer/dashboard', element: <FarmerDashboard /> },
            { path: '/customer/profile/', element: <CustomerProfile /> },
            { path: '/user/cart', element: <Cart /> },
            { path: '/search', element: <ShowProducts /> },
            { path: '/product', element: <Product /> },
            { path: '/chat', element: <Chat /> },
            { path: '/checkout', element: <Checkout /> },
            { path: '/ordersuccessfully', element: <OrderConfirmImg /> },
            { path: '/error', element: <Error /> },
            { path: '/*', element: <NotFound /> },
        ]
    }
])

export default Router