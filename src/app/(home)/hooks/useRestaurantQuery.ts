import { useQuery } from "@tanstack/react-query";

interface Place {
  name: string;
  kakaoMapUrl: string;
  recommendedBy: string | null;
  recommendation: string | null;
  images: string[];
}

const getRestaurant = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurant`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: Place[] = await response.json();
  return data || [];
};
export const useRestaurantQuery = () => {
  return useQuery<Place[]>({
    queryKey: ["restaurant"],
    queryFn: () => getRestaurant(),
  });
};
