import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
    const [isBannerVisible, setBannerVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookiesConsent');
        if (!consent) {
            setBannerVisible(true);
        } else if (consent === 'true') {
            initializeThirdPartyCookies(); // Initialize services if consent already exists
        }
    }, []);

    const initializeThirdPartyCookies = () => {
        // Example: Enable third-party cookies or initialize services
        console.log("Third-party cookies and services are initialized.");
        // Example: window.gtag('config', 'GA_TRACKING_ID');
    };

    const acceptCookies = () => {
        localStorage.setItem('cookiesConsent', 'true');
        initializeThirdPartyCookies(); // Trigger services after consent
        setBannerVisible(false);
    };

    const declineCookies = () => {
        localStorage.setItem('cookiesConsent', 'false');
        setBannerVisible(false);
    };

    if (!isBannerVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-green-700 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-md text-center">
                <p className="text-sm sm:text-base mb-4">
                    We use cookies to enable a seamless login experience. By clicking "Allow Cookies," you consent to their use.{' '}
                    <a href="/privacyPolicy" className="underline">
                        Learn more
                    </a>.
                </p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={acceptCookies}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded"
                    >
                        Allow Cookies
                    </button>
                    <button
                        onClick={declineCookies}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded"
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>

    );
};

export default CookieBanner;
