'use client';

import Image from "next/image";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setWeather(null);

    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        console.log(data); //check API response. use F12 on browser.
      } else {
        setError('都市が見つかりませんでした');
      }
    } catch(err) {
      setError('エラーが発生しました');
    }
  };

  //Animation settings
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.3 }
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-indigo-400 flex justify-center items-center">
      <div className="bg-white bg-opacity-80 p-8 rounded-2x1 shadow-2x1">
        <h1 className="text-3x1 font-bold text-center mb-6 text-gray-800">
          ☀初心者向け天気予報アプリ☁
        </h1>

        <form className="flex justify-center" onSubmit={handleSubmit}>
          <input
          className="p-3 border rounded-1-1g focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="都市名を入力(例:Tokyo)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          />
          <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-r-lg transition">
            天気を見る
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}

      <AnimatePresence>
        {weather && weather.weather && weather.weather[0] && (
          <motion.div
          className="mt-6 bg-white bg-opacity-90 rounded-xl shadow-lg p-6 text-center overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="hidden"
          >
            <motion.p
            className="text-2xl font-semibold mb-2"
            variants={variants}
            custom={0}
            >
              ⛅{weather.name}
            </motion.p>

            <motion.p
            className="text-xl text-gray-700 capitalize"
            variants={variants}
            custom={1}
            >
              {weather.weather[0].description}
            </motion.p>

            <motion.p
            className="text-xl mt-2"
            variants={variants}
            custom={2}
            >
              🌡気温: {weather.main.temp}℃
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>

  );
}
