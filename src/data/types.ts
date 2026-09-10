/**
 * ORVNT domain models. Frontend-only for now — every shape here is designed to
 * map 1:1 onto future API responses, so swapping mock data for a backend only
 * changes the data source, never the components.
 */

export type DomainSlug =
  | "software"
  | "artificial-intelligence"
  | "enterprise"
  | "digital"
  | "future-ventures";

export interface Capability {
  title: string;
  body: string;
}

export interface Domain {
  slug: DomainSlug;
  index: string;
  name: string;
  navLabel: string;
  headline: string;
  description: string;
  capabilities: Capability[];
}

export type ProjectStatus = "Planning" | "In Progress" | "In Review" | "Completed" | "On Hold";

export interface Project {
  id: string;
  name: string;
  domain: DomainSlug;
  client: string;
  internal: boolean;
  description: string;
  overview: string;
  status: ProjectStatus;
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  dueDate: string;
  technologies: string[];
  objectives: string[];
  deliverables: string[];
  phase: string;
  notes: string;
  team: string[];
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  contact: string;
  email: string;
  since: string;
  projects: number;
  status: "Active" | "Prospect" | "Archived";
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  initials: string;
  location: string;
  joined: string;
}

export type TaskStatus = "To Do" | "In Progress" | "Blocked" | "Review" | "Done";

export interface Task {
  id: string;
  title: string;
  projectId: string;
  assignee: string;
  status: TaskStatus;
  progress: number;
  priority: "Low" | "Medium" | "High";
  due: string;
  notes: string;
  estimate: string;
}

export interface AttendanceEntry {
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  hours: number;
  status: "Present" | "Remote" | "Leave" | "Absent";
}

export interface TimesheetEntry {
  day: string;
  hours: number;
  projectId: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  author: string;
  tag: string;
}

export interface LeaveRequest {
  id: string;
  type: "Annual" | "Sick" | "Personal" | "Unpaid";
  from: string;
  to: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface BudgetLine {
  domain: DomainSlug;
  allocated: number;
  spent: number;
}

export interface WebsiteContentBlock {
  key: string;
  page: string;
  label: string;
  value: string;
  multiline?: boolean;
}

export interface ActivityEvent {
  id: string;
  actor: string;
  action: string;
  target: string;
  at: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: string;
  size: string;
  updated: string;
  owner: string;
}
