require('dotenv').config();
const mongoose = require('mongoose');
const Sweet = require('../src/models/Sweet');
const User = require('../src/models/User');
const connectDB = require('../src/config/database');

const sweets = [
  {
    name: 'Gulab Jamun',
    description: 'Deep-fried milk solids soaked in rose-flavored sugar syrup',
    category: 'traditional',
    price: 150,
    quantity: 100,
    imageUrl: 'https://images.unsplash.com/photo-1589119908995-c6e5c9f6e5c2?w=400'
  },
  {
    name: 'Rasgulla',
    description: 'Soft, spongy cottage cheese balls in sugar syrup',
    category: 'traditional',
    price: 120,
    quantity: 80,
    imageUrl: 'https://images.unsplash.com/photo-1606471181254-8f6f4c1c5c4e?w=400'
  },
  {
    name: 'Chocolate Truffle',
    description: 'Rich, creamy chocolate ganache coated with cocoa powder',
    category: 'chocolate',
    price: 200,
    quantity: 50,
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400'
  },
  {
    name: 'Chocolate Brownie',
    description: 'Fudgy chocolate brownie with nuts',
    category: 'chocolate',
    price: 180,
    quantity: 60,
    imageUrl: 'https://images.unsplash.com/photo-1606313564747-8f0a7cfce3c6?w=400'
  },
  {
    name: 'Butter Cookies',
    description: 'Crispy, buttery cookies perfect for tea time',
    category: 'cookies',
    price: 100,
    quantity: 120,
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400'
  },
  {
    name: 'Chocolate Chip Cookies',
    description: 'Classic cookies loaded with chocolate chips',
    category: 'cookies',
    price: 130,
    quantity: 90,
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400'
  },
  {
    name: 'Black Forest Cake',
    description: 'Chocolate cake with cherries and whipped cream',
    category: 'cakes',
    price: 500,
    quantity: 20,
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'
  },
  {
    name: 'Red Velvet Cake',
    description: 'Smooth red velvet cake with cream cheese frosting',
    category: 'cakes',
    price: 550,
    quantity: 15,
    imageUrl: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400'
  },
  {
    name: 'Gummy Bears',
    description: 'Colorful, fruity gummy candies',
    category: 'candies',
    price: 80,
    quantity: 200,
    imageUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400'
  },
  {
    name: 'Lollipops',
    description: 'Assorted flavored lollipops',
    category: 'candies',
    price: 50,
    quantity: 150,
    imageUrl: 'https://images.unsplash.com/photo-1581798459219-c8f1e8c7effc?w=400'
  },
  {
    name: 'Jalebi',
    description: 'Crispy, syrupy Indian sweet in spiral shape',
    category: 'traditional',
    price: 140,
    quantity: 70,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400'
  },
  {
    name: 'Barfi',
    description: 'Dense milk-based sweet fudge',
    category: 'traditional',
    price: 160,
    quantity: 85,
    imageUrl: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400'
  },
  {
    name: 'Vanilla Cupcake',
    description: 'Soft vanilla cupcake with buttercream frosting',
    category: 'cakes',
    price: 80,
    quantity: 100,
    imageUrl: 'https://images.unsplash.com/photo-1587241321921-91a834d82fb2?w=400'
  },
  {
    name: 'Dark Chocolate Bar',
    description: 'Premium dark chocolate with 70% cocoa',
    category: 'chocolate',
    price: 250,
    quantity: 40,
    imageUrl: 'https://images.unsplash.com/photo-1606312619070-d48b4a0a4b2e?w=400'
  },
  {
    name: 'Oatmeal Cookies',
    description: 'Healthy oatmeal cookies with raisins',
    category: 'cookies',
    price: 110,
    quantity: 95,
    imageUrl: 'https://images.unsplash.com/photo-1603532644411-37e9b760e590?w=400'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Sweet.deleteMany({});
    await User.deleteMany({});

    console.log('Creating admin user...');
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@sweetshop.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✅ Admin user created');
    console.log('   Email: admin@sweetshop.com');
    console.log('   Password: admin123');

    console.log('\nCreating regular user...');
    const user = await User.create({
      name: 'Test User',
      email: 'user@sweetshop.com',
      password: 'user123',
      role: 'user'
    });
    console.log('✅ Regular user created');
    console.log('   Email: user@sweetshop.com');
    console.log('   Password: user123');

    console.log('\nSeeding sweets...');
    const createdSweets = await Sweet.insertMany(sweets);
    console.log(`✅ ${createdSweets.length} sweets created successfully`);

    console.log('\n📊 Database Seeding Summary:');
    console.log(`   Total Sweets: ${createdSweets.length}`);
    console.log(`   Total Users: 2 (1 admin, 1 regular user)`);
    
    const categories = await Sweet.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    console.log('\n   Sweets by Category:');
    categories.forEach(cat => {
      console.log(`   - ${cat._id}: ${cat.count}`);
    });

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
