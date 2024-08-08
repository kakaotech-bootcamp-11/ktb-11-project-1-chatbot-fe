import { useQuery } from "@tanstack/react-query";

interface Coordinates {
  /** 경도 */
  lon: number;
  /** 위도 */
  lat: number;
}

interface Weather {
  /** Weather condition id */
  id: number;
  /** 날씨 파라미터 그룹(Rain, Snow, Clouds 등) */
  main: string;
  /** 그룹 내 기후조건.(Lang=KR) */
  description: string;
  /** 날씨 아이콘 코드 */
  icon: string;
}

interface Main {
  temp: number;
  /** 체감온도 */
  feels_like: number;
  /** 현재 최저 온도. 현재 관측되는 최소 온도(대도시 및 도시 지역 내) */
  temp_min: number;
  /** 현재 최고 온도. 현재 관측되는 최대 온도(대도시 및 도시 지역 내) */
  temp_max: number;
  /** 해수면의 대기압, hPa */
  pressure: number;
  /** 습기, % */
  humidity: number;
  /** 해수면 */
  sea_level?: number;
  /** 지표면의 대기압 */
  grnd_level?: number;
}

interface Wind {
  /** 풍속 meter/sec */
  speed: number;
  /** 풍향 */
  deg: number;
  /** 돌풍 meter/sec */
  gust?: number;
}

interface Clouds {
  /** cloudines, % */
  all: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  /** 일출 시간, unix, UTC */
  sunrise: number;
  /** 일몰 시간, unix, UTC */
  sunset: number;
}

interface WeatherData {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: Main;
  /** 가시성의 최대값은 10km입니다. */
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  /** UTC에서 초 단위로 이동 */
  timezone: number;
  /** 도시 ID */
  id: number;
  /** 도시 이름 */
  name: string;
  cod: number;
}

const getWeather = async () => {
  const response = await fetch(
    `/data/2.5/weather?lat=37.40013636554196&lon=127.1067841722373&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric&lang=kr`,
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
export const useWeatherQuery = () => {
  return useQuery<WeatherData>({
    queryKey: ["weather", "ktb"],
    queryFn: () => getWeather(),
  });
};
