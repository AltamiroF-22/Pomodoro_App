import {
  PomodoroStatusContext,
  PomodoroStatusProps,
} from "../context/pomodoro-status";
import { useContext, useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { Button } from "./button";
import { Timer } from "./timer";
import "./pomodoro-timer.sass";
import soundStart from "../sounds/simple-notification-152054.mp3";
import soundFinish from "../sounds/ambient-flute-notification-3-185275.mp3";
import { secondsToHours } from "../utils/seconds-to-hours";

const audioStartWorking = new Audio(soundStart);
const audioFinishWorking = new Audio(soundFinish);

interface PomodoroTimerProps {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export const PomodoroTimer = (props: PomodoroTimerProps) => {
  const [mainTime, setMainTime] = useState<number>(props.pomodoroTime);
  const [timeCouting, setTimeCounting] = useState<boolean>(false);
  const [working, setWorking] = useState<boolean>(false);
  const [resting, setResting] = useState<boolean>(false);
  const { toggleStatus } = useContext<PomodoroStatusProps>(
    PomodoroStatusContext
  );
  const [cycles, setCycles] = useState<boolean[]>(
    new Array(props.cycles - 1).fill(true)
  );
  const [completedFullCycles, setCompletedFullCycles] = useState<number>(0);
  const [fullWorkingTime, setFullWorkingTime] = useState<number>(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState<number>(0);

  useEffect(() => {
    if (mainTime > 0) return;
    if (working && cycles.length > 0) {
      configureRest(false);
      cycles.pop();
      setNumberOfPomodoros(numberOfPomodoros + 1);
    } else if (working && cycles.length <= 0) {
      configureRest(true);
      setCycles(new Array(props.cycles - 1).fill(true));
      setCompletedFullCycles(completedFullCycles + 1);
      setNumberOfPomodoros(numberOfPomodoros + 1);
    }

    if (resting) configureWork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [working, resting, mainTime]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCouting ? 1000 : null
  );

  const configureWork = () => {
    setWorking(true);
    setTimeCounting(true);
    toggleStatus("working");
    setResting(false);
    setMainTime(props.pomodoroTime);
    audioStartWorking.play();
  };

  const configureRest = (long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);
    toggleStatus("resting");
    audioFinishWorking.play();
    if (long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }
  };

  const pauseTimeCounting = () => {
    setTimeCounting(!timeCouting);
  };

  return (
    <section className="pomodoro">
      <h2>You are: {working ? "Working" : "Resting"}</h2>
      <Timer mainTime={mainTime} />
      <div className="buttons">
        <Button
          text="start"
          className="start-btn"
          onClick={() => configureWork()}
        />
        <Button
          text="rest"
          className="start-btn"
          onClick={() => configureRest(false)}
        />
        <Button
          text={timeCouting ? "pause" : "play"}
          className={`start-btn ${!working && !resting ? "hidden-pause" : ""}`}
          onClick={() => pauseTimeCounting()}
        />
      </div>
      <div className="details">
        <p>Completed full cycles: {completedFullCycles}</p>
        <p>Full working time: {secondsToHours(fullWorkingTime)}</p>
        <p>Number of pomodoros: {numberOfPomodoros}</p>
      </div>
    </section>
  );
};
