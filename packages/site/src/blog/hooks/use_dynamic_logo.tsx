import React from 'react';
import { Role, useRole } from './use_role';
import { Pochacco, PochaccoPose } from '@/components/Pochacco/Pochacco';
import { useLocation } from 'react-router-dom';
import { Crows } from '@/components/Pochacco/xwy';

export const useDynamicLogo = () => {
  const role = useRole();
  const location = useLocation();

  if (decodeURIComponent(location.pathname).includes('小乌鸦')) {
    return <Crows />;
  }

  return null;
};
