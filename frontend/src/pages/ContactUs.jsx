import React from 'react';
import { Helmet } from 'react-helmet-async';

function ContactUs() {
  return (
    <>
      <Helmet>
        <title>AgriMarket - Contact Us</title>
        <meta
          name="description"
          content="AgriMarket - A platform for farmers to sell products directly to customers."
        />
      </Helmet>
      <div className="text-white relative ">

        <div className="mx-[-10px] md:px-10 my-5">
          <div className="flex pt-2 mb-10 justify-center text-4xl font-extrabold font-sans items-center">
            Contact Us
          </div>
          <br />
          <div className="text-center font-bold text-white">
            We're here to assist you!
          </div>
          <p className="p-4 text-gray-200 text-md text-center font-sans">
            Whether you're a farmer or a customer, if you have any questions or need help, feel free to reach out to us:
          </p>
          <p className="p-4 text-gray-200 text-md text-center font-sans flex flex-col">
            <span>Email: support@agrimarket.com</span>
            <span>Phone: +1-800-987-6543</span>
            <span>Address: 100 Farmer's Road, Agriculture Town, TX 12345</span>
          </p>
          <p className="p-4 text-gray-200 text-md text-center font-sans flex flex-col">
            <span className='sm:text-[20px] font-semibold'>
              Stay connected with us for updates on new products and offers:
            </span>
            <span>Instagram</span>
            <span>Facebook</span>
            <span>LinkedIn</span>
          </p>
        </div>
        <div className="bg-white h-1 opacity-10 my-20"></div>
      </div>
    </>
  );
}

export default ContactUs;

