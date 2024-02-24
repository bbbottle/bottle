import React from "react";
import { useProjects } from "@/hooks/use_projects";
import { CenterLinkList } from "@/components";

const Projects = () => {
  const { projects } = useProjects("");

  const links = projects.map((p: any) => ({
    to: `/projects/${p.name}`,
    name: p.name,
  }));

  return <CenterLinkList links={links} title=" " />;
};

export default () => {
  return (
    // <MySuspense>
    <Projects />
    // </MySuspense>
  );
};
