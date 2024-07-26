import React, { ReactNode } from "react";

export const Tooltip = ({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) => {
  return (
    <div className="relative flex flex-col items-center group">
      <span className="flex justify-center">{children}</span>
      <div
        className={`absolute whitespace-nowrap bottom-full flex flex-col items-center  group-hover:flex`}
      >
        <span className="relative z-10 p-2 mb-1 text-xs leading-none whitespace-no-wrap bg-white border border-red-500 rounded-xl">
          {message}
        </span>
        <div className="z-20 w-2 h-2 -mt-2 rotate-45 bg-white border-b border-r border-red-500" />
      </div>
    </div>
  );
};
