import React, { useState, useEffect } from 'react';
import { GraphsComponent } from './Graphs';

export const DataComponent = ({data}) => {
    
    //conseder permisos de geolocalizacion
   
    return (
        <>
        
            <div className='wrapper-current'>
                <h2>Información meteorológica del marcador</h2>
                
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