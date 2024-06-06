


import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export const GraphsComponent = (props) => {
  const data = props.data;
  if (!data) {
    return (
      <div>
        <h1>error</h1>
      </div>
    );
  }

  const temperatureData = data.temperature_2m.map((temp, index) => ({
    time: data.time[index],
    temperature: temp,
  }));

  const windSpeedData = data.wind_speed_10m.map((speed, index) => ({
    time: data.time[index],
    windSpeed: speed,
  }));

  const soilTemperatureData = data.soil_temperature_0cm.map((soilTemp, index) => ({
    time: data.time[index],
    soilTemperature: soilTemp,
  }));

  const uvIndexData = data.uv_index.map((uv, index) => ({
    time: data.time[index],
    uvIndex: uv,
  }));
  


  return (
    <>
      <div className="wrapper-graphs">
        <div className="graph">
          <LineChart width={500} height={300} data={temperatureData}>
            <CartesianGrid />
            <XAxis dataKey="time" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#F61E36"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        <div className="graph">
          <LineChart width={500} height={300} data={windSpeedData}>
            <CartesianGrid />
            <XAxis dataKey="time" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="windSpeed"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        <div className="graph">
          <LineChart width={500} height={300} data={soilTemperatureData}>
            <CartesianGrid />
            <XAxis dataKey="time" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="soilTemperature"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        <div className="graph">
          <LineChart width={500} height={300} data={uvIndexData}>
            <CartesianGrid />
            <XAxis dataKey="time" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="uvIndex"
              stroke="#F61E36"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>

      </div>



    </>
  );

}