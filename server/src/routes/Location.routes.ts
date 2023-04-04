import express from 'express';

import { getLocations } from '../controllers/Location.controller';

const locationsRouter = express.Router();

locationsRouter.route('/').get(getLocations);

export default locationsRouter;
