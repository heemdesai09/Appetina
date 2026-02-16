import { z } from 'zod';

// Booking validation
export const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  eventDate: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, 'Event date must be in the future'),
  guests: z.number().min(10, 'Minimum 10 guests required').max(1000, 'Maximum 1000 guests allowed'),
  eventType: z.string().min(2, 'Please select an event type'),
  message: z.string().max(500).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

// Contact form validation
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number').optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

export type ContactInput = z.infer<typeof contactSchema>;

// Admin login validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Menu item validation
export const menuItemSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  description: z.string().max(500).optional(),
  price: z.number().positive('Price must be positive'),
  categoryId: z.string().min(1, 'Category is required'),
  isVeg: z.boolean().default(true),
  isAvailable: z.boolean().default(true),
  image: z.string().url().optional(),
  order: z.number().default(0),
});

export type MenuItemInput = z.infer<typeof menuItemSchema>;

// Gallery image validation
export const galleryImageSchema = z.object({
  imageUrl: z.string().url('Invalid image URL'),
  title: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  order: z.number().default(0),
});

export type GalleryImageInput = z.infer<typeof galleryImageSchema>;

// Testimonial validation
export const testimonialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  review: z.string().min(10, 'Review must be at least 10 characters').max(1000),
  rating: z.number().min(1).max(5),
  position: z.string().max(100).optional(),
  image: z.string().url().optional(),
  order: z.number().default(0),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;

// Booking status update validation
export const bookingStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED']),
});

export type BookingStatusInput = z.infer<typeof bookingStatusSchema>;
