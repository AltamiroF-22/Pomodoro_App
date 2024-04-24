import { secondsToTime } from "../utils/seconds-to-time";
import { PomodoroStatusContext } from "../context/pomodoro-status";
import "./timer.sass";
import { useContext } from "react";

interface TimeProps {
  mainTime: number;
}

export const Timer = (props: TimeProps) => {
  const { status } = useContext(PomodoroStatusContext);
  return (
    <div className="timer">
      <span className={status === "working" ? "workingSpan" : ""}>
        {secondsToTime(props.mainTime)}
      </span>
    </div>
  );
};
