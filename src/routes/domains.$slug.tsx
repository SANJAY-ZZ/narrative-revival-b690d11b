import { createFileRoute, notFound } from "@tanstack/react-router";

import { DomainPage } from "@/components/public/DomainPage";
import { domainBySlug } from "@/data/mock";

export const Route = createFileRoute("/domains/$slug")({
  loader: ({ params }) => {
    const domain = domainBySlug(params.slug);
    if (!domain) throw notFound();
    return { domain };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Domain unavailable — ORVNT" }, { name: "robots", content: "noindex" }] };
    }
    const { domain } = loaderData;
    const title = `${domain.name} — ORVNT`;
    return {
      meta: [
        { title },
        { name: "description", content: domain.description },
        { property: "og:title", content: title },
        { property: "og:description", content: domain.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: DomainRoute,
});

function DomainRoute() {
  const { domain } = Route.useLoaderData();
  return <DomainPage domain={domain} />;
}
