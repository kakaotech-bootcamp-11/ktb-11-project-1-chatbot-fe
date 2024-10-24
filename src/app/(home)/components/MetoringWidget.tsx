import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function MentoringWidget() {
  return (
    <div className="flex flex-col w-full gap-1 p-2 bg-gray-100 text-black text-xs rounded-2xl">
      <a
        className="text-center text-lg underline"
        href="https://docs.google.com/spreadsheets/d/1UlaObFfyRfHmAdbMlmcGNwUemX4h-w5XPuZU1ov-Xpk/edit?gid=0#gid=0"
        target="_blank"
        rel="noopener noreferrer"
      >
        AI 멘토링 신청하러 가기
      </a>
      <div className="">
        📢 멘토링 신청 후{" "}
        <span className="text-red-500 text-sm">
          당일 취소 및 무단 불참 시 신청이 제한
        </span>{" "}
        될 수 있습니다. <br />
        약속을 꼭! 지켜주세요. <br />
        <br />
        <br />
        신청자가 없는 경우 멘토와 교육 관리자의 판단으로 의무 배정이 진행될 수
        있습니다.
      </div>
      <Popover>
        <PopoverTrigger>
          <button className="underline text-blue-500">
            멘토님 상세 정보 보기
          </button>
        </PopoverTrigger>
        <PopoverContent
          // side="left"
          sideOffset={0}
          className="w-[700px] p-4 bg-white text-black rounded-lg shadow-lg"
        >
          <table className="table-auto border-collapse border border-gray-400 text-xs">
            <thead>
              <tr>
                <th className="border border-gray-400 px-2 py-1">이름</th>
                <th className="border border-gray-400 px-2 py-1">시간</th>
                <th className="border border-gray-400 px-2 py-1">프로젝트</th>
                <th className="border border-gray-400 px-2 py-1">
                  역할 및 작업 설명
                </th>
                <th className="border border-gray-400 px-2 py-1">관련 기술</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 px-2 py-1">
                  rookie.jeon
                </td>
                <td className="border border-gray-400 px-2 py-1">
                  16:00-18:00
                </td>
                <td className="border border-gray-400 px-2 py-1">
                  AI학습플랫폼
                </td>
                <td className="border border-gray-400 px-2 py-1">
                  AI hub fine-tuning 기능 개발
                </td>
                <td className="border border-gray-400 px-2 py-1">
                  kubernetes, container, public cloud
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-2 py-1">polar.park</td>
                <td className="border border-gray-400 px-2 py-1">
                  16:00-18:00
                </td>
                <td className="border border-gray-400 px-2 py-1">
                  데이터공유플랫폼
                </td>
                <td className="border border-gray-400 px-2 py-1">
                  사내 데이터 플랫폼 개발 및 품질관리 서비스 담당
                </td>
                <td className="border border-gray-400 px-2 py-1">
                  react, flask 등 + 약간의 인공지능 지식
                </td>
              </tr>
            </tbody>
          </table>
        </PopoverContent>
      </Popover>
    </div>
  );
}
