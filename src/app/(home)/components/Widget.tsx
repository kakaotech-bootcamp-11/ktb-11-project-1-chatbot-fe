import CalendarWidet from "./CalendarWidget";
import WeatherWidget from "./WeatherWidget";

export default function Widget() {
  return (
    <div className="flex flex-col gap-2 rounded-xl w-full h-full">
      <WeatherWidget />
      <CalendarWidet />
    </div>
  );
}
