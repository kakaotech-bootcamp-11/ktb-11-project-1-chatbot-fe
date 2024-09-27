import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MeetingDialog from "./MeetingDialog";
import MeetingDataTable from "./MeetingDataTable";
import { RotateCw } from "lucide-react";
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ExternalLink } from "lucide-react";

type ReservationInfo = {
  startTime: string;
  endTime: string;
  team_num: number;
};

type MeetingRoom = {
  id: number;
  name: string;
  reservationInfo: ReservationInfo[];
};

export default function MeetingWidget() {
  const meetingRooms: MeetingRoom[] = [
    {
      id: 1,
      name: "RYAN2",
      reservationInfo: [
        // { startTime: "09:00", endTime: "10:00", team_num: 1 },
        // { startTime: "11:00", endTime: "12:00", team_num: 2 },
      ],
    },
    {
      id: 2,
      name: "RYAN3",
      reservationInfo: [
        { startTime: "10:00", endTime: "11:30", team_num: 3 },
        { startTime: "13:00", endTime: "14:00", team_num: 4 },
      ],
    },
    {
      id: 3,
      name: "SANGBAE1",
      reservationInfo: [
        { startTime: "09:30", endTime: "10:30", team_num: 5 },
        { startTime: "15:00", endTime: "16:00", team_num: 6 },
      ],
    },
    {
      id: 4,
      name: "SANGBAE2",
      reservationInfo: [
        { startTime: "10:30", endTime: "11:30", team_num: 7 },
        { startTime: "14:00", endTime: "15:00", team_num: 8 },
      ],
    },
    {
      id: 5,
      name: "GOORMEE2",
      reservationInfo: [
        { startTime: "12:00", endTime: "13:00", team_num: 9 },
        { startTime: "16:00", endTime: "17:00", team_num: 10 },
      ],
    },
    {
      id: 6,
      name: "GOORMEE3",
      reservationInfo: [
        { startTime: "09:15", endTime: "10:15", team_num: 11 },
        { startTime: "14:30", endTime: "15:30", team_num: 12 },
      ],
    },
  ];

  return (
    <Dialog>
      <DialogContent className="min-w-[800px] h-full overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>회의실 현황 (9월 23일 목요일)</DialogTitle>
          {/* <MeetingDialog /> */}
          <MeetingDataTable />
        </DialogHeader>
      </DialogContent>
      {/* bg-[#1e2836] */}
      <Carousel className="flex flex-col rounded-xl justify-stretch pt-3 w-full bg-[#1e2836] shadow-lg text-black text-sm">
        <CarouselNext className="absolute right-2 top-8 text-black" />
        <CarouselPrevious className="absolute left-2 top-8 text-black" />
        <div className="flex justify-evenly items-center">
          <DialogTrigger className="flex items-center gap-2 text-base font-bold text-white text-center py-2">
            <ExternalLink size={20} />
            자세히 보기
            <span className="text-xs font-normal text-gray-200">
              {" "}
              (시범 위젯입니다.)
            </span>
          </DialogTrigger>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2">
          {meetingRooms.map((room) => (
            <div
              key={room.id}
              className="bg-slate-200 p-2 rounded shadow-xl overflow-y-auto"
            >
              <h2 className="font-bold text-lg">{room.name}</h2>
              {room.reservationInfo.length > 0 ? (
                <ul>
                  {room.reservationInfo.map((reservation, index) => (
                    <li
                      key={index}
                      // className="mb-1 border rounded-full border-red-500"
                    >
                      <span className="font-semibold">
                        {reservation.startTime}
                      </span>{" "}
                      -{" "}
                      <span className="font-semibold">
                        {reservation.endTime}
                      </span>
                      : {reservation.team_num}조
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  오늘 예정된 회의가 없습니다.
                </p>
              )}
            </div>
          ))}
        </div>
      </Carousel>
    </Dialog>
  );
}
