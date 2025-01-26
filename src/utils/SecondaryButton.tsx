import React from "react";

type ButtonType = {
  children: React.ReactNode;
};

const SecondaryButton = (props: ButtonType) => {
  return (
    <button className="bg-transparent border border-[#b84d69] text-black hover:text-white font-medium px-6 py-2 mx-2 rounded-lg hover:bg-[#b84d69] ">
      {props.children}
    </button>
  );
};

export default SecondaryButton;
