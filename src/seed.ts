import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { User, Role } from './models/User';
import { connectDB } from './config/db';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@finance.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user exists, skipping seed');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await User.create({
      email: adminEmail,
      password: hashedPassword,
      name: 'System Admin',
      role: Role.ADMIN
    });

    console.log('Admin seeded: admin@finance.com / admin123');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
