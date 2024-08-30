import { useQuery } from "@tanstack/react-query";

export interface ScheduleResponse {
  date: string;
  description: string[];
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
  // return response.json();
};
export const useScheduleQuery = (day: string) => {
  const schedules = useQuery<ScheduleResponse[]>({
    queryKey: ["schedule", day],
    queryFn: () => getScheduleForMonth(day),
    // retry: 1,
    // select: (data) => data ?? [],
    // placeholderData: keepPreviousData,
  });
  return schedules || [];
};
