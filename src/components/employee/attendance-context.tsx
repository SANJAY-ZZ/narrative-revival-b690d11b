import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { ATTENDANCE_HISTORY } from "@/data/mock";

interface AttendanceState {
  checkedIn: boolean;
  checkedOut: boolean;
  checkInTime: string | null;
  checkOutTime: string | null;
  history: typeof ATTENDANCE_HISTORY;
  checkIn: () => void;
  checkOut: () => void;
}

const AttendanceContext = createContext<AttendanceState | null>(null);

function formatNow() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

  const value = useMemo<AttendanceState>(
    () => ({
      checkedIn: checkInTime !== null,
      checkedOut: checkOutTime !== null,
      checkInTime,
      checkOutTime,
      history: ATTENDANCE_HISTORY,
      checkIn: () => {
        setCheckInTime(formatNow());
        setCheckOutTime(null);
      },
      checkOut: () => setCheckOutTime(formatNow()),
    }),
    [checkInTime, checkOutTime],
  );

  return <AttendanceContext.Provider value={value}>{children}</AttendanceContext.Provider>;
}

export function useAttendance() {
  const ctx = useContext(AttendanceContext);
  if (!ctx) throw new Error("useAttendance must be used within AttendanceProvider");
  return ctx;
}
