import React from 'react';
import { Button, ButtonType } from '@bbki.ng/components';
import { ShareIcon } from './share-icon';

export const ShareBtn = ({ shareInfo }: { shareInfo: ShareData }) => {
  const handleShare = async () => {
    try {
      await navigator.share(shareInfo);
    } catch (error) {
      const isAbortError = (error as Error).name === 'AbortError';
      if (isAbortError) {
        return;
      }
      console.error('Share failed:', (error as Error).message);
    }
  };

  return (
    <Button
      size="small"
      className="text-gray-400 hover:text-gray-600 transition-colors ease-in duration-200"
      type={ButtonType.GHOST}
      onClick={handleShare}
    >
      <ShareIcon />
    </Button>
  );
};
