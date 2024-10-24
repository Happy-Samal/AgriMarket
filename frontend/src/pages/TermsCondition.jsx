import React from 'react';
import { Helmet } from 'react-helmet-async';

function TermsCondition() {
    return (
        <>
            <Helmet>
                <title>AgriMarket - Terms and Conditions</title>
                <meta name="description" content="AgriMarket - Your trusted platform for buying and selling fresh produce." />
            </Helmet>
            <div className="text-white relative">
                <div className=" text-white py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold text-center mb-6">Terms &amp; Conditions</h1>
                        <p className="text-gray-300 mb-6">
                            Welcome to AgriMarket. By using our website, you agree to comply with and be bound by the following terms and conditions:
                        </p>
                        <h2 className="text-xl font-bold mb-4">User Responsibilities:</h2>
                        <ul className="list-disc pl-6 mb-6">
                            <li>Provide accurate and complete information during registration and while listing products.</li>
                            <li>Use the platform in accordance with all applicable laws and regulations.</li>
                            <li>Respect other users and engage in fair trading practices.</li>
                        </ul>
                        <h2 className="text-xl font-bold mb-4">Prohibited Activities:</h2>
                        <ul className="list-disc pl-6 mb-6">
                            <li>Engaging in fraudulent activities or impersonation.</li>
                            <li>Posting harmful, illegal, or inappropriate content.</li>
                            <li>Attempting to manipulate product prices or user accounts.</li>
                        </ul>
                        <p className="text-gray-300 mb-6">
                            <strong>Intellectual Property:</strong> All content on this site is the property of AgriMarket or its content suppliers and is protected by intellectual property laws.
                        </p>
                        <p className="text-gray-300 mb-6">
                            <strong>Disclaimer:</strong> We do not guarantee the success of any sale or purchase made through our platform. Use of the platform is at your own risk.
                        </p>
                        <p className="text-gray-300 mb-6">
                            <strong>Changes to Terms:</strong> We may update these terms from time to time. Continued use of the site constitutes acceptance of the revised terms.
                        </p>
                        <p className="text-gray-300">
                            For more details, please read our full{" "}
                            <a href="#" className="text-blue-500 hover:underline">
                                Terms &amp; Conditions
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TermsCondition;
