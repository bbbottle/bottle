import { useEffect, useState } from "react";
import { changeFont } from "@/utils";
import { FontType } from "@/types/font";

export const useFontLoading = () => {
  const [isFontLoading, setIsFontLoading] = useState(true);

  const handleFontLoading = () => {
    setIsFontLoading(true);
    document.fonts.ready.then(() => {
      handleFontLoadingDone();
    });
  };

  const handleFontLoadingDone = () => {
    setTimeout(() => {
      setIsFontLoading(false);
    }, 500);
  };

  const handleFontLoadingError = () => {
    setIsFontLoading(false);
    changeFont(FontType.Mono);
  };

  useEffect(() => {
    document.fonts.onloadingerror = handleFontLoadingError;
    document.fonts.onloading = handleFontLoading;

    return () => {
      document.fonts.onloadingerror = null;
      document.fonts.onloading = null;
    };
  }, []);

  return isFontLoading;
};
