import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

const createTransporter = () => {
  // Configure your SMTP settings here
  // For production, use environment variables
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('Email configuration not set. Email would be sent to:', options.to);
      console.log('Subject:', options.subject);
      return true; // Return true in development without SMTP
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
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendBookingNotification = async (booking: {
  name: string;
  phone: string;
  email: string;
  eventDate: Date;
  guests: number;
  eventType: string;
  message?: string;
}): Promise<boolean> => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6f2c2c 0%, #a23535 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .detail { margin: 15px 0; padding: 15px; background: white; border-left: 4px solid #a23535; border-radius: 4px; }
        .label { font-weight: bold; color: #6f2c2c; margin-bottom: 5px; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">New Booking Request</h1>
          <p style="margin: 10px 0 0 0;">Appetina The Banquet & Restaurant</p>
        </div>
        <div class="content">
          <p>You have received a new booking request with the following details:</p>
          
          <div class="detail">
            <div class="label">Customer Name:</div>
            <div>${booking.name}</div>
          </div>
          
          <div class="detail">
            <div class="label">Phone:</div>
            <div>${booking.phone}</div>
          </div>
          
          <div class="detail">
            <div class="label">Email:</div>
            <div>${booking.email}</div>
          </div>
          
          <div class="detail">
            <div class="label">Event Date:</div>
            <div>${new Date(booking.eventDate).toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</div>
          </div>
          
          <div class="detail">
            <div class="label">Number of Guests:</div>
            <div>${booking.guests}</div>
          </div>
          
          <div class="detail">
            <div class="label">Event Type:</div>
            <div>${booking.eventType}</div>
          </div>
          
          ${
            booking.message
              ? `
          <div class="detail">
            <div class="label">Message:</div>
            <div>${booking.message}</div>
          </div>
          `
              : ''
          }
          
          <p style="margin-top: 30px;">Please contact the customer to confirm the booking.</p>
        </div>
        <div class="footer">
          <p>This email was sent from Appetina Restaurant booking system.</p>
          <p>Aastha-99, Near CTM, Amraiwadi, Ahmedabad, Gujarat 380026</p>
          <p>Phone: +91 99794 48440</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: process.env.BOOKING_EMAIL || 'bookings@appetina.com',
    subject: `New Booking Request - ${booking.name} - ${booking.eventType}`,
    html,
    replyTo: booking.email,
  });
};

export const sendBookingConfirmation = async (
  customerEmail: string,
  booking: {
    name: string;
    eventDate: Date;
    guests: number;
    eventType: string;
  }
): Promise<boolean> => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6f2c2c 0%, #a23535 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .detail { margin: 15px 0; padding: 15px; background: white; border-left: 4px solid #ca8a04; border-radius: 4px; }
        .label { font-weight: bold; color: #6f2c2c; margin-bottom: 5px; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 12px; }
        .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">Booking Confirmed!</h1>
          <p style="margin: 10px 0 0 0;">Appetina The Banquet & Restaurant</p>
        </div>
        <div class="content">
          <div class="success">
            <strong>✓ Your booking has been confirmed!</strong>
          </div>
          
          <p>Dear ${booking.name},</p>
          <p>Thank you for choosing Appetina! We are delighted to confirm your booking with us.</p>
          
          <div class="detail">
            <div class="label">Event Date:</div>
            <div>${new Date(booking.eventDate).toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</div>
          </div>
          
          <div class="detail">
            <div class="label">Number of Guests:</div>
            <div>${booking.guests}</div>
          </div>
          
          <div class="detail">
            <div class="label">Event Type:</div>
            <div>${booking.eventType}</div>
          </div>
          
          <p>If you have any questions or need to make changes, please don't hesitate to contact us.</p>
          
          <p style="margin-top: 30px;">We look forward to making your event memorable!</p>
        </div>
        <div class="footer">
          <p><strong>Appetina The Banquet & Restaurant</strong></p>
          <p>Aastha-99, Near CTM, Amraiwadi, Ahmedabad, Gujarat 380026</p>
          <p>Phone: +91 99794 48440</p>
          <p>Email: bookings@appetina.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: customerEmail,
    subject: 'Booking Confirmed - Appetina Restaurant',
    html,
  });
};

export const sendContactMessage = async (contact: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<boolean> => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6f2c2c 0%, #a23535 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .detail { margin: 15px 0; padding: 15px; background: white; border-left: 4px solid #a23535; border-radius: 4px; }
        .label { font-weight: bold; color: #6f2c2c; margin-bottom: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">New Contact Message</h1>
        </div>
        <div class="content">
          <div class="detail">
            <div class="label">Name:</div>
            <div>${contact.name}</div>
          </div>
          
          <div class="detail">
            <div class="label">Email:</div>
            <div>${contact.email}</div>
          </div>
          
          ${
            contact.phone
              ? `
          <div class="detail">
            <div class="label">Phone:</div>
            <div>${contact.phone}</div>
          </div>
          `
              : ''
          }
          
          ${
            contact.subject
              ? `
          <div class="detail">
            <div class="label">Subject:</div>
            <div>${contact.subject}</div>
          </div>
          `
              : ''
          }
          
          <div class="detail">
            <div class="label">Message:</div>
            <div>${contact.message}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: process.env.BOOKING_EMAIL || 'bookings@appetina.com',
    subject: `Contact Form - ${contact.subject || 'New Message'}`,
    html,
    replyTo: contact.email,
  });
};
