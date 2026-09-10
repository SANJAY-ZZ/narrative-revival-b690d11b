import { Link } from "@tanstack/react-router";
import { formatDate, PROJECTS, TASKS } from "@/data/mock";
import { CURRENT_EMPLOYEE } from "@/data/mock";
import { Progress } from "@/components/ui/progress";

export function myProjects() {
  return PROJECTS.filter((p) => p.team.includes(CURRENT_EMPLOYEE.id));
}

function roleFor(projectId: string) {
  const t = TASKS.find((t) => t.projectId === projectId && t.assignee === CURRENT_EMPLOYEE.id);
  return t ? CURRENT_EMPLOYEE.role : "Contributor";
}

export function MyProjectsTable() {
  const projects = myProjects();

  return (
    <div className="border border-border bg-card">
      <div className="eyebrow px-5 pt-5">My Projects</div>
      <div className="overflow-x-auto p-5 pt-3">
        <table className="hidden w-full min-w-[640px] text-sm md:table">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="py-2 font-normal">Project</th>
              <th className="py-2 font-normal">Client</th>
              <th className="py-2 font-normal">Role</th>
              <th className="py-2 font-normal">Progress</th>
              <th className="py-2 font-normal">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-none">
                <td className="py-3">
                  <Link to="/employee/projects" className="text-foreground hover:text-[var(--gold)]">
                    {p.name}
                  </Link>
                </td>
                <td className="py-3 text-muted-foreground">{p.client}</td>
                <td className="py-3 text-muted-foreground">{roleFor(p.id)}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Progress value={p.progress} className="h-1.5 w-24" />
                    <span className="text-xs text-muted-foreground">{p.progress}%</span>
                  </div>
                </td>
                <td className="py-3 text-muted-foreground">{formatDate(p.dueDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* mobile cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {projects.map((p) => (
            <div key={p.id} className="border border-border p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{p.name}</span>
                <span className="text-xs text-muted-foreground">{formatDate(p.dueDate)}</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{p.client} · {roleFor(p.id)}</div>
              <div className="mt-2 flex items-center gap-2">
                <Progress value={p.progress} className="h-1.5 flex-1" />
                <span className="text-xs text-muted-foreground">{p.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
