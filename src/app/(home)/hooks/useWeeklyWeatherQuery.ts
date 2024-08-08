import { useQuery } from "@tanstack/react-query";

export interface WeatherForecast {
  dt: number;
  main: MainWeatherData;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  "3h": number;
}

interface Sys {
  pod: string;
}

interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coordinates {
  lat: number;
  lon: number;
}

interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecast[];
  city: City;
}

const getWeaklyWeather = async () => {
  const response = await fetch(
    `/weather/data/2.5/forecast?lat=37.40013636554196&lon=127.1067841722373&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric&lang=KR`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
export const useWeeklyWeatherQuery = () => {
  return useQuery<WeatherResponse>({
    queryKey: ["weeklyWeather", "ktb"],
    queryFn: () => getWeaklyWeather(),
  });
};
