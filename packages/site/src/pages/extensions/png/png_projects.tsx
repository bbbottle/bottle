import React, { useEffect } from "react";
import { MySuspense } from "@/components";
import { useParams } from "react-router-dom";
import { useProjects } from "@/hooks/use_projects";
import { imageFormatter } from "@/utils";
import { Gallery, Nav } from "@bbki.ng/components";
import { usePaths } from "@/hooks";
import { ImageUploader } from "@/components/ImageUploader";

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, refresh } = useProjects(id, true);

  useEffect(() => {
    return () => {
      refresh().then(() => {});
    };
  }, []);

  const renderUploader = () => (
    <ImageUploader
      onUploadFinish={refresh}
      projectId={projects.id}
      projectName={id}
    />
  );

  return (
    <>
      <Gallery images={projects.images.map(imageFormatter)}>
        {renderUploader()}
      </Gallery>
      <Nav paths={usePaths()} mini className="justify-center py-32 md:hidden" />
    </>
  );
};

export default () => {
  return (
    <MySuspense>
      <ProjectDetail />
    </MySuspense>
  );
};
