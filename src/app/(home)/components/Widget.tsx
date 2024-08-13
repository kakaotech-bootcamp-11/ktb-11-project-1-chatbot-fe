"use client";

import { useWeatherQuery } from "../hooks/useWeatherOpenAPIQuery";
import TraffixWidget from "./TraffixWidget";
import WeatherWidget from "./WeatherWidget";

export default function Widget() {
  return (
    <div className="flex flex-col gap-2 rounded-xl w-full h-full">
      <WeatherWidget />
      <TraffixWidget />
    </div>
  );
}
