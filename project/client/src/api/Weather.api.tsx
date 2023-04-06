import axios from 'axios';

const URL = 'http://localhost:5002/api/locations';

interface LocationInterface {
  name: string;
}

export const getWeather = async (location: LocationInterface) => {
  try {
    const response = await axios.post(URL, location);

    return response.data;
  } catch (error: any) {
    console.log('e', error);
  }
};
