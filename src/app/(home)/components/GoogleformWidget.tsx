import Image from "next/image";
import GOOGLE_FORM from "../../../../public/images/google-form.png";

export default function GoogleFormWidget() {
  return (
    <div className="flex flex-col w-full gap-2 p-2 bg-white text-black text-xs rounded-2xl">
      <a
        className="text-center text-lg text-black underline"
        href="https://docs.google.com/forms/d/e/1FAIpQLSdUTsnAix8SGtiKLft9CuynWeRVMWqtobiBtICpJbSVZ9LO3A/viewform"
        target="_blank"
        rel="noopener noreferrer"
      >
        통합신청센터 가기
      </a>
      <div className="flex flex-col justify-center items-center gap-2">
        <Image
          className="object-contain rounded-lg"
          src={GOOGLE_FORM}
          alt="GOOGLE_FORM"
        />
      </div>
    </div>
  );
}
