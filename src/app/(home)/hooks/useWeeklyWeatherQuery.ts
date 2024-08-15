import { useQuery } from "@tanstack/react-query";

interface WeeklyWeatherResponse {
  day: string;
  date: string;
  icon: string;
  avg_temp: number;
  max_temp: number;
  min_temp: number;
  humidity: number;
  description: string;
}

const getWeaklyWeather = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/weather/week`,
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
  return useQuery<WeeklyWeatherResponse[]>({
    queryKey: ["weather", "weekly"],
    queryFn: () => getWeaklyWeather(),
  });
};
