import React from "react";

const StatCard = ({ title, value, borderColor = "border-blue-500", bgcolor = "bg-white", icon }) => {
  return (
    <div className={`p-6 border ${borderColor} ${bgcolor} flex items-center gap-4 rounded-md shadow-md`}>
      {icon && <div className="text-4xl text-gray-700">{icon}</div>}
      <div>
        <h3 className="text-black font-semibold">{title}</h3>
        <p className="text-3xl mt-5 font-bold text-black">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
