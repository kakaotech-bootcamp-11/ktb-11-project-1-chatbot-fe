import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfileQuery } from "../../hooks/useUserProfileQuery";
import Loading from "@/app/components/loading";
import Addr from "./KakaoAddress";

export default function UserProfile() {
  const { data: userProfile } = useUserProfileQuery();

  if (!userProfile) return <Loading />;

  return (
    <div className="flex flex-col w-full h-full justify-center p-6 items-center text-white space-y-4">
      <div className="font-blod text-2xl">사용자 정보</div>
      <div className="flex flex-row w-full items-center gap-2">
        <Avatar className="flex-shrink-0 w-10 h-10 border">
          <AvatarFallback>JD</AvatarFallback>
          <AvatarImage src={userProfile.profileImage} />
        </Avatar>
        <div className="flex flex-col justify-center items-center">
          <div className="">{userProfile.username}</div>
        </div>
      </div>
      <Addr />
    </div>
  );
}
