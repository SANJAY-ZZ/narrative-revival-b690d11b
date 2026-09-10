import type {
  ActivityEvent,
  Announcement,
  AttendanceEntry,
  BudgetLine,
  Client,
  DocumentItem,
  Domain,
  DomainSlug,
  Employee,
  LeaveRequest,
  Project,
  Task,
  TimesheetEntry,
  WebsiteContentBlock,
} from "./types";

/** DEMO DATA — illustrative only, not real ORVNT company figures. */
export const IS_MOCK_DATA = true;

export const DOMAINS: Domain[] = [
  {
    slug: "software",
    index: "01",
    name: "Software & Technology",
    navLabel: "Software",
    headline: "The technical foundation.",
    description:
      "ORVNT engineers the systems organizations run on — applications, APIs, platforms and the infrastructure that carries them.",
    capabilities: [
      { title: "Software", body: "Custom software engineering, applications, APIs, backend systems and digital infrastructure." },
      { title: "SaaS", body: "Subscription software, multi-tenant platforms, workflow products and scalable cloud applications." },
      { title: "IT Solutions", body: "Technology solutions built around operational requirements, integrations and workflows." },
      { title: "Platforms", body: "Reusable platforms connecting data, services, users and intelligent capabilities." },
      { title: "Product Development", body: "Product discovery, architecture, engineering, testing, launch and iteration." },
    ],
  },
  {
    slug: "artificial-intelligence",
    index: "02",
    name: "Artificial Intelligence",
    navLabel: "AI",
    headline: "Intelligence engineered for real-world use.",
    description:
      "Applied intelligence with a job to do — models, agents and automation deployed inside real products and real operations.",
    capabilities: [
      { title: "Generative AI", body: "LLM applications, RAG, context engineering, copilots and domain-specific AI." },
      { title: "AI Agents", body: "Goal-oriented agents, tool use, orchestration, workflows and decision-support systems." },
      { title: "Machine Learning", body: "Predictive models, classification, recommendation, analytics and production ML." },
      { title: "Automation", body: "Intelligent workflow automation that reduces repetitive work and improves efficiency." },
      { title: "AI Products", body: "AI-first products designed around user needs, measurable outcomes and scalable deployment." },
      { title: "Applied Research", body: "Research and experimentation translating emerging AI capabilities into practical solutions." },
    ],
  },
  {
    slug: "enterprise",
    index: "03",
    name: "Enterprise",
    navLabel: "Enterprise",
    headline: "Modernizing how organizations operate.",
    description:
      "Connected enterprise architecture — the systems, processes and data that decide how an organization actually runs.",
    capabilities: [
      { title: "ERP", body: "Enterprise resource planning solutions and integrations connecting finance, operations, people and data." },
      { title: "CRM", body: "Customer relationship systems, sales workflows, service operations and customer intelligence." },
      { title: "Business Systems", body: "Connected systems for workflows, reporting, collaboration, operations and decision-making." },
      { title: "Digital Transformation", body: "Modernization combining technology, process redesign, automation and data." },
      { title: "Enterprise Consulting", body: "Technology strategy, architecture, product direction and implementation guidance." },
    ],
  },
  {
    slug: "digital",
    index: "04",
    name: "Digital",
    navLabel: "Digital",
    headline: "Designing connected digital experiences.",
    description:
      "The surface where the company meets its audience — products, journeys, brand systems and the growth engine behind them.",
    capabilities: [
      { title: "Digital Marketing", body: "Digital campaigns, growth systems, content, performance marketing and technology-enabled marketing." },
      { title: "Web & Mobile", body: "Modern websites, web applications, mobile experiences and connected digital journeys." },
      { title: "Digital Products", body: "Customer-facing digital products designed for usability, growth and long-term evolution." },
      { title: "Creative / Brand Services", body: "Brand identity, visual systems, digital creative and technology-aligned brand experiences." },
    ],
  },
  {
    slug: "future-ventures",
    index: "05",
    name: "Future Ventures",
    navLabel: "Ventures",
    headline: "Creating what does not exist yet.",
    description:
      "ORVNT explores opportunities beyond today's categories through partnerships, investment, acquisition and the creation of entirely new businesses.",
    capabilities: [
      { title: "New Industries", body: "Early exploration of categories that have no established playbook yet." },
      { title: "Strategic Investments", body: "Capital and technical partnership in companies building adjacent capability." },
      { title: "Joint Ventures", body: "Shared-risk businesses built with operators who know the market." },
      { title: "Acquisitions", body: "Acquiring and modernizing businesses with strong fundamentals and dated technology." },
      { title: "New Business Creation", body: "Founding, staffing and scaling entirely new ORVNT businesses." },
    ],
  },
];

