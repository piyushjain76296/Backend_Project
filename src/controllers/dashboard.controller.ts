import { Request, Response, NextFunction } from 'express';
import { FinancialRecord } from '../models/FinancialRecord';
import mongoose from 'mongoose';
import { Role } from '../models/User';

export const getDashboardSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Restrict summary to viewer's own records
    const matchStage: any = { isDeleted: false };
    if (req.user!.role === Role.VIEWER) {
      matchStage.createdBy = new mongoose.Types.ObjectId(req.user!.id);
    }

    const typeTotals = await FinancialRecord.aggregate([
      { $match: matchStage },
      { $group: { _id: '$type', totalAmount: { $sum: '$amount' } } }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    typeTotals.forEach(item => {
      const sum = parseFloat(item.totalAmount.toString());
      if (item._id === 'INCOME') totalIncome = sum;
      if (item._id === 'EXPENSE') totalExpense = sum;
    });

    const categoryTotals = await FinancialRecord.aggregate([
      { $match: matchStage },
      { $group: { _id: '$category', totalAmount: { $sum: '$amount' } } },
      { $sort: { totalAmount: -1 } }
    ]);
    
    // Format metrics
    const breakdown = categoryTotals.map(item => ({
      category: item._id,
      amount: parseFloat(item.totalAmount.toString())
    }));

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        netBalance: totalIncome - totalExpense,
        breakdown
      }
    });
  } catch (error) {
    next(error);
  }
};
