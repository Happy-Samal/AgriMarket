# Agrimarket

## Overview

Agrimarket is a web application tailored for farmers, producers, and consumers to streamline agricultural commerce. It provides a platform where users can buy and sell fresh produce, agricultural products, and related services. Users can create personalized accounts to manage their listings, connect with buyers and sellers, and explore market opportunities. Agrimarket aims to empower the agricultural community by enhancing visibility, improving access to fresh products, and fostering sustainable practices, all while facilitating direct connections between producers and consumers.

## Website host on

click - https://agri-market-happy-samal.vercel.app/

## Technologies Used

- **Frontend & Backend**: React js , ExpressJs(Nodejs)
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Authentication**: JWT , bcrypt and cookie-parser
- **Online Payment**: razorpay
- **Email**: emailjs , Ejs
- **Chat**: Websocket - socket.io
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js (v12.x or later)
- npm (v6.x or later) or yarn (v1.22.x or later)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Happy-Samal/AgriMarket.git
   cd AgriMarket
    ```

1. **Install dependencies:**

   ```sh
   npm install
   #or
   yarn install
   ```
3. **Set up environment variables:**

    Create a .env file in the root directory (frontend ) and add the necessary environment variables (example below):

    ```sh
    VITE_BACKEND_URL=your_backend_url
    VITE_TEMPLATE_KEY=<your_email_template_id>
    VITE_SERVICE_KEY=<your_email_service_key>
    VITE_PUBLIC_KEY=<your_email_public_id>
    ```
    Create a .env file in the backend  and add the necessary environment variables (example below):

    ```sh
    MONGO_URL=<YOUR_MONGO_URL>
    PORT=3000
    FRONTEND_URL=<YOUR_FRONTEND_URL>
    JWT_SECRET=<YOUR_SECRET_STRING>
    GMAIL_USER=<YOUR_GOOGLE_ID>
    GMAIL_PASSWORD=<YOUR_GOOGLE_PASSWORD>
    RZY_ID=<YOUR_RAZORPAY_ID>
    RZY_SECRET=<YOUR_RAZORPAY_SECRET>

    ```
 4. **Getting Started**

    First, run the client: (frontend)

    ```sh
        npm run dev
        # or
        yarn dev
        # or
        pnpm dev
        # or
        bun dev
     ```
    First, run the server: (backend)

    ```sh
        npm run dev
     ```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

You can start editing the page by modifying `src/app.jsx`. The page auto-updates as you edit the file.


## Feedback and Contributions

We invite you to experience our site by using it to support or create campaigns. Your feedback is invaluable to us and helps us improve our platform. If you have any suggestions or encounter any issues, please let us know.

We welcome contributions to enhance the platform. You can add new features, fix bugs, or improve documentation. Pull requests are welcome!

### How to Contribute
1. **Fork the repository:**

    Click on the "Fork" button at the top right of this page to create a copy of this repository under your GitHub account.

2. **Clone the forked repository:**
    ```sh
    git clone https://github.com/Happy-Samal/AgriMarket.git
    cd AgriMarket
    ```
3. **Create a new branch:**
    ```sh
    git checkout -b feature-branch
    ```    
4. **Make your changes and commit them:**
    ```sh
    git add .
    git commit -m 'Add new feature'
    ```

5. **Push to the branch:**
    ```sh
    git push origin feature-branch
    ```

6. **Open a Pull Request:**

    Go to the repository on GitHub and click on the "Compare & pull request" button. Provide a clear description of your changes and submit the pull request.


## Contribution Guidelines

- Ensure your code follows the project's coding standards.
- Include relevant documentation and update existing    documentation if needed.
- Write clear and descriptive commit messages.
- Test your changes thoroughly before submitting a pull request.

## License
This project is licensed under the MIT [License](https://github.com/Happy-Samal/AgriMarket/blob/main/LICENSE). See the LICENSE file for details.

## Contact
For any questions or feedback, please reach out to us at rudrasamal007@gmail.com

## Deploy on Vercel

go to the [link](https://vercel.app) . create account with github and create a project and import the CreateFolio repository name and first select root is frontend and set environment variables then go to the dashboard and create new project at that time root is backend and set environment variables


##
### 😀If you are reading this then [Give me Money for buy a chai](https://Need-Money.vercel.app/user/happy_samal) 🍵
##

## Credit

<a href="https://lordicon.com/">Icons by Lordicon.com</a>
</br>
<a href="https://icons8.com/">Icons by icons8.com</a>
