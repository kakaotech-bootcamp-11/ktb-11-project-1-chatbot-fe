import { useQuery } from "@tanstack/react-query";

interface TodayWeatherNow {
  temp: number;
  tempMin: number;
  tempMax: number;
  icon: string;
  description: string;
}

interface WeatherForecast {
  temp: number;
  tempMin: number;
  tempMax: number;
  weatherIcon: string;
  dateTime: string;
}

export interface TodayWeatherResponse {
  now: TodayWeatherNow;
  after: WeatherForecast[];
}

const getWeather = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/weather`,
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
export const useTodayWeatherQuery = () => {
  return useQuery<TodayWeatherResponse>({
    queryKey: ["weather", "today"],
    queryFn: () => getWeather(),
  });
};
