import { useEffect, useState } from "react";

const CursorLoading = () => {
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 500); // 500ms 간격으로 깜빡임

    return () => clearInterval(intervalId);
  }, []);

  return (
    <span className="inline-block">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={`cursor ${
          isBlinking ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      >
        <rect x="10" y="4" width="4" height="16" />
      </svg>
    </span>
  );
};

export default CursorLoading;
