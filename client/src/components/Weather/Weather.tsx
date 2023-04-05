import React, { ReactElement } from 'react';

import { GoLocation } from 'react-icons/go';

// Components

// Styles
import './Weather.scss';

interface LocationInterface {
  name: string;
  region: string;
  country: string;
  localtime: string;
}

interface WeatherInterface {
  temp_c: string;
  temp_f: string;
  condition: {
    text: string;
    icon: string;
  };
  wind_mph: string;
  wind_kph: string;
  wind_degree: string;
  wind_dir: string;
  precip_mm: string;
  precip_in: string;
  humidity: string;
  cloud: string;
  feelslike_c: string;
  feelslike_f: string;
  vis_km: string;
  vis_miles: string;
  uv: string;
  gust_mph: string;
  gust_kph: string;
}

interface WeatherProps {
  location: LocationInterface;
  weather: WeatherInterface;
  current?: boolean;
  history: any;
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const Weather: React.FC<WeatherProps> = ({
  weather,
  location,
  current,
  history,
}): ReactElement => {
  const { name, country, localtime } = location;

  const { temp_c, condition, wind_kph, precip_mm, humidity } = weather;

  const date = new Date(localtime);

  return (
    <div className='container'>
      <div className='weather-side'>
        <div className='weather-gradient'></div>
        <div className='date-container'>
          <h2 className='date-dayname'>
            {date.toLocaleString('en-uk', { weekday: 'long' })}
          </h2>
          <span className='date-day'>
            {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
          </span>
          <i className='location-icon' data-feather='map-pin'></i>
          <span className='location'>
            <GoLocation /> {name}, {country}
          </span>
        </div>
        <div className='weather-container'>
          <img className='weather-icon' src={condition.icon} alt='' />
          <h1 className='weather-temp'>{temp_c}&#8451;</h1>
          <h3 className='weather-desc'>{condition.text}</h3>
        </div>
      </div>
      <div className='info-side'>
        <div className='today-info-container'>
          <div className='today-info'>
            <div className='precipitation'>
              {' '}
              <span className='title'>PRECIPITATION </span>
              <span className='value'>{precip_mm} mm</span>
              <div className='clear'></div>
            </div>
            <div className='humidity'>
              {' '}
              <span className='title'>HUMIDITY</span>
              <span className='value'>{humidity} %</span>
              <div className='clear'></div>
            </div>
            <div className='wind'>
              {' '}
              <span className='title'>WIND</span>
              <span className='value'>{wind_kph} km/h</span>
              <div className='clear'></div>
            </div>
          </div>
        </div>

        <div className='week-container'>
          <ul className='week-list'>
            <h3 style={{ textAlign: 'center' }}>History</h3>
            {history &&
              history.slice(0, 5).map((instance: any) => {
                const date = new Date(instance.last_updated);

                return (
                  <li className='active'>
                    <img src={instance.condition.icon} alt='' />

                    <span className='day-name'>
                      {date.toLocaleString('en-uk', {
                        weekday: 'long',
                      })}{' '}
                      {date.getDate()} {months[date.getMonth()]}
                    </span>
                    <span className='day-temp'>{temp_c}&#8451;</span>
                  </li>
                );
              })}
            <div className='clear'></div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Weather;
