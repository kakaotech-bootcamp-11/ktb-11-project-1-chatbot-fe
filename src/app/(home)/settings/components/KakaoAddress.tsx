import { useState } from "react";
import { useAddressMutation } from "../hooks/useAddressMutation";
import { useUserProfileQuery } from "../../hooks/useUserProfileQuery";

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddr {
  address: string;
  zonecode: string;
}

export default function Addr() {
  const [address, setAddress] = useState("");
  const [zipNo, setZipNo] = useState("");
  const [addrDetail, setAddrDetail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { data: userProfile } = useUserProfileQuery();
  const { mutate } = useAddressMutation({ setIsEditing });

  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {
        setAddress(data.address);
        setZipNo(data.zonecode);
        document.getElementById("addrDetail")?.focus();
      },
    }).open();
  };

  const onSubmit = () => {
    console.log({
      address,
      zipNo,
      addrDetail,
    });
    const addressInfo = { address, zipNo, addrDetail };
    mutate(addressInfo);
    setIsEditing(false);
  };
  console.log(userProfile?.address.replace(" ", "").length);
  return (
    <div className="flex flex-col space-y-4 text-black w-full shadow-md rounded-md mx-auto">
      <label htmlFor="addr" className="text-white font-semibold">
        주소
      </label>

      {userProfile?.address.replace(" ", "").length !== 1 && !isEditing ? (
        <div>
          <div className="p-3 border text-white border-gray-300 rounded-md">
            {userProfile?.address}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            수정
          </button>
        </div>
      ) : (
        <>
          <div className="relative">
            <input
              id="addr"
              type="text"
              value={address}
              readOnly
              onClick={onClickAddr}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="주소를 입력해주세요"
            />
          </div>

          <label htmlFor="zipNo" className="text-white font-semibold">
            우편번호
          </label>
          <input
            id="zipNo"
            type="text"
            value={zipNo}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="우편번호"
          />

          <label htmlFor="addrDetail" className="text-white font-semibold">
            상세주소
          </label>
          <input
            id="addrDetail"
            type="text"
            value={addrDetail}
            onChange={(e) => setAddrDetail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="상세 주소를 입력해주세요"
          />

          <button
            onClick={onSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            저장
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-white border border-gray-300 hover:bg-gray-800 px-4 py-2 rounded-md"
          >
            취소
          </button>
        </>
      )}
    </div>
  );
}
