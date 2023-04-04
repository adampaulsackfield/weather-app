import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { LocationInterface } from '../interfaces/Location.interface';

import Location from '../models/Location.model';
import HttpException from '../helpers/HttpException';

const getLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const locations: any[] = await Location.findAll({});

    res.status(200).send({ success: true, data: locations });
  } catch (error: any) {
    next(error);
  }
};

export { getLocations };
