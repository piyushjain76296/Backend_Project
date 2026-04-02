import mongoose, { Schema } from 'mongoose';

export enum Role {
  VIEWER = 'VIEWER',
  ANALYST = 'ANALYST',
  ADMIN = 'ADMIN'
}

export interface IUser extends mongoose.Document {
  email: string;
  password?: string;
  role: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.VIEWER
    },
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Remove password field when converting to JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = mongoose.model<IUser>('User', userSchema);
