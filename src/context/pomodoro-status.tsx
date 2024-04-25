import { createContext, useState, ReactNode } from "react";

export interface PomodoroStatusProps {
  status: string;
  toggleStatus: (status: string) => void;
}

interface PomodoroStatusProviderProps {
  children: ReactNode;
}

export const PomodoroStatusContext = createContext<PomodoroStatusProps>();

export const PomodoroStatusProvider = ({
  children,
}: PomodoroStatusProviderProps) => {
  const [status, setStatus] = useState<string>("");

  const toggleStatus = (status: string) => {
    setStatus(status);
  };

  return (
    <PomodoroStatusContext.Provider value={{ status, toggleStatus }}>
      {children}
    </PomodoroStatusContext.Provider>
  );
};
