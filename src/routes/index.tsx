import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Nav } from "@/components/orvnt/Nav";
import { ScrollRail } from "@/components/orvnt/ScrollRail";
import { Arrival } from "@/components/orvnt/Arrival";
import { Letters } from "@/components/orvnt/Letters";
import { LaptopStage } from "@/components/orvnt/LaptopStage";
import { AboutCore } from "@/components/orvnt/AboutCore";
import { SoftwareSection } from "@/components/orvnt/SoftwareSection";
import { AiSection } from "@/components/orvnt/AiSection";
import { EnterpriseSection } from "@/components/orvnt/EnterpriseSection";
import { DigitalSection } from "@/components/orvnt/DigitalSection";
import { DomainIndex } from "@/components/orvnt/DomainIndex";
import { Ventures } from "@/components/orvnt/Ventures";
import { Process } from "@/components/orvnt/Process";
import { FinalStatement } from "@/components/orvnt/FinalStatement";
import { Contact } from "@/components/orvnt/Contact";
import { SiteFooter } from "@/components/public/SiteFooter";

const TITLE = "ORVNT — Build · Intelligence · Impact";
const DESC =
  "ORVNT builds useful software and intelligent systems, helps organizations modernize, creates digital products, and explores new ventures through technology.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [chromeVisible, setChromeVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setChromeVisible(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Nav visible={chromeVisible} />
      <ScrollRail visible={chromeVisible} />
      <main>
        <Arrival />
        <Letters />
        <LaptopStage />
        <AboutCore />
        <SoftwareSection />
        <AiSection />
        <EnterpriseSection />
        <DigitalSection />
        <DomainIndex />
        <Ventures />
        <Process />
        <FinalStatement />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
