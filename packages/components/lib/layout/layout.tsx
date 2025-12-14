// @ts-ignore
import cls from "classnames";
import React, { ReactElement } from "react";

export type threeColLayoutProps = {
  leftRenderer?: () => ReactElement | null;
  rightRenderer?: () => ReactElement | null;
  middleRenderer?: () => ReactElement | null;
};

export const ThreeColLayout = (props: threeColLayoutProps) => {
  const { leftRenderer, middleRenderer, rightRenderer } = props;
  const colCls = cls("max-h-full overflow-auto xl:block! py-128 max-w-[580px]");
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 h-full w-full">
      <div className={cls("hidden", colCls)}>
        {leftRenderer && leftRenderer()}
      </div>
      <div
        className={cls(colCls, "no-scrollbar p-16", "relative", {
          hidden: !middleRenderer,
        })}
      >
        {middleRenderer && middleRenderer()}
      </div>
      <div className={cls("hidden", colCls)}>
        {rightRenderer && rightRenderer()}
      </div>
    </div>
  );
};
