import React from "react";

type ButtonType = {
  children: React.ReactNode;
};

const PrimaryButton = (props: ButtonType) => {
  return (
    <button className="bg-[#f96d6d] hover:bg-[#fc8686] text-white font-medium px-6 py-2 rounded-lg">
      {props.children}
    </button>
  );
};

export default PrimaryButton;
