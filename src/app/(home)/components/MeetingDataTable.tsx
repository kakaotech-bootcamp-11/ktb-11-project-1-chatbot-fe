import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 정제된 meetingRooms 데이터
const meetingRooms: any = {
  RYAN2: {
    "10:00~10:30": { name: "ryan.kim(김현중)", reason: "16조/오프라인" },
    "10:30~11:00": { name: "ryan.kim(김현중)", reason: "16조/오프라인" },
    "11:00~11:30": { name: "ryan.kim(김현중)", reason: "16조/오프라인" },
    "13:00~13:30": { name: "woo.jeong(정우용)", reason: "팀(오프라인)" },
    "13:30~14:00": { name: "woo.jeong(정우용)", reason: "팀(오프라인)" },
    "14:00~14:30": { name: "woo.jeong(정우용)", reason: "팀(오프라인)" },
    "14:30~15:00": { name: "woo.jeong(정우용)", reason: "팀(오프라인)" },
  },
  RYAN3: {
    "10:30~11:00": { name: "sean.park(박시현)", reason: "오프라인" },
    "11:00~11:30": { name: "sean.park(박시현)", reason: "오프라인" },
    "11:30~12:00": { name: "sean.park(박시현)", reason: "오프라인" },
  },
  SANGBAE1: {
    "14:00~14:30": { name: "sofia.park(박수현)", reason: "오프라인" },
    "14:30~15:00": { name: "sofia.park(박수현)", reason: "오프라인" },
    "15:00~15:30": { name: "sofia.park(박수현)", reason: "오프라인" },
    "15:30~16:00": { name: "sofia.park(박수현)", reason: "오프라인" },
  },
  SANGBAE2: {
    "13:00~13:30": { name: "heather.shim(심혜수)", reason: "5조/오프라인" },
    "13:30~14:00": { name: "heather.shim(심혜수)", reason: "5조/오프라인" },
    "14:00~14:30": { name: "heather.shim(심혜수)", reason: "5조/오프라인" },
    "14:30~15:00": { name: "heather.shim(심혜수)", reason: "5조/오프라인" },
    "18:00~18:30": { name: "Lyle.kim(김승주)", reason: "오프라인" },
  },
  GOORMEE2: {
    "10:00~10:30": { name: "ally.kim(김민지)", reason: "오프라인" },
    "10:30~11:00": { name: "ally.kim(김민지)", reason: "오프라인" },
    "11:00~11:30": { name: "ally.kim(김민지)", reason: "오프라인" },
    "11:30~12:00": { name: "ally.kim(김민지)", reason: "오프라인" },
    "19:00~19:30": { name: "nina.lee(이미나)", reason: "KDT/오프라인" },
    "19:30~20:00": { name: "nina.lee(이미나)", reason: "KDT/오프라인" },
    "20:00~20:30": { name: "nina.lee(이미나)", reason: "KDT/오프라인" },
    "20:30~21:00": { name: "nina.lee(이미나)", reason: "KDT/오프라인" },
  },
  GOORMEE3: {
    "10:30~11:00": { name: "toby.kim(김대현)", reason: "14조/오프라인" },
    "11:00~11:30": { name: "toby.kim(김대현)", reason: "14조/오프라인" },
    "11:30~12:00": { name: "toby.kim(김대현)", reason: "14조/오프라인" },
    "13:30~14:00": { name: "nunu.gu(구연우)", reason: "오프라인" },
    "14:00~14:30": { name: "nunu.gu(구연우)", reason: "오프라인" },
    "14:30~15:00": { name: "nunu.gu(구연우)", reason: "오프라인" },
  },
};

const MeetingDataTable = () => {
  const rooms = Object.keys(meetingRooms);
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

  return (
    <Table>
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
            <TableCell className="font-medium bg-gray-200 border-r border-y border-y-gray-400 border-gray-300 text-xs w-24">
              {time}
            </TableCell>
            {rooms.map((room) => {
              const reservation = meetingRooms[room][time];
              return (
                <TableCell
                  key={`${time}-${room}`}
                  className="p-0 border-r border-gray-300 border-y border-y-gray-400 w-1/6 text-xs"
                >
                  {reservation ? (
                    <div className="grid grid-rows-2 h-full">
                      <div className="border-b p-1 text-center">
                        {reservation.name}
                      </div>
                      <div className="p-1 text-center">
                        {reservation.reason}
                      </div>
                    </div>
                  ) : (
                    <div className="p-2 text-center"> </div>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MeetingDataTable;
