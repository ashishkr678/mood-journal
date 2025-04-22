import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "http://api.weatherstack.com/current";

export const getWeather = async (coords) => {
  try {
    const { latitude, longitude } = coords;

    const { data } = await axios.get(BASE_URL, {
      params: {
        access_key: API_KEY,
        query: `${latitude},${longitude}`,
      },
    });

    const condition = data.current.weather_descriptions[0];
    const temp = data.current.temperature;
    const location = `${data.location.name}, ${data.location.region}`;

    return { condition, temp, location };
  } catch (error) {
    console.error("Weather fetch failed:", error.message);
    return null;
  }
};
