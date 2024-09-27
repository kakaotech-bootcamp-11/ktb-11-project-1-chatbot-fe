import CalendarWidget from "./CalendarWidget";
import MeetingWidget from "./MeetingWidget";
import RestaurantWidget from "./RestaurantWidget";
import WeatherWidget from "./WeatherWidget";

export default function Widget() {
  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-y-auto px-1 rounded-xl">
      <MeetingWidget />
      <RestaurantWidget />
      <WeatherWidget />
      <CalendarWidget />
    </div>
  );
}
