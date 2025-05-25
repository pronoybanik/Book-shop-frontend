import React from "react";

type ButtonType = {
  children: React.ReactNode;
};

const SecondaryButton = (props: ButtonType) => {
  return (
    <button
      className="text-white bg-black border font-medium px-6 py-2  rounded-lg w-full
      transition-all hover:bg-[#e95b5b] hover:shadow-lg "
    >
      {props.children}
    </button>
  );
};

export default SecondaryButton;
