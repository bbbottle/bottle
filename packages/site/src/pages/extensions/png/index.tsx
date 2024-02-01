import React from "react";
import { useProjects } from "@/hooks/use_projects";
import { Link, Gallery, ImageRenderer, LinkList } from "@bbki.ng/components";
import { MySuspense } from "@/components";

const Projects = () => {
  const { projects } = useProjects("", true);

  const links = projects.map((p: any) => ({
    to: `/projects/${p.name}`,
    name: p.name,
  }));

  return <LinkList links={links} title="照片" />;
};

export default () => {
  return (
    <MySuspense>
      <Projects />
    </MySuspense>
  );
};
