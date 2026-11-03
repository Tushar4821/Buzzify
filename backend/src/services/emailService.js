
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Buzzify <onboarding@resend.dev>";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is missing from environment variables");
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend email error:", error);
      return { success: false, error };
    }

    console.log("Email sent successfully:", data.id);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Email service error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};
