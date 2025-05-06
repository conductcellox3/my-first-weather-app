'use client';

import Image from "next/image";
import { useState } from 'react';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();

    console.log(data); //Check API response

    setWeather(data);
  };

  return (
    <div className="p-10">
      <h1 className="text-3x1 font-bold">初心者向け天気予報アプリ</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <input 
        className="border p-2"
        type="text"
        placeholder="都市名を入力(例:Tokyo)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        />
      <button className="m1-2 bg-blue-500 text-white p-2 rounded">
        天気を見る
      </button>
      </form>

    {weather && weather.weather && (
      <div className="mt-4">
        <p className="text-x1">
          {weather.name}の天気: {weather.weather[0].description}
        </p>
        <p className="text-lg">
          気温: {weather.main.temp}℃
        </p>
      </div> 
    )}


    </div>
  );
}
