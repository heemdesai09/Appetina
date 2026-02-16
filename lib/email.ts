import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Create reusable transporter
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465, // true if 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

/**
 * Generic email sender
 */
export const sendEmail = async (
  options: EmailOptions
): Promise<boolean> => {
  try {
    // If SMTP not configured (development mode)
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log("⚠ SMTP not configured. Simulated email:");
      console.log("To:", options.to);
      console.log("Subject:", options.subject);
      return true;
    }

    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Appetina Restaurant" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });

    return true;
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return false;
  }
};

/**
 * Booking notification to restaurant
 */
export const sendBookingNotification = async (booking: {
  name: string;
  phone: string;
  email: string;
  eventDate: Date;
  guests: number;
  eventType: string;
  message?: string;
}): Promise<boolean> => {
  const formattedDate = new Date(booking.eventDate).toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const html = `
    <h2>New Booking Request</h2>
    <p><strong>Name:</strong> ${booking.name}</p>
    <p><strong>Phone:</strong> ${booking.phone}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Event Date:</strong> ${formattedDate}</p>
    <p><strong>Guests:</strong> ${booking.guests}</p>
    <p><strong>Event Type:</strong> ${booking.eventType}</p>
    ${booking.message ? `<p><strong>Message:</strong> ${booking.message}</p>` : ""}
  `;

  return sendEmail({
    to: process.env.BOOKING_EMAIL || process.env.SMTP_USER || "",
    subject: `New Booking - ${booking.name}`,
    html,
    replyTo: booking.email,
  });
};

/**
 * Booking confirmation email to customer
 */
export const sendBookingConfirmation = async (
  customerEmail: string,
  booking: {
    name: string;
    eventDate: Date;
    guests: number;
    eventType: string;
  }
): Promise<boolean> => {
  const formattedDate = new Date(booking.eventDate).toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const html = `
    <h2>Booking Confirmed 🎉</h2>
    <p>Dear ${booking.name},</p>
    <p>Your booking at Appetina has been confirmed.</p>
    <p><strong>Date:</strong> ${formattedDate}</p>
    <p><strong>Guests:</strong> ${booking.guests}</p>
    <p><strong>Event Type:</strong> ${booking.eventType}</p>
    <p>We look forward to serving you!</p>
  `;

  return sendEmail({
    to: customerEmail,
    subject: "Booking Confirmed - Appetina",
    html,
  });
};

/**
 * Contact form email
 */
export const sendContactMessage = async (contact: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<boolean> => {
  const html = `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${contact.name}</p>
    <p><strong>Email:</strong> ${contact.email}</p>
    ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ""}
    ${contact.subject ? `<p><strong>Subject:</strong> ${contact.subject}</p>` : ""}
    <p><strong>Message:</strong> ${contact.message}</p>
  `;

  return sendEmail({
    to: process.env.BOOKING_EMAIL || process.env.SMTP_USER || "",
    subject: `Contact: ${contact.subject || "New Message"}`,
    html,
    replyTo: contact.email,
  });
};
