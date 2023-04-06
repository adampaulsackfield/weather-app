import { Model } from 'sequelize';

interface LocationAttributes {
  id: string;
  location: string;
  history: any[];
}

interface LocationInstance
  extends Model<LocationAttributes>,
    LocationAttributes {}

interface LocationInterface {
  id: string;
  location: string;
  history: any[];
}

export { LocationInstance, LocationInterface };
