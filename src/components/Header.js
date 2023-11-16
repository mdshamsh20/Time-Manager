import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  // OVERALL TIME TAKEN
  const totalTime = tasks
    .map((item) => item.timer)
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <header className="bg-white">
      <div className="header flex items-center justify-between">
        <img
          src="https://open-frontend-bucket.s3.amazonaws.com/interviews/001/logo.svg"
          alt=""
        />
        <p>
          Total Time Spend{" "}
          <span className="font-bolder ml-4">
            {Math.floor(totalTime / 3600)} hr{" "}
            {Math.floor((totalTime % 3600) / 60)} min
          </span>
        </p>
      </div>
    </header>
  );
};

export default Header;