export const domainBySlug = (slug: string) => DOMAINS.find((d) => d.slug === slug);
export const domainName = (slug: DomainSlug) => domainBySlug(slug)?.name ?? slug;

export const PROJECTS: Project[] = [
  {
    id: "prj-atlas",
    name: "Atlas Core Platform",
    domain: "software",
    client: "Meridian Logistics",
    internal: false,
    description: "Multi-tenant logistics platform unifying fleet, freight and settlement operations.",
    overview:
      "Atlas replaces four disconnected legacy systems with a single multi-tenant platform. The build covers domain modelling, a service API layer, an operator console and a partner portal.",
    status: "In Progress",
    progress: 68,
    budget: 4200000,
    spent: 2610000,
    startDate: "2026-01-12",
    dueDate: "2026-11-30",
    technologies: ["TypeScript", "Node", "PostgreSQL", "Kafka", "React"],
    objectives: ["Retire four legacy systems", "Sub-second dispatch decisions", "Partner self-service onboarding"],
    deliverables: ["Platform API", "Operator console", "Partner portal", "Migration tooling"],
    phase: "Build — operator console",
    notes: "Migration rehearsal scheduled for the settlement module before the October freeze.",
    team: ["emp-1", "emp-3", "emp-6"],
  },
  {
    id: "prj-signal",
    name: "Signal Intelligence Suite",
    domain: "artificial-intelligence",
    client: "Northbridge Capital",
    internal: false,
    description: "Retrieval-augmented research copilot over twenty years of proprietary market research.",
    overview:
      "A domain-specific copilot with strict citation guarantees, evaluation harness and analyst review loop. Deployed to 240 internal analysts.",
    status: "In Review",
    progress: 84,
    budget: 2650000,
    spent: 2100000,
    startDate: "2025-11-03",
    dueDate: "2026-09-26",
    technologies: ["Python", "LangGraph", "pgvector", "Evals", "React"],
    objectives: ["Citation-grounded answers", "Analyst hours reduced by a third", "Auditable retrieval trail"],
    deliverables: ["Retrieval service", "Copilot UI", "Evaluation harness", "Admin controls"],
    phase: "Review — evaluation sign-off",
    notes: "Hallucination rate under target on the last three eval runs.",
    team: ["emp-2", "emp-4"],
  },
  {
    id: "prj-agentops",
    name: "AgentOps Workbench",
    domain: "artificial-intelligence",
    client: "ORVNT",
    internal: true,
    description: "Internal orchestration workbench for building, testing and observing production AI agents.",
    overview:
      "A reusable ORVNT platform asset: agent graph authoring, tool registries, trace inspection and regression suites shared across client engagements.",
    status: "In Progress",
    progress: 42,
    budget: 900000,
    spent: 355000,
    startDate: "2026-04-06",
    dueDate: "2027-02-19",
    technologies: ["TypeScript", "Python", "OpenTelemetry", "Postgres"],
    objectives: ["One agent runtime across engagements", "Trace-level observability", "Regression suites by default"],
    deliverables: ["Agent runtime", "Trace explorer", "Tool registry"],
    phase: "Build — trace explorer",
    notes: "Two client teams already consuming the runtime in preview.",
    team: ["emp-2", "emp-5"],
  },
  {
    id: "prj-helix",
    name: "Helix ERP Modernization",
    domain: "enterprise",
    client: "Kestrel Manufacturing",
    internal: false,
    description: "Phased ERP modernization connecting finance, plant operations and workforce data.",
    overview:
      "A three-wave modernization: integration layer first, then finance and operations migration, then decommissioning of the legacy mainframe interface.",
    status: "In Progress",
    progress: 51,
    budget: 6100000,
    spent: 2950000,
    startDate: "2025-09-15",
    dueDate: "2027-03-31",
    technologies: ["SAP", "Azure", "Integration", "Power BI"],
    objectives: ["Single financial close", "Live plant operations reporting", "Legacy interface retirement"],
    deliverables: ["Integration layer", "Finance migration", "Operations reporting", "Cutover plan"],
    phase: "Build — finance migration wave 2",
    notes: "Plant-side change management running alongside the technical rollout.",
    team: ["emp-3", "emp-7"],
  },
  {
    id: "prj-vantage",
    name: "Vantage CRM Rollout",
    domain: "enterprise",
    client: "Aurelia Health",
    internal: false,
    description: "Service and sales operations platform across eleven regional clinics.",
    overview:
      "Consolidates patient-facing service workflows and referral pipelines into one CRM with regional reporting.",
    status: "Completed",
    progress: 100,
    budget: 1750000,
    spent: 1690000,
    startDate: "2025-05-19",
    dueDate: "2026-05-29",
    technologies: ["Salesforce", "Integration", "React", "Analytics"],
    objectives: ["One referral pipeline", "Regional service SLAs", "Unified reporting"],
    deliverables: ["CRM configuration", "Referral workflows", "Reporting pack", "Training"],
    phase: "Closed — hypercare complete",
    notes: "Handover complete; support retainer active.",
    team: ["emp-7", "emp-4"],
  },
  {
    id: "prj-lumen",
    name: "Lumen Digital Experience",
    domain: "digital",
    client: "Solace Hospitality",
    internal: false,
    description: "Brand system, marketing site and booking journey for a twelve-property group.",
    overview:
      "A single digital experience layer across properties: brand system, editorial site, booking flow and performance marketing instrumentation.",
    status: "In Progress",
    progress: 73,
    budget: 1280000,
    spent: 820000,
    startDate: "2026-02-02",
    dueDate: "2026-10-16",
    technologies: ["React", "Design System", "CMS", "Analytics"],
    objectives: ["One brand system", "Direct booking growth", "Measurable campaign attribution"],
    deliverables: ["Brand system", "Marketing site", "Booking journey", "Analytics layer"],
    phase: "Build — booking journey",
    notes: "Two properties live in soft launch.",
    team: ["emp-5", "emp-6"],
  },
  {
    id: "prj-orbit",
    name: "Orbit Mobile Companion",
    domain: "digital",
    client: "Meridian Logistics",
    internal: false,
    description: "Driver-facing mobile companion for dispatch, proof of delivery and route context.",
    overview:
      "A field-first mobile product with offline-tolerant sync, designed alongside the Atlas platform rollout.",
    status: "Planning",
    progress: 12,
    budget: 760000,
    spent: 68000,
    startDate: "2026-08-10",
    dueDate: "2027-04-30",
    technologies: ["React Native", "Offline Sync", "TypeScript"],
    objectives: ["Offline-first field workflow", "Proof of delivery capture", "Dispatch parity with Atlas"],
    deliverables: ["Mobile app", "Offline sync layer", "Field pilot"],
    phase: "Planning — discovery",
    notes: "Pilot depot selected; discovery interviews underway.",
    team: ["emp-6"],
  },
  {
    id: "prj-continuum",
    name: "Continuum Venture Studio",
    domain: "future-ventures",
    client: "ORVNT",
    internal: true,
    description: "Venture formation track evaluating new categories and building the first ORVNT-founded business.",
    overview:
      "Structured exploration: market theses, prototypes, partner conversations and a formation decision gate per venture candidate.",
    status: "In Progress",
    progress: 28,
    budget: 1500000,
    spent: 410000,
    startDate: "2026-03-01",
    dueDate: "2027-06-30",
    technologies: ["Research", "Prototyping", "Modelling"],
    objectives: ["Three validated theses", "One formation decision", "Repeatable venture playbook"],
    deliverables: ["Thesis library", "Prototypes", "Formation memo"],
    phase: "Explore — thesis validation",
    notes: "Two candidate categories advanced past the first gate.",
    team: ["emp-1", "emp-8"],
  },
  {
    id: "prj-quarry",
    name: "Quarry Data Foundation",
    domain: "software",
    client: "Kestrel Manufacturing",
    internal: false,
    description: "Event backbone and data foundation feeding the Helix modernization programme.",
    overview: "Streaming ingestion, contract-tested event schemas and a governed serving layer for downstream systems.",
    status: "On Hold",
    progress: 37,
    budget: 980000,
    spent: 402000,
    startDate: "2026-01-26",
    dueDate: "2026-12-18",
    technologies: ["Kafka", "dbt", "Snowflake", "Terraform"],
    objectives: ["Contracted event schemas", "Governed serving layer", "Plant telemetry ingestion"],
    deliverables: ["Event backbone", "Schema registry", "Serving models"],
    phase: "Paused — awaiting plant network upgrade",
    notes: "Resumes once the site network upgrade completes.",
    team: ["emp-3"],
  },
  {
    id: "prj-beacon",
    name: "Beacon Growth Engine",
    domain: "digital",
    client: "Northbridge Capital",
    internal: false,
    description: "Performance marketing and content system for a new institutional product line.",
    overview: "Campaign architecture, content operations and attribution instrumentation for a regulated audience.",
    status: "In Review",
    progress: 90,
    budget: 540000,
    spent: 498000,
    startDate: "2026-04-20",
    dueDate: "2026-09-11",
    technologies: ["Analytics", "CMS", "Automation"],
    objectives: ["Compliant campaign workflow", "Attribution clarity", "Content operating rhythm"],
    deliverables: ["Campaign system", "Content ops playbook", "Attribution dashboard"],
    phase: "Review — attribution sign-off",
    notes: "Compliance review passed on the first pass.",
    team: ["emp-5"],
  },
];

