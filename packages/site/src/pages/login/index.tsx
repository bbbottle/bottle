import React, { useContext, useState } from "react";
import { Button, ButtonType } from "@bbki.ng/components";
import { OauthProvider } from "@/types/supabase";
import { supabase } from "@/constants";
import { ArticlePage } from "@/components/article";
import { useSupabaseSession } from "@/hooks/use_supa_session";
import { Navigate } from "react-router-dom";
import { GlobalLoadingContext } from "@/global_loading_state_provider";

export const Login = () => {
  const { isLoading, setIsLoading } = useContext(GlobalLoadingContext);

  const session = useSupabaseSession();
  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <ArticlePage title="第三方账号登录">
      <>
        <Button
          type={isLoading ? ButtonType.DISABLED : ButtonType.PRIMARY}
          className="ml-8"
          onClick={async () => {
            setIsLoading(true);
            return supabase.auth.signIn({
              provider: OauthProvider.GITHUB,
            });
          }}
        >
          GitHub
        </Button>
        <Button
          type={isLoading ? ButtonType.DISABLED : ButtonType.PRIMARY}
          className="ml-8"
          onClick={async () => {
            setIsLoading(true);
            return supabase.auth.signIn({
              provider: OauthProvider.Twitter,
            });
          }}
        >
          Twitter
        </Button>
      </>
    </ArticlePage>
  );
};
