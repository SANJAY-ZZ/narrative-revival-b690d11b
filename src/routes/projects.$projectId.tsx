import { createFileRoute, notFound } from "@tanstack/react-router";

import { ProjectDetails } from "@/components/public/ProjectDetails";
import { projectById } from "@/data/mock";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = projectById(params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project unavailable — ORVNT" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const title = `${project.name} — ORVNT`;
    return {
      meta: [
        { title },
        { name: "description", content: project.description },
        { property: "og:title", content: title },
        { property: "og:description", content: project.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectRoute,
});

function ProjectRoute() {
  const { project } = Route.useLoaderData();
  return <ProjectDetails project={project} />;
}
