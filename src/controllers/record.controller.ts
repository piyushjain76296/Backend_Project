import { Request, Response, NextFunction } from 'express';
import { FinancialRecord } from '../models/FinancialRecord';
import mongoose from 'mongoose';
import { Role } from '../models/User';

export const createRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount, type, category, description } = req.body;
    const userId = req.user!.id; 

    const record = await FinancialRecord.create({
      amount,
      type,
      category,
      description,
      createdBy: userId
    });

    res.status(201).json({
      success: true,
      data: record
    });
  } catch (error) {
    next(error);
  }
};

export const getRecords = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = '1', limit = '10', type, startDate, endDate, category } = req.query;
    
    const query: any = { isDeleted: false };
    
    // Add filters
    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate as string);
      if (endDate) query.date.$lte = new Date(endDate as string);
    }
    
    // Restrict viewers to their own records
    if (req.user!.role === Role.VIEWER) {
      query.createdBy = req.user!.id;
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const records = await FinancialRecord.find(query)
      .populate('createdBy', 'name email role')
      .skip(skip)
      .limit(parseInt(limit as string))
      .sort({ date: -1 });

    const total = await FinancialRecord.countDocuments(query);

    res.status(200).json({
      success: true,
      count: records.length,
      total,
      data: records
    });
  } catch (error) {
    next(error);
  }
};

export const getRecordById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const record = await FinancialRecord.findOne({ _id: id, isDeleted: false })
      .populate('createdBy', 'name email role');

    if (!record) {
      res.status(404).json({ success: false, error: 'Record not found' });
      return;
    }

    // Enforce viewer ownership
    if (req.user!.role === Role.VIEWER && record.createdBy._id.toString() !== req.user!.id) {
      res.status(403).json({ success: false, error: 'Access denied to this record' });
      return;
    }

    res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    next(error);
  }
};

export const updateRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const record = await FinancialRecord.findOneAndUpdate(
      { _id: id, isDeleted: false },
      req.body,
      { new: true, runValidators: true }
    );

    if (!record) {
      res.status(404).json({ success: false, error: 'Record not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const record = await FinancialRecord.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!record) {
      res.status(404).json({ success: false, error: 'Record not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