export const projectById = (id: string) => PROJECTS.find((p) => p.id === id);
export const projectsByDomain = (slug: DomainSlug) => PROJECTS.filter((p) => p.domain === slug);

export const CLIENTS: Client[] = [
  { id: "cl-1", name: "Meridian Logistics", industry: "Logistics", contact: "R. Vasquez", email: "r.vasquez@meridian.example", since: "2025-02-11", projects: 2, status: "Active" },
  { id: "cl-2", name: "Northbridge Capital", industry: "Financial Services", contact: "A. Duarte", email: "a.duarte@northbridge.example", since: "2025-08-04", projects: 2, status: "Active" },
  { id: "cl-3", name: "Kestrel Manufacturing", industry: "Industrial", contact: "H. Lindqvist", email: "h.lindqvist@kestrel.example", since: "2025-06-23", projects: 2, status: "Active" },
  { id: "cl-4", name: "Aurelia Health", industry: "Healthcare", contact: "S. Mehra", email: "s.mehra@aurelia.example", since: "2024-12-09", projects: 1, status: "Active" },
  { id: "cl-5", name: "Solace Hospitality", industry: "Hospitality", contact: "T. Okafor", email: "t.okafor@solace.example", since: "2026-01-15", projects: 1, status: "Active" },
  { id: "cl-6", name: "Verrid Energy", industry: "Energy", contact: "M. Halvorsen", email: "m.halvorsen@verrid.example", since: "2026-07-02", projects: 0, status: "Prospect" },
];

