import { useEffect, useState } from 'react'
import { DataComponent } from './components/Data';
import { NavComponent } from './components/Navbar'
import { Map } from './components/Map'
import './App.css'



function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [result, setResult] = useState(false);

  const handleMarkerPositionChange = (newPosition) => {
    setLatitude(newPosition.lat);
    setLongitude(newPosition.lng);
    setResult(false);
    setLoading(true);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code,wind_speed_10m,soil_temperature_0cm,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset`);
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
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        fetchData();

      });
    } else {
      
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

}


export default App
