import Image from "next/image";
import { useWeatherQuery } from "../hooks/useWeatherOpenAPIQuery";
import { Separator } from "@/components/ui/separator";
import {
  useWeeklyWeatherQuery,
  WeatherForecast,
} from "../hooks/useWeeklyWeatherQuery";
import { useEffect, useState } from "react";
import Loading from "@/app/components/loading";
import { Skeleton } from "@/components/ui/skeleton";

interface TodayList {
  time: string;
  iconCode: string;
  temperature: string;
}
interface WeekList {
  day: string;
  date: string;
  iconCode: string;
  minTemperature: string;
  maxTemperature: string;
  pop: number;
  description: string;
}

export default function WeatherWidget() {
  const { data } = useWeeklyWeatherQuery();

  const [hourlyList, setHourlyList] = useState<TodayList[]>([]);
  const [weekList, setWeekList] = useState<WeekList[]>([]);

  // useEffect(() => {
  //   if (data) {
  //     // 현재 시간 이후의 6개 데이터
  //     const now = new Date();
  //     const hourlyData = data.list
  //       .filter((item) => new Date(item.dt * 1000) > now)
  //       .slice(0, 6);
  //     setHourlyList(
  //       hourlyData.map((item) => ({
  //         time: new Date(item.dt * 1000).getHours() + "시",
  //         iconCode: item.weather[0].icon,
  //         temperature: Math.round(item.main.temp).toString(),
  //       }))
  //     );

  //     // 5일간의 날씨 데이터
  //     const dailyData = data.list
  //       .filter((item) => item.dt_txt.endsWith("12:00:00"))
  //       .slice(0, 5);
  //     setWeekList(
  //       dailyData.map((item) => {
  //         const date = new Date(item.dt * 1000);
  //         return {
  //           day: ["일", "월", "화", "수", "목", "금", "토"][date.getDay()],
  //           date: `${date.getMonth() + 1}/${date.getDate()}`,
  //           iconCode: item.weather[0].icon,
  //           minTemperature: Math.round(item.main.temp_min).toString(),
  //           maxTemperature: Math.round(item.main.temp_max).toString(),
  //           pop: Math.round(item.pop * 100), // 강수 확률
  //           description: item.weather[0].description,
  //         };
  //       })
  //     );
  //   }
  // }, [data]);

  useEffect(() => {
    if (data) {
      // 현재 시간 이후의 6개 데이터
      const now = new Date();
      const hourlyData = data.list
        .filter((item) => new Date(item.dt * 1000) > now)
        .slice(0, 6);
      setHourlyList(
        hourlyData.map((item) => ({
          time: new Date(item.dt * 1000).getHours() + "시",
          iconCode: item.weather[0].icon,
          temperature: Math.round(item.main.temp).toString(),
        }))
      );

      // 5일간의 날씨 데이터
      const dailyDataMap: { [key: string]: WeatherForecast[] } = {};

      data.list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const dateString = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;

        if (!dailyDataMap[dateString]) {
          dailyDataMap[dateString] = [];
        }

        dailyDataMap[dateString].push(item);
      });

      const dailyData = Object.entries(dailyDataMap)
        .slice(0, 5)
        .map(([dateString, forecasts]) => {
          const date = new Date(dateString);
          let minTemp = Number.POSITIVE_INFINITY;
          let maxTemp = Number.NEGATIVE_INFINITY;
          let iconCode = forecasts[0].weather[0].icon;
          let description = forecasts[0].weather[0].description;

          forecasts.forEach((forecast) => {
            if (forecast.main.temp_min < minTemp) {
              minTemp = forecast.main.temp_min;
            }
            if (forecast.main.temp_max > maxTemp) {
              maxTemp = forecast.main.temp_max;
            }
          });

          return {
            day: ["일", "월", "화", "수", "목", "금", "토"][date.getDay()],
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            iconCode: iconCode,
            minTemperature: Math.round(minTemp).toString(),
            maxTemperature: Math.round(maxTemp).toString(),
            pop: Math.round(forecasts[0].pop * 100), // 강수 확률
            description: description,
          };
        });

      setWeekList(dailyData);
    }
  }, [data]);

  if (!data) {
    return <Skeleton className="h-full w-full" />;
  }

  const currentWeather = data.list[0];
  const currentTemp = Math.round(currentWeather.main.temp);
  const maxTemp = Math.round(currentWeather.main.temp_max);
  const minTemp = Math.round(currentWeather.main.temp_min);

  return (
    <div className="flex flex-col bg-[#1e2836] rounded-xl h-full w-full p-2 space-y-1 overflow-y-auto">
      <div className="flex flex-row justify-between p-1 w-full items-center">
        <div className="font-light">오늘 교육장 날씨는?</div>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/img/w/${currentWeather.weather[0].icon}.png`}
          alt="날씨 아이콘"
          style={{ width: "auto", height: "100%" }}
          width={32}
          height={32}
        />
      </div>
      <div className="flex flex-row items-center p-1 justify-between">
        <div className="text-xl">{currentTemp}°C</div>
        <div className="flex flex-col font-light text-sm">
          <div className="text-right text-xs">
            {currentWeather.weather[0].description}
          </div>
          <div>
            최고: {maxTemp}°C 최저: {minTemp}°C
          </div>
        </div>
      </div>
      <Separator className="bg-gray-700" />
      <div className="flex flex-row text-xs items-center justify-around">
        {hourlyList.map((item, index) => (
          <div key={index} className="flex flex-col items-center p-1">
            <div className="text-gray-300">{item.time}</div>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/img/w/${item.iconCode}.png`}
              alt="날씨 아이콘"
              style={{ width: "auto", height: "100%" }}
              width={24}
              height={24}
            />
            <div className="text-xs">{item.temperature}°C</div>
          </div>
        ))}
      </div>
      <Separator className="bg-gray-700" />
      <div className="text-sm overflow-y-auto">
        {weekList.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between"
          >
            <div className="flex flex-row justify-around w-1/2">
              <div className="flex flex-col items-center">
                <div>{item.day}</div>
                <div className="text-xs text-gray-400">{item.date}</div>
              </div>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/img/w/${item.iconCode}.png`}
                alt="날씨 아이콘"
                style={{ width: "auto", height: "100%" }}
                width={32}
                height={32}
              />
            </div>
            <div className="flex flex-col items-center">
              <div>
                {item.minTemperature}°C / {item.maxTemperature}°C
              </div>
              <div className="text-xs text-gray-400">{item.description}</div>
            </div>
            <div className="text-right">
              <span className="text-blue-400">{item.pop}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
