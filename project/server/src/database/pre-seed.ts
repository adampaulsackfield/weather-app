import Location from '../models/Location.model';

const preSeedFunction = () => {
  return Location.destroy({
    where: {},
  });
};

export default preSeedFunction;
