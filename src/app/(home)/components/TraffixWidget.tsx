import { Separator } from "@/components/ui/separator";
import { IoIosSubway } from "react-icons/io";

export default function TraffixWidget() {
  return (
    <div className="relative flex flex-col w-ull h-full rounded-xl p-1 items-center space-y-2 text-sm bg-gray-900">
      <div className="font-semibold text-lg">교통 정보</div>
      <div className="absolute right-2 text-xs text-gray-500">(집: 의정부)</div>
      <Separator className="bg-gray-600" />
      <div className="flex flex-col w-full rounded-md">
        <div className="flex flex-row w-full items-center justify-between bg-red-700 p-1 text-sm ">
          <div className="flex flex-row items-center gap-2 p-1">
            <IoIosSubway />
            <div>판교</div>
          </div>
          <div className="text-gray-300 font-light">신분당선</div>
        </div>
        <div className="flex flex-row w-full bg-white text-black">
          <div className="flex flex-col w-1/2 p-2 px-3">
            <div className="flex flex-row justify-between">
              <div className="text-gray-500">신사</div>
              <div>2분</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-gray-500">신사</div>
              <div>9분</div>
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col w-1/2 p-2 px-3">
            <div className="flex flex-row justify-between">
              <div className="text-gray-500">광교</div>
              <div>5분</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-gray-500">광교</div>
              <div>11분</div>
            </div>
          </div>
        </div>
      </div>
      {/* 회룡 */}
      <div className="flex flex-col w-full rounded-md">
        <div className="flex flex-row w-full items-center justify-between bg-blue-900 p-1 text-sm ">
          <div className="flex flex-row items-center gap-2 p-1">
            <IoIosSubway />
            <div>회룡</div>
          </div>
          <div className="text-gray-300 font-light">1호선</div>
        </div>
        <div className="flex flex-row w-full bg-white text-black">
          <div className="flex flex-col w-1/2 p-2 px-3">
            <div className="flex flex-row justify-between">
              <div className="text-gray-500">연천</div>
              <div>10분</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-gray-500">의정부</div>
              <div>18분</div>
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col w-1/2 p-2 px-3">
            <div className="flex flex-row justify-between">
              <div className="text-gray-500">인천</div>
              <div>7분</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-gray-500">인천</div>
              <div>17분</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
