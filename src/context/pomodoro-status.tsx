import { createContext, useState, ReactNode } from "react";

interface PomodoroStatus {
  status: string;
  toggleStatus: () => void;
}

interface PomodoroStatusProviderProps {
  children: ReactNode;
}

export const PomodoroStatusContext = createContext<PomodoroStatus | undefined>(
  undefined
);

export const PomodoroStatusProvider = ({
  children,
}: PomodoroStatusProviderProps) => {
  const [status, setStatus] = useState<string>("");

  const toggleStatus = () => {
    setStatus(status === "working" ? "" : "working");
  };

  return (
    <PomodoroStatusContext.Provider value={{ status, toggleStatus }}>
      {children}
    </PomodoroStatusContext.Provider>
  );
};
