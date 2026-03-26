import { GlobalLoadingContext } from '@/context/global_loading_state_provider';
import { IBlogContext } from '@/types/blog-context';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

export const useBlogContext = (): IBlogContext => {
  const globalLoading = useContext(GlobalLoadingContext);
  const location = useLocation();

  return {
    gloalLoading: globalLoading.isLoading,
    location,
  };
};
