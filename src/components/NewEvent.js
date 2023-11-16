import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNew } from "../redux/new/newActions";
import { addTask } from "../redux/tasks/tasksActions";

const NewEvent = () => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const form = useRef(null);

  const handleOnSave = () => {
    setTaskName("");
    if (taskName === "") {
      alert("Enter a valid name!");
      return;
    }
    dispatch(closeNew());
    const newTask = {
      id: new Date().getTime(),
      name: taskName,
      history: [],
      running: false,
      timer: 0,
    };
    dispatch(addTask(newTask));
    document.body.style.overflowY = "scroll";
  };

  // CLOSE NEW EVENT POP UP WHEN CLICKED OUTSIDE
  const handleClickOutside = (e) => {
    if (form.current && !form.current.contains(e.target)) {
      dispatch(closeNew());
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="bg-black/30 h-full w-full absolute top-0 flex justify-center items-center">
      <form className="bg-white new-event" ref={form}>
        <label htmlFor="name">Enter the Task Name</label>
        <br />
        <input
          type="text"
          name="name"
          id="name"
          value={taskName}
          autoFocus
          onChange={(e) => setTaskName(e.target.value)}
        />
        <div className="flex justify-between">
          <button className="start-btn" onClick={handleOnSave} type="submit">
            Save
          </button>
          <button
            className="start-btn"
            onClick={() => {
              dispatch(closeNew());
              document.body.style.overflowY = "scroll";
            }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEvent;
