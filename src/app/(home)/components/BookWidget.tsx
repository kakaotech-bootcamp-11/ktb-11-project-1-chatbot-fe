import Image from "next/image";
import bookshelf from "../../../../public/images/ktb_bookshelf.jpg";

export default function BookWidget() {
  return (
    <div className="flex flex-col w-full gap-1 p-2 bg-white text-black text-xs rounded-2xl">
      <a
        className="text-center text-lg text-black underline"
        href="https://docs.google.com/spreadsheets/d/1UlaObFfyRfHmAdbMlmcGNwUemX4h-w5XPuZU1ov-Xpk/edit?gid=0#gid=0"
        target="_blank"
        rel="noopener noreferrer"
      >
        도서 예약하러 가기
      </a>
      <div className="">
        📕 카카오테크 부트캠프 교육장 내 책들은 공유 도서관으로 운영됩니다.{" "}
        <br />
        공유 도서관은 이용자가 맡긴 공유 도서와 주요 출판사가 기증한 책으로
        채워집니다. <br />
        <br />
        ❓ 공유 도서관이란? 책을 사랑하지만 보관할 장소가 마땅치 않은 분들의
        책을 대신 보관해드리는 대신,
        <br />
        보관하는 기간 동안 다른 사람들에게 {"'"}공유{"'"}하는 도서관입니다.{" "}
        <br />
        보관 중인 도서는 언제든 돌려받을 수 있습니다. <br />
        <br />
        📙 링크 안으로 들어가 현재 보유 중인 도서들을 확인할 수 있습니다. <br />
        📗 비치된 도서는 자유롭게 열람 가능하나, 카카오테크 부트캠프 교육장
        밖으로는 반출할 수 없습니다. <br />
        📘 비치된 책은 누군가의 소중한 소유물입니다. 소중하게 관리, 반납
        부탁드립니다.
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <Image
          className="object-contain rounded-xl"
          src={bookshelf}
          alt="bookshelf"
        />
      </div>
    </div>
  );
}
