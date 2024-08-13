import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserProfile() {
  return (
    <div className="flex flex-col w-full h-full justify-center p-2 items-center text-white">
      <div className="flex flex-row w-full justify-start items-center gap-2">
        <Avatar className="flex-shrink-0 w-10 h-10 border">
          <AvatarFallback>JD</AvatarFallback>
          <AvatarImage src="/images/ktb_balloon_logo.jpeg" />
        </Avatar>
        <div className="flex flex-col justify-center items-center">
          <div className="">강창룡</div>
        </div>
      </div>
    </div>
  );
}