export const EMPLOYEES: Employee[] = [
  { id: "emp-1", name: "Ananya Rao", email: "ananya.rao@orvnt.example", role: "Principal Architect", department: "Software", initials: "AR", location: "Bengaluru", joined: "2024-03-11" },
  { id: "emp-2", name: "Daniel Osei", email: "daniel.osei@orvnt.example", role: "AI Lead", department: "Artificial Intelligence", initials: "DO", location: "Remote", joined: "2024-09-02" },
  { id: "emp-3", name: "Marta Krupa", email: "marta.krupa@orvnt.example", role: "Enterprise Consultant", department: "Enterprise", initials: "MK", location: "Warsaw", joined: "2025-01-20" },
  { id: "emp-4", name: "Ravi Menon", email: "ravi.menon@orvnt.example", role: "Machine Learning Engineer", department: "Artificial Intelligence", initials: "RM", location: "Bengaluru", joined: "2025-05-05" },
  { id: "emp-5", name: "Lina Ferreira", email: "lina.ferreira@orvnt.example", role: "Digital Product Designer", department: "Digital", initials: "LF", location: "Lisbon", joined: "2025-02-17" },
  { id: "emp-6", name: "Jonas Weber", email: "jonas.weber@orvnt.example", role: "Senior Engineer", department: "Software", initials: "JW", location: "Berlin", joined: "2024-11-04" },
  { id: "emp-7", name: "Priya Shah", email: "priya.shah@orvnt.example", role: "Programme Manager", department: "Enterprise", initials: "PS", location: "Mumbai", joined: "2024-06-24" },
  { id: "emp-8", name: "Owen Blake", email: "owen.blake@orvnt.example", role: "Venture Analyst", department: "Future Ventures", initials: "OB", location: "London", joined: "2026-01-08" },
];

export const CURRENT_EMPLOYEE = EMPLOYEES[1]!;

export const employeeById = (id: string) => EMPLOYEES.find((e) => e.id === id);

