import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ children, onClick, task, className }) => {
  return (
    <button
      className={twMerge(
        "text-whight rounded-md py-2",

        task === "add" && "bg-[#26B7CD] text-white px-12 ",
        task === "edit" && "hover:bg-[#26B7CD] px-4 border bg-white border-[#26B7CD] text-[#26B7CD] hover:text-white  ",
        task === "delete" && "bg-[#F4656E] text-white px-8 ",
        task === "export" && "bg-[#207582] text-white px-12 ",

        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
