import { useContext, useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { Button } from "./button";
import { Timer } from "./timer";
import { PomodoroStatusContext } from "../context/pomodoro-status";
import "./pomodoro-timer.sass";

interface PomodoroTimerProps {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export const PomodoroTimer = (props: PomodoroTimerProps) => {
  const [mainTime, setMainTime] = useState<number>(props.pomodoroTime);
  const [timeCouting, setTimeCounting] = useState<boolean>(false);
  // const [working, setWorking] = useState<boolean>(false);
  const { status, toggleStatus } = useContext(PomodoroStatusContext);

  useEffect(() => {
    if (status === "working") {
      document.body.classList.add("working");
    } else {
      document.body.classList.remove("working");
    }
  }, [status]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCouting ? 1000 : null
  );

  const configureWorking = () => {
    setTimeCounting(true);
    toggleStatus();
  };

  return (
    <section className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <div className="buttons">
        <Button
          text="start"
          className="start-btn"
          onClick={() => configureWorking()}
        />
        <Button text="start" className="start-btn" />
        <Button text="start" className="start-btn" />
      </div>
      <div className="details">
        <p>details:</p>
        <p>details:</p>
        <p>details:</p>
        <p>details:</p>
      </div>
    </section>
  );
};
