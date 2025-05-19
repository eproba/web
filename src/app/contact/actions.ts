"use server";

export async function sendEmail({
  subject,
  fromEmail,
  message,
}: {
  subject: string;
  fromEmail: string;
  message: string;
}) {
  // TODO: Implement actual email sending logic

  // For now, just simulate email sending
  console.log("Sending email:", { subject, fromEmail, message });

  // Return success
  return { success: true };
}
