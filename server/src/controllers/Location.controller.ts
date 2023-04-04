import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { LocationInterface } from '../interfaces/Location.interface';

import Location from '../models/Location.model';
import HttpException from '../helpers/HttpException';
import getWeather from '../api/weather';

const getLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { location } = req.body || {};

    if (!location) throw new HttpException(400, '', 'Missing location field');

    const locations: any[] = await Location.findAll({
      where: { location: location },
    });

    const weather = await getWeather(location);

    console.log(location);

    res.status(200).send({ success: true, data: locations, weather: weather });
  } catch (error: any) {
    next(error);
  }
};

export { getLocations };
