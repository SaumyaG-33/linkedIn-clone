
Welcome to the LinkedIn Clone project! This application replicates core features of LinkedIn, allowing users to interact with posts, sign in securely, and benefit from real-time updates. It has been built using Next.js, TypeScript, Tailwind CSS, and various other technologies to ensure a seamless and responsive user experience.

Local Setup
To run the project on your local machine, follow these steps:

Prerequisites
Node.js: Ensure that you have Node.js installed. You can download it from Node.js.
Git: Make sure Git is installed to clone the repository. Get it from Git.
Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/SaumyaG-33/linkedin-clone.git
cd linkedin-clone
Install Dependencies:
Run the following command to install the required dependencies:

bash
Copy code
npm install
Environment Variables:
Create a .env.local file in the root of the project and add the necessary environment variables (e.g., for Clerk authentication, Cosmo DB connection). For example:

makefile
Copy code
NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
CLERK_API_KEY=<your-clerk-api-key>
AZURE_COSMOS_CONNECTION_STRING=<your-cosmo-db-connection-string>
Run the Development Server:
Start the local server using the following command:

bash
Copy code
npm run dev
The application will be available at http://localhost:3000.


## Features

- **Responsive Design**: Fully responsive user interface created with Tailwind CSS, ensuring a consistent experience across devices.
- **User Authentication**: Integrated Google Sign-In via Clerk for enhanced security and user management.
- **Real-Time Updates**: Utilizes Cosmo DB on Microsoft Azure for real-time data updates and scalable performance.
- **Interactive Feed**: Users can create, edit, and upload posts. They can also like, unlike, and comment on posts within their feed.
- **API Endpoints**: Robust backend API endpoints for handling data retrieval, submission, and deletion.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: Adds static types to JavaScript, improving development efficiency and code quality.
- **Tailwind CSS**: A utility-first CSS framework for designing responsive and modern user interfaces.
- **Clerk**: Provides authentication services with Google Sign-In integration.
- **Cosmo DB**: A globally distributed database service from Microsoft Azure for real-time data management.
- **Microsoft Azure**: Cloud computing platform hosting the Cosmo DB database and other services.

## Deployment

The application is deployed on Vercel. For backend services, Microsoft Azure is used. Ensure that your environment variables and database settings are correctly configured.

## Contact

For any questions or further information, feel free to reach out:

- **GitHub**: [SaumyaG-33](https://github.com/SaumyaG-33)
- **Email**: [saumyag335@gmail.com](mailto:saumyag335@gmail.com)

Thank you for checking out the LinkedIn Clone! Enjoy exploring and contributing to this project.

---
