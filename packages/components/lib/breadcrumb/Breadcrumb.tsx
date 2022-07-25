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
};

export const Breadcrumb = (props: BreadcrumbProps) => {
  const { paths } = props;
  const PathElements = paths.map(({ path, name }, index) => {
    const slash = index === 0 ? null : <span className="text-gray-400">/</span>;
    const isNonEnName = !/^[a-zA-Z~]+$/.test(name);
    const offsetCls = classNames({ "relative top-[2px]": isNonEnName });
    const link = path ? (
      <Link to={path} className={offsetCls} style={{ padding: 4 }}>
        {name}
      </Link>
    ) : (
      <span
        className={classNames("text-gray-400", offsetCls)}
        style={{ padding: 4 }}
      >
        {name}
      </span>
    );

    return (
      <span key={path || name}>
        {slash}
        {link}
      </span>
    );
  });
  return <div className="breadcrumb">{PathElements}</div>;
};
