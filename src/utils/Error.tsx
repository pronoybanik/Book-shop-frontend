import React from "react";

type ButtonType = {
  children: React.ReactNode;
};

const Error = (props: ButtonType) => {
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-red-500 bg-red-50 p-4"
    >
      <strong className="block font-medium text-red-800">
        {props.children}
      </strong>
    </div>
  );
};

export default Error;
