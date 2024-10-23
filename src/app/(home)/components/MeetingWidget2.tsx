import Image from "next/image";
import meetingRoomLocation from "../../../../public/images/meeting-room-location.png";

export default function MeetingWidget2() {
  return (
    <div className="flex flex-col w-full gap-2 p-2 bg-white text-black text-xs rounded-2xl">
      {/* <iframe
        src="https://docs.google.com/spreadsheets/d/10m-JZM2eRbgQepXGJflreGVR09i0RW2Mu3Ozo_VkQRs/edit?gid=395719802#gid=395719802"
        width="200%"
        height="600px"
        allowFullScreen
        style={{
          transform: "scale(0.5)",
          transformOrigin: "0 0",
        }}
      ></iframe> */}
      <a
        className="text-center text-lg text-black underline"
        href="https://docs.google.com/spreadsheets/d/10m-JZM2eRbgQepXGJflreGVR09i0RW2Mu3Ozo_VkQRs/edit?gid=395719802#gid=395719802"
        target="_blank"
        rel="noopener noreferrer"
      >
        회의실 예약하러 가기
      </a>
      <div className="flex flex-col justify-center items-center gap-2">
        <Image
          className="object-contain rounded-lg"
          src={meetingRoomLocation}
          alt="meetingRoomLocation"
        />
      </div>
    </div>
  );
}
