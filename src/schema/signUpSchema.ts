import {z} from "zod";

export const UsernameValidation = z
    .string()
    .min(2,"Username must be alteast 2 charecters")
    .max(20, "Username must be atmost 20 charecters")
    .regex(/^[a-zA-Z0-9]+$/, "Username must not contain special characters");

export const SignUpSchema = z.object({
    username : UsernameValidation,
    email : z
        .string()
        .email({message: "Invalid email address"}),
    password : z
        .string()
        .min(8, "Password must be of 8 charecters")
})