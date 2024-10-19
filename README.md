
# ShadowSpeak

ShadowSpeak is an anonymous feedback platform built with Next.js, Node.js, MongoDB, and additional services such as Vercel AI SDK, Resend for email handling, and NextAuth for authentication.

## Project Overview

ShadowSpeak allows users to send and receive anonymous messages, including suggested messages powered by AI, and offers a secure authentication process with JWT tokens. Key features include:
- Secure login and registration using NextAuth and JWT token handling.
- Anonymous message sending and receiving.
- Message suggestion system powered by the Vercel AI SDK.
- Email notifications and verification using Resend.
- Form validation using Zod for schema validation.

### Flowchart

To better understand the architecture and flow of the backend, please refer to the detailed flowchart below:

[View on Eraser![](https://app.eraser.io/workspace/x6DmTJScVPDfWTSac1yH/preview?elements=EP1HK-bvDGdBnTX2Xw2Wug&type=embed)](https://app.eraser.io/workspace/x6DmTJScVPDfWTSac1yH?elements=EP1HK-bvDGdBnTX2Xw2Wug)

## Installation

To set up the project locally, please follow the steps below.

1. Clone the repository:
   ```bash
   git clone https://github.com/Nexus-Agni/ShadowSpeak
   cd shadowspeak
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root of the project with the following variables:

   ```bash
   GOOGLE_API_KEY=<Your API URL>
   NEXTAUTH_URL=<Your NextAuth URL>
   RESEND_API_KEY=<Your Resend API Key>
   MONGODB_URI=<Your MongoDB URI>
   SECRET_KEY=<Your JWT Secret>
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open the app:
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

- After installation, you can access the sign-up and login pages for user registration.
- The public profile link will allow others to send anonymous messages.
- Suggested messages can be fetched via the "Suggest Messages" button, powered by the Vercel AI SDK.
- User authentication is handled by NextAuth, and cookies are securely managed.
- Email notifications and verification are handled by Resend.

## License

This project is licensed under the MIT License.
