import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./sass/index.sass";

import { PomodoroStatusProvider } from "./context/pomodoro-status.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PomodoroStatusProvider>
      <App />
    </PomodoroStatusProvider>
  </React.StrictMode>
);
