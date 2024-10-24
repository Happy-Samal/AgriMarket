import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { UserProvider } from '../context/UserProvider'

function Layout() {
  const location = useLocation()
  const isChat = location.pathname === '/chat'
  const isOrderConfirmed = location.pathname === '/ordersuccessfully'
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <UserProvider>
        <>
          <HelmetProvider>
            {isChat || isOrderConfirmed ?
              <main className='h-[100vh] overflow-hidden'>
                <Outlet />
              </main>
              :
              <>
                <Navbar />
                <main className='min-h-[100vh] pt-24'>
                  <Outlet />
                </main>
                <Footer />
              </>}
          </HelmetProvider>
        </>
      </UserProvider>
    </>
  )
}

export default Layout
