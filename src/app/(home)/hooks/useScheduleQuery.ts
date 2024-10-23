import { useQuery } from "@tanstack/react-query";

export interface ScheduleResponse {
  date: string;
  scheduleList: ScheduleInfo[];
}
interface ScheduleInfo {
  name: string;
  tag: "CODDING_TEST" | "LESSON" | "HOLIDAY";
}

const getScheduleForMonth = async (day: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/schedule?day=${day}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: ScheduleResponse[] = await response.json();
  return data || [];
};
export const useScheduleQuery = (day: string) => {
  const schedules = useQuery<ScheduleResponse[]>({
    queryKey: ["schedule", day],
    queryFn: () => getScheduleForMonth(day),
  });
  return schedules || [];
};
