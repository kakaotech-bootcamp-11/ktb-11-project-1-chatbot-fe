import Image from "next/image";
import lionImage from "../../../../public/images/lion_image.webp";

export default function InitialChat() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 space-y-2">
      <Image width={200} height={200} src={lionImage} alt="chunsik" />
      <div className="text-lg">
        카카오테크 부트캠프 챗봇에 오신 것을 환영합니다!
      </div>
      <div className="flex flex-row items-center justify-center space-x-4">
        <div className="flex items-center justify-center h-full p-4 text-center border rounded-lg">
          강남역까지 가는 방법 알려줘
        </div>
        <div className="flex items-center justify-center h-full p-4 text-center border rounded-lg">
          오늘 날씨 어때?
        </div>
        <div className="flex items-center justify-center h-full p-4 text-center border rounded-lg">
          이번 주 일정 알려줘
        </div>
      </div>
    </div>
  );
}
