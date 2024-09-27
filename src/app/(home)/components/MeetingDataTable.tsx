import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MeetingDataTable = () => {
  const rooms = [
    "RYAN2",
    "RYAN3",
    "SANGBAE1",
    "SANGBAE2",
    "GOORMEE2",
    "GOORMEE3",
  ];
  const timeSlots = [
    "09:00~09:30",
    "09:30~10:00",
    "10:00~10:30",
    "10:30~11:00",
    "11:00~11:30",
    "11:30~12:00",
    "12:00~12:30",
    "12:30~13:00",
    "13:00~13:30",
    "13:30~14:00",
    "14:00~14:30",
    "14:30~15:00",
    "15:00~15:30",
    "15:30~16:00",
    "16:00~16:30",
    "16:30~17:00",
    "17:00~17:30",
    "17:30~18:00",
    "18:00~18:30",
    "18:30~19:00",
    "19:00~19:30",
    "19:30~20:00",
    "20:00~20:30",
    "20:30~21:00",
  ];

  // 더미 데이터 생성
  const generateDummyData = () => {
    const dummyData = {} as any;
    rooms.forEach((room) => {
      dummyData[room] = {};
      timeSlots.forEach((time) => {
        if (Math.random() > 0.7) {
          // 30% 확률로 예약 생성
          dummyData[room][time] = {
            name: `사용자${Math.floor(Math.random() * 100)}`,
            reason: `회의${Math.floor(Math.random() * 10)}`,
          };
        }
      });
    });
    return dummyData;
  };

  const reservations = generateDummyData();

  return (
    <Table>
      {/* <TableCaption>회의실 예약 현황</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="text-center bg-gray-200 text-black w-24">
            시간
          </TableHead>
          {rooms.map((room) => (
            <TableHead
              key={room}
              className="text-center bg-gray-200 text-black w-1/6"
            >
              {room}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {timeSlots.map((time) => (
          <TableRow key={time}>
            <TableCell className="font-medium bg-gray-200 border-r border-gray-300 text-xs w-24">
              {time}
            </TableCell>
            {rooms.map((room) => (
              <TableCell
                key={`${time}-${room}`}
                className="p-0 border-r border-gray-300 w-1/6"
              >
                <div className="grid grid-rows-2 h-full">
                  <div className="border-b p-1 text-center">
                    {reservations[room][time]?.name || ""}
                  </div>
                  <div className="p-1 text-center">
                    {reservations[room][time]?.reason || ""}
                  </div>
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MeetingDataTable;
