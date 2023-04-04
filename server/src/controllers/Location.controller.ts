import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { LocationInterface } from '../interfaces/Location.interface';
import { v4 as uuidv4 } from 'uuid';

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

    let locations: any[] = await Location.findAll({
      where: { location: location },
    });

    const weather = await getWeather(location);

    if (locations.length === 0) {
      // If the location does not exist in the database, create a new location
      const locationData = await Location.create({
        id: uuidv4(),
        location,
        history: [weather.current],
      });
      locations = [locationData];
    } else {
      // If the location exists in the database, update its history field
      const updatedLocation = await Location.update(
        { history: [...locations[0].history, weather.current] },
        { where: { location: location } }
      );
      locations[0].history.push(weather.current);
    }

    res
      .status(200)
      .send({ success: true, historicalData: locations, weather: weather });
  } catch (error: any) {
    next(error);
  }
};

export { getLocations };
