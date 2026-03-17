import React from 'react';
// @ts-ignore
import cls from 'classnames';

export interface IMainLayoutProps {
  children: React.ReactNode;
  className?: string;
  leftCol?: React.ReactNode;
  rightCol?: React.ReactNode;
}

export const MainLayout = (props: IMainLayoutProps) => {
  const { children, className, leftCol, rightCol } = props;

  return (
    <div className={cls('grid w-full h-full grid-cols-1 md:grid-cols-3', className)}>
      {/* Left Column */}
      <div className="hidden md:block h-full overflow-auto">{leftCol}</div>
      {/* Middle Column - Main Content */}
      <div className="h-full overflow-auto">{children}</div>
      {/* Right Column */}
      <div className="hidden md:block h-full overflow-auto">{rightCol}</div>
    </div>
  );
};
