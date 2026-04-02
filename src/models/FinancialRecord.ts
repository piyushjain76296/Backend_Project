import mongoose, { Schema, Document } from 'mongoose';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export interface IFinancialRecord extends Document {
  amount: mongoose.Types.Decimal128 | number;
  type: string;
  category: string;
  description?: string;
  date: Date;
  createdBy: mongoose.Types.ObjectId;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const financialRecordSchema = new Schema(
  {
    // Decimal128 handles precise currency values without floating point errors
    amount: { type: Schema.Types.Decimal128, required: true },
    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: true
    },
    category: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Transform the returned object to parse the Decimal128 to a standard Number/String for the client
financialRecordSchema.set('toJSON', {
  transform: (doc, ret) => {
    if (ret.amount) {
      (ret as any).amount = parseFloat(ret.amount.toString());
    }
    return ret;
  }
});

export const FinancialRecord = mongoose.model<IFinancialRecord>('FinancialRecord', financialRecordSchema);
