// @ts-ignore
import classNames from "classnames";
import React from "react";
import { Article } from "../article/Article";
import { List } from "../list/list";

export enum SkeletonColor {
  BLUE = "blue",
  RED = "red",
  GRAY = "gray",
  BLACK = "black",
}

const COLOR_MAPPING = {
  [SkeletonColor.BLUE]: "bg-blue-100",
  [SkeletonColor.RED]: "bg-red-100",
  [SkeletonColor.GRAY]: "bg-gray-100",
  [SkeletonColor.BLACK]: "bg-gray-200",
};

export interface SkeletonProps {
  className?: string;
  width?: number;
  height?: number;
  bgColor?: SkeletonColor;
}

export interface ArticleSkeletonProps extends SkeletonProps {
  titleLength?: number;
  descriptionLength?: number;
  children?: any;
}

export interface LinkListSkeletonProps extends ArticleSkeletonProps {
  linksLength: number[];
}

export const Skeleton = (props: SkeletonProps) => {
  const {
    bgColor = SkeletonColor.GRAY,
    width = 26,
    height = 24,
    className,
  } = props;

  return (
    <div
      className={classNames(
        COLOR_MAPPING[bgColor],
        "animate-pulse",
        "rounded",
        className
      )}
      style={{ width, height }}
    />
  );
};

export const ArticleSkeleton = (props: ArticleSkeletonProps) => {
  const { children, titleLength = 0, descriptionLength } = props;
  return (
    <Article
      title={
        <Skeleton
          width={36 * titleLength}
          height={36}
          bgColor={SkeletonColor.BLACK}
        />
      }
      description={
        descriptionLength && <Skeleton width={16 * descriptionLength} />
      }
    >
      {children}
    </Article>
  );
};

export const LinkListSkeleton = (props: LinkListSkeletonProps) => {
  const { linksLength, ...rest } = props;
  const renderSkeleton = (length: number) => {
    return (
      <Skeleton
        className="inline-block align-middle"
        width={length * 16}
        bgColor={SkeletonColor.BLUE}
      />
    );
  };

  if (!rest.titleLength) {
    return <List items={linksLength} itemRenderer={renderSkeleton} />;
  }

  return (
    <ArticleSkeleton {...rest}>
      <List items={linksLength} itemRenderer={renderSkeleton} />
    </ArticleSkeleton>
  );
};
