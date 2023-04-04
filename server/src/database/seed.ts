import Location from '../models/Location.model';

const seedFunction = () => {
  return Location.bulkCreate([
    {
      id: 1,
      location: 'Manchester',
    },
  ]);
};

export default seedFunction;
