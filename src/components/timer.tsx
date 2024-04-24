import { secondsToTime } from "../utils/seconds-to-time";
import './timer.sass'

interface TimeProps {
  mainTime: number;
}

export const Timer = (props: TimeProps) => {
  return (
    <div className="timer">
      <span>{secondsToTime(props.mainTime)}</span>
    </div>
  );
};
