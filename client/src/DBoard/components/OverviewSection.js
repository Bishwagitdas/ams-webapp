import React from "react";

const OverviewSection = () => {
  const overview = [
    { title: "Users" },
    { title: "Customers" },
    { title: "Reports" },
  ];
  return (
    <div className="flex flex-col gap-10">
      <p className="text-3xl font-bold">Overview</p>
      <div className="flex flex-row lg:justify-start justify-center flex-wrap gap-5">
        {overview.map((item) => {
          return (
            <p className="hover:shadow-lg bg-gray-100 p-10 text-xl md:text-2xl lg:text-3xl text-center font-semibold rounded-md">
              {item.title}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default OverviewSection;
