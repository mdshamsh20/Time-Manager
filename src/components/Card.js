import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeTime,
  deleteTask,
  incrementTimer,
  updateStartTime,
  updateStopTime,
  updateTimer,
} from "../redux/tasks/tasksActions";

const Card = ({ id, name, history }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const taskTimer = tasks.find((item) => item.id === id).timer;
  const taskRunning = tasks.find((item) => item.id === id).running;

  // ON WINDOW CLOSE
  useEffect(() => {
    window.addEventListener("beforeunload", function () {
      const close = new Date();
      dispatch(closeTime(id, close));
    });
    return () => {
      window.removeEventListener("beforeunload", function () {
        const close = new Date();
        dispatch(closeTime(id, close));
      });
    };
  }, [dispatch, id]);

  useEffect(() => {
    const update = () => {
      if (history.length !== 0) {
        if (history[history.length - 1].stop === null) {
          if (history[history.length - 1].close !== null) {
            let backgroundTime = Math.round(
              (new Date().getTime() -
                new Date(history[history.length - 1].close).getTime()) /
                1000
            );
            console.log("BACKGROUND TIME: ", backgroundTime);
            dispatch(updateTimer(id, backgroundTime));
          }
        }
      }
    };

    window.addEventListener("load", update);
    return () => {
      window.removeEventListener("load", update);
    };
  }, []);

  // INCREMENT TIMER EACH SECOND
  useEffect(() => {
    let timerID;
    if (taskRunning) {
      dispatch(incrementTimer(id));
      timerID = setInterval(() => {
        dispatch(incrementTimer(id));
      }, 1000);
    }
    return () => {
      clearInterval(timerID);
    };
  }, [taskRunning, id]);

  // STORE START DATE/TIME
  const handleStart = () => {
    const startTime = new Date();
    dispatch(updateStartTime(id, startTime));
  };

  // STORE STOP DATE/TIME
  const handleStop = () => {
    const stopTime = new Date();
    dispatch(updateStopTime(id, stopTime));
  };

  return (
    <div className="card">
      <header className="flex items-center justify-between ">
        <p className="card-heading">
          {name.slice(0, 1).toUpperCase() + name.slice(1)}
        </p>
        <div className="flex items-center">
          <div className="divider"></div>
          <p className="timer">
            {Math.floor(taskTimer / 3600) < 10
              ? `0${Math.floor(taskTimer / 3600)}`
              : Math.floor(taskTimer / 3600)}
            :
            {Math.floor(taskTimer / 60) < 10
              ? `0${Math.floor(taskTimer / 60)}`
              : Math.floor(taskTimer / 60)}
            :{taskTimer % 60 < 10 ? `0${taskTimer % 60}` : taskTimer % 60}
          </p>
          <button
            className={`${taskRunning ? "stop-btn" : "start-btn"} ml-16`}
            onClick={taskRunning ? handleStop : handleStart}
          >
            {taskRunning ? "Stop" : "Start"}
          </button>
          <button
            className="delete-btn"
            onClick={() => {
              dispatch(deleteTask(id));
            }}
          >
            X
          </button>
        </div>
      </header>
      <p className="font-bolder my-3 leading-4">History</p>
      <div className="history">
        {history.length === 0 ? (
          <p className="text-black/80 mb-3">
            No History Found, Click on the Start button to track the time{" "}
          </p>
        ) : (
          history
            .slice()
            .reverse()
            .map((item, index) => {
              console.log(item);
              const options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              };

              let start;
              let stop;

              if (item.start) {
                start = Intl.DateTimeFormat("en-GB", options)
                  .format(new Date(item.start))
                  .split(",")
                  .join("");
              }
              if (item.stop) {
                stop = Intl.DateTimeFormat("en-GB", options)
                  .format(new Date(item.stop))
                  .split(",")
                  .join("");
              }

              return (
                <p key={index} className="text-black/80 mb-3">
                  Started the timer at {start}
                  {stop ? ` & stopped at ${stop}` : " (Active)"}
                </p>
              );
            })
        )}
      </div>
    </div>
  );
};

export default Card;
