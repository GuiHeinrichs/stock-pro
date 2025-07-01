import React from "react";

const DashboardCard = ({
  title,
  value,
  color,
  icon,
  resize,
}: {
  title: string;
  value: string;
  color: string;
  icon: React.ReactNode;
  resize: boolean;
}) => {
  return (
    <div className="bg-card dark:bg-card-dark rounded-2xl p-5 flex items-center justify-between shadow-md">
      <div>
        <p className="text-muted dark:text-white text-xs">{title}</p>
        <p
          className={`${resize ? "text-lg" : "text-3xl"} font-bold`}
          style={{ color }}
        >
          {value}
        </p>
      </div>
      <div
        className="w-10 h-10 flex items-center justify-center rounded-full"
        style={{ background: `${color}22`, color }}
      >
        {icon}
      </div>
    </div>
  );
};

export default DashboardCard;
