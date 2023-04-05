import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { LocationInterface } from '../interfaces/Location.interface';
import { v4 as uuidv4 } from 'uuid';

import Location from '../models/Location.model';
import HttpException from '../helpers/HttpException';
import getWeather from '../api/weather';

const getLocations = async (
  req: Request,
  res: Response<Record<string, any>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name) throw new HttpException(400, '', 'Missing location field');

    const weather = await getWeather(name);

    if (weather.message)
      throw new HttpException(400, '', `${weather.message}: ${name}`);

    const [record, created]: [any, any] = await Location.findOrCreate({
      where: { location: name },
      defaults: { id: uuidv4(), location: name, history: [] },
    });

    if (created) {
      record.history = [weather.current];
      await record.save();
    } else {
      record.history = [...record.history, weather.current];
      await record.save();
    }

    record.history.shift();

    res.status(200).send({
      success: true,
      historicalData: record.history,
      weather: weather,
    });
  } catch (error: any) {
    next(error);
  }
};

export { getLocations };
