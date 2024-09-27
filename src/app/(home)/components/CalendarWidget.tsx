"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import moment from "moment";
import {
  StyledCalendarWrapper,
  StyledCalendar,
  StyledDate,
  StyledToday,
  StyledDot,
} from "./styles";
import "moment/locale/ko";
import { useScheduleQuery } from "../hooks/useScheduleQuery";
import Loading from "@/app/components/loading";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarWidget() {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(
    new Date()
  );
  const [yearMonth, setYearMonth] = useState(moment(today).format("YYYY-MM"));

  const colors = [
    "blue",
    "emerald",
    "red",
    "orange",
    "yellow",
    "green",
  ] as const;
  type Color = (typeof colors)[number];
  const colorVariants: Record<Color, string> = {
    emerald: "text-emerald-700 bg-emerald-100 border-emerald-500",
    orange: "text-orange-700 bg-orange-100 border-orange-500",
    yellow: "text-yellow-700 bg-yellow-100 border-yellow-500",
    green: "text-green-700 bg-green-100 border-green-500",
    blue: "text-blue-700 bg-blue-100 border-blue-500",
    red: "text-red-700 bg-red-100 border-red-500",
  };

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };
  const handleTodayClick = () => {
    const today = new Date();
    setActiveStartDate(today);
    setDate(today);
    handleMonthChange(today);
  };
  const handleMonthChange = (newActiveStartDate: Date) => {
    setYearMonth(moment(newActiveStartDate).format("YYYY-MM"));
    setActiveStartDate(newActiveStartDate);
  };

  const { data: schedules } = useScheduleQuery(yearMonth);

  const getSchedulesForDate = (selectedDate: Date) => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    const foundData = schedules?.find(
      (schedule) => schedule.date === formattedDate
    );
    return foundData ? foundData.description : [];
  };

  const selectedDateSchedules = getSchedulesForDate(date as Date);

  return (
    <div className="flex flex-row w-full gap-1 p-2 bg-white rounded-2xl">
      <div className="flex flex-col w-1/2 p-4 text-black bg-white rounded-lg shadow-2xl">
        <div className="text-sm">{moment(date as Date).format("ddd")}요일</div>
        <div className="text-2xl">{moment(date as Date).format("D")}</div>
        <div className="mt-4 text-xs text-gray-500">
          {selectedDateSchedules.length > 0 ? (
            <div className="flex flex-col w-full h-full gap-1">
              {selectedDateSchedules.map((schedule, index) => {
                const color = colors[index % colors.length];
                const colorClass = colorVariants[color];

                return (
                  <div
                    key={index}
                    className="flex flex-row w-full h-full gap-1"
                  >
                    <div
                      className={`flex rounded-2xl border-2 ${
                        colorClass.split(" ")[2]
                      }`}
                    ></div>
                    <div className={`${colorClass} w-full`}>
                      {schedule} {/* 일정 내용 */}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>일정 없음</div>
          )}
        </div>
      </div>
      <StyledCalendarWrapper>
        <StyledCalendar
          className="text-gray-500"
          value={date}
          onChange={handleDateChange}
          formatDay={(locale, date) => moment(date).format("D")}
          formatYear={(locale, date) => moment(date).format("YYYY")}
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
          calendarType="gregory"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          locale={"ko-kr"}
          // 오늘 날짜로 돌아오는 기능을 위해 필요한 옵션 설정
          activeStartDate={
            activeStartDate === null ? undefined : activeStartDate
          }
          onActiveStartDateChange={({ activeStartDate }) =>
            handleMonthChange(activeStartDate as Date)
          }
          // 오늘 날짜에 '오늘' 텍스트 삽입하고 출석한 날짜에 점 표시를 위한 설정
          tileContent={({ date, view }) => {
            let html = [];
            const formattedDate = moment(date).format("YYYY-MM-DD");

            // dataList에서 현재 타일의 날짜와 일치하는 데이터를 찾음
            const foundData = schedules?.find(
              (dataItem) => dataItem.date === formattedDate
            );

            // 해당 날짜의 일정 리스트가 비어 있지 않은 경우 점을 표시
            if (foundData && foundData.description.length > 0) {
              html.push(<StyledDot key={formattedDate} />);
            }

            return <>{html}</>;
          }}
        />
        <StyledDate onClick={handleTodayClick}>오늘</StyledDate>
      </StyledCalendarWrapper>
    </div>
  );
}
