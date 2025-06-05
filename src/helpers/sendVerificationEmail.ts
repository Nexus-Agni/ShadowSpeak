import { resend, transporter } from "@/lib/resend";
import VerificationEmail from "../../email/verificationEmail";
import { ApiResponse } from "@/types/apiResponse";
import nodemailer from "nodemailer";

export async function sendVerificationEmail(
    email : string,
    username : string,
    verifyCode : string
): Promise<ApiResponse> {

    try {
        await transporter.verify();
        console.log("Server is ready to take our messages");  
        
        console.log("Verifying SMTP connection...");
        await transporter.verify();
        console.log("SMTP connection verified successfully");
        
        console.log("Sending email to:", email);
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || 'ShadowSpeak <nexusagnidev@gmail.com>',
            to: email,
            subject: 'ShadowSpeak Verification Code',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <h2>ShadowSpeak Verification</h2>
                    <p>Hello ${username},</p>
                    <p>Your verification code is: <strong>${verifyCode}</strong></p>
                    <p>This code will expire in 30 minutes.</p>
                    <p>Thank you for joining ShadowSpeak!</p>
                </div>
            `,
        });
        return {success : true, message : "Verification email sent successfully"}
  } catch (err) {
        console.error("Error while sending mail", err);
        return {success : false, message : "some error"}
  }
}
