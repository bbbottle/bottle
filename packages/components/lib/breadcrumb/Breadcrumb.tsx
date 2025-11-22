import React from "react";
// @ts-ignore
import classNames from "classnames";
import { Link } from "../link/Link";

export type PathObj = {
  path?: string;
  name: string;
};

export type BreadcrumbProps = {
  paths: PathObj[];
  loading?: boolean;
};

export const Breadcrumb = (props: BreadcrumbProps) => {
  const { paths, loading } = props;
  const PathElements = paths.map(({ path, name }, index) => {
    const slash = index === 0 ? null : <span className="text-gray-400">/</span>;
    const isNonEnName = !/^[a-zA-Z~]+$/.test(name);
    const offsetCls = classNames({ "relative top-[2px]": isNonEnName });
    const isLast = index === paths.length - 1;
    const status = loading && isLast ? "blink" : "hidden";
    return (
      <span key={path || name}>
        {slash}
        <Link
          to={path ?? ""}
          className={offsetCls}
          readonly={!path}
          status={status}
        >
          {name}
        </Link>
      </span>
    );
  });
  return <div className="breadcrumb">{PathElements}</div>;
};
