import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/verificationEmail";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
    email : string,
    username : string,
    verifyCode : string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'ShadowSpeak <onboarding@resend.dev>',
            to: email,
            subject: 'ShadowSpeak Verification Code',
            react: VerificationEmail({username, otp : verifyCode}),
        });
        return {success : true, message : "Verification email sent successfully"}
    } catch (emailError) {
        console.log("Error in sending Verification Email: ", emailError);
        return {success : false, message : "Failed to send verification email"}
    }
}
