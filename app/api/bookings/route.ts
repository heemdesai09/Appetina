import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { bookingSchema, bookingStatusSchema } from '@/lib/validations';
import { sendBookingNotification, sendBookingConfirmation } from '@/lib/email';
import { rateLimit, getClientIdentifier } from '@/lib/ratelimit';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

// GET - List all bookings (Admin only)
// POST - Create new booking (Public)
export async function GET(request: NextRequest) {
  try {
    // Verify admin token
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }

    // Get bookings with pagination
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      bookings,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getClientIdentifier(request);
    const rateLimitResult = rateLimit(identifier, {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 3, // Max 3 bookings per 15 minutes
    });

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: 'Too many booking requests. Please try again later.',
          resetTime: rateLimitResult.resetTime,
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate input
    const validatedData = bookingSchema.parse(body);

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email,
        eventDate: new Date(validatedData.eventDate),
        guests: validatedData.guests,
        eventType: validatedData.eventType,
        message: validatedData.message,
        status: 'PENDING',
      },
    });

    // Send notification email (don't wait for it)
    sendBookingNotification({
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      eventDate: booking.eventDate,
      guests: booking.guests,
      eventType: booking.eventType,
      message: booking.message || undefined,
    }).catch((error) => console.error('Failed to send booking notification:', error));

    return NextResponse.json(
      {
        message: 'Booking request submitted successfully',
        booking: {
          id: booking.id,
          status: booking.status,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating booking:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
