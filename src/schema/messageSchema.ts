import {z} from "zod";

export const MessageSchema = z.object({
    content : z
        .string()
        .min(10, "Message must be atleast of length 10")
        .max(300, "Message can be upto 300 lenth only")
})