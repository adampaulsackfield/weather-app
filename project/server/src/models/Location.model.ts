import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const Location = sequelize.define(
  'Location',
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    history: {
      type: DataTypes.JSON,
      defaultValue: null,
    },
  },
  {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  }
);

export default Location;
