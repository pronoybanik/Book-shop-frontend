import React from "react";

type ButtonType = {
  children: React.ReactNode;
};

const PrimaryButton = (props: ButtonType) => {
  return (
    <button className="bg-[#f96d6d] hover:bg-[#b84d69] text-white font-medium px-6 py-2 rounded-lg px-10">
      {props.children}
    </button>
  );
};

export default PrimaryButton;
