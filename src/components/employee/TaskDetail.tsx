import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { Task, TaskStatus } from "@/data/types";
import { projectById, formatDate } from "@/data/mock";
import { Paperclip, AlertTriangle } from "lucide-react";

const STATUSES: TaskStatus[] = ["To Do", "In Progress", "Blocked", "Review", "Done"];

export function TaskDetail({ task, open, onOpenChange }: { task: Task | null; open: boolean; onOpenChange: (v: boolean) => void }) {
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "To Do");
  const [progress, setProgress] = useState(task?.progress ?? 0);
  const [notes, setNotes] = useState(task?.notes ?? "");
  const [estimate, setEstimate] = useState(task?.estimate ?? "");

  if (!task) return null;

  const project = projectById(task.projectId);

  // reset local state whenever a new task is opened
  const key = task.id;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (v) {
          setStatus(task.status);
          setProgress(task.progress);
          setNotes(task.notes);
          setEstimate(task.estimate);
        }
      }}
      key={key}
    >
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="eyebrow mb-1">{project?.name}</div>
          <DialogTitle className="font-[family-name:var(--font-display)] text-xl">{task.title}</DialogTitle>
          <DialogDescription>Due {formatDate(task.due)} · Priority {task.priority}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div>
            <label className="eyebrow mb-2 block">Status</label>
            <Select value={status} onValueChange={(v) => setStatus(v as TaskStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="eyebrow">Progress</label>
              <span className="text-sm text-[var(--gold)]">{progress}%</span>
            </div>
            <Slider value={[progress]} max={100} step={5} onValueChange={([v]) => setProgress(v)} />
          </div>

          <div>
            <label className="eyebrow mb-2 block">Estimated Completion</label>
            <Input value={estimate} onChange={(e) => setEstimate(e.target.value)} placeholder="e.g. 3 days" />
          </div>

          <div>
            <label className="eyebrow mb-2 block">Notes</label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Add a note about this task…" />
          </div>

          <div>
            <label className="eyebrow mb-2 block">Attachments</label>
            <div className="flex items-center gap-2 border border-dashed border-border-strong px-3 py-4 text-xs text-muted-foreground">
              <Paperclip size={14} />
              No attachments yet — drag files here (placeholder).
            </div>
          </div>

          <div className="flex items-start gap-2 border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
            <AlertTriangle size={14} className="mt-0.5 shrink-0 text-[var(--gold)]" />
            This is demo data — changes are kept in this session only and are not saved to a server.
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            className="bg-[var(--gold)] text-[var(--ink)] hover:bg-[var(--gold)]/90"
            onClick={() => {
              toast.success("Task updated", {
                description: `${task.title} — status: ${status}, progress: ${progress}%. (not saved to a server)`,
              });
              onOpenChange(false);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
