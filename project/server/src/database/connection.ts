import logger from '../helpers/logger';
import { sequelize } from './';

const connectDatabase = async () => {
  try {
    await sequelize.sync();

    return logger('Connected to MySQL', 'INFO');
  } catch (error: any) {
    return logger(`Database Error: ${error}`);
  }
};

export default connectDatabase;
