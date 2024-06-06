import React, { useState, useEffect } from 'react';
import { GraphsComponent } from './Graphs';
import { FiltersComponent } from './Filters';
import { Map } from './Map';
export const DataComponent = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [filter, setFilter] = useState("");
    //conseder permisos de geolocalizacion
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}${filter}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code,wind_speed_10m,soil_temperature_0cm,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <>
            <Map lat={latitude} log={longitude} />
            
            <div className='wrapper-current'>
                <h2>Información meteorológica actual</h2>
                <div className="current">
                    <div className="variable">
                        <h3>Temperatura</h3>
                        <p>{data.current.temperature_2m} °C</p>
                    </div>
                    <div className="variable">
                        <h3>Humedad</h3>
                        <p>{data.current.relative_humidity_2m} %</p>
                    </div>
                    <div className="variable">
                        <h3>Precipitación</h3>
                        <p>{data.current.precipitation} mm</p>
                    </div>
                    <div className="variable">
                        <h3>Presión</h3>
                        <p>{data.current.pressure_msl} hPa</p>
                    </div>
                    <div className="variable">
                        <h3>Viento</h3>
                        <p>{data.current.wind_speed_10m} m/s</p>
                    </div>
                    <div className="variable">
                        <h3>Dirección del viento</h3>
                        <p>{data.current.wind_direction_10m} °</p>
                    </div>
                </div>

                <GraphsComponent data={data.hourly} />
            </div>
        </>
    )
}