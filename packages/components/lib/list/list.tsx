// @ts-ignore
import cls from "classnames";
import React, { ReactElement, FunctionComponent } from "react";
import { Link, LinkProps } from "../link/Link";
import { Article } from "../article/Article";

export interface listProps {
  className?: string;
  compact?: boolean;
  items: any[];
  itemRenderer: (itemProps: any, index: number) => ReactElement;
  horizontal?: boolean;
}

export const List: FunctionComponent<listProps> = (props) => {
  const { items, itemRenderer, className, horizontal, compact } = props;

  const spaceCls = compact ? "" : horizontal ? "mr-3" : "mb-4";
  return (
    <ul
      className={cls(className, "list-style-none", {
        flex: horizontal,
        "align-center": horizontal,
      })}
    >
      {items.map((item, index) => {
        return (
          <li key={item.id || index} className={cls(spaceCls, "flex-shrink-0")}>
            {itemRenderer(item, index)}
          </li>
        );
      })}
    </ul>
  );
};

export interface TitledListProps extends listProps {
  title?: any;
  description?: any;
}

export const TitledList: FunctionComponent<TitledListProps> = (props) => {
  const { title, description, ...rest } = props;
  if (!title) {
    return <List {...rest} />;
  }

  return (
    <Article title={title} description={description}>
      <List {...rest} />
    </Article>
  );
};

export interface LinkListProps
  extends Omit<listProps, "itemRenderer" | "items"> {
  title?: string;
  description?: any;
  links: LinkProps[];
}

export const LinkList = (props: LinkListProps) => {
  const { title, description, links, ...rest } = props;
  const renderLink = ({ name, to }: any) => {
    return (
      <Link to={to} key={name}>
        {name}
      </Link>
    );
  };

  return (
    <TitledList
      title={title}
      description={description}
      items={links}
      itemRenderer={renderLink}
      {...rest}
    />
  );
};
