import request from 'supertest';
import { sequelize } from '../database';

import server from '../index';

import preSeedFunction from '../database/pre-seed';
import seedFunction from '../database/seed';

beforeEach(() => {
  return sequelize.sync({ force: true }).then(() => {
    seedFunction();
  });
});

afterEach(() => {
  preSeedFunction();
});

afterAll(() => {
  sequelize.close();
});

const ENDPOINT = '/api/locations';

describe('LOCATIONS', () => {
  describe('GET /api/locations', () => {
    it('should return the weather for a given location, if it is the first time seeing that location', () => {
      const location = 'Bolton';

      return request(server)
        .post(ENDPOINT)
        .send({ location })
        .expect(200)
        .then((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.historicalData.length).toBe(0);
          expect(res.body.weather.location.name).toBeDefined();
        });
    });

    it('should return the weather for a given location, if the location has been searched before, it should return current weather and historical weather', () => {
      const location = 'Wigan';

      return request(server)
        .post(ENDPOINT)
        .send({ location })
        .expect(200)
        .then((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.historicalData.length).toBe(1);
          expect(res.body.weather.location.name).toBeDefined();
        });
    });

    it('it should add the current weather to the location database for this location', async () => {
      const location = 'Manchester';

      await request(server).post(ENDPOINT).send({ location });

      return request(server)
        .post(ENDPOINT)
        .send({ location })
        .expect(200)
        .then((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.historicalData.length).toBe(1);
          expect(res.body.weather.location.name).toBeDefined();
        });
    });

    it('it should return an error message if the location is not found', async () => {
      const location = 'madeupville';

      return request(server)
        .post(ENDPOINT)
        .send({ location })
        .expect(400)
        .then((res) => {
          expect(res.body.error).toEqual(
            `No matching location found.: ${location}`
          );
        });
    });
  });
});
