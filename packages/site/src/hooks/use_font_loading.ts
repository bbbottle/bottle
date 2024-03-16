import { useEffect, useState } from "react";

export const useFontLoading = () => {
  const [isFontLoading, setIsFontLoading] = useState(false);

  const handleFontLoading = () => {
    setIsFontLoading(true);
  };

  const handleFontLoadingDone = () => {
    // delay 200ms
    setTimeout(() => {
      setIsFontLoading(false);
    }, 500);
  };

  useEffect(() => {
    document.fonts.onloadingdone = handleFontLoadingDone;
    document.fonts.onloadingerror = handleFontLoadingDone;
    document.fonts.ready.then(handleFontLoading);
    document.fonts.onloading = handleFontLoading;

    // check font ready
    if (document.fonts.status === "loaded") {
      handleFontLoadingDone();
    }

    console.log(document.fonts.status);

    return () => {
      document.fonts.onloadingdone = null;
      document.fonts.onloadingerror = null;
      document.fonts.ready.then(() => {});
      document.fonts.onloading = null;
    };
  }, [document.fonts.status]);

  return isFontLoading;
};