export const TASKS: Task[] = [
  { id: "tsk-1", title: "Retrieval evaluation harness — final run", projectId: "prj-signal", assignee: "emp-2", status: "In Progress", progress: 70, priority: "High", due: "2026-09-08", notes: "Third eval sweep in flight.", estimate: "2 days" },
  { id: "tsk-2", title: "Agent trace explorer — timeline view", projectId: "prj-agentops", assignee: "emp-2", status: "In Progress", progress: 45, priority: "Medium", due: "2026-09-15", notes: "Waiting on span schema freeze.", estimate: "4 days" },
  { id: "tsk-3", title: "Copilot citation UI polish", projectId: "prj-signal", assignee: "emp-2", status: "Review", progress: 95, priority: "Medium", due: "2026-09-05", notes: "In design review.", estimate: "0.5 days" },
  { id: "tsk-4", title: "Model card documentation", projectId: "prj-signal", assignee: "emp-4", status: "To Do", progress: 0, priority: "Low", due: "2026-09-22", notes: "", estimate: "1 day" },
  { id: "tsk-5", title: "Settlement migration rehearsal", projectId: "prj-atlas", assignee: "emp-1", status: "In Progress", progress: 60, priority: "High", due: "2026-09-30", notes: "Dry run against staging snapshot.", estimate: "5 days" },
  { id: "tsk-6", title: "Operator console — dispatch board", projectId: "prj-atlas", assignee: "emp-6", status: "In Progress", progress: 55, priority: "High", due: "2026-09-19", notes: "", estimate: "6 days" },
  { id: "tsk-7", title: "Finance migration wave 2 reconciliation", projectId: "prj-helix", assignee: "emp-3", status: "Blocked", progress: 30, priority: "High", due: "2026-09-12", notes: "Blocked on client data extract.", estimate: "3 days" },
  { id: "tsk-8", title: "Booking journey — payment step", projectId: "prj-lumen", assignee: "emp-5", status: "In Progress", progress: 40, priority: "Medium", due: "2026-09-25", notes: "", estimate: "4 days" },
  { id: "tsk-9", title: "Attribution dashboard sign-off", projectId: "prj-beacon", assignee: "emp-5", status: "Review", progress: 90, priority: "Medium", due: "2026-09-09", notes: "", estimate: "1 day" },
  { id: "tsk-10", title: "Thesis gate memo — category two", projectId: "prj-continuum", assignee: "emp-8", status: "To Do", progress: 0, priority: "Medium", due: "2026-10-02", notes: "", estimate: "3 days" },
  { id: "tsk-11", title: "Event schema contract tests", projectId: "prj-quarry", assignee: "emp-3", status: "Done", progress: 100, priority: "Low", due: "2026-08-21", notes: "Merged.", estimate: "2 days" },
  { id: "tsk-12", title: "Agent tool registry API", projectId: "prj-agentops", assignee: "emp-2", status: "To Do", progress: 0, priority: "Medium", due: "2026-09-29", notes: "", estimate: "5 days" },
];

export const ANNOUNCEMENTS: Announcement[] = [
  { id: "an-1", title: "AgentOps runtime enters internal preview", body: "The shared agent runtime is now available to all engagement teams. Request access through your delivery lead.", date: "2026-09-01", author: "Daniel Osei", tag: "Platform" },
  { id: "an-2", title: "Q4 planning cycle opens 15 September", body: "Domain leads should submit capacity and capability plans before the cycle opens.", date: "2026-08-28", author: "Priya Shah", tag: "Operations" },
  { id: "an-3", title: "New venture gate review scheduled", body: "Continuum category two advances to gate review at the end of the month.", date: "2026-08-22", author: "Owen Blake", tag: "Ventures" },
];

export const ATTENDANCE_HISTORY: AttendanceEntry[] = [
  { date: "2026-09-02", checkIn: "09:14", checkOut: "18:02", hours: 8.8, status: "Present" },
  { date: "2026-09-01", checkIn: "09:31", checkOut: "17:48", hours: 8.3, status: "Remote" },
  { date: "2026-08-31", checkIn: "09:05", checkOut: "18:20", hours: 9.2, status: "Present" },
  { date: "2026-08-28", checkIn: "09:22", checkOut: "17:55", hours: 8.6, status: "Remote" },
  { date: "2026-08-27", checkIn: null, checkOut: null, hours: 0, status: "Leave" },
];

export const TIMESHEET: TimesheetEntry[] = [
  { day: "Mon", hours: 7.5, projectId: "prj-signal" },
  { day: "Tue", hours: 8.0, projectId: "prj-signal" },
  { day: "Wed", hours: 6.5, projectId: "prj-agentops" },
  { day: "Thu", hours: 8.5, projectId: "prj-agentops" },
  { day: "Fri", hours: 5.0, projectId: "prj-signal" },
  { day: "Sat", hours: 0, projectId: "prj-signal" },
  { day: "Sun", hours: 0, projectId: "prj-signal" },
];

