import { useSupabaseSession } from "@/hooks/use_supa_session";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const BotRedirect = () => {
  const session = useSupabaseSession();
  const [param] = useSearchParams();
  useEffect(() => {
    if (session) {
      window.location.href = `https://t.me/BBKingsBot?start=${param.get(
        "code"
      )}`;
    }
  }, [session, param]);

  return null;
};
