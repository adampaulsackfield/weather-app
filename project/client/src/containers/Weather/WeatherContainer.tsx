import React, { ReactElement, useState } from 'react';
// Components

// Styles
import './WeatherContainer.scss';
import Weather from '../../components/Weather/Weather';
import { getWeather } from '../../api/Weather.api';

const initialState = {
  name: '',
};

const WeatherContainer: React.FC = (): ReactElement => {
  const [location, setLocation] = useState(initialState);
  const [weather, setWeather] = useState<any | undefined>(undefined);
  const [historicalWeather, setHistoricalWeather] = useState<
    Array<Object> | undefined
  >(undefined);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (location.name === '') {
      console.log('Nothing to search...');
    }

    console.log(location);
    const response = await getWeather(location);

    setWeather(response.weather);
    setHistoricalWeather(response.historicalData);

    setLocation(initialState);
  };

  return (
    <div className='app'>
      <section className='search'>
        <h1 className='search__header'>Weather App</h1>

        <form className='search__form'>
          <input
            type='text'
            placeholder='Enter a location: Example "Manchester"'
            value={location.name}
            onChange={(e: any) => setLocation({ name: e.target.value })}
            className='search__input'
          />

          <button
            className='search__button'
            onClick={(e: any) => handleSubmit(e)}
          >
            Get Weather
          </button>
        </form>
      </section>

      <section className='weather'>
        {weather && (
          <Weather
            location={weather.location}
            weather={weather.current}
            history={historicalWeather}
            current={true}
          />
        )}

        {/* {historicalWeather &&
          historicalWeather.map((instance: any) => (
            <Weather location={weather.location} weather={instance} />
          ))} */}
      </section>
    </div>
  );
};

export default WeatherContainer;
