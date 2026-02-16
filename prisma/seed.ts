import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@appetina.com' },
    update: {},
    create: {
      email: 'admin@appetina.com',
      password: hashedPassword,
      role: 'ADMIN',
      name: 'Admin User',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create menu categories
  const categories = await Promise.all([
    prisma.menuCategory.upsert({
      where: { name: 'North Indian' },
      update: {},
      create: { name: 'North Indian', order: 1 },
    }),
    prisma.menuCategory.upsert({
      where: { name: 'Chinese' },
      update: {},
      create: { name: 'Chinese', order: 2 },
    }),
    prisma.menuCategory.upsert({
      where: { name: 'South Indian' },
      update: {},
      create: { name: 'South Indian', order: 3 },
    }),
    prisma.menuCategory.upsert({
      where: { name: 'Beverages' },
      update: {},
      create: { name: 'Beverages', order: 4 },
    }),
    prisma.menuCategory.upsert({
      where: { name: 'Desserts' },
      update: {},
      create: { name: 'Desserts', order: 5 },
    }),
  ]);

  console.log('✅ Created menu categories');

  // Create menu items
  const northIndianCat = categories[0];
  const chineseCat = categories[1];
  const southIndianCat = categories[2];
  const beveragesCat = categories[3];
  const dessertsCat = categories[4];

  await prisma.menuItem.createMany({
    data: [
      // North Indian
      {
        name: 'Paneer Butter Masala',
        description: 'Cottage cheese in rich tomato and cashew gravy',
        price: 280,
        categoryId: northIndianCat.id,
        isVeg: true,
        order: 1,
      },
      {
        name: 'Dal Makhani',
        description: 'Black lentils slow-cooked with butter and cream',
        price: 220,
        categoryId: northIndianCat.id,
        isVeg: true,
        order: 2,
      },
      {
        name: 'Butter Chicken',
        description: 'Tender chicken in creamy tomato sauce',
        price: 320,
        categoryId: northIndianCat.id,
        isVeg: false,
        order: 3,
      },
      {
        name: 'Kadhai Paneer',
        description: 'Cottage cheese with bell peppers in spicy gravy',
        price: 260,
        categoryId: northIndianCat.id,
        isVeg: true,
        order: 4,
      },
      {
        name: 'Malai Kofta',
        description: 'Vegetable dumplings in creamy gravy',
        price: 270,
        categoryId: northIndianCat.id,
        isVeg: true,
        order: 5,
      },
      {
        name: 'Mutton Rogan Josh',
        description: 'Aromatic lamb curry with Kashmiri spices',
        price: 420,
        categoryId: northIndianCat.id,
        isVeg: false,
        order: 6,
      },

      // Chinese
      {
        name: 'Veg Manchurian',
        description: 'Crispy vegetable balls in tangy sauce',
        price: 240,
        categoryId: chineseCat.id,
        isVeg: true,
        order: 1,
      },
      {
        name: 'Hakka Noodles',
        description: 'Stir-fried noodles with vegetables',
        price: 220,
        categoryId: chineseCat.id,
        isVeg: true,
        order: 2,
      },
      {
        name: 'Chilli Chicken',
        description: 'Spicy chicken with bell peppers',
        price: 300,
        categoryId: chineseCat.id,
        isVeg: false,
        order: 3,
      },
      {
        name: 'Schezwan Fried Rice',
        description: 'Spicy fried rice with vegetables',
        price: 210,
        categoryId: chineseCat.id,
        isVeg: true,
        order: 4,
      },

      // South Indian
      {
        name: 'Masala Dosa',
        description: 'Crispy crepe with spiced potato filling',
        price: 120,
        categoryId: southIndianCat.id,
        isVeg: true,
        order: 1,
      },
      {
        name: 'Idli Sambhar',
        description: 'Steamed rice cakes with lentil soup',
        price: 100,
        categoryId: southIndianCat.id,
        isVeg: true,
        order: 2,
      },
      {
        name: 'Uttapam',
        description: 'Thick pancake with vegetables',
        price: 130,
        categoryId: southIndianCat.id,
        isVeg: true,
        order: 3,
      },

      // Beverages
      {
        name: 'Fresh Lime Soda',
        description: 'Refreshing lime with soda',
        price: 80,
        categoryId: beveragesCat.id,
        isVeg: true,
        order: 1,
      },
      {
        name: 'Masala Chai',
        description: 'Spiced Indian tea',
        price: 50,
        categoryId: beveragesCat.id,
        isVeg: true,
        order: 2,
      },
      {
        name: 'Lassi',
        description: 'Creamy yogurt drink',
        price: 90,
        categoryId: beveragesCat.id,
        isVeg: true,
        order: 3,
      },

      // Desserts
      {
        name: 'Gulab Jamun',
        description: 'Sweet milk dumplings in syrup',
        price: 100,
        categoryId: dessertsCat.id,
        isVeg: true,
        order: 1,
      },
      {
        name: 'Rasmalai',
        description: 'Cottage cheese in sweetened milk',
        price: 120,
        categoryId: dessertsCat.id,
        isVeg: true,
        order: 2,
      },
      {
        name: 'Ice Cream',
        description: 'Assorted flavors',
        price: 80,
        categoryId: dessertsCat.id,
        isVeg: true,
        order: 3,
      },
    ],
  });

  console.log('✅ Created menu items');

  // Create gallery images
  await prisma.galleryImage.createMany({
    data: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f29da8c152?w=800',
        title: 'Elegant Banquet Hall',
        order: 1,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
        title: 'Wedding Setup',
        order: 2,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800',
        title: 'Fine Dining',
        order: 3,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
        title: 'Gourmet Cuisine',
        order: 4,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800',
        title: 'Event Decoration',
        order: 5,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
        title: 'Buffet Spread',
        order: 6,
      },
    ],
  });

  console.log('✅ Created gallery images');

  // Create testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Rajesh Patel',
        review: 'Appetina made our wedding reception absolutely perfect! The ambiance was stunning, food was delicious, and the staff was incredibly professional. Highly recommend for any special occasion!',
        rating: 5,
        position: 'Wedding Client',
        order: 1,
      },
      {
        name: 'Priya Sharma',
        review: 'Organized our corporate event here and it exceeded all expectations. The banquet hall is spacious, well-maintained, and the catering service is top-notch. Will definitely book again!',
        rating: 5,
        position: 'Corporate Client',
        order: 2,
      },
      {
        name: 'Amit Desai',
        review: 'Best restaurant in Ahmedabad! The North Indian cuisine is authentic and flavorful. Great place for family dinners and special celebrations. The service is always prompt and courteous.',
        rating: 5,
        position: 'Regular Customer',
        order: 3,
      },
      {
        name: 'Neha Mehta',
        review: 'Had my daughter\'s birthday party here. The team helped with all arrangements and made it a memorable event. The kids enjoyed the food and the venue was beautifully decorated!',
        rating: 5,
        position: 'Birthday Event',
        order: 4,
      },
    ],
  });

  console.log('✅ Created testimonials');

  // Create site settings
  await prisma.siteSettings.createMany({
    data: [
      {
        key: 'banquet_capacity',
        value: '500',
        description: 'Maximum capacity of banquet hall',
      },
      {
        key: 'restaurant_capacity',
        value: '150',
        description: 'Restaurant seating capacity',
      },
      {
        key: 'booking_email',
        value: 'bookings@appetina.com',
        description: 'Email for booking notifications',
      },
      {
        key: 'contact_phone',
        value: '+91 99794 48440',
        description: 'Primary contact phone',
      },
      {
        key: 'whatsapp_number',
        value: '919979448440',
        description: 'WhatsApp number (without + or spaces)',
      },
    ],
  });

  console.log('✅ Created site settings');

  console.log('🎉 Database seeded successfully!');
  console.log('');
  console.log('📧 Admin credentials:');
  console.log('   Email: admin@appetina.com');
  console.log('   Password: admin123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
