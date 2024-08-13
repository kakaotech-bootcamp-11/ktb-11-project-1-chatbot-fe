import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import Loading from "@/app/components/loading";
import { useTodayWeatherQuery } from "../hooks/useTodayWeatherQuery";
import { useWeeklyWeatherQuery } from "../hooks/useWeeklyWeatherQuery";
import { Skeleton } from "@/components/ui/skeleton";

export default function WeatherWidget() {
  const { data: todayWeather } = useTodayWeatherQuery();
  const { data: weeklyWeather } = useWeeklyWeatherQuery();

  return (
    <div className="flex flex-col bg-[#1e2836] rounded-xl h-1/2 w-full p-2 space-y-1">
      {todayWeather ? (
        <>
          <div className="flex flex-row items-center justify-between w-full p-1">
            <div className="font-light">오늘 교육장 날씨는?</div>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/img/w/${todayWeather.now.icon}.png`}
              alt="날씨 아이콘"
              style={{ width: "auto", height: "auto" }}
              width={36}
              height={36}
            />
          </div>
          <div className="text-xs font-light text-gray-400">
            (위치: 유스페이스1 기준)
          </div>
          <div className="flex flex-row items-center justify-between p-1">
            <div className="text-xl">
              {Math.round(todayWeather.now.temp!)}°C
            </div>
            <div className="flex flex-col text-sm font-light">
              <div className="text-xs text-right">
                {todayWeather.now.description}
              </div>
              <div>
                최고: {Math.round(todayWeather.now.temp_max)}°C 최저:{" "}
                {Math.round(todayWeather.now.temp_min)}°C
              </div>
            </div>
          </div>
          <Separator className="bg-gray-700" />
          <div className="flex flex-row items-center justify-around text-xs">
            {todayWeather?.after.map((item, index) => (
              <div key={index} className="flex flex-col items-center p-1">
                <div className="text-gray-300">
                  {new Date(item.dateTime).getHours()}시
                </div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/img/w/${item.weatherIcon}.png`}
                  alt="날씨 아이콘"
                  style={{ width: "auto", height: "100%" }}
                  width={24}
                  height={24}
                />
                <div className="text-xs">{Math.round(item.temp)}°C</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col space-y-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-8 w-full" />
          <div className="flex justify-around">
            <Skeleton className="h-12 w-12" />
            <Skeleton className="h-12 w-12" />
            <Skeleton className="h-12 w-12" />
            <Skeleton className="h-12 w-12" />
          </div>
        </div>
      )}

      <Separator className="bg-gray-700" />

      <div className="flex flex-col pr-4 space-y-1 overflow-y-auto text-sm custom-scrollbar">
        {weeklyWeather ? (
          <>
            {weeklyWeather.map((item, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-between"
              >
                <div className="flex flex-row justify-around w-1/2">
                  <div className="flex flex-col items-center">
                    <div>{item.day[0]}</div>
                    <div className="text-xs text-gray-400">{"8/12"}</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/img/w/${item.icon}.png`}
                      alt="날씨 아이콘"
                      style={{ width: "auto", height: "auto" }}
                      width={32}
                      height={32}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div>
                    {Math.round(item.min_temp)}°C / {Math.round(item.max_temp)}
                    °C
                  </div>
                  <div className="text-xs text-gray-400">{"실비"}</div>
                </div>
                <div className="text-right">
                  <span className="text-blue-400">{item.rain * 100}%</span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col space-y-2 w-full h-full">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
