import React from "react";

const EmptyState = ({
  img,
  title,
  bodyCopy,
  button: { label, onClick },
}: {
  img: string;
  title: string;
  bodyCopy: string;
  search?: boolean;
  button: { label: string; onClick: () => void };
}): JSX.Element => {
  return (
    <div className="flex items-center flex-column">
      <img className="w-50 my-12" src={img} alt="" />
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-center w-1/3">{bodyCopy}</p>
      <button
        onClick={onClick}
        className="text-xl bg-yellow-400 font-bold py-2 px-4 text-black rounded-md my-4"
      >
        {label}
      </button>
    </div>
  );
};
export default EmptyState;
