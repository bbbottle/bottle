import { Session } from "@supabase/supabase-js";

export interface BBKingSession extends Session {
  isKing: boolean;
  isQueen: boolean;
}

export enum OauthProvider {
  GITHUB = "github",
  Twitter = "twitter",
  Spotify = "spotify",
}
