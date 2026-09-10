import { ANNOUNCEMENTS, formatDate } from "@/data/mock";
import { Badge } from "@/components/ui/badge";

export function AnnouncementsList({ compact = false }: { compact?: boolean }) {
  const items = compact ? ANNOUNCEMENTS.slice(0, 3) : ANNOUNCEMENTS;
  return (
    <div className="border border-border bg-card p-5">
      <div className="eyebrow mb-4">Announcements</div>
      <div className="space-y-4">
        {items.map((a) => (
          <div key={a.id} className="border-b border-border pb-4 last:border-none last:pb-0">
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-foreground">{a.title}</span>
              <Badge variant="outline" className="shrink-0 border-border text-[10px] text-muted-foreground">
                {a.tag}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{a.body}</p>
            <div className="mt-1.5 text-[11px] text-muted-foreground">
              {a.author} · {formatDate(a.date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
