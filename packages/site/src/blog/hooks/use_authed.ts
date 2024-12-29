import { useSupabaseSession } from "@/hooks/use_supa_session";

export const useAuthed = (): boolean => {
  const { access_token: token, isKing } = useSupabaseSession() || {};

  return !(!token || !isKing);
};
