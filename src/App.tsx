import { PomodoroTimer } from "./components/pomodoro-timer";

const App = () => {
  return (
    <main className="container">
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={500}
        cycles={4}
      />
    </main>
  );
};

export default App;
