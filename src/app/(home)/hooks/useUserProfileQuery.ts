import { useQuery } from "@tanstack/react-query";

export interface UserProfileResponse {
  username: string;
  profileImage: string;
  address: string;
}

const getMyProfile = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/setting/userinfo`,
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
export const useUserProfileQuery = () => {
  return useQuery<UserProfileResponse>({
    queryKey: ["myProfile"],
    queryFn: () => getMyProfile(),
  });
};
