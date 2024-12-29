import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const BotRedirect = () => {
  const [param] = useSearchParams();

  const code = param.get("code");

  useEffect(() => {
    window.location.href = `https://t.me/BBKingsBot?start=${code}`;
  }, [code]);

  return null;
};
