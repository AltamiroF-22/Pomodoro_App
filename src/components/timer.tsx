import {
  PomodoroStatusContext,
  PomodoroStatusProps,
} from "../context/pomodoro-status";
import { secondsToMinutes } from "../utils/seconds-to-minutes";
import "./timer.sass";
import { useContext, useEffect, useState } from "react";

interface TimeProps {
  mainTime: number;
}

export const Timer = (props: TimeProps) => {
  const { status } = useContext<PomodoroStatusProps>(PomodoroStatusContext);
  const [spanStatus, setSpanStatus] = useState<string>("");

  useEffect(() => {
    switch (status) {
      case "working":
        setSpanStatus("workingSpan");
        break;
      case "resting":
        setSpanStatus("restingSpan");
        break;
      default:
        setSpanStatus("");
    }
  }, [status]);

  return (
    <div className="timer">
      <span className={spanStatus}>{secondsToMinutes(props.mainTime)}</span>
    </div>
  );
};