export const LEAVE_REQUESTS: LeaveRequest[] = [
  { id: "lv-1", type: "Annual", from: "2026-10-12", to: "2026-10-16", reason: "Family travel", status: "Approved" },
  { id: "lv-2", type: "Personal", from: "2026-09-18", to: "2026-09-18", reason: "Appointment", status: "Pending" },
];

export const BUDGET_LINES: BudgetLine[] = [
  { domain: "software", allocated: 5180000, spent: 3012000 },
  { domain: "artificial-intelligence", allocated: 3550000, spent: 2455000 },
  { domain: "enterprise", allocated: 7850000, spent: 4640000 },
  { domain: "digital", allocated: 2580000, spent: 1386000 },
  { domain: "future-ventures", allocated: 1500000, spent: 410000 },
];

export const DOCUMENTS: DocumentItem[] = [
  { id: "doc-1", name: "ORVNT Engineering Handbook", type: "PDF", size: "2.4 MB", updated: "2026-08-19", owner: "Ananya Rao" },
  { id: "doc-2", name: "Agent Runtime Architecture", type: "DOC", size: "820 KB", updated: "2026-08-30", owner: "Daniel Osei" },
  { id: "doc-3", name: "Client Reporting Template", type: "XLSX", size: "310 KB", updated: "2026-07-28", owner: "Priya Shah" },
  { id: "doc-4", name: "Brand System Guidelines", type: "PDF", size: "6.1 MB", updated: "2026-06-14", owner: "Lina Ferreira" },
];

export const ACTIVITY: ActivityEvent[] = [
  { id: "ac-1", actor: "Daniel Osei", action: "updated progress on", target: "Signal Intelligence Suite", at: "2026-09-03 09:41" },
  { id: "ac-2", actor: "Priya Shah", action: "added a client", target: "Verrid Energy", at: "2026-09-02 16:12" },
  { id: "ac-3", actor: "Ananya Rao", action: "allocated budget to", target: "Atlas Core Platform", at: "2026-09-02 11:03" },
  { id: "ac-4", actor: "Marta Krupa", action: "flagged a blocker on", target: "Helix ERP Modernization", at: "2026-09-01 14:55" },
  { id: "ac-5", actor: "Lina Ferreira", action: "published content for", target: "Digital domain page", at: "2026-08-31 10:22" },
];

export const WEBSITE_CONTENT: WebsiteContentBlock[] = [
  { key: "home.tagline", page: "Homepage", label: "Tagline", value: "BUILD · INTELLIGENCE · IMPACT" },
  { key: "home.headline", page: "Homepage", label: "Headline", value: "Building technology across today and tomorrow." },
  { key: "home.body", page: "Homepage", label: "Supporting text", value: "ORVNT builds useful software and intelligent systems, helps organizations modernize, creates digital products, and explores new opportunities through technology and innovation.", multiline: true },
  { key: "about.headline", page: "About", label: "Headline", value: "One company, five domains, one system." },
  { key: "about.body", page: "About", label: "Supporting text", value: "ORVNT operates as a single technology system across software, intelligence, enterprise, digital and new ventures.", multiline: true },
  { key: "software.headline", page: "Software", label: "Headline", value: "The technical foundation." },
  { key: "ai.headline", page: "Artificial Intelligence", label: "Headline", value: "Intelligence engineered for real-world use." },
  { key: "enterprise.headline", page: "Enterprise", label: "Headline", value: "Modernizing how organizations operate." },
  { key: "digital.headline", page: "Digital", label: "Headline", value: "Designing connected digital experiences." },
  { key: "ventures.headline", page: "Future Ventures", label: "Headline", value: "Creating what does not exist yet." },
  { key: "contact.headline", page: "Contact", label: "Headline", value: "Have a problem worth solving?" },
  { key: "contact.email", page: "Contact", label: "Email", value: "admin.orvnt@gmail.com" },
];

export const CONTACT = {
  email: "admin.orvnt@gmail.com",
  phones: ["+91 63697 39598", "+91 70104 11200"],
};

export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: n >= 1_000_000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(n);

export const formatDate = (iso: string) =>
  new Date(iso + (iso.length === 10 ? "T00:00:00Z" : "")).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
