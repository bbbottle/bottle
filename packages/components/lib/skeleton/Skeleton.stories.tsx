import React from "react";

import {
  Skeleton,
  SkeletonColor,
  SkeletonProps,
  ArticleSkeleton,
  LinkListSkeleton,
} from "./Seleton";

export default {
  title: "Skeleton",
  component: Skeleton,
  argTypes: {
    bgColor: {
      options: [
        SkeletonColor.RED,
        SkeletonColor.BLUE,
        SkeletonColor.GRAY,
        SkeletonColor.BLACK,
      ],
      defaultValue: SkeletonColor.BLUE,
    },
    width: {
      defaultValue: 60,
    },
    height: {
      defaultValue: 24,
    },
  },
};

export const Default = (props: SkeletonProps) => <Skeleton {...props} />;

export const SkeletonForArticle = () => {
  return (
    <ArticleSkeleton titleLength={2}>
      <Skeleton width={100} />
    </ArticleSkeleton>
  );
};

export const SkeletonForLinkList = () => {
  return <LinkListSkeleton titleLength={2} linksLength={[3, 4, 2, 5, 6]} />;
};
