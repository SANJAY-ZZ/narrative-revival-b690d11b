import { useEffect, useState } from "react";
import { useAttendance } from "@/components/employee/attendance-context";
import { formatDate } from "@/data/mock";
import { Button } from "@/components/ui/button";

function useElapsed(active: boolean) {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [active]);
}

export function AttendancePanel({ full = false }: { full?: boolean }) {
  const { checkedIn, checkedOut, checkInTime, checkOutTime, checkIn, checkOut, history } = useAttendance();
  useElapsed(checkedIn && !checkedOut);

  const duration = (() => {
    if (!checkedIn || !checkInTime) return null;
    const [h, m] = checkInTime.split(":").map(Number);
    const start = new Date();
    start.setHours(h, m, 0, 0);
    const end = checkedOut && checkOutTime
      ? (() => {
          const [eh, em] = checkOutTime.split(":").map(Number);
          const d = new Date();
          d.setHours(eh, em, 0, 0);
          return d;
        })()
      : new Date();
    const mins = Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000));
    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  })();

  return (
    <div className="border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="eyebrow">Attendance</span>
        <span className="text-xs text-muted-foreground">{formatDate(new Date().toISOString().slice(0, 10))}</span>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {!checkedIn ? (
            <div className="text-sm text-muted-foreground">Not checked in today.</div>
          ) : (
            <div className="space-y-1">
              <div className="text-sm text-foreground">
                {checkedOut ? "CHECKED OUT" : "CHECKED IN"}{" "}
                <span className="text-[var(--gold)]">{checkedOut ? checkOutTime : checkInTime}</span>
              </div>
              {duration ? <div className="text-xs text-muted-foreground">Working duration: {duration}</div> : null}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {!checkedIn ? (
            <Button onClick={checkIn} className="bg-[var(--gold)] text-[var(--ink)] hover:bg-[var(--gold)]/90">
              Check In
            </Button>
          ) : !checkedOut ? (
            <Button onClick={checkOut} variant="outline" className="border-border-strong">
              Check Out
            </Button>
          ) : (
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Day complete</span>
          )}
        </div>
      </div>

      {full ? (
        <div className="mt-6 border-t border-border pt-4">
          <div className="eyebrow mb-3">History</div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 font-normal">Date</th>
                  <th className="py-2 font-normal">Check In</th>
                  <th className="py-2 font-normal">Check Out</th>
                  <th className="py-2 font-normal">Hours</th>
                  <th className="py-2 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.date} className="border-b border-border last:border-none">
                    <td className="py-2 text-foreground">{formatDate(h.date)}</td>
                    <td className="py-2 text-muted-foreground">{h.checkIn ?? "—"}</td>
                    <td className="py-2 text-muted-foreground">{h.checkOut ?? "—"}</td>
                    <td className="py-2 text-muted-foreground">{h.hours || "—"}</td>
                    <td className="py-2 text-muted-foreground">{h.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}
