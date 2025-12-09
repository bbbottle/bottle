import { useEffect, useState } from "react";
import { changeFont } from "@/utils";
import { FontType } from "@/types/font";

export const useFontLoading = () => {
  const [isFontLoading, setIsFontLoading] = useState(false);

  const handleFontLoading = () => {
    setIsFontLoading(true);
    document.fonts.ready.then(() => {
      handleFontLoadingDone();
    });
  };

  const handleFontLoadingDone = () => {
    setIsFontLoading(false);
    // setTimeout(() => {
    // }, 500);
  };

  const handleFontLoadingError = () => {
    setIsFontLoading(false);
    changeFont(FontType.Mono);
  };

  useEffect(() => {
    document.fonts.onloadingerror = handleFontLoadingError;
    document.fonts.onloading = handleFontLoading;

    document.fonts.ready.then(() => {
      handleFontLoadingDone();
    });

    return () => {
      document.fonts.onloadingerror = null;
      document.fonts.onloading = null;
    };
  }, []);

  return isFontLoading;
};
