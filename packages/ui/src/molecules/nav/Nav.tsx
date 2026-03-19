import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '@/molecules/breadcrumb';
import { Logo } from '@/atoms/logo';
import { NavProps } from './Nav.types';

export const Nav = (props: NavProps) => {
  const { paths, loading, mini, className, customLogo } = props;
  const nav = useNavigate();

  if (mini) {
    return (
      <div className={twMerge('p-2 w-full flex items-center', className)}>
        <Breadcrumb paths={paths} />
      </div>
    );
  }

  return (
    <div className={twMerge('p-2 w-full flex items-center', className)}>
      {customLogo || (
        <Logo className="mr-2 cursor-pointer hover:opacity-80" onClick={() => nav('/')} />
      )}
      <Breadcrumb paths={paths} loading={loading} />
    </div>
  );
};

Nav.displayName = 'Nav';
