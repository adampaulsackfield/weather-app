import axios from 'axios';

const getWeather = async (location: string) => {
  try {
    const weather = await axios.get(
      `${process.env.API_URL}?key=${process.env.API_KEY}&q=${location}&aqi=no`
    );

    return weather.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export default getWeather;
