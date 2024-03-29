import React, { useEffect } from "react";
import { MySuspense } from "@/components";
import { useParams } from "react-router-dom";
import { useProjects } from "@/hooks/use_projects";
import { imageFormatter } from "@/utils";
import { Gallery } from "@bbki.ng/components";
import { ImageUploader } from "@/components/ImageUploader";
import classnames from "classnames";
import { ImageRenderer } from "@bbki.ng/components/lib";
import { ImgCtxMenu } from "@/components/Img_ctx_menu";
import {EffectLayer} from "@/components/effect-layer/EffectLayer";

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, refresh } = useProjects(id, true);

  useEffect(() => {
    return () => {
      refresh().then(() => {});
    };
  }, []);

  const renderImage: ImageRenderer = (img, index, col) => {
    const imgInfo = projects.images[index];

    return (
      <ImgCtxMenu
        date={imgInfo.created_at}
        name={imgInfo.title}
        width={imgInfo.width}
        height={imgInfo.height}
        id={imgInfo.id}
        onRemoved={refresh}
      >
        <div
          className={classnames("mb-128 select-none", {
            "md:mr-64": col === 0,
            "md:ml-64": col !== 0,
          })}
        >
          {img}
        </div>
      </ImgCtxMenu>
    );
  };

  const renderUploader = () => (
    <ImageUploader
      onUploadFinish={refresh}
      projectId={projects.id}
      projectName={id}
    />
  );

  return (
    <>
      <Gallery
        images={projects.images.map(imageFormatter)}
        imageRenderer={renderImage}
      >
        {renderUploader()}
      </Gallery>
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
