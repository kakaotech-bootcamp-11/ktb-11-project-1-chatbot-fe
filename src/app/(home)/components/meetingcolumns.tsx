"use client";

interface ReservationInfo {
  name: string;
  reason: string;
}

interface Room {
  timeSlot: string;
  RYAN2: ReservationInfo | null;
  RYAN3: ReservationInfo | null;
  SANGBAE1: ReservationInfo | null;
  SANGBAE2: ReservationInfo | null;
  GOORMEE2: ReservationInfo | null;
  GOORMEE3: ReservationInfo | null;
}

// import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "timeSlot",
    header: "시간",
    cell: (info) => info.getValue(),
    // enableHiding: true,
  },
  {
    accessorKey: "RYAN2",
    header: "RYAN2",
    cell: ({ row }) => {
      const reservation = row.getValue("RYAN2") as ReservationInfo | null;
      return reservation ? (
        <div>
          <div>{reservation.name}</div>
          <div>{reservation.reason}</div>
        </div>
      ) : (
        <div>사용 가능</div>
      );
    },
  },
  {
    accessorKey: "RYAN3",
    header: "RYAN3",
    cell: ({ row }) => {
      const reservation = row.getValue("RYAN3") as ReservationInfo | null;
      return reservation ? (
        <div>
          <div>{reservation.name}</div>
          <div>{reservation.reason}</div>
        </div>
      ) : (
        <div>사용 가능</div>
      );
    },
  },
  {
    accessorKey: "SANGBAE1",
    header: "SANGBAE1",
    cell: ({ row }) => {
      const reservation = row.getValue("SANGBAE1") as ReservationInfo | null;
      return reservation ? (
        <div>
          <div>{reservation.name}</div>
          <div>{reservation.reason}</div>
        </div>
      ) : (
        <div>사용 가능</div>
      );
    },
  },
  {
    accessorKey: "SANGBAE2",
    header: "SANGBAE2",
    cell: ({ row }) => {
      const reservation = row.getValue("SANGBAE2") as ReservationInfo | null;
      return reservation ? (
        <div>
          <div>{reservation.name}</div>
          <div>{reservation.reason}</div>
        </div>
      ) : (
        <div>사용 가능</div>
      );
    },
  },
  {
    accessorKey: "GOORMEE2",
    header: "GOORMEE2",
    cell: ({ row }) => {
      const reservation = row.getValue("GOORMEE2") as ReservationInfo | null;
      return reservation ? (
        <div>
          <div>{reservation.name}</div>
          <div>{reservation.reason}</div>
        </div>
      ) : (
        <div>사용 가능</div>
      );
    },
  },
  {
    accessorKey: "GOORMEE3",
    header: "GOORMEE3",
    cell: ({ row }) => {
      const reservation = row.getValue("GOORMEE3") as ReservationInfo | null;
      return reservation ? (
        <div>
          <div>{reservation.name}</div>
          <div>{reservation.reason}</div>
        </div>
      ) : (
        <div>사용 가능</div>
      );
    },
  },
];
