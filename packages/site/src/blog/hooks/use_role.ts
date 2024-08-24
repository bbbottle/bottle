import { useSupabaseSession } from "@/hooks/use_supa_session";

export enum Role {
  KING = "king",
  QUEEN = "queen",
  ANNO = "anno",
}
export const useRole = (): Role => {
  const sess = useSupabaseSession();
  if (sess?.isKing) {
    return Role.KING;
  }

  if (sess?.isQueen) {
    return Role.QUEEN;
  }

  return Role.ANNO;
};
