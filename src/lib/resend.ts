import { Resend } from 'resend';
import nodemailer from "nodemailer";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Create a transporter for SMTP with proper configuration
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com", // Update with your SMTP provider
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  debug: true // Enable debugging to see detailed logs
});