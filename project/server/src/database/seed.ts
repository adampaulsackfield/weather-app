import Location from '../models/Location.model';

const seedFunction = () => {
  return Location.bulkCreate([
    {
      id: 1,
      location: 'Wigan',
      history: [
        {
          last_updated_epoch: 1680606000,
          last_updated: '2023-04-04 12:00',
          temp_c: 9,
          temp_f: 48.2,
          is_day: 1,
          condition: {
            text: 'Sunny',
            icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
            code: 1000,
          },
          wind_mph: 9.4,
          wind_kph: 15.1,
          wind_degree: 130,
          wind_dir: 'SE',
          pressure_mb: 1027,
          pressure_in: 30.33,
          precip_mm: 0,
          precip_in: 0,
          humidity: 57,
          cloud: 0,
          feelslike_c: 6.7,
          feelslike_f: 44,
          vis_km: 10,
          vis_miles: 6,
          uv: 4,
          gust_mph: 10.7,
          gust_kph: 17.3,
        },
      ],
    },
  ]);
};

export default seedFunction;
