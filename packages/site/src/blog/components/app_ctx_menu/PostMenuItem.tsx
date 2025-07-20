import { ContextMenuItem } from "@bbki.ng/components";
import React from "react";
import {useAuthedStringPost} from "@/hooks/use_authed_string_post";

export const PostMenuItem = () => {

    const post = useAuthedStringPost();

    const postFromClipboard = () => {
        navigator.clipboard
            .readText()
            .then(post);
    }

    return (
    <ContextMenuItem onClick={postFromClipboard}
      inset
    >
        post from clipboard
    </ContextMenuItem>
  );
};
