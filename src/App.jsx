import { useEffect, useState } from 'react';
import { DataComponent } from './components/Data';
import { NavComponent } from './components/Navbar';
import { Map } from './components/Map';
import './App.css';

function App() {
  const DEFAULT_LATITUDE = 40.7128; // Example: New York City latitude
  const DEFAULT_LONGITUDE = -74.0060; // Example: New York City longitude

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(DEFAULT_LATITUDE);
  const [longitude, setLongitude] = useState(DEFAULT_LONGITUDE);
  const [result, setResult] = useState(false);

  const handleMarkerPositionChange = (newPosition) => {
    setLatitude(newPosition.lat);
    setLongitude(newPosition.lng);
    setResult(false);
    setLoading(true);
    fetchData(newPosition.lat, newPosition.lng);
  };

  const fetchData = async (lat = latitude, lng = longitude) => {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code,wind_speed_10m,soil_temperature_0cm,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
      setResult(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          fetchData(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // If geolocation is denied or fails, use default coordinates
          fetchData(DEFAULT_LATITUDE, DEFAULT_LONGITUDE);
        }
      );
    } else {
      // If geolocation is not supported, use default coordinates
      fetchData(DEFAULT_LATITUDE, DEFAULT_LONGITUDE);
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  if (loading) {
    return <div className='loading'><div className="loader"></div></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  if (result) {
    return (
      <>
        <NavComponent />
        <Map lat={latitude} lng={longitude} onMarkerPositionChange={handleMarkerPositionChange} />
        <DataComponent data={data} />
      </>
    );
  }

  return null; // Ensure that the function returns something in all cases
}

export default App;
